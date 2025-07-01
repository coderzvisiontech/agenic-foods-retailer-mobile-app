import React, { useEffect, useState } from 'react';
import {
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { VITE_GOOGLE_API_KEY, VITE_MAP_URL } from "@env"
import { ColorPalatte } from '../../Themes';
import { ButtonComp, SecondaryHeader, TextInput, Typo } from '../../Components';
import { MapMarker } from '../../Config/ImgConfig';

const { height } = Dimensions.get('window')

const GoogleMapScreen = ({ screen = 'Location' }) => {
    const navigation = useNavigation();
    const [region, setRegion] = useState(null);
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState('Getting location...');
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission denied', 'Cannot access location.');
                    setIsLoading(false);
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
                    const location = { latitude, longitude };
                    setMarker({ latitude, longitude });
                    fetchAddressFromCoords(location);
                    setIsLoading(false);
                },
                error => {
                    console.error('Geolocation error:', error);
                    Alert.alert('Location Error', 'Unable to get your current location');
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        } catch (err) {
            console.warn(err);
            setIsLoading(false);
        }
    };

    const handleMarkerDragStart = () => {
        setIsDragging(true);
        setAddress('Dragging...');
    };

    const handleMarkerDragEnd = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarker(coords);

        const newRegion = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: region?.latitudeDelta || 0.01,
            longitudeDelta: region?.longitudeDelta || 0.01,
        };
        setRegion(newRegion);

        setIsDragging(false);
        fetchAddressFromCoords(coords);
    };

    const handleMapPress = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarker(coords);

        const newRegion = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: region?.latitudeDelta || 0.01,
            longitudeDelta: region?.longitudeDelta || 0.01,
        };
        setRegion(newRegion);

        fetchAddressFromCoords(coords);
    };

    const fetchAddressFromCoords = async ({ latitude, longitude }) => {
        try {
            setAddress('Getting address...');
            const apiKey = `${VITE_GOOGLE_API_KEY}`;
            const response = await fetch(
                `${VITE_MAP_URL}?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const json = await response.json();
            console.log('json', json);

            if (json?.results?.length > 0) {
                const formattedAddress = json.results[0].formatted_address;
                setAddress(formattedAddress);
            } else {
                setAddress(json?.error_message);
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            setAddress('Error fetching address');
        }
    };

    const handleConfirmLocation = () => {
        if (marker && address) {
            // navigation.goBack();
            // Or navigate with params:
            // navigation.navigate('PreviousScreen', { 
            //     selectedLocation: marker, 
            //     selectedAddress: address 
            // });
        } else {
            Alert.alert('Error', 'Please select a location first');
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <SecondaryHeader isBack screenName={screen} onPressBack={() => navigation.goBack()} />
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color={ColorPalatte.primaryClr} />
                    <Typo style={styles.loadingText} title="Getting your location..." />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <SecondaryHeader isBack screenName={screen} onPressBack={() => navigation.goBack()} />
                <TextInput
                    style={styles.searchInput}
                    type="search"
                    placeholder="Search location"
                />
            </View>

            <View style={styles.locationWrapper}>
                <Typo style={styles.dragTxt} title={isDragging ? 'Dragging...' : 'Drag to Choose'} />
                <Typo
                    style={styles.dragTxt}
                    title={address}
                    numberOfLines={2}
                />
            </View>

            {region && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.mapStyle}
                        region={region}
                        onRegionChangeComplete={setRegion}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        onPress={handleMapPress}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        rotateEnabled={false}
                        pitchEnabled={false}
                    >
                        {marker && (
                            <Marker
                                coordinate={marker}
                                draggable
                                onDragStart={handleMarkerDragStart}
                                onDragEnd={handleMarkerDragEnd}
                            >
                                <MapMarker />
                            </Marker>
                        )}
                    </MapView>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <ButtonComp
                    type='largePrimary'
                    title='Confirm Location'
                    onPress={handleConfirmLocation}
                    disabled={!marker || !address || address.includes('Error') || address.includes('Getting')}
                />
            </View>
        </SafeAreaView>
    );
};

export default GoogleMapScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: ColorPalatte.whiteClr,
        zIndex: 1000,
    },
    searchInput: {
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        color: ColorPalatte.secondaryTxt,
    },
    mapContainer: {
        flex: 1,
        marginTop: 20,
    },
    mapStyle: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'transparent',
    },
    dragTxt: {
        color: ColorPalatte.secondaryTxt,
        fontFamily: 'Outfit-Medium',
        fontSize: 14,
    },
    locationWrapper: {
        position: 'absolute',
        top: (height * 0.2) + 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        backgroundColor: ColorPalatte.primaryClr_50,
        zIndex: 999,
        borderWidth: 1,
        borderColor: ColorPalatte.primaryClr,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
    }
});


{/* <GooglePlacesAutocomplete
  placeholder="Search location"
  fetchDetails={true}
  onPress={(data, details = null) => {
    if (!details?.geometry?.location) return;

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    const coords = { latitude: lat, longitude: lng };
    setRegion({
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setMarker(coords);
    fetchAddressFromCoords(coords);
  }}
  query={{
    key: VITE_GOOGLE_API_KEY || 'YOUR_FALLBACK_API_KEY',
    language: 'en',
  }}
  renderEmptyResult={() => (
    <View style={{ padding: 10 }}>
      <Typo title="No places found" style={{ textAlign: 'center', color: 'gray' }} />
    </View>
  )}
  styles={{
    textInput: {
      height: 44,
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    container: {
      zIndex: 999,
      flex: 0,
    },
  }}
  textInputProps={{
    placeholder: 'Search',
    returnKeyType: 'search'
  }}
  enablePoweredByContainer={false}
  onFail={(err) => {
    console.log('Autocomplete Error:', err);
  }}
  listViewDisplayed={true}
/> */}
