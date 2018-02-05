const electron = require('electron');
const url = require('url');
const path = require('path');

//Descontructors
const {app, BrowserWindow, Menu, ipcMain} = electron;

//SET ENV
//process.env.NODE_ENV = 'production';  //UNCOMMENT QUANDO FOR UTILIZAR

let mainWindow;
let newWindow;


//Listen for the app to be ready
app.on('ready', function(){
  //Create new mainWindow

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  var widthReal = width - 75;
  var heightReal = height - 75;
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

  //Build menu from template
  //const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  //Menu.setApplicationMenu(mainMenu);
});

//Handle new window
function createNewWindow(){
  //Create new mainWindow
  newWindow = new BrowserWindow({
    width: 500,
    height: 500,
    title: 'Testando nova janela'
  });

  //Load the HTML file into window
  newWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'newWindow.html'),
    procol: 'file:',
    slashes: true
  }));
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  if(item !== ''){ //Caso haja algum item a ser adicionado
    mainWindow.webContents.send('item:add', item);
  }
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Add Item',
        click(){
          createNewWindow();
        }
      },
      {
        label: 'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If mac, add empty object to Menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

//Add dev tools
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: 'CmdOrCtrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
