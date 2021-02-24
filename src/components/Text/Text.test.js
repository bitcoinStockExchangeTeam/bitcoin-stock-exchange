import React from 'react';
import { mount, shallow } from 'enzyme';
import Text from './Text';

test('x', () => {
  console.log(shallow(<Text text="Paragraph" type="PARAGRAPH_1" />).debug());
  console.log(mount(<Text text="Paragraph" type="PARAGRAPH_1" />).debug());
});
