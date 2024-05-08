import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import CollaboratorTabNavigation from "../../../../../../navigation/drawer/elements/collaborator/CollaboratorTabNavigation";

const CollaboratorAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <CollaboratorTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CollaboratorAdmin;
