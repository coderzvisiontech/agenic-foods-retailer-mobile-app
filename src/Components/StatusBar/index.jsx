import React, { useEffect } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { ColorPalatte } from '../../Themes';

const StatusBarComp = ({
    backgroundColor = ColorPalatte.whiteClr,
    visible = false,
    barStyle = 'dark-content',
    translucent = false
}) => {
    useEffect(() => {
        StatusBar.setHidden(!visible, 'fade');
    }, [visible]);

    return (
        <>
            {Platform.OS === 'android' && visible && (
                <View style={{ backgroundColor }} />
            )}
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={barStyle}
                translucent={translucent}
            />
        </>
    );
};

export default StatusBarComp;
