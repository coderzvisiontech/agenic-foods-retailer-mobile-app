import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Typo } from "../../Components"
import { ColorPalatte } from '../../Themes';
import { DecrementIcon, IncrementIcon } from '../../Config/ImgConfig';

const ProductCard = ({ data, onQuantityChange }) => {
    const {
        name,
        price,
        unit,
        items_left,
        image,
        quantity = 1,
    } = data;

    const [qty, setQty] = useState(quantity);
    const debounceTimer = useRef(null);

    const increaseQty = () => {
        setQty(prev => prev + 1);
    };

    const decreaseQty = () => {
        setQty(prev => (prev > 1 ? prev - 1 : 1));
    };

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            onQuantityChange?.({ ...data, quantity: qty });
        }, 500);
    }, [qty]);

    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    const totalPrice = price * qty;

    return (
        <View style={styles.card}>
            {console.log('image', image)}
            <Image
                source={
                    // image
                    //     ? { uri: image }
                    //     : 
                        require('../../Assets/Images/otp_bg.jpg')
                }
                style={styles.image}
                resizeMode="cover"
                onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />

            <View style={{
                flex: 1,
                marginLeft: 12,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typo type='h5' title={name} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typo type='h6' title={`₹${price}`} />
                        <Typo type='label' title={`/${unit}`} />
                    </View>
                </View>

                <Typo
                    style={{
                        color: ColorPalatte.primaryClr,
                        fontFamily: 'Outfit-Medium'
                    }}
                    type='label'
                    title={`${items_left} ${unit}s Left`}
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
                    <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h4' title={`₹${totalPrice.toFixed(1)}`} />

                    <View style={styles.counter}>
                        <TouchableOpacity onPress={decreaseQty}>
                            <DecrementIcon />
                        </TouchableOpacity>
                        <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h5' title={qty} />
                        <TouchableOpacity onPress={increaseQty}>
                            <IncrementIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: ColorPalatte.bgClr,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        marginVertical: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});
