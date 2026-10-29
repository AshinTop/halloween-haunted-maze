[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 👻 Ghostkeeper Maze 3D — Aventura tranquila no labirinto de Halloween

**Encontre três pequenos espíritos, peça um pouco de luar e leve todos para casa.** Ghostkeeper Maze 3D é um labirinto de Halloween em primeira pessoa criado para o [Crazy 3D](https://crazy3d.org/). Explore corredores de pedra, reúna três espíritos de lanterna e uma chave de latão, depois abra o portal lunar. Doze noites e um desafio diário oferecem exploração com mapa e guia amigável.

**[Jogar agora](https://halloween-haunted-maze.crazy3d.org/)** · [Coleção de Halloween](https://github.com/AshinTop/halloween-games) · [Guia de incorporação](EMBEDDING.md) · [Notas de design](DESIGN.md)

**Idiomas da documentação:** English, 简体中文, Español, Português (Brasil), 日本語. **Interface do jogo:** apenas inglês e chinês simplificado. Os demais idiomas do README não significam que os menus do jogo já foram traduzidos.

![Ghostkeeper Maze 3D com corredores de pedra em primeira pessoa, minimapa e controles de movimento](docs/images/gameplay.jpg)

## Um passeio noturno tranquilo 🎃

- **12 aventuras reproduzíveis**, de 7×7 a 15×15, mais um labirinto diário de 11×11.
- Paredes em perspectiva, objetos com profundidade, neblina, luar e brilho da lanterna.
- Mapa de exploração, atlas completo opcional e guia para os objetivos restantes.
- Metas de menor percurso, recordes locais, som opcional e movimento reduzido.
- Sem inimigos, perseguições, sustos repentinos, cronômetro ou vidas.

## Como levar todos para casa

Caminhe até cada lanterna de abóbora para resgatar seu espírito, pegue a chave e entre no portal lunar. São necessários **os três espíritos e a chave**. Chegar antes apenas mantém o portal fechado.

O movimento segue a grade. Entrar em uma casa aberta vizinha conta como um passo; girar 90 graus no lugar não conta. A meta de menor percurso inclui todos os itens e a saída, não apenas a distância até o portal.

| Noite | Grade com paredes externas | Meta de passos |
|---|---|---:|
| 1 | 7×7 | 16 |
| 2 / 3 / 4 | 9×9 | 32 / 34 / 40 |
| 5 / 6 / 7 | 11×11 | 60 / 54 / 48 |
| 8 / 9 / 10 | 13×13 | 94 / 76 / 84 |
| 11 / 12 | 15×15 | 102 / 104 |

## Controles

| Ação | Teclado | Toque / mouse |
|---|---|---|
| Avançar / recuar | W ou ↑ / S ou ↓ | Botões de frente e trás |
| Virar à esquerda / direita | A ou ← / D ou → | Botões de giro |
| Atlas | M | Mapa |
| Guia fantasma | H | Fantasma |
| Noite / reiniciar / compartilhar | Tab e Enter | Botões superiores |

Segure um botão de movimento para repetir. Não é necessário bloquear o ponteiro, arrastar ou usar teclado físico.

## Mapas, ajuda e recordes

O minimapa revela os corredores próximos. Abrir o atlas registra **um uso de ajuda** naquela aventura; reabrir não soma outro. Cada pedido ao guia conta mais uma ajuda e encontra uma rota legal até o item ausente mais próximo, depois até a saída. É orientação local, sem garantir a melhor ordem global de coleta. A rota desaparece após pegar um item.

Ajuda nunca impede a conclusão. Os recordes priorizam menos ajudas e depois menos passos. Um atalho assistido não substitui um recorde anterior sem ajuda. Noites concluídas e preferências ficam salvas; posições incompletas não são restauradas.

Compartilhe da [noite 1](https://halloween-haunted-maze.crazy3d.org/#night=1) à 12 ou uma [data diária exata](https://halloween-haunted-maze.crazy3d.org/#daily=2026-10-31). A geração diária usa UTC e mantém a data escolhida.

## Perguntas frequentes

**Todos os labirintos têm saída?** O gerador cria labirintos conectados. Os testes percorrem vitórias completas nas doze noites; o diário usa a mesma construção conectada.

**A visão 3D exige WebGL?** Ela usa um **raycaster de Canvas 2D**, com interseções de paredes e objetos verificados por profundidade.

**Posso explorar devagar?** Sim. Não há ameaça nem contagem regressiva, e as ajudas continuam disponíveis.

**Como funciona a acessibilidade?** Movimento reduzido remove interpolação da câmera e animações decorativas. Há texto, inventário e mensagens, mas o mundo Canvas não oferece navegação completa por leitor de tela.

## Imagens e vídeo

![Ghostkeeper Maze 3D compacto com visão do corredor, inventário e quatro controles](docs/images/mobile.jpg)

Interface real capturada em um iframe compacto no navegador. A imagem mostra a organização dos controles; não representa um teste de desempenho em um celular físico.

[Assista à apresentação de 24 segundos](https://halloween-haunted-maze.crazy3d.org/intro.html) · [Baixe o MP4 com legendas](docs/media/intro.mp4). O vídeo é silencioso e foi montado com capturas reais do jogo, não com uma partida gravada continuamente. As imagens registram a interface na data da captura e podem ser anteriores a melhorias visuais posteriores.

## Coloque o jogo no seu site

```html
<iframe src="https://halloween-haunted-maze.crazy3d.org/"
  title="Ghostkeeper Maze 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Os tamanhos previstos são 960×540, 390×460, 390×300 e 844×340 pixels CSS. Em quadros menores, o diário grande fica oculto, preservando cena, inventário, mapa, guia e movimento. Confira a altura real do iframe, principalmente em players baixos.

A versão on-line é publicada no Cloudflare a partir deste repositório do GitHub. Defina uma altura real para o iframe e reserve espaço para a barra do site principal. O site pode oferecer tela cheia. Consulte [EMBEDDING.md](EMBEDDING.md) para os detalhes.

## Executar e verificar localmente

```sh
python3 -m http.server 4173
```

Sirva a pasta raiz do repositório e abra [http://localhost:4173/](http://localhost:4173/). O jogo é estático, sem compilação ou instalação de dependências. Use HTTP(S), pois abrir por `file://` pode bloquear os módulos JavaScript. Os testes exigem Node.js.

```sh
npm test
```

Os **10 testes** cobrem labirintos conectados e fechados, itens distintos e alcançáveis, vitórias nas doze noites, metas verificadas por busca independente de inventário, colisões, portal, coleta, guia, datas, dados salvos, raios das paredes e perspectiva dos objetos.

O código do jogo não exige conta, API remota, SDK de anúncios nem CDN de arquivos externos. Os registros ficam no navegador, sem sincronização na nuvem. O Cloudflare pode adicionar scripts de hospedagem e registros de requisições. O áudio sintetizado opcional segue as permissões do navegador.

## Outras aventuras ao luar 🍬

- [Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-3d) — Lights Out espacial com lanternas conectadas.
- [Pumpkin Shift](https://halloween-pumpkin-shift.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-pumpkin-shift) — Quebra-cabeças deslizantes com Moon Glides.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-mirror-hearts) — Leve dois fantasmas espelhados de volta para casa.
- [Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/) · [Código](https://github.com/AshinTop/halloween-rhythm-parade) — Três músicas originais e quatro pistas de ritmo.

## Créditos e apoio

Criado para o **Midnight Candy Club de AshinTop**, com colaboração de IA orientada por pessoas em design, programação, documentação, testes e revisão. As ilustrações originais e os sons sintetizados foram feitos para este projeto. Veja as [notas de design](DESIGN.md).

Gostou desta pequena aventura? **[Deixe uma estrela para Ghostkeeper Maze 3D no GitHub](https://github.com/AshinTop/halloween-haunted-maze)** para guardar o projeto e acompanhar novidades. Ao relatar um problema, informe fase ou modo, navegador, tamanho da janela e passos para reproduzi-lo. Conheça a [coleção completa de Halloween](https://github.com/AshinTop/halloween-games).
