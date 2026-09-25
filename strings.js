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
    otherPlaceholder: "Say a bit more (optional)",
    cancel: "Cancel",
    confirm: "Skip this screen",
  },

  // ---- admin settings screen (gear icon) ----
  settingsScreen: {
    title: "Application Settings",
    cancel: "Cancel",
    save: "Save changes",
    saving: "Saving…",
    groupGeneral: "General",
    groupCamera: "Camera",
    groupOverlay: "Test-photo overlay",
    groupHelp: "Help Config",
    locationTitle: "Location & station",
    locationNumberLabel: "Location number",
    locationNumberPlaceholder: "Not detected",
    locationNameLabel: "Location name",
    // Leave the box empty to use the name from the location data (shown
    // underneath). Type a name only to override it for this station.
    locationNamePlaceholder: "Using the name below",
    // Shown instead when there's no name to fall back on, so the box doesn't
    // point at a line that says there's nothing there.
    locationNamePlaceholderNoData: "Type a name for this station",
    locationValueNotSet: "Not set",
    locationNumberChange: "Change number",
    locationNameChange: "Change name",
    locationNameFromData: "From location data: {name}",
    locationNameNotFound: "No location data for this number yet.",
    stationLabel: "Station",
    stationPlaceholder: "e.g. Camera 1",
    dataTitle: "File Output Paths",
    pathCompletionLogs: "Completion Logs",
    pathTestPhotos: "Test Photos",
    pathDiagnostics: "Diagnostics",
    calibrationDiagnosticsToggle: "Save a copy of each grey-card photo and reading (for troubleshooting)",
    changeFolder: "Change folder…",
    skipReasonsTitle: "Skip Reasons",
    skipPromptToggle: "Prompt for a reason when skipping",
    skipReasonAdd: "Add reason",
    exitCommandsTitle: "App Defaults",
    rpsLaunchToggle: "Default App to Launch on Exit",
    rpsAppNameLabel: "App name",
    rpsAppNamePlaceholder: "e.g. RPS",
    passwordTitle: "Settings password",
    passwordEnableToggle: "Require a password to open Settings",
    passwordFieldLabel: "Password",
    passwordPlaceholder: "Enter a password",
    passwordShow: "Show",
    passwordHide: "Hide",
    defaultsTitle: "Default Camera Settings",
    defaultsLede: "Used when the grey card can't be read reliably — the operator can revert to these instead of guessing at whatever the camera was mid-adjustment.",
    defaultsIso: "ISO",
    defaultsShutter: "Shutter speed",
    defaultsAperture: "F-stop",
    defaultsWb: "White balance",
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
    overlayTakePhoto: "Take Reference Photo",
    rpsPathLabel: "RPS executable path",
    rpsPathPlaceholder: "C:\\CentricsRPSClient\\bin\\CentricsRPSClient.exe",
    helpTitle: "Additional Contacts",
    helpFieldTitle: "Title",
    helpFieldDescription: "Description",
    helpFieldPhone: "Phone",
    helpFieldEmail: "Email",
    helpRemove: "Remove",
    helpAdd: "Add contact",
    helpDocsTitle: "Documentation",
    helpDocAdd: "Add documentation",
    helpDocFieldName: "Documentation name",
    helpDocFieldLocalFile: "Local file",
    helpDocFieldUrl: "External URL",
    helpDocLocalFilePlaceholder: "No file selected",
    helpDocUrlPlaceholder: "https://example.com/doc",
    helpDocBrowse: "Browse…",
    videoPlayerLabel: "Default video player",
    videoPlayerPlaceholder: "Not set (uses Windows default)",
    helpMoveUp: "Move up",
    helpMoveDown: "Move down",
    helpChangeOrder: "Change Order",
    // Auto-filled manager contacts (Help Config → Contacts)
    helpAutoTitle: "Manager Contacts",
    helpAutoNote: "These are filled in for this location and stay up to date on their own.",
    helpAutoRegionalToggle: "Fetch regional manager contact info",
    helpAutoDistrictToggle: "Fetch district manager contact info",
    helpAutoBadge: "Auto-filled",
    helpAutoUrlLabel: "Location data web address",
    helpAutoUrlPlaceholder: "https://example.com/locations.json?season={season}",
    // {season} in the address is filled in automatically: S = Santa, B = Bunny,
    // plus the year (S2026 = Santa 2026). Santa runs August through January,
    // Bunny February through July.
    helpAutoSeasonLabel: "Season",
    helpAutoSeasonAuto: "Now using {season} (worked out from today's date)",
    helpAutoSeasonOverrideLabel: "Use a different season",
    helpAutoSeasonOverridePlaceholder: "Automatic",
    helpAutoSeasonForced: "Forced to {season}. Clear this box to go back to automatic.",
    helpAutoResolvedUrl: "Asking for: {url}",
    helpAutoStatusNever: "No location data yet — this station hasn't been able to reach the web address.",
    helpAutoStatusOk: "Location data updated {when}.",
    helpAutoStatusNoUrl: "Add a web address above to turn this on.",
    helpAutoStatusNoNumber: "Set a location number on the General tab to match this station.",
    helpAutoStatusNoRecord: "Location {number} isn't in the location data yet.",
    helpAutoStatusNoManagers: "No managers are listed for this location yet.",
    helpAutoStatusOff: "Turned off — this contact won't be shown.",
    helpAutoLastError: "Last try failed: {error}",
  },

  // ---- auto-filled manager contacts (shown in the Need Help popup) ----
  // Titles read as the role, not the person, so an operator scans for who to
  // call rather than for a name they may not know. {name} · {area} sits under
  // it as the description line.
  helpAuto: {
    regionalTitle: "Regional Manager",
    districtTitle: "District Manager",
    description: "{name} · {area}",
  },

  // ---- top bar ----
  app: {
    title: "Pre-Flight Ops Check",
    locationNumberOnly: "Location {number}",
    locationUnknown: "Location not set",
    simulatorBadge: "Simulator",
    getHelp: "Get help",
    settings: "Settings",
    bypassButton: "Camera Settings Bypass",
  },

  // ---- Camera Setting Bypass (top bar, Welcome only) -- quick camera
  // diagnostics/adjustment for field staff and helpdesk, outside the
  // normal pre-flight check flow. No settings password required.
  bypass: {
    title: "Camera Setting Bypass",
    lede: "Check or adjust the camera directly, without starting a full pre-flight check.",
    checking: "Checking camera…",
    applying: "Sending to camera…",
    tryAgain: "Try again",
    checkConnection: "Check Connection",
    notFoundBody: "Check the USB cable and make sure the camera is powered on, then try again.",
    lostConnectionBody: "The camera stopped responding. Check the USB cable and power, then try again.",
    connectedLabel: "Connected",
    lostConnectionLabel: "Lost Connection",
    notConnectedLabel: "No camera connected",
    statusTitle: "Camera status",
    photoPlaceholder: "No photo yet",
    modeWarnBefore: "The camera is in ",
    modeWarnAuto: "Auto",
    modeWarnMiddle: " mode, so settings can't be read or changed. Turn the top mode dial to ",
    modeWarnDial: "M",
    modeWarnAfter: ", then check again.",
    readFailWarn: "Couldn't read camera settings. Re-check the USB connection.",
    currentTitle: "Current settings",
    adjustTitle: "Manually Adjust Camera Settings",
    isoLabel: "ISO",
    shutterLabel: "Shutter speed",
    apertureLabel: "F-stop",
    wbLabel: "White balance",
    applyButton: "Apply settings",
    presetsTitle: "Presets",
    presetsLede: "Save setting combos to apply in one tap (matched to the nearest value this camera supports).",
    presetNamePlaceholder: "Preset name",
    newPresetName: "New preset",
    applyPreset: "Apply Preset",
    removePreset: "Remove",
    addPreset: "Add preset",
    savePresets: "Save presets",
    presetsSaved: "Saved",
    editPreset: "Edit",
    doneEditing: "Done",
    moveUp: "Move up",
    moveDown: "Move down",
  },

  // ---- step dots ----
  steps: ["Welcome", "Set Checklist", "Camera", "Test photo", "Done"],

  // ---- screen 1: welcome / sign-in ----
  welcome: {
    title: "Let's get your camera ready",
    // Two sentences, each on its own line. ledeIntro is the first line; the
    // three ledeBefore/Bold/After pieces make up the second (split only so the
    // duration can be bold) and always start a new line.
    ledeIntro: "We'll run through a checklist and calibrate your camera using the grey card.",
    ledeBefore: "This will take ",
    ledeBold: "about 2 minutes",
    ledeAfter: ".",
    needsTitle: "What you'll need",
    need1Title: "Grey card",
    need1Text: "Used to calibrate the camera's white balance and exposure.",
    need2Title: "Character in the chair",
    need2Lines: [
      "Have Santa or Bunny seated and ready for the test photo.",
      "If your character is not available, the grey card can be propped up in the empty chair.",
    ],
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
    itemNotApplicable: "Skip this step",
    itemSkipped: "Skipped",
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
      check3Title: "Happy with the box?",
      check3Text: "Tap the green checkmark to use it, or the red X to draw a new one.",
      check4Title: "Wrong photo?",
      check4Text: "Go back to retake it with the card in view.",
      retakePhoto: "Retake photo",
      confirmBox: "Use this box",
      discardBox: "Remove this box",
      rejectGeneric: "The selected area doesn't look like a grey card. Make sure the box is right on the card and try again.\n\nIf the photo is overly bright or dark, try reverting your camera settings to default using the button below - then retake the picture.\n\nIf you have already reverted the camera to default settings and the image is still too bright or dark, try increasing or decreasing your external flash output.",
      revertToDefaults: "Revert to default settings",
      revertedTitle: "Camera settings reverted",
      revertedBody: "Your camera has been set to this station's default settings. Take a new photo to try the grey card again.",
      // Terminal escape hatch (CFC-04): some problems, like a manual external
      // flash slider, aren't fixable from software at all. Proceeding makes
      // no camera changes -- it just stops the operator from being stuck
      // redrawing/reverting in a loop with no way past a real hardware limit.
      proceedWithPicture: "Proceed with this picture",
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
      castNotFixedLabel: "Color cast — not changed",
      castNotFixed: "White balance is already at the {limit} preset this camera offers ({wb}). If photos still look {look}, check the set lighting.",
      limitWarmest: "warmest",
      limitCoolest: "coolest",
      lookBlue: "blue",
      lookOrange: "orange",
      brightnessNotFixedLabel: "Brightness — not changed",
      brightnessNotFixed: "The camera is already at its limit for this adjustment.",
      noChangesLabel: "No changes needed",
      noChanges: "The grey card looked good — your settings were already correct",
      rejectedLabel: "Couldn't apply {key}",
      rejected: "The camera refused {key} = {value} — check the mode dial",
      refreshFailed: "The camera was busy after applying — values shown are what was sent. They'll refresh on the next photo.",
      redoGreyCard: "Redo grey card calibration",
      // "Proceed with this picture" path (CFC-04): no usable grey-card
      // reading, operator moved on anyway -- a real hardware limit (e.g. a
      // manual external flash slider) can make every attempt fail.
      uncalibratedFound: "We couldn't get a clean reading from the grey card, so brightness and color weren't checked.",
      uncalibratedChangedLabel: "Camera settings",
      uncalibratedChanged: "Left as-is — nothing was changed automatically.",
      ledeUncalibrated: "We couldn't get a usable reading from the grey card, so nothing was measured or changed.",
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
    aimLede: "Take a test photo to check photo composition and quality. Use the tools to fine tune color and brightness.",
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
    skipAndContinue: "Skip and continue",
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
    closeAndOpenApp: "Finish and Launch {name}",
    closeOnly: "Finish and Close",
    closing: "Closing…",
    launching: "Opening Photo App…",
    rpsNotFound: "RPS not found — closing utility.",
  },

  // ---- help modal ----
  help: {
    title: "Need help?",
    bodyLine0: "Review documentation for system setup and RPS training.",
    bodyLine1: "For operation questions, contact your local or district manager.",
    bodyLine2: "For technical issues, contact the support helpdesk.",
    docsEyebrow: "Documentation",
    contactsTitle: "Contacts",
  },

  // ---- settings password gate ----
  settingsGate: {
    title: "Settings locked",
    body: "Enter the settings password to continue.",
    fieldLabel: "Password",
    placeholder: "Password",
    wrongPassword: "That password isn't right — try again.",
    cancel: "Cancel",
    unlock: "Unlock",
  },
};
