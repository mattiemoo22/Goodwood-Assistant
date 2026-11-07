# Goodwood Video & Stream Assistant

Free-AI version (Gemini). Volunteers just open the site, no sign-in.

## Files
- `index.html`: the chat page
- `netlify/functions/ask.mjs`: small backend that holds your API key and calls Gemini
- `netlify/functions/knowledge.mjs`: **your notes**. Edit this file to add or fix facts.

## Deploy (Netlify, free)
1. Get a free key at https://aistudio.google.com (Get API key).
2. Put this folder in a GitHub repo, then on Netlify choose Add new site > Import from Git. (Or use the Netlify CLI: `netlify deploy --prod`.)
3. In Netlify: Site configuration > Environment variables, add:
   - `GEMINI_API_KEY` = your key (required)
   - `CONTACT` = who volunteers should contact, e.g. "Matthew Swart on 079..." (optional; default "the production team")
   - `GEMINI_MODEL` = optional; default `gemini-flash-lite-latest`. Change it if Google retires the model.
4. Redeploy. Test on a phone that isn't signed in to anything.

If Gemini is down or over its free quota, the page shows the closest line from your notes instead.
