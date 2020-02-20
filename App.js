import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Clipboard
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import studentList from "./assets/data/quotes.json";

export default class FlexDimensionsBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteID: studentList[0].id,
      quoteText: studentList[0].text,
      quoteAuthor: studentList[0].author,
      clipboardContent: null,
      likedQuotes: []
    };
  }

  randomQuote() {
    // generate random number
    let random = Math.floor(Math.random() * (5420 - 1 + 1)) + 1;

    // set state - id, text, author
    this.setState({
      quoteID: studentList[random].id,
      quoteText: studentList[random].text,
      quoteAuthor: studentList[random].author
    });
  }

  likeQuote() {
    // recieve selected id
    let selectedID = this.state.quoteID;

    // recieve liked quotes list from state
    let likedQuotesArr = [];
    likedQuotesArr = this.state.likedQuotes;

    // control that list include selected id or not
    let existControl = true;
    for (let index = 0; index < likedQuotesArr.length; index++) {
      if (selectedID == likedQuotesArr[index]) {
        existControl = false;
      }
    }

    // if not exist, add id to list, then set state
    if (existControl) {
      likedQuotesArr.push(this.state.quoteID);
      this.setState({
        likedQuotes: likedQuotesArr
      });
    }
  }

  printQuote() {
    console.log(this.state.quoteText);
  }

  readFromClipboard = async () => {
    await Clipboard.setString(this.state.quoteText);
    alert("Kopyalandı!");
  };

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
              <Icon name="ios-bookmark" color="#fff" size={30} />
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
              flex: 4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <View onStartShouldSetResponder={() => this.readFromClipboard()}>
                <Text
                  style={{ fontSize: 25, textAlign: "center", color: "white" }}
                >
                  {this.state.quoteText}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15
                }}
              >
                <Text
                  style={{ fontSize: 18, textAlign: "right", color: "white" }}
                >
                  {this.state.quoteAuthor}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View
              onStartShouldSetResponder={() => this.likeQuote()}
              style={{
                flex: 2,
                alignItems: "center"
              }}
            >
              <Icon
                name="ios-heart"
                color="#fff"
                size={30}
                style={{ paddingBottom: 10 }}
              />
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Beğen
              </Text>
            </View>
            <View
              onStartShouldSetResponder={() => this.randomQuote()}
              style={{
                flex: 2,
                alignItems: "center"
              }}
            >
              <Icon
                name="ios-shuffle"
                color="#fff"
                size={30}
                style={{ paddingBottom: 10 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "white"
                }}
              >
                Rastgele Söz
              </Text>
            </View>
            <View
              onStartShouldSetResponder={() => this.printQuote()}
              style={{
                flex: 2,
                alignItems: "center"
              }}
            >
              <Icon
                name="ios-share"
                color="#fff"
                size={30}
                style={{ paddingBottom: 10 }}
              />
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Paylaş
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
