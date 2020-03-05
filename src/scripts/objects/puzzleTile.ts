import { BaseSprite } from "../cm-phaser-library/src/sprites/base";
import { PRELOADED_KEYS } from "../../utils/dist/preloadedKeyObject";

export class RegularPuzzleTile extends BaseSprite {
    zone : Phaser.GameObjects.Zone;
    constructor(scene, x, y) {
        super(scene, x, y, PRELOADED_KEYS["WHITE-TILE"].key);
        this.setScale(.7);
        this.zone = this.scene.add.zone(this.x, this.y, this.width, this.height);
        this.zone.setRectangleDropZone(this.width, this.height);
    }
}