import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';

import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';

import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.orders.items);
  const newOrdersCount = orders.filter(order => order.status === 'new').length;
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const user = useSelector((state) => state.auth.user);

  function protectTab(e) {
    if (!user) {
      e.preventDefault();

      Alert.alert(
        'Login Required',
        'Please sign in first'
      );
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="User Profile"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStack}
        listeners={{
          tabPress: protectTab,
        }}
      />

      <Tab.Screen
        name="Shopping Cart"
        component={ShoppingCartScreen}
        options={{
          tabBarBadge:
            totalQuantity > 0 ? totalQuantity : undefined,
        }}
        listeners={{
          tabPress: protectTab,
        }}
      />

      <Tab.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={{
          tabBarBadge: newOrdersCount > 0 ? newOrdersCount : undefined,
        }}
        listeners={{
          tabPress: protectTab,
        }}
      />

      {user ? (
        <Tab.Screen
          name="User Profile"
          component={UserProfileScreen}
        />
      ) : (
        <Tab.Screen
          name="User Profile"
          component={AuthStack}
        />
      )}
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}