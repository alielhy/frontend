import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import CategoryPackagingTabNavigation from "../../../../../../navigation/drawer/elements/category/CategoryPackagingTabNavigation";

const CategoryPackagingAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <CategoryPackagingTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CategoryPackagingAdmin;
