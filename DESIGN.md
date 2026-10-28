# Ghostkeeper Maze 3D — design notes

This is a peaceful first-person exploration game. A lantern keeper finds three lost spirits and a brass key before leading everyone through a moon gate. Stone textures, distant fog, soft moonlight and friendly original ghost art provide a Halloween setting without chase pressure.

## Play loop

Explore → collect → learn the corridors → find the gate → bring everyone home → replay for a shorter or less assisted walk. Twelve fixed seeds form the campaign. The daily maze uses a UTC date as its deterministic seed, so a shared dated link remains reproducible.

Traditional maze navigation gains a four-objective route-planning layer. The shortest route is not necessarily the route straight to the exit. Each objective is placed in a different part of the connected maze; the exact shortest walk accounts for all four pickups and the exit. Original guide and atlas mechanics reduce frustration without limiting access or charging the player.

## Technical structure

- `core.js`: deterministic depth-first maze carving, breadth-first paths, collectible state, legal movement, exact route optimization, hints, URL and storage validation.
- `renderer.js`: Canvas 2D first-person raycasting, procedural stone textures, wall depth buffering, projected original sprites, camera movement, fog and maps.
- `app.js`: touch/keyboard controls, repeated movement, localization, dialogs, records, optional sound and frame sizing.

The campaign shortest-route values are independently checked against a breadth-first search over `(cell, inventory mask)`, rather than merely retesting the route optimizer. Every campaign witness is executed through the same action rules used in play.

The renderer does not require WebGL. The full atlas is an intentional assistance mode, separate from the perspective world. Reduced-motion mode snaps the camera to its destination. The game uses no server, accounts, imported assets, analytics or runtime CDN.
