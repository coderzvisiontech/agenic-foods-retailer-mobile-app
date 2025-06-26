import React, { useCallback, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { ColorPalatte } from '../../Themes'
import { Avatar, ButtonComp, SecondaryHeader, Typo } from '../../Components'
import useUserData from '../../Hooks/useFetchUser'
import { ListCard } from './Component'
import { PROFILE_MENU } from '../../Interface'
import { authLogout } from '../../Redux/Action/Auth'
import { userProfile } from '../../Redux/Action/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { user } = useUserData();
    const { data } = useSelector(state => state.profile);

    useFocusEffect(useCallback(() => {
        dispatch(userProfile());
    }, [dispatch]));

    const ContactSupport = () => {
        console.log('Contact Support');

    }

    const updateProfile = useCallback((values) => {
        console.log('Updated values:', values);
    }, []);



    const handleItemPress = (key) => {
        switch (key) {
            case 'orders':
                navigation.navigate('OrderDeatils');
                break;
            case 'credit_points':
                navigation.navigate('ProfileDetail', {
                    name: 'Credit Points',
                });
                break;
            case 'support':
                console.log('Contact Support');
                break;
            case 'logout':
                // dispatch(authLogout()).then((res)=>{
                //     console.log('res',res)
                // })
                AsyncStorage.removeItem('token').then(() => {
                    navigation.navigate('LoginScreen');
                }).catch((error) => {
                    console.error('Error removing token:', error);
                });
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName='Account' onPressBack={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
            <View style={styles.bodyWrapper}>
                <Avatar fullName={user?.name} />
                <View style={{ alignItems: 'center', gap: 5, marginBottom: 25 }}>
                    <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h5' title={user?.name} />
                    <Typo style={{ fontFamily: 'Outfit-Medium', fontSize: 14, color: ColorPalatte.secondaryTxt }} type='h5' title={user?.email} />
                    <ButtonComp
                        onPress={() =>
                            navigation.navigate('ProfileDetail', {
                                name: 'My Profile',
                                updateProfile,
                                data: data?.response?.[0],
                            })
                        }
                        type='smallPrimary'
                        title='Edit'
                    />
                </View>
                <ListCard
                    onItemPress={handleItemPress}
                    menuItems={PROFILE_MENU}
                />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
        flex: 1
    },
    bodyWrapper: {
        alignItems: 'center',
        paddingTop: 32

    }
})

export default ProfileScreen
