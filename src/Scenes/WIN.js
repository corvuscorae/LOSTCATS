class WIN extends Phaser.Scene {
    constructor() {
        super("WIN");
    }

    create() {
        document.getElementById('description').innerHTML = 
        `<h1>LOST CATS: 0</h1>`;

        this.add.bitmapText(game.config.width / 2, game.config.height / 2 - 64, "pixel_font", 
            'you led them all to safety :]', 30).setOrigin(0.5);
            
        this.add.bitmapText(game.config.width / 2, game.config.height / 2, "pixel_font", 
            'press SPACE to play again', 15).setOrigin(0.5);

        this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 32, "pixel_font", 
            'press C to view credits', 15).setOrigin(0.5);
            
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start("LEVEL_1");
        }, this);
        this.input.keyboard.on('keydown-C', () => {
            this.scene.start("CREDITS", "WIN");
        }, this);
    }

    update() {

    }
}