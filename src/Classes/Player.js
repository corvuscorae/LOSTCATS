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
    }

    update() {
        // x movement
        if(cursors.left.isDown) { this.setVelocityX(-this.speed); } 
        else if(cursors.right.isDown){ this.setVelocityX(this.speed); } 
        else{ this.setVelocityX(0); }
        // y movement
        if(cursors.up.isDown)   { this.setVelocityY(-this.speed); } 
        else if(cursors.down.isDown) { this.setVelocityY(this.speed); } 
        else{ this.setVelocityY(0); }
    }

}