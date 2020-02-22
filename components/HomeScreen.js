import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  Clipboard,
  AsyncStorage,
  Share
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import studentList from "../assets/data/quotes.json";
import img from "../assets/images/bg.png";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteID: "",
      quoteText: "",
      quoteAuthor: "",
      isFavorite: false,
      likedQuotes: []
    };
  }

  componentDidMount() {
    // get first random quote
    this.randomQuote();

    // get liked quotes
    this.getLikedQuotes();
  }

  componentDidUpdate() {
    // get liked quotes
    this.getLikedQuotes();
  }

  getLikedQuotes = async () => {
    // recieve liked list from DB, then set state
    try {
      const value = await AsyncStorage.getItem("test1");
      if (value !== null) {
        this.setState({
          likedQuotes: JSON.parse(value)
        });
      }
    } catch (error) {}
  };

  updateLikedQuotes = async () => {
    try {
      await AsyncStorage.setItem(
        "test1",
        JSON.stringify(this.state.likedQuotes)
      );
    } catch (error) {}
  };

  randomQuote() {
    // calculate length of entire json
    let size = studentList.length;

    // generate random number
    let random = Math.floor(Math.random() * (size - 1 + 1)) + 1;

    // recieve liked quotes list from state
    let likedQuotesArr = [];
    likedQuotesArr = this.state.likedQuotes;

    // check item is favorited or not
    let favorited = false;
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
      isFavorite: favorited
    });
  }

  likeQuoteOperation() {
    // recieve selected id
    let selectedID = this.state.quoteID;

    // recieve liked list from state
    let likedQuotesArr = [];
    likedQuotesArr = this.state.likedQuotes;

    // helper variables
    let flag = true;
    let deletedIndex = 0;

    // decide operation (like or dislike)
    for (let index = 0; index < likedQuotesArr.length; index++) {
      if (selectedID == likedQuotesArr[index]) {
        flag = false;
        deletedIndex = index;
      }
    }

    // if flag is true, add selected id to liked list and set state.
    if (flag) {
      likedQuotesArr.push(selectedID);
      this.setState({
        likedQuotes: likedQuotesArr,
        isFavorite: true
      });
    }
    //if flag is false, remove selected id from liked list and set state.
    else {
      likedQuotesArr.splice(deletedIndex, 1);
      this.setState({
        likedQuotes: likedQuotesArr,
        isFavorite: false
      });
    }

    // update DB for liked list
    this.updateLikedQuotes();
  }

  onSharePress() {
    Share.share({
      title: "Paylaş",
      message: this.state.quoteText + " - " + this.state.quoteAuthor
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  copyToClipboard = async () => {
    await Clipboard.setString(this.state.quoteText);
    alert("Kopyalandı!");
  };

  navigateToFavorites() {
    this.props.navigation.navigate("Favorites");
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings");
  }

  render() {
    const isFavorited = this.state.isFavorite;

    return (
      <ImageBackground source={img} style={{ width: "100%", height: "100%" }}>
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
              <View onStartShouldSetResponder={() => this.copyToClipboard()}>
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
              onStartShouldSetResponder={() => this.likeQuoteOperation()}
              style={{
                flex: 2,
                alignItems: "center"
              }}
            >
              <Icon
                name={isFavorited ? "ios-heart-dislike" : "ios-heart"}
                color="#fff"
                size={30}
                style={{ paddingBottom: 10 }}
              />
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                {isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
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
