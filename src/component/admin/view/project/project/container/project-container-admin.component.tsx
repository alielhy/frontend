import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import ProjectTabNavigation from "../../../../../../navigation/drawer/elements/project/ProjectTabNavigation";

const ProjectAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <ProjectTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProjectAdmin;
