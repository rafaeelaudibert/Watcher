class championCard {
  constructor(person, match, color) {
      this.cardColor = color,
      this.championName = person.championName,
      this.championImage = "http://ddragon.leagueoflegends.com/cdn/" + match.patch + "/img/champion/" + parseChampionImage(person.championName) + ".png",
      this.championMasteryImage = person.championMasteryLevel,
      this.championMasteryPoints = person.championMasteryPoints,
      this.name = person.name,
      this.summonerElo = person.liga.elo + " " + person.liga.tier,
      this.pdl = person.liga.pdl,
      this.league = person.liga,
      this.runes = person.runes,
      this.championWinrate = person.championWR !== 'First Match' ? person.championWR + "%" : person.championWR,
      this.championWinLost = "(" + person.championWins + "W - " + (person.championMatches - person.championWins) + "L)",
      this.rankedWinrate = person.rankedWR !== 'First Match' ? person.rankedWR + '%' : person.rankedWR,
      this.rankedWinLost = "(" + person.rankedWins + "W - " + (person.rankedMatches - person.rankedWins) + "L)"
  }
}


/**
 * parseChampionImage - Parses the championName to its own respective image
 *
 * @param  {string} name Name of the champion
 * @return {string}      Parsed name of the champion
 */
function parseChampionImage(name){

  let fixedName = name.split("'"); //Splits Void Champions names
  if (fixedName.length > 1){
    fixedName[1] = fixedName[1].toLowerCase(); //If it was a void champion, lowercases the second name
    fixedName = fixedName.join(""); //Joins it
  } else {
    fixedName = name.split(" ").join(""); //Else fixes the champion with space in the name
  }

  //Handling Name Exceptions
  if (fixedName == "Reksai"){ //Rek'Sai is a special case
    fixedName = "RekSai";
  }

  return fixedName;
}
