import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import ProjectAdminCreate from "./admin/view/project/project/create/project-create-admin.component";


const HomeScreen = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ]);

  const handleGenerateButtonPress = () => {
    navigation.navigate('ProjectAdminCreate');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Guide to using the code generator */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>How to Use Our Code Generator:</Text>
          <Text style={{ marginBottom: 10 }}>1. Enter your requirements in the search bar below.</Text>
          <Text style={{ marginBottom: 10 }}>2. Swipe through the slides to learn more about the features.</Text>
          <Text style={{ marginBottom: 10 }}>3. Tap the "Generate" button at the bottom when ready to proceed.</Text>
        </View>

        {/* Slides */}
        {/* You can implement slides using a library like react-native-swiper */}

        {/* Generate button */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={handleGenerateButtonPress} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Generate</Text>
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
          />
        </View>

        {/* Footer */}
        <View style={{ backgroundColor: '#f0f0f0', padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Companies That Used Our Generator:</Text>
          {companies.map(company => (
            <Text key={company.id}>{company.name}</Text>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{ backgroundColor: '#ccc', padding: 10, alignItems: 'center' }}>
        <Text>Zynerateur© 2024 </Text>
      </View>
    </View>
  )
}

export default HomeScreen