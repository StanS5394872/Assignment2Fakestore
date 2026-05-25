import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { payOrder, receiveOrder } from '../redux/orderSlice';

export default function MyOrdersScreen() {
  const orders = useSelector((state) => state.orders.items);
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);

  function handlePay(orderId) {
    dispatch(payOrder(orderId));
    Alert.alert('Success', 'Order paid successfully');
  }

  function handleReceive(orderId) {
    dispatch(receiveOrder(orderId));
    Alert.alert('Success', 'Order received successfully');
  }

  function renderOrder({ item }) {
    const expanded = expandedId === item.id;

    return (
      <View style={styles.orderBox}>
        <TouchableOpacity
          onPress={() => setExpandedId(expanded ? null : item.id)}
        >
          <Text style={styles.orderTitle}>
            {expanded ? '▼' : '▶'} Order ID: {item.id}
          </Text>
          <Text>Status: {item.status}</Text>
          <Text>Items: {item.totalItems}</Text>
          <Text>Total: ${item.totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.detailBox}>
            {item.items.map((product) => (
              <View key={product.id} style={styles.productRow}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text>Quantity: {product.quantity}</Text>
                </View>
              </View>
            ))}

            {item.status === 'new' && (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handlePay(item.id)}
              >
                <Text style={styles.actionText}>Pay</Text>
              </TouchableOpacity>
            )}

            {item.status === 'paid' && (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleReceive(item.id)}
              >
                <Text style={styles.actionText}>Receive</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>

        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrder}
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
  orderBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  orderTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailBox: {
    marginTop: 10,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  actionBtn: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});