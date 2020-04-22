import * as P from "pixi.js";
import Spatial from "../spatial";

export default class Food extends Spatial {
    private _container: P.Container;

    public constructor() {
        super();

        this._container = new PIXI.Container();
    }

    public getContainer(): P.Container {
        return this._container;
    }

    public addChild(g: PIXI.Graphics): void {
        this._container.addChild(g);
    }

    public addHitArea(c: P.Circle | P.Rectangle | P.Ellipse | P.Polygon | P.RoundedRectangle | P.HitArea){
        this._container.hitArea = c;
    }

    public getHitArea(): P.Circle | P.Rectangle | P.Ellipse | P.Polygon | P.RoundedRectangle | P.HitArea {
        return this._container.hitArea;
    }
}
