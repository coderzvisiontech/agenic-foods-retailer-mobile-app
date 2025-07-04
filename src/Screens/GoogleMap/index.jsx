import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { VITE_GOOGLE_API_KEY, VITE_MAP_URL } from "@env";
import { ColorPalatte } from '../../Themes';
import { ButtonComp, SearchDropdown, SecondaryHeader, Typo } from '../../Components';
import { LocationMarker, LogoIcon, MapMarker } from '../../Config/ImgConfig';

const { height } = Dimensions.get('window');

const INITIAL_REGION_DELTA = {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const GoogleMapScreen = ({ screen = 'Location', route }) => {
    const navigation = useNavigation();
    const { onSelect } = route.params || {};
    const mapRef = useRef(null);

    const [mapData, setMapData] = useState({
        region: null,
        marker: null,
        address: 'Getting location...',
        structuredAddress: null,
        isLoading: true,
        isDragging: false,
        searchQuery: '',
        suggestions: []
    });

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission denied', 'Cannot access location.');
                    setMapData(prev => ({ ...prev, isLoading: false }));
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const regionData = {
                        latitude,
                        longitude,
                        ...INITIAL_REGION_DELTA,
                    };
                    const location = { latitude, longitude };
                    setMapData(prev => ({
                        ...prev,
                        region: regionData,
                        marker: location,
                        isLoading: false
                    }));
                    fetchAddressFromCoords(location);
                },
                () => {
                    Alert.alert('Location Error', 'Unable to get your current location');
                    setMapData(prev => ({ ...prev, isLoading: false }));
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch {
            setMapData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleGoToCurrentLocation = useCallback(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const region = {
                    latitude,
                    longitude,
                    ...INITIAL_REGION_DELTA,
                };

                setMapData(prev => ({
                    ...prev,
                    region,
                    marker: { latitude, longitude },
                    isDragging: false
                }));

                mapRef.current?.animateToRegion(region, 1000);
                fetchAddressFromCoords({ latitude, longitude }); // ✅ just a call
            },
            () => {
                Alert.alert('Error', 'Unable to get your current location.');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [fetchAddressFromCoords]);

    const handleSearch = useCallback(async (query) => {
        setMapData(prev => ({ ...prev, searchQuery: query }));
        if (!query) return setMapData(prev => ({ ...prev, suggestions: [] }));

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${VITE_GOOGLE_API_KEY}`);
            const json = await response.json();
            setMapData(prev => ({ ...prev, suggestions: json?.predictions || [] }));
        } catch {
            setMapData(prev => ({ ...prev, suggestions: [] }));
        }
    }, []);

    const handleSuggestionSelect = useCallback(async (placeId) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${VITE_GOOGLE_API_KEY}`);
            const json = await response.json();
            const loc = json.result.geometry.location;
            const coords = {
                latitude: loc.lat,
                longitude: loc.lng
            };

            const region = {
                ...coords,
                ...INITIAL_REGION_DELTA,
            };

            setMapData(prev => ({
                ...prev,
                marker: coords,
                region,
                suggestions: [],
                searchQuery: json.result.formatted_address || ''
            }));

            mapRef.current?.animateToRegion(region, 1000);
            fetchAddressFromCoords(coords);
        } catch { }
    }, []);

    const fetchAddressFromCoords = useCallback(async ({ latitude, longitude }) => {
        try {
            setMapData(prev => ({ ...prev, address: 'Getting address...' }));
            const response = await fetch(`${VITE_MAP_URL}?latlng=${latitude},${longitude}&key=${VITE_GOOGLE_API_KEY}`);
            const json = await response.json();

            if (json?.results?.length > 0) {
                const result = json?.results?.[0];
                const newAddress = {
                    line1: `${result?.address_components?.[0]?.long_name}, ${result?.address_components?.[1]?.long_name}`,
                    line2: `${result?.address_components?.[2]?.long_name}, ${result?.address_components?.[3]?.long_name}`,
                    city: `${result?.address_components?.[4]?.long_name}, ${result?.address_components?.[5]?.long_name}`,
                    state: `${result?.address_components?.[7]?.long_name}`,
                    country: `${result?.address_components?.[8]?.long_name}`,
                    lat: result?.geometry?.location?.lat,
                    lng: result?.geometry?.location?.lng,
                    zipcode: result?.address_components?.[9]?.long_name
                };

                const availability_address = result?.formatted_address;

                setMapData(prev => ({
                    ...prev,
                    address: availability_address,
                    structuredAddress: { ...newAddress, availability_address }
                }));
            } else {
                setMapData(prev => ({
                    ...prev,
                    address: json?.error_message || 'Address not found',
                    structuredAddress: null
                }));
            }
        } catch {
            setMapData(prev => ({
                ...prev,
                address: 'Error fetching address',
                structuredAddress: null
            }));
        }
    }, []);

    const handleMarkerDrag = useCallback((coords) => {
        const region = {
            ...coords,
            ...INITIAL_REGION_DELTA,
        };
        setMapData(prev => ({
            ...prev,
            marker: coords,
            region,
            isDragging: false
        }));
        fetchAddressFromCoords(coords);
    }, [fetchAddressFromCoords]);

    const handleConfirmLocation = () => {
        if (mapData.marker && mapData.structuredAddress) {
            onSelect?.({
                location: mapData.marker,
                address: mapData.structuredAddress,
            });
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Please select a location first');
        }
    };

    if (mapData.isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <SecondaryHeader isBack screenName={screen} onPressBack={() => navigation.goBack()} />
                <View style={styles.loadingContent}>
                    <LogoIcon />
                    <Typo style={styles.loadingText} title="Getting your location..." />
                </View>
            </SafeAreaView>
        );
    }

    const isSuggestionsActive = mapData.suggestions.length > 0;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <SecondaryHeader isBack screenName={screen} onPressBack={() => navigation.goBack()} />
                <SearchDropdown
                    label="Search"
                    placeholder="Search"
                    data={mapData?.suggestions}
                    onChangeText={handleSearch}
                    onSelect={handleSuggestionSelect}
                />

            </View>

            <View style={styles.locationWrapper}>
                <Typo style={styles.dragTxt} title={mapData.isDragging ? 'Dragging...' : 'Drag to Choose'} />
                <Typo style={styles.dragTxt} title={mapData.address} numberOfLines={2} />
            </View>

            {mapData.region && (
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        style={styles.mapStyle}
                        region={mapData.region}
                        onRegionChangeComplete={(region) => setMapData(prev => ({ ...prev, region }))}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        onPress={(e) => !isSuggestionsActive && handleMarkerDrag(e.nativeEvent.coordinate)}
                        scrollEnabled={!isSuggestionsActive}
                        zoomEnabled={!isSuggestionsActive}
                        rotateEnabled={false}
                        pitchEnabled={false}
                    >
                        {mapData.marker && (
                            <Marker
                                coordinate={mapData.marker}
                                draggable
                                onDragStart={() => setMapData(prev => ({ ...prev, isDragging: true, address: 'Dragging...' }))}
                                onDragEnd={(e) => handleMarkerDrag(e.nativeEvent.coordinate)}
                            >
                                <MapMarker />
                            </Marker>
                        )}
                    </MapView>
                </View>
            )}

            <TouchableOpacity style={styles.locationContainer} onPress={handleGoToCurrentLocation}>
                <LocationMarker />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <ButtonComp
                    type='largePrimary'
                    title='Confirm Location'
                    onPress={handleConfirmLocation}
                    disabled={!mapData.marker || !mapData.address || mapData.address.includes('Error') || mapData.address.includes('Getting')}
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
    },
    mapStyle: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
        backgroundColor: 'transparent',
    },
    locationContainer: {
        position: 'absolute',
        right: 20,
        bottom: 75,
        backgroundColor: 'transparent',
    },
    dragTxt: {
        color: ColorPalatte.secondaryTxt,
        fontFamily: 'Outfit-Medium',
        fontSize: 14,
    },
    locationWrapper: {
        position: 'absolute',
        top: (height * 0.2) + 10,
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
    },
});
