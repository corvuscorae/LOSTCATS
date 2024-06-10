class TITLE extends Phaser.Scene {
    constructor() {
        super("TITLE");
    }

    preload(){ 

    }

    create() {
        this.scene.start("LEVEL_1");
    }

    update() {

    }
}