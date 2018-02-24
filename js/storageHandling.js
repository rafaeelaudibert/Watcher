const storage = require('electron-json-storage');

const defaultPlayerPreferences = {
  summonerName: "TyG Yeux",
  region: "br",
  language: "br",
  finishAtExit: false,
  windowsNotifications: true,
  runesTooltips: true,
  masteriesTooltips: true,
  elosTooltips: true
}

//Stores the playerPreferences
let playerPreferences;

//Tries to get the playerPreferences
storage.get('playerPreferences', function(error, data) {
  if (error) throw error;

  //If there was no data, creates it with the default values
  if (Object.keys(data).length === 0){
    storage.set('playerPreferences', defaultPlayerPreferences, function(error) {
      if (error) throw error;

      storage.get('playerPreferences', function(error, data) {
        if (error) throw error;

        //Assigns the data to playerPreferences and logs it
        console.log("%c[Player Preferences Data]", "color:purple; font-size: medium", "- Created default data for playerPreferences");
        console.log(playerPreferences = data);
      });
    });
  }
  else{ //Else, if there was data stored, shows the values to the log

    //Assigns the data to playerPreferences and logs it
    console.log("%c[Player Preferences Data]", "color:purple; font-size: medium", "- Retrieved already stored data for playerPreferences");
    console.log(playerPreferences = data);
  }
});
