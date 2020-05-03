import * as P from "pixi.js";
import Connexion from "./connexion";
import Metric from "./metrics/metric";
import Snake from "./snake";
import ISnake from "./dto/snake";
import Projectile from "./projectile";
import IProjectile from "./dto/projectile";


export default class Game {
    private _app: P.Application;
    private _snakes: { [id: string]: Snake };
    private _projectiles: { [id: string]: Projectile }

    public constructor(app: P.Application) {
        this._app = app;
        this._snakes = {};
        this._projectiles = {};
    }

    public start(): void {
        const metric: Metric = new Metric();
        metric.toggleFps();
        metric.togglePing();
        this._app.stage.addChild(metric.getContainer());

        Connexion.getInstance().handshake(this);
        Connexion.getInstance().listenSnakesMovements(this);
        Connexion.getInstance().listenProjectilesMovements(this);
        Connexion.getInstance().listenSweep(this);
        Connexion.getInstance().ping();
        Connexion.getInstance().pong();

        // pointer position is sent to server
        setInterval(this.sendPointerPosition.bind(this), 1000 / 30);

        // pointer mouse down event are sent when clicking on stage
        this._app.stage.on("mousedown", () => { this.handleMouseDown(); });
        var keyboardC: any = this.keyboard("c");
        keyboardC.press = () => {
            this.handleClear();
        }
    }

    public handleHandshake(): void {
        console.log("[~] Client connected");
    }

    public handleSnakesMovements(data: any): void {
        var snakes: ISnake[] = [].concat(data.others);
        if (data.me !== null) {
            snakes = snakes.concat(data.me);
        }

        snakes.forEach(snake => {
            if (snake.id in this._snakes) {
                this._snakes[snake.id].update(snake);
            } else {
                var hatchling: Snake = new Snake(this._app, snake.color);
                hatchling.hatch(snake.sections);
                this._snakes[snake.id] = hatchling;
            }
        });
    }

    public handleProjectilesMovements(data: any): void {
        var projectiles: IProjectile[] = data.projectiles;
        projectiles.forEach(projectile => {
            if (projectile.id in this._projectiles) {
                this._projectiles[projectile.id].update(projectile);
            } else {
                var newProjectile: Projectile = new Projectile(this._app);
                newProjectile.lauch(projectile);
                this._projectiles[projectile.id] = newProjectile;
            }
        });
    }

    public handleSweep(data: any): void {
        var projectiles: string[] = data.projectiles;
        projectiles.forEach(projectileId => {
            this._projectiles[projectileId].explode();
            delete this._projectiles[projectileId];
        });

        var snakes: string[] = data.snakes;
        snakes.forEach(snakeId => {
            this._snakes[snakeId].kill();
            delete this._snakes[snakeId];
        });
    }

    public handleMouseDown(): void {
        var socket: any = Connexion.getInstance().getSocket();
        socket.emit("shoot", { pointer: this._app.renderer.plugins.interaction.mouse.global });
    }

    public handleClear(): void {
        var socket: any = Connexion.getInstance().getSocket();
        socket.emit("clear", {});
    }

    public sendPointerPosition(): void {
        var socket: any = Connexion.getInstance().getSocket();
        socket.emit("chase", { pointer: this._app.renderer.plugins.interaction.mouse.global });
    }

    public keyboard(value: string): any {
        let key: any = {};
        key.value = value;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        key.downHandler = (event: { key: any; preventDefault: () => void; }) => {
            if (event.key === key.value) {
                if (key.isUp && key.press) { key.press(); }
                key.isDown = true;
                key.isUp = false;
                event.preventDefault();
            }
        };

        key.upHandler = (event: { key: any; preventDefault: () => void; }) => {
            if (event.key === key.value) {
                if (key.isDown && key.release) { key.release(); }
                key.isDown = false;
                key.isUp = true;
                event.preventDefault();
            }
        };

        const downListener: any = key.downHandler.bind(key);
        const upListener: any = key.upHandler.bind(key);

        window.addEventListener(
            "keydown", downListener, false
        );
        window.addEventListener(
            "keyup", upListener, false
        );

        key.unsubscribe = () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        };

        return key;
    }
}
