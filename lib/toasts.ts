import { IToast } from "@/models/toast.model";

const createToast = (toast: IToast) => {
  //   console.log();
  switch (toast.type) {
    case "info":
      // NotificationManager.info(
      //   toast.message,
      //   toast.title,
      //   toast.timeOut,
      //   toast.onClick,
      //   toast.priority
      // );
      break;
    case "success":
      // NotificationManager.success(
      //   toast.message,
      //   toast.title,
      //   toast.timeOut,
      //   toast.onClick,
      //   toast.priority
      // );
      break;
    case "warning":
      // NotificationManager.warning(
      //   toast.message,
      //   toast.title,
      //   toast.timeOut,
      //   toast.onClick,
      //   toast.priority
      // );
      break;
    case "error":
      // NotificationManager.error(
      //   toast.message,
      //   toast.title,
      //   toast.timeOut,
      //   toast.onClick,
      //   toast.priority
      // );
      break;
  }
};

export { createToast };
