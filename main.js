const electron = require('electron');
const url = require('url');
const path = require('path');
const storage = require('electron-json-storage');
const secretInfo = require('./secretInfo');
const backColor = "#e8eaf6";

//SET ENV
//process.env.NODE_ENV = 'production';  //DESCOMENTAR QUANDO FOR UTILIZAR

//Descontructors
const {app, BrowserWindow, Menu, Tray} = electron;

//Shared object, can be acessed from the console
const API = secretInfo.apiKey
global.sharedObj = {
  //You can put your API KEY directly here
  apiKey: secretInfo.apiKey
};

let iconPath = path.join(__dirname, '/assets/icons/png/leagueIconRecording.png');
let mainWindow;
let welcomeWindow;
let trayMenu = null; //Making so that trayMenu is not collected by the GC

//Listen for the app to be ready
app.on('ready', function(){

  //Create new mainWindow
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  let realWidth = width - 25;
  let realHeight = height - 25;
  mainWindow = new BrowserWindow({
    width: realWidth,
    height: realHeight,
    dragable: true,
    //transparent: true,
    frame: false,
    resizable: true
  });

  //Load the HTML file into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'liveMatch.html'),
    procol: 'file:',
    slashes: true
  }));

  //Set the color
  mainWindow.setBackgroundColor(backColor);

  //Hides the mainWindow while not loaded and/or not closed the welcomeWindow
  mainWindow.hide();

  // OVERLAY TESTING
  /*
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);*/

  //Create the welcome page
  let welcomeWidth = realWidth / 100 * 80;
  welcomeWindow = new BrowserWindow({
    width: welcomeWidth,
    height: 500,
    dragable: false,
    transparent: true,
    frame: false,
    resizable: false
  })

  //Load the HTML file into window
  welcomeWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'welcomeWindow.html'),
    procol: 'file:',
    slashes: true
  }));

  //Set the color
  welcomeWindow.setBackgroundColor(backColor);

  //When  the welcomeWindow is closed, shows the mainWindow
  welcomeWindow.on('close', () => mainWindow.show())


  // Tray configuration \\
  trayMenu = new Tray(iconPath);
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


  trayMenu.setContextMenu(trayContextMenu)

  trayMenu.on('click', function(event){
    event.preventDefault();
    mainWindow.show();
  });

  //When trying to minimize, hide to tray instead
  mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });

  //See if we need to close or to minimize when clicking in the exit button
  storage.get('playerPreferences', function(error, data) {
    if (error) throw error;

    //If the player chose not to close when clicking to exit, hide the window
    if (!data.finishAtExit){

      mainWindow.on('close', function (event) {
        if(!mainWindow.isQuiting){
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
      });
    }
  });

});
