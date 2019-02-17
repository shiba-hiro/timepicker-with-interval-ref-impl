// @flow
import React from 'react';
import type { ElementRef, Node } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Dialog, {
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
import ScrollPicker from 'react-native-picker-scrollview';

import {
  calculateHoursIndex,
  calculateMinutesIndex,
} from './timeIndexCalculator';

const MIN_INTERVALS = {
  '30': { // eslint-disable-line quote-props
    values: [
      {
        index: 0,
        data: 0,
        dataString: '00',
      },
      {
        index: 1,
        data: 30,
        dataString: '30',
      },
    ],
    convertMinutesToIndex: (minutesData: ?number): number => {
      if (minutesData) {
        return minutesData < 30 ? 0 : 1;
      }
      return 0;
    },
  },
};

// eslint-disable-next-line max-len
const _minutesDataStringToIndex = (dataString: string, minuteInterval: number): number => MIN_INTERVALS[minuteInterval]
  .values
  .find(value => value.dataString === dataString)
  .index;

const HOURS_STRINGS = Array.from({ length: 24 }).map((v, i) => i.toString());

const _hoursDataStringToIndex = (dataString: string): number => HOURS_STRINGS.indexOf(dataString);

const _renderNumberItems = (dataString: string, index: number, isSelected: boolean): Node => (
  <View>
    <Text style={isSelected ? styles.selectedNumber : styles.nonSelectedNumber}>{dataString}</Text>
  </View>
);

type Props = {
  isVisible?: boolean,
  hours?: number,
  minutes?: number,
  minuteInterval?: number,
  onConfirm: Date => void,
  onCancel: void => void,
  minimumTime?: ?Date,
}


export default class LimitedMinsTimePicker extends React.Component<Props> {
  static defaultProps = {
    isVisible: false,
    hours: 0,
    minutes: 0,
    minuteInterval: 30,
    minimumTime: null,
  }

  _hoursPickerRef: ElementRef<*>;

  _minutesPickerRef: ElementRef<*>;

  _completeSelectTime(): void {
    const { onConfirm, minuteInterval } = this.props;
    const hoursIndex = this._getHoursIndex();
    const minutesIndex = this._getMinutesIndex();
    // $FlowFixMe
    const minutesValue: ?{ data: number } = MIN_INTERVALS[minuteInterval]
      .values
      .find(value => value.index === minutesIndex);

    const time: Date = new Date();
    time.setHours(
      hoursIndex,
      minutesValue ? minutesValue.data : 0,
    );
    onConfirm(time);
  }

  _getHoursIndex(): number {
    return _hoursDataStringToIndex(this._hoursPickerRef.getSelected());
  }

  _getMinutesIndex(): number {
    const { minuteInterval } = this.props;
    // https://github.com/facebook/flow/issues/6644
    // $FlowFixMe
    return _minutesDataStringToIndex(this._minutesPickerRef.getSelected(), minuteInterval);
  }

  _scrollTime(
    minimumHoursIndex: ?number,
    minimumMinutesIndex: ?number,
    baseHoursIndex?: number = this._getHoursIndex(),
    baseMinutesIndex?: number = this._getMinutesIndex(),
  ): void {
    const hoursIndex = calculateHoursIndex(minimumHoursIndex, baseHoursIndex);
    this._hoursPickerRef.scrollToIndex(hoursIndex);
    this._scrollMinutes(
      minimumHoursIndex,
      minimumMinutesIndex,
      hoursIndex,
      baseMinutesIndex,
    );
  }

  _scrollMinutes(
    minimumHoursIndex: ?number,
    minimumMinutesIndex: ?number,
    baseHoursIndex: number,
    baseMinutesIndex: number,
  ): void {
    const minutesIndex = calculateMinutesIndex(
      minimumHoursIndex,
      minimumMinutesIndex,
      baseHoursIndex,
      baseMinutesIndex,
    );
    this._minutesPickerRef.scrollToIndex(minutesIndex);
  }

  render() {
    const {
      hours,
      minutes,
      onCancel,
      isVisible,
      minuteInterval,
      minimumTime,
    } = this.props;

    const minimumHoursIndex: ?number = minimumTime
      ? minimumTime.getHours()
      : null;
    const minimumMinutesIndex: ?number = minimumTime
      // $FlowFixMe
      ? MIN_INTERVALS[minuteInterval].convertMinutesToIndex(minimumTime.getMinutes())
      : null;

    // $FlowFixMe
    const minsStrings = MIN_INTERVALS[minuteInterval]
      .values
      .map(value => value.dataString);
    return (
      <View style={styles.container}>
        <Dialog
          width={0.9}
          visible={isVisible}
          rounded
          actions={[
            <DialogButton
              text="Cancel"
              onPress={onCancel}
              key="button-1"
              bordered={false}
              textStyle={styles.actionText}
              style={styles.actions}
            />,
            <DialogButton
              text="OK"
              onPress={() => this._completeSelectTime()}
              key="button-2"
              bordered={false}
              textStyle={styles.actionText}
              style={styles.actions}
            />,
          ]}
          containerStyle={styles.dialogContainer}
          dialogStyle={styles.dialogStyle}
          onTouchOutside={() => onCancel()}
          onShow={() => {
            this._scrollTime(
              minimumHoursIndex,
              minimumMinutesIndex,
            );
          }}
        >
          <DialogContent style={styles.dialogContent}>
            <View style={styles.dialogInnerPickersView}>
              <View style={styles.pickerWrapperView}>
                <ScrollPicker
                  ref={(ref) => { this._hoursPickerRef = ref; }}
                  dataSource={HOURS_STRINGS}
                  selectedIndex={hours}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor="#7B7D81"
                  renderItem={_renderNumberItems}
                  onValueChange={(data, selectedIndex) => {
                    this._scrollTime(
                      minimumHoursIndex,
                      minimumMinutesIndex,
                      selectedIndex,
                    );
                  }}
                />
              </View>
              <View style={styles.timeColon}>
                <Text>:</Text>
              </View>
              <View
                style={styles.pickerWrapperView}
              >
                <ScrollPicker
                  ref={(ref) => { this._minutesPickerRef = ref; }}
                  dataSource={minsStrings}
                  // $FlowFixMe
                  selectedIndex={MIN_INTERVALS[minuteInterval].convertMinutesToIndex(minutes)}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor="#7B7D81"
                  renderItem={_renderNumberItems}
                  onValueChange={(data, selectedIndex) => {
                    this._scrollMinutes(
                      minimumHoursIndex,
                      minimumMinutesIndex,
                      this._getHoursIndex(),
                      selectedIndex,
                    );
                  }}
                />
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogContainer: {
    zIndex: 10,
    elevation: 10,
  },
  dialogStyle: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    width: '60%',
    height: '35%',
  },
  dialogContent: {
    backgroundColor: '#fafafa',
    width: '80%',
    height: '70%',
  },
  dialogInnerPickersView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  pickerWrapperView: {
    flex: 3,
    height: 75,
    justifyContent: 'center',
  },
  timeColon: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedNumber: {
    fontSize: 20,
    color: 'black',
  },
  nonSelectedNumber: {
    fontSize: 20,
    color: '#DDD',
  },
  actionText: {
    fontSize: 12,
    color: '#2370DF',
  },
});
