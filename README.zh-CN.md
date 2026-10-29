[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 👻 Ghostkeeper Maze 3D — 温柔的万圣节第一人称迷宫

**找到三只小精灵，借一点月光，把大家带回家。** Ghostkeeper Maze 3D 是为 [Crazy 3D](https://crazy3d.org/) 创作的第一人称万圣节迷宫游戏。在石墙走廊中探索，收集三只南瓜灯精灵和一把黄铜钥匙，再从月亮门离开。十二个夜晚和每日迷宫都可以慢慢走，地图与友善的幽灵向导会陪着你。

**[在线试玩](https://halloween-haunted-maze.crazy3d.org/)** · [万圣节游戏总合集](https://github.com/AshinTop/halloween-games) · [嵌入说明](EMBEDDING.md) · [设计说明](DESIGN.md)

**文档语言：** English、简体中文、Español、Português (Brasil)、日本語。**游戏界面目前仅支持英语和简体中文**；西班牙语、葡萄牙语和日语版本为完整说明文档，并非已实现的界面翻译。

![Ghostkeeper Maze 3D 万圣节冒险，展示第一人称石墙走廊、小地图和移动按钮](docs/images/gameplay.jpg)

## 一段安心的夜游 🎃

- **12 个可复现的冒险**，网格从 7×7 增至 15×15，另有按日期生成的 11×11 每日迷宫。
- 第一人称墙面、正确遮挡的精灵、远处薄雾、月光与提灯光晕。
- 随探索展开的小地图、可随时查看的完整地图和目标路线提示。
- 最短行走目标、本地通关记录、可关闭音效与减少动态效果。
- 没有敌人、追逐、突然惊吓、倒计时或生命值。

## 怎样把大家带回家

走到南瓜灯上即可救出精灵，拿到黄铜钥匙后，再进入月亮门。必须集齐**三只精灵和钥匙**。提前找到出口不会失败，只是门还关着。

移动按迷宫网格进行。走进相邻的可通行格计一步；原地转向 90 度不增加步数。最短行走目标计算的是收齐全部物品再到出口的完整路线，不只是到门口的距离。

| 夜晚 | 含边界墙的网格 | 目标步数 |
|---|---|---:|
| 1 | 7×7 | 16 |
| 2 / 3 / 4 | 9×9 | 32 / 34 / 40 |
| 5 / 6 / 7 | 11×11 | 60 / 54 / 48 |
| 8 / 9 / 10 | 13×13 | 94 / 76 / 84 |
| 11 / 12 | 15×15 | 102 / 104 |

## 操作

| 操作 | 键盘 | 触屏或鼠标 |
|---|---|---|
| 前进、后退 | W 或 ↑；S 或 ↓ | 前进、后退按钮 |
| 左转、右转 | A 或 ←；D 或 → | 转向按钮 |
| 打开完整地图 | M | 地图按钮 |
| 请求幽灵向导 | H | 幽灵按钮 |
| 选夜晚、重开、分享 | Tab 和 Enter | 顶栏按钮 |

按住屏幕移动按钮可以重复移动，不需要指针锁定、拖拽或实体键盘。

## 地图、提示与纪录

小地图会随着脚步揭示附近的走廊。首次打开完整地图为这次冒险记录**一次帮助使用**，重复打开不额外增加。每次请求幽灵向导会增加一次帮助，并找出通往最近未收集物品、最后通往出口的合法路线。它负责就近导航，不保证全局收集顺序最短。拿到一个物品后，路线提示会消失。

帮助不会阻止通关。最佳纪录优先比较帮助次数，再比较步数，因此一次借助提示的捷径不会覆盖已有的无帮助纪录。通关记录和偏好保存在本地，未完成的位置不会恢复。

可以分享[第 1 夜](https://halloween-haunted-maze.crazy3d.org/#night=1) 至第 12 夜，或[指定日期的每日迷宫](https://halloween-haunted-maze.crazy3d.org/#daily=2026-10-31)。每日生成使用 UTC，日期链接会保留所选那一天。

## 常见问题

**每个迷宫都能走通吗？** 生成器构建连通迷宫。测试逐步执行了十二个主线夜晚的完整通关路线；每日迷宫使用同样的连通构造。

**3D 画面需要 WebGL 吗？** 这里使用 **Canvas 2D 光线投射渲染**，计算墙面交点与精灵深度遮挡，不需要 WebGL。

**可以慢慢探索吗？** 可以。没有威胁或倒计时，地图和向导一直可用。

**无障碍支持到什么程度？** 减少动态效果会关闭平滑镜头插值与装饰运动。文字、物品数量和状态提示可辅助理解，但 Canvas 空间并不是完整的屏幕阅读器导航界面。

## 图文与视频

![Ghostkeeper Maze 3D 紧凑窗口，含走廊视角、收集栏和四个移动控件](docs/images/mobile.jpg)

截图来自真实浏览器中的紧凑 iframe，用于说明布局，不代表实体手机性能测试。

[观看 24 秒介绍视频](https://halloween-haunted-maze.crazy3d.org/intro.html) · [下载带字幕 MP4](docs/media/intro.mp4)。视频无声，由实际游戏截图编排而成，并非连续操作录像。截图和视频记录的是拍摄时的界面，可能早于后续视觉细节更新。

## 嵌入你的站点

```html
<iframe src="https://halloween-haunted-maze.crazy3d.org/"
  title="Ghostkeeper Maze 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

目标窗口为 960×540、390×460、390×300 和 844×340 CSS 像素。较小窗口会隐藏大型日志区，保留场景、收集栏、地图、提示和移动按钮。主站窗口较矮时，请按 iframe 的实际可用高度检查。

在线版本通过 GitHub 关联部署到 Cloudflare。请为 iframe 设置实际高度，并给主站工具栏留出空间；全屏入口可由主站提供。详细约定见 [EMBEDDING.md](EMBEDDING.md)。

## 本地运行与规则验证

```sh
python3 -m http.server 4173
```

在仓库根目录启动静态服务，再打开 [http://localhost:4173/](http://localhost:4173/)。游戏无需构建或安装依赖。请使用 HTTP(S)，直接双击 `file://` 页面可能阻止 ES 模块加载。运行测试需要 Node.js。

```sh
npm test
```

**10 项测试**覆盖连通且封闭的迷宫、可达且不重复的物品、十二夜逐动作通关、独立物品状态搜索核对的最短目标、碰撞、出口条件、拾取、向导、日期、存档、墙面射线交点和精灵透视。

游戏源码不依赖账号、远程 API、广告 SDK 或外部素材 CDN。记录保存在当前浏览器，不提供云端同步；Cloudflare 可能另外加入托管脚本与请求日志。可选合成音效遵循浏览器的声音权限。

## 下一段月光小冒险 🍬

- [Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/) · [源码](https://github.com/AshinTop/halloween-3d) — 带灵魂联动的 3D 熄灯谜题.
- [Pumpkin Shift](https://halloween-pumpkin-shift.crazy3d.org/) · [源码](https://github.com/AshinTop/halloween-pumpkin-shift) — 带月光滑行的数字滑块谜题.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [源码](https://github.com/AshinTop/halloween-mirror-hearts) — 让镜像移动的双幽灵一起到家.
- [Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/) · [源码](https://github.com/AshinTop/halloween-rhythm-parade) — 三首原创乐曲、四条节奏轨道.

## 制作说明与支持

为 **AshinTop 的 Midnight Candy Club** 创作，设计、编程、文案、测试与审查由人类指导的 AI 协作完成。原创插画和浏览器合成声音为本项目制作，创作意图可见 [设计说明](DESIGN.md)。

喜欢这段小冒险？欢迎 **[给 Ghostkeeper Maze 3D 点一颗 GitHub Star](https://github.com/AshinTop/halloween-haunted-maze)**，方便收藏并关注更新。反馈问题时，请附关卡或模式、浏览器、窗口大小和复现步骤。还可以逛逛 [完整万圣节合集](https://github.com/AshinTop/halloween-games)。
