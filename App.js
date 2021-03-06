import React, { Component } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DecksList from "./components/DecksList";
import NewDeck from "./components/NewDeck";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import Constants from "expo-constants";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { setLocalNotification } from "./utils/helpers"

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <SafeAreaView
      style={{ backgroundColor, height: Constants.statusBarHeight }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  );
}

const Tabs = {
  History: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bookmarks" size={30} color="#000" />
      )
    }
  },
  AddEntry: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color="#000" />
      )
    }
  }
};

const tabOptions = {
  tabBarOptions: {
    activeTintColor: "#000",
    style: {
      height: 56,
      backgroundColor: "#fff",
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav = createAppContainer(
  Platform.OS === "ios"
    ? createBottomTabNavigator(Tabs, tabOptions)
    : createMaterialTopTabNavigator(Tabs, tabOptions)
);

const Stack = createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      title: "Udacicards"
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck View"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card to Deck"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  },
  initialRouteName: "Home"
});

const MainNavigator = createAppContainer(Stack);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Provider store={createStore(reducer)}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor="#fff" barStyle="dark-content" />
            <MainNavigator />
          </View>
        </Provider>
      </Provider>
    );
  }
}
