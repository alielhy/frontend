import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InscriptionCollaboratorStateTabNavigation from "../../../../../../navigation/drawer/elements/inscription/InscriptionCollaboratorStateTabNavigation";

const InscriptionCollaboratorStateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InscriptionCollaboratorStateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionCollaboratorStateAdmin;
