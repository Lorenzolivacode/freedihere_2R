const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");

// Determina se sei in sviluppo
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Carica il bridge
      contextIsolation: true, // Sicurezza attiva
      nodeIntegration: false, // Disabilita node diretto nel FE
    },
  });

  if (isDev) {
    // In sviluppo punta al server Vite
    win.loadURL("http://localhost:5173");
    // win.webContents.openDevTools(); // Opzionale: apre i devtools all'avvio
  } else {
    // In produzione punta al file compilato
    win.loadFile(path.join(__dirname, "../app/dist/index.html"));
  }
}

app.whenReady().then(createWindow);

// Listener per il bridge
ipcMain.on("quit-app", () => app.quit());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
