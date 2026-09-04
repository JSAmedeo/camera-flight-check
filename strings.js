// ============================================================================
// Camera Flight Check — ALL operator-facing text lives here.
//
// Training materials change: edit copy in this file and reload the app —
// no code changes needed. Rules:
//   • Keep {placeholders} exactly as written; the app fills them in.
//   • Text in quotes can be edited freely. Don't rename the keys (left side).
//   • Tutorial images: drop real equipment photos into assets\tutorials\
//     named  <cardKey>-<stepNumber>.png  (e.g. pole-1.png, strobe-3.png).
//     Until a file exists, the app shows a placeholder telling you the name.
// ============================================================================

window.CFC_STRINGS = {

  // ---- shared button/badge labels ----
  common: {
    start: "Start",
    continue: "Continue",
    back: "Back",
    next: "Next",
    gotIt: "Got it",
    yes: "Yes",
    no: "No",
    close: "Close",
    takePhoto: "Take Photo",
    takingPhoto: "Taking photo…",
    tryAgain: "Try again",
    recheck: "Re-check",
    set: "Set",
    done: "Done",
    checking: "Checking…",
    moreInfo: "More info",
  },

  // ---- skip control + reason prompt (any gated screen) ----
  skip: {
    button: "Skip",
    eyebrowPrefix: "Skipping · ",
    modalTitle: "Why are you skipping this?",
    reasons: ["Running late", "Equipment issue", "Other"],
    otherPlaceholder: "Say a bit more (optional)",
    cancel: "Cancel",
    confirm: "Skip this screen",
  },

  // ---- admin settings screen (gear icon) ----
  settingsScreen: {
    title: "Settings",
    cancel: "Cancel",
    save: "Save changes",
    saving: "Saving…",
    groupGeneral: "General",
    groupLimits: "Camera limits",
    groupOverlay: "Test-photo overlay",
    groupRps: "RPS launch",
    groupHelp: "Need Help contacts",
    locationTitle: "Location & station",
    locationNumberLabel: "Location number",
    locationNumberPlaceholder: "Not detected",
    locationNameLabel: "Location name",
    locationNameNotFound: "Not Found",
    stationLabel: "Station",
    stationPlaceholder: "e.g. Camera 1",
    dataTitle: "Data & logging",
    dataFolderLabel: "Local data folder",
    changeFolder: "Change folder…",
    skipPromptToggle: "Prompt for a reason when skipping",
    limitsTitle: "Camera limits",
    limitsWbLabel: "Allowed white balance presets",
    limitsIsoMin: "ISO min",
    limitsIsoMax: "ISO max",
    limitsApertureMin: "Aperture min (f/)",
    limitsApertureMax: "Aperture max (f/)",
    overlayTitle: "Test-photo overlay",
    overlayOffsetX: "Horizontal offset",
    overlayOffsetY: "Vertical offset",
    overlayScale: "Scale",
    overlayUpload: "Upload image…",
    overlayReset: "Reset to default",
    rpsTitle: "RPS launch",
    rpsPathLabel: "RPS executable path",
    rpsPathPlaceholder: "C:\\CentricsRPSClient\\bin\\CentricsRPSClient.exe",
    helpTitle: "Need Help contacts",
    helpFieldTitle: "Title",
    helpFieldDescription: "Description",
    helpFieldPhone: "Phone",
    helpFieldEmail: "Email",
    helpRemove: "Remove",
    helpAdd: "Add contact",
  },

  // ---- top bar ----
  app: {
    title: "Pre-Flight Ops Check",
    locationNumberOnly: "Location {number}",
    locationUnknown: "Location not set",
    simulatorBadge: "Simulator",
    getHelp: "Get help",
    settings: "Settings",
  },

  // ---- step dots ----
  steps: ["Welcome", "Set Checklist", "Camera", "Test photo", "Done"],

  // ---- screen 1: welcome / sign-in ----
  welcome: {
    title: "Let's get your camera ready",
    ledeBefore: "We'll check a few things together before your shift starts. It takes ",
    ledeBold: "about 4 minutes",
    ledeAfter: ".",
    needsTitle: "What you'll need",
    need1Title: "Grey card",
    need1Text: "Used to calibrate the camera's white balance and exposure.",
    need2Title: "Character in the chair",
    need2Text: "Have Santa or Bunny seated and ready for the test photo.",
    need3Title: "Camera connected and powered on",
    need3Text: "Tethered to this computer and turned on.",
    need4Title: "Flash on",
    need4Text: "Strobe or flash powered on and ready to fire.",
  },

  // ---- screen 2: set checklist ----
  walk: {
    title: "Set checklist",
    lede: "Look at each thing at your station and tap it off when it's good.",
    checkedOff: "checked off",
    tutorial: {
      eyebrow: "Quick how-to",
      of: "of",
      placeholderTitle: "Image coming soon",
      placeholderHint: "To show a photo here, add this file:",
    },
    // Seven checklist cards. Each bullet shows on the card itself AND
    // doubles as a "More info" tutorial step — see WALK_ITEMS in the JSX.
    items: {
      clean: {
        label: "Set is clean",
        bullets: [
        "Personal items are out of sight",
        "Road case and countertops clear of clutter",
        "Fans are out of camera framing"],

      },
      router: {
        label: "Router is powered on and online",
        bullets: [
        "Cradlepoint has 3 or 4 blue bars",
        "Verizon router has all lights solid",
        "POS, camera, and reprint computers are connected/online"],

      },
      webcam: {
        label: "Stura camera is ready",
        bullets: [
        "Webcam is mounted to the pole, facing the character",
        "Flash wire harness isn't blocking the lens",
        "Green light is on"],

      },
      camera: {
        label: "Camera is connected",
        bullets: [
        "Mounted to the pole",
        "All 3 cables connected (data, power, flash)",
        "Power is on"],

        extraSteps: ["Pole clamp mount", "Desk or counter mount"],
      },
      framing: {
        label: "Camera is framed correctly",
        bullets: [
        "Camera is in vertical orientation",
        "Character takes up the majority of the shot",
        "Not too much headroom above"],

      },
      flash: {
        label: "Flash connected/tested",
        bullets: [
        "Flash sync cable connected to both flash and camera hot shoe adapter",
        "Umbrella or softbox installed",
        "Hot shoe adapter fully seated — not backwards"],

      },
    },
  },

  // ---- screen 3: camera check + grey card ----
  camera: {
    detect: {
      title: "Checking your camera…",
      lede: "Hang tight — we're making sure the camera is hooked up.",
      lookingLabel: "Looking for your camera…",
      lookingSub: "Checking the USB connection…",
      foundLabel: "Found your camera",
      settingsLoadingLabel: "Reading camera settings…",
      settingsLoadingSub: "Getting current setup from the camera…",
      settingsLoadedLabel: "Camera settings loaded",
      settingsLoadedSub: "Mode {mode} · ready to calibrate",
      notFoundTitle: "We can't find the camera",
      notFoundBody: "No camera found. Check that the USB cable is plugged in and the camera is turned ON, then try again.",
      unavailable: "Camera system is not available in this window.",
    },
    shoot: {
      title: "Now let's calibrate the camera settings.",
      ledeBefore: "Ask the character to hold up the ",
      ledeGreyCard: "grey card",
      ledeAfter: ". We'll take a photo and use the card to balance the camera.",
      tip1: "Hand the grey card to Santa/Bunny.",
      tip2: "Have them hold it flat against their chest, facing the camera.",
      tip3: "When they're ready, take the photo.",
      greyCardHelpButton: "Can't find your grey card?",
      greyCardHelpTitle: "About your grey card",
      greyCardHelpLines: [
        "Every location is provided a grey card in a clear sleeve, along with startup documentation.",
        "The grey card is a thick piece of cardboard used to calibrate white balance.",
        "Be sure to keep this handy for daily camera calibrations.",
        "If you don't have your grey card, contact logistics to have one shipped out.",
        "You can still run this calibration by selecting a white area in the photo instead."
      ],
      photoPlaceholder: "The photo will appear here",
      refreshSettings: "Refresh settings",
      refreshing: "Refreshing…",
      readFailWarn: "We couldn't read the camera's settings yet. Press Re-check — if it keeps happening, unplug and replug the USB cable.",
      autoModeWarnBefore: "The camera is in ",
      autoModeWarnAuto: "Auto",
      autoModeWarnMiddle: " mode, so we can't adjust its settings. Turn the top mode dial to ",
      autoModeWarnDial: "M",
      autoModeWarnAfter: ", then re-check.",
    },
    select: {
      title: "Drag a box over the grey card",
      titleBusy: "Got it — adjusting…",
      lede: "Make sure to select the whole card — it's okay if the box catches a little of the area just outside it. A single tap works too, but may not give us enough data for an accurate calibration.",
      ledeBusy: "Hang tight — we're using that area to balance the camera.",
      pill: "Drag a box over the grey card",
      balancing: "Balancing camera…",
      check1Title: "Stay inside the card",
      check1Text: "Keep the box on the grey area only — no suit or backdrop.",
      check2Title: "Avoid shadows and fingers",
      check2Text: "Skip dark edges or hands holding the card.",
      check3Title: "Wrong photo?",
      check3Text: "Go back to retake it with the card in view.",
      retakePhoto: "Retake photo",
    },
    applied: {
      title: "Your camera is ready",
      lede: "We used the grey card to measure the photo — here's what we found and what we changed.",
      foundHead: "What we found",
      fixedHead: "What we changed",
      // measurements
      brightnessOnTarget: "Brightness was right on target.",
      brightnessWithin: "Brightness was about {n} stop {dir} — within the good range, no change needed.",
      brightnessIssue: "The photo was about {n} stop{s} too {dir}.",
      dirBright: "bright",
      dirDark: "dark",
      colorsClipped: "The card was too bright to judge color reliably — no color change made.",
      colorsGood: "Colors look good.",
      colorsLeaned: "Colors leaned {strength}{cast}.",
      strengthStrong: "strongly ",
      strengthSlight: "slightly ",
      castWarm: "warm (orange)",
      castCool: "cool (blue)",
      // fixes
      wbLabel: "White balance",
      wbChange: "Was {from} → changed to {to} to remove the {cast} cast",
      isoLabel: "ISO (brightness)",
      isoChange: "Was {from} → changed to {to} (about {n} stop{s} {dir})",
      isoDirDarker: "darker",
      isoDirBrighter: "brighter",
      apertureLabel: "Aperture",
      apertureChange: "Was f/{from} → stopped down to f/{to} for the remaining brightness",
      castNotFixedLabel: "Color cast — not fixed",
      castNotFixed: "White balance is already at the {limit} preset this camera offers ({wb}). If photos still look {look}, check the set lighting or flag it to your lead.",
      limitWarmest: "warmest",
      limitCoolest: "coolest",
      lookBlue: "blue",
      lookOrange: "orange",
      brightnessNotFixedLabel: "Brightness — not fixed",
      brightnessNotFixed: "The camera is already at its limit for this adjustment — flag it to your lead.",
      noChangesLabel: "No changes needed",
      noChanges: "The grey card looked good — your settings were already correct",
      rejectedLabel: "Couldn't apply {key}",
      rejected: "The camera refused {key} = {value} — check the mode dial",
      refreshFailed: "The camera was busy after applying — values shown are what was sent. They'll refresh on the next photo.",
      redoGreyCard: "Redo grey card",
    },
    stats: {
      model: "Model",
      mode: "Mode",
      fstop: "F-stop",
      shutter: "Shutter",
      iso: "ISO",
      wb: "White balance",
      quality: "Image quality",
    },
  },

  // ---- screen 4: test photo + guided QA ----
  testPhoto: {
    aimTitle: "Take a test photo",
    aimLede: "Take a test photo for upload to the Quality Control Dashboard.",
    retakeTitle: "Take another test photo",
    retakeLede: "We adjusted the camera — take a fresh shot to check the fix.",
    photoPlaceholder: "The test photo will appear here",
    photoTakenPill: "Photo taken",
    setup1Title: "Remove Grey Card",
    setup1Text: "Position character naturally.",
    setup2Title: "Leave headroom",
    setup2Text: "A small gap above the chair back, not cropping it.",
    setup3Title: "Check the lighting",
    setup3Text: "Strobe should fire when you tap the button.",
    adjustedNote: "Settings adjusted ({changes}) — take another test photo.",
    atLimitNote: "The camera is already at its limit for that adjustment — take another photo and re-check.",
    reviewTitle: "Check the photo",
    checksPassed: "checks passed",
    checksOf: "of",
    takeItAgain: "Take it again",
    looksGood: "Looks good",
    change: "Change",
    q1Title: "Is the character centered?",
    q1Sub: "Use the Framing Guide as a reference to position the character — with the character centered, you'll be able to frame in and out depending on the number of guests.",
    q1Help: "Adjust the camera on the pole until the character sits inside the dotted guide, then take another photo.",
    q2Title: "Is the photo clear?",
    q2Sub: "Look closely at the face and suit trim — details should be sharp.",
    q2HelpBefore: "Check the auto focus: the lens switch should be on ",
    q2HelpAF: "AF",
    q2HelpAfter: ", and nothing should block the lens. Half-press the shutter to refocus, then retake.",
    q3Title: "Do the colors look right?",
    q3Sub: "Reds should be rich, whites white — not too red or too blue.",
    takeAnotherPhoto: "Take another photo",
    colorYes: "Yes",
    colorTooBright: "Too bright",
    colorTooDark: "Too dark",
    colorWashedOut: "Washed out",
    colorOverSaturated: "Over saturated",
    colorFixHelp: "We'll adjust the camera for you, then you'll take another test photo.",
    adjustAndRetake: "Adjust camera & retake",
    adjusting: "Adjusting…",
  },

  // ---- screen 5: done ----
  done: {
    title: "You're all set!",
    lede: "Your station is ready. Have a great shift.",
    result1: "Station looks good",
    result2: "Camera works and is set up correctly",
    result3: "Test photo turned out well",
    finishedIn: "Finished in",
    minutes: "min",
    seconds: "sec",
    startOver: "Start over",
    closeAndOpenRps: "Close Utility / Open RPS",
    closing: "Closing…",
    launching: "Opening Photo App…",
    rpsNotFound: "RPS not found — closing utility.",
  },

  // ---- help modal ----
  help: {
    title: "Need help?",
    bodyLine1: "For operational questions or anything you're not sure about, contact your local or district manager.",
    bodyLine2: "For technical issues, contact the support helpdesk.",
  },
};
