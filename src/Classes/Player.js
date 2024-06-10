class Player extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, speed, cursors) {
        super(scene, x, y, texture, frame);

        this.speed = speed;
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create();
    }

    create(){
        this.anims.play("ORB-IDLE", true);
    }

    update(spotlight) {
        // x movement
        if(cursors.left.isDown) { 
            this.setFlip(true, false);
            this.setVelocityX(-this.speed); 
        } 
        else if(cursors.right.isDown){ 
            this.resetFlip();
            this.setVelocityX(this.speed);
        } 
        else{ this.setVelocityX(0); }
        // y movement
        if(cursors.up.isDown)   { this.setVelocityY(-this.speed); } 
        else if(cursors.down.isDown) { this.setVelocityY(this.speed); } 
        else{ this.setVelocityY(0); }

        spotlight.x = this.x;
        spotlight.y=this.y;

        /*
        // ANIMS
        if(cursors.left.isDown){
            // left-up
            if(cursors.up.isDown){
                console.log("left-up");
            }
            // left-down
            else if(cursors.down.isDown){
                console.log("left-down");
            }
            // left
            else{
                console.log("left");
            }
        }
        else if(cursors.right.isDown){
            // right-up
            if(cursors.up.isDown){
                console.log("right-up");
            }
            // right-down
            else if(cursors.down.isDown){
                console.log("right-down");
            }
            // right
            else{
                console.log("right");
            }
        }
        // up
        else if(!cursors.left.isDown && !cursors.right.isDown && cursors.up.isDown){
            console.log("up");
        }
        // down
        else if(!cursors.left.isDown && !cursors.right.isDown && cursors.down.isDown){
            console.log("down");
        }
        // IDLE
        else{
            //console.log("idle");
            this.anims.play("knight_idle", true); 
        }
        
        */
        
    }

}