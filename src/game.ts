import * as P from "pixi.js";
import Connexion from "./connexion";
import Metric from "./metrics/metric";
import Snake from "./snake";
import ISnake from "./dto/snake";


export default class Game {
    private _app: P.Application;
    private _den: { [id: string]: Snake };

    public constructor(app: P.Application) {
        this._app = app;
        this._den = {};

        // this.loadSpritesheets();
    }

    public start(): void {
        const metric: Metric = new Metric();
        metric.toggleFps();
        metric.togglePing();
        this._app.stage.addChild(metric.getContainer());

        Connexion.getInstance().handshake(this);
        Connexion.getInstance().listenSnakesMovements(this);
        Connexion.getInstance().ping();
        Connexion.getInstance().pong();

        setInterval(this.sendPointerPosition.bind(this), 1000 / 30);
    }

    public handleHandshake(): void {
        console.log("[~] Client connected");
    }

    public handleSnakesMovements(data: any): void {
        var den: ISnake[] = [].concat(data.me).concat(data.others);
        den.forEach(snake => {
            if (snake.id in this._den) {
                this._den[snake.id].update(snake.sections);
            } else {
                var hatchling: Snake = new Snake(this._app, snake.color);
                hatchling.hatch(snake.sections);
                this._den[snake.id] = hatchling;
            }
        });
    }

    public sendPointerPosition(): void {
        var socket: any = Connexion.getInstance().getSocket();
        socket.emit("chase", { pointer: this._app.renderer.plugins.interaction.mouse.global });
    }

    // public loadSpritesheets(): void {
    //     PIXI.loaders.shared.add("./assets/explosions/explosions.json").load(this.setup);
    // }

    // public setup(): void {
    //     let sheet: P.Spritesheet = PIXI.loaders.shared.resources["./assets/explosions/explosions.json"].spritesheet;
    //     let sprite: P.Sprite = new PIXI.Sprite(sheet.textures["bullet_2_blue.png"]);
    // }
}
