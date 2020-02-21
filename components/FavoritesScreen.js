import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableHighlight
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

  navigateToQuote(id) {
    console.log(id);
    this.props.navigation.navigate("Home", { favoritedQuoteID: id });
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings");
  }

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "/Users/cagatayozata/DocumentsL/Mobile Projects/quaotesApp_ReactNative/assets/images/bg.png"
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1, paddingRight: 50, paddingLeft: 50 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
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
              paddingBottom: 70
            }}
          >
            <View>
              <FlatList
                data={this.state.likedQuotes}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={() => this.navigateToQuote(studentList[item].id)}
                  >
                    <View style={styles.item}>
                      <Text style={styles.title}>{studentList[item].text}</Text>
                      <Text style={styles.author}>
                        {studentList[item].author}
                      </Text>
                    </View>
                  </TouchableHighlight>
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
  item: {
    paddingBottom: 20,
    marginBottom: 20,
    fontSize: 18,
    borderRadius: 2,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255, 255, 255, .4)"
  },
  title: {
    paddingBottom: 5,
    fontSize: 18,
    color: "white"
  },
  author: {
    fontSize: 14,
    textAlign: "right",
    color: "white"
  }
});
