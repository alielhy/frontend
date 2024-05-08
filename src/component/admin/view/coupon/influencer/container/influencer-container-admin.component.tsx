import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InfluencerTabNavigation from "../../../../../../navigation/drawer/elements/coupon/InfluencerTabNavigation";

const InfluencerAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InfluencerTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InfluencerAdmin;
