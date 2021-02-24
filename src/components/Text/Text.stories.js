import React from 'react';
import Text from './Text';

export default {
  component: Text,
  title: 'Text'
};

const Template = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Paragraph',
  type: 'PARAGRAPH_1'
};
