import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants";

const Table = ({ tableData, headerData }) => {
  function renderRow(data, index) {
    return (
      <View style={styles.row} key={`row-${index}`}>
        {data.map((datum, index) => (
          <View style={styles.cell} key={`row-${index}`}>
            <Text style={{ ...Fonts.body4, textAlign: "center" }}>{datum}</Text>
          </View>
        ))}
      </View>
    );
  }

  function renderDataRow() {
    return tableData.map((datum, index) => renderRow(datum, index));
  }

  function renderHeaderRow() {
    return renderRow(headerData);
  }
  return (
    <View style={styles.table}>
      {headerData && renderHeaderRow()}
      <ScrollView>{renderDataRow()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: Sizes.cardWidth,
  },
  row: {
    alignItems: "stretch",
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default Table;
