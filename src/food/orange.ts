import * as P from "pixi.js";
import Food from "./food";

export default class Orange extends Food {
    public constructor(p: P.Point, r: number) {
        super();

        let circle: P.Graphics = new PIXI.Graphics();
        circle.lineStyle(1, 0xfd5f00);
        circle.drawCircle(p.x, p.y, r);
        circle.endFill();

        let dot: P.Graphics = new PIXI.Graphics();
        dot.beginFill(0xfd5f00);
        dot.drawCircle(p.x, p.y, 1);
        dot.endFill();

        this.addChild(circle);
        this.addChild(dot);

        let hitArea: P.Circle = new P.Circle(p.x,p.y, r);
        this.addHitArea(hitArea);
    }
}