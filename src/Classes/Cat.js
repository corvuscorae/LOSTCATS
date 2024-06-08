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


        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create(scene, ID, room, player);

    }

    create(scene, ID, player){
        // cat overlap
        scene.physics.add.overlap(
            this, player,
            (obj1, obj2) => {
                this.discovered = true;
                console.log(`${ID} cat`);
            }
        );

        /* AUDIO */
        this.meow = [];
        // 3 meows
        for(let i = 1; i <= 3; i++){
            this.meow.push(
                scene.sound.add(`meow-${i}`, {
                volume: 1,
                rate: 1,
                detune: 0,
                loop: false
                })
            );
        }
    }

    update(ID, activeRoom) {
        if(activeRoom === this.room){ 
            this.anims.play(`${ID}-cat-IDLE`, true); 
            
            this.playMeow(Phaser.Math.Between(0,this.meow.length-1));
        } else{ this.stopMeow(); }
        // if cat has been discovered, follow player (?)
        // https://newdocs.phaser.io/docs/3.80.0/Phaser.Physics.Arcade.ArcadePhysics#accelerateToObject
        //if(this.discovered == true){
        //    console.log(`found ${ID} cat`);
        //}
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