const jquery = require("jquery");
const remote = require('electron').remote;
const path = require('path');
const apiKey = remote.getGlobal('sharedObj').apiKey;
const seasonAtual = 11;
const defaultPlayer = 'mcgirino123'
const defaultServer = 'br'
const {
  Kayn,
  REGIONS
} = require("kayn");

const notifier = require('node-notifier');

// Object
/*notifier.notify(
  {
    title: 'LiveTracker',
    message: 'The app is running now!',
    icon: path.join(__dirname, 'assets/icons/png/leagueIcon.png'),
    timeout: 1
  },
  function(err, response) {
    // Response is response from notification
    console.log(err);
    console.log(response);
  }
);*/


/**
 * Configuring Kayn
 */
const kayn = Kayn(apiKey)({
  debugOptions: {
    isEnabled: true,
    showKey: false,
    loggers: {}
  },
  region: "br",
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: true
  },
  cacheOptions: {
    cache: null,
    ttls: {}
  }
});

/**
 * MATCH INFORMATION
 */

//Match information constructor
class Match {
  constructor() {
    this.runesInfo = undefined,
      this.patch = undefined,
      this.gameId = undefined,
      this.gameMode = undefined,
      this.gameType = undefined,
      this.gameQueueConfigId = undefined,
      this.mapId = undefined,
      this.platformId = undefined,
      this.playersList = new Array(0) //list which contains all the match's (mainPlayer match) players information
  }
}
const matchInformation = new Match();


/**
 * List with all the champions
 */
let championList = kayn.Static.Champion.list()
  .region(defaultServer)
  .then(list => {
    championList = list.data
    console.log("%c[setChampionList]", "color:purple; font-size: medium", "- Generated Champion List");
  })
  .catch(console.log);

/**
 * mainPlayer information
 */
let mainPlayer
kayn.Summoner.by.name(defaultPlayer)
  .region(defaultServer)
  .then(data => {
    mainPlayer = data;
    mainPlayer.server = defaultServer;
    console.log("%c[mainPlayer]", "color:purple; font-size: medium", "- Created MainPlayer Basic Information");
    kayn.ChampionMastery.list(mainPlayer.id).then(data => mainPlayer.championMastery = data);
    kayn.LeaguePositions.by.summonerID(mainPlayer.id).then(parsePlayerLeague);
    console.log(data);
  })
  .catch(console.log);



/**
 * Patch information
 */
kayn.Static.Version.list().then(data => {
  matchInformation.patch = data[0];
  console.log("%c[patch]", "color:purple; font-size: medium", "- Retrieved latest Patch");
})

/**
 * Runes information
 */
let runesPath = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
jquery.getJSON(runesPath)
  .then(data => {
    parseRunes(data)
      .then(data => matchInformation.runesInfo = data)
      .catch(console.log);
  })
  .catch(console.log);

/**
 * Methods availability
 */
let statusPath = 'http://querijn.codes/api_status/1.1/';
let APIStatus = []
jquery.getJSON(statusPath)
  .then(data => {
    for (var key in data) {
      for (var server in data[key]) {
        console.log()
        if (data[key][server].state !== 'up') {
          APIStatus.push(
            key + " - " +
            server + " - " +
            data[key][server].state + " - " +
            data[key][server].uptime
          );
        }
      }
    }
    console.log("%c[RiotAPI Status]", "color:purple; font-size: medium", "- Retrieved APIStatus");
    if (APIStatus.length > 0) {
      console.log("%c[RiotAPI Status]", "color:purple; font-size: medium", "- Some methods have problems");
      console.log(APIStatus);
    } else {
      console.log("%c[RiotAPI Status]", "color:purple; font-size: medium", "- Everything is okay");
    }

  })
  .catch(console.log);


async function parseRunes(runes) {
  let runesObject = {};
  runes.forEach(rune => {
    runeId = rune.id.toString();
    runesObject[runeId] = rune.shortDesc
  })
  console.log("%c[runesInfo]", "color:purple; font-size: medium", "- Retrieved Runes Information from CDragon");
  return runesObject;
}

