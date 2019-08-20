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
    timeReportedString: string;
    respondingPatrollerId: string;
    peak: string = "Frontside";
    type: string = "10-50";
    typeLabel: string;
    traumaActivated: boolean = false;
    ai: boolean = false;

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
