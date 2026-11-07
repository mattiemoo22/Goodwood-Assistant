export const KB = `GOODWOOD VIDEO & STREAM: FACTS FROM MATT (the only source of truth)

SCOPE: This assistant is for setup troubleshooting. The stream comes from Sardius: log into Sardius and whoever is managing the broadcast will know what to do with it. Contact for help: __CONTACT__.

POWER: Turn on ALL the switches at the DB board; without that there is no signal or power to anything. The DB board is Stage Left, behind the curtains. Also flip the distro switch directly underneath the DB board. There are two distro switches: only turn the one that has something plugged in, turn it to the right. No power: double-check all DB board switches are on. Otherwise phone Stephen Scott; he calls Charles (the school groundkeeper) and they look at it. Stephen's number is not in this tool; someone else on the team has it.

GEAR: All gear is kept in the cage on stage. The locks and keys are marked so you know which is which. Everything is packed in labelled boxes; no equipment list needed.

SETUP ORDER: DB board switches, distro switch, grab gear, then connect: MEDIA (to main screen and stage display), BC (broadcast laptop), Multiview, loop stage display back into ATEM, Birddog.

STAGE BUG: For both MEDIA and BC setup, plug in a stage bug so audio can be sent to the audio console. The stage bug is a small grey box in the FOH setup boxes. It has an XLR connection on one side (the audio guy connects a cable to it) and an aux port on the other side (connect to your PC).

MEDIA: The MEDIA Mac Mini is on the left of the rack, looking from the front. Three HDMI cables: one already connected to the BiDirectional (BiDi) for the screens; one connected directly to the Mac Mini goes to the monitor; the third goes into another BiDi (from the boxes you took at the beginning). Take the SDI cable connected to ATEM Out 2 and run it to the back; connect it to the white wall box, port labelled "monitor". If that doesn't work, swap it and use the port labelled "stage". There is also an SDI cable on stage that must be connected to another white wall box: the cable is on top of the stage rack, the wall box is under the staircase on that same side of the stage. The stage SDI runs to a BiDi at the back of the rack.

STAGE DISPLAY: Take one of the HDMI outputs on the Mac Mini into the input of a BiDi. BiDi HDMI OUT goes to HDMI 1 on the TV. An SDI cable goes OUT of the BiDi into INPUT 13 on the ATEM; this is how the stage display gets signal and appears on Multiview.

PROPRESENTER: Every time you connect a new screen/display, you might need to close and reopen ProPresenter for it to work. Sometimes go into Configure Screens in ProPresenter and select the correct outputs for the screens. Click Identify on an option to check: e.g. if there is no stage display, click Identify on "BlackMagic Connection"; a logo appears on the screen that device is connected to. Keep going until you find the right output for the screen that isn't working.

BC (broadcast laptop): Needs a BiDi, an SDI cable and a short HDMI. HDMI out of the laptop into the BiDi HDMI INPUT, then SDI OUT of the BiDi to INPUT 3 on the ATEM. For internet, plug an Ethernet cable into port 6 on the network switch. The BC laptop is extra: Matt usually uses his own laptop; others use their own laptop or the Audio Mac Mini.

MULTIVIEW: Shows a preview of all screens connected to the ATEM. An SDI cable is plugged into the MULTIVIEW 1 port on the ATEM; connect it to a BiDi, then HDMI to the monitor.

BIRDDOG (BD): Needs the network switch and the ATEM. ATEM output 6 to SDI 3 on the BD (SDI 3 only; no other SDI port is used). The BD has only ONE network port, so there is no wrong network port to pick on the BD itself. Plug in the Ethernet cable labelled BD into port 3 on the switch. Also connect an Ethernet cable from port 11 on the switch to the wall box Ethernet port labelled "spare/foyer TV". The switch needs internet: connect the cable from the wall box to port 24 on the switch. Set up the uplink first and test that devices have internet before setting up BD. Diagrams of the network switch and ATEM will be printed.

TROUBLESHOOTING
No display on main screen: make sure ATEM is on; SDI OUTPUT 2 connected to the wall box; Main Display in ProPresenter 7 config is outputting to the screen (use Identify Screens); SDI from stage is connected to the wall box under the staircase.
Screens flickering: connect the Multiview SDI to the wall box. If it stops flickering, put the screens SDI back. If it stays stopped, fine; if it flickers again, that SDI is faulty. If Multiview on the main screens still flickers, the fault may be the stage SDI: swap that cable; if it stops, put the old one back to be 100% sure (flickers again = first cable faulty; stays stopped = fluke). If both cables flicker, suspect the BiDi: swap it and repeat. Same process for the stage display.
Stage display not on Multiview: check it is on the correct port; make sure the BiDi has power; unplug and replug each stage display cable one by one checking for signal; check ProPresenter is actually sending to the stage display (easiest: click a worship background and a lyric).
BC no signal on ATEM: check HDMI/SDI in the correct BiDi port; check the correct ATEM port; check the BiDi has power. BC no internet: check the light on the switch port is on; try a different port.
Multiview wrong or blank on monitor: check it is plugged into MV 1, not MV 2; check the BiDi has power (common, easy to forget).
Birddog not working: first ask if you get signal to the TV (BD splash screen, or blank TV?). Splash screen showing: confirm the IP address; if it shows 100.100 it is not getting an IP from the switch. Check the uplink first (if laptops/PCs get internet, uplink works). Then check the Ethernet cable labelled BD is plugged into the BD (it has only ONE network port, so just make sure the cable is in) and that the SDI cable is in SDI 3. Then check port 11 on the switch is connected. Screens black with no signal at all: start with a power cycle, turn the TVs off and on at the wall plug.

PACK DOWN: Simple. Leave network and SDI cables plugged into the ATEM/switch as much as possible so you don't need to worry about wrong ports; just get the right cable.`;
