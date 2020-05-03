import * as P from "pixi.js";
import ISection from "./dto/section";
import ISnake from "./dto/snake";
import Health from "./health";

export default class Snake {
    private _app: P.Application;
    private _color: string;
    private _sections: { [guid: string]: P.Container };
    private _health: Health;

    public constructor(app: P.Application, color: string) {
        this._app = app;
        this._color = color;
        this._sections = {};
        this._health = new Health();
        this._app.stage.addChild(this._health.getVisual());
    }

    public update(snake: ISnake): void {
        // adjusting snake's health.
        var head: ISection = snake.sections.filter(s => s.isHead === true)[0];
        if (head !== undefined && head !== null) {
            this.health(snake.health, head.x, head.y);
        }

        var guids: string[] = Object.keys(this._sections);

        // section that were created.
        var sectionsToHatch: ISection[] = snake.sections.filter(s => !guids.includes(s.guid));
        this.hatch(sectionsToHatch);

        // section that were removed.
        var sectionsToShred: string[] = guids.filter(g => !snake.sections.map(s => s.guid).includes(g));
        this.shred(sectionsToShred);
    }

    public kill(): void {
        Object.keys(this._sections).forEach(s => {
            this._app.stage.removeChild(this._sections[s]);
        });
        this._app.stage.removeChild(this._health.getVisual());
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
        container.x = section.x;
        container.y = section.y;
        var circle: P.Graphics = new P.Graphics();
        circle.lineStyle(1, parseInt(this._color, 16));
        circle.drawCircle(0, 0, section.radius);
        circle.endFill();
        container.addChild(circle);

        this._app.stage.addChild(container);

        return container;
    }

    private health(health: [number, number], x: number, y: number): void {
        this._health.update(health, x - 24, y + 14);
    }
}
