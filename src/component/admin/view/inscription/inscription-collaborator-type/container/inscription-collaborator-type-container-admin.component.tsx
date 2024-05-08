import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import InscriptionCollaboratorTypeTabNavigation from "../../../../../../navigation/drawer/elements/inscription/InscriptionCollaboratorTypeTabNavigation";

const InscriptionCollaboratorTypeAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <InscriptionCollaboratorTypeTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionCollaboratorTypeAdmin;
