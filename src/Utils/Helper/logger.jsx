import { LogBox } from 'react-native';

export const initializeLogger = () => {
    if (__DEV__) {
        LogBox.ignoreAllLogs(true);

        const originalHandler = ErrorUtils.getGlobalHandler();
        ErrorUtils.setGlobalHandler((error, isFatal) => {
            originalHandler(error, isFatal);
        });
    }
};
