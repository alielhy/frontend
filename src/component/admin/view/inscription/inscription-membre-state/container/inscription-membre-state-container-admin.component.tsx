import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InscriptionMembreStateTabNavigation from "../../../../../../navigation/drawer/elements/inscription/InscriptionMembreStateTabNavigation";

const InscriptionMembreStateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InscriptionMembreStateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionMembreStateAdmin;
