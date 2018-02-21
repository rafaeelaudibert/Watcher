class championCard {
  constructor(person){
    this.championImage = "http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/{person.championName}.png",
    this.championName = person.championName,
    this.championMasteryImage = person.championMasteryLevel,
    this.summonerName = person.summonerName,
    this.summonerElo = "${person.summoner.liga.elo} ${person.summoner.liga.tier}",
    this.eloImage = "", // TODO: Create function responsible for setting the eloImage path
    this.runes = person.runes, // TODO: Create class responsible for setting the runes object (Will be set when requesting the runes)
    this.championWinrate = person.championWR !== 'First Match' ? '${person.championWR}%' :      person.championWR,
    this.championWinLost = '(${person.championWins}W - ${person.championMatches - person.championWins}L)',
    this.rankedWinrate =  person.rankedWR !== 'First Match' ? '${person.rankedWR}%' :      person.rankedWR,
    this.rankedWinLost = '(${person.rankedWins}W - ${person.rankedMatches - person.rankedWins}L)'
  }
}
