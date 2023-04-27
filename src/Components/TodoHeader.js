import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../redux/todoSlice';

function App() {
    const [title, setTitle] = useState('');
    const [editingId, setEditingId] = useState(false);
    const todos = useSelector(state => state.todos.todo);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (title.trim() !== '') {
            if (editingId) {
                dispatch(editTodo({
                    id: editingId,
                    title,
                }));
                setEditingId(false);
            } else {
                dispatch(addTodo({
                    id: Math.random(),
                    title,
                }));
            }
            setTitle('');
        }
    };

    const handleEditTodo = (todo) => {
        setTitle(todo.title);
        setEditingId(todo.id);
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const renderItem = ({ item }) => {
        return (

            <View style={styles.taskContainer}>
                <Text style={styles.task}>{item.title}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteTodo(item.id)}
                >
                    <Text style={styles.deleteButtonText}>delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditTodo(item)}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

        )
    };

    return (
        <View>
            <View style={styles.heading}>
                <Text style={styles.todoheading}>TodoList</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a todo"
                        value={title}
                        onChangeText={setTitle}

                    />
                    <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                        <Text style={styles.buttonText}>{editingId ? 'Update' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList
                    data={todos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        marginTop: 20,
        marginLeft: 140,
    },
    todoheading: {
        fontSize: 30,
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
        marginBottom: 6,
    },
    input: {
        flex: 1,
        backgroundColor: "#eee",
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 20,
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
        fontSize: 18,
        fontWeight: "bold",
    },
    taskContainer: {
        backgroundColor: "aqua",
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        width: "93%",
        marginLeft: 15,
    },
    task: {
        flex: 1,
        fontSize: 20,
        marginLeft: 20,
        marginRight: 14,
        marginTop: 4,
        marginBottom: 4,

    },
    deleteButton: {
        backgroundColor: "grey",
        height: 60,
        paddingHorizontal: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 1,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    editButton: {
        backgroundColor: "grey",
        height: 60,
        paddingHorizontal: 20,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    editButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default App;