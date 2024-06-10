// PLEASE SEE README FOR ASSETS CREDITS

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 1000 ,
    height: 800 ,
    scene: [Load, TITLE, CREDITS, LEVEL_1]
}

var cursors;
var my = {sprite: {}, text: {}, vfx: {}};

const game = new Phaser.Game(config);