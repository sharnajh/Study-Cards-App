import React, { Component } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import DecksList from "./components/DecksList";
import NewDeck from "./components/NewDeck";
import DeckView from "./components/DeckView";
import Constants from "expo-constants";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
        <Ionicons name="ios-bookmarks" size={30} color="000" />
      )
    }
  },
  AddEntry: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color="000" />
      )
    }
  }
};

const tabOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? "#fff" : "#fff",
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? "#fff" : "#fff",
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
  SingleDeck: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck"
    }
  },
  initialRouteName: "Home"
});

const MainNavigator = createAppContainer(Stack);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Provider store={createStore(reducer)}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor="#000" barStyle="light-content" />
            <MainNavigator />
          </View>
        </Provider>
      </Provider>
    );
  }
}
