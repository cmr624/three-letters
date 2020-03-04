import { PRELOADED_KEYS } from '../../utils/dist/preloadedKeyObject';

import { defaultText } from './../cm-phaser-library/src/objects/textStyles';
import DraggableManager from '../cm-phaser-library/src/managers/draggableManager';
import { LetterTile } from '../objects/letterTile';
import { ThreeLetterWordBank } from '../objects/wordGraph';
export default class MainScene extends Phaser.Scene {

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    new DraggableManager(this);
    

    let zone = this.add.zone(500, 200, 150, 150).setRectangleDropZone(150, 150);
    let tiles = this.createTiles();

    let bank = new ThreeLetterWordBank(this);
    bank.generatePuzzle();
  }

  update() {
    
  }

  createTiles(){
    let tiles = this.add.container(200, 800);
    for (let i = 0; i < 26; i++) {
      tiles.add(new LetterTile(this, 0, 0, String.fromCharCode(65+i)));
    }
    Phaser.Actions.GridAlign(tiles.getAll(), {
      width: 10,
      height: 10,
      cellWidth: 150,
      cellHeight: 150,
      x: 0,
      y: 0
    })
    let arr : Array<LetterTile> = tiles.getAll() as Array<LetterTile>;
    arr.forEach((e) => {
      e.setDefaultPosition(e.x, e.y);
    })
    return tiles;
  }
}
