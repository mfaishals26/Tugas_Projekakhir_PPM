import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('nusastock.db');

export const initDB = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        qty INTEGER NOT NULL,
        price REAL NOT NULL
      );
    `);
    console.log("DB Inisialisasi Berhasil");
  } catch (error) {
    console.error("DB Init Error:", error);
  }
};

export const addItem = (name: string, qty: number, price: number) => {
  return db.runSync('INSERT INTO inventory (name, qty, price) VALUES (?, ?, ?)', [name, qty, price]);
};

export const getAllItems = () => {
  return db.getAllSync('SELECT * FROM inventory');
};

export const updateItem = (id: number, name: string, qty: number, price: number) => {
  return db.runSync(
    'UPDATE inventory SET name = ?, qty = ?, price = ? WHERE id = ?',
    [name, qty, price, id]
  );
};

export const deleteItem = (id: number) => {
  return db.runSync('DELETE FROM inventory WHERE id = ?', [id]);
};