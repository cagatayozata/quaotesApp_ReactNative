import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Share
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import studentList from "../assets/data/quotes.json";
import img from "../assets/images/bg.png";

export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedQuotes: []
    };
  }

  // get like list and set state
  componentDidMount() {
    this.setState({
      likedQuotes: [123, 4012, 3120, 4612, 1233]
    });
  }

  dislikeQuote(id) {
    // recieve liked quotes list from state
    let likedQuotesArr = [];
    likedQuotesArr = this.state.likedQuotes;

    // delete selected
    for (let index = 0; index < likedQuotesArr.length; index++) {
      if (id == likedQuotesArr[index]) {
        likedQuotesArr.splice(index, 1);
      }
    }

    // set state updated list
    this.setState({
      likedQuotes: likedQuotesArr
    });

    console.log(this.state.likedQuotes);
  }

  clickShare(msg) {
    Share.share({
      title: "Paylaş",
      message: msg
    })
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

  navigateToHome() {
    this.props.navigation.navigate("Home");
  }

  navigateToQuote(id) {
    console.log(id);
    this.props.navigation.navigate("Home");
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings");
  }

  render() {
    return (
      <ImageBackground source={img} style={{ width: "100%", height: "100%" }}>
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
              paddingBottom: 70
            }}
          >
            <FlatList
              data={this.state.likedQuotes}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View
                    style={{
                      flex: 5
                    }}
                  >
                    <View>
                      <Text style={styles.title}>{studentList[item].text}</Text>
                      <Text style={styles.author}>
                        {studentList[item].author}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 2,
                        alignItems: "flex-end"
                      }}
                    >
                      <Icon
                        name="ios-heart-dislike"
                        color="#fff"
                        size={25}
                        style={{ paddingBottom: 10 }}
                        onStartShouldSetResponder={() =>
                          this.dislikeQuote(studentList[item].id)
                        }
                      />
                    </View>
                    <View
                      style={{
                        flex: 2,
                        alignItems: "flex-end"
                      }}
                    >
                      <Icon
                        name="ios-share"
                        color="#fff"
                        size={25}
                        style={{ paddingBottom: 10 }}
                        onStartShouldSetResponder={() =>
                          this.clickShare(studentList[item].text)
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
    borderColor: "rgba(255, 255, 255, .4)",
    flex: 1,
    flexDirection: "row"
  },
  title: {
    paddingBottom: 5,
    fontSize: 18,
    color: "white"
  },
  author: {
    fontSize: 14,
    color: "white"
  }
});
