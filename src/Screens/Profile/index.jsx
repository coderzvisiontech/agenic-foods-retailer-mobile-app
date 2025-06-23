import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { ColorPalatte } from '../../Themes'
import { Avatar, ButtonComp, SecondaryHeader, Typo } from '../../Components'
import useUserData from '../../Hooks/useFetchUser'
import { ListCard } from './Component'
import { PROFILE_MENU } from '../../Interface'
import { authLogout } from '../../Redux/Action/Auth'
import { userProfile } from '../../Redux/Action/Profile'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { user } = useUserData();
    const { data } = useSelector(state => state.profile);

    console.log('data', data)

    useEffect(() => {
        dispatch(userProfile()).then((res) => {
            console.log('res', res)
        })
    }, [])


    const ContactSupport = () => {
        console.log('Contact Support');

    }

    const EditProfile = () => {
        console.log('Edit Profile');

    }

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
                dispatch(authLogout());
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack screenName='Account' />
            <View style={styles.bodyWrapper}>
                <Avatar fullName={user?.name} />
                <View style={{ alignItems: 'center', paddingVertical: 20, gap: 5 }}>
                    <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h5' title={user?.name} />
                    <Typo style={{ fontFamily: 'Outfit-Medium', fontSize: 14, color: ColorPalatte.secondaryTxt }} type='h5' title={user?.email} />
                    <ButtonComp
                        onPress={() =>
                            navigation.navigate('ProfileDetail', {
                                name: 'My Profile',
                                EditProfile,
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
