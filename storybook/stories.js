// @flow
import React from 'react';
import type { Node } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';

import TimePicker from '../src/components/TimePicker';

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50%',
};

const CenteredView = ({ children }: { children: Node }) => (
  <View style={style}>
    {children}
  </View>
);

storiesOf('Stories', module)
  .add('TimePicker', () => (
    <CenteredView>
      <TimePicker />
    </CenteredView>
  ));
