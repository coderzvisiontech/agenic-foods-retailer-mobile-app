import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ListLoader = ({ height = 100 }) => {
    return (
        <View style={{ flex: 1 }}>
            <SkeletonPlaceholder borderRadius={8}>
                {Array?.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={{
                        width: '100%',
                        height: height,
                        borderRadius: 8,
                        marginBottom: 16,
                    }} />
                ))}
            </SkeletonPlaceholder>
        </View>
    );
};

export default ListLoader;
