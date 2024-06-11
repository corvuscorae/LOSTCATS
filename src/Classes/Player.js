class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, speed, cursors) {
        super(scene, x, y, texture, frame);

        this.speed = speed;
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.create(scene);
    }

    create(scene){
        this.anims.play("ORB-IDLE", true);
    }

    update(spotlight) {
        // x movement
        if(Phaser.Input.Keyboard.JustDown(cursors.left)) { this.setAccelerationX(-this.speed); } 
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ this.setAccelerationX(this.speed); } 
        else{ this.setAccelerationX(0); }
        // y movement
        if(Phaser.Input.Keyboard.JustDown(cursors.up))   { this.setAccelerationY(-this.speed); } 
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)) { this.setAccelerationY(this.speed); } 
        else{ this.setAccelerationY(0); }

        // move the light with player
        spotlight.x = this.x;
        spotlight.y= this.y;
    }

}