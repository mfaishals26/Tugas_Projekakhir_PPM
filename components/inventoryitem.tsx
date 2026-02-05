import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

interface ItemProps {
  item: any;
  onDelete: (id: number) => void;
  onEdit: (item: any) => void;
}

const InventoryItem = React.memo(({ item, onDelete, onEdit }: ItemProps) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(100)} 
      layout={Layout.springify()} 
      style={styles.card}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="cube-outline" size={24} color="#6200ee" />
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.qty} Unit</Text>
          </View>
          <Text style={styles.price}>@ Rp {item.price.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.actionGroup}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
          <Ionicons name="pencil" size={20} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionBtn}>
          <Ionicons name="trash-bin" size={20} color="#FF7675" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F2F6',
  },
  iconContainer: { 
    width: 45, height: 45, borderRadius: 12, 
    backgroundColor: '#F1F2F6', justifyContent: 'center', alignItems: 'center' 
  },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: wp('4%'), fontWeight: 'bold', color: '#2D3436' },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: '#E1E8EE' },
  tagText: { fontSize: wp('3%'), color: '#636E72', fontWeight: 'bold' },
  price: { marginLeft: 10, fontSize: wp('3.2%'), color: '#6200ee', fontWeight: '600' },
  actionGroup: { flexDirection: 'row' },
  actionBtn: { padding: 8, marginLeft: 5 }
});

export default InventoryItem;