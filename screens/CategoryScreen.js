import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatCategoryName(category) {
    return category
      .replace("men's clothing", "Men's Clothing")
      .replace("women's clothing", "Women's Clothing")
      .replace('electronics', 'Electronics')
      .replace('jewelery', 'Jewelery');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : (
          <View style={styles.categoryBox}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryButton}
                onPress={() =>
                  navigation.navigate('ProductList', { category })
                }
              >
                <Text style={styles.categoryText}>
                  {formatCategoryName(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    backgroundColor: '#fff',
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
  loader: {
    marginTop: 40,
  },
  categoryBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: '#2d7bd3',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});