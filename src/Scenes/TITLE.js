class TITLE extends Phaser.Scene {
    constructor() {
        super("TITLE");
    }

    preload(){ 

    }

    create() {
        this.add.bitmapText(game.config.width/2, game.config.height / 3, "pixel_font", 
            'TITLE', 30).setOrigin(0.5);

        this.add.bitmapText(game.config.width/2, game.config.height / 2, "pixel_font", 
            'press SPACE to start', 15).setOrigin(0.5);

            
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("LEVEL_1");
        }, this);
    }

    update() {

    }
}