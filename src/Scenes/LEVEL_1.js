class LEVEL_1 extends Phaser.Scene {
    constructor() {
        super("LEVEL_1");
    }

    preload(){ }

    init() {
        this.SPEED = 500; 
        this.TILESIZE = 32;
        this.ROOMSIZE = 25;

        this.endScene = false;

        this.distance = { x: 0, y: 0, vect: 0, max: 0};

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        //this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        //this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* AUDIO */
        this.bg_music = this.sound.add("bg_music", {
            volume: 0,
            rate: 1,
            detune: 0,
            loop: true
        });
        this.bg_music.targetVolume = 1;
        if(!this.bg_music.isPlaying) this.bg_music.play();
        this.startMusic = true;
        this.stopMusic = false;
        
        // DISTANCE INIT
        this.distance.max = 
            Math.sqrt(  Math.pow((game.config.width), 2) + 
                        Math.pow((game.config.height), 2));
        this.target = {x: 0, y: 0}; // TEMP

        /* HTML */
        document.getElementById('description').innerHTML = 
        "<h2>idk yet</h2><br>meep moop";
    }

    debug(drawDebug, showHTML){
        this.physics.world.drawDebug = drawDebug;

        if(showHTML){// shows dungeon layout at bottom of page
            const html = this.dungeon.drawToHtml({
                empty: " ",
                wall: "📦",
                floor: "☁️",
                door: "🚪"
            });
            // Append the element to an existing element on the page
            document.body.appendChild(html);
        }
    }

    create() {
        this.init();

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-3-procedural-dungeon-3bc19b841cd //
        this.dungeon = new Dungeon({
            // The dungeon's grid size
            width: this.ROOMSIZE*5,
            height: this.ROOMSIZE*5,
            doorPadding: 2,
            rooms: {
                width: { min: this.ROOMSIZE, max: this.ROOMSIZE },
                height: { min: this.ROOMSIZE, max: this.ROOMSIZE },
                maxArea: Math.pow(this.ROOMSIZE, 2),
                maxRooms: 20
            }
            });
        for(let room of this.dungeon.rooms){
            room.discovered = false;

            //console.log(room);
            let doors = room.getDoorLocations();
            for(let door of doors){
                // door coordinates are in respect to the room, so xMin = 0, xMax = ROOMSIZE - 1
                if(door.x == 0 || door.x == this.ROOMSIZE - 1){
                    // vertical doors
                    console.log(`verical @ (${door.x}, ${door.y})`);
                } else {
                    // horizontal doors
                    console.log(`horizontal @ (${door.x}, ${door.y})`);
                }
            }
        }

        // Create a blank map
        const map = this.make.tilemap({
            tileWidth: this.TILESIZE,
            tileHeight: this.TILESIZE,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        // Load up a tileset, in this case, the tileset has 1px margin & 2px padding (last two arguments)
        this.groundTiles = map.addTilesetImage("Brown_Tile_Terrain", "brown tile");

        // Create an empty layer and give it the name "Layer 1"
        this.groundLayer = map.createBlankLayer("ground", this.groundTiles);
        this.catLayer = map.createBlankLayer("cats", );

        // Turn the dungeon into a 2D array of tiles where each of the four types of tiles is mapped to a
        // tile index within our tileset. Note: using -1 for empty tiles means they won't render.
        let emptyID = -1;   let floorID = 139;
        let doorID = 155;    let wallID = 35
        const mappedTiles = this.dungeon.getMappedTiles({ 
            empty: emptyID, floor: floorID, door: doorID, wall: wallID });

        // Drop a 2D array into the map at (0, 0)
        this.groundLayer.putTilesAt(mappedTiles, 0, 0);
        /////////////////////////////////////////////////////////////////////////////////////////////////
        
        //* PLAYER *//
        this.guy = new Player(this,
            map.widthInPixels/2, map.heightInPixels/2, 
            "platformer_characters", "tile_0006.png",
            this.SPEED, cursors);
        this.guy.setScale(1.5)
            .setSize(this.guy.width / 2, this.guy.height / 2)
            .setOffset(this.guy.width / 4, this.guy.height / 2);
            
        // make walls collidable 
        this.groundLayer.setCollision(wallID);
        this.physics.add.collider(this.guy, this.groundLayer);
            
        //* CAMERAS *//
        let viewSize = this.ROOMSIZE * this.TILESIZE; // viewport will be confined to the square rooms with a border on the side
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels)
            .startFollow(this.guy).stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setOrigin(0).setViewport(0,0,viewSize,viewSize);
    
        this.miniMapCamera = this.cameras.add(viewSize, 0, game.config.width - viewSize, game.config.width - viewSize)
            .setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(0.2)
            .setBackgroundColor(0x000).startFollow(this.guy, false, 0.4, 0.4)
            .ignore([this.dungeon.rooms[0]]);

        /*******     DEBUG     *******/
        // debug(drawDebug, showHTML)
        this.debug(false, false);
        /****************************/
    }

    update() {
        this.guy.update();

        /* MAIN CAM MOVEMENT */
        // find what room guy is in
        for(let room of this.dungeon.rooms){
            room.discovered = true;
            // convert x y coords from pixels to tilesa
            let x = this.guy.x / this.TILESIZE;
            let y = this.guy.y / this.TILESIZE;
            
            if(room.left < x && room.right > x && room.top < y && room.bottom > y ){ 
                // this is the room guy is in!
                this.cameras.main.setScroll(room.left * this.TILESIZE, room.top * this.TILESIZE);
            }
        }

        /* spatial bg music logic (TEMP) */
        let distance = this.distance;
        distance.x = this.guy.x - this.target.x;
        distance.y = this.guy.y - this.target.y;
        distance.vect = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
        this.bg_music.targetVolume = 1.1 - (distance.vect / distance.max);

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
        
        //// reset scene
        //if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        //    this.endScene = true; this.nextScene = this;
        //}
        //// next scene
        //if (Phaser.Input.Keyboard.JustDown(this.space)) {
        //    this.endScene = true; this.nextScene = "Load";
        //}
        //this.exitScene(this.endScene, this.nextScene);
    }

    fade(sound, target, rate){
        let volume = sound.volume;
        if(volume > target){ sound.volume -= rate; } 
        else if(volume < target){ sound.volume += rate; } 
    }

    //exitScene(active, nextScene){
    //    if(active){// fade out bg_music
    //        this.stopMusic = true;
    //        // restart this scene
    //        if(this.bg_music.volume <= 0){ 
    //            this.bg_music.stop();
    //            this.scene.start(nextScene); 
    //        }
    //    }
    //}
}