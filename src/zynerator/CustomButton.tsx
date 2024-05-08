import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {}
            ]}>

            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {}
            ]}>{text}</Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '20%',
        padding: 15,
        marginVertical: 15,
        marginHorizontal: 15,
        alignSelf: "flex-end",
        borderRadius: 7,
        alignItems: "center",
        shadowColor: "black",
       shadowOffset: {width: 2, height: 3},
       shadowOpacity: 0.3,
       elevation: 10,
    },
    container_PRIMARY: {
        backgroundColor: '#d32f2f', // Dark red background
    },
    container_SECONDARY: {
        backgroundColor: 'transparent',
        borderColor: '#d32f2f', // Dark red border
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        color: '#ffffff', // White text color
    },
    text_SECONDARY: {
        color: '#d32f2f', // Dark red text color for secondary button
    },
});

export default CustomButton;
