class DungeonWorld extends Phaser.Scene {
    constructor(scene, dungeon, map, TILES, groundLayer, stuffLayer) {
        super(scene);

        this.rooms = dungeon.rooms;

        this.create(dungeon, map, TILES, groundLayer, stuffLayer);
    }

    create(dungeon, map, TILES, groundLayer, stuffLayer) {       
        this.groundLayer = groundLayer;

        let i = 0;
        for(let room of dungeon.rooms){
            room.discovered = false;
            room.index = i; i++;
           
            this.buildWalls(room, map, TILES);
            this.buildDoors(room, TILES, dungeon.doorSize);
               // STUFF LAYER!!!!!!
        } 
    }

    buildWalls(room, map, TILES){
        this.groundLayer.weightedRandomize(
            [{ index: TILES.FLOORS.normal, weight: 9 },    // 9/10 times, use index 6
            { index: TILES.FLOORS.broken, weight: 1 }],    // 1/10 times, randomly pick 7, 8 or 26
            room.x + 1, room.y + 1, 
            room.width - 2, room.height - 2
        );

        // Place the room corners tiles
        this.groundLayer.putTileAt(TILES.WALLS.corner[0], room.left,  room.top);
        this.groundLayer.putTileAt(TILES.WALLS.corner[1], room.right, room.top);
        this.groundLayer.putTileAt(TILES.WALLS.corner[2], room.left,  room.bottom);
        this.groundLayer.putTileAt(TILES.WALLS.corner[3], room.right, room.bottom);
           
        // left wall
        map.randomize(
            room.left,  room.top + 1, 
            1, room.height - 2,
            TILES.WALLS.left, this.groundLayer
            );

        // right wall
        map.randomize(
            room.right, room.top + 1, 
            1, room.height - 2,
            TILES.WALLS.right, this.groundLayer
            );

        // top wall
        map.randomize(
            room.x + 1, room.y, 
            room.width - 2, 1,
            TILES.WALLS.top, this.groundLayer
           );

        // bottom wall
        map.randomize(
            room.x + 1, room.y + room.height - 1, 
            room.width - 2, 1,
            TILES.WALLS.bottom, this.groundLayer
           );
    }

