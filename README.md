# Phaser Typescript Template

## Features

From Yandeu - Typescript, scaffold, Webpack configuration, etc.

### Library Submodule

Library submodule set up, with default text in `mainScene.ts`

### Preload Script

`npm run preload`

This gets the string keys of the items in the `/assets/` folder and creates a PRELOADED_KEYS object currently exported from

`./src/utils/dist/preloadedKeyObject.ts`

We can then use this to load all our assets in game much easier. 

#### Notes

Right now only supports pngs, and hasn't been fully developed for all types of assets.

#### TODO

- [ ] spritesheets
- [ ] texture atlas
- [ ] .mov / .mp4 etc.
- [ ] build out small parsing / loading tool, possibly for export / sharing
