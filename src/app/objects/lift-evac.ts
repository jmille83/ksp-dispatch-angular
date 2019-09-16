export class LiftEvac {
    id: string;
    lift: string;
    date: string;
    isActive: boolean = true;

    dispatcherId: string;
    problem: string;

    stopTime: number;
    restartTime: number;
    downTime: number;
    stopTimeString: string;
    restartTimeString: string;
    downTimeString: string;

    icAssigned: boolean;
    icId: string;
    icAssignedTimeString: string;
}
