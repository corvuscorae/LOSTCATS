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
        this.dungeon = new Dungeon({
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
        const map = this.make.tilemap({
            tileWidth: this.TILESIZE,
            tileHeight: this.TILESIZE,
            width: this.dungeon.width,
            height: this.dungeon.height
        });

        // load tileset
        this.dungeonTile = map.addTilesetImage("dungeon-packed", "dungeon");

        // Create an empty layer and give it the name "Layer 1"
        this.BGLayer = map.createBlankLayer("background", this.dungeonTile);
        this.groundLayer = map.createBlankLayer("ground", this.dungeonTile);
        this.catLayer = map.createBlankLayer("stuff", this.dungeonTile);

        // tile indexes
        let empty = -1;   
        let bg = 100;   
        let normalFloors = [69,70,71,72,85,88,104,120]; 
        let brokenFloors = [86,87,101,102,103,117,118,119];
        let doors = {
            left: [84,177],      // top,  bottom
            right: [82, 176],    // top,  bottom
            top: [126,127],       // left, right
            bottom: [160,161]     // left, right
        }; 
        let doorWrap = {
            left: [empty, 54],  // top,  bottom
            right: [empty, 53], // top,  bottom
            top: [84,82],       // left, right
            bottom: [54,53]     // left, right
        }     
        let walls = {
            left: 20,
            right: 25,
            top: [5,6,7,8],
            bottom: [37,38,39,40],
            corner: [4,9,36,41],  // topleft, topright, bottomleft, bottomright
            misc: [84,82,53,54]
        };

        // Set all tiles in the ground layer with blank tiles (brown tile)
        this.BGLayer.fill(bg);        
        
        //*************************************************************************************//
        // TODO: FIGURE OUT HOW TO MAKE ALLADIS A SEPARATE CLASS
        //********************************// BUILD-A-DUNGEON //********************************//
        let i = 0;
        for(let room of this.dungeon.rooms){
            room.discovered = false;
            room.index = i; i++;
            // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
            // occasionally place a dirty tile (10% of the time).
            this.groundLayer.weightedRandomize(
                [{ index: normalFloors, weight: 9 },    // 9/10 times, use index 6
                { index: brokenFloors, weight: 1 }],    // 1/10 times, randomly pick 7, 8 or 26
                room.x + 1, room.y + 1, 
                room.width - 2, room.height - 2);

                // Place the room corners tiles
                this.groundLayer.putTileAt(walls.corner[0], room.left,  room.top);
                this.groundLayer.putTileAt(walls.corner[1], room.right, room.top);
                this.groundLayer.putTileAt(walls.corner[2], room.left,  room.bottom);
                this.groundLayer.putTileAt(walls.corner[3], room.right, room.bottom);

                // place left and right walls
                this.groundLayer.fill(walls.left, room.left,  room.top + 1, 1, room.height - 2); // Left
                this.groundLayer.fill(walls.right, room.right, room.top + 1, 1, room.height - 2); // Right

                // top wall
                map.randomize(
                    room.x + 1, room.y, 
                    room.width - 2, 1,
                    walls.top, this.groundLayer
                );

                // bottom wall
                map.randomize(
                    room.x + 1, room.y + room.height - 1, 
                    room.width - 2, 1,
                    walls.bottom, this.groundLayer
                );

                // doors
                let roomDoor = room.getDoorLocations();
                let s = this.DOORSIZE;
                for(let i = 0; i < roomDoor.length; i+=s){
                    //console.log(roomDoor[i]);
                    // LEFT
                    if(roomDoor[i].x === 0){    
                        // top edge
                        this.groundLayer.putTileAt(doors.left[0], 
                            room.x + roomDoor[i].x, room.y + roomDoor[i].y - 1);
                        // bottom edge
                        this.groundLayer.putTileAt(doors.left[doors.left.length-1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y - 1);
                        // door wrap
                        this.groundLayer.putTileAt(doorWrap.left[1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y);
                    // RIGHT
                    } else if(roomDoor[i].x === room.width - 1){    
                        // top edge
                        this.groundLayer.putTileAt(doors.right[0], 
                            room.x + roomDoor[i].x, room.y + roomDoor[i].y - 1);
                        // bottom edge
                        this.groundLayer.putTileAt(doors.right[doors.right.length-1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y - 1);
                        // door wrap
                        this.groundLayer.putTileAt(doorWrap.right[1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y);
                    // TOP
                    } else if(roomDoor[i].y === 0){                 
                        // left edge
                        this.groundLayer.putTileAt(doors.top[0], 
                            room.x + roomDoor[i].x - 1, room.y + roomDoor[i].y);
                        // right edge
                        this.groundLayer.putTileAt(doors.top[doors.top.length-1], 
                            room.x + roomDoor[i+s-1].x - 1, room.y + roomDoor[i+s-1].y);
                        // door wrap
                        this.groundLayer.putTileAt(doorWrap.top[0], 
                            room.x + roomDoor[i].x - 2, room.y + roomDoor[i+s-1].y);
                        this.groundLayer.putTileAt(doorWrap.top[1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y);
                    // BOTTOM
                    } else if(roomDoor[i].y === room.height - 1){   
                        // left edge
                        this.groundLayer.putTileAt(doors.bottom[0], 
                            room.x + roomDoor[i].x - 1, room.y + roomDoor[i].y);
                        // right edge
                        this.groundLayer.putTileAt(doors.bottom[doors.bottom.length-1], 
                            room.x + roomDoor[i+s-1].x - 1, room.y + roomDoor[i+s-1].y);
                        // door wrap
                        this.groundLayer.putTileAt(doorWrap.bottom[0], 
                            room.x + roomDoor[i].x - 2, room.y + roomDoor[i+s-1].y);
                        this.groundLayer.putTileAt(doorWrap.bottom[1], 
                            room.x + roomDoor[i+s-1].x, room.y + roomDoor[i+s-1].y);
                    }
                }

                // STUFF LAYER!!!!!!

                
            }
        //*************************************************************************************//
        
        
        
        //* PLAYER *//
        this.guy = new Player(this,
            map.widthInPixels/2, map.heightInPixels/2, 
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
        for(let i in walls){ this.groundLayer.setCollision(walls[i]); }
        this.collider = this.physics.add.collider(this.guy, this.groundLayer);
            
        //* CAMERAS *//
        let viewSize = this.WALLSIZE * this.TILESIZE; // viewport will be confined to the square rooms with a border on the side
        this.cameras.main.setBounds(0,0,map.widthInPixels, map.heightInPixels)
            .startFollow(this.guy).stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setOrigin(0).setViewport(0,0,viewSize,viewSize);
    
        this.miniMapCamera = this.cameras.add(viewSize, 0, game.config.width - viewSize, game.config.width - viewSize)
            .setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(0.2)
            .setBackgroundColor(0x000).startFollow(this.guy, false, 0.4, 0.4)
            .ignore([this.dungeon.rooms[0]]);

        /*******     DEBUG     *******/
        // debug(drawDebug, showHTML, collisionToggle)
        this.debug(false, false, false);
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