# LiveTracket

This is a [WIP] project.

This project intends to build an [Electron](https://electronjs.org/) app which shows information about the live match played for a given person in the [League of Legends](https://na.leagueoflegends.com/) game, by RiotGames.

The electron app is powered with HTML, CSS and JS, using [Riot API](https://developer.riotgames.com/) to gather the information about the live matches, as well about the players.

This project is not endorsed or affiliated by RiotGames.

## Getting Started

To build this project locally, you'll need first do download Electron, which can be done using npm:

```
npm install electron --save-dev --save-exact
```

### Installing

You can make your own fork of this repository, or cloning it through

```
git clone https://github.com/rafaeelaudibert/LiveTracker
```

<<<<<<< HEAD
As this repository doesn't holds the node_modules, you'll also need to install and update all of them

```
npm install && npm update
=======
As this repository doesn't holds the node_modules, you'll also need to update all of them

```
npm update
>>>>>>> 685cb87ad9892daa519f4dd95fa82f4039726e58
```

To see if everything is working you should write in the console
```
npm run test-livetracker
```

If it echoes 'LiveTracker working', you are good to go

## Built With

* [Materialize](http://materializecss.com/) - CSS/JS Framework
* [Electron](https://electronjs.org/) - Multi-platform builder
* [Kayn](https://github.com/cnguy/kayn) - Riot Api Wrapper for JS, built by [cnguy](https://github.com/cnguy)

## Commiting

We use [Gitmoji](https://gitmoji.carloscuesta.me/) in the commits, so we can easily know what was that commit about.

## Authors

* **Rafael Baldasso Audibert** - *Main worker* - [rbaudibert](https://github.com/rafaeelaudibert)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Thanks

Special thanks to cnguy for having a great conversation and teaching me about JS and Kayn ApiWrapper, it was really helpfull
