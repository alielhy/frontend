import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InscriptionCollaboratorTabNavigation from "../../../../../../navigation/drawer/elements/inscription/InscriptionCollaboratorTabNavigation";

const InscriptionCollaboratorAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InscriptionCollaboratorTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionCollaboratorAdmin;
