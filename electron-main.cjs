const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 760,
    minHeight: 560,
    title: 'Prompt Mate',
    icon: path.join(__dirname, 'assets', 'icon.png'),
    backgroundColor: '#f3f0e9',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 18, y: 18 },
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.on('closed', () => { mainWindow = null; });
}

function toggleWindow() {
  if (!mainWindow) createWindow();
  if (mainWindow.isVisible() && mainWindow.isFocused()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.executeJavaScript("document.querySelector('#searchInput')?.focus()");
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Prompt Mate', submenu: [
      { role: 'about' }, { type: 'separator' },
      { label: '隐藏 Prompt Mate', accelerator: 'Command+H', role: 'hide' },
      { type: 'separator' }, { role: 'quit', label: '退出 Prompt Mate' }
    ]},
    { label: '编辑', submenu: [
      { role: 'undo', label: '撤销' }, { role: 'redo', label: '重做' },
      { type: 'separator' }, { role: 'cut', label: '剪切' },
      { role: 'copy', label: '复制' }, { role: 'paste', label: '粘贴' },
      { role: 'selectAll', label: '全选' }
    ]},
    { label: '窗口', submenu: [{ role: 'minimize', label: '最小化' }, { role: 'close', label: '关闭窗口' }] }
  ]));
  createWindow();
  globalShortcut.register('Alt+Space', toggleWindow);
  app.on('activate', () => { if (!mainWindow) createWindow(); else mainWindow.show(); });
});

app.on('window-all-closed', () => {
  // Keep Prompt Mate available through Option + Space on macOS.
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => globalShortcut.unregisterAll());
