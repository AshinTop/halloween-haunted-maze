[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 👻 Ghostkeeper Maze 3D — Cozy Halloween Maze Adventure

**Find three little spirits, borrow some moonlight, and bring everybody home.** Ghostkeeper Maze 3D is a first-person Halloween maze game created for [Crazy 3D](https://crazy3d.org/). Explore stone corridors, gather three pumpkin lantern spirits and a brass key, then open the moon gate. Twelve nights and a daily maze offer quiet exploration with a map and a friendly ghost guide.

**[Play online](https://halloween-haunted-maze.crazy3d.org/)** · [All Halloween games](https://github.com/AshinTop/halloween-games) · [Embedding guide](EMBEDDING.md) · [Design notes](DESIGN.md)

**Document languages:** English, 简体中文, Español, Português (Brasil), 日本語. **Game interface:** English and Simplified Chinese only; the other README languages do not add in-game translations.

![Ghostkeeper Maze 3D Halloween adventure with first-person stone corridors, a minimap and movement buttons](docs/images/gameplay.jpg)

## A peaceful night out 🎃

- **12 reproducible adventures**, from 7×7 to 15×15 grids, plus a date-based 11×11 daily maze.
- First-person walls, depth-tested sprites, distance fog, moonlight, and a lantern glow.
- An exploration map, optional full atlas, and a guide to remaining objectives.
- Shortest-walk targets, local completion records, optional sound, and reduced-motion support.
- No enemies, chase scenes, jump scares, timer, or lives.

## How to bring everyone home

Walk onto each pumpkin lantern to rescue its spirit, collect the brass key, and enter the moon gate. All **three spirits and the key** are required. Finding the gate early simply leaves it closed.

Movement follows the maze grid. Walking to an adjacent open cell counts as one step; turning 90 degrees in place does not. The shortest-walk target includes every collectible and the exit, not just the shortest path to the gate.

| Night | Grid including border walls | Target steps |
|---|---|---:|
| 1 | 7×7 | 16 |
| 2 / 3 / 4 | 9×9 | 32 / 34 / 40 |
| 5 / 6 / 7 | 11×11 | 60 / 54 / 48 |
| 8 / 9 / 10 | 13×13 | 94 / 76 / 84 |
| 11 / 12 | 15×15 | 102 / 104 |

## Controls

| Action | Keyboard | Touch / mouse |
|---|---|---|
| Forward / backward | W or ↑ / S or ↓ | Forward / back buttons |
| Turn left / right | A or ← / D or → | Turn buttons |
| Open the atlas | M | Map |
| Ask the ghost guide | H | Ghost |
| Select night / restart / share | Tab and Enter | Header buttons |

Hold an on-screen movement button to repeat it. No pointer lock, dragging, or physical keyboard is required.

## Maps, guidance, and records

The small map reveals nearby corridors as you explore. Opening the full atlas records **one help use** for that adventure; reopening it adds none. Each ghost-guide request adds one help use and finds a legal route to the nearest missing item, then the exit. It is a local navigation aid, not a promise of the globally shortest collection order. The route disappears after a pickup.

Help never blocks completion. Best records prefer fewer help uses first, then fewer steps. An assisted shortcut therefore cannot overwrite an existing unassisted record. Completed-night records and preferences are saved locally; unfinished positions are not restored.

Share [night 1](https://halloween-haunted-maze.crazy3d.org/#night=1) through night 12, or an [exact daily date](https://halloween-haunted-maze.crazy3d.org/#daily=2026-10-31). Daily generation uses UTC and preserves the chosen date.

## FAQ

**Are the mazes finishable?** The generator creates connected mazes. Tests execute full winning routes for all twelve campaign nights; the daily uses the same connected construction.

**Does the 3D view need WebGL?** The perspective scene uses a **Canvas 2D raycaster**. It projects wall intersections and depth-tested sprites without requiring WebGL.

**Can I explore slowly?** Yes. There is no threat or countdown, and the atlas and guide remain available.

**What about accessibility?** Reduced motion removes camera interpolation and decorative movement. Text, inventory counts, and status messages help, but the visual Canvas world is not a complete screen-reader navigation interface.

## See the game

![Ghostkeeper Maze 3D compact player with corridor view, inventory and four movement controls](docs/images/mobile.jpg)

Actual game interface in a compact browser iframe. This illustrates the layout; it is not a physical-phone performance test.

[Watch the 24-second introduction](https://halloween-haunted-maze.crazy3d.org/intro.html) · [Download the captioned MP4](docs/media/intro.mp4). This silent visual tour is assembled from actual game screenshots, not a continuous gameplay recording. The screenshots and video show captured interface states and may predate later visual refinements.

## Embed it on your site

```html
<iframe src="https://halloween-haunted-maze.crazy3d.org/"
  title="Ghostkeeper Maze 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Intended windows include 960×540, 390×460, 390×300 and 844×340 CSS pixels. Smaller frames hide the large journal while retaining the scene, inventory, map, guide and movement buttons. Check the actual iframe height, especially in short host players.

The live site uses Cloudflare and is deployed from this GitHub repository. Give the iframe a real height and leave space for the host toolbar. Fullscreen may be provided by the host. See [EMBEDDING.md](EMBEDDING.md) for the integration contract.

## Run locally and check the rules

```sh
python3 -m http.server 4173
```

Serve the repository root, then open [http://localhost:4173/](http://localhost:4173/). The game is static: no build or dependency installation is needed. Use HTTP(S), because direct `file://` access can block ES modules. Node.js is required for the tests.

```sh
npm test
```

The **10 tests** cover connected sealed mazes, reachable distinct items, full action-by-action wins for all twelve nights, targets checked by an independent inventory-state search, collisions, gate rules, pickups, guidance, dates, saved data, ray intersections, and sprite perspective.

The game source does not require an account, remote API, advertising SDK, or external asset CDN. Records stay in browser storage; there is no cloud sync. Cloudflare may add its own hosting scripts and request logs. Optional synthesized audio follows browser sound permissions.

## More moonlit adventures 🍬

- [Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-3d) — Spatial Lights Out with linked lanterns.
- [Pumpkin Shift](https://halloween-pumpkin-shift.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-pumpkin-shift) — Number-sliding rooms with Moon Glides.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-mirror-hearts) — Bring two mirrored ghosts home together.
- [Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-rhythm-parade) — Three original songs, four rhythm lanes.

## Credits and a little support

Created for **AshinTop’s Midnight Candy Club** through human-directed AI collaboration in design, programming, writing, testing, and review. The original artwork and synthesized sounds were made for this project. [Design notes](DESIGN.md) explain its intent.

Enjoyed this little adventure? **[Star Ghostkeeper Maze 3D on GitHub](https://github.com/AshinTop/halloween-haunted-maze)** to save it for later and follow updates. Useful issue reports include the game mode or level, browser, window size, and steps that reproduce the problem. Explore the [complete Halloween collection](https://github.com/AshinTop/halloween-games).
