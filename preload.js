// Exposes window controls to the UI (contextIsolation is on).
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cfc", {
  minimize: () => ipcRenderer.send("win:minimize"),
  close: () => ipcRenderer.send("win:close"),
  runs: {
    save: (event) => ipcRenderer.invoke("runs:save", event),
  },
  camera: {
    mode: () => ipcRenderer.invoke("camera:mode"),
    detect: () => ipcRenderer.invoke("camera:detect"),
    settings: () => ipcRenderer.invoke("camera:settings"),
    capture: () => ipcRenderer.invoke("camera:capture"),
    set: (props) => ipcRenderer.invoke("camera:set", props),
    release: () => ipcRenderer.invoke("camera:release"),
  },
});
