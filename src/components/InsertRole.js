import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { DropdownRoles } from "../data";

class InsertRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      role: "",
    };
  }

  handleUserEmail = (text) => {
    this.setState({ userEmail: text });
  };

  setRole = async () => {
    console.warn(this.state.userEmail, this.state.role);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor:'#efeff5' }}>
        <ScrollView contentContainerStyle={{backgroundColor:'#efeff5'}}>
          <Text style={styles.title}>Set User's Role</Text>

          <Text style={styles.label}>User's email</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="e.g. user@gmail.com"
            placeholderTextColor="grey"
            autoCapitalize="none"
            onChangeText={(text) => this.handleUserEmail(text)}
          />

          <Text style={styles.label}>Role</Text>
          <View style={styles.typeDropdown}>
            <Picker
              selectedValue={this.state.role}
              style={{ height: 40 }}
              onValueChange={(itemValue) => {
                this.setState({ role: itemValue });
              }}
            >
              <Picker.Item key={0} label="Please select..." value={0} />

              {DropdownRoles.map((type) => {
                return (
                  <Picker.Item
                    key={type.value}
                    label={type.label}
                    value={type.value}
                  />
                );
              })}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.setRole()}
          >
            <Text style={styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default InsertRole;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title:{
    fontSize: 22,
    textAlign: "center",
    marginTop:15
  },
  input: {
    marginHorizontal:18,
    marginTop: 2,
    backgroundColor:'white',
    height: 40,
    borderRadius: 10
  },
  typeDropdown: {
    marginHorizontal:18,
    marginBottom: 2,
    backgroundColor:'white',
    borderRadius: 10
  },
  typeCheckbox: {
    marginLeft: 18,
  },
  label: {
    marginLeft: 18,
    color:'dimgrey',
    marginTop: 20,
    fontSize: 16
  },
  radioBtnLabel: {
    marginTop: 5,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: 'rgb(0,103,187)',
    marginHorizontal:18,
    height: 40,
    borderRadius: 10,
    justifyContent:'center',
    marginTop:20
  },
  submitButtonText: {
    color: "white",
    margin: "auto",
    textAlign: "center",
  },
});
