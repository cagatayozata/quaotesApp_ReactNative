import React, { Component } from "react";
import { Button, View, Text, ImageBackground, Clipboard, Share } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import studentList from "../assets/data/quotes.json";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteID: "",
      quoteText: "",
      quoteAuthor: "",
      isFavorite: false,
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
      ]
    };
  }

  componentDidMount() {
    // get first random quote
    this.randomQuote();

    // get liked quotes
    this.getLikedQuotes();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.route.params) {
  //     this.prepareLikedQuote(prevState);
  //   }
  // }

  randomQuote() {
    // generate random number
    let random = Math.floor(Math.random() * (5420 - 1 + 1)) + 1;
    let tempFavorited = false;

    // recieve liked quotes list from state
    let likedQuotesArr = [];
    likedQuotesArr = this.state.likedQuotes;

    for (let index = 0; index < likedQuotesArr.length; index++) {
      if (random == likedQuotesArr[index]) {
        favorited = true;
      }
    }

    // set state - id, text, author
    this.setState({
      quoteID: studentList[random].id,
      quoteText: studentList[random].text,
      quoteAuthor: studentList[random].author,
      isFavorite: tempFavorited
    });
  }

  prepareLikedQuote(prevState) {
    let id = this.props.route.params["favoritedQuoteID"];
    if (this.state.quoteID === prevState.quoteID) {
      this.setState({
        quoteID: studentList[id].id,
        quoteText: studentList[id].text,
        quoteAuthor: studentList[id].author
      });
    } else {
    }
  }

  getLikedQuotes() {}

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
    } else {
      likedQuotesArr.pop(this.state.quoteID);
      this.setState({
        likedQuotes: likedQuotesArr
      });
    }
    console.log(this.state.likedQuotes);
  }

  onSharePress = url => {
    Share.share({
      title: "Paylaş",
      message: this.state.quoteText + " - " + this.state.quoteAuthor
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  navigateToFavorites() {
    this.props.navigation.navigate("Favorites");
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings");
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
                name="ios-bookmark"
                color="#fff"
                onStartShouldSetResponder={() => this.navigateToFavorites()}
                size={30}
              />
              {this.state.isFavorite}
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
              style={{
                flex: 2,
                alignItems: "center"
              }}
              onStartShouldSetResponder={() => this.onSharePress()}
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
