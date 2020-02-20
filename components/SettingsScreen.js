import React, { Component } from "react";
import { Button, View, Text, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  navigateToHome() {
    this.props.navigation.navigate("Home");
  }

  navigateToFavorites() {
    this.props.navigation.navigate("Favorites");
  }
  
  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/496ecb14589707.562865d064f9e.png"
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1, paddingRight: 50, paddingLeft: 50 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 50
            }}
          >
            <View
              style={{
                width: 50,
                height: 50
              }}
            >
              <Icon
                name="ios-home"
                color="#fff"
                onStartShouldSetResponder={() => this.navigateToHome()}
                size={30}
              />
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: "flex-end"
              }}
            >
              <Icon name="ios-settings" color="#fff" size={30} />
            </View>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Text>Settings Page</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
