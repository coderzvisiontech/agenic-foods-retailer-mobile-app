import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { SecondaryHeader, Typo, ButtonComp, NotificationCard } from '../../Components'
import { ColorPalatte, FontSize } from '../../Themes'
import { NoNotification } from '../../Config/ImgConfig'
import { notificationDetail, notificationList } from '../../Redux/Action/Notification'

const NotificationScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { notification } = useSelector(state => state.notification);

    const [notifyData, setNotifyData] = useState({
        notifyDetails: {},
        expandId: ''
    })

    const data = [
        {
            id: 1,
            title: 'Product Price Changed',
            body: 'Egyptian Citrus 72C Price Changed to ₹1100',
            time: '3h ago'
        }
    ]

    useFocusEffect(useCallback(() => {
        dispatch(notificationList())
    }, []));

    const mappedNotification = useMemo(() => {
        return notification?.response?.map((el) => ({
            id: el?.id,
            message: el?.message,
            status: el?.status,
            time: el?.time,
            title: el?.title
        }));
    }, [notification]);

    const handleDelete = useCallback((id) => {
        console.log('Id------', id)
    }, []);

    const handleToggle = useCallback((item) => {
        console.log('item', item);

        const payload = {
            id: item?.id,
            status: item?.status
        }
        dispatch(notificationDetail(payload)).then((res) => {
            console.log('res', res)
        })
    }, [])

    const renderItem = (item) => {
        return (
            <NotificationCard
                notifyData={item?.item}
                onDeleteNotify={() => {
                    handleDelete(item?.item?.id)
                }}
                onToggleExpand={() => handleToggle(item?.item)}
                expand={notifyData?.expandId}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isClear isBack screenName={'Notifications'} onPressBack={() => navigation.goBack()} />

            {mappedNotification?.length > 0 ? (
                <FlatList
                    data={mappedNotification}
                    keyExtractor={(item) => item?.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                    <NoNotification />
                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <Typo
                            style={{ fontSize: FontSize.fontSize16, fontFamily: 'Outfit-Medium' }}
                            title={'You Have No Notification'}
                        />
                        <Typo
                            style={{ fontSize: FontSize.fontSize14, fontFamily: 'Outfit-Medium', color: ColorPalatte.grey_400 }}
                            title={'Nothing new here, check back later'}
                        />
                    </View>
                    <ButtonComp
                        type='mediumPrimary'
                        title='Back to Home'
                        onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}
                    />
                </View>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
        flex: 1
    }
})

export default NotificationScreen
