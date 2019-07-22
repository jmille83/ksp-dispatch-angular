export class Opening {
    id: string;
    text: string;
    peak: string;
    order: number;
    
    // Only relevant to closings.
    header: boolean;
    day: boolean;
    night: boolean;
}
