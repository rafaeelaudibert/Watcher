const jquery = require("jquery");
const apiKey = "RGAPI-855ce9bd-7a87-40e7-8def-222ffb18add3";
const seasonAtual = 11;
const {
  Kayn,
  REGIONS
} = require("kayn");
const kayn = Kayn(apiKey)({
  region: "br",
  debugOptions: {
    isEnabled: true,
    showKey: false,
    loggers: {} // No need to pass anything here. Read the #Configuration#DebugOptions section.
  },
  region: "br",
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 4,
    delayBeforeRetry: 1000,
    burst: true
  },
  cacheOptions: {
    cache: null,
    ttls: {}
  }
});

// Função que retora as informações de liga de um jogador, retornando como uma array das ligas
// Dados possíveis: freshBlood, hotStreak, inactive, leagueId, leagueName, leaguePoints, losses, playerOrTeamId, playerOrTeamName, queueType, tier, elo, veteran, wins
async function ligas(id) {
  var url =
    "https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + id +
    "?api_key=" + apiKey;

  var dadosLigas = await jquery.getJSON(url);
  return dadosLigas;
}

//Função construtora de liga
function Liga(queueType, elo, tier, pdl) {
  this.queueType = queueType;
  this.elo = elo;
  this.tier = tier;
  this.pdl = pdl;
}

//Função construtora da infoPlayer
function Player(name, summonerIcon, champion, summonerId) {
  this.name = name;
  this.summonerIcon = summonerIcon;
  this.summonerId = summonerId;
  this.championId = champion;
  this.championWins = 0;
  this.championWR = "First Match";
  this.matchList = [];
  this.championMatches = undefined;
  this.championName = undefined;
  this.accountId = undefined;
  this.liga = undefined;
  this.level = undefined;
}
// Função que retorna a maior liga entre uma lista de ligas passadas. Retorna como um objeto do tipo Liga
async function maiorLiga(ligas) {
  var maior_liga = new Liga(undefined, undefined, undefined, -1);
  var infoLigas = [];
  if (ligas !== undefined) {
    //Push das ligas
    ligas.forEach(function(liga) {
      if (ligas !== undefined) {
        addLiga = new Liga(
          liga.queueType,
          liga.tier,
          liga.rank,
          liga.leaguePoints
        );
        infoLigas.push(addLiga);
      }
    });

    //Check da maior liga
    if (ligas.length == 0) {
      //Sem ligas, é untiered
      maior_liga = new Liga("NO QUEUE", "UNRANKED", "", 0);
    } else if (ligas.length == 1) {
      //Com uma liga, ela é a maior e única
      maior_liga = new Liga(
        infoLigas[0].queueType,
        infoLigas[0].elo,
        infoLigas[0].tier,
        infoLigas[0].pdl
      );
    } else {
      //Senão itera pelas ligas
      infoLigas.forEach(function(liga) {
        switch (liga.elo) {
          case "CHALLENGER": //DESAFIANTE
            if (maior_liga.pdl <= liga.pdl) {
              //Como é desafiante, não importa o resto, verificamos apenas PDL
              maior_liga = new Liga(
                liga.queueType,
                liga.elo,
                liga.tier,
                liga.pdl
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
                liga.pdl
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
                liga.pdl
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
                      liga.pdl
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    //Caso sejamos Diamond I, e a maior tambem, checamos PDL
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
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
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                liga.pdl
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
                      liga.pdl
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                liga.pdl
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
                      liga.pdl
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                liga.pdl
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
                      liga.pdl
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                liga.pdl
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
                      liga.pdl
                    );
                  } else if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "II":
                  if (maior_liga.tier !== "II" && maior_liga.tier !== "I") {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "II" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "III" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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
                      liga.pdl
                    );
                  } else if (
                    maior_liga.tier == "IV" &&
                    maior_liga.pdl < liga.pdl
                  ) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
                    );
                  }
                  break;
                case "V":
                  if (maior_liga.pdl < liga.pdl) {
                    maior_liga = new Liga(
                      liga.queueType,
                      liga.elo,
                      liga.tier,
                      liga.pdl
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

//Função que retorna as informações das listas de partidas jogadas com um dado campeão
//Possíveis valores: endIndex, matches[], startIndex, totalGames(useless)
//Sendo que temos:
//matches[x].{champion, gameId, lane, platformId, queue, role, season, timestamp}
async function retornaPartidas(idChamp, idConta, beginIndex = 0, endIndex = 100) {
  var url =
    "https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/" +
    idConta +
    "?season=" + seasonAtual +
    "&beginIndex=" + beginIndex +
    "&endIndex=" + endIndex +
    "&champion=" + idChamp +
    "&api_key=" + apiKey;

  var dadosPartidas = await jquery.getJSON(url);
  return dadosPartidas;
}

//Retorna uma array com os ID's de todas as partidas jogadas por uma conta com um campeão, na seasonAtual
async function retornaIdPartidasCampeoes(idChamp, idConta, beginIndex = 0, endIndex = 100) {
  var partidas = retornaPartidas(idChamp, idConta);
  var listaPartidas = partidas.then(function(data) {
    listaMatches = [];
    for (partida in data.matches) {
      listaMatches.push(data.matches[partida].gameId);
    }
    return listaMatches;
  });
  return listaPartidas;
}

function checaVitoria(partida, name) {

  var winornot = 0;
  var playerPos;

  //Finds the position of the player in the match
  for (jogador in partida.participantIdentities) {
    var thisPlayer = partida.participantIdentities[jogador];
    if (thisPlayer.player.summonerName == name) {
      console.log("Id do participante na partida (dentro do for):" + thisPlayer.participantId);
      playerPos = thisPlayer.participantId;
    }
  }

  console.log("Id do Participante na partida: " + playerPos)
  if (playerPos < 5 && partida.teams[0].win == "Win") {
    winornot++;
  } else if (playerPos >= 5 && partida.teams[1].win == "Win") {
    winornot++;
  }

  return winornot;


}
// Função que retorna um valor entre 0 e 100, dado pelo ratio da divisao entre as vitorias e as partidas jogadas, multiplicado por 100
function porcentagemVitorias(vitorias, qtdeJogos) {
  if (qtdeJogos > 0) {
    return 100 * vitorias / qtdeJogos;
  } else {
    return 0;
  }
}
