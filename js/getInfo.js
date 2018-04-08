// Requires
const jquery = require("jquery");
const remote = require('electron').remote;
const path = require('path');
const {
  Kayn,
  REGIONS
} = require("kayn");
const notifier = require('node-notifier');

//Information constants
const apiKey = remote.getGlobal('sharedObj').apiKey;
const seasonAtual = 11;
const defaultPlayer = 'TyG Masked';
const defaultServer = 'br';


// NOTIFICATION MODEL
/*notifier.notify(
  {
    title: 'LiveTracker',
    message: 'The app is running now!',
    icon: path.join(__dirname, 'assets/icons/png/leagueIcon.png'),
    timeout: 1
  },
  function(err, response) {
    // Response is response from notification
    console.log("ERR: " + err);
    console.log("RESPONSE: " + response);
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
    this.map = undefined,
    this.platformId = undefined,
    this.playersList = new Array(0) //list which contains all the match's (mainPlayer match) players information
  }
}
const matchInformation = new Match();


/**
 * mainPlayer information
 */
let mainPlayer;
kayn.Summoner.by.name(defaultPlayer)
  .region(defaultServer)
  .then(data => {
    mainPlayer = data;
    mainPlayer.server = defaultServer;
    console.log("%c[mainPlayer]", "color:purple; font-size: medium", "- Created MainPlayer Basic Information");

    kayn.ChampionMastery.list(mainPlayer.id) //Champion Mastery list
        .then(data => parseMastery(data).then(parsedData => mainPlayer.championMastery = parsedData))
        .catch(console.log);

    kayn.LeaguePositions.by.summonerID(mainPlayer.id) //Leagues information
        .then(parsePlayerLeague)
        .catch(console.log);

    kayn.Static.Version.list() //Patch information
        .then(data => {
          matchInformation.patch = data[0];
          mainPlayer.patch = data[0];
          console.log("%c[patch]", "color:purple; font-size: medium", "- Retrieved latest Patch");
        })
        .catch(console.log);
    console.log(data);
  })
  .catch(console.log);


/**
 * Runes information
 */
