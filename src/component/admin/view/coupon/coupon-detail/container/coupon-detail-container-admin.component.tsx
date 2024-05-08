import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import CouponDetailTabNavigation from "../../../../../../navigation/drawer/elements/coupon/CouponDetailTabNavigation";

const CouponDetailAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <CouponDetailTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CouponDetailAdmin;
