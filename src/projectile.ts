import * as P from "pixi.js";
import IPlaceholder from "./dto/placeholder";
import IProjectile from "./dto/projectile";

export default class Projectile implements IPlaceholder {
    private _app: P.Application;
    private _projectile: P.Container;
    public speed: number;
    public velocity: [number, number];
    public x: number;
    public y: number;

    public constructor(app: P.Application) {
        this._app = app;
        this._projectile = new P.Container();
        this.speed = 0;
        this.velocity = [0, 0];
        this.x = 0;
        this.y = 0;
    }

    public update(projectile: IProjectile): void {
        this._projectile.x = projectile.x;
        this._projectile.y = projectile.y;
    }

    public explode(): void {
        this._app.stage.removeChild(this._projectile);
    }

    public lauch(projectile: IProjectile): void {
        var container: P.Container = new P.Container();
        container.x = projectile.x;
        container.y = projectile.y;
        var circle: P.Graphics = new P.Graphics();
        circle.lineStyle(1, 0xff0000);
        circle.drawCircle(0, 0, projectile.radius);
        circle.endFill();
        container.addChild(circle);

        this._app.stage.addChild(container);
        this._projectile = container;
    }
}
