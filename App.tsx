import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Goal {
  id: number;
  title: string;
}

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const addGoalHandler = (e: GestureResponderEvent) => {
    //When the user clicks ok button and enteredGoalText is not empty
    if (enteredGoalText && enteredGoalText.length > 0) {
      const newGoal = {
        id: Date.now(),
        title: enteredGoalText,
      };
      setGoals((currentGoals) => [...currentGoals, newGoal]);
      // setEnteredGoalText("");
    }
  };

  const removeGoalHandler = (id: number) => {
    Alert.alert(
      "Remove Goal",
      "Remove a goal from your list",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setGoals((currentGoals) =>
              currentGoals.filter((goal) => goal.id !== id)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onChangeTextHandler = (text: string) => {
    setEnteredGoalText(text);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="You cousre goals"
          onChangeText={onChangeTextHandler}
          value={enteredGoalText}
        />
        <Button title="ADD GOALS" onPress={addGoalHandler} color="#2e1065" />
      </View>

      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          renderItem={({ index, item, separators }) => {
            console.log(index);
            return (
              <View style={styles.goalContainer}>
                <View style={styles.goalTitleContainer}>
                  <Text style={styles.goalTitle}>{item.title}</Text>
                </View>
                <Button
                  title="REMOVE GOALS"
                  color="#581c87"
                  onPress={() => removeGoalHandler(item.id)}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 24,
  },
  TextInput: {
    borderColor: "gray",
    borderWidth: 1,
    width: "70%",
    padding: 8,
    marginRight: 10,
  },
  goalsContainer: {
    flex: 5,
  },
  goalContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalTitleContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10,
    backgroundColor: "#5e0acc",
    borderRadius: 8,
    padding: 8,
  },
  goalTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
