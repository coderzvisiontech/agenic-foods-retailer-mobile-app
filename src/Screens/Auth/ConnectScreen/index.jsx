import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'

import { Logo, BasketImg } from '../../../Config/ImgConfig'
import { ButtonComp, Typo, StatusBarComp } from '../../../Components'
import { ColorPalatte } from '../../../Themes'

const { width } = Dimensions.get('window')


const ConnectScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp backgroundColor={ColorPalatte.whiteClr} visible={true} />
            <View style={styles.bodyWrapper}>
                <Image
                    source={Logo}
                    style={{
                        width: width * 0.6,
                        height: width * 0.3,
                    }}
                    resizeMode='center'
                />
                <View style={{ gap: 15 }}>
                    <Typo style={{ textAlign: 'center' }} type='h1' title='From Farm to Your Doorstep' />
                    <Typo style={{ textAlign: 'center', }} title='View fresh produce, check quantities, and make quick, easy payments instantly.' />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <BasketImg />
                </View>

                <ButtonComp style={{ marginBottom: 20 }} type='largePrimary' title='Connect With Phone Number' onPress={() => navigation.navigate('LoginScreen')} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPalatte.whiteClr,
    },
    bodyWrapper: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between ',
    },
})

export default ConnectScreen
