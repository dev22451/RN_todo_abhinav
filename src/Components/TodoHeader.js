import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/todoSlice";

const TodoHeader = () => {
    const [todo, setTodo] = useState("");

    const dispatch = useDispatch();

    const onSubmitTask = () => {
        if (todo.trim.length === "") {
            Alert.alert("Please Fill Todo");
            setTodo("");
            return;
        }

        dispatch(
            addTask({
                todo: todo,
            })
        );
        setTodo("");
    };

    return (
        <ScrollView>
            <View style={styles.heading}>
                <Text style={styles.todoheading}>TodoList</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a todo"
                        onChangeText={setTodo}
                        value={todo}
                    />
                    <TouchableOpacity style={styles.button} onPress={onSubmitTask}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default TodoHeader;

const styles = StyleSheet.create({
    heading: {
        marginTop: 20,
        marginLeft: 140,
    },
    todoheading: {
        fontSize: 28,
        fontFamily: "monospace",
        color: "black"
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: "#eee",
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#6b9dc2",
        height: 50,
        paddingHorizontal: 20,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});