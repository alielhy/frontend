import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import ProjectTemplateTabNavigation from "../../../../../../navigation/drawer/elements/template/ProjectTemplateTabNavigation";

const ProjectTemplateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <ProjectTemplateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProjectTemplateAdmin;
