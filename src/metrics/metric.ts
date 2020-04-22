import * as P from "pixi.js";
import PixiFps from "pixi-fps";
import { Ping } from "./ping";

export default class Metric {
    private _container: P.Container;

    public constructor() {
        const container: P.Container = new P.Container();
        container.x = 0;
        container.y = 0;
        this._container = container;
    }

    public toggleFps(): void {
        for (let element of this._container.children) {
            if (element instanceof PixiFps) {
                this._container.children = this._container.children.filter(this.isNotPixiFpsObject);
                console.log("[-] fps metric");
                return;
            }
        }

        console.log("[+] fps metric");
        var style: P.TextStyle = new P.TextStyle({ fontFamily: "Arial", fontSize: 24, fill: 0x808080, align: "left" });
        this._container.addChild(new PixiFps(style));
    }

    public togglePing(): void {
        for (let element of this._container.children) {
            if (element instanceof Ping) {
                this._container.children = this._container.children.filter(this.isNotPixiPingObject);
                console.log("[-] ping metric");
                return;
            }
        }

        console.log("[+] ping metric");
        this._container.addChild(new Ping());
    }

    public getContainer(): P.Container {
        return this._container;
    }

    private isNotPixiFpsObject(value: P.DisplayObject): boolean {
        return !(value instanceof PixiFps);
    }

    private isNotPixiPingObject(value: P.DisplayObject): boolean {
        return !(value instanceof Ping);
    }
}