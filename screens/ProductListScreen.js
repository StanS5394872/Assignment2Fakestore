import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

export default function ProductListScreen({ route, navigation }) {
  const { category } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('ProductDetail', { product: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
      <Text>${item.price}</Text>
    </TouchableOpacity>
  );
}

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Product List</Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  name: {
    fontWeight: 'bold',
  },
  image: {
  width: '100%',
  height: 150,
  resizeMode: 'contain',
  marginBottom: 10,
  },
});