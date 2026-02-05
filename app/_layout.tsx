import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const segments = useSegments();

  // 1. Monitor status Firebase secara real-time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // 2. Logika Navigasi Otomatis (Satpam)
  useEffect(() => {
    if (initializing) return;

    // Cek apakah user saat ini berada di dalam folder (tabs)
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && inTabsGroup) {
      // JIKA LOGOUT: Jika tidak ada user tapi posisi di dashboard, PAKSA ke login
      console.log("Satpam: User tidak ada, tendang ke login");
      router.replace('/login');
    } else if (user && segments[0] === 'login') {
      // JIKA LOGIN: Jika ada user tapi posisi di login, pindahkan ke dashboard
      console.log("Satpam: User ada, masukkan ke dashboard");
      router.replace('/(tabs)');
    }
  }, [user, segments, initializing]);

  // Loading Screen saat aplikasi pertama kali dibuka
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FD' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}