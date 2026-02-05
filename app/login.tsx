import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Kosong", "Email dan password wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      // REAL FIREBASE SIGN IN
      await signInWithEmailAndPassword(auth, email, password);
      // Navigasi otomatis di-handle oleh _layout.tsx
    } catch (error: any) {
      console.log(error.code);
      let msg = "Terjadi kesalahan login.";
      if (error.code === 'auth/invalid-credential') msg = "Email atau password salah.";
      if (error.code === 'auth/network-request-failed') msg = "Periksa koneksi internet Anda.";
      
      Alert.alert("Login Gagal", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="cube" size={80} color="#6200ee" />
        <Text style={styles.title}>NusaStock</Text>
        <Text style={styles.subtitle}>Inventory Management System</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="email@example.com" 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Password minimal 6 karakter" 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginBtnText}>SIGN IN TO SYSTEM</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Muhammad Faishal Setiawan - TI23F - 20230040146</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: wp('10%'), justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: hp('5%') },
  title: { fontSize: wp('8%'), fontWeight: 'bold', color: '#2D3436' },
  subtitle: { color: '#636E72', fontSize: wp('3.5%') },
  form: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#2D3436' },
  input: { backgroundColor: '#F1F2F6', padding: 15, borderRadius: 12, marginBottom: 20, fontSize: 16 },
  loginBtn: { backgroundColor: '#6200ee', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  footer: { textAlign: 'center', marginTop: hp('5%'), color: '#B2BEC3', fontSize: 12 }
});