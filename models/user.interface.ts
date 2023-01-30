interface IUser {
    isLoggedIn: boolean;
    avatarUrl: string;
    email: string;
    username: string;
    isAdmin: boolean;
    id: number;
    default_address_users: number;
}
interface ISignUp {
    first_name_users: string;
    last_name_users: string;
    email_users: string;
    phone_users: number;
    password_users: string;
    confirmPassword_users: string;
}
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "confirmPassword_users">]: Type[Property];
};

// type TUserProfile = ISignUp & {
//     avatarURL_users: string;
//     notification_users: string;
//     language_users: string;
// };
type TUserProfile = RemoveKindField<ISignUp> & {
    newPassword_users: string;
    avatarURL_users: string;
    notification_users: boolean;
    language_users: string;
};

export type { IUser, ISignUp, TUserProfile };
