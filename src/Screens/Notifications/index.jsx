import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { SecondaryHeader, Typo, ButtonComp, NotificationCard, BottomSheet } from '../../Components'
import { ColorPalatte, FontSize } from '../../Themes'
import { NoNotification } from '../../Config/ImgConfig'
import { notificationDetail, notificationList, notifyDelAll, notifySingleDel } from '../../Redux/Action/Notification'
import { ListLoader } from '../../Loader'
import { showToast } from '../../Utils/Helper/toastHelper'

const { height } = Dimensions.get('window')

const NotificationScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { notification, notificationLoading } = useSelector(state => state.notification);

    const [notifyData, setNotifyData] = useState({
        status: {},
        expandId: '',
        openDelSheet: false
    })

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
        dispatch(notifySingleDel({ notificationId: id })).then((res) => {
            if (res?.payload?.status === 200) {
                showToast('success', 'Deleted notification successfully');
                dispatch(notificationList())
            }
        })
    }, []);

    const handleToggle = useCallback((item) => {
        if (notifyData?.expandId === item?.id) {
            setNotifyData((prev) => ({
                ...prev,
                expandId: null,
                status: false,
            }));
            return;
        }

        dispatch(notificationDetail({ notificationId: item?.id })).then((res) => {
            if (res?.payload?.status === 200) {
                setNotifyData((prev) => ({
                    ...prev,
                    status: res?.payload.data.status,
                    expandId: item?.id
                }))
            }
        })
    }, [notifyData?.expandId])

    const renderItem = (item) => {
        return (
            <NotificationCard
                notifyData={item?.item}
                onDeleteNotify={() => {
                    handleDelete(item?.item?.id)
                }}
                onToggleExpand={() => handleToggle(item?.item)}
                status={notifyData?.status}
                details={notifyData?.expandId === item?.item?.id}
            />
        )
    }

    const handleDeleteAll = useCallback(() => {
        if (notification?.response?.length === 0) {
            setNotifyData((prev) => ({
                ...prev,
                openDelSheet: false
            }))
            setTimeout(() => {
                showToast('error', 'No notifications to delete');
            }, 500)
            return
        };

        dispatch(notifyDelAll({ notificationId: 'all' })).then((res) => {
            if (res?.payload?.status === 200) {
                setNotifyData((prev) => ({
                    ...prev,
                    openDelSheet: false
                }))
                setTimeout(() => {
                    showToast('success', 'Cleared all notifications')
                    dispatch(notificationList())
                }, 500)
            }
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader
                isClear
                isBack
                screenName={'Notifications'}
                onPressBack={() => navigation.goBack()}
                onClear={() => {
                    setNotifyData((prev) => ({
                        ...prev,
                        openDelSheet: true
                    }))
                }}
            />

            {notificationLoading ? (
                <ListLoader height={75} />
            ) : (
                mappedNotification?.length > 0 ? (
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
                )
            )}

            <BottomSheet
                visible={notifyData?.openDelSheet}
                onClose={() =>
                    setNotifyData((prev) => ({
                        ...prev,
                        openDelSheet: false,
                    }))
                }
                height={(height * 0.4) - 50}
            >
                <Typo type='h3' title='Delete' />
                <Typo
                    type='p'
                    title={`Are you sure you want to clear all notifications?`}
                />
                <View style={{ gap: 15, paddingVertical: 20 }}>
                    <ButtonComp type='largePrimary' title='Clear all' onPress={handleDeleteAll} />
                    <ButtonComp
                        type='largeSecondary'
                        title='Cancel'
                        onPress={() =>
                            setNotifyData((prev) => ({
                                ...prev,
                                openDelSheet: false
                            }))
                        }
                    />
                </View>
            </BottomSheet>
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
