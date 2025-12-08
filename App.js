import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4BF5xMhYfM7iil385Jnp56yf5pz4gNcE",
  authDomain: "taskmanagerapp-93487.firebaseapp.com",
  projectId: "taskmanagerapp-93487",
  storageBucket: "taskmanagerapp-93487.firebasestorage.app",
  messagingSenderId: "967600831110",
  appId: "1:967600831110:web:deccd71c2d874530532f07"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-240)).current;

  useEffect(() => {
    const tasksRef = ref(db, "tasks");

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
      setTasks(list);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    const toValue = menuOpen ? -240 : 0;
    setMenuOpen(!menuOpen);

    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const addTask = async () => {
    const text = taskText.trim();
    if (!text) return;

    const tasksRef = ref(db, "tasks");

    await push(tasksRef, {
      text,
      done: false,
      createdAt: Date.now(),
    });

    setTaskText("");
  };

  const toggleTask = async (id, done) => {
    await update(ref(db, `tasks/${id}`), { done: !done });
  };

  const deleteTask = async (id) => {
    await remove(ref(db, `tasks/${id}`));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id, item.done)}>
        <View style={[styles.checkCircle, item.done && styles.checkCircleOn]}>
          {item.done && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text style={[styles.taskText, item.done && styles.taskDone]}>
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Task Manager</Text>
          <Text style={styles.subtitle}>Realtime DB Version</Text>
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#9ca3af"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Total: {tasks.length} • Done: {tasks.filter((t) => t.done).length}
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one above ✨</Text>
        }
      />

      <Animated.View
        style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <Text style={styles.menuTitle}>Menu</Text>
        <Text style={styles.menuItem}>All Tasks: {tasks.length}</Text>
        <Text style={styles.menuItem}>
          Completed: {tasks.filter((t) => t.done).length}
        </Text>
        <Text style={styles.menuItem}>
          Pending: {tasks.filter((t) => !t.done).length}
        </Text>

        <TouchableOpacity style={styles.menuClose} onPress={toggleMenu}>
          <Text style={styles.menuCloseText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  menuIcon: {
    fontSize: 28,
    color: "white",
    marginRight: 14,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 999,
    paddingHorizontal: 16,
    color: "white",
    height: 44,
  },
  addBtn: {
    marginLeft: 8,
    backgroundColor: "#22c55e",
    borderRadius: 999,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  addText: {
    color: "white",
    fontWeight: "600",
  },
  statsRow: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  statsText: {
    color: "#e5e7eb",
    fontSize: 13,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#4b5563",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkCircleOn: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  checkMark: {
    color: "white",
    fontSize: 14,
  },
  taskText: {
    flex: 1,
    color: "white",
    fontSize: 15,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  delete: {
    color: "#f97316",
    fontSize: 18,
    marginLeft: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 240,
    backgroundColor: "#020617",
    paddingTop: 60,
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderRightColor: "#1f2937",
  },
  menuTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  menuItem: {
    color: "#e5e7eb",
    fontSize: 14,
    marginBottom: 8,
  },
  menuClose: {
    marginTop: 24,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#4b5563",
  },
  menuCloseText: {
    color: "#e5e7eb",
    fontSize: 14,
  },
});
