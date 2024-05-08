import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {globalStyle} from "../../../../../../shared/globalStyle";

import ProjectStateTabNavigation from "../../../../../../navigation/drawer/elements/project/ProjectStateTabNavigation";

const ProjectStateAdmin = () => {
  return (
    <SafeAreaView style={globalStyle.myContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }} >
        <ProjectStateTabNavigation />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProjectStateAdmin;