//Gets the initial info: Info from people playing in the match being played bi the mainPlayer
async function getInitialInfo(server = mainPlayer.server) {

  //Gets the mainPlayer's currentGame info
  let currentGame = kayn.CurrentGame.by.summonerID(mainPlayer.id).region(server)
  currentGame.then(game => {
      console.log(game);

      //Sets the other information in matchInformation
      matchInformation.gameId = game.gameId;
      matchInformation.gameMode = game.gameMode;
      matchInformation.gameType = game.gameType;
      matchInformation.gameQueueConfigId = game.gameQueueConfigId;
      matchInformation.mapId = game.mapId;
      matchInformation.platformId = game.platformId;
      matchInformation.playersList = new Array(0);
      console.log("%c[matchInformation]", "color:purple; font-size: medium", "- Retrieved some match Information");

      //Creates the players object pushing its information to matchInformation.playersList
      game.participants.map(participante => matchInformation.playersList.push(
        new Player(
          participante.summonerName,
          participante.profileIconId,
          participante.championId,
          participante.summonerId,
          participante.perks.perkIds
        )))
      //Created all the players in matchInformation.playersList
      console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled all the players list with the match's players");
      console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled with summonerName, profileIcon, championId, summonerId and runes");

      //Gets the champion Name according to the champion Id, for each player in matchInformation.playersList
      matchInformation.playersList.map(async participante => {
        for (campeao in championList) {
          if (championList[campeao].id == participante.championId) {
            //Seto o nome do campeão
            participante.championName = championList[campeao].name;
            console.log("%c[championDecoding]", "color:purple; font-size: medium", "- Decoded this champion!");
          }
        }
      })

      matchInformation.playersList.map(async participante => {
        let runesCopy = new Array(6);
        for (rune in participante.runes) {
          runeId = participante.runes[rune];
          participante.runes[rune] = {
            runeId: runeId,
            runeDescription: matchInformation.runesInfo[runeId]
          }
        }
        console.log("%c[runeDescription]", "color:purple; font-size: medium", "- Created rune description for this champion!");
      })

      //Gets the championMasteryLevel and championMasteryPoints, for each player in matchInformation.playersList
      matchInformation.playersList.map(async participante => {
        kayn.ChampionMastery.get(participante.summonerId)(participante.championId)
          .region(server)
          .then(data => {
            participante.championMasteryLevel = data.championLevel;
            participante.championMasteryPoints = data.championPoints;
            console.log("%c[mastery]", "color:purple; font-size: medium", "- Champion Mastery set!")
          })
      })

      //Gets the higherLeague for the player
      matchInformation.playersList.map(async participante => {
        kayn.LeaguePositions.by.summonerID(participante.summonerId)
          .region(server)
          .then(maiorLiga)
          .then(function(higherLeague) {
            participante.liga = higherLeague;
            console.log("%c[higherLeague]", "color:purple; font-size: medium", "- Higher League set!")
          })
      })

    })
    .catch(error => {
      if (error.statusCode == 404) {
        console.log("%c[getMatch]", "color:purple; font-size: medium", "- Player is not in an active match")
      } else {
        console.log(error)
      }
    });

}

//Get the playerLevel and the playerAccountId
async function getBasicInfo(server = mainPlayer.server) {
  //Gets info of all the players
  const players = Promise.all(matchInformation.playersList.map(participante => kayn.Summoner.by.name(participante.name).region(mainPlayer.server)));
  players.then(async value => {

      //Sets the info of the players in the matchInformation.playersList array
      for (participante in matchInformation.playersList) {
        var player = matchInformation.playersList[participante]
        var infoPlayer = value[participante]
        player.level = infoPlayer.summonerLevel;
        player.accountId = infoPlayer.accountId;
      }
      console.log("%c[basicInfo]", "color:purple; font-size: medium", "- Set the basic info")
    })
    .catch(err => console.log(err));
}

//Get matches for each player. After calls the function who sets the champion Win Rate for each player.
async function getAdvancedInfo(server = mainPlayer.server) {
  console.log("Started looking for matchLists")
  const idMatches = Promise.all(matchInformation.playersList.map(player => retornaIdPartidasCampeoes(server, player.championId, player.accountId)));

  idMatches.then(async value => {
    //Sets the matchlist
    for (participante in matchInformation.playersList) {
      var player = matchInformation.playersList[participante]
      var matchIDs = value[participante]
      player.matchList = matchIDs
    }

    //Gets the real matches and set the wins/win rate
    for (participante in matchInformation.playersList) {
      getChampInfo(participante, server)
    }

  })
}


//This gets the matches after having the ID of the matches. After sets matches/Win Rate with the champion
async function getChampInfo(playerPos, server = mainPlayer.server) {

  //Alias for matchInformation.playersList[playerPos]
  var thisPlayer = matchInformation.playersList[playerPos]

  //Gets the matches perse
  console.time("Player: " + playerPos);
  const matches = await Promise.all(thisPlayer.matchList.map(data => kayn.Match.get(data).region(server)));
  console.timeEnd("Player: " + playerPos);

  //Check the victory in the matches
  const checkVictory = matches.map(match => checaVitoria(match, thisPlayer.accountId));
  const wins = checkVictory.reduce((a, b) => a + b, 0);

  //Sets the values in matchInformation.playersList
  thisPlayer.championMatches = matches.length;
  thisPlayer.championWins = wins;
  if (matches.length > 0) {
    thisPlayer.championWR = porcentagemVitorias(wins, matches.length);
  }

}
