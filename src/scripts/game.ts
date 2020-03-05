import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 375 * 2
const DEFAULT_HEIGHT = 667 * 2

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
