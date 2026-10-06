import React, { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./style";

// 1. Menerapkan Type / Interface
interface TiketKereta {
  id: string;
  namaKereta: string;
  kelas: string;
  jamBerangkat: string;
  harga: number;
}

// 2. Menerapkan Array of Objects
const daftarTiket: TiketKereta[] = [
  {
    id: "1",
    namaKereta: "Argo Bromo Anggrek",
    kelas: "Eksekutif",
    jamBerangkat: "08:00",
    harga: 450000,
  },
  {
    id: "2",
    namaKereta: "Matarmaja",
    kelas: "Ekonomi",
    jamBerangkat: "10:30",
    harga: 150000,
  },
  {
    id: "3",
    namaKereta: "Gajayana",
    kelas: "Eksekutif",
    jamBerangkat: "15:00",
    harga: 550000,
  },
  {
    id: "4",
    namaKereta: "Pasundan",
    kelas: "Ekonomi",
    jamBerangkat: "18:15",
    harga: 120000,
  },
];

export default function Index() {
  // STATE: Menyimpan jumlah tiket tiap kereta
  const [jumlahTiket, setJumlahTiket] = useState<{ [key: string]: number }>({});

  // Fungsi Tambah Tiket (+)
  const tambahTiket = (id: string) => {
    setJumlahTiket((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Fungsi Kurang Tiket (-)
  const kurangTiket = (id: string) => {
    setJumlahTiket((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // 3. Menerapkan Custom Function
  const renderTicketCard = ({ item }: { item: TiketKereta }) => {
    const qty = jumlahTiket[item.id] || 1;
    const totalHarga = item.harga * qty;

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.trainName}>{item.namaKereta}</Text>
          {/* 4. Menerapkan Inline Style: Warna berubah otomatis tergantung kelas kereta */}
          <Text
            style={[
              styles.trainClass,
              { color: item.kelas === "Eksekutif" ? "#f59e0b" : "#3b82f6" },
            ]}
          >
            {item.kelas}
          </Text>
        </View>

        <Text style={styles.time}>Berangkat: {item.jamBerangkat}</Text>

        {/* Tombol Counter Jumlah Tiket (+ / -) */}
        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8, gap: 10 }}>
          <Text style={{ color: "#64748b", fontWeight: "500" }}>Jumlah Tiket:</Text>
          <Pressable
            onPress={() => kurangTiket(item.id)}
            style={{
              backgroundColor: "#e2e8f0",
              width: 28,
              height: 28,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#334155" }}>-</Text>
          </Pressable>

          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{qty}</Text>

          <Pressable
            onPress={() => tambahTiket(item.id)}
            style={{
              backgroundColor: "#e2e8f0",
              width: 28,
              height: 28,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#334155" }}>+</Text>
          </Pressable>
        </View>

        {/* Menampilkan Total Harga berdasarkan Jumlah Tiket */}
        <Text style={styles.price}>
          Rp {totalHarga.toLocaleString("id-ID")}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            Alert.alert(
              "Tiket Dipilih",
              `Memesan ${qty} tiket ${item.namaKereta}!\nTotal: Rp ${totalHarga.toLocaleString("id-ID")}`
            )
          }
        >
          <Text style={styles.buttonText}>Pesan Tiket</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Keretaku</Text>

      {/* 5. Menerapkan Loop menggunakan FlatList */}
      <FlatList
        data={daftarTiket}
        keyExtractor={(item) => item.id}
        renderItem={renderTicketCard}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}