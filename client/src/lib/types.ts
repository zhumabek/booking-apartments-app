export interface User {
    _id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    token: string | null;
    role: string | null;
    didRequest: boolean;
}