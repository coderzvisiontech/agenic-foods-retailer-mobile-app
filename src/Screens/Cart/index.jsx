import React, { useCallback, useMemo, useState } from 'react'
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { BottomCard, BottomSheet, ButtonComp, ProductCard, SecondaryHeader, Typo } from '../../Components'
import { ColorPalatte } from '../../Themes'
import { cartDelete, cartList } from '../../Redux/Action/Cart'
import { NoOrder } from '../../Config/ImgConfig'

const { height } = Dimensions.get('window');

const CartScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);
    const [cartData, setCartData] = useState({
        infoState: {
            delBottomSheet: false,
            delItem: []
        }
    });

    useFocusEffect(
        useCallback(() => {
            dispatch(cartList());
        }, [])
    );

    const mappedCart = useMemo(() => {
        return cart?.response?.map((item) => ({
            userId: item?.id,
            selected_qty: item?.selectedQuantity,
            product_id: item?.product?.id,
            image: item?.product?.image,
            name: item?.product?.name,
            price: item?.product?.price,
            total_qty: item?.product?.totalQuantity,
            unit: item?.product?.unit,
            items_left: item?.product?.totalQuantity,
            quantity: item?.selectedQuantity,
        })) || [];
    }, [cart]);
    console.log('cart', cart);

    const renderCheckout = useMemo(() => {
        return mappedCart?.length > 0 && (
            <BottomCard
                items={mappedCart}
                onPress={() => navigation.navigate('Checkout')}
                btnTitle='Checkout'
                isRight={true}
                bottom={0}
            />
        )
    }, [mappedCart]);

    const renderItem = useCallback(({ item }) => {
        return (
            <ProductCard
                data={item}
                isDelete
                tailWidth={160}
                ellipsis={true}
                onDelete={() => {
                    setCartData(prev => ({
                        ...prev,
                        infoState: {
                            ...prev.infoState,
                            delBottomSheet: true,
                            delItem: item
                        }
                    }));
                }}
            />
        );
    }, []);

    const handleDelete = useCallback(() => {
        console.log('handleDelete', cartData?.infoState?.delItem);
        dispatch(cartDelete({ id: [cartData?.infoState?.delItem?.product_id] })).then((res) => {
            console.log('res', res);
        })
        // setCartData(prev => ({
        //     ...prev,
        //     infoState: {
        //         ...prev.infoState,
        //         delBottomSheet: false
        //     }
        // }));
    })

    return (
        <SafeAreaView style={styles.container}>
            <SecondaryHeader isBack onPressBack={() => navigation.goBack()} screenName={'Cart'} />
            <View style={{ paddingVertical: 20, flex: 1 }}>
                {mappedCart?.length > 0 ? (
                    <FlatList
                        data={mappedCart}
                        keyExtractor={(item) => item?.product_id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: mappedCart?.length > 0 ? 70 : 60
                        }}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <NoOrder />
                    </View>
                )}
                {renderCheckout}
            </View>
            <BottomSheet
                visible={cartData?.infoState?.delBottomSheet}
                onClose={() => setCartData(prev => ({
                    ...prev,
                    infoState: {
                        ...prev.infoState,
                        delBottomSheet: false
                    }
                }))}
                height={(height * 0.4) - 50}
            >
                <Typo type='h3' title='Delete' />
                <Typo type='p' title={`Are you sure you want to delete ${cartData?.infoState?.delItem?.name} from cart?`} />
                <View style={{ gap: 15, paddingVertical: 20 }}>
                    <ButtonComp type='largePrimary' title='Delete' onPress={handleDelete} />
                    <ButtonComp
                        type='largeSecondary'
                        title='Cancel'
                        onPress={() => setCartData(prev => ({
                            ...prev,
                            infoState: {
                                ...prev.infoState,
                                delBottomSheet: false
                            }
                        }))}
                    />
                </View>

            </BottomSheet>
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

export default CartScreen
