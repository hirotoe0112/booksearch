const {app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    });
    //win.openDevTools();
    //win.setMenu(null);
    win.loadFile('index.html');
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    //macOSでなければすべてのウインドウを終了したときにアプリを終了する
    if(process.platform !== 'darwin') app.quit();
});