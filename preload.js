// Exposes window controls to the UI (contextIsolation is on).
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cfc", {
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
