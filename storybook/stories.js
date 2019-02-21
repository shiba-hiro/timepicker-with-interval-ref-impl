// @flow
import React from 'react';
import type { Node } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean } from '@storybook/addon-knobs';

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
  .add('TimePicker', () => {
    const isMinimumSet: boolean = boolean('isMinimumSetAs15:30?', false);
    return (
      <CenteredView>
        <TimePicker
          minimumTime={isMinimumSet ? new Date('2019-01-01T15:30') : null}
        />
      </CenteredView>
    );
  });
