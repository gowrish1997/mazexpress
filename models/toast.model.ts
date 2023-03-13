export interface IToast {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    title?: string;
    timeOut?: number;
    onClick?: () => void;
    priority?: number

}