import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, } from 'react-native';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../redux/todoSlice';

import editicon from "../Assests/edit1.png"
import deleteicon from "../Assests/remove.png"
import search from "../Assests/black.jpg"
import notify from "../Assests/notification.png"
import menu from "../Assests/menu.png"

function App() {
    const [title, setTitle] = useState('');
    const [editingId, setEditingId] = useState(false);
    const [form, setForm] = useState(false)
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
        setForm(!form)
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };
    const modal = () => {
        setForm(!form)
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.taskContainer}>
                <View style={styles.task}>
                    <Text style={styles.todo} >{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.btnicon}>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteTodo(item.id)}
                    >
                        <Image source={deleteicon} style={styles.delimg} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditTodo(item)}
                    >
                        <Image source={editicon} style={styles.img} />
                    </TouchableOpacity>
                </View>
            </View>


        )
    };

    return (
        <View style={styles.body}>
            <View style={styles.heading}>
                <Image source={menu} style={styles.menu} />
                <Text style={styles.todoheading}>Task Manager</Text>
                <Image source={notify} style={styles.notify} />

            </View>
            <Text style={styles.todoh}>Welcome Back!</Text>
            <View style={styles.search}>
                <Text style={styles.todoh1}>Here's Update Today.</Text>
                <Image source={search} style={styles.searchicon} />
            </View>
            <View style={styles.tab}>
                <Text style={styles.tab1}>Today</Text>
                <Text style={styles.tab2} >Upcoming</Text>
                <Text style={styles.tab2} >Task Done</Text>
            </View>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={form}

            >
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add a todo"
                            value={title}
                            onChangeText={setTitle}

                        />
                    </View>
                    <View style={styles.btncontainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setForm(!form)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1} onPress={handleAddTodo}>
                            <Text style={styles.buttonText1}>{editingId ? 'Update' : 'Submit'}</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>
            <View>
                <FlatList
                    data={todos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.modal}>
                <TouchableOpacity style={styles.btn} onPress={modal} ><Text style={styles.btntext}> + Add Task</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        position: "relative",

    },
    heading: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",

    },
    notify: {
        width: 27,
        height: 27,
        marginTop: 13,

    },
    menu: {
        width: 34,
        height: 34,
        marginRight: 68,
        marginTop: 12,
        marginLeft: 10,


    },
    todoheading: {
        fontSize: 28,
        color: "black",
        marginRight: 80,
        marginTop: 8,
        marginLeft: 6,
    },
    todoh: {
        fontSize: 18,
        color: "black",
        marginLeft: 20,
        marginBottom: 4,
        marginTop: 10,
    },
    search: {
        flexDirection: "row",
    },
    searchicon: {
        marginTop: -26,
        marginLeft: 95,
        width: 50,
        height: 50,
        backgroundColor: "grey",
        borderRadius: 50,
    },
    todoh1: {
        fontSize: 26,
        color: "black",
        fontFamily: "bold",
        marginLeft: 20,
    },
    tab: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40,

    },
    tab1: {
        fontSize: 19,
        backgroundColor: "black",
        borderRadius: 50,
        color: "white",
        width: 140,
        height: 35,
        textAlign: "center",
        paddingVertical: 2,


    },
    tab2: {
        marginTop: 2.8,
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: "aqua",
        height: 30,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginLeft: 10,
    },
    btncontainer: {
        flexDirection: "row"
    },
    input: {
        flex: 1,
        backgroundColor: "#eee",
        height: 70,
        paddingHorizontal: 20,
        borderRadius: 15,
        fontSize: 22,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#6b9dc2",
        height: 50,
        paddingHorizontal: 20,
        marginLeft: 22,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    button1: {
        backgroundColor: "#6b9dc2",
        height: 50,
        paddingHorizontal: 20,
        marginLeft: 130,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText1: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    taskContainer: {
        width: "90%",
        height: 235,
        backgroundColor: "grey",
        marginLeft: 20,
        marginTop: 35,
        borderRadius: 20,
        marginRight: 20,
    },
    task: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    todo: {
        fontSize: 25,
        fontWeight: "bold"
    },
    date: {
        fontSize: 20,
        marginTop: 20,

    },
    time: {
        fontSize: 20,
        marginTop: 20,
    },
    btnicon: {
        flexDirection: "row"
    },
    deleteButton: {
        marginLeft: 5,
        marginTop: 55,
    },
    delimg: {
        width: 39,
        height: 39
    },
    editButton: {
        marginTop: 59,
        marginLeft: 290,

    },
    img: {
        width: 32,
        height: 32,
        backgroundColor: "black",
        borderRadius: 50,

    },
    btn: {
        flex: 1,
        backgroundColor: "black",

        height: 50,
        width: 125,
        borderRadius: 10,
        marginLeft: 140,
        marginTop: 30,
        marginBottom: 30,
    },
    btntext: {
        marginTop: 9,
        marginRight: 5,
        textAlign: "center",
        fontSize: 20,
        fontFamily: "bold",
        color: "white",

    },

});

export default App;