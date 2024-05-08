import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InscriptionMembreTabNavigation from "../../../../../../navigation/drawer/elements/inscription/InscriptionMembreTabNavigation";

const InscriptionMembreAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InscriptionMembreTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionMembreAdmin;
