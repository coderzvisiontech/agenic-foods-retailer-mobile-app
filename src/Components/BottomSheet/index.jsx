import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    PanResponder,
    TouchableWithoutFeedback,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

const BottomSheet = ({
    visible = false,
    onClose,
    height = Dimensions.get('window').height * 0.5,
    children,
}) => {
    const panY = useRef(new Animated.Value(height)).current;
    const [isInputFocused, setIsInputFocused] = useState(false);

    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetPositionAnim = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeAnim = Animated.timing(panY, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
    });

    const panResponders = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isInputFocused, // Disable pan responder when input is focused
            onMoveShouldSetPanResponder: () => !isInputFocused,
            onPanResponderMove: Animated.event([null, { dy: panY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (e, gs) => {
                if (gs.dy > 0 && gs.vy > 0.5) {
                    onClose();
                } else {
                    resetPositionAnim.start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            resetPositionAnim.start();
        } else {
            closeAnim.start();
        }
    }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <Animated.View
                    style={[
                        styles.container,
                        { height, transform: [{ translateY }] },
                    ]}
                    {...panResponders.panHandlers}
                >
                    <View style={styles.handleContainer}>
                        <View style={styles.handle} />
                    </View>
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },
    handleContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 8,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollContent: {
        flexGrow: 1,
    },
});

export default BottomSheet;