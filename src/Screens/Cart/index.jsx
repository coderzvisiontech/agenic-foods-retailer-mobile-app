// import React, { useCallback, useMemo, useState } from 'react'
// import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import { useFocusEffect, useNavigation } from '@react-navigation/native'

// import { BottomCard, BottomSheet, ButtonComp, ProductCard, SecondaryHeader, Typo } from '../../Components'
// import { ColorPalatte, FontSize } from '../../Themes'
// import { cartDelete, cartList } from '../../Redux/Action/Cart'
// import { NoCart } from '../../Config/ImgConfig'

// const { height } = Dimensions.get('window');

// const CartScreen = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const { cart } = useSelector(state => state.cart);
//     const [cartData, setCartData] = useState({
//         infoState: {
//             delBottomSheet: false,
//             delItem: []
//         }
//     });

//     useFocusEffect(
//         useCallback(() => {
//             dispatch(cartList());
//         }, [])
//     );

//     const mappedCart = useMemo(() => {
//         return cart?.response?.map((item) => ({
//             userId: item?.id,
//             selected_qty: item?.selectedQuantity,
//             product_id: item?.product?.id,
//             image: item?.product?.image,
//             name: item?.product?.name,
//             price: item?.product?.price,
//             total_qty: item?.product?.totalQuantity,
//             unit: item?.product?.unit,
//             items_left: item?.product?.totalQuantity,
//             quantity: item?.selectedQuantity,
//         })) || [];
//     }, [cart]);

//     const renderCheckout = useMemo(() => {
//         return mappedCart?.length > 0 && (
//             <BottomCard
//                 items={mappedCart}
//                 onPress={() => navigation.navigate('Checkout')}
//                 btnTitle='Checkout'
//                 isRight={true}
//                 bottom={0}
//             />
//         )
//     }, [mappedCart]);

//     const renderItem = useCallback(({ item }) => {
//         return (
//             <ProductCard
//                 data={item}
//                 isDelete
//                 tailWidth={160}
//                 ellipsis={true}
//                 onDelete={() => {
//                     setCartData(prev => ({
//                         ...prev,
//                         infoState: {
//                             ...prev.infoState,
//                             delBottomSheet: true,
//                             delItem: item
//                         }
//                     }));
//                 }}
//             />
//         );
//     }, []);

//     const handleDelete = useCallback(() => {
//         console.log('handleDelete', cartData?.infoState?.delItem);
//         dispatch(cartDelete({ id: [cartData?.infoState?.delItem?.product_id] })).then((res) => {
//             console.log('res', res);
//         })
//         // setCartData(prev => ({
//         //     ...prev,
//         //     infoState: {
//         //         ...prev.infoState,
//         //         delBottomSheet: false
//         //     }
//         // }));
//     })

//     return (
//         <SafeAreaView style={styles.container}>
//             <SecondaryHeader isBack onPressBack={() => navigation.goBack()} screenName={'Cart'} />
//             <View style={{ paddingVertical: 20, flex: 1 }}>
//                 {mappedCart?.length > 0 ? (
//                     <FlatList
//                         data={mappedCart}
//                         keyExtractor={(item) => item?.product_id}
//                         renderItem={renderItem}
//                         showsVerticalScrollIndicator={false}
//                         contentContainerStyle={{
//                             paddingBottom: mappedCart?.length > 0 ? 70 : 60
//                         }}
//                     />
//                 ) : (
//                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
//                         <NoCart />
//                         <View style={{ alignItems: 'center', gap: 5 }}>
//                             <Typo style={{ fontSize: FontSize.fontSize16, fontFamily: 'Outfit-Medium' }} title={'Oops...Your Cart is Empty'} />
//                             <Typo style={{ fontSize: FontSize.fontSize14, fontFamily: 'Outfit-Medium', color: ColorPalatte.grey_400 }} title={'Looks like you forgot to shop!'} />
//                         </View>
//                         <ButtonComp type='mediumPrimary' title='Back to Home' onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />
//                     </View>
//                 )}
//                 {renderCheckout}
//             </View>
//             <BottomSheet
//                 visible={cartData?.infoState?.delBottomSheet}
//                 onClose={() => setCartData(prev => ({
//                     ...prev,
//                     infoState: {
//                         ...prev.infoState,
//                         delBottomSheet: false
//                     }
//                 }))}
//                 height={(height * 0.4) - 50}
//             >
//                 <Typo type='h3' title='Delete' />
//                 <Typo type='p' title={`Are you sure you want to delete ${cartData?.infoState?.delItem?.name} from cart?`} />
//                 <View style={{ gap: 15, paddingVertical: 20 }}>
//                     <ButtonComp type='largePrimary' title='Delete' onPress={handleDelete} />
//                     <ButtonComp
//                         type='largeSecondary'
//                         title='Cancel'
//                         onPress={() => setCartData(prev => ({
//                             ...prev,
//                             infoState: {
//                                 ...prev.infoState,
//                                 delBottomSheet: false
//                             }
//                         }))}
//                     />
//                 </View>

//             </BottomSheet>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: ColorPalatte.whiteClr,
//         padding: 20,
//         flex: 1
//     }
// })

// export default CartScreen


