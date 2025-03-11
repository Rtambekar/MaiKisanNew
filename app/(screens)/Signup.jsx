import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from 'react-native';
import {createBusiness} from "../(services)/_businessService";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "../(constants)/Colors";
import { Picker } from '@react-native-picker/picker';

const Signup = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        company_name: '',
        address: '',
        city: '',
        district: '',
        state: '',
        pin_code: '',
        current_location: '',
        business_type: 'buyer',
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });  // spread operator change the required feilds only.
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            // Fetch token directly inside this function before calling createBusiness
            const token = await AsyncStorage.getItem('authToken');

            if (!token) {
                Alert.alert('Error', 'You are not authenticated. Please log in again.');
                return;  // Stop if token is missing.................
            }

            const response = await createBusiness(formData, token);
            Alert.alert('Success', 'Business created successfully!');
            router.replace('/LanguageSelection');


        } catch (error) {
            Alert.alert('Error', error?.response?.data?.detail || 'Failed to create business. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {              //check presence of token in the application passed from otpscreen to here at first run.......
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
        };

        checkToken();
    }, []);

    // List of Indian states
    const indianStates = [
        'Select State', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];

    // Simple districts 
    const districtMap = {
        'Maharashtra': ['Select District', 'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
        'Karnataka': ['Select District', 'Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
        'Tamil Nadu': ['Select District', 'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy']

    };
    // Simple cities mapping 
    const cityMap = {
        'Mumbai': ['Select City', 'Mumbai City', 'Navi Mumbai', 'Thane'],
        'Pune': ['Select City', 'Pune City', 'Pimpri-Chinchwad', 'Khadki'],
        'Bangalore': ['Select City', 'Bangalore Central', 'Whitefield', 'Electronic City'],
        'Chennai': ['Select City', 'Chennai Central', 'Adyar', 'T. Nagar']
    };


    // USer can select district and city on form depending upon State selection before .........//

    const getDistricts = () => {
        return districtMap[formData.state] || ['Select District'];
    };
    const getCities = () => {
        return cityMap[formData.district] || ['Select City'];
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create Business Profile</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                        value={formData.full_name}
                        onChangeText={(value) => handleChange('full_name', value)}
                        placeholder="Enter Full Name"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Company Name</Text>
                    <TextInput
                        value={formData.company_name}
                        onChangeText={(value) => handleChange('company_name', value)}
                        placeholder="Enter Company Name"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput
                        value={formData.address}
                        onChangeText={(value) => handleChange('address', value)}
                        placeholder="Enter Address"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>State</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.state}
                            onValueChange={(value) => handleChange('state', value)}
                            style={styles.picker}
                        >
                            {indianStates.map((state, index) => (
                                <Picker.Item key={index} label={state} value={state} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>District</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.district}  // Current selected district
                            onValueChange={(value) => handleChange('district', value)}  // Update district on change
                            style={styles.picker}
                            enabled={formData.state !== 'Select State' && formData.state !== ''} // Enable only if state is selected
                        >
                            {getDistricts().map((district, index) => (
                                <Picker.Item key={index} label={district} value={district} />
                            ))}
                        </Picker>

                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>City</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.city}
                            onValueChange={(value) => handleChange('city', value)}
                            style={styles.picker}
                            enabled={formData.district !== 'Select District' && formData.district !== ''}
                        >
                            {getCities().map((city, index) => (
                                <Picker.Item key={index} label={city} value={city} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Pin Code</Text>
                    <TextInput
                        value={formData.pin_code}
                        onChangeText={(value) => handleChange('pin_code', value)}
                        placeholder="Enter Pin Code"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Current Location</Text>
                    <TextInput
                        value={formData.current_location}
                        onChangeText={(value) => handleChange('current_location', value)}
                        placeholder="Enter Current Location"
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.businessTypeContainer}>
                    <Text style={styles.businessTypeLabel}>Business Type</Text>
                    <View style={styles.businessTypeButtons}>
                        {['buyer', 'farmer', 'manufracturer'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.businessTypeButton,
                                    formData.business_type === type && styles.businessTypeButtonActive
                                ]}
                                onPress={() => handleChange('business_type', type)}
                            >
                                <Text
                                    style={[
                                        styles.businessTypeText,
                                        formData.business_type === type && styles.businessTypeTextActive
                                    ]}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.registerContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.registerButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={Colors.White} />
                        ) : (
                            <Text style={styles.registerText}>Register</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 16
    },
    header: {
        marginBottom: 20,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.Green,
        textAlign: 'center',
    },
    formContainer: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
        color: '#333',
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.Green,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.Green,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    businessTypeContainer: {
        marginVertical: 16,
    },
    businessTypeLabel: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
        color: '#333',
    },
    businessTypeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    businessTypeButton: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.Green,
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    businessTypeButtonActive: {
        backgroundColor: Colors.Green,
    },
    businessTypeText: {
        color: Colors.Green,
        fontWeight: '600',
        fontSize: 16,
    },
    businessTypeTextActive: {
        color: Colors.White,
    },
    registerContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: Colors.Green,
        height: 50,
        width: 350,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    registerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.White,
    }
});

export default Signup;