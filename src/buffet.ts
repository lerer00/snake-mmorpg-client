import * as P from "pixi.js";
import Food from "./food/food";
import Orange from "./food/orange";
import { getRandomNumber } from "./utility";

export default class Buffet {
    private _app: P.Application;
    private _buffet: Array<Food>;
    private _nextServe: number;

    public constructor(app: P.Application) {
        this._app = app;
        this._buffet = [];
        this._nextServe = 0;
    }

    public cook(): void {
        var orange: Orange = new Orange(new P.Point(getRandomNumber(this._app.screen.width), getRandomNumber(this._app.screen.height)), 10);
        this._app.stage.addChild(orange.getContainer());
        this._buffet.push(orange);
    }

    public serve(): void {
        // listen for frame updates
        this._app.ticker.add(() => {
            let currentEpoch: number = (new Date).getTime();
            if (currentEpoch > this._nextServe) {
                this.cook();
                this._nextServe = currentEpoch + 10000;
            }
        });
    }

    public eat(f: Food): void {
        this._app.stage.removeChild(f.getContainer());
        let index: number = this._buffet.lastIndexOf(f);
        this._buffet.splice(index, 1);
    }

    public getBuffet(): Array<Food> {
        return this._buffet;
    }
}