import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
    BottomCard,
    BottomSheet,
    ButtonComp,
    ProductCard,
    SecondaryHeader,
    Typo
} from '../../Components';
import { ColorPalatte, FontSize } from '../../Themes';
import { cartDelete } from '../../Redux/Action/Cart';
import { NoCart } from '../../Config/ImgConfig';
import {
    getCartProducts,
    storeCartProducts
} from '../../Hooks/useStoreBulkData';
import { addCart } from '../../Redux/Action/Product';
import { showToast } from '../../Utils/Helper/toastHelper';

const { height } = Dimensions.get('window');

const CartScreen = ({ isCart = true }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [cartData, setCartData] = useState({
        cart: [],
        infoState: {
            delBottomSheet: false,
            delItem: [],
            onRefresh: 0
        }
    });

    useFocusEffect(
        useCallback(() => {
            const loadProducts = async () => {
                const products = await getCartProducts();
                setCartData((prev) => ({
                    ...prev,
                    cart: products
                }));
            };
            loadProducts();
        }, [cartData?.infoState?.onRefresh])
    );

    const mappedCart = useMemo(() => {
        return cartData.cart.map((item) => ({
            ...item,
            product_id: item?.id,
            selected_qty: item?.quantity,
        }));
    }, [cartData.cart]);

    const handleAddCart = () => {
        const items = mappedCart.map((el) => ({
            product_id: el?.product_id,
            quantity: el?.quantity,
            price: el?.price,
            total: el?.price * el?.quantity
        }));
        dispatch(addCart({ cart_add: items })).then((res) => {
            if (res?.payload?.status === 200) {
                navigation.navigate('CheckoutScreen');
            }
        })
    };

    const handleQuantityChange = useCallback((updatedItem) => {
        setCartData((prev) => {
            const updatedCart = prev.cart.map((item) =>
                item?.id === updatedItem?.id ? updatedItem : item
            );

            storeCartProducts(updatedCart);

            return {
                ...prev,
                cart: updatedCart
            };
        });
    }, []);

    const handleDelete = useCallback(() => {
        const productIdToDelete = cartData?.infoState?.delItem?.id;

        const updatedCart = cartData.cart.filter(item => item.id !== productIdToDelete);

        setCartData(prev => ({
            ...prev,
            cart: updatedCart,
            infoState: {
                delBottomSheet: false,
                delItem: []
            }
        }));

        storeCartProducts(updatedCart);
    }, [cartData]);

    const renderItem = useCallback(({ item }) => (
        <ProductCard
            data={item}
            isDelete
            tailWidth={160}
            ellipsis={true}
            onDelete={() => {
                setCartData((prev) => ({
                    ...prev,
                    infoState: {
                        ...prev.infoState,
                        delBottomSheet: true,
                        delItem: item
                    }
                }));
            }}
            onQuantityChange={handleQuantityChange}
        />
    ), [handleQuantityChange]);

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader
                isBack
                onPressBack={() => navigation.goBack()}
                screenName={'Cart'}
                onRefresh={() => {
                    setCartData((prev) => ({
                        ...prev,
                        infoState: {
                            ...prev.infoState,
                            onRefresh: prev.infoState.onRefresh + 1
                        }
                    }));
                }}
            />
            <View style={{ paddingVertical: 20, flex: 1 }}>
                {mappedCart?.length > 0 ? (
                    <FlatList
                        data={mappedCart}
                        keyExtractor={(item) => item?.product_id?.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 70
                        }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <NoCart />
                        <View style={{ alignItems: 'center', gap: 5 }}>
                            <Typo
                                style={{ fontSize: FontSize.fontSize16, fontFamily: 'Outfit-Medium' }}
                                title={'Oops...Your Cart is Empty'}
                            />
                            <Typo
                                style={{ fontSize: FontSize.fontSize14, fontFamily: 'Outfit-Medium', color: ColorPalatte.grey_400 }}
                                title={'Looks like you forgot to shop!'}
                            />
                        </View>
                        <ButtonComp
                            type='mediumPrimary'
                            title='Back to Home'
                            onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}
                        />
                    </View>
                )}

                {mappedCart?.length > 0 && (
                    <BottomCard
                        items={mappedCart}
                        onPress={handleAddCart}
                        btnTitle='Checkout'
                        isRight={true}
                        bottom={0}
                    />
                )}
            </View>

            <BottomSheet
                visible={cartData?.infoState?.delBottomSheet}
                onClose={() =>
                    setCartData((prev) => ({
                        ...prev,
                        infoState: {
                            ...prev.infoState,
                            delBottomSheet: false
                        }
                    }))
                }
                height={(height * 0.4) - 50}
            >
                <Typo type='h3' title='Delete' />
                <Typo
                    type='p'
                    title={`Are you sure you want to delete ${cartData?.infoState?.delItem?.name} from cart?`}
                />
                <View style={{ gap: 15, paddingVertical: 20 }}>
                    <ButtonComp type='largePrimary' title='Delete' onPress={handleDelete} />
                    <ButtonComp
                        type='largeSecondary'
                        title='Cancel'
                        onPress={() =>
                            setCartData((prev) => ({
                                ...prev,
                                infoState: {
                                    ...prev.infoState,
                                    delBottomSheet: false
                                }
                            }))
                        }
                    />
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPalatte.whiteClr,
        padding: 20,
        flex: 1
    }
});

export default CartScreen;
