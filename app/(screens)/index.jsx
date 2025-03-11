import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Flag from "@/app/(assets)/(Svgicons)/Flag";
import { Colors } from "../(constants)/Colors";
import Checkbox from "expo-checkbox";
import Verify from "@/app/(assets)/(Svgicons)/Checked";
import Google from "@/app/(assets)/(Svgicons)/Google";
import Facebook from "@/app/(assets)/(Svgicons)/Facebook";
import Apple from "@/app/(assets)/(Svgicons)/Apple";
import {requestOtp} from "../(services)/_authService";
import { useFonts } from "expo-font";
 
const Index = () => {

  const [isChecked, setIsChecked] = useState(false);

  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
 
  //function for  request otp...//
  const handleRequestOtp = async () => {
    try {
      await requestOtp(mobile);
      navigation.push('OTPScreen', { mobile });  
    } catch (error) {
      console.error('Failed to request OTP:', error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../(assets)/(images)/Maikisaan_logo.png")}
          style={styles.image}
        />
        <Text style={{ fontSize: 18, fontWeight: "700", padding: 25, fontFamily: 'SpaceMono' }}>
          Enter Phone number for verification
        </Text>
        <View style={styles.searchbar}>
          <Flag />
          <Text style={styles.countryCode}>+91</Text>
          <Text style={styles.divider}>|</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMobile}
            value={mobile}
            placeholder="Enter a Mobile Number.."
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
          />
        </View>
        <View
          style={styles.privacycontainer}
        >
          <Text style={styles.privacyText}>
            Don't Worry! Your Details are safe with us.
          </Text>
          <Verify style={{ marginTop: 10, marginLeft: 8 }} />
        </View>

        <View style={styles.checkboxcontainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: "#007BFF", false: "#757575" }}
          />
          <Text style={styles.label}>
            I accept all the Terms and Privacy Policy
          </Text>
        </View>
        {/* <Text style={styles.text}>{isChecked ? "Checked!" : "Unchecked"}</Text> */}
        <View style={styles.linestyle}>
          <View style={styles.line} />
          <Text style={styles.ORtext}>Or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.iconcontainer}>
          <Google
            style={styles.iconWithShadow}
          />
          <Facebook
            style={styles.iconWithShadow}
          />
          <Apple
            style={styles.iconWithShadow}
          />
        </View>
        <View style={styles.Nextcontainer}>
          <TouchableOpacity style={styles.Nextbutton}  onPress={handleRequestOtp}>
            <Text style={styles.Nexttext} >Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:Colors.White,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  maintext: {
    color: "black",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    width: "90%",
    borderColor: "#137A3D",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 20,
    fontFamily: "Poppins",
    marginLeft: 4,
  },
  divider: {
    fontSize: 28,
    marginHorizontal: 8,
    fontWeight: "300",
    height: 30,
    lineHeight: 30,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    color: "black",
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  privacycontainer:
  {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10
  },

  privacyText: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 400,
    color: "#000000",
  },
  checkboxcontainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 50     // accept line container //
  },
  label: {
    paddingLeft: 8
  },
  linestyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  line: {
    flex: 1,
    alignSelf: "center",
    height: 1.5,
    backgroundColor: '#000000',
  },
  ORtext: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 600,    //  Or..............//
    color: '#000000',
  },

  iconcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  iconWithShadow: {
    margin: 40       // SPACE BETWEEN ICONS.................//
  },
  Nextcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  Nextbutton: {
    borderWidth: 1,
    backgroundColor: Colors.Green,
    height: 50,
    width: 300,
    borderRadius: 40,
    borderColor:  Colors.Green,
    justifyContent: 'center', 
    alignItems: 'center'      // Add this to center text horizontal
  },
  Nexttext: {
    color:  Colors.White,
    fontSize: 20
  }
});

export default Index;
