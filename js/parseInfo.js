//League constructor
class Liga {
  constructor (queueType, elo, tier, pdl, leagueName){
    this.queueType = queueType;
    this.elo = elo;
    this.tier = tier;
    this.pdl = pdl;
    this.leagueName = leagueName;
  }
}

//player constructor
class Player {
  constructor(name, summonerIcon, champion, summonerId, runes){
    this.name = name;
    this.runes = runes;
    this.summonerIcon = summonerIcon;
    this.summonerId = summonerId;
    this.championId = champion;
    this.championWins = 0;
    this.championWR = "First Match";
    this.rankedWins = 0;
    this.rankedMatches = 0;
    this.rankedWR = "First Match";
    this.championMasteryLevel = 0;
    this.championMasteryPoints = 0;
    this.matchList = [];
    this.championMatches = undefined;
    this.championName = undefined;
    this.accountId = undefined;
    this.liga = undefined;
    this.level = undefined;
  }
}

/**
 * maiorLiga - Function who returns the biggest league
 *
 * @param  {ligasArray} ligas array with all the leagues
 * @return {Liga}       Returns the bigger league in the ligas array
 */
async function maiorLiga(ligas) {
  let maior_liga = new Liga(undefined, undefined, undefined, -1, undefined);
  const infoLigas = [];
  if (ligas !== undefined) {
    //Push das ligas
    ligas.forEach( liga => {
      if (ligas !== undefined) {
        addLiga = new Liga(
          liga.queueType,
          liga.tier,
          liga.rank,
          liga.leaguePoints,
          liga.leagueName
        );
        infoLigas.push(addLiga);
      }
    });

    //Check da maior liga
    if (ligas.length == 0) {
      //Sem ligas, é unranked
      maior_liga = new Liga("NO QUEUE", "UNRANKED", "", 0, "");
    } else if (ligas.length == 1) {
      //Com uma liga, ela é a maior e única
      maior_liga = new Liga(
        infoLigas[0].queueType,
        infoLigas[0].elo,
        infoLigas[0].tier,
        infoLigas[0].pdl,
        infoLigas[0].leagueName
      );
    } else {
      //Senão itera pelas ligas
      infoLigas.forEach( liga => {
        switch (liga.elo) {
          case "CHALLENGER": //DESAFIANTE
            if (maior_liga.pdl <= liga.pdl) {
              //Como é desafiante, não importa o resto, verificamos apenas PDL
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            }
            break;
          case "MASTER": //MESTRE
            if (maior_liga.elo !== "CHALLENGER" && maior_liga.pdl <= liga.pdl) {
              //No mestre, caso o maior não for challenger, basta apenas verificar o pdl
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            }
            break;
          case "DIAMOND": //DIAMANTE
            if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND"
            ) {
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            } else if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER"
            ) {
              //Nesse caso, a maior_liga atual é diamante, portanto verificamos se o tier atual é maior
              switch (liga.tier) {
                case "I":
                  if (maior_liga.tier !== "I") {
                    //Caso sejamos Diamond I, e o maior não for, somos a maior_liga
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    //Caso sejamos Diamond I, e a maior tambem, checamos PDL
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    //Caso sejamos D2, e a maior não for nem D2, nem D1, somos a maior
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    //Caso sejamos D2, e a maior tambem, verificamos então nos PDL
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "III":
                  if (
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "IV":
                  if (
                    maior_liga.tier !== "IV" &&
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
              }
            }
            break;
          case "PLATINUM": //PLATINA
            if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM"
            ) {
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            } else if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND"
            ) {
              switch (liga.tier) {
                case "I":
                  if (maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "III":
                  if (
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "IV":
                  if (
                    maior_liga.tier !== "IV" &&
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
              }
            }
            break;
          case "GOLD": //GOLD
            if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM" &&
              maior_liga.elo !== "GOLD"
            ) {
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            } else if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM"
            ) {
              switch (liga.tier) {
                case "I":
                  if (maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "III":
                  if (
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "IV":
                  if (
                    maior_liga.tier !== "IV" &&
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
              }
            }
            break;
          case "SILVER": //PRATA
            if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM" &&
              maior_liga.elo !== "GOLD" &&
              maior_liga.elo !== "SILVER"
            ) {
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            } else if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM" &&
              maior_liga.elo !== "GOLD"
            ) {
              switch (liga.tier) {
                case "I":
                  if (maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "III":
                  if (
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "IV":
                  if (
                    maior_liga.tier !== "IV" &&
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
              }
            }
            break;
          case "BRONZE": //BRONZE
            if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM" &&
              maior_liga.elo !== "GOLD" &&
              maior_liga.elo !== "SILVER" &&
              maior_liga.elo !== "BRONZE"
            ) {
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl,
                liga.leagueName
              );
            } else if (
              maior_liga.elo !== "CHALLENGER" &&
              maior_liga.elo !== "MASTER" &&
              maior_liga.elo !== "DIAMOND" &&
              maior_liga.elo !== "PLATINUM" &&
              maior_liga.elo !== "GOLD" &&
              maior_liga.elo !== "SILVER"
            ) {
              switch (liga.tier) {
                case "I":
                  if (maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "III":
                  if (
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "IV":
                  if (
                    maior_liga.tier !== "IV" &&
                    maior_liga.tier !== "III" &&
                    maior_liga.tier !== "II" &&
                    maior_liga.tier !== "I"
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl,
                      liga.leagueName
                    );
                  }
                  break;
              }
            }
            break;
          default:
            //Deu Merda aí
            console.log("Não é nenhum elo (?????)");
            break;
        }
      });
    }
  }
  return maior_liga;
}

/**
 * retornaIdPartidasCampeoes - Returns an array with all the Matches' ID's from a plyer with a champion
 *
 * @param  {integer} idChamp        id of the champion
 * @param  {integer} idConta        if of the account
 * @return {array}                  array with all the ID's
 */
async function retornaIdPartidasCampeoes(server = mainPlayer.server, idChamp, idConta) {
  let listaPartidas = kayn.Matchlist.by.accountID(idConta)
                                      .query({
                                          champion: idChamp,
                                          season: seasonAtual
                                      })
                                      .region(server)
                                      .then(data => {
                                        listaMatches = [];
                                        for (partida in data.matches) {
                                          listaMatches.push(data.matches[partida].gameId);
                                        }
                                        return listaMatches;
                                      })
                                      .catch(err => {
                                        //If some error ocurred, returns an empty array
                                        console.error(err);
                                        return [];
                                      });

  return listaPartidas;
}

/**
 * checaVitoria - Checks if the person won the game or not
 *
 * @param  {partidaObject} partida partidaInfo retriever from kayn.Match.get
 * @param  {string} accountId    accountId of the player
 * @return {boolean}         Returns if the person won the game or not
 */
function checaVitoria(partida, accountId) {

  let winornot = 0;
  let playerPos;

  //Finds the position of the player in the match
  for (jogador in partida.participantIdentities) {
    const thisPlayer = partida.participantIdentities[jogador];
    if (thisPlayer.player.currentAccountId == accountId) {
      playerPos = thisPlayer.participantId;
    }
  }

  if (playerPos < 5 && partida.teams[0].win == "Win") {
    winornot++;
  } else if (playerPos >= 5 && partida.teams[1].win == "Win") {
    winornot++;
  }

  return winornot

}


async function parsePlayerLeague(leagues){
  const parsedLeagues = {};
  leagues.map(league => parsedLeagues[league.queueType] = {
    tier: league.tier,
    rank: league.rank,
    lp: league.leaguePoints,
    leagueName: league.leagueName
  });
  maiorLiga(leagues).then(higher => parsedLeagues['HIGHER_LEAGUE'] = {
      tier: higher.elo,
      rank: higher.tier,
      leagueName: higher.leagueName,
      lp: higher.pdl
    });

  if (!parsedLeagues['RANKED_FLEX_SR']){
    parsedLeagues['RANKED_FLEX_SR'] = {
      tier: 'UNRANKED',
      rank: '',
      lp: 0,
      leagueName: ''
    }
  }
  if (!parsedLeagues['RANKED_SOLO_5x5']){
    parsedLeagues['RANKED_SOLO_5x5'] = {
      tier: 'UNRANKED',
      rank: '',
      lp: 0,
      leagueName: ''
    }
  }
  if (!parsedLeagues['RANKED_FLEX_TT']){
    parsedLeagues['RANKED_FLEX_TT'] = {
      tier: 'UNRANKED',
      rank: '',
      lp: 0,
      leagueName: ''
    }
  }

  //Save the leagues
  mainPlayer.leagues = parsedLeagues;
}

/**
 * porcentagemVitorias - Returns the winrate percentage
 *
 * @param  {integer} vitorias  Number of victorys
 * @param  {integer} qtdeJogos Number of games played
 * @return {float}             WinRate Percentage
 */
function porcentagemVitorias(vitorias, qtdeJogos) { return qtdeJogos > 0 ? (100 * vitorias / qtdeJogos).toFixed(2) : "First Match" }
