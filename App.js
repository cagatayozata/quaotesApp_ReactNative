// React
import React from "react";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./components/HomeScreen";
import FavoritesScreen from "./components/FavoritesScreen";
import SettingsScreen from "./components/SettingsScreen";

// Navigation
const RootStack = createStackNavigator();
function app() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default app;
