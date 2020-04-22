import ISection from "./section";
import ISpatial from "./spatial";

export default interface ISnake extends ISpatial {
    status: number;
    id: string;
    username: string;
    color: string;
    sections: ISection[];
}