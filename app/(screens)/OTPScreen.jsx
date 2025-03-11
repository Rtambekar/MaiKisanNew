import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { Colors } from "../(constants)/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyOtp} from "../(services)/_authService";
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const OTPScreen = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const navigation = useNavigation();
    const { mobile } = useLocalSearchParams();

    const handleVerifyOtp = async () => {
        if (otp.length < 6) {
            Alert.alert('Invalid OTP', 'Please enter a valid OTP code');
            return;
        }

        try {
            setIsLoading(true);

            // Clear old token (optional safety).............
            await AsyncStorage.removeItem('authToken');

            const result = await verifyOtp(mobile, otp);

            // get new token here after verification..........
            await AsyncStorage.setItem('authToken', result.token);

            // Confirm token is saved correctly
            const savedToken = await AsyncStorage.getItem('authToken');
           

            if (result.business && (result.has_buyer_profile || result.has_farmer_profile || result.has_manufacturer_profile)) 
            {

                //navigate to homescreen (explore)....
                navigation.replace('explore'); 
            } else {
                // navigate to Buisness Create(signup for now)......
                navigation.replace('Signup');
            }
        } catch (error) {
            Alert.alert('Verification Failed', 'The OTP you entered is incorrect. Please try again.');
            console.error('Failed to verify OTP:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    //   const handleResendOtp = () => {
    //     // Implement OTP resend functionality here
    //     // For now, just reset the timer
    //     setTimeLeft(30);
    //     Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number');
    //   };

    //   const formatMobile = (number) => {
    //     if (!number) return '';
    //     const last4 = number.slice(-4);
    //     return `XXXXXX${last4}`;
    //   };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}   //back to index(login).......
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="shield-checkmark" size={80} color="#19A047" />
                    </View>

                    <Text style={styles.title}>Verify Your Number</Text>

                    <Text style={styles.subtitle}>
                        We've sent a verification code to
                    </Text>

                    <Text style={styles.phoneNumber}>
                        {mobile}
                    </Text>

                    <View style={styles.otpContainer}>
                        <TextInput
                            style={styles.otpInput}
                            value={otp}
                            onChangeText={setOtp}
                            placeholder="Enter OTP"
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus={true}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.verifyButton}
                        onPress={handleVerifyOtp}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.verifyButtonText}>Verify OTP</Text>
                        )}
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
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
        backgroundColor: Colors.White,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 5,
    },
    phoneNumber: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 40,
    },
    otpContainer: {
        width: "100%",
        marginBottom: 30,
    },
    otpInput: {
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        padding: 18,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        letterSpacing: 8,
        color: "#333",
    },
    verifyButton: {
        backgroundColor: Colors.Green,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: "100%",
        alignItems: "center",
        shadowColor: "#4A90E2",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    verifyButtonText: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: "600",
    },
    // resendContainer: {
    //     flexDirection: "row",
    //     marginTop: 25,
    //     alignItems: "center",
    // },
    // resendText: {
    //     fontSize: 16,
    //     color: "#666",
    // },
    // resendButton: {
    //     color: "#4A90E2",
    //     fontSize: 16,
    //     fontWeight: "600",
    // },
    // timerText: {
    //     color: "#999",
    //     fontSize: 16,
    // },
});

export default OTPScreen;