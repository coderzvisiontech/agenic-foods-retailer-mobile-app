import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ColorPalatte, FontSize } from '../../Themes';
import { NotifyTag, DownIcon, UpIcon, DeleteIcon, OrderPacked, OrderDelivered, OrderOntheway } from '../../Config/ImgConfig';
import { Typo } from "../../Components";

const NotificationCard = ({ notifyData, onDeleteNotify, onToggleExpand, details, status }) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteContainer} onPress={onDeleteNotify}>
      <DeleteIcon color={ColorPalatte.whiteClr} />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.container} onPress={onToggleExpand} activeOpacity={0.8}>
        <View style={styles.tag}>
          {notifyData?.message === 'Order packed' ? <OrderPacked /> : notifyData?.message === 'Order Delivered' ? <OrderDelivered /> : notifyData?.message === 'Out of delivery' ? <OrderOntheway /> : <NotifyTag />}
        </View>

        <View style={{ flex: 1, gap: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Typo style={styles.header} title={notifyData?.message} />
              <Typo style={styles.subHead} title={notifyData?.time} />
            </View>
            <View>
              {status && details ? <UpIcon /> : <DownIcon />}
            </View>
          </View>

          {status && details && (
            <View style={styles.expandedBox}>
              <Typo style={styles.expandedText} title={`Status : ${notifyData?.title}`} />
              <Typo style={styles.expandedText} title={`Title : ${notifyData?.message}`} />
              <Typo style={styles.expandedText} title={`Time : ${notifyData?.time}`} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalatte.bgClr,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  tag: {
    backgroundColor: ColorPalatte.whiteClr,
    height: 36,
    width: 36,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Outfit-SemiBold',
  },
  subHead: {
    fontFamily: 'Outfit-Medium',
    color: ColorPalatte.secondaryTxt,
    fontSize: FontSize.fontSize12,
  },
  expandedBox: {
    backgroundColor: ColorPalatte.primaryClr_50,
    borderRadius: 8,
    padding: 10,
    borderColor: ColorPalatte.primaryClr,
    borderWidth: 1,
    marginTop: 5,
  },
  expandedText: {
    color: ColorPalatte.secondaryTxt,
    fontSize: FontSize.fontSize12,
    marginBottom: 5,
  },
  deleteContainer: {
    backgroundColor: ColorPalatte.errorclr,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default NotificationCard;
