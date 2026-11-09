import { KB } from "./knowledge.mjs";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

// Used when Gemini is unavailable or over its free quota: returns the closest sentence from the notes.
function fallback(question, kb) {
  const words = (question.toLowerCase().match(/[a-z0-9]{3,}/g) || []);
  let best = "", top = 0;
  for (const p of kb.split(/\n\n+/)) {
    const l = p.toLowerCase();
    const s = words.reduce((a, w) => a + (l.includes(w) ? 1 : 0), 0);
    if (s > top) { top = s; best = p; }
  }
  return best ? best.replace(/\s+/g, " ").split(/(?<=[.!?])\s/)[0] : "I don't have that.";
}

export default async (req) => {
  // Visiting this address in a browser runs a quick self-test and shows what Gemini says (never shows the key).
  if (req.method === "GET") {
    const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
    const out = { keyFound: Boolean(process.env.GEMINI_API_KEY), model };
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY || "" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Say OK" }] }] }),
      });
      out.status = r.status;
      out.reply = (await r.text()).slice(0, 400);
    } catch (e) { out.error = String(e.message || e); }
    return json(out);
  }
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400); }

  const contact = process.env.CONTACT || "the production team";
  const kb = KB.replaceAll("__CONTACT__", contact);

  let msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-7).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content || "").slice(0, 500) }],
  }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return json({ error: "Bad request" }, 400);
  const question = msgs[msgs.length - 1].parts[0].text;

  const system = `You are the setup troubleshooting assistant for the Goodwood church production team (video, stream and lighting). Answer ONLY from the facts below; never use general knowledge or guess. The volunteer is in a hurry, on a phone, and does not want to read. Reply like a helpful colleague giving a quick verbal answer: ONE short sentence, two at the very most, under 25 words, giving only what was asked. Keep exact names, ports and numbers. For a troubleshooting question, give the single most likely first thing to check. Only give steps or more detail if the volunteer asks for more detail or steps; then be clear and numbered. If the answer is not in the facts, say you don't have that and suggest contacting ${contact}. If the question is about running the stream, say that is handled in Sardius by whoever manages the broadcast. When a question could apply to video or lighting and it is unclear which, ask which one. Write only your own reply; never write the volunteer's lines.\n\n${kb}`;

  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY || "" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: msgs,
        generationConfig: { temperature: 0.2, maxOutputTokens: 800 },
      }),
    });
    if (!r.ok) throw new Error("Gemini " + r.status);
    const data = await r.json();
    const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
    if (!text) throw new Error("empty");
    return json({ text, source: "ai" });
  } catch (e) {
    return json({ text: fallback(question, kb), source: "fallback" });
  }
};
