/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TextInput
} from "react-native";
import ImagePicker from "react-native-image-picker";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
const { height, width } = Dimensions.get("window");
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
    text:''
  }
};

var imageArr = [];
var enterText = "";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(imageArr),
      avatarSource: ""
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("imageArr").then(
      value => (
        (imageArr = JSON.parse(value)),
        this.setState({ dataSource: ds.cloneWithRows(imageArr) })
      )
    );
  }
  componentDidMount() {}
  openCamera() {
    if(this.state.text)
    {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        debugger
        if(imageArr== null)
        {
          imageArr=[]
        }
        var temp = { img: response.uri, text: this.state.text };
        imageArr.push(temp);
        this.setState({ dataSource: ds.cloneWithRows(imageArr),text:'' });
        AsyncStorage.setItem("imageArr", JSON.stringify(imageArr));
        this.textInput.clear()
      }
    });
  }
    else
    {
      alert("Enter text for image")
    }
  }
  openLibrary() {
    if(this.state.text)
    {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        debugger
        if(imageArr== null)
        {
          imageArr=[]
        }
        var temp = { img: response.uri, text: this.state.text };
        imageArr.push(temp);
        this.setState({ dataSource: ds.cloneWithRows(imageArr),text:'' });
        AsyncStorage.setItem("imageArr", JSON.stringify(imageArr));
        this.textInput.clear()
      }
    });
  }
  else
  {
    alert("Enter text for image")
  }
  }

  deleteImage(index) {
    imageArr.splice(index, 1);
    this.setState({ dataSource: ds.cloneWithRows(imageArr) });
    AsyncStorage.setItem("imageArr", JSON.stringify(imageArr));
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          horizontal={true}
          style={{ backgroundColor: "#fff", marginTop: 50 }}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => (
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 10,
                  margin: 5
                }}
                source={{ uri: rowData.img }}
              />
              <Text>{rowData.text}</Text>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.deleteImage(rowID);
                }}
              >
                <View
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 20,
                    width: WINDOW_WIDTH / 2
                  }}
                >
                  <Text style={[styles.welcome, { color: "#fff" }]}>
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        <View
          style={{ backgroundColor: "#fff", alignItems: "center", padding: 20 }}
        >
          <TextInput
          ref={input => { this.textInput = input }} 
          style={{height: 40}}
          placeholder="Type image text"
          onChangeText={(text) => this.setState({text})}
        />
          <TouchableOpacity
            style={{ marginBottom: 20, marginTop: 20 }}
            onPress={() => {
              this.openCamera();
            }}
          >
            <View
              style={{
                backgroundColor: "#393A37",
                borderRadius: 20,
                width: WINDOW_WIDTH / 2
              }}
            >
              <Text style={[styles.welcome, { color: "#fff" }]}>
                Open Camera
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.openLibrary();
            }}
          >
            <View
              style={{
                backgroundColor: "#393A37",
                borderRadius: 20,
                width: WINDOW_WIDTH / 2
              }}
            >
              <Text style={[styles.welcome, { color: "#fff" }]}>
                Select from Library
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
