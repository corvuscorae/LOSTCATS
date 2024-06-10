class LEVEL_1 extends Phaser.Scene {
    constructor() {
        super("LEVEL_1");
    }

    preload(){ }

    init() {
        this.SPEED = 500; 
        this.TILESIZE = 32;
        this.WALLSIZE = 25;
        this.DOORSIZE = 2;

        this.ACTIVEROOM = -1;

        this.EMPTYTILE = -1;
        this.TILES = {
            BG: [100],   
            FLOORS: {
                normal: [69,70,71,72,85,88,104,120],
                broken: [86,87,101,102,103,117,118,119]
            },
            DOORS: {
                left: [177,177],    // top,  bottom
                right: [176, 176],  // top,  bottom
                top: [126,127],     // left, right
                bottom: [160,161]   // left, right
            }, 
            DOORWRAP: { // aka, the walls surrounding each door
                left: [84, 54],     // top,  bottom
                right: [82, 53],    // top,  bottom
                top: [84,82],       // left, right
                bottom: [54,53]     // left, right
            },    
            WALLS: {
               left: [20],
               right: [25],
               top: [5,6,7,8],
               bottom: [37,38,39,40],
               corner: [4,9,36,41], // topleft, topright, bottomleft, bottomright
               misc: [84,82,53,54]
            }
        };

        this.endScene = false;

        this.shadowActive = true;

        this.distance = { x: 0, y: 0, vect: 0, max: 0};

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* AUDIO */
        this.bg_music = this.sound.add("bg_music", {
            volume: 0,
            rate: 1,
            detune: 0,
            loop: true
        });
        this.bg_music.targetVolume = 0;
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

    create() {
        this.init();

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-3-procedural-dungeon-3bc19b841cd //
        this.dungeonLayout = new Dungeon({
            // The dungeon's grid size
            width: this.WALLSIZE*5,
            height: this.WALLSIZE*5,
            doorPadding: this.DOORSIZE*2,
            doorSize: this.DOORSIZE,
            rooms: {
                width: { min: this.WALLSIZE, max: this.WALLSIZE },
                height: { min: this.WALLSIZE, max: this.WALLSIZE },
                maxArea: Math.pow(this.WALLSIZE, 2),
                maxRooms: 20
            }
            });
        
        // Create a blank map
        this.map = this.make.tilemap({
            tileWidth: this.TILESIZE,
            tileHeight: this.TILESIZE,
            width: this.dungeonLayout.width,
            height: this.dungeonLayout.height
        });

        // load tileset
        this.dungeonTile = this.map.addTilesetImage("dungeon-packed", "dungeon");

        // Create an empty layer and give it the name "Layer 1"
        this.BGLayer = this.map.createBlankLayer("background", this.dungeonTile);
        this.BGLayer.fill(this.TILES.BG);        

        this.groundLayer = this.map.createBlankLayer("ground", this.dungeonTile);
        this.stuffLayer = this.map.createBlankLayer("stuff", this.dungeonTile);

        this.dungeon = new DungeonWorld(this, 
            this.dungeonLayout, this.map, this.TILES,
            this.groundLayer, this.stuffLayer)

        //for(let room of this.dungeon.rooms){        }
        
        //* PLAYER *//
        this.guy = new Player(this,
            this.map.widthInPixels/2, this.map.heightInPixels/2, 
            "rogue_knight", "player-idle0.png",
            this.SPEED, cursors);
        this.guy.setScale(2.5)
            .setSize(this.guy.width / 2, this.guy.height / 2)
            .setOffset(this.guy.width / 4, this.guy.height / 2);

        //* CAT SPRITES *//
        // GENERATE COORDS FOR CATS
        this.catCoords = [];
        // > start by choosing random rooms to spawn in
        let rm = [];
        while(rm.length < 6){ // 6 cats --> 6 rooms
            let tryIndex = Phaser.Math.Between(1,this.dungeon.rooms.length-1);
            if(rm.indexOf(tryIndex) === -1){ rm.push(tryIndex); }
        }
        for(let i = 0; i < 6; i++){ this.catCoords.push({x: -1, y: -1, room: this.dungeon.rooms[rm[i]] }); }
        // > choose random coords in the correct rooms to spawn cat at
        for(let room of this.dungeon.rooms){
            for(let cat of this.catCoords){
                if(cat.room.index === room.index){
                    // we're in the room we randomly chose earlier
                    // choose random coords in this room
                    cat.x = Phaser.Math.Between((room.left+1)*this.TILESIZE,(room.right-1)*this.TILESIZE);
                    cat.y = Phaser.Math.Between((room.top+1)*this.TILESIZE,(room.bottom-1)*this.TILESIZE);
                }
            }
        }

        this.cat = {
            black: null, grey: null, hairless: null,
            orange: null, white: null, whiteblack: null
        };
        let i = 0;
        for(let catID in this.cat){
            this.cat[catID] = 
                new Cat(this,
                    this.catCoords[i].x, this.catCoords[i].y, this.catCoords[i].room, 
                    "cats-sprites", catID,
                    this.SPEED, this.guy).setScale(2);
            i++;
        }

        this.renderShadow = this.add.renderTexture(0,0,this.scale.width,this.scale.height);
        this.renderShadow.setOrigin(0,0);
        this.renderShadow.setScrollFactor(0,0);
        console.log()
        
        
        // make walls collidable 
        //for(let i in walls){ this.groundLayer.setCollision(walls[i]); }
        for(let i in this.TILES.WALLS){ 
            for(let tileIndex of this.TILES.WALLS[i]){
                this.groundLayer.setCollision(tileIndex); 
            }
        }

        // player collides with walls
        this.collider = 
            this.physics.add.collider(this.guy, this.groundLayer,
                (obj1, obj2) => {
                    //console.log("bang")
                }
            );
        
        // cats collide with walls

        // minimap tiles
        this.miniMapLayer = this.map.createBlankLayer("minimap", this.dungeonTile);
        for(let room of this.dungeon.rooms){
            this.miniMapLayer.fill(162,
                room.x + 1, room.y + 1, 
                room.width - 2, room.height - 2
            );
        }

        // undiscovered rooms are invisible on minimap
        this.invisLayer = this.map.createBlankLayer("invis", this.dungeonTile).fill(100);
            
        //* CAMERAS *//
        let viewSize = this.WALLSIZE * this.TILESIZE; // viewport will be confined to the square rooms with a border on the side
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels)
            .startFollow(this.guy).stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setOrigin(0).setViewport(0,0,viewSize,viewSize)
            .ignore(this.miniMapLayer);

        this.miniMapCamera = this.cameras.add(viewSize, 0, game.config.width - viewSize, game.config.width - viewSize)
            .startFollow(this.guy)//.stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels).setZoom(0.15)
            .setDeadzone(this.WALLSIZE*this.TILESIZE,this.WALLSIZE*this.TILESIZE)
            .ignore(this.groundLayer).ignore(this.renderShadow).ignore(this.guy);

        /*******     DEBUG     *******/
        // debug(drawDebug, showHTML, collisionToggle, shadowToggle)
        this.debug(false, false, true, true);
        /****************************/
    }

    debug(drawDebug, showHTML, collisionToggle, shadowToggle){
        this.physics.world.drawDebug = drawDebug;

        if(showHTML){// shows dungeon layout at bottom of page
            const html = this.dungeonLayout.drawToHtml({
                empty: " ",
                wall: "📦",
                floor: "☁️",
                door: "🚪"
            });
            // Append the element to an existing element on the page
            document.body.appendChild(html);
        }

        if(collisionToggle){
            // press C to TOGGLE ON/OFF collision
            this.input.keyboard.on('keydown-C', () => {
                this.collider.active = !this.collider.active;
            }, this);
        }

        if(shadowToggle){
            // press C to TOGGLE ON/OFF collision
            this.input.keyboard.on('keydown-S', () => {
                this.shadowActive = !this.shadowActive;
            }, this);
        }
    }

    update() {
        

        /* MAIN CAM MOVEMENT */
        // find what room guy is in
        for(let room of this.dungeon.rooms){
            
            // convert x y coords from pixels to tilesa
            let x = this.guy.x / this.TILESIZE;
            let y = this.guy.y / this.TILESIZE;
            
            if(room.left < x && room.right > x && room.top < y && room.bottom > y ){ 
                // this is the room guy is in!
                this.cameras.main.setScroll(room.left * this.TILESIZE, room.top * this.TILESIZE);
                room.discovered = true;
                this.ACTIVEROOM = room.index;
                this.invisLayer.forEachTile(
                    t => (t.alpha = 0),
                    this,
                    room.x, room.y,
                    room.width, room.height
                )
            } else{ 
                room.active = false; 
                if(room.discovered == true){
                    this.invisLayer.forEachTile(
                        t => (t.alpha = 0.7),
                        this,
                        room.x, room.y,
                        room.width, room.height
                    )
                }
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

        //for(let i in this.cat){
        //    if(this.cat[i].discovered == true){ this.cat[i].update(i); }
        //}
        this.guy.update();
        for(let catID in this.cat){
            this.cat[catID].update(catID, this.ACTIVEROOM, this.guy);
        }

        //  Draw the spotlight on the player
        const cam = this.cameras.main;

        //  Clear the RenderTexture
        this.renderShadow.clear();

        if(this.shadowActive){
            //  Fill it in black
            this.renderShadow.fill(0x000000);

            //  Erase the 'mask' texture from it based on the player position
            //  'mask' is 300x300px, so subtract half of that (150x150) from guy x and y
            this.renderShadow.erase('mask', (this.guy.x - 150) - cam.scrollX, (this.guy.y - 150) - cam.scrollY);
        }
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