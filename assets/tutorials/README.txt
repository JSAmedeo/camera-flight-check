Tutorial images for the Set Checklist "More info" popups.

Drop PNG photos here named <cardKey>-1.png and the app shows them
automatically (no code changes). ONE photo per checklist item — the popup is
a single page: your photo at the top, then every bullet for that item listed
underneath. Expected files, six in total:

  clean-1.png
  router-1.png
  webcam-1.png
  camera-1.png
  framing-1.png
  flash-1.png

Where an item covers more than one kind of equipment — different camera grips
or mounts, different router models — make the single photo a COMPOSITE: one
image showing each variant side by side, rather than trying to get several
files to display. One file per item is all the popup will look for, so the
compositing happens in whatever you edit the photo in, not in the app.

(Before 2026-10-19 the popup paged through one photo per bullet, so this list
used to ask for 20 files named -1 through -5. Those extra numbers are no
longer looked for. If you already shot them, the -1 of each set is the one
that's used; the rest can be ignored or deleted.)

Until a file exists, the app shows a placeholder naming the expected file.
Bullet text (shown both on the card and in the popup) is edited in
strings.js (walk.items.<key>.bullets, plus .extraSteps on the camera item —
its two mount styles are now bullets rather than their own photo screens).

One more image, same placeholder mechanism, used outside the Set Checklist:

  grey-card-help-1.png   "Can't find your grey card?" popup on the camera
                          calibration screen — a photo of the grey card in
                          its clear sleeve. Text is edited in strings.js
                          (camera.shoot.greyCardHelpLines).
