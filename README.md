# Halloween Maze Game — Ghostkeeper Maze 3D

**Find three little spirits, borrow a little moonlight, and bring everybody home.**

Ghostkeeper Maze 3D is a cozy first-person Halloween maze game for desktop and mobile browsers. Explore stone corridors, collect three pumpkin lantern spirits and a brass key, then return everyone through the moon gate. Twelve adventures and a date-based daily maze offer a peaceful exploration challenge, with an optional atlas and a friendly ghost guide whenever you need them.

Part of **Midnight Candy Club**, created for the Halloween collection at [crazy3d.org](https://crazy3d.org).

**[GitHub Pages deployment target](https://ashintop.github.io/halloween-haunted-maze/)** · **[Watch the visual introduction](docs/media/intro.mp4)** · **[Embedding guide](EMBEDDING.md)**

**Deployment status:** GitHub Pages is not live yet. The `ashintop.github.io` links in this document are intended deployment addresses. Use the local-run instructions until the hosted game has been published and verified.

[Video player and transcript (deployment target)](https://ashintop.github.io/halloween-haunted-maze/intro.html) · [Captioned MP4 file](docs/media/intro.mp4). The 24-second silent introduction uses actual game screenshots; it is not a live gameplay recording.

![Ghostkeeper Maze 3D Halloween browser game with moonlit stone corridors, a minimap, and touch movement controls](docs/images/gameplay.jpg)

## A peaceful Halloween adventure

- **12 reproducible maze adventures**, growing from a 7 × 7 courtyard to 15 × 15 corridors.
- **Real first-person perspective**, including depth-tested sprites, textured walls, distance fog, moonlight, and a hand-held lantern glow.
- **Three lost lantern spirits plus one brass key** to find before the moon gate opens.
- **A map that unfolds as you explore**, with a full atlas available on demand.
- **A friendly ghost guide** that finds an actual route to the nearest remaining collectible, then the exit.
- **No enemies, chase scenes, timer, or lives.** Explore at your own pace.
- **A shortest-walk target** for each maze, computed from the complete collectible-and-exit route.
- **Daily mazes by UTC date**, with links that preserve the chosen date.
- **Touch, mouse and keyboard controls**, English and Simplified Chinese, optional sound, local completion records, and reduced-motion support.
- **Self-contained static hosting** with no runtime dependencies, account, external textures, or CDN requests.

### The 12-night journey

| Night | Adventure | Grid | Shortest walk |
| ---: | --- | --- | ---: |
| 1 | A Candle at the Gate | 7 × 7 | 16 steps |
| 2 | The Ivy Courtyard | 9 × 9 | 32 steps |
| 3 | A Very Shy Ghost | 9 × 9 | 34 steps |
| 4 | The Copper Passage | 9 × 9 | 40 steps |
| 5 | Whispers in the Walls | 11 × 11 | 60 steps |
| 6 | The Violet Stair | 11 × 11 | 54 steps |
| 7 | Three Little Promises | 11 × 11 | 48 steps |
| 8 | The Forgotten Garden | 13 × 13 | 94 steps |
| 9 | Velvet & Moonlight | 13 × 13 | 76 steps |
| 10 | The Lantern Keeper | 13 × 13 | 84 steps |
| 11 | A Door Before Dawn | 15 × 15 | 102 steps |
| 12 | Everybody Home | 15 × 15 | 104 steps |

Grid sizes include the surrounding walls. A step means movement into an adjacent walkable cell; turning in place does not add a step. Every listed route collects all three spirits and the key before entering the exit.

## How to play

1. Follow the corridor from the starting gate.
2. Walk onto each pumpkin lantern to rescue its little ghost. The inventory lights up as you find them.
3. Pick up the floating brass key.
4. Once all three spirits and the key are with you, enter the moon gate to complete the night.
5. Replay for a shorter walk, choose another night, or try the daily maze.

The gate stays closed until all four objectives are complete. Reaching it early does not lose the game.

### Controls

| Action | Keyboard | Touch / mouse |
| --- | --- | --- |
| Move forward | **W / ↑** | Forward button |
| Step backward | **S / ↓** | Back button |
| Turn left, 90° | **A / ←** | Left-turn button |
| Turn right, 90° | **D / →** | Right-turn button |
| Full atlas | **M** | Map button |
| Ghost guidance | **H** | Ghost button |
| Level selection, restart, help, share | Standard button navigation | Header buttons |

Hold a movement button to repeat it. The game does not require pointer lock, dragging, or a physical keyboard.

## Maps, hints, and records

The small exploration map reveals nearby corridors as you walk. Opening the full atlas records one use of help for that adventure; reopening it does not add another. Each request for the ghost guide adds a help use and reveals a legal route toward the nearest missing objective. The guide disappears when you pick up a collectible.

Help never prevents completion. Local records prefer fewer help uses and then fewer steps, so a later assisted shortcut does not replace an existing unassisted record. Language, sound preference, completed nights and best walks are saved in the current browser. Storage can be unavailable without blocking play; unfinished positions are not restored after navigation.

## How the 3D view works

This game uses a **Canvas 2D raycaster**. Rays travel through the maze grid to find wall intersections; wall height and texture position are projected according to distance. Collectibles use camera-space projection and a depth buffer so walls correctly hide objects behind them.

It is a first-person perspective renderer, **not a WebGL engine**. It is designed to work without GPU WebGL availability and does not reuse a static screenshot or a flat overhead board as the 3D view. The optional atlas is a separate navigation aid.

## Run locally and test

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. Use HTTP rather than opening `index.html` as a local file, because the game loads ES modules. There are no dependencies to install and no build step.

```sh
npm test
```

The **10 focused tests** cover connectivity and sealed walls, distinct reachable collectibles, complete action-by-action wins for all 12 mazes, shortest-walk values checked by an independent inventory-state breadth-first search, collisions, gate rules, repeated pickups, guide completion, daily reproducibility, invalid links, saved-data validation, wall-ray intersections, and sprite perspective.

## Compact-player walkthrough

![Ghostkeeper Maze 3D in a compact host iframe, with a first-person corridor, inventory and movement buttons](docs/images/mobile.jpg)

Use the four movement buttons to walk and turn. Check the inventory for three lantern spirits and a key; the gate opens only when all four objectives are complete. The map and ghost guide can help when the first-person corridor looks unfamiliar.

*Actual interface captured in a browser iframe sized for the host player. This is a compact-window illustration, not a physical-phone test.*

## Embedding and accessibility

The actual iframe viewport drives the layout. Intended host sizes include **960 × 540**, **390 × 460**, **390 × 300**, and **844 × 340** CSS pixels. The large journal hides in smaller frames while the scene, inventory, map, hint, and four movement buttons remain accessible. See [EMBEDDING.md](EMBEDDING.md).

```html
<iframe src="https://ashintop.github.io/halloween-haunted-maze/"
  title="Ghostkeeper Maze 3D" width="960" height="540"
  allow="fullscreen" allowfullscreen
  style="display:block;width:100%;border:0"></iframe>
```

Reduced-motion mode removes smooth camera interpolation and decorative motion. High-level text, inventory counts and status messages accompany the scene. The game is a visual spatial puzzle; the Canvas world is not represented as a full screen-reader navigation interface.

## Frequently asked questions

**Is the maze scary?**  
The atmosphere is moonlit and mysterious, with friendly ghosts. There are no enemies, jump scares, or chase mechanics.

**Are all levels finishable?**  
Yes. The generator makes connected mazes, and tests execute a complete winning action sequence for each campaign level. The daily maze uses the same connected construction.

**Do I need WebGL?**  
No. The perspective renderer uses Canvas 2D raycasting.

**Does the daily maze change when I share it?**  
No. A link such as `#daily=2026-10-31` keeps that date. Campaign links use `#night=1` through `#night=12`.

## Creation credits

Created for Ashin's Midnight Candy Club with AI-assisted game design, programming, documentation, testing, and review. Stone textures, ghost and lantern artwork, the perspective renderer, and short synthesized sounds were developed in code for this project. Screenshots and the captioned visual introduction use the actual interface; they do not imply a physical-device performance benchmark.

## More from Midnight Candy Club

- [Ghost Lanterns 3D](https://github.com/AshinTop/halloween-3d) — a three-dimensional Lights Out garden with linked-soul lanterns.
- [Pumpkin Shift](https://github.com/AshinTop/halloween-pumpkin-shift) — slide numbered tiles through a Halloween puzzle journey.
- [Moonlit Mirrors](https://github.com/AshinTop/halloween-mirror-hearts) — solve two mirrored ghost paths together.
- [Midnight Rhythm Parade](https://github.com/AshinTop/halloween-rhythm-parade) — play three original Halloween songs with four little monsters.

If this little maze brightened your night, **[star the repository](https://github.com/AshinTop/halloween-haunted-maze)**. It helps you find the project again and supports future improvements. Reports with a level number, device, browser and reproduction steps are especially helpful.
