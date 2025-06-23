import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, FlatList, View, Alert, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomSheet, ButtonComp, PrimaryHeader, ProductCard, StatusBarComp, TextInput, Typo } from '../../Components';
import { ColorPalatte } from '../../Themes';
import AddCart from './Components/AddCart';
import { showToast } from '../../Utils/Helper/toastHelper';
import { productList } from '../../Redux/Action/Product';
// import useUserData from '../../Hooks/useToken';

const ProductList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const { user } = useUserData();
    const { products, productLoading } = useSelector(state => state.product);
    const [productHome, setProductHome] = useState({
        products: [],
        counts: {},
        pageInfo: {
            loading: false,
            bottomSheet: false
        }
    });

    useFocusEffect(
        useCallback(() => {
            const fetchData = () => {
                dispatch(productList());
            };
            fetchData();
        }, [])
    );

    useEffect(() => {
        if (products?.response?.document?.length > 0) {
            setProductHome((prev) => ({
                ...prev,
                products: products?.response?.document?.map((item) => ({
                    ...item,
                    quantity: 0,
                    items_left: item?.quantity
                })),
                counts: {
                    cartCount: products?.cartCount,
                    notificationCount: products?.notificationCount,
                }
            }));
        }
    }, [products]);

    const handleQuantityChange = useCallback((updatedItem) => {
        setProductHome(prev => ({
            ...prev,
            products: prev.products?.map(item =>
                item.id === updatedItem?.id ? updatedItem : item
            )
        }));
    }, []);

    const cartItems = useMemo(
        () => productHome?.products?.filter(item => item?.quantity > 0),
        [productHome?.products]
    );

    const handleDeleteItem = useCallback(() => {
        setProductHome(prev => ({
            ...prev,
            pageInfo: {
                ...prev.pageInfo,
                bottomSheet: true
            }
        }));
    }, []);

    const renderItem = useCallback(({ item }) => (
        <ProductCard
            data={item}
            // isDelete
            // tailWidth={300}
            ellipsis={false}
            onQuantityChange={handleQuantityChange}
        // onDelete={handleDeleteItem}
        />
    ), [handleQuantityChange, handleDeleteItem]);

    const handleCheckout = useCallback(() => {
        const cartPayload = cartItems?.map(item => ({
            product_id: item?.id,
            quantity: item?.quantity,
        }));

        console.log('cartPayload', cartPayload);
        Alert.alert("Success", "Order placed successfully!");
        navigation.navigate('BottomTab', { screen: 'Cart' });
    }, [cartItems, navigation]);

    const renderAddCart = useCallback(() => {
        return (
            cartItems?.length !== 0 && (
                <AddCart
                    items={cartItems}
                    onViewCart={handleCheckout}
                />
            )
        );
    }, [cartItems, handleCheckout]);

    // const handleDelete = () => {
    //     setProductHome((prev) => ({
    //         ...prev,
    //         pageInfo: { ...prev.pageInfo, bottomSheet: false }
    //     }))
    //     showToast('error', 'Data saved successfully!');
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComp
                backgroundColor={ColorPalatte.whiteClr}
                visible={true}
            />
            <PrimaryHeader
                isNotification={true}
                isCart={true}
                cartCount={productHome?.counts?.cartCount}
                notifyCount={productHome?.counts?.notificationCount}
                onNotifyPress={() => navigation.navigate("BottomTab", { screen: 'Notification' })}
                onCartPress={() => navigation.navigate("BottomTab", { screen: 'Cart' })}
            />

            <View style={{ paddingVertical: 20 }} >
                <TextInput
                    type='search'
                    placeholder='Search'
                />
                <FlatList
                    data={productHome.products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: cartItems?.length !== 0 ? 150 : 60 }}
                />
                {renderAddCart()}
            </View>

            {/* {productHome?.pageInfo?.bottomSheet && (
                <BottomSheet
                    visible={productHome?.pageInfo?.bottomSheet}
                    onClose={() => setProductHome((prev) => ({
                        ...prev,
                        pageInfo: { ...prev.pageInfo, bottomSheet: false }
                    }))}
                    height={height * 0.3}
                >
                    <Typo type='h3' title='Delete' />
                    <View style={{ gap: 15 }}>
                        <Typo type='p' title='Are you sure you want to delete Onion from cart?' />
                        <ButtonComp
                            type='largePrimary'
                            title='Delete'
                            onPress={handleDelete}
                        />
                        <ButtonComp
                            type='largeSecondary'
                            title='Cancel'
                            onPress={(prev) => ({
                                ...prev,
                                pageInfo: { ...prev.pageInfo, bottomSheet: false }
                            })}
                        />
                    </View>
                </BottomSheet>
            )} */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: ColorPalatte.whiteClr,
    },
});

export default ProductList;
