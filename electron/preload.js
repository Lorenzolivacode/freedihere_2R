const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    // Esempio: funzione per chiudere l'app dal frontend
    quitApp: () => ipcRenderer.send("quit-app"),
    // Puoi aggiungere qui comunicazioni dirette se non vuoi usare HTTP
});
