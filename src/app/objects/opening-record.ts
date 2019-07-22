export class OpeningRecord { 
    id: string;
    patrollerId: string;
    notes: string;
    text: string;
    order: number;
    personnel: boolean;
    
    // Only relevant to closings.
    header: boolean;
    day: boolean;
    night: boolean;
}
