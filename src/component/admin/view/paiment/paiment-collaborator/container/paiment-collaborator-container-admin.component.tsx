import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import PaimentCollaboratorTabNavigation from "../../../../../../navigation/drawer/elements/paiment/PaimentCollaboratorTabNavigation";

const PaimentCollaboratorAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <PaimentCollaboratorTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaimentCollaboratorAdmin;
