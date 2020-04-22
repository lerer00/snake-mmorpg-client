import io from "socket.io-client";
import Game from "./game";

export default class Connexion {
    private static _instance: Connexion;
    private _lastPingTimestamp: number;
    private _latency: number;
    private _socket: any;

    private constructor() {
        this._lastPingTimestamp = 0;
        this._latency = 0;
        this._socket = io("http://127.0.0.1:8000", { transports: ["websocket"] });
    }

    static getInstance(): Connexion {
        if (!Connexion._instance) {
            Connexion._instance = new Connexion();
        }
        return Connexion._instance;
    }

    public getSocket(): any {
        return this._socket;
    }

    public handshake(game: Game): void {
        this._socket.on("connect", () => {
            game.handleHandshake();
        });
    }

    public listenSnakesMovements(game: Game): void {
        this._socket.on("snakes_state", (data: any) => {
            game.handleSnakesMovements(data);
        });
    }

    public ping(): void {
        setInterval(() => {
            this._lastPingTimestamp = Date.now();
            this._socket.emit("pingz");
        }, 1000);
    }

    public pong(): void {
        this._socket.on("pongz", (data: any) => {
            this._latency = Date.now() - this._lastPingTimestamp;
        });
    }

    public getLatency(): number {
        return this._latency;
    }
}
