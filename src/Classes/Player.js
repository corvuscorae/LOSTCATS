class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, cursors) {
        super(scene, x, y, texture, frame);

        this.speed = speed;

        this.isLeading = false;
        scene.physics.add.existing(this);
        scene.add.existing(this);
        console.log(this)
        this.create(scene);        
        
        this.body.maxSpeed = speed/2;
    }

    create(scene){
        this.anims.play("ORB-IDLE", true);

        this.sound = scene.sound.add("bg_music", {
            volume: 0.5,
            rate: 1,
            detune: 0,
            loop: true
        });
        this.sound.play();
    }

    update(spotlight) {
        // x movement
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) { 
            this.setAccelerationX(-this.speed); 
        } 
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ 
            this.setAccelerationX(this.speed); 
        } 
        else{ 
            this.setAccelerationX(0); 
        }
        // y movement
        if(Phaser.Input.Keyboard.JustDown(cursors.up))   { 
            this.setAccelerationY(-this.speed); 
        } 
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)) { 
            this.setAccelerationY(this.speed); 
        } 
        else{ 
            this.setAccelerationY(0); 
        }
        
        this.sound.setVolume(0.1 + 2*(this.body.speed/this.body.maxSpeed));
        
        // move the light with player
        spotlight.x = this.x;
        spotlight.y= this.y;

    }

}