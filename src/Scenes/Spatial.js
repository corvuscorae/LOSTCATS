class Spatial extends Phaser.Scene {
    constructor() {
        super("Spatial");
    }

    preload(){ }

    init() {
        console.log("Spatial");

        this.endScene = false;

        this.distance = { x: 0, y: 0, vect: 0, max: 0};
        //this.distance = 0;

        // variables and settings
        this.ACCELERATION = 500;
        this.DRAG = 6000;    // DRAG < ACCELERATION = icy slide
        this.GRAVITY = 2000;
        this.physics.world.gravity.y = this.GRAVITY;
        this.JUMP_VELOCITY = -600;
        this.SCALE = 2.0;
        
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // create map (from tilemap)
        this.TILESIZE = 16;
        //this.map = this.add.tilemap("level", this.TILESIZE, this.TILESIZE, 60, 60);
        this.map = this.add.tilemap("level", this.TILESIZE, this.TILESIZE, 60, 60);
       
        // tilesets
        this.tiles_brown       = this.map.addTilesetImage("Brown_Tile_Terrain", "brown tile");
        this.tiles_grey        = this.map.addTilesetImage("Gray_Tile_Terrain", "gray tile");
        this.tiles_scaff_bg    = this.map.addTilesetImage("Scaffolding_and_BG_Parts", "scaffolding + bg");
        
        this.tileSets = [this.tiles_brown, this.tiles_grey, this.tiles_scaff_bg];
        
        this.layer = this.map.createLayer("Platforms", this.tileSets, 0, 0);
   
        new Layout(this, this.map, this.layer, this.tileSets, "collides", 1, 1);

        /* CAMERA */
        this.cameras.main.setBounds(0,0,this.map.widthInPixels*5,this.map.heightInPixels);
        console.log(this.cameras.main);

        /* set physics bounds */
        //this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);    

        
        document.getElementById('description').innerHTML = 
        "<h2>Spatial.js<br> > press ENTER to restart scene<br> > press SPACE to start next scene<br> > CLICK to move target</h2>";
    }

    create() {
        this.physics.world.drawDebug = false;
        this.init();

        this.bg_music = this.sound.add("bg_music", {
            volume: 0,
            rate: 1,
            detune: 0,
            loop: true
        });
        this.bg_music.targetVolume = 0.4;
        if(!this.bg_music.isPlaying) this.bg_music.play();
        this.startMusic = true;
        this.stopMusic = false;

        this.distance.max = 
            Math.sqrt(  Math.pow((this.map.widthInPixels), 2) + 
                        Math.pow((this.map.heightInPixels), 2));

        this.target = {x: 0, y: 0};

        this.guy = this.physics.add.staticSprite( // alien in UFO
            200, 200,
            "platformer_characters", "tile_0006.png")
            .setScale(2).setGravity(0).setOrigin(0.5);
    }

    update() {
        if(cursors.left.isDown){this.guy.x -= 8; }
        if(cursors.right.isDown){ this.guy.x += 8;}

        /* spatial bg music logic (TEMP) */
        let distance = this.distance;
        distance.x = this.guy.x - this.target.x;
        distance.y = this.guy.y - this.target.y;
        distance.vect = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
        this.bg_music.targetVolume = 1.1 - (distance.vect / distance.max);

        if(this.guy.x < 0){ this.guy.x = 0; } // LHS BOUND
        if(this.guy.x > this.cameras.main.width * 5){ 
            // RHS BOUND, limits to 5 screens in this case
            this.guy.x = this.cameras.main.width * 5; 
        } 

        if(this.guy.x > this.cameras.main.scrollX + this.cameras.main.width){
            this.cameras.main.scrollX += this.cameras.main.width;
            let screen = this.cameras.main.scrollX / this.cameras.main.width;
            console.log(screen)
            
        }
        if(this.guy.x < this.cameras.main.scrollX){
            this.cameras.main.scrollX -= this.cameras.main.width;
            let screen = this.cameras.main.scrollX / this.cameras.main.width;
            console.log(screen)
            
        }

        // while not ending the scene, set volume based on distance
        if(!this.endScene && this.bg_music.targetVolume > 0){ 
            this.bg_music.setVolume(this.bg_music.targetVolume); 
        }

        if(this.startMusic == true){
            this.fade(this.bg_music, this.bg_music.targetVolume, 0.05);
        }
        if(this.bg_music.volume >= this.bg_music.targetVolume){ this.startMusic = false; }
            
        if(this.stopMusic == true){
            this.fade(this.bg_music, 0, 0.01);
        }
        
        // reset scene
        if (Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.endScene = true; this.nextScene = this;
        }
        // next scene
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.endScene = true; this.nextScene = "Load";
        }
        this.exitScene(this.endScene, this.nextScene);
    }

    fade(sound, target, rate){
        let volume = sound.volume;
        if(volume > target){ sound.volume -= rate; } 
        else if(volume < target){ sound.volume += rate; } 
    }

    exitScene(active, nextScene){
        if(active){// fade out bg_music
            this.stopMusic = true;
            // restart this scene
            if(this.bg_music.volume <= 0){ 
                this.bg_music.stop();
                this.scene.start(nextScene); 
            }
        }
    }
}