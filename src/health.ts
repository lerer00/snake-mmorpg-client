import * as P from "pixi.js";

export default class Health {
    private _health: [number, number];
    private _bar: P.Container;

    public constructor() {
        this._health = [0, 0];
        this._bar = new P.Container();

        this.setVisual();
    }

    public update(health: [number, number], x: number, y: number): void {
        this._health = health;
        (this._bar.getChildByName("inner") as P.Graphics).width = (this._health[0] / this._health[1]) * 48;

        this._bar.x = x;
        this._bar.y = y;
    }

    public getHealth(): [number, number] {
        return this._health;
    }

    public getVisual(): P.Container {
        return this._bar;
    }

    private setVisual(): void {
        var outer: P.Graphics = new P.Graphics();
        outer.name = "outer";
        outer.lineStyle(1, 0x000000, 0.1);
        outer.drawRoundedRect(0,0,48,5,2);
        outer.endFill();

        var inner: P.Graphics = new P.Graphics();
        inner.name = "inner";
        inner.beginFill(0x00ff00, 0.3);
        inner.lineStyle(1, 0x00ff000, 0.2);
        inner.drawRoundedRect(1,0,47,5,2);
        inner.endFill();

        this._bar.addChild(outer);
        this._bar.addChild(inner);
    }
}