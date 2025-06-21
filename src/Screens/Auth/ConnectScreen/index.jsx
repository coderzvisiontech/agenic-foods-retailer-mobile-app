import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, Image, SafeAreaView, TouchableOpacity, StyleSheet, View } from 'react-native'

import { Logo, BasketImg } from '../../../Config/ImgConfig'
import { BackgroundWrapper, ButtonComp, Typo, StatusBarComp } from '../../../Components'
import { ColorPalatte, FontSize } from '../../../Themes'

const { height, width } = Dimensions.get('window')


const ConnectScreen = () => {
    const navigation = useNavigation()

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
                <Typo style={styles.header} type='h1' title='From Farm to Your Doorstep' />
                <Typo style={styles.header} title='View fresh produce, check quantities, and make quick, easy payments instantly.' />
                <BasketImg />
                <ButtonComp style={{ marginTop: 40 }} type='largePrimary' title='Connect With Phone Number' onPress={() => navigation.navigate('LoginScreen')} />
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
        padding: 20,
        alignItems: 'center',

    },
    header: {
        textAlign: 'center',
        marginVertical: 5
    },
})

export default ConnectScreen
