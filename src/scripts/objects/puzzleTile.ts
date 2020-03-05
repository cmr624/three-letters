import { BaseSprite } from "../cm-phaser-library/src/sprites/base";
import { PRELOADED_KEYS } from "../../utils/dist/preloadedKeyObject";
import { BaseContainer } from "../cm-phaser-library/src/base/container";

export class RegularPuzzleTile extends BaseSprite {
    zone : Phaser.GameObjects.Zone;
    constructor(scene, x, y) {
        super(scene, x, y, PRELOADED_KEYS["WHITE-TILE"].key);
        this.setScale(.7);
        this.zone = this.scene.add.zone(this.x, this.y, this.width, this.height);
        this.zone.setRectangleDropZone(this.width, this.height);
    }
}

export class DoubleLetterPuzzleTileZone extends BaseContainer {
    top : DoubleLetterPuzzleTileSprite;
    bot : DoubleLetterPuzzleTileSprite;
    zone : Phaser.GameObjects.Zone;
    constructor(scene, x, y) {
        super(scene, x, y);
        this.top = new DoubleLetterPuzzleTileSprite(this.scene, 0, 30);
        this.bot = new DoubleLetterPuzzleTileSprite(this.scene, 0, -30);
        this.add(this.top);
        this.add(this.bot);
        this.setSize(this.top.width, (this.top.height * 2) + 20);
        this.zone = this.scene.add.zone(this.x, this.y, this.width, this.height);
        this.zone.setRectangleDropZone(this.width, this.height);
        // this.add(this.zone);
        console.log(this.zone);
        // this.add(this.zone);
    }
}

export class DoubleLetterPuzzleTileSprite extends BaseSprite {
    zone : Phaser.GameObjects.Zone;
    constructor(scene, x, y) {
        super(scene, x, y, PRELOADED_KEYS["GREEN-TILE"].key);
        this.setScale(.7);
    }
}