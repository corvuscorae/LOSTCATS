class Layout extends Phaser.Scene {
    constructor(scene, map, layer, tilesets, property, x, y) {
        super(scene);
        //scene.add.existing(this);

        //return this;
        this.map = map;
        this.layer = layer;
        this.tileSets = tilesets;
        this.property = property;

        this.x = x; 
        this.y = y;

        this.create();
    }

    //preload() {
    //
    //}

    create() {      
        this.layer.setScale(game.config.width / this.map.widthInPixels);

        let x = this.x; let y = this.y;
        for(let tileset of this.tileSets){
            for(let tileID = tileset.firstgid; tileID <= tileset.firstgid+tileset.total; tileID++){
                let props = tileset.getTileProperties(tileID);  
                if(!props){ continue; }
                for(let prop in props){
                    if(prop == this.property){  
                        this.map.putTileAt(tileID, x, y, true, this.layer);
                        x++;
                    }
                }
            }
            x = this.x; y += 2;
        }
    }

    update() {
        
    }
}