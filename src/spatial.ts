export default class Spatial {
    private _speed: number;
    private _velocity: [number, number];

    public constructor() {
        this._speed = 5;
        this._velocity = [0.1, 0.1];
    }

    public getSpeed(): number {
        return this._speed;
    }

    public setSpeed(s: number): void {
        this._speed = s;
    }

    public getVelocity(): [number, number] {
        return this._velocity;
    }

    public getVelocityX(): number {
        return this._velocity[0];
    }

    public getVelocityY(): number {
        return this._velocity[1];
    }

    public setVelocityX(v: number): void {
        this._velocity[0] = v;
    }

    public setVelocityY(v: number): void {
        this._velocity[1] = v;
    }

    public setVelocity(v: [number, number]): void {
        this._velocity = v;
    }
}
