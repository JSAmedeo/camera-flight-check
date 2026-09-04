Tutorial images for the Set Checklist "More info" popups.

Drop PNG photos here named <cardKey>-<stepNumber>.png and the app shows
them automatically (no code changes). Each checklist item's bullet points
double as its tutorial steps, so the step count below matches the bullets
on that item's card (plus a couple of extra reference photos for "camera",
which has more than one valid mount style). Expected files:

  clean-1.png     clean-2.png     clean-3.png
  router-1.png    router-2.png    router-3.png
  webcam-1.png    webcam-2.png    webcam-3.png
  camera-1.png    camera-2.png    camera-3.png    camera-4.png    camera-5.png
  framing-1.png   framing-2.png   framing-3.png
  flash-1.png     flash-2.png     flash-3.png

camera-4/5 are the "click through to find yours" mount-style photos
(e.g. pole clamp mount vs. desk/counter mount) — see `extraSteps` on the
camera item in strings.js.

Until a file exists, the app shows a placeholder naming the expected file.
Bullet text (shown both on the card and as each step's title) is edited in
strings.js (walk.items.<key>.bullets / .extraSteps).

One more image, same placeholder mechanism, used outside the Set Checklist:

  grey-card-help-1.png   "Can't find your grey card?" popup on the camera
                          calibration screen — a photo of the grey card in
                          its clear sleeve. Text is edited in strings.js
                          (camera.shoot.greyCardHelpLines).
