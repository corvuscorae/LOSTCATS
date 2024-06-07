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
        this.groundLayer = this.map.createBlankLayer("ground", this.dungeonTile);
        this.stuffLayer = this.map.createBlankLayer("stuff", this.dungeonTile);

        this.dungeon = new DungeonWorld(this, 
            this.dungeonLayout, this.map, 
            this.BGLayer, this.groundLayer, this.stuffLayer)

        //for(let room of this.dungeon.rooms){        }
        
        //* PLAYER *//
        this.guy = new Player(this,
            this.map.widthInPixels/2, this.map.heightInPixels/2, 
            "platformer_characters", "tile_0006.png",
            this.SPEED, cursors);
        this.guy.setScale(1.5)
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
        for(let i = 0; i < 6; i++){ this.catCoords.push({x: -1, y: -1, room: rm[i] }); }
        // > choose random coords in the correct rooms to spawn cat at
        for(let room of this.dungeon.rooms){
            for(let cat of this.catCoords){
                if(cat.room === room.index){
                    // we're in the room we randomly chose earlier
                    // choose random coords in this room
                    cat.x = Phaser.Math.Between((room.left+1)*this.TILESIZE,(room.right-1)*this.TILESIZE);
                    cat.y = Phaser.Math.Between((room.top+1)*this.TILESIZE,(room.bottom-1)*this.TILESIZE);
                }
            }
        }

        this.cat = {
            black: 
                new Cat(this,
                    this.catCoords[0].x, this.catCoords[0].y, this.catCoords[0].room, 
                    "cats-sprites", "black-idle0.png",
                    this.SPEED, this.guy).setScale(2),
            grey: 
                new Cat(this,
                    this.catCoords[1].x, this.catCoords[1].y, this.catCoords[1].room, 
                    "cats-sprites", "grey-idle0.png",
                    this.SPEED, this.guy).setScale(2),
            hairless: 
                new Cat(this,
                    this.catCoords[2].x, this.catCoords[2].y, this.catCoords[2].room, 
                    "cats-sprites", "hairless-idle0.png",
                    this.SPEED, this.guy).setScale(2),
            orange: 
                new Cat(this,
                    this.catCoords[3].x, this.catCoords[3].y,  this.catCoords[3].room, 
                    "cats-sprites", "orange-idle0.png",
                    this.SPEED, this.guy).setScale(2),
            white: 
                new Cat(this,
                    this.catCoords[4].x, this.catCoords[4].y, this.catCoords[4].room, 
                    "cats-sprites", "white-idle0.png",
                    this.SPEED, this.guy).setScale(2),
            whiteblack: 
                new Cat(this,
                    this.catCoords[5].x, this.catCoords[5].y, this.catCoords[5].room, 
                    "cats-sprites", "whiteblack-idle0.png",
                    this.SPEED, this.guy).setScale(2),
        };

        

        // make walls collidable 
        //for(let i in walls){ this.groundLayer.setCollision(walls[i]); }
        for(let i of this.dungeon.collides){ this.groundLayer.setCollision(i); }
        this.collider = 
            this.physics.add.collider(this.guy, this.groundLayer,
                (obj1, obj2) => {
                    console.log("bang")
                }
            );

        // undiscovered rooms are invisible on minimap
        this.invisLayer = this.map.createBlankLayer("invis", this.dungeonTile).fill(100);
            
        //* CAMERAS *//
        let viewSize = this.WALLSIZE * this.TILESIZE; // viewport will be confined to the square rooms with a border on the side
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels)
            .startFollow(this.guy).stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setOrigin(0).setViewport(0,0,viewSize,viewSize);
    
        this.miniMapCamera = this.cameras.add(viewSize, 0, game.config.width - viewSize, game.config.width - viewSize)
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels).setZoom(0.2)
            .setBackgroundColor(0x000).startFollow(this.guy, false, 0.4, 0.4)
            .ignore([this.dungeon.rooms[0]]);

        /*******     DEBUG     *******/
        // debug(drawDebug, showHTML, collisionToggle)
        this.debug(false, false, true);
        /****************************/
    }

    debug(drawDebug, showHTML, collisionToggle){
        this.physics.world.drawDebug = drawDebug;
        this.collider.active = collisionToggle;

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

    update() {
        this.guy.update();

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
                room.active = true;
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