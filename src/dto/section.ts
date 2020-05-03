import IPlaceholder from "./placeholder";

export default interface ISection extends IPlaceholder {
    guid: string;
    isHead: boolean;
    radius: number;
}