class championCard {
  constructor(person, color) {
    this.cardColor = color,
      this.championImage = "http://ddragon.leagueoflegends.com/cdn/" + person.patch + "/img/champion/" + person.championName + ".png",
      this.championName = person.championName,
      this.championMasteryImage = person.championMasteryLevel,
      this.championMasteryPoints = person.championMasteryPoints,
      this.name = person.name,
      this.summonerElo = person.liga.elo + " " + person.liga.tier,
      this.pdl = person.liga.pdl,
      this.eloImage = eloImagePath(person.liga),
      this.runes = person.runes,
      this.championWinrate = person.championWR !== 'First Match' ? person.championWR + "%" : person.championWR,
      this.championWinLost = "(" + person.championWins + "W - " + (person.championMatches - person.championWins) + "L)",
      this.rankedWinrate = person.rankedWR !== 'First Match' ? person.rankedWR + '%' : person.rankedWR,
      this.rankedWinLost = "(" + person.rankedWins + "W - " + (person.rankedMatches - person.rankedWins) + "L)"
  }
}

function eloImagePath(liga) {
  if (liga.elo === "CHALLENGER" || liga.elo === "MASTER" || liga.elo === "UNRANKED") {
    return liga.elo
  } else {

    let tierTranslation;
    switch (liga.tier) {
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
        break;
    }

    return liga.elo + "/" + tierTranslation;
  }
}
