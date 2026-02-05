// Fungsi logic bisnis yang akan diuji
const calculateAsset = (qty, price) => {
  if (qty < 0 || price < 0) return 0;
  return qty * price;
};

describe('Inventory Business Logic Test', () => {
  test('Menghitung total nilai aset dengan benar', () => {
    expect(calculateAsset(5, 10000)).toBe(50000);
  });

  test('Harus mengembalikan 0 jika jumlah stok negatif', () => {
    expect(calculateAsset(-1, 10000)).toBe(0);
  });

  test('Harus menangani harga nol', () => {
    expect(calculateAsset(10, 0)).toBe(0);
  });
});