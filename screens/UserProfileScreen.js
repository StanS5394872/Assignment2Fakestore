import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, updateUser } from '../redux/authSlice';

export default function UserProfileScreen() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  function handleUpdate() {
    if (!name) {
      Alert.alert('Error', 'User name cannot be empty');
      return;
    }

    dispatch(updateUser({ name }));
    setEditing(false);
    setPassword('');
    Alert.alert('Success', 'Profile updated successfully');
  }

  function handleSignOut() {
    dispatch(signOut());
    Alert.alert('Signed Out', 'You have signed out successfully');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.header}>User Profile</Text>

        {!editing ? (
          <>
            <Text style={styles.text}>User Name: {user?.name}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.formBox}>
              <Text style={styles.label}>New User Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditing(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  header: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  formBox: {
    backgroundColor: '#5147a8',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2d7bd3',
    padding: 12,
    borderRadius: 6,
    minWidth: 110,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});