import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, Alert } from 'react-native';

export const requestGalleryPermission = async () => {
    const permission =
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const result = await check(permission);
    if (result === RESULTS.GRANTED) return true;

    const req = await request(permission);
    if (req === RESULTS.GRANTED) return true;

    Alert.alert('Permission Required', 'Please allow photo access from settings.');
    return false;
};
