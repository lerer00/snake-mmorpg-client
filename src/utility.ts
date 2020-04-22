export function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function intersectCircle(c1: PIXI.Circle, c2: PIXI.Circle): boolean {
    let dx: number = c1.x - c2.x;
    let dy: number = c1.y - c2.y;
    let d: number = Math.sqrt((dx * dx) + (dy * dy));

    if (d < c1.radius + c2.radius) {
        return true;
    }
    return false;
}

export function intersectRectangle(c: PIXI.Circle, r: PIXI.Rectangle): boolean {
    let x: number = c.x;
    let y: number = c.y;

    if (c.x < r.left) {
        x = r.left;
    } else if (c.x > r.left + r.width) {
        x = r.left + r.width;
    }
    if (c.y < r.top) {
        y = r.top;
    } else if (c.y > r.top + r.height) {
        y = r.top + r.height;
    }

    let dx: number = c.x - x;
    let dy: number = c.y - y;
    let d: number = Math.sqrt((dx * dx) + (dy * dy));

    if (d <= c.radius) {
        return true;
    }
    return false;
}

