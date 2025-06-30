import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
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

export const formatList = (list = []) => {
    return list.join(', ');
};

export const getDateData = () => {
    const data = [];

    for (let i = -1; i <= 3; i++) {
        const date = moment().add(i, 'days');
        data.push({
            day: date.format('ddd'), // 'Mon', 'Tue', etc.
            date: date.date(),       // just the day number like 26
            fullDate: date.format('YYYY-MM-DD'),
            disabled: i < 0 || i > 2 // Only Today, Tomorrow, and Day After are active
        });
    }

    return data;
};

export const getISTFullDate = (selectedDate) => {
    const now = new Date(); // current time
    const date = new Date(selectedDate);

    // Inject current time into selected date
    date.setHours(now.getHours());
    date.setMinutes(now.getMinutes());
    date.setSeconds(now.getSeconds());

    // This now has the selected date + current time
    return date.toString(); // Will output like "Thu Jun 26 2025 17:05:00 GMT+0530 (India Standard Time)"
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