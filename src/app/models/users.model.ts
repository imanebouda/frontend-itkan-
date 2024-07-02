
export class UsersModel{
    id: number;
    username: string;
    nomCompletUtilisateur: string;
    email: string;
    password: string;
    token?: string; // Optional field
    createdAt: Date;
    updatedAt?: Date; // Optional field
    deletedAt?: Date; // Optional field
    idRole: number;
}
