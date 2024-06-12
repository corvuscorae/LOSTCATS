class TITLE extends Phaser.Scene {
    constructor() {
        super("TITLE");
    }

    create() {
        document.getElementById('description').innerHTML = 
        `<h1>LOST CATS: 6</h1>`;

        this.add.bitmapText(game.config.width/2, game.config.height / 2 - 60, "pixel_font", 
            '6 cats are lost in a dungeon', 30).setOrigin(0.5);

        this.add.bitmapText(game.config.width/2, game.config.height / 2, "pixel_font", 
            'press SPACE to find them', 15).setOrigin(0.5);
            
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("LEVEL_1");
        }, this);
    }

    update() {

    }
}