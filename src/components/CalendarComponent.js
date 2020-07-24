import {
  StyleSheet,
  View
} from 'react-native';
import React, { Component } from 'react'
import {Calendar} from 'react-native-calendars';
import moment from "moment";


class CalendarComponent extends Component {
  constructor(props) {

    super(props);
    this.setMarkedDates = this.setMarkedDates.bind(this);

    this.state = {
      markedDates:{[moment(this.props.current).format('YYYY-MM-DD')] : {selected: !!this.props.current, selectedColor:'#0067bb'}}
    };
  }

  //send to parent the child values
  sendToParent(date , typeOfDateProps){
    this.props.sendData({date, typeOfDate: typeOfDateProps});
  }

  //set date as we only need one
   setMarkedDates(key, typeOfDate) {
    const markedDates = {[key]: {selected: true, selectedColor:'#0067bb'}};
    this.setState( {markedDates})
    this.sendToParent(key, typeOfDate)
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          theme={{arrowColor:'#0067bb'}}
          onDayPress={(day) => this.setMarkedDates(day.dateString, this.props.typeOfDate)}
          markedDates={this.state.markedDates}
          maxDate={this.props.maxDate || ''}
          minDate={this.props.minDate || ''}
          monthFormat={'yyyy MMMM'}
          firstDay={1}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />
      </View>
    );
  }
}
export default CalendarComponent


const styles = StyleSheet.create({
  container: {
    margin:18,
    marginTop: 5
  },
});
