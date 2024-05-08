import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import MemberTabNavigation from "../../../../../../navigation/drawer/elements/collaborator/MemberTabNavigation";

const MemberAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <MemberTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MemberAdmin;
