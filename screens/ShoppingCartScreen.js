import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

export default function ShoppingCartScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.title}
          </Text>

          <Text>Price: ${item.price}</Text>

          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(decreaseQuantity(item.id))}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(increaseQuantity(item.id))}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Shopping Cart</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your shopping cart is empty</Text>
        ) : (
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryText}>Items: {totalItems}</Text>
              <Text style={styles.summaryText}>
                Total Price: ${totalPrice.toFixed(2)}
              </Text>
            </View>

            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
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
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 20,
  },
  summary: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: '#2ecc71',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 10,
  },
});