    import ISpatial from "./spatial";

export default interface IProjectile extends ISpatial {
    status: number;
    id: string;
    owner: string;
    x: number;
    y: number;
}