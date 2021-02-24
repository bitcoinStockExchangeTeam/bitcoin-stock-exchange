import React from 'react';
import Text from './Text';

export default {
  component: Text,
  title: 'Text'
};

const Template = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Paragraph',
  type: 'PARAGRAPH_1',
  state: 'PRIMARY'
};

export const Warning = Template.bind({});
Warning.args = {
  text: 'Paragraph',
  type: 'PARAGRAPH_1',
  state: 'WARNING'
};

export const Heading = Template.bind({});
Heading.args = {
  text: 'Heading',
  type: 'HEADING_3',
  state: 'PRIMARY'
};

export const Label = Template.bind({});
Label.args = {
  text: 'Label',
  type: 'LABEL',
  state: 'PRIMARY',
  labelControl: 'Sample'
};
