import * as P from "pixi.js";
import ISection from "./dto/section";

export default class Snake {
    private _app: P.Application;
    private _color: string;
    private _sections: { [guid: string]: P.Container };

    public constructor(app: P.Application, color: string) {
        this._app = app;
        this._color = color;
        this._sections = {};
    }

    public update(sections: ISection[]): void {
        var guids: string[] = Object.keys(this._sections);

        // section that were created.
        var sectionsToHatch: ISection[] = sections.filter(s => !guids.includes(s.guid));
        this.hatch(sectionsToHatch);

        // section that were removed.
        var sectionsToShred: string[] = guids.filter(g => !sections.map(s => s.guid).includes(g));
        this.shred(sectionsToShred);
    }

    public hatch(sections: ISection[]): void {
        for (var i: number = 0; i < sections.length; i++) {
            var section: P.Container = this.grow(sections[i]);

            // adding the section to the whole snake
            this._sections[sections[i].guid] = section;
        }
    }

    public shred(guids: string[]): void {
        for (var i: number = 0; i < guids.length; i++) {
            // removing section from the whole snake
            this._sections[guids[i]].destroy();
            delete this._sections[guids[i]];
        }
    }

    private grow(section: ISection): P.Container {
        var container: P.Container = new P.Container();
        container.hitArea = new P.Circle(0, 0, section.radius);
        var circle: P.Graphics = new P.Graphics();
        circle.lineStyle(1, parseInt(this._color, 16));
        circle.drawCircle(section.x, section.y, section.radius);
        circle.endFill();
        container.addChild(circle);

        this._app.stage.addChild(container);

        return container;
    }

    // public grow(): void {
    //     let section: P.Container = new P.Container();
    //     let circle: P.Graphics = new PIXI.Graphics();
    //     circle.lineStyle(1, 0xff0000);
    //     circle.drawCircle(this._snake[this._snake.length - 1].x, this._snake[this._snake.length - 1].y, 15);
    //     circle.endFill();

    //     // adding it to the stage
    //     section.addChild(circle);
    //     section.hitArea = new P.Circle(0, 0, 15);
    //     section.x = this._snake[this._snake.length - 1].x;
    //     section.y = this._snake[this._snake.length - 1].y;
    //     this._app.stage.addChild(section);

    //     // adding the section to the whole snake
    //     this._snake.push(section);
    // }

    // public eat(): void {
    //     this.grow();
    // }

    // public moveTo(p: P.Point): void {
    //     let tail: P.Container = this._snake[this._snake.length - 1];

    //     // removing tail from snake
    //     this._snake.splice(-1);
    //     this._app.stage.removeChild(tail);

    //     // adding his new head in front of his old one
    //     let section: P.Container = new P.Container();
    //     let circle: P.Graphics = new PIXI.Graphics();
    //     circle.lineStyle(1, 0xff0000);
    //     circle.drawCircle(0, 0, 15);
    //     circle.endFill();

    //     // adding it to the stage
    //     section.addChild(circle);
    //     section.hitArea = new P.Circle(this._snake[0].x + p.x, this._snake[0].y + p.y, 15);
    //     section.x = this._snake[0].x + p.x;
    //     section.y = this._snake[0].y + p.y;
    //     this._app.stage.addChild(section);

    //     // adding the section to the whole snake
    //     this._snake.unshift(section);
    // }

    // public getHeadHitArea(): P.Circle {
    //     return this._snake[0].hitArea as P.Circle;
    // }
}
