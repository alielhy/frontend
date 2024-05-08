import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import DomainTemplateTabNavigation from "../../../../../../navigation/drawer/elements/template/DomainTemplateTabNavigation";

const DomainTemplateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <DomainTemplateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DomainTemplateAdmin;
