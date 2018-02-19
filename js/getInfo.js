//FUNCTIONS USING KAYN TO SET THE BACK-END OF THE app

//Sets the championList
function setChampionList(){
  kayn.Static.Champion.list()
    .region(REGIONS.BRAZIL)
    .then( list => {listaCampeoes = list.data
                    console.log("All Done!");
                  });
}

//Gets the initial info: Info from the player to be searched and people playing their match
async function getInitialInfo(){

  //Gets the mainPlayer info
  const thePlayer = kayn.Summoner.by.name(mainPlayer)
  thePlayer.then(async function (player){
    console.log(player);

    //Gets the mainPlayer's currentGame info
    const currentGame = kayn.CurrentGame.by.summonerID(player.id)
    currentGame.then(function(game){
      try {
        console.log(game);

        //Creates the players object pushing its information to listaParticipantes
        game.participants.map( participante => listaParticipantes.push(
                                                                    new Player(
                                                                      participante.summonerName,
                                                                      participante.profileIconId,
                                                                      participante.championId,
                                                                      participante.summonerId
                                                                    ))
        )
        console.log("Created all the players in listaParticipantes");
        //Created all the players in listaParticipantes

        //Gets the champion Name according to the champion Id, for each player in listaParticipantes
        listaParticipantes.map( async function(participante){
          for (campeao in listaCampeoes){
            if (listaCampeoes[campeao].id == participante.championId) {
              //Seto o nome do campeão
              participante.championName = listaCampeoes[campeao].name;
              console.log("This person is done with the champion!");
            }
          }
        })

        //Gets the higherLeague for the player
        listaParticipantes.map( async function(participante){
          ligas(participante.summonerId)
            .then(maiorLiga)
              .then(function(higherLeague){
                participante.liga = higherLeague;
                console.log("Leagues done!")
              })
        })


      } catch (TypeError) {
        console.log("Jogador não está em uma partida ativa!");
        ipcRenderer.send('item:add', "Jogador não está em uma partida ativa!");
      }
    })
  })
}

//Get the playerLevel and the playerAccountId
async function getBasicInfo(){
  //Gets info of all the players
  const players = Promise.all(listaParticipantes.map(participante => kayn.Summoner.by.name(participante.name)));
  players.then(async function(value){

    //Sets the info of the players in the listaParticipantes array
    for (participante in listaParticipantes){
      var player = listaParticipantes[participante]
      var infoPlayer = value[participante]
      player.level = infoPlayer.summonerLevel;
      player.accountId = infoPlayer.accountId;
    }
    console.log("Done with the basic!")
  })
  .catch(console.log);
}

//Get matches for each player. After calls the function who sets the champion Win Rate for each player.
async function getAdvancedInfo(){
  console.time("MatchesID")
  const idMatches = Promise.all(listaParticipantes.map(player => retornaIdPartidasCampeoes(player.championId, player.accountId)));
  console.timeEnd("MatchesID")

  idMatches.then(async function(value){
    //Sets the matchlist
    for (participante in listaParticipantes){
      var player = listaParticipantes[participante]
      var matchIDs = value[participante]
      player.matchList = matchIDs
    }

    //Gets the real matches and set the wins/win rate
    for (participante in listaParticipantes){
      getChampInfo(participante)
    }

  })
}


//This gets the matches after having the ID of the matches. After sets matches/Win Rate with the champion
async function getChampInfo(playerPos){

  //Alias for listaParticipantes[playerPos]
  var thisPlayer = listaParticipantes[playerPos]

  //Gets the matches perse
  console.time("Player: " + playerPos);
  const matches = await Promise.all(thisPlayer.matchList.map(kayn.Match.get));
  console.log(matches);
  console.timeEnd("Player: " + playerPos);

  //Check the victory in the matches
  const checkVictory = matches.map( match => checaVitoria(match, thisPlayer.name));
  const wins = checkVictory.reduce((a, b) => a + b, 0);

  //Sets the values in listaParticipantes
  thisPlayer.championMatches = matches.length;
  thisPlayer.championWins = wins;
  if (matches.length >0){
    thisPlayer.championWR = porcentagemVitorias(wins, matches.length);
  }

}
