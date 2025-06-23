import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const Typography = ({
    title,
    type = 'p',
    disabled = false,
    link = false,
    ellipsis = false,
    style,
    onPress,
    tailWidth
}) => {
    const baseStyle = styles[type] || styles.p;
    const textStyles = [
        baseStyle,
        disabled && styles.disabled,
        link && styles.link,
        ellipsis && tailWidth && { width: tailWidth },
        style,
    ];

    const textProps = ellipsis
        ? { numberOfLines: 1, ellipsizeMode: 'tail' }
        : {};

    const content = (
        <Text style={textStyles} {...textProps}>
            {title}
        </Text>
    );

    if (link && onPress) {
        return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
    }

    return content;
};

export default Typography;
