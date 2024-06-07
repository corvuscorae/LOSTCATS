class DungeonWorld extends Phaser.Scene {
    constructor(scene, dungeon, map, BGLayer, groundLayer, stuffLayer) {
        super(scene);

        this.rooms = dungeon.rooms;
        this.collides = [];

        this.create(dungeon, map, BGLayer, groundLayer, stuffLayer);
    }

    create(dungeon, map, BGLayer, groundLayer, stuffLayer) {
        this.dungeon = dungeon;
        this.map = map;
        this.BGLayer = BGLayer;
        this.groundLayer = groundLayer;
        this.stuffLayer = stuffLayer;

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
           left: [20],
           right: [25],
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
               
               // left wall
                this.map.randomize(
                    room.left,  room.top + 1, 
                    1, room.height - 2,
                    walls.left, this.groundLayer
                );

                // right wall
                this.map.randomize(
                    room.right, room.top + 1, 
                    1, room.height - 2,
                    walls.right, this.groundLayer
                );

               // top wall
               this.map.randomize(
                   room.x + 1, room.y, 
                   room.width - 2, 1,
                   walls.top, this.groundLayer
               );

               // bottom wall
               this.map.randomize(
                   room.x + 1, room.y + room.height - 1, 
                   room.width - 2, 1,
                   walls.bottom, this.groundLayer
               );

               // doors
               let roomDoor = room.getDoorLocations();
               let s = this.dungeon.doorSize;
               for(let i = 0; i < roomDoor.length; i+=s){
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
       

       //** COLLISION **/
       // add tiles to collision array, collides[]
        for(let i in walls){
            for(let tileIndex of walls[i]){
                if(this.collides.indexOf(tileIndex) === -1){ this.collides.push(tileIndex); }
            }
        }
        console.log(this.collides);
    }

    update() {
        
    }
}