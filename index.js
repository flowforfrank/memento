const { app, BrowserWindow, Menu, screen, Tray } = require('electron');

require('electron-reload')(__dirname);

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    Menu.setApplicationMenu(false);

    window = new BrowserWindow({
        width: width / 1.25,
        height: height / 1.25,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.on('minimize', e => {
        e.preventDefault();
        window.hide();
    });
    
    window.on('close', e => {
        e.preventDefault();
        window.hide();
    });

    window.loadFile('public/index.html');
};

let appIcon = null;
let window = null;

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());
app.on('ready', () => {
    appIcon = new Tray('public/favicon.png');

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', click: () => window.show() },
        { label: 'Quit', click: () => {
            window.destroy();
            app.quit();
        }}
    ]);
  
    appIcon.setContextMenu(contextMenu);
});