import ISection from "./section";
import ISpatial from "./spatial";
import IHealth from "./health";

export default interface ISnake extends IHealth, ISpatial {
    status: number;
    health: [number, number];
    id: string;
    username: string;
    color: string;
    sections: ISection[];
}