const jquery = require("jquery");
const remote = require('electron').remote;
const apiKey = remote.getGlobal('sharedObj').apiKey;
const seasonAtual = 11;
const defaultPlayer = 'mcgirino123'
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
 * List with all the champions
 */
let championList = kayn.Static.Champion.list()
                                        .region(REGIONS.KOREA)
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
 * list which will contain all the playerInfo of the players in the same match as the mainPlayer
 */
let playersList = [];


//Gets the initial info: Info from people playing in the match being played bi the mainPlayer
async function getInitialInfo(){

  //Using the mainPlayer info to retrieve its match
  player = mainPlayer;
  console.log(player);

  //Gets the mainPlayer's currentGame info
  const currentGame = kayn.CurrentGame.by.summonerID(player.id)
  currentGame.then(function(game){
    console.log(game);

    //Creates the players object pushing its information to playersList
    game.participants.map( participante => playersList.push(
                                                                new Player(
                                                                  participante.summonerName,
                                                                  participante.profileIconId,
                                                                  participante.championId,
                                                                  participante.summonerId,
                                                                  participante.perks.perkIds
                                                                ))
    )
    //Created all the players in playersList
    console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled all the playersList with the match's players");
    console.log("%c[playersList]", "color:purple; font-size: medium", "- Filled with summonerName, profileIcon, championId, summonerId and runes");

    //Gets the champion Name according to the champion Id, for each player in playersList
    playersList.map( async participante => {
      for (campeao in championList){
        if (championList[campeao].id == participante.championId) {
          //Seto o nome do campeão
          participante.championName = championList[campeao].name;
          console.log("%c[championDecoding]", "color:purple; font-size: medium", "- Decoded this champion!");
        }
      }
    })

    //Gets the championMasteryLevel and championMasteryPoints, for each player in playersList
    playersList.map(async participante => {
      kayn.ChampionMastery.get(participante.summonerId)(participante.championId).then(data => {
        participante.championMasteryLevel = data.championLevel;
        participante.championMasteryPoints = data.championPoints;
        console.log("%c[mastery]", "color:purple; font-size: medium", "- Champion Mastery set!")
      })
    })

    //Gets the higherLeague for the player
    playersList.map(async participante => {
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
  const players = Promise.all(playersList.map(participante => kayn.Summoner.by.name(participante.name)));
  players.then(async (value) => {

    //Sets the info of the players in the playersList array
    for (participante in playersList){
      var player = playersList[participante]
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
  const idMatches = Promise.all(playersList.map(player => retornaIdPartidasCampeoes(player.championId, player.accountId)));
  console.timeEnd("MatchesID")

  idMatches.then(async function(value){
    //Sets the matchlist
    for (participante in playersList){
      var player = playersList[participante]
      var matchIDs = value[participante]
      player.matchList = matchIDs
    }

    //Gets the real matches and set the wins/win rate
    for (participante in playersList){
      getChampInfo(participante)
    }

  })
}


//This gets the matches after having the ID of the matches. After sets matches/Win Rate with the champion
async function getChampInfo(playerPos){

  //Alias for playersList[playerPos]
  var thisPlayer = playersList[playerPos]

  //Gets the matches perse
  console.time("Player: " + playerPos);
  const matches = await Promise.all(thisPlayer.matchList.map(kayn.Match.get));
  console.timeEnd("Player: " + playerPos);

  //Check the victory in the matches
  const checkVictory = matches.map( match => checaVitoria(match, thisPlayer.accountId));
  const wins = checkVictory.reduce((a, b) => a + b, 0);

  //Sets the values in playersList
  thisPlayer.championMatches = matches.length;
  thisPlayer.championWins = wins;
  if (matches.length >0){
    thisPlayer.championWR = porcentagemVitorias(wins, matches.length);
  }

}
