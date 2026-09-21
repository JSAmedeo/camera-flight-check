// Exposes window controls to the UI (contextIsolation is on).
const { contextBridge, ipcRenderer } = require("electron");

// Read once, synchronously, at preload time -- exposed as a plain value
// (not a function) since it can't change during the session. The renderer
// uses this to decide whether the global keyboard-shortcut bypass (CFC-03)
// should exist at all.
const isPackaged = ipcRenderer.sendSync("app:isPackagedSync");

contextBridge.exposeInMainWorld("cfc", {
  isPackaged,
  minimize: () => ipcRenderer.send("win:minimize"),
  close: () => ipcRenderer.send("win:close"),
  launchRps: () => ipcRenderer.invoke("app:launchRps"),
  runs: {
    save: (event) => ipcRenderer.invoke("runs:save", event),
  },
  settings: {
    load: () => ipcRenderer.invoke("settings:load"),
    save: (partial) => ipcRenderer.invoke("settings:save", partial),
    hostname: () => ipcRenderer.invoke("settings:hostname"),
    pickFolder: () => ipcRenderer.invoke("settings:pickFolder"),
    pickImage: () => ipcRenderer.invoke("settings:pickImage"),
    pickDocFile: () => ipcRenderer.invoke("settings:pickDocFile"),
  },
  help: {
    openDoc: (doc) => ipcRenderer.invoke("help:openDoc", doc),
  },
  calibration: {
    save: (payload) => ipcRenderer.invoke("calibration:save", payload),
  },
  camera: {
    mode: () => ipcRenderer.invoke("camera:mode"),
    detect: () => ipcRenderer.invoke("camera:detect"),
    settings: () => ipcRenderer.invoke("camera:settings"),
    capture: () => ipcRenderer.invoke("camera:capture"),
    set: (props) => ipcRenderer.invoke("camera:set", props),
    release: () => ipcRenderer.invoke("camera:release"),
    releaseForHandoff: () => ipcRenderer.invoke("camera:releaseForHandoff"),
  },
});
