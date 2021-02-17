/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Text from './Text';

export default {
  component: Text,
  title: 'Text'
};

const Template = (args) => <Text {...args} />;

export const H1Primary = Template.bind({});
H1Primary.args = {
  text: 'Heading X1',
  type: 'HEADING_1',
  state: 'PRIMARY'
};

export const H2Primary = Template.bind({});
H2Primary.args = {
  text: 'Heading X2',
  type: 'HEADING_2',
  state: 'PRIMARY'
};

export const H3Primary = Template.bind({});
H3Primary.args = {
  text: 'Heading X3',
  type: 'HEADING_3',
  state: 'PRIMARY'
};

export const H4Primary = Template.bind({});
H4Primary.args = {
  text: 'Heading X4',
  type: 'HEADING_4',
  state: 'PRIMARY'
};

export const H5Primary = Template.bind({});
H5Primary.args = {
  text: 'Heading X5',
  type: 'HEADING_5',
  state: 'PRIMARY'
};

export const H6Primary = Template.bind({});
H6Primary.args = {
  text: 'Heading X6',
  type: 'HEADING_6',
  state: 'PRIMARY'
};

export const P1Primary = Template.bind({});
P1Primary.args = {
  text: 'Paragraph X1',
  type: 'PARAGRAPH_1',
  state: 'PRIMARY'
};

export const P2Primary = Template.bind({});
P2Primary.args = {
  text: 'Paragraph X2',
  type: 'PARAGRAPH_2',
  state: 'PRIMARY'
};

export const LabelPrimary = Template.bind({});
LabelPrimary.args = {
  text: 'Label',
  type: 'LABEL',
  state: 'PRIMARY'
};
