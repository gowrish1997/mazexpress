import { User } from "./user.model";

export enum NotificationStatus {
    DL = "deleted",
    RD = "read",
    UN = "unread",
}

export interface Notification {
    id: string;

    content: string;

    created_on: Date;

    status: string;

    read_on: string;

    title: string;

    users: User[];
}
