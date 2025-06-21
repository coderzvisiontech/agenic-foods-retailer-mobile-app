// import React, { useState, useEffect, useRef } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Typo } from "../../Components";
// import { ColorPalatte } from '../../Themes';
// import { DecrementIcon, IncrementIcon } from '../../Config/ImgConfig';
// import { Swipeable } from 'react-native-gesture-handler';

// const ProductCard = ({ data, onQuantityChange, onDelete, isDelete = false }) => {
//     const {
//         name,
//         price,
//         unit,
//         items_left,
//         image,
//         quantity = 0,
//     } = data;

//     const [qty, setQty] = useState(quantity);
//     const debounceTimer = useRef(null);

//     const increaseQty = () => setQty(prev => prev + 1);
//     const decreaseQty = () => setQty(prev => (prev > 1 ? prev - 1 : 0));

//     useEffect(() => {
//         if (debounceTimer.current) clearTimeout(debounceTimer.current);
//         debounceTimer.current = setTimeout(() => {
//             onQuantityChange?.({ ...data, quantity: qty });
//         }, 500);
//     }, [qty]);

//     useEffect(() => {
//         return () => {
//             if (debounceTimer.current) clearTimeout(debounceTimer.current);
//         };
//     }, []);

//     const totalPrice = qty === 0 ? price : price * qty;

//     const renderRightActions = () => (
//         <TouchableOpacity style={styles.deleteBox} onPress={() => onDelete?.(data)}>
//             <Text style={styles.deleteText}>Delete</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <Swipeable renderRightActions={renderRightActions}>
//             <View style={[styles.card, isDelete && styles.deleteBorder]}>
//                 <Image
//                     source={
//                         require('../../Assets/Images/otp_bg.jpg')
//                     }
//                     style={styles.image}
//                     resizeMode="cover"
//                     onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
//                 />

//                 <View style={{ flex: 1, marginLeft: 12 }}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Typo type='h5' title={name} />
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Typo type='h6' title={`₹${price}`} />
//                             <Typo type='label' title={`/${unit}`} />
//                         </View>
//                     </View>

//                     <Typo
//                         style={{
//                             color: ColorPalatte.primaryClr,
//                             fontFamily: 'Outfit-Medium'
//                         }}
//                         type='label'
//                         title={`${items_left} ${unit}s Left`}
//                     />

//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
//                         <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h4' title={`₹${totalPrice.toFixed(1)}`} />
//                         <View style={styles.counter}>
//                             <TouchableOpacity onPress={decreaseQty}>
//                                 <DecrementIcon />
//                             </TouchableOpacity>
//                             <Typo style={{ fontFamily: 'Outfit-Bold' }} type='h5' title={qty} />
//                             <TouchableOpacity onPress={increaseQty}>
//                                 <IncrementIcon />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </Swipeable>
//     );
// };

// export default ProductCard;

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: ColorPalatte.bgClr,
//         borderRadius: 12,
//         flexDirection: 'row',
//         padding: 12,
//         alignItems: 'center',
//         marginVertical: 8,
//     },
//     image: {
//         width: 80,
//         height: 80,
//         borderRadius: 8,
//     },
//     counter: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//     },
//     deleteBox: {
//         backgroundColor: '#FF3B30',
//         justifyContent: 'center',
//         alignItems: 'flex-end',
//         paddingHorizontal: 20,
//         marginVertical: 8,
//         borderRadius: 12,
//     },
//     deleteText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     deleteBorder: {
//         borderRightWidth: 2,
//         borderRightColor: ColorPalatte.errorclr,
//     }
// });



import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Typo, BottomSheet } from "../../Components"
import { ColorPalatte } from '../../Themes';
import { DecrementIcon, DeleteIcon, IncrementIcon } from '../../Config/ImgConfig';

const ProductCard = ({ data, onQuantityChange, isDelete, onDelete }) => {
    const {
        name,
        price,
        unit,
        items_left,
        image,
        quantity = 0,
    } = data;

    const [qty, setQty] = useState(quantity);
    const debounceTimer = useRef(null);

    const increaseQty = () => {
        setQty(prev => prev + 1);
    };

    const decreaseQty = () => {
        setQty(prev => (prev > 1 ? prev - 1 : 0));
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

    const totalPrice = qty === 0 ? price : price * qty;

    return (
        <View style={styles.card}>
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
                    {isDelete && (
                        <TouchableOpacity onPress={() => onDelete?.(data)}>
                            <DeleteIcon />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Typo type='h6' title={`₹${price}`} />
                    <Typo type='label' title={`/${unit}`} />
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
