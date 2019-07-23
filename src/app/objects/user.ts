
export interface Roles {
    admin?: boolean;
    sup?: boolean;
    dispatch?: boolean;
    line?: boolean;
    default?: boolean; // This is what a user is created as and has no permissions other than writing the user object.
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
    initials: string;
    firstName: string;
    lastName: string;
}
