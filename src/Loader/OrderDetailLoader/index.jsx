import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderDetailLoader = () => {
    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <SkeletonPlaceholder borderRadius={8}>
                <View style={styles.section}>
                    <View style={styles.smallBlock} />
                    <View style={styles.smallBlock} />
                </View>

                <View style={styles.section}>
                    <View style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 8,
                    }} />
                </View>

                <View style={styles.section}>
                    <View style={styles.smallBlock} />

                    <View style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 8,
                    }} />
                </View>

                <View style={styles.section}>
                    <View style={styles.smallBlock} />

                    <View style={{
                        width: '100%',
                        height: 120,
                        borderRadius: 8,
                    }} />
                </View>
            </SkeletonPlaceholder>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    smallBlock: {
        width: '100%',
        height: 25,
        borderRadius: 8,
        marginBottom: 12,
    },
});

export default OrderDetailLoader;
