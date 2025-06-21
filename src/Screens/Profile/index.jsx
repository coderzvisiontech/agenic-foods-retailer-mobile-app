import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { ColorPalatte } from '../../Themes'

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

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

export default ProfileScreen
