import React, { useMemo } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ColorPalatte } from '../../../../Themes'
import { Avatar, ButtonComp, SecondaryHeader } from '../../../../Components'
import { useNavigation } from '@react-navigation/native'

const DetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { name, EditProfile, data } = route.params;


    console.log('EditProfile', data);



    const renderContent = useMemo(() => {
        switch (name) {
            case 'credit_points':
                return (
                    <>
                        <Text>Credit Points</Text>
                    </>
                );

            case 'My Profile':
                return (
                    <>
                        <Avatar fullName={`${data?.first_name} ${data?.last_name}`} />
                        <ButtonComp type='largePrimary' onPress={EditProfile} title='Update' />
                    </>
                );

            default:
                return null;
        }
    }, [name, EditProfile]);


    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader onPressBack={() => navigation.goBack()} isBack screenName={name} />
            <View style={styles.contentWrapper}>
                {renderContent}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        flex: 1,
        padding: 20
    }
})

export default DetailScreen
