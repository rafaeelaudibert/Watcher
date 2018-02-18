const electron = require('electron');
const url = require('url');
const path = require('path');

//Descontructors
const {app, BrowserWindow, Menu, ipcMain, Tray} = electron;

//SET ENV
//process.env.NODE_ENV = 'production';  //UNCOMMENT QUANDO FOR UTILIZAR

let iconPath = path.join(__dirname, '/assets/icons/win/icon.ico');
let mainWindow;
let newWindow;

//Shared object, can be acessed from the console
global.sharedObj = {
  apiKey: "RGAPI-7d990bb2-0a79-43b9-9b98-f7b97d9e7fb2"
};


//Listen for the app to be ready
app.on('ready', function(){
  //Create new mainWindow
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  var widthReal = width - 25;
  var heightReal = height - 25;
  mainWindow = new BrowserWindow({
  width: widthReal,
  height: heightReal,
  dragable: true,
  // transparent: true,
  frame: false,
  resizable: false});

  //Load the HTML file into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    procol: 'file:',
    slashes: true
  }));

// Tray configuration \\
var trayMenu = new Tray(iconPath);
trayMenu.setToolTip("LiveTracker")

//Tray menu
var trayContextMenu = Menu.buildFromTemplate([
  {
    label: 'LiveTracker Super Tray',
    enabled: false
  },
  {
    type: 'separator',
    enabled: false
  },
  {
    label: 'Show LiveTracker',
    click:  function(){
      mainWindow.show();
    }
  },
  {
    label: 'Quit',
    click:  function(){
      mainWindow.isQuiting = true;
      mainWindow.close();
    }
  }
]);
if(process.platform == 'darwin'){
  trayContextMenu.unshift({});
} // If mac, add empty object to Menu
trayMenu.setContextMenu(trayContextMenu)


trayMenu.on('click', function(event){
  event.preventDefault();
  mainWindow.show();
});

mainWindow.on('minimize',function(event){ //When trying to minimize, hide to tray instead
  event.preventDefault();
  mainWindow.hide();
  trayMenu.setContextMenu(trayContextMenu);
});

mainWindow.on('close', function (event) { //When trying to close, hide to tray instead
  if(!mainWindow.isQuiting){
      event.preventDefault();
      mainWindow.hide();
      trayMenu.setContextMenu(trayContextMenu);
  }
  return false;
});

});
