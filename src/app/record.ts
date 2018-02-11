export class Record {
    id: string;
    name: string;
    gear: Gear;
    chiefComplaint: string;
}

export enum Gear {
    Ski = "ski", Snowboard = "snowboard", Tele = "tele"
}
