const jquery = require("jquery");
const remote = require('electron').remote;
const apiKey = remote.getGlobal('sharedObj').apiKey;
const seasonAtual = 11;
const defaultPlayer = 'Coto Johnson'
const {
  Kayn,
  REGIONS
} = require("kayn");


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
 let matchInformation = {
   runesInfo: undefined,
   patch: undefined,
   gameId: undefined,
   gameMode: undefined,
   gameType: undefined,
   gameQueueConfigId: undefined,
   mapId: undefined,
   platformId: undefined,
   playersList: new Array(0) //list which contains all the match's (mainPlayer match) players information
 }


/**
 * List with all the champions
 */
let championList = kayn.Static.Champion.list()
                                        .region(REGIONS.BRAZIL)
                                        .then( list => {
                                                        championList = list.data
                                                        console.log("%c[setChampionList]", "color:purple; font-size: medium", "- Generated Champion List");
                                                      })
                                        .catch(console.log);

/**
 * mainPlayer information
 */
let mainPlayer = kayn.Summoner.by.name(defaultPlayer)
                                  .then(data => {
                                    mainPlayer = data;
                                    console.log("%c[mainPlayer]", "color:purple; font-size: medium", "- Created MainPlayer Information");
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
jquery.getJSON('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json').then(data => {
          matchInformation.runesInfo = data;
          console.log("%c[runesInfo]", "color:purple; font-size: medium", "- Retrieved Runes Information from CDragon");
        }).catch(console.log);

//Gets the initial info: Info from people playing in the match being played bi the mainPlayer
async function getInitialInfo(){

  //Using the mainPlayer info to retrieve its match
  player = mainPlayer;
  console.log(player);

  //Gets the mainPlayer's currentGame info
  const currentGame = kayn.CurrentGame.by.summonerID(player.id)
  currentGame.then(game => {
    console.log(game);

    //Sets the other information in matchInformation
    matchInformation.gameId = game.gameId;
    matchInformation.gameMode = game.gameMode;
    matchInformation.gameType = game.gameType;
    matchInformation.gameQueueConfigId = game.gameQueueConfigId;
    matchInformation.mapId = game.mapId;
    matchInformation.platformId = game.platformId;
    console.log("%c[matchInformation]", "color:purple; font-size: medium", "- Retrieved some match Information");

    //Creates the players object pushing its information to matchInformation.playersList
    game.participants.map( participante => matchInformation.playersList.push(
                                                                new Player(
                                                                  participante.summonerName,
                                                                  participante.profileIconId,
                                                                  participante.championId,
                                                                  participante.summonerId,
                                                                  participante.perks.perkIds
                                                                ))
    )
    //Created all the players in matchInformation.playersList
    console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled all the players list with the match's players");
    console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled with summonerName, profileIcon, championId, summonerId and runes");

    //Gets the champion Name according to the champion Id, for each player in matchInformation.playersList
    matchInformation.playersList.map( async participante => {
      for (campeao in championList){
        if (championList[campeao].id == participante.championId) {
          //Seto o nome do campeão
          participante.championName = championList[campeao].name;
          console.log("%c[championDecoding]", "color:purple; font-size: medium", "- Decoded this champion!");
        }
      }
    })

    //Gets the championMasteryLevel and championMasteryPoints, for each player in matchInformation.playersList
    matchInformation.playersList.map(async participante => {
      kayn.ChampionMastery.get(participante.summonerId)(participante.championId).then(data => {
        participante.championMasteryLevel = data.championLevel;
        participante.championMasteryPoints = data.championPoints;
        console.log("%c[mastery]", "color:purple; font-size: medium", "- Champion Mastery set!")
      })
    })

    //Gets the higherLeague for the player
    matchInformation.playersList.map(async participante => {
      kayn.LeaguePositions.by.summonerID(participante.summonerId)
        .then(maiorLiga)
          .then(function(higherLeague){
            participante.liga = higherLeague;
            console.log("%c[higherLeague]", "color:purple; font-size: medium", "- Higher League set!")
          })
    })

  })
  .catch(error => {
    if (error == 404){
      console.log("%c[getMatch]", "color:purple; font-size: medium", "- Player is not in an active match")
    } else {
      console.log(error)}
    });

}

//Get the playerLevel and the playerAccountId
async function getBasicInfo(){
  //Gets info of all the players
  const players = Promise.all(matchInformation.playersList.map(participante => kayn.Summoner.by.name(participante.name)));
  players.then(async (value) => {

    //Sets the info of the players in the matchInformation.playersList array
    for (participante in matchInformation.playersList){
      var player = matchInformation.playersList[participante]
      var infoPlayer = value[participante]
      player.level = infoPlayer.summonerLevel;
      player.accountId = infoPlayer.accountId;
    }
    console.log("%c[basicInfo]", "color:purple; font-size: medium", "- Set the basic info")
  })
  .catch(console.log);
}

//Get matches for each player. After calls the function who sets the champion Win Rate for each player.
async function getAdvancedInfo(){
  onsole.time("MatchesID")
  const idMatches = Promise.all(matchInformation.playersList.map(player => retornaIdPartidasCampeoes(player.championId, player.accountId)));
  console.timeEnd("MatchesID")

  idMatches.then(async function(value){
    //Sets the matchlist
    for (participante in matchInformation.playersList){
      var player = matchInformation.playersList[participante]
      var matchIDs = value[participante]
      player.matchList = matchIDs
    }

    //Gets the real matches and set the wins/win rate
    for (participante in matchInformation.playersList){
      getChampInfo(participante)
    }

  })
}


//This gets the matches after having the ID of the matches. After sets matches/Win Rate with the champion
async function getChampInfo(playerPos){

  //Alias for matchInformation.playersList[playerPos]
  var thisPlayer = matchInformation.playersList[playerPos]

  //Gets the matches perse
  console.time("Player: " + playerPos);
  const matches = await Promise.all(thisPlayer.matchList.map(kayn.Match.get));
  console.timeEnd("Player: " + playerPos);

  //Check the victory in the matches
  const checkVictory = matches.map( match => checaVitoria(match, thisPlayer.accountId));
  const wins = checkVictory.reduce((a, b) => a + b, 0);

  //Sets the values in matchInformation.playersList
  thisPlayer.championMatches = matches.length;
  thisPlayer.championWins = wins;
  if (matches.length >0){
    thisPlayer.championWR = porcentagemVitorias(wins, matches.length);
  }

}
