import { PRELOADED_KEYS } from './../../utils/dist/preloadedKeyObject';
export default class PreloadScene extends Phaser.Scene {
  constructor() {
  
    super({ key: 'PreloadScene' });
  }
  preload() {
    this.load.text('word-list', 'assets/data/three-letter-words.txt');
    Object.keys(PRELOADED_KEYS).forEach((e) => {
      this.load.image(PRELOADED_KEYS[e]['key'], PRELOADED_KEYS[e]['path']);
    })
  }
  create() {
    const words = this.cache.text.get('word-list');
    this.registry.set('word-list', words.split("\n"));
    this.scene.start('MainScene');
  }
}
