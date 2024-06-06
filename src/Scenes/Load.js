class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // player sprite 
        this.load.setPath("./assets/player/");
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // cats
        this.load.setPath("./assets/cats/");
        this.load.multiatlas("cats-sprites", "cat-sprite-sheet.json");

        // environment tiles
        this.load.setPath("./assets/enviro/");
        this.load.image("brown tile", "Brown_Tile_Terrain.png");                 
        this.load.image("gray tile", "Gray_Tile_Terrain.png");             
        this.load.image("scaffolding + bg", "Scaffolding_and_BG_Parts.png");            
       
        // audio
        this.load.setPath("./assets/audio/");
        this.load.audio("bg_music", "meepmoop_mixdown.ogg");     
    }

    create() {
         this.anims.create({
            key: 'blackcat-IDLE',
            frames: this.anims.generateFrameNames('cats-sprites', {
                prefix: "black-idle",
                start: 0,
                end: 9,
                suffix: ".png",
                zeroPad: 0
            }),
            frameRate: 15,
            repeat: -1
        });


        /***** go to first level *****/
        this.scene.start("LEVEL_1");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}