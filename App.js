import React, { Component } from "react";
import { TouchableOpacity, Button, StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      calculationText: "",
      resultText: "",
    };
    this.ops = ["D", "+", "-", "x", "/"];
  }

  calculateResult() {
    const text = this.state.calculationText;
    this.setState({
      resultText: eval(text),
    });
  }

  operate(operation) {
    switch (operation) {
      case "D":
        let text = this.state.calculationText.split("");
        text.pop();
        this.setState({
          calculationText: text.join(""),
        });
        break
      case "+":
      case "-":
      case "x":
      case "/":
        const lastChar = this.state.calculationText.split("").pop();

        if (this.ops.indexOf(lastChar) > 0) return;

        if (this.state.text == "") return;
        this.setState({
          calculationText: this.state.calculationText + operation,
        });
    }
  }

  validate() {
    const text = this.state.calculationText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "x":
      case "/":
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    if (text == "=") {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      calculationText: this.state.calculationText + text,
    });
  }

  render() {
    let rows = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [".", 0, "="],
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.buttons}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    let optns = [];
    for (let i = 0; i < 5; i++) {
      optns.push(
        <TouchableOpacity
          key={this.ops[i]}
          onPress={() => this.operate(this.ops[i])}
          style={styles.buttons}
        >
          <Text style={[styles.btnText, styles.white]}>{this.ops[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.button}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{optns}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnText: {
    fontSize: 30,
    color: "white",
  },
  white: {
    color: "white",
  },
  calculationText: {
    fontSize: 40,
    padding: 10,
  },
  resultText: {
    fontSize: 30,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  result: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "white",
  },
  calculation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "white",
  },
  button: {
    flex: 7,
    flexDirection: "row",
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343",
  },
  operations: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#636363",
  },
});
