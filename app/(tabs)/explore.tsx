import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAllItems } from '../../database/db';
import { syncSQLiteToFirestore } from '../../services/cloudSync';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';

export default function ExploreScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Ambil data terbaru dari SQLite tiap kali tab dibuka
  useFocusEffect(
    useCallback(() => {
      const data = getAllItems();
      setItems(data);
    }, [])
  );

  // Logika Analitik Bisnis
  const stats = useMemo(() => {
    const outOfStock = items.filter(i => i.qty === 0).length;
    const lowStock = items.filter(i => i.qty > 0 && i.qty <= 5).length;
    const mostExpensive = items.length > 0 
      ? [...items].sort((a, b) => b.price - a.price)[0].name 
      : "-";

    return { outOfStock, lowStock, mostExpensive };
  }, [items]);

  // FUNGSI SINKRONISASI REAL KE FIREBASE
  const handleCloudSync = () => {
    if (items.length === 0) {
      Alert.alert("Data Kosong", "Tidak ada data di SQLite untuk dicadangkan.");
      return;
    }

    Alert.alert(
      "Cloud Backup", 
      `Cadangkan ${items.length} item ke Firebase Cloud sekarang?`,
      [
        { text: "Nanti", style: "cancel" },
        { 
          text: "Sinkronkan", 
          onPress: async () => {
            setIsSyncing(true);
            const result = await syncSQLiteToFirestore(items);
            setIsSyncing(false);

            if (result.success) {
              Alert.alert("Berhasil!", "Data dari SQLite Faishal telah terunggah ke Firestore Cloud.");
            } else {
              Alert.alert("Gagal Sinkron", result.message);
            }
          } 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Insights</Text>
        <Text style={styles.headerSubtitle}>Analisis operasional gudang Faishal</Text>
      </View>

      <View style={styles.grid}>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.card, { backgroundColor: '#FF7675' }]}>
          <Ionicons name="alert-circle" size={30} color="white" />
          <Text style={styles.cardValue}>{stats.outOfStock}</Text>
          <Text style={styles.cardLabel}>Stok Habis</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={[styles.card, { backgroundColor: '#FAB1A0' }]}>
          <Ionicons name="warning" size={30} color="white" />
          <Text style={styles.cardValue}>{stats.lowStock}</Text>
          <Text style={styles.cardLabel}>Stok Menipis</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(300)} style={styles.longCard}>
        <View style={styles.longCardIcon}>
          <Ionicons name="trophy" size={24} color="#6200ee" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.longCardTitle}>Produk Termahal</Text>
          <Text style={styles.longCardValue} numberOfLines={1}>{stats.mostExpensive}</Text>
        </View>
      </Animated.View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cloud Services</Text>
        <TouchableOpacity 
          style={[styles.syncBtn, isSyncing && { opacity: 0.7 }]} 
          onPress={handleCloudSync}
          disabled={isSyncing}
        >
          <View style={styles.syncContent}>
            {isSyncing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Ionicons name="cloud-upload" size={24} color="white" />
            )}
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.syncTitle}>
                {isSyncing ? "Menyinkronkan..." : "Cloud Sync & Backup"}
              </Text>
              <Text style={styles.syncSub}>Kirim Data ke Firebase Firestore</Text>
            </View>
          </View>
          {!isSyncing && <Ionicons name="chevron-forward" size={20} color="white" />}
        </TouchableOpacity>
      </View>

      <View style={styles.footerSection}>
        <Text style={styles.sectionTitle}>Tips Bisnis</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>"Sistem Hybrid Storage mendeteksi {items.length} item siap disinkronkan."</Text>
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { padding: 30, backgroundColor: '#2D3436', paddingTop: hp('7%') },
  headerTitle: { color: 'white', fontSize: wp('6%'), fontWeight: 'bold' },
  headerSubtitle: { color: '#B2BEC3', fontSize: wp('3.5%') },
  grid: { flexDirection: 'row', justifyContent: 'space-between', padding: wp('6%') },
  card: { width: wp('42%'), padding: 20, borderRadius: 20, elevation: 5 },
  cardValue: { color: 'white', fontSize: 28, fontWeight: 'bold', marginVertical: 5 },
  cardLabel: { color: 'white', fontSize: 12, fontWeight: '600', opacity: 0.9 },
  longCard: { marginHorizontal: wp('6%'), backgroundColor: 'white', padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E1E8EE' },
  longCardIcon: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F1F2F6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  longCardTitle: { color: '#636E72', fontSize: 12, fontWeight: 'bold' },
  longCardValue: { color: '#2D3436', fontSize: 16, fontWeight: 'bold' },
  section: { marginTop: 30, paddingHorizontal: wp('6%') },
  sectionTitle: { fontSize: wp('4%'), fontWeight: 'bold', color: '#2D3436', marginBottom: 15 },
  syncBtn: { backgroundColor: '#6200ee', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  syncContent: { flexDirection: 'row', alignItems: 'center' },
  syncTitle: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  syncSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  footerSection: { marginTop: 30, paddingHorizontal: wp('6%') },
  tipCard: { backgroundColor: '#DFE6E9', padding: 20, borderRadius: 15, borderLeftWidth: 5, borderLeftColor: '#6200ee' },
  tipText: { fontStyle: 'italic', color: '#2D3436', lineHeight: 20 }
});