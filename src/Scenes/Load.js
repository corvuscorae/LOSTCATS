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
        this.load.audio("bg_music", "heavenly-energy-188908.mp3");

        // misc sfx
        this.load.audio("ff0", "forceField_000.ogg");
        this.load.audio("ff1", "forceField_001.ogg");
        this.load.audio("ff2", "forceField_002.ogg");
        this.load.audio("ff3", "forceField_003.ogg");
        this.load.audio("ff4", "forceField_004.ogg");

        // cat audio
        this.load.audio("meow-1", "cat-98721.ogg");     
        this.load.audio("meow-2", "cat-crying-81035.ogg");     
        this.load.audio("meow-3", "cat-meow-14536.ogg");    

        this.load.audio("purr-1", "cat-is-purring-27823.mp3");     
        this.load.audio("purr-2", "cat-purr-33835.mp3");     
        this.load.audio("purr-3", "purring_cat_01-68456.mp3");     
        this.load.audio("purr-4", "purring_cat_02-29526.mp3");     
        this.load.audio("purr-5", "purring-cat_01-63402.mp3");     
        this.load.audio("purr-6", "purring-happy-cat-29114.mp3");     

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