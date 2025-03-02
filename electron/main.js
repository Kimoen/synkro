const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        icon: '',
        width: 1500,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.center();
    mainWindow.removeMenu();

    const indexPath = path.join(__dirname, '..', 'dist', 'synkro', 'browser', 'index.html');
    console.log("Loading Electron app from:", indexPath);
    mainWindow.loadFile(indexPath);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();


    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
