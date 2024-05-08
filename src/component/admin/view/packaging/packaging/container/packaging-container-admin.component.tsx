import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import PackagingTabNavigation from "../../../../../../navigation/drawer/elements/packaging/PackagingTabNavigation";

const PackagingAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <PackagingTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PackagingAdmin;
