import { PRELOADED_KEYS } from '../../utils/dist/preloadedKeyObject';

import { defaultText } from './../cm-phaser-library/src/objects/textStyles';
import DraggableManager from '../cm-phaser-library/src/managers/draggableManager';
import { LetterTile } from '../objects/letterTile';
import { ThreeLetterWordBank, PuzzleData } from '../objects/wordGraph';
import {RegularPuzzleTile} from '../objects/puzzleTile';

export default class MainScene extends Phaser.Scene {

  HEIGHT : number;
  WIDTH : number;
  constructor() {
    super({ key: 'MainScene' });


  }

  create() {
    this.HEIGHT = this.game.scale.height;
    this.WIDTH = this.game.scale.width;
    new DraggableManager(this);
    let bank = new ThreeLetterWordBank(this);
    let puzzle : PuzzleData = bank.generatePuzzle(); 
    this.buildBoard();
    let tiles = this.createTiles(puzzle.lettersBank);
  }

  update() {
    
  }

  buildBoard(){

    for (let i = 0; i < 3; i++) {
      new RegularPuzzleTile(this, (i * 50) + 32, 180);
      // console.log((i * 50) + 40);
    }
    for (let i = 0; i < 3; i++) {
      new RegularPuzzleTile(this, 132 + (i * 50), 240);
      // console.log((i * 50) + 150);

    }
    for (let i = 0; i < 3; i++) {
      new RegularPuzzleTile(this, 242 + (i * 50), 300);
    }


  }

  createTiles(array : Array<string>){
    let tiles = new Array<LetterTile>();
    for (let i = 0; i < array.length; i++) {
      tiles.push(new LetterTile(this, 0, 0, array[i].toUpperCase()));
    }

    Phaser.Actions.GridAlign(tiles, {
      width: 7,
      height: 1,
      cellWidth: this.WIDTH/ 7,
      cellHeight: this.HEIGHT / 7,
      x: tiles[0].width / 2,
      y: this.HEIGHT * .75,
    })
    
    tiles.forEach((e) => {
      e.setDefaultPosition(e.x, e.y);
    })
    return tiles;
  }
}