    buildDoors(room, TILES, doorSize){
        let s = doorSize;

        // firstly, we need to get our door locations for this room: 
        let roomDoor = room.getDoorLocations();
        
        // then, we're gonna want to create two more arrays that will be copies of roomDoor
        //      > one copy will be sorted WRT the door object's x value
        //      > one copy will be sorted WRT the door object's y value
        /* NOTE: it's important to do this because the door placing algorithm works by finding 
            doors placed along the top/bottom or left/right walls, then assumes that there will 
            be ${doorSize} more doors in a row and places door tiles accordingly. (so, if we're 
            placing a vertical door using an array sorted WRT y -- and there's also a vertical 
            door directly across the room -- the next coordinate in the array will be to that 
            door across the room, resulting in disaster).                                       */
        let roomDoorX = [];  
        let roomDoorY = [];

        /* NOTE: we do a deep copy here instead of doing something like roomDoorX = roomdoor
            because the latter results in a reference to roomDoor 
            (which we dont want! we want two separate arrays with distinct sorts instead)       */
        for(let door of roomDoor){
            roomDoorX.push(door);
            roomDoorY.push(door);
        }
        
        roomDoorX.sort( (a,b) => a.x - b.x );   // sorted wrt x
        roomDoorY.sort( (a,b) => a.y - b.y );   // sorted wrt y
        // we'll use roomDoorX for VERTICAL doors...
        // ...and roomDoorY for HORIZONTAL doors
        
        for(let i = 0; i < roomDoor.length; i+=s){
            let orientation = "";
            let doorTiles = null; let wrapTiles = null;
            let x1 = -1; let y1 = -1;
            let x2 = -1; let y2 = -1;

            // vertical door on a LEFT or RIGHT wall
            // > roomDoor[i].x is 0 or room.width - 1
            if(roomDoorX[i].x % (room.width - 1) === 0){ 
                orientation = "vertical";

                if(roomDoorX[i].x === 0){ // left
                    doorTiles = TILES.DOORS.left;
                    wrapTiles = TILES.DOORWRAP.left;
                } else{ // right
                    doorTiles = TILES.DOORS.right;
                    wrapTiles = TILES.DOORWRAP.right;
                }

                x1 = x2 = room.x + roomDoorX[i].x;
                y1 = room.y + roomDoorX[i].y - 1;
                y2 = room.y + roomDoorX[i+s-1].y - 1;

                //if(y1 == y2){ 
                //    console.log(`drama in room ${room.index}: y = ${roomDoorX[i].y} >:(`) 
                //    console.log(roomDoorX)
                //}
            }
            
            // horizontal door on a TOP or BOTTOM wall
            // > roomDoorX[i].y is 0 or room.height - 1
            else if(roomDoorY[i].y % (room.height - 1) === 0){ 
                orientation = "horizontal";
                
                if(roomDoorY[i].y === 0){ // top
                    doorTiles = TILES.DOORS.top;
                    wrapTiles = TILES.DOORWRAP.top;
                } else{ // bottom
                    doorTiles = TILES.DOORS.bottom;
                    wrapTiles = TILES.DOORWRAP.bottom;
                }

                x1 = room.x + roomDoorY[i].x     - 1;
                x2 = room.x + roomDoorY[i+s-1].x - 1;
                y1 = y2 = room.y + roomDoorY[i].y;
                
                //if(x1 == x2){ 
                //    console.log(`drama in room ${room.index}: x = ${roomDoorY[i].x} >:(`) 
                //    console.log(roomDoorY)
                //}
            }
            else{ continue; }

            this.putDoor(orientation,
                    doorTiles, wrapTiles, 
                    x1, y1, x2, y2
            );
        }
    }
/*
    putVerticalDoor(doorTiles, wrapTiles, x1, y1, x2, y2){
        // top edge
        this.groundLayer.putTileAt(doorTiles[0], x1, y1);

        // NOTE: if door length > 2, here is where you would put any middle tiles
        // TODO: add this if time before finals due (or jus do it later -- only doing size 2 doors for final)

        // bottom edge
        this.groundLayer.putTileAt(doorTiles[doorTiles.length-1], x2, y2);

        // door wrap
        this.groundLayer.putTileAt(wrapTiles[0], x2, y1 - 1);
        this.groundLayer.putTileAt(wrapTiles[1], x2, y2 + 1);
    }
    putHorizontalDoor(doorTiles, wrapTiles, x1, y1, x2, y2){
        // left edge
        this.groundLayer.putTileAt(doorTiles[0], x1, y1);

        // TODO: add this if time before finals due (or jus do it later -- only doing size 2 doors for final)
        // NOTE: if door length > 2, here is where you would put any middle tiles

        // right edge
        this.groundLayer.putTileAt(doorTiles[doorTiles.length-1], x2, y2);

        // door wrap
        this.groundLayer.putTileAt(wrapTiles[0], x1 - 1, y1);
        this.groundLayer.putTileAt(wrapTiles[1], x2 + 1, y2);
    }
*/
    putDoor(orientation, doorTiles, wrapTiles, x1, y1, x2, y2){
        let xShift = null; let yShift = null;
        orientation = orientation.toLowerCase();
        if(orientation === "horizontal") { 
            xShift = 1; yShift = 0;
        }else if(orientation === "vertical"){
            xShift = 0; yShift = 1;
        }else{ throw new Error(`Invalid door orientation: "${orientation}". Must be "horizontal" or "vertical".`); }

        // edge
         this.groundLayer.putTileAt(doorTiles[0], x1, y1);

        // NOTE: if door length > 2, here is where you would put any middle tiles
        // TODO: add this if time before finals due (or jus do it later -- only doing size 2 doors for final)
 
        // edge
        this.groundLayer.putTileAt(doorTiles[doorTiles.length-1], x2, y2);
 
         // door wrap
        this.groundLayer.putTileAt(wrapTiles[0], x1 - xShift, y1 - yShift);
        this.groundLayer.putTileAt(wrapTiles[1], x2 + xShift, y2 + yShift);       
    }

    update() {
        
    }
}