import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import studentList from "../assets/data/quotes.json";

export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedQuotes: [
        123,
        4012,
        3120,
        123,
        1233,
        412,
        123,
        4123,
        444,
        567,
        24,
        912,
        123,
        4123,
        444,
        567,
        24,
        912
      ],
      allQuotes: []
    };
  }

  componentDidMount() {
    this.setState = {
      likedQuotes: [123, 4012, 3120]
    };
  }

  navigateToHome() {
    this.props.navigation.navigate("Home");
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings");
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
              <Icon
                name="ios-settings"
                color="#fff"
                size={30}
                onStartShouldSetResponder={() => this.navigateToSettings()}
              />
            </View>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 90
            }}
          >
            <View>
              <FlatList
                data={this.state.likedQuotes}
                renderItem={({ item }) => (
                  <Text style={styles.item}>{studentList[item].text}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
