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

    icTerminated: boolean;
    icTerminatedTimeString: string;

    patrollersDispatched: any[] = [];

    // Patient info.
    age: number;
    chiefComplaint: string;
    location: string;
    name: string;
    sex: string;
    height: string;
    weight: number;
    mechanism: string;
    reportingParty: string;
    locationOfRp: string;
    secondaryComplaint: string;

    patientCareTurnedOver: boolean = false;
    patientCareTurnedOverTo: string;
    patientCareTurnedOverTime: string;

    patientInfoTable: any[] = [];

    // Transport.
    flightsLz: string;
    flightsEta: string;
    flightsStandby: string;
    flightsGo: string;
    flightsPatrolContactId: string;
    liftMaintenanceNotified: boolean;
    liftMaintenanceNotifiedTime: string;
    
    kmcDoctorNotifiedOfFlightsLanding: boolean;
    kmcDoctorNotifiedOfFlightsLandingTime: string;
    kmcDoctorNotifiedOfFlightsLandingContact: string;

    ambulanceStatus: string = "none";
    ambulanceTime: string;

    kesDispatched: boolean;
    kesDispatchedTime: string;

    snowmobileAssist: string;
    
    mountainOpsNotifiedOfGulchRdTravel: boolean;
    mountainOpsNotifiedOfGulchRdTravelTime: string;


}
