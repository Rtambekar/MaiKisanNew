import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { useRouter } from 'expo-router';

const LanguageSelection = ({ navigation }) => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    router.replace('/Explore');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Your Language</Text>
      
      <View style={styles.languageContainer}>
        <TouchableOpacity 
          style={[styles.languageButton, selectedLanguage === "English" && styles.selected]}
          onPress={() => handleSelectLanguage("English")}
        >
          <Text style={styles.languageText}>E</Text>
        </TouchableOpacity>
        <Text style={styles.label}>English</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.languageContainer}>
          <TouchableOpacity 
            style={[styles.languageButton, selectedLanguage === "Hindi" && styles.selected]}
            onPress={() => handleSelectLanguage("Hindi")}
          >
            <Text style={styles.languageText}>ह</Text>
          </TouchableOpacity>
          <Text style={styles.label}>हिंदी</Text>
        </View>

        <View style={styles.languageContainer}>
          <TouchableOpacity 
            style={[styles.languageButton, selectedLanguage === "Marathi" && styles.selected]}
            onPress={() => handleSelectLanguage("Marathi")}
          >
            <Text style={styles.languageText}>म</Text>
          </TouchableOpacity>
          <Text style={styles.label}>मराठी</Text>
        </View>
      </View>

      {/* <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => navigation.navigate("/explore")}
        disabled={!selectedLanguage}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  languageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  languageButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.Green,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    borderWidth: 3,
    borderColor: "#000",
  },
  languageText: {
    fontSize: 30,
    color:  Colors.White,
    fontWeight: "bold",
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: Colors.Green,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  nextButtonText: {
    color:  Colors.White,
    fontSize: 18,
    fontWeight: "bold",
  },
});