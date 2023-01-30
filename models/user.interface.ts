interface IUser {
    avatar_url_users: string;
    email_users: string;
    first_name_users: string;
    last_name_users: string;
    phone_users: string;
    password_users: string;
    isAdmin: 0 | 1;
    id_users: number | null;
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
// type RemoveKindField<Type> = {
//     [Property in keyof Type as Exclude<Property,[ "isAdmin","id_users","default_address_users"]>]: Type[Property];
// };

// type TUserProfile = ISignUp & {
//     avatarURL_users: string;
//     notification_users: string;
//     language_users: string;
// };
interface IUserProfile{
    avatar_url_users: string;
    email_users: string;
    first_name_users: string;
    last_name_users: string;
    phone_users: string;
    password_users: string;
    newPassword_users: string;
    notification_users: boolean;
    default_language_users: string;
};

export type { IUser, ISignUp, IUserProfile };
