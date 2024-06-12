class Cat extends Phaser.Physics.Arcade.Sprite {
    // TODO: FIX MEOW BUG
    //  should stop meowing when discovered but start meowing if lost (stopped following guy)
    constructor(scene, x, y, room, texture, ID, speed, player) {
        super(scene, x, y, texture);

        this.room = room; 
        this.speed = speed;
        this.ID = ID;

        this.goSit = false;

        this.following = false;
        this.meowing = {state: false, meowID: -1};

        this.relativePosition = { x: 0, y: 0}
        this.collisionOffset = {x: 200, y: 200};
        this.overlapping = false;
        this.moveToward = { x: 0, y: 0 }

        this.distance = { // will be used for spatial audie effect
            x: 0, 
            y: 0, 
            vect: 0, 
            max: room.width * room.height
        };

        this.target = {x: x, y: y}; 

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create(scene, player);

    }

    create(scene, player){
        //console.log(this);
        // cat overlap
        scene.physics.add.overlap(
            this, player,
            (obj1, obj2) => {
                // follow player while overlap
                obj1.setSize(this.width/3, this.height/2)
                    .setOffset(this.width/3, this.height/2);
                this.following = true;
            }
        );

        /* AUDIO */
        this.meow = [];
        // 3 meows
        for(let i = 1; i <= 3; i++){
            this.meow.push(
                scene.sound.add(`meow-${i}`, {
                volume: 0,
                rate: 1,
                detune: 0,
                loop: false
                })
            );
            this.meow[i-1].targetVolume = 1;
            if(!this.meow[i-1].isPlaying) this.meow[i-1].play();
        }

        //
        scene.input.on('pointerdown', (pointer) => {
            //console.log(`${pointer.x} ${pointer.y}`) 
            //console.log(`${scene.cameras.main.scrollX} ${scene.cameras.main.scrollX}`) 
            if(this.room.index == 0){ 
                this.goSit = true;
                this.following = false;
                
                let x = pointer.x + scene.cameras.main.scrollX;
                let y = pointer.y + scene.cameras.main.scrollY;
                console.log (x + " " + y)

                scene.physics.moveTo(this,x, y, Phaser.Math.Between(50.2,50.5)
                );

                this.body.enabled = false;
            }
        })
    }

    update(scene,ID, activeRoom, guy, cursor) {    // player passed from level
        if(activeRoom === this.room.index && !this.goSit){ 
            if(!this.following){ this.anims.play(`${ID}-cat-IDLE`, true) }; 
            if(!this.overlapping && !this.following) this.playMeow(Phaser.Math.Between(0,this.meow.length-1));
        } else{ this.stopMeow(); }

        // set this.room to room cat is currently in
        for(let room of scene.dungeon.rooms){
            let x = this.x / scene.TILESIZE; // converts x y coords from pixels to tiles
            let y = this.y / scene.TILESIZE; //
            
            if(room.left < x && room.right > x && room.top < y && room.bottom > y ){ 
                /* this is the room cat is in! */
                this.room = room;
            }
        }
        
        this.catMovement(scene,guy,ID);

        this.catSitting(this.goSit);
      
        //* spatial meows */
        this.target.x = this.x; this.target.y = this.y;
        let distance = this.distance;
        distance.x = guy.x - this.target.x;
        distance.y = guy.y - this.target.y;
        distance.vect = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
        
        this.targetVolume = 1.1 - (distance.vect / distance.max);
        
        for(let i in this.meow){
            if(this.meow[i].isPlaying){
                this.meow[i].setVolume(this.targetVolume);
            }
        }
    }

    catSitting(){
        
    }

    catMovement(scene, guy, ID){
        if(this.following == true){
            this.collisionCheck(guy);
            //console.log(`${this.ID}: ${this.room.index}`)

            if(this.overlapping == true){
                scene.physics.moveTo(this, 
                    this.moveToward.x, this.moveToward.y, 
                    guy.body.speed/Phaser.Math.Between(1.2,1.5)
                );

                this.overlapping = false;
            }
            else{ 
                this.body.setVelocity(0);
                this.following = false;
            }
                

            if(this.x > guy.x){ 
                this.setFlip(true); 
                this.relativePosition.x = -1;
            }
            else {//if(this.x < guy.x){ 
                this.resetFlip(); 
            }

            if(this.body.speed > 0){
                this.anims.play(`${ID}-cat-WALK`, true); 
            }
            else{
                this.anims.play(`${ID}-cat-IDLE`, true); 
            }
        }
    }

    // custom collision
    collisionCheck(guy){
        if (Math.abs(this.x - guy.x) > 
            (this.displayWidth/2 + guy.displayWidth/2) + this.collisionOffset.x) { return; }
        if (Math.abs(this.y - guy.y) > 
            (this.displayHeight/2 + guy.displayHeight/2) + this.collisionOffset.y) { return; }
        
        // we only reach here if there is a collision. yippie
        this.following = true;
        this.overlapping = true;
        this.moveToward.x = Phaser.Math.FloatBetween(guy.x - 50, guy.x + 50);
        this.moveToward.y = Phaser.Math.FloatBetween(guy.y - 50, guy.y + 50);
    }

    playMeow(i){
        if(this.meowing.state == false){
            if(!this.meow[i].isPlaying){ 
                this.meow[i].play(); 
                this.meowing = { state: true, meowID: i};
            }
        } else{
            if(!this.meow[this.meowing.meowID].isPlaying){ 
                this.meowing = { state: false, meowID: -1};
            }
        }
    }

    stopMeow(){
        for(let i in this.meow){
            if(this.meow[i].isPlaying){
                this.meow[i].stop();
            }
        }
    }

}