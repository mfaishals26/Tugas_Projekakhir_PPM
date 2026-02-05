import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Alert, StatusBar, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { initDB, addItem, getAllItems, deleteItem, updateItem } from '../../database/db';
import InventoryItem from '../../components/inventoryitem';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    initDB();
    loadItems();
  }, []);

  const loadItems = () => {
    const data = getAllItems();
    setItems(data);
  };

  const totalValue = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.qty * curr.price), 0);
  }, [items]);

  const handleSave = () => {
    if (!name || !qty || !price) {
      Alert.alert('Peringatan', 'Mohon lengkapi semua data barang.');
      return;
    }

    if (editingId) {
      updateItem(editingId, name, parseInt(qty), parseFloat(price));
      setEditingId(null);
    } else {
      addItem(name, parseInt(qty), parseFloat(price));
    }

    setName(''); setQty(''); setPrice('');
    loadItems();
    Keyboard.dismiss();
  };

  const handleEdit = useCallback((item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setQty(item.qty.toString());
    setPrice(item.price.toString());
  }, []);

  const handleDelete = useCallback((id: number) => {
    Alert.alert('Konfirmasi', 'Hapus barang ini dari gudang?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => {
        deleteItem(id);
        loadItems();
      }}
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER & DASHBOARD */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>NusaStock</Text>
          <Text style={styles.headerSubtitle}>Inventory Management System</Text>
        </View>
        <Ionicons name="stats-chart" size={28} color="white" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Total Asset Value</Text>
          <Text style={styles.statsValue}>Rp {totalValue.toLocaleString()}</Text>
          <Text style={styles.statsFooter}>{items.length} Items Registered</Text>
        </View>
      </View>

      {/* FORM INPUT */}
      <View style={styles.formCard}>
        <TextInput 
          style={styles.input} 
          placeholder="Nama Produk" 
          value={name} 
          onChangeText={setName} 
        />
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, { width: '48%' }]} 
            placeholder="Stok" 
            keyboardType="numeric" 
            value={qty} 
            onChangeText={setQty} 
          />
          <TextInput 
            style={[styles.input, { width: '48%' }]} 
            placeholder="Harga" 
            keyboardType="numeric" 
            value={price} 
            onChangeText={setPrice} 
          />
        </View>
        <TouchableOpacity 
          style={[styles.addBtn, editingId ? {backgroundColor: '#2ecc71'} : null]} 
          onPress={handleSave}
        >
          <Ionicons name={editingId ? "checkmark-circle" : "add-circle"} size={20} color="white" />
          <Text style={styles.addBtnText}>{editingId ? "Perbarui Barang" : "Simpan ke Gudang"}</Text>
        </TouchableOpacity>
        
        {editingId && (
          <TouchableOpacity onPress={() => {setEditingId(null); setName(''); setQty(''); setPrice('');}} style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={{color: '#FF7675', fontWeight: '600'}}>Batal Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* LIST DATA */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <InventoryItem item={item} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.listTitle}>Daftar Inventaris Aktif</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { 
    height: hp('16%'), backgroundColor: '#2D3436', 
    paddingTop: hp('5%'), paddingHorizontal: wp('6%'),
    flexDirection: 'row', justifyContent: 'space-between'
  },
  headerTitle: { color: 'white', fontSize: wp('6%'), fontWeight: 'bold' },
  headerSubtitle: { color: '#B2BEC3', fontSize: wp('3%') },
  statsContainer: { marginTop: hp('-4%'), paddingHorizontal: wp('6%'), marginBottom: 20 },
  statsCard: { 
    backgroundColor: 'white', padding: 20, borderRadius: 20,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10,
    borderLeftWidth: 6, borderLeftColor: '#6200ee'
  },
  statsLabel: { color: '#636E72', fontSize: wp('3%'), fontWeight: 'bold' },
  statsValue: { color: '#2D3436', fontSize: wp('6%'), fontWeight: 'bold', marginVertical: 4 },
  statsFooter: { color: '#6200ee', fontWeight: 'bold', fontSize: wp('3%') },
  formCard: { 
    marginHorizontal: wp('6%'), backgroundColor: 'white', padding: 18, 
    borderRadius: 20, marginBottom: 15, elevation: 2 
  },
  input: { 
    backgroundColor: '#F1F2F6', padding: 12, borderRadius: 12, 
    marginBottom: 10, fontSize: wp('3.5%') 
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  addBtn: { 
    backgroundColor: '#6200ee', flexDirection: 'row', 
    justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 12 
  },
  addBtnText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  listContainer: { paddingHorizontal: wp('6%'), paddingBottom: 30 },
  listTitle: { fontSize: wp('4%'), fontWeight: 'bold', color: '#2D3436', marginVertical: 15 }
});