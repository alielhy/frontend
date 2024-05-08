import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import CategoryProjectTemplateTabNavigation from "../../../../../../navigation/drawer/elements/template/CategoryProjectTemplateTabNavigation";

const CategoryProjectTemplateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <CategoryProjectTemplateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CategoryProjectTemplateAdmin;
