import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../../services/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function TabLayout() {
  // Fungsi Logout yang sudah diperbaiki
  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Halo Faishal, apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Ya, Keluar", 
          style: "destructive", 
          onPress: async () => {
            try {
              // Cukup panggil signOut. 
              // Status user akan jadi null, dan _layout.tsx akan otomatis memindahkan ke /login
              await signOut(auth);
              console.log("Firebase: Berhasil logout");
            } catch (error) {
              Alert.alert("Error", "Gagal melakukan logout.");
            }
          } 
        }
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#B2BEC3',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 12,
          paddingTop: 8,
          elevation: 20,
        },
        headerShown: true,
        headerStyle: { backgroundColor: '#2D3436' },
        headerTitleStyle: { color: 'white', fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inventory',
          headerTitle: 'NusaStock Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'cube' : 'cube-outline'} size={26} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={{ marginRight: 20 }}>
              <Ionicons name="log-out-outline" size={24} color="#FF7675" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Insights',
          headerTitle: 'Business Insights',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}