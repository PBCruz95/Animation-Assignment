define([
    'asset-manager',
    'game-engine',
    "entity",
    "player"

], function(
    AssetManager,
    GameEngine,
    Entity,
    Player
) {

    let init = function() {
        console.log("init")
    };

    // the "main" code begins here

    toload = [
        "img/BraidSprites.png"
    ];

    let ASSET_MANAGER = new AssetManager(toload);

    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da shield");

        let canvas = document.getElementById('gameWorld');
        let ctx = canvas.getContext('2d');
        let gameEngine = new GameEngine();

        let player = new Player(gameEngine, 400, 500, ASSET_MANAGER.getAsset("img/BraidSprites.png"), ctx);
        gameEngine.addEntity(player);

        gameEngine.init(ctx);
        gameEngine.start();
    });

    return {
        init: init
    };

});

