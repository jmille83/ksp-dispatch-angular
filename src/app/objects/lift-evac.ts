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
    icAssignedSig: string;

    channel1Announced: boolean;
    channel1AnnouncedSig: string;

    supNotified: boolean;
    supNotifiedSig: string;

    directorNotified: boolean;
    directorNotifiedSig: string;

    team1Notified: boolean;
    team1NotifiedSig: string;
    team2Notified: boolean;
    team2NotifiedSig: string;
    team3Notified: boolean;
    team3NotifiedSig: string;
    team4Notified: boolean;
    team4NotifiedSig: string;
    
    lmDirNotified: boolean;
    lmDirNotifiedSig: string;
    lmMgrNotified: boolean;
    lmMgrNotifiedSig: string;

    // 15-min
    paperworkStarted: boolean;
    paperworkStartedSig: string;

    liaisonAssigned: boolean;
    liaisonId: string;
    liaisonAssignedSig: string;

    verbalContactInitiated: boolean;
    verbalContactInitiatedSig: string;

    summitHouseCoordAssigned: boolean;
    summitHouseCoordId: string;
    summitHouseCoordAssignedSig: string;

    outpostCoordAssigned: boolean;
    outpostCoordId: string;
    outpostCoordAssignedSig: string;

    fbManagersNotified: boolean;
    fbManagersNotifiedSig: string;

    kesNotified: boolean;
    kesNotifiedSig: string;

    guestServicesNotified: boolean;
    guestServicesNotifiedSig: string;

    skiSchoolNotified: boolean;
    skiSchoolNotifiedSig: string;

    adventurePointNotified: boolean;
    adventurePointNotifiedSig: string;

    groomingNotified: boolean;
    groomingNotifiedSig: string;

    // 20-mins
    evacTeamAssembled: boolean;
    evacTeamAssembledSig: string;

    groundCrewsRequested: boolean;
    groundCrewsRequestedSig: string;

    teamsAssigned: boolean;
    teamsAssignedSig: string;

    aidCalled: boolean;
    aidCalledSig: string;

    teamsDeployed: boolean;
    teamsDeployedSig: string;

    // 60-mins
    lockedOut: boolean;
    lockedOutSig: string;

    liftMaintenanceConfirmed: boolean;
    liftMaintenanceConfirmedSig: string;

    evacInitiated: boolean;
    evacInitiatedSig: string;

    // Completion
    personnelCleared: boolean;
    personnelClearedSig: string;

    // After
    stoodDown: boolean;
    stoodDownSig: string;
}
