class Shadow extends Phaser.Scene {
    constructor(scene) {
        super(scene);

        this.flicker = 10;

        this.create(scene);
    }

    create(scene) {       
        this.effect = scene.add.renderTexture(0,0,scene.scale.width,scene.scale.height);
        this.effect.setOrigin(0,0);
        this.effect.setScrollFactor(0,0);
        this.effect.setAlpha(0.5);
    }

    update(scene, guy, mask, active) {
        // erase shadow from around player
        const cam = scene.cameras.main;

        //  Clear the RenderTexture
        this.effect.clear();

        this.flicker--;
        if(this.flicker < 0){
            mask.setScale(Phaser.Math.FloatBetween(1.2,1.5));
            this.flicker = Phaser.Math.FloatBetween(3,10);
        }

        if(active){
            //  Fill it in black
            this.effect.fill(0x070707);

            //  Erase the 'mask' texture from it based on the player position
            this.effect.erase(mask, guy.x - cam.scrollX, guy.y - cam.scrollY);
        }
    }
}