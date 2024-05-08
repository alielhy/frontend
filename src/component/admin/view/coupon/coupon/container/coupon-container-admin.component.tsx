import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import CouponTabNavigation from "../../../../../../navigation/drawer/elements/coupon/CouponTabNavigation";

const CouponAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <CouponTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CouponAdmin;
