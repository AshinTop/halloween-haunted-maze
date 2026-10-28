# Ghostkeeper Maze 3D embedding

## Host mapping

Primary integration: `crazy3d.org`. Its current game-player component uses a desktop 16:9 frame, responsive mobile height with a 300 px minimum, and a host toolbar outside the game surface.

```html
<iframe
  src="https://ashintop.github.io/halloween-haunted-maze/"
  title="Ghostkeeper Maze 3D"
  width="960"
  height="540"
  allow="fullscreen"
  allowfullscreen
  style="display:block;width:100%;border:0"
></iframe>
```

The URL is the intended GitHub Pages deployment target. Confirm deployment before using it in the production catalog.

The game fills its own `100dvh` and uses relative asset paths, including when served from a GitHub Pages repository subpath. `?embed=1` is optional; compact adaptation is always active. No parent-page access, `postMessage`, pointer lock or WebGL permission is needed.

## Responsive targets

| Frame | Intended behavior |
| --- | --- |
| 960 × 540 | Wide perspective view with complete controls |
| 390 × 460 | Portrait view, compact header and navigation row |
| 390 × 300 | Short player view with map, guide, inventory and movement retained |
| 844 × 340 | Short landscape view with compact controls |

The journal is decorative context and hides on smaller frames. All required movement, restart, map, guide, level and help controls stay in the player. Dialogs have bounded height and can scroll locally. If the main site reserves 45–50 px for its own toolbar, subtract that from the iframe height rather than overlaying the toolbar on the game.

## Input and behavior

- W/A/S/D or arrow keys control movement and 90° turns.
- Four pointer buttons support taps and press-and-hold repeat.
- M toggles the full atlas; H asks the guide.
- Optional short sounds start only after an intentional user action.
- Page hiding stops held movement and suspends sound.
- The Canvas perspective world does not rely on a GPU WebGL context.
- Local storage is optional. It holds best completion records and preferences, not an unfinished location.

## Verification scope

Ten engine and projection tests cover the complete 12-level campaign, an independent shortest-route search, collision and inventory behavior, daily determinism, validation, ray intersections and perspective math. Browser layout acceptance and hosting checks are separate from these automated tests. Physical touch-device behavior and frame-rate performance should not be inferred from mathematical projection tests.
