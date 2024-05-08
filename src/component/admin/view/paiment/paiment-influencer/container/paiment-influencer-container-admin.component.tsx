import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import PaimentInfluencerTabNavigation from "../../../../../../navigation/drawer/elements/paiment/PaimentInfluencerTabNavigation";

const PaimentInfluencerAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <PaimentInfluencerTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaimentInfluencerAdmin;
