class Cat extends Phaser.Physics.Arcade.Sprite {

    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, speed, player) {
        super(scene, x, y, texture, frame);

        this.speed = speed;
        this.player = player;
        this.discovered = false;

        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    update() {
        // if cat has been discovered, follow player (?)
        // https://newdocs.phaser.io/docs/3.80.0/Phaser.Physics.Arcade.ArcadePhysics#accelerateToObject
        if(this.discovered == true){
            console.log("found a cat");
        }
    }

}