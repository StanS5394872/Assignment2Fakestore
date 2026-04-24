import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Product Details</Text>

        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={styles.name}>{product.title}</Text>

        <Text style={styles.price}>${product.price}</Text>

        <Text style={styles.desc}>{product.description}</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartBtn}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
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
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
  },
  cartBtn: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});