import { ScrollView } from "react-native";
import TodoHeader from "./src/Components/TodoHeader";
import store from "./src/redux/store";
import { Provider } from "react-redux";

function App() {
  const RootApp = () => {
    return (
      <ScrollView>
        <TodoHeader />
      </ScrollView>
    );
  };
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

export default App;