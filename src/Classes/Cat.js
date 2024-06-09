class Cat extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, room, texture, ID, speed, player) {
        super(scene, x, y, texture);

        this.room = room; 
        this.speed = speed;
        this.discovered = false;

        this.meowing = {state: false, meowID: -1};

        this.distance = { 
            x: 0, 
            y: 0, 
            vect: 0, 
            max: room.width * room.height
        };
        this.target = {x: x, y: y}; 

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create(scene, ID, player);

    }

    create(scene, ID, player){
        // cat overlap
        scene.physics.add.overlap(
            this, player,
            (obj1, obj2) => {
                this.discovered = true;
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
    }

    update(ID, activeRoom, guy) {    // player passed from level
        if(activeRoom === this.room.index){ 
            this.anims.play(`${ID}-cat-IDLE`, true); 
            
            this.playMeow(Phaser.Math.Between(0,this.meow.length-1));
        } else{ this.stopMeow(); }

        // if cat has been discovered, follow player (?)
        // https://newdocs.phaser.io/docs/3.80.0/Phaser.Physics.Arcade.ArcadePhysics#accelerateToObject
        //if(this.discovered == true){
        //    console.log(`found ${ID} cat`);
        //}

        //* spatial meows */
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