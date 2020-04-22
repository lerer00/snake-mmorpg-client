import * as P from "pixi.js";
import Connexion from "../connexion";

export class Ping extends P.Container {
    private _container: P.Container;

    public constructor() {
        super();
        this._container = new P.Container();
        this._container.x = 0;
        this._container.y = 30;
        this._container.addChild(new P.Text("-ms", { fontFamily: "Arial", fontSize: 24, fill: 0x808080, align: "left" }));
        this.addChild(this._container);

        setInterval(this.setLatency.bind(this), 1000);
    }

    public setLatency(): void {
        var latency: number = Connexion.getInstance().getLatency();
        var child: P.Text = this._container.getChildAt(0);
        if (latency !== undefined) {
            child.text = latency + "ms";
        }
    }
}
