export class Record {
    id: string;
    name: string;
    gear: string;
    chiefComplaint: string;
    sex: string;
    topColor: string;
    bottomColor: string;
    location: string;
    timeReported: number;
    respondingPatrollerId: string;
    peak: string = "Frontside";
    type: string;

    // Secondary information.
    hasSecondaryInfo: boolean;
    
    blsPack: boolean;
    crashPack: boolean;
    alsPack: boolean;
    redBed: boolean;
    zoll: boolean;
    rigType: string;
    
    transportType: string;
    transportLocation: string;
    transportTimeCalled: string;
    transportEta: string;

    patientInfo: string;
}
