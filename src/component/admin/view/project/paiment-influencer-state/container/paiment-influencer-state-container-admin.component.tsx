import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import PaimentInfluencerStateTabNavigation from "../../../../../../navigation/drawer/elements/project/PaimentInfluencerStateTabNavigation";

const PaimentInfluencerStateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <PaimentInfluencerStateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaimentInfluencerStateAdmin;
