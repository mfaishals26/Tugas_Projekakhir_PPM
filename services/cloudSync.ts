import { dbCloud, auth } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const syncSQLiteToFirestore = async (items: any[]) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum login");

    // Nama folder/koleksi di Cloud
    const inventoryRef = collection(dbCloud, "inventory_sync");

    // Proses looping: Ambil setiap barang dari SQLite, kirim ke Cloud
    for (const item of items) {
      await addDoc(inventoryRef, {
        userId: user.uid,        // Milik siapa data ini?
        userEmail: user.email,
        itemName: item.name,     // Dari SQLite
        quantity: item.qty,      // Dari SQLite
        price: item.price,       // Dari SQLite
        syncedAt: serverTimestamp() // Waktu server Firebase
      });
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Gagal Sinkronisasi:", error);
    return { success: false, message: error.message };
  }
};