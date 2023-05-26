import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";

// adding infinite scroll mechanism into the card components
// this will work by calling a dispatch to get new products
// the products will be limited by a 'limit' paramater,
// and pages will tracked by the API in a 'page' parameter
export default class InfiniteScrollContainer extends Component {
  render() {
    return (
      <View>
        <ScrollView></ScrollView>
      </View>
    );
  }
}
