class championCard {
  constructor(person, color){
    this.cardColor = color,
    this.championImage = "http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/{person.championName}.png",
    this.championName = person.championName,
    this.championMasteryImage = person.championMasteryLevel,
    this.summonerName = person.summonerName,
    this.summonerElo = "${person.liga.elo} ${person.liga.tier}",
    this.pdl = person.liga.pdl,
    this.eloImage = eloImagePath(person),
    this.runes = person.runes,
    this.championWinrate = person.championWR !== 'First Match' ? '${person.championWR}%' :      person.championWR,
    this.championWinLost = '(${person.championWins}W - ${person.championMatches - person.championWins}L)',
    this.rankedWinrate =  person.rankedWR !== 'First Match' ? '${person.rankedWR}%' :      person.rankedWR,
    this.rankedWinLost = '(${person.rankedWins}W - ${person.rankedMatches - person.rankedWins}L)'
  }
}

function eloImagePath(person){
  if (person.liga.elo === "CHALLENGER" || person.liga.elo === "MASTER" || person.liga.elo === "UNRANKED"){
    return person.liga.elo
  }
  else {

    let tierTranslation;
    switch(person.liga.tier){
      case 'I':
        tierTranslation = 1;
        break;
      case 'II':
        tierTranslation = 2;
        break;
      case 'III':
        tierTranslation = 3;
        break;
      case 'IV':
        tierTranslation = 4;
        break;
      default:
        tierTranslation = 5;
    }

    return person.liga.elo + "/" + tierTranslation;
  }
}
