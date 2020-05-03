import React from "react";
import Game from "./game";
import * as P from "pixi.js";
import "./App.css";

window.addEventListener("DOMContentLoaded", initGame);


function initGame(): void {
  const app: any = init();
  window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  const game: Game = new Game(app);
  game.start();
}

function init(): P.Application {
  removeExistingGame();
  const app: P.Application = new P.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
  app.stage = new PIXI.Container();
  app.stage.interactive = true;
  app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);
  document.body.appendChild(app.view);
  return app;
}

function removeExistingGame(): void {
  const els: HTMLCollection = document.body.children;
  if (els.length > 0) {
    document.body.removeChild(els.item(0) as Node);
  }
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(function accept(): void {
    initGame();
  });
}

function App() {
  return (
    <div className="App">
      <body></body>
    </div>
  );
}

export default App;
