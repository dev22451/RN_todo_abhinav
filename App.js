import { View } from "react-native";
import TodoHeader from "./src/Components/TodoHeader";
import store from "./src/redux/store";
import { Provider } from "react-redux";

function App() {
  const RootApp = () => {
    return (
      <View>
        <TodoHeader />
      </View>


    );
  };

  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

export default App;