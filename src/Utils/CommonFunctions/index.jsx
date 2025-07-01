import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { showToast } from '../Helper/toastHelper';

export const requestGalleryPermission = async () => {
    const permission =
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const result = await check(permission);
    if (result === RESULTS.GRANTED) return true;

    const req = await request(permission);
    if (req === RESULTS.GRANTED) return true;

    showToast('error', "Permission Required - Please allow photo access from settings.")
    return false;
};

export const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                showToast('error', "Permission denied - Cannot access location.")
                return;
            }
        }

        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const regionData = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };
                setRegion(regionData);
                setMarker({ latitude, longitude });
            },
            error => {
                console.error('Geolocation error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    } catch (err) {
        console.warn(err);
    }
};

export const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'App needs access to your storage to download invoice.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn('Permission error:', err);
        Alert.alert('Permission Error', 'Something went wrong while requesting permission.');
        return false;
    }
};
