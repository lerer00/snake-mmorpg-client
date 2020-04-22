import * as P from "pixi.js";
import Snake from "./snake";
import Buffet from "./buffet";
import { intersectCircle } from "./utility";

// this is a simple collision detection, things could be improved here...
export default class Collision {
    private _app: P.Application;
    private _snake: Snake;
    private _buffet: Buffet;

    public constructor(app: P.Application, snake: Snake, buffet: Buffet) {
        this._app = app;
        this._snake = snake;
        this._buffet = buffet;
    }

    public start(): void {
        // listen for frame updates
        this._app.ticker.add(() => {
            this.check();
        });
    }

    public check(): void {
        // let headHitArea: P.Circle = this._snake.getHeadHitArea();
        //     for (let f of this._buffet.getBuffet()) {
        //         let foodHitArea: P.Circle = f.getHitArea() as P.Circle;
        //         if (intersectCircle(foodHitArea, headHitArea)) {
        //             this._snake.eat();
        //             this._buffet.eat(f);
        //         }
        //     }
    }
}
