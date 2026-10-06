import { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface TiketKereta {
  id: string;
  namaKereta: string;
  kelas: string;
  jamBerangkat: string;
  harga: number;
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");

  // Search + menyimpan pencarian sebelumnya untuk Undo
  const handleSearch = (text: string) => {
    setPreviousSearch(searchQuery);
    setSearchQuery(text);
  };

  // Mengembalikan pencarian sebelumnya
  const handleUndo = () => {
    const currentSearch = searchQuery;
    setSearchQuery(previousSearch);
    setPreviousSearch(currentSearch);
  };

  // Filter berdasarkan nama kereta, kelas, atau jam
  const filteredTiket = daftarTiket.filter((item) => {
    const keyword = searchQuery.toLowerCase();

    return (
      item.namaKereta.toLowerCase().includes(keyword) ||
      item.kelas.toLowerCase().includes(keyword) ||
      item.jamBerangkat.toLowerCase().includes(keyword)
    );
  });

  const renderTicketCard = ({ item }: { item: TiketKereta }) => (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.trainName}>{item.namaKereta}</Text>

        <Text
          style={[
            styles.trainClass,
            {
              color: item.kelas === "Eksekutif" ? "#f59e0b" : "#3b82f6",
            },
          ]}
        >
          {item.kelas}
        </Text>
      </View>

      <Text style={styles.time}>Berangkat: {item.jamBerangkat}</Text>

      <Text style={styles.price}>Rp {item.harga.toLocaleString("id-ID")}</Text>

      <Pressable
        style={styles.button}
        onPress={() => alert(`Tiket ${item.namaKereta} dipilih!`)}
      >
        <Text style={styles.buttonText}>Pesan Tiket</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header dengan Tombol Undo (<) di sebelah Home */}
      <View style={styles.headerBar}>
        <Pressable
          style={[
            styles.undoButton,
            !previousSearch && styles.undoButtonDisabled,
          ]}
          onPress={handleUndo}
          disabled={!previousSearch}
          accessibilityLabel="Undo search"
        >
          <Text style={styles.undoIcon}>{"<"}</Text>
        </Pressable>

        <Text style={styles.homeTitle}>Home - Jadwal Keretaku</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari kereta..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Jumlah hasil pencarian */}
      {searchQuery.length > 0 && (
        <Text style={styles.resultText}>
          Menampilkan {filteredTiket.length} hasil untuk "{searchQuery}"
        </Text>
      )}

      <FlatList
        data={filteredTiket}
        keyExtractor={(item) => item.id}
        renderItem={renderTicketCard}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Kereta tidak ditemukan</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingTop: Platform.OS === "web" ? 80 : 40,
  },

  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
    gap: 10,
  },

  homeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
  },

  undoButton: {
    width: 36,
    height: 36,
    backgroundColor: "#2563eb",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  undoButtonDisabled: {
    backgroundColor: "#cbd5e1",
    opacity: 0.5,
  },

  undoIcon: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -2,
  },

  // Search
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#0f172a",
  },

  resultText: {
    paddingHorizontal: 18,
    marginBottom: 8,
    color: "#64748b",
    fontSize: 13,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  trainName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
  },

  trainClass: {
    fontSize: 14,
    fontWeight: "600",
  },

  time: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 12,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 40,
  },

  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
});
