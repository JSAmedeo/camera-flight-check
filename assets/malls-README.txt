Mall number -> mall name lookup, used to show "Menlo Park" instead of just
"0004" on the Welcome screen. Read once at app startup (main.js).

Format: plain CSV, header row required, two columns.

  number,name
  0004,Menlo Park
  0012,Some Other Mall

The camera computer's hostname is expected to be MALL####-Camera (e.g.
MALL0004-Camera). The #### is looked up against the "number" column here.
If the hostname doesn't match that pattern, or the number isn't in this
file, the app falls back to showing the raw hostname instead of a name --
it never blocks the app, just shows less-friendly text.

Add a row per location as you get them. No need to restart anything other
than the app itself for a new row to take effect.
