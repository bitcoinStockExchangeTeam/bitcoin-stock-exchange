import React from 'react';
import { shallow, render } from 'enzyme';
import each from 'jest-each';
import Text, { isSupported, getHeadingSize, selectTag } from './Text';

describe('isSupported function', () => {
  describe('should valid correct paragraph', () => {
    each([
      ['paragraph-1'],
      ['paragraph-2']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, true))
        .toBe(true);
    });
  });

  describe('should not valid not paragraph', () => {
    each([
      ['heading-1'],
      ['paragrap-1']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  describe('should not valid incorrect formatted paragraph', () => {
    each([
      [' paragraph '],
      [' paragraph-1'],
      ['paragraph-1 '],
      ['PARAGRAPH-2']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  describe('should not valid incorrect size paragraph', () => {
    each([
      ['paragraph-3'],
      ['paragraph-0']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  describe('should valid correct heading', () => {
    each([
      ['heading-1'],
      ['heading-2'],
      ['heading-6']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, false))
        .toBe(true);
    });
  });

  describe('should not valid not heading', () => {
    each([
      ['paragraph-1'],
      ['headin-1']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });

  describe('should not valid incorrect formatted heading', () => {
    each([
      [' heading '],
      [' heading-1'],
      ['heading-1 '],
      ['HEADING-2']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });

  describe('should not valid incorrect size heading', () => {
    each([
      ['heading-7'],
      ['heading-0']
    ]).it('given %p type', (type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });
});

describe('getHeadingSize function', () => {
  describe('should return correct heading size', () => {
    each([
      ['heading-1', '1'],
      ['heading-2', '2'],
      ['heading-3', '3'],
      ['heading-4', '4'],
      ['heading-5', '5'],
      ['heading-6', '6']
    ]).it('given %p type, expected %p size', (type, size) => {
      expect(getHeadingSize(type))
        .toBe(size);
    });
  });
});

describe('selectTag function', () => {
  describe('should return correct html heading tag', () => {
    each([
      ['heading-1', 'h1'],
      ['heading-2', 'h2'],
      ['heading-3', 'h3'],
      ['heading-4', 'h4'],
      ['heading-5', 'h5'],
      ['heading-6', 'h6']
    ]).it('given %p type, expected %p tag', (type, tag) => {
      expect(selectTag(type))
        .toBe(tag);
    });
  });

  describe('should return correct html paragraph tag', () => {
    each([
      ['paragraph-1', 'p'],
      ['paragraph-2', 'p']
    ]).it('given %p type, expected %p tag', (type, tag) => {
      expect(selectTag(type))
        .toBe(tag);
    });
  });

  describe('should return correct html label tag', () => {
    expect(selectTag('label'))
      .toBe('label');
  });

  describe('should return incorrect type', () => {
    each([
      ['hello'],
      ['paragraph-6']
    ]).it('given %p type, expected %p tag', (type) => {
      expect(selectTag(type))
        .toBe(type);
    });
  });
});

describe('component render', () => {
  const createTestComponent = (args, type = 'PARAGRAPH_1', text = 'test') => <Text {...{ text, type, ...args }} />;

  it('should render component without errors', () => {
    expect(shallow(createTestComponent()).contains(<p className="paragraph-1 paragraph-1--primary">test</p>)).toBe(true);
  });

  describe('should have correct classes', () => {
    each([
      [[{}], 'paragraph-1 paragraph-1--primary'],
      [[{}, 'PARAGRAPH_2'], 'paragraph-2 paragraph-2--primary'],
      [[{ state: 'WARNING' }], 'paragraph-1 paragraph-1--warning'],
      [[{ state: 'MUTED' }, 'HEADING_1'], 'heading-1 heading-1--muted'],
      [[{ state: 'BRIGHT' }, 'HEADING_6'], 'heading-6 heading-6--bright'],
      [[{ state: 'SUCCESS' }, 'LABEL'], 'label label--success']
    ]).it('given %p props, expected %p classes', (props, classes) => {
      expect(shallow(createTestComponent(...props)).prop('className')).toBe(classes);
    });
  });

  describe('should have correct tag', () => {
    each([
      [[{}], 'p'],
      [[{}, 'PARAGRAPH_2'], 'p'],
      [[{}, 'HEADING_1'], 'h1'],
      [[{}, 'HEADING_6'], 'h6'],
      [[{}, 'LABEL'], 'label']
    ]).it('given %p props, expected %p tag', (type, tag) => {
      expect(shallow(createTestComponent(...type)).is(tag)).toBe(true);
    });
  });

  describe('should have correct text', () => {
    each([
      ['test '],
      ['hello'],
      [''],
      ['kokokokokokoko'],
      ['    ']
    ]).it('given %p text', (text) => {
      expect(render(createTestComponent({}, 'PARAGRAPH_1', text)).text()).toEqual(text);
    });
  });

  describe('should have correct "for" attribute if is label', () => {
    each([
      [[{ labelControl: 'test' }, 'LABEL'], 'test'],
      [[{}, 'LABEL'], '']
    ]).it('given %p props, expected %p htmlFor value', (props, attributeValue) => {
      expect(shallow(createTestComponent(...props)).prop('htmlFor')).toBe(attributeValue);
    });
  });

  describe('should not have "for" attribute if is not label', () => {
    each([
      [{ labelControl: 'test' }],
      [{}, 'HEADING_4']
    ]).it('given %p props', (props) => {
      expect(shallow(createTestComponent(props)).prop('htmlFor')).toBe(undefined);
    });
  });
});
