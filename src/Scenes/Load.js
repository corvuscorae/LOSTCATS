class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // sprite atlas
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("brown tile", "Brown_Tile_Terrain.png");                 
        this.load.image("gray tile", "Gray_Tile_Terrain.png");             
        this.load.image("scaffolding + bg", "Scaffolding_and_BG_Parts.png");            
       
        this.load.tilemapTiledJSON("level", "level.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "packed_tilemap.png", {
            frameWidth: 16, frameHeight: 16
        });
        
        // audio
        this.load.audio("bg_music", "meepmoop_mixdown.ogg");     
    }

    create() {
         this.scene.start("Spatial");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}