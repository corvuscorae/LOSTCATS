class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        
        this.load.setPath("./assets/");
        this.load.bitmapFont("pixel_font", "pixel.png", "pixel.xml");

        // player sprite 
        this.load.setPath("./assets/player/");
        this.load.atlas("ORB", "ORB.png", "ORB.json");

        this.load.image("sparkle", "particle.png");
        
        // cats
        this.load.setPath("./assets/cats/");
        this.load.multiatlas("cats-sprites", "cat-sprite-sheet.json");

        // environment tiles
        this.load.setPath("./assets/enviro/");
        this.load.image("dungeon", "dungeon-packed.png");    
        this.load.spritesheet('dungeon-spritesheet', 'dungeon-packed.png', {
            frameWidth: 32,
            frameHeight: 32
            });
        
        this.load.image('mask', 'mask.png');             
        this.load.image('mask32px', 'mask_32px.png');             
       
        // audio
        this.load.setPath("./assets/audio/");
        this.load.audio("bg_music", "meepmoop_mixdown.ogg");     

        // cat audio
        this.load.audio("meow-1", "cat-98721.ogg");     
        this.load.audio("meow-2", "cat-crying-81035.ogg");     
        this.load.audio("meow-3", "cat-meow-14536.ogg");     
        this.load.audio("purr", "purring-cat-156459.ogg");     


        

    }

    create() {
        let catIDs = ["black", "grey", "hairless", "orange", "white", "whiteblack"];
        
        for(let ID of catIDs){
            // IDLE
            this.anims.create({
                key: `${ID}-cat-IDLE`,
                frames: this.anims.generateFrameNames('cats-sprites', {
                    prefix: `${ID}-idle`,
                    start: 0,
                    end: 9,
                    suffix: ".png",
                    zeroPad: 0
                }),
                frameRate: 15,
                repeat: -1
            });
            // walk
            this.anims.create({
                key: `${ID}-cat-WALK`,
                frames: this.anims.generateFrameNames('cats-sprites', {
                    prefix: `${ID}-walk`,
                    start: 0,
                    end: 7,
                    suffix: ".png",
                    zeroPad: 0
                }),
                frameRate: 15,
                repeat: -1
            });
            // laying
            this.anims.create({
                key: `${ID}-cat-LAYING`,
                frames: this.anims.generateFrameNames('cats-sprites', {
                    prefix: `${ID}-laying`,
                    start: 0,
                    end: 7,
                    suffix: ".png",
                    zeroPad: 0
                }),
                frameRate: 12,
                repeat: 0
            })
        }

        this.anims.create({
            key: "ORB-IDLE",
            frames: this.anims.generateFrameNames('ORB', {
                prefix: "ORB-",
                start: 0,
                end: 59,
                suffix: ".png",
                zeroPad: 0
            }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: "candle-lit",
            defaultTextureKey: "dungeon-spritesheet",
            frames: [ 
                {frame: 148}, 
                {frame: 149} ],
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "skull-lit",
            defaultTextureKey: "dungeon-spritesheet",
            frames: [ 
                {frame: 30}, 
                {frame: 31} ],
            frameRate: 6,
            repeat: -1
        });

        /***** go to first level *****/
        this.scene.start("TITLE");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}