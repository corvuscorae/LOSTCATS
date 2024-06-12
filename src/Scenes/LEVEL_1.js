class LEVEL_1 extends Phaser.Scene {
    constructor() {
        super("LEVEL_1");
    }

    /* VARIABLES + CURSORS */
    init() {
        this.flicker = 10;
        this.SPEED = 3000; 
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
            },
            LIGHT:{
                candle: [164, 148, 149],
                skull: [15, 16, 31, 32],
                torch: [47, 79, 97, 111]
            }
        };

        this.endScene = false;
        this.shadowActive = true;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        //* VARIABLES, CURSORS *//
        this.init();

        //* UI *//
        this.initUI();

        //* MAP, LAYERS, DUNGEON *//
        this.initEnvironment();

        //* PARTICLES *//
        my.vfx.sparkle = this.add.particles(0, 0, 'sparkle', {
            speed: 35,
            scale: { start: 0.15, end: 0 },
            alpha: { start: 1, end: 0.5 },
            // higher steps value = more time to go btwn min/max
            lifespan: { min: 10, max: 2000, steps: 500 },
            tint: [ 0x9ae4c4, 0xc5b1f2, 0xabdfd5, 0xffffff, 0xffffff ],
        })        
        
        //* PLAYER *//
        this.guy = new Player(this,
            this.map.widthInPixels/2, this.map.heightInPixels/2, 
            "ORB", "ORB-0.png",
            this.SPEED, cursors);
        this.guy.setScale(0.5)
            // shrink collision box so player has to get close enough to cat to light it up before collision is triggered
            .setSize(this.guy.width / 4, this.guy.height / 4)   

        // player vfx
        my.vfx.sparkle.startFollow(this.guy, 0, 0, false)

        //* CAT SPRITES *//
        this.catHandler();
        this.children.bringToTop(this.guy) // put guy in front of cats
        
        //* COLLISION *//
        this.collisionHandler();

        //* LIGHTING EFFECTS *//
        // casts a shadow over entire scene. 
        // (i found that this is a nice way to give light a softer edge as compared to a new light object alone)
        this.renderShadow = new Shadow(this);
        
        // light
        this.lights.enable();
        this.lights.setAmbientColor(0x030303);
        this.spotlight = this.lights.addLight(0, 0, 250).setIntensity(2);    
 
        //* CAMERAS *//
        this.camz();

        /*******     DEBUG     *******/
        // debug(drawDebug, showHTML, collisionToggle, shadowToggle)
        this.debug(false, false, false, false);
        /****************************/
    }

    update() {
        for(let room of this.dungeon.rooms){
            let x = this.guy.x / this.TILESIZE; // converts x y coords from pixels to tiles
            let y = this.guy.y / this.TILESIZE; //
            
            if(room.left < x && room.right > x && room.top < y && room.bottom > y ){ 
                /* this is the room guy is in! */
                room.discovered = true;
                this.ACTIVEROOM = room.index;

                // snap camera to current room
                this.cameras.main.setScroll(room.left * this.TILESIZE, room.top * this.TILESIZE);
                
                this.setInvisAlpha(0, room);
            } else{ 
                /* guy is NOT in this room */
                room.active = false; 
                if(room.discovered == true){
                    this.setInvisAlpha(0.7, room);
                }
            }
        }
        
        /* update player */
        this.guy.update(this.spotlight);

        /* update all cats */
        for(let catID in this.cat){
            this.cat[catID].update(this, catID, this.ACTIVEROOM, this.guy, this.space);
        }

        /* update renderShadow */
        this.renderShadow.update(this, this.guy, this.mask, this.shadowActive);
    }

////////////////////////////////////////////////////////////////////////
//-----------------------// HELPER FUNCTIONS //-----------------------//
////////////////////////////////////////////////////////////////////////

//* CREATE() HELPERS -------------------------------------------------//

/* INIT UI */
    initUI(){
        /* HTML */
        document.getElementById('description').innerHTML = 
        "<h2>idk yet</h2><br>meep moop";
    }

/* INIT MAP, LAYERS, DUNGEON */
    initEnvironment(){
        this.mask = this.add.image(0,0,'mask').setOrigin(0.5);
        this.mask32px = this.add.image(0,0,'mask32px').setOrigin(0.5);

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
        this.BGLayer = this.map.createBlankLayer("background", this.dungeonTile).setPipeline('Light2D');
        this.BGLayer.fill(this.TILES.BG);        

        this.groundLayer = this.map.createBlankLayer("ground", this.dungeonTile).setPipeline('Light2D');

        this.dungeon = new DungeonWorld(this, 
            this.dungeonLayout, this.map, this.TILES,
            this.groundLayer)
    }

/* CATS */
    catHandler(){
        // randomy placed in rooms

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
                    cat.x = Phaser.Math.Between((room.left+3)*this.TILESIZE,(room.right-3)*this.TILESIZE);
                    cat.y = Phaser.Math.Between((room.top+3)*this.TILESIZE,(room.bottom-3)*this.TILESIZE);
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
                    this.SPEED, this.guy
                ).setScale(2);
            this.cat[catID].setSize(this.cat[catID].width * 2, this.cat[catID].height * 3.5);
            this.cat[catID].setPipeline('Light2D');
            i++;
        }
    }

/* COLLISION */
    collisionHandler(){
        // make walls collidable 
        for(let i in this.TILES.WALLS){ 
            for(let tileIndex of this.TILES.WALLS[i]){
                this.groundLayer.setCollision(tileIndex); 
            }
        }

        // player collides with walls
        this.playerCollider = 
            this.physics.add.collider(this.guy, this.groundLayer,
                (obj1, obj2) => {
                    //console.log("bang")
                }
            );
        
        // cats collide with walls
        for(let catID in this.cat){
            this.physics.add.collider(this.cat[catID], this.groundLayer,
                (obj1, obj2) => {
                    //console.log("bang")
                }
            );
        }

        // cats collide with other cats
        for(let catID in this.cat){
            for(let other_catID in this.cat){
                if(other_catID != catID){
                    this.physics.add.collider(this.cat[catID], this.cat[other_catID],
                        (obj1, obj2) => {
                            //console.log("bang")
                        }
                    );
                }
            }
        }

        this.dungeon.lightCollision(this, this.guy);
    }

/* CAMERAS */
    camz(){
        /* MAIN */
        let viewSize = this.WALLSIZE * this.TILESIZE; // viewport will be confined to the square rooms with a border on the side
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels)
            .startFollow(this.guy).stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setOrigin(0).setViewport(0,0,viewSize,viewSize);
        
        /* MINIMAP */
        // minimalistic representation of map for minimap
        this.miniMapLayer = this.map.createBlankLayer("minimap", this.dungeonTile);
        this.miniRooms = this.add.graphics();
        for(let room of this.dungeon.rooms){
            this.miniMapLayer.fill(162,
                room.x, room.y, 
                room.width, room.height
            );
        }
        // create a layer to hide undiscovered rooms from minimap camera
        this.invisLayer = this.map.createBlankLayer("invis", this.dungeonTile).fill(100);
        this.miniMapCamera = this.cameras.add(viewSize + 25, 25, game.config.width - viewSize -50, game.config.width - viewSize -50)
            .startFollow(this.guy)//.stopFollow(this.guy) // ceneter cam on guy on scene load, stop follow
            .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels).setZoom(0.075)
            .setDeadzone(this.WALLSIZE*this.TILESIZE,this.WALLSIZE*this.TILESIZE)
            .ignore(this.groundLayer).ignore(this.renderShadow.effect).ignore(this.guy);   
        
        // main cam ignores minimap stuff
        this.cameras.main.ignore(this.miniMapLayer);
    }

/* DEBUG HELP */
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
                this.playerCollider.active = !this.playerCollider.active;
            }, this);
        }

        if(shadowToggle){
            // press C to TOGGLE ON/OFF collision
            this.input.keyboard.on('keydown-S', () => {
                this.shadowActive = !this.shadowActive;
            }, this);
        }
    }

//* UPDATE() HELPERS -------------------------------------------------//

/* MINIMAP ROOM VISIBILITY */
setInvisAlpha(ALPHA, room){
    // sets room visible on minimap by setting invisLayer alpha
    // to ALPHA for every tile in the given room
    this.invisLayer.forEachTile(
        t => (t.alpha = ALPHA),
        this,
        room.x, room.y,
        room.width, room.height
    )
}

}