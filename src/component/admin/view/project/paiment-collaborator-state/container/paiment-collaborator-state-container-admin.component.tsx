import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import PaimentCollaboratorStateTabNavigation from "../../../../../../navigation/drawer/elements/project/PaimentCollaboratorStateTabNavigation";

const PaimentCollaboratorStateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <PaimentCollaboratorStateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaimentCollaboratorStateAdmin;
