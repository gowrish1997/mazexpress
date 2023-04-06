export const useTranslation = () => {
    return {
        t: (key: string) => {
            switch (key) {
                case "greeting":
                    return "Hello, World!";
                default:
                    return "";
            }
        },
    };
};
