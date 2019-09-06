export class TenThirtythree {
    id: string;
    isActive: boolean = true;

    // Primary checklist.
    dispatcherId: string;
    dispatcherAssigned: boolean;
    dispatcherAssignedTimeString: string;
    
    three101Id: string;
    three101Assigned: boolean;
    three101AssignedTimeString: string;

    closedChannel1: boolean;
    closedChannel1TimeString: string;

    reopenedChannel1: boolean;
    reopenedChannel1TimeString: string;

    directorNotified: boolean;
    directorNotifiedTimeString: string;

    mountainSafetyNotified: boolean;
    mountainSafetyNotifiedTimeString: string;

    kmcNotified: boolean;
    kmcNotifiedTimeString: string;
    kmcContact: string;

    familyPatrollerId: string;
    familyPatrollerAssigned: boolean;
    familyPatrollerAssignedTimeString: string;

    investigatorId: string;
    investigatorAssigned: boolean;
    investigatorAssignedTimeString: string;

    witnessPatrollerId: string;
    witnessPatrollerAssigned: boolean;
    witnessPatrollerAssignedTimeString: string;

    cleanupPatrollerId: string;
    cleanupPatrollerAssigned: boolean;
    cleanupPatrollerAssignedTimeString: string;

    sheriffNotified: boolean;
    sheriffNotifiedTimeString: string;

    forestServiceNotified: boolean;
    forestServiceNotifiedTimeString: string;

    // Scene.
    icId: string;
    icAssigned: boolean;
    icAssignedTimeString: string;

    mcId: string;
    mcAssigned: boolean;
    mcAssignedTimeString: string;

    patrollersDispatched: any[] = [];


}
