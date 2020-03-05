import { DraggableSprite, DraggableContainer } from "../cm-phaser-library/src/sprites/interactive/draggableSprite";
import { defaultText } from "../cm-phaser-library/src/objects/textStyles";
import { PRELOADED_KEYS } from "../../utils/dist/preloadedKeyObject";


export class LetterTile extends DraggableContainer{

    sprite : Phaser.GameObjects.Sprite;
    text : Phaser.GameObjects.Text;
    defaultX : number;
    defaultY : number;
    inDestination : boolean;

    constructor(scene, x, y, public letter : string){
        super(scene, x, y);
        this.sprite = this.scene.add.image(0, 0, PRELOADED_KEYS["TILE-BG-OPEN"].key);
        this.add(this.sprite);
        this.setSize(this.sprite.width, this.sprite.height);
        this.text = this.scene.add.text(0, 0, this.letter, defaultText).setOrigin(.5);
        this.add(this.text);
        this.initInteractive();
        this.inDestination = false;
    }

    dragStart(){
        super.dragStart();
        //this.parentContainer.bringToTop(this);
        this.sprite.setTexture(PRELOADED_KEYS["TILE-BG-PRESSED"].key);
    }

    drop(){
        super.drop();
        this.sprite.setTexture(PRELOADED_KEYS["TILE-BG-OPEN"].key);
        // if (!this.inDestination) {
        //     this.moveToDefaultPosition();
        // }
    }

    inDestinationX;
    inDestinationY;
    dropOnTarget(dropZone : Phaser.GameObjects.Zone){
        super.dropOnTarget(dropZone);
        this.inDestination = true;
        this.inDestinationX = this.x;
        this.inDestinationY = this.y;
        this.x = dropZone.getCenter().x;
        this.y = dropZone.getCenter().y;

    }

    moveToDefaultPosition(){
        this.x = this.defaultX;
        this.y = this.defaultY;
    }

    setDefaultPosition(x : number, y : number){
        this.defaultX = x;
        this.defaultY = y;
        this.moveToDefaultPosition();
    }
}