class CREDITS extends Phaser.Scene {
    constructor() {
        super("CREDITS");
    }

    preload(){ 

    }

    create() {
        this.add.bitmapText(30, 30, "pixel_font", 
            'dungeon generator: dungeon by mikewesthad (github.com)', 18).setOrigin(0);
        this.add.bitmapText(30, 70, "pixel_font", 
            'dungeon tileset: Super Dungeon 16 by pixeljad (itch.io)', 18).setOrigin(0);
        this.add.bitmapText(30, 110, "pixel_font", 
            'cat sprites: Pet Cats Pack by luizmelo (itch.io)', 18).setOrigin(0);
        this.add.bitmapText(30, 150, "pixel_font", 
            'player orb: 2D Magic Orb Sprite by willisshek (itch.io)', 18).setOrigin(0);
        this.add.bitmapText(30, 190, "pixel_font", 
            'font: Public Pixel Font by GGBotNet (fontspace.com)', 18).setOrigin(0);
        this.add.bitmapText(30, 230, "pixel_font", 
            'meows: various (pixabay.com)', 18).setOrigin(0);

        this.add.bitmapText(game.config.width / 2, game.config.height - 100, "pixel_font", 
            'programming: raven ruiz (yours truly)', 18).setOrigin(0.5);

        this.add.bitmapText(game.config.width / 2, game.config.height - 30, "pixel_font", 
            'press B to go back', 15).setOrigin(0.5);
        
        this.input.keyboard.on('keydown-B', () => {
            this.scene.start("WIN");
        }, this);
    }

    update() {

    }
}