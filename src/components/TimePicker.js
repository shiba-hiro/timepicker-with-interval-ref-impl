// @flow
import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';

import TimePickerModal from './TimePickerModal';

type Props = {
  minuteInterval?: number,
  minimumTime?: ?Date,
}
type State = {
  selectedTime: moment,
  isVisible: boolean,
}
export default class TimePicker extends React.Component<Props, State> {
  static defaultProps = {
    minuteInterval: 30,
    minimumTime: null,
  }

  state = {
    selectedTime: moment('12:00', 'HH:mm'),
    isVisible: false,
  };

  _show = () => this.setState({ isVisible: true })

  _hide = () => this.setState({ isVisible: false })

  _handleConfirm = (selectedTimeAsDate: Date): void => {
    this.setState({
      selectedTime: moment(selectedTimeAsDate),
      isVisible: false,
    });
  }

  render() {
    const {
      minuteInterval,
      minimumTime,
    } = this.props;

    const {
      selectedTime,
      isVisible,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this._show}>
        <View>
          <Text success bold style={{ fontSize: 21 }}>
            {selectedTime.format('HH:mm')}
          </Text>
          <TimePickerModal
            isVisible={isVisible}
            hours={selectedTime.toDate().getHours()}
            minutes={selectedTime.toDate().getMinutes()}
            minuteInterval={minuteInterval}
            onConfirm={this._handleConfirm}
            onCancel={this._hide}
            minimumTime={minimumTime}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