const runesPath = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
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
const statusPath = 'http://querijn.codes/api_status/1.1/'; //RIOT API page
const APIStatus = [];
jquery.getJSON(statusPath)
  .then(data => {
    //Iterates through the object to find everything which is not up, pushing to APIStatus
    for (let key in data) {
      for (let server in data[key]) {
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

    if (APIStatus.length > 0) {
      //If we have some problem
      console.log("%c[RiotAPI Status]", "color:purple; font-size: medium", "- Some API methods have problems");
      console.log(APIStatus);
    } else {
      //No problem with the Riot API
      console.log("%c[RiotAPI Status]", "color:purple; font-size: medium", "- Everything in the API is okay");
    }

  })
  .catch(console.log);

// Parse the runes information
async function parseRunes(runes) {

  //Creates a 'better' runes object, with the ID being the key
  const runesObject = {};

  runes.forEach(rune => {
    runeId = rune.id.toString();
    runesObject[runeId] = {
      description: rune.shortDesc.split(".,").join(".<br>"),
      name: rune.name
    }
  })
  console.log("%c[runesInfo]", "color:purple; font-size: medium", "- Retrieved Runes Information from CDragon");
  return runesObject;
}
/**
 * List with all the champions - It is handled inside parseMastery
 */
let championList;


// Parse the championMastery information
async function parseMastery(mastery){

  //Creates a 'better' mastery object, separated by mastery level
  const masteryObject = {
    m7: [],
    m6: [],
    m5: [],
    m4: [],
    m3: [],
    m2: [],
    m1: []
  }

  kayn.Static.Champion.list()
    .region(defaultServer)
    .then(list => {
      championList = list.data
      console.log("%c[setChampionList]", "color:purple; font-size: medium", "- Generated Champion List");

      mastery.map(champion => {

        //Champion names
        for (champ in championList) {
          if (championList[champ].id == champion.championId) {
            //Set the champion name
            champion.championName = championList[champ].name;
          }
        }

        switch(champion.championLevel){
          case 7:
            masteryObject.m7.push(champion);
            break;
          case 6:
            masteryObject.m6.push(champion);
            break;
          case 5:
            masteryObject.m5.push(champion);
            break;
          case 4:
            masteryObject.m4.push(champion);
            break;
          case 3:
            masteryObject.m3.push(champion);
            break;
          case 2:
            masteryObject.m2.push(champion);
            break;
          case 1:
            masteryObject.m1.push(champion);
            break;
        }
      })
      console.log("%c[masteryList]", "color:purple; font-size: medium", "- Generated Mastery list");
    })
    .catch(console.log);

  return masteryObject;
}

//Only an alias
async function getMatch(server){
    fetchInitialInfo(server);
}


//Fetch the initial info: Info from people playing in the match being played bi the mainPlayer
async function fetchInitialInfo(server) {

  //Assigns the server if no server explicitly asked
  if (!server){
    server = mainPlayer.server
  };

    //Gets the mainPlayer's currentGame info
  kayn.CurrentGame.by.summonerID(mainPlayer.id).region(server).then(game => {

      //Sets the other information in matchInformation
      matchInformation.gameId = game.gameId;
      matchInformation.gameMode = game.gameMode;
      matchInformation.gameQueue = gameConstants[game.gameQueueConfigId].name; //Gameconstants are in globalConstants.js
      matchInformation.map = gameConstants[game.gameQueueConfigId].map;
      matchInformation.platformId = game.platformId;
      matchInformation.server = server;
      matchInformation.playersList = new Array(0);
      console.log("%c[matchInformation]", "color:purple; font-size: medium", "- Starting to retrieve match Information");

      //Creates the players object pushing its information to matchInformation.playersList
      game.participants.map(player => matchInformation.playersList.push(
        new Player(
          player.summonerName,
          player.profileIconId,
          player.championId,
          player.summonerId,
          player.perks.perkIds
        )))

      //Created all the players in matchInformation.playersList
      console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled all the players list with the match's players");
      console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled with summonerName, profileIcon, championId, summonerId and runes");
      console.log("%c[playersList]", "color:purple; font-size: medium", "- Starting to fetch the basicInfo");

      //Calls the function who fetches the playerLevel and accountId, as we already have all the players
      fetchBasicInfo();

      //Gets the champion Name according to the champion Id, for each player in matchInformation.playersList
      matchInformation.playersList.map(async player => {
        for (champion in championList) {
          if (championList[champion].id == player.championId) {
            //Set the champion name
            player.championName = championList[champion].name;
          }
        }
      })

      //Parsing runes description for each champ
      matchInformation.playersList.map(async player => {
        for (rune in player.runes) {
          const runeId = player.runes[rune];
          player.runes[rune] = {
            runeId: runeId,
            runeDescription: matchInformation.runesInfo[runeId].description,
            runeName: matchInformation.runesInfo[runeId].name
          }
        }
      })

      //Gets the championMasteryLevel and championMasteryPoints, for each player in matchInformation.playersList
      matchInformation.playersList.map(async player => {
        kayn.ChampionMastery.get(player.summonerId)(player.championId)
          .region(server)
          .then(data => {
            player.championMasteryLevel = data.championLevel;
            player.championMasteryPoints = data.championPoints;
            console.log("%c[mastery]", "color:purple; font-size: medium", "- Champion Mastery set!")
          })
          .catch(console.log);
      })

      //Gets the player league in this queue, or the higher league if normal game/aram
      matchInformation.playersList.map(async player => {
        kayn.LeaguePositions.by.summonerID(player.summonerId)
          .region(server)
          .then(leagues => {
            let gameMode = matchInformation.gameQueue;
            switch (gameMode) {
              case '5v5 Ranked Solo':
                gameMode = 'RANKED_SOLO_5x5';
                break;
              case '5v5 Ranked Flex':
                gameMode = 'RANKED_FLEX_SR';
                break;
              case '3v3 Ranked Flex':
                gameMode = 'RANKED_FLEX_TT';
                break;
              default:
                gameMode = 'NORMAL_GAME';
                break;
            }

            //If it is a ranked game, returns the ranked elo, else searches the higher league
            let league = new Liga("NO QUEUE", "UNRANKED", "", 0, "");
            if (gameMode !== 'NORMAL_GAME') {
              leagues.forEach(lg => {
                if (lg.queueType === gameMode) {
                  league = new Liga(
                    lg.queueType,
                    lg.tier,
                    lg.rank,
                    lg.leaguePoints,
                    lg.leagueName
                  );
                  player.rankedMatches = lg.wins + lg.losses;
                  player.rankedWins = lg.wins;
                  player.rankedWR = porcentagemVitorias(lg.wins, lg.wins + lg.losses);
                }
              });
              player.liga = league;
              console.log("%c[league]", "color:purple; font-size: medium", "- Ranked League set!")
            } else {
              // Verifies the higher league at all
              maiorLiga(leagues).then(higher => {
                player.liga = higher;
                console.log("%c[league]", "color:purple; font-size: medium", "- Higher League set!")
              })
              .catch(console.log);

              //Add all the matches and wins in ranked games
              let matches=0, wins=0;
              leagues.forEach(lg => {
                matches += lg.wins + lg.losses;
                wins += lg.wins;
              })
              player.rankedMatches = matches;
              player.rankedWins = wins;
              player.rankedWR = porcentagemVitorias(wins, matches);
            }
          })
          .catch(console.log);
      })

    })
    .catch(error => {
      if (error.statusCode == 404) {
        console.log("%c[getMatch]", "color:purple; font-size: medium", "- Player is not in an active match")
      } else {
        console.error(error)
      }
    });

}

//Get the playerLevel and the playerAccountId
async function fetchBasicInfo() {
  //Gets info of all the players
  const players = Promise.all(matchInformation.playersList.map(player => kayn.Summoner.by.name(player.name).region(matchInformation.server)));
  players.then(async value => {

      //Sets the info of the players in the matchInformation.playersList array
      for (player in matchInformation.playersList) {
        const infoPlayer = value[player]
        const playerPos = matchInformation.playersList[player]
        playerPos.level = infoPlayer.summonerLevel;
        playerPos.accountId = infoPlayer.accountId;
      }
      console.log("%c[basicInfo]", "color:purple; font-size: medium", "- Set the basic info");
      console.log("%c[basicInfo]", "color:purple; font-size: medium", "- Starting to fetch the Advanced Info");
      fetchAdvancedInfo();
    })
    .catch(err => console.log(err));
}

//Get matches for each player. After calls the function who sets the champion Win Rate for each player.
async function fetchAdvancedInfo() {

  const idMatches = Promise.all(matchInformation.playersList.map(player => retornaIdPartidasCampeoes(matchInformation.server, player.championId, player.accountId)));

  idMatches.then(async value => {

    //Sets the matchlist
    for (player in matchInformation.playersList) {
      let playerPos = matchInformation.playersList[player]
      playerPos.matchList = value[player]
    }

    //Gets the real matches and set the wins/win rate
    champInfoFetch = 0;
    for (player in matchInformation.playersList) {
      getChampInfo(player, matchInformation.server);
    }

  })
  .catch(console.log);
}

let champInfoFetch; //Counter for champInfo
//This gets the matches after having the ID of the matches. After sets matches/Win Rate with the champion
async function getChampInfo(playerPos, server) {

  //Alias for matchInformation.playersList[playerPos]
  let thisPlayer = matchInformation.playersList[playerPos]

  //Get the matches
  console.time("Player " + playerPos + " matches done");
  const matches = await Promise.all(thisPlayer.matchList.map(data => kayn.Match.get(data).region(server)));
  console.timeEnd("Player " + playerPos + " matches done");


  //Check the victory in the matches
  const checkVictory = matches.map(match => checaVitoria(match, thisPlayer.accountId));
  const wins = checkVictory.reduce((a, b) => a + b, 0);

  //Sets the values in matchInformation.playersList
  thisPlayer.championMatches = matches.length;
  thisPlayer.championWins = wins;
  if (matches.length > 0) {
    thisPlayer.championWR = porcentagemVitorias(wins, matches.length);
  }

  champInfoFetch++;
  if (champInfoFetch >= matchInformation.playersList.length){
    console.log("%c[matchDone]", "color:red; font-size: medium", "- Match ready to be shown");
    // TODO: Show data to the user
  }

}
