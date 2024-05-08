import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-native-datepicker';

const CustomInput = ({
  control,
  name,
  placeholder,
  keyboardT,
  isBoolean = false,
  isDate = false,
  isTextArea = false,
  placeholderTextColor = 'grey', // Default placeholder text color
}) => {
  if (isBoolean) {
    return (
      <Controller
        control={control}
        render={({ field }) => (
          <View style={styles.container}>
            <Text>{placeholder}</Text>
            <Switch value={field.value} onValueChange={field.onChange} />
          </View>
        )}
        name={name}
      />
    );
  } else if (isDate) {
    return (
      <Controller
        control={control}
        render={({ field }) => (
          <View style={styles.container}>
            <Text>{placeholder}</Text>
            <DatePicker
              date={field.value}
              mode="date"
              placeholder={placeholder}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => field.onChange(date)}
            />
          </View>
        )}
        name={name}
      />
    );
  } else if (isTextArea) {
    return (
      <Controller
        control={control}
        render={({ field }) => (
          <View style={styles.container}>
            <TextInput
              placeholder={placeholder}
              value={field.value}
              onChangeText={field.onChange}
              multiline={true}
              style={[styles.input]}
              keyboardType={keyboardT}
              placeholderTextColor={placeholderTextColor} // Added placeholder text color
            />
          </View>
        )}
        name={name}
      />
    );
  } else {
    return (
      <Controller
        control={control}
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <>
            <View
              style={[
                styles.container,
                { borderColor: error ? 'red' : '#e8e8e8' },
              ]}
            >
              <TextInput
                placeholder={placeholder}
                value={field.value === null ? '' : String(field.value)}
                onChangeText={field.onChange}
                style={[
                  styles.input,
                  error && { borderColor: 'red' },
                ]}
                keyboardType={keyboardT}
                placeholderTextColor={placeholderTextColor} // Added placeholder text color
              />
            </View>
            {error && (
              <Text style={{ color: 'red', bottom: 0, alignSelf: "center"}}>
                {'Required'}
              </Text>
            )}
          </>
        )}
        name={name}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderColor: "#000000",
    shadowColor: "#000000",
    elevation: 10,
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.2,
    borderStyle:"solid",
    borderRadius: 80,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    color: 'black',
    fontSize: 12,
  },
});

export default CustomInput;
