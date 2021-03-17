import React from 'react';
import { shallow, render } from 'enzyme';
import Text, { isSupported, getHeadingSize, selectTag } from './Text';

describe('isSupported function', () => {
  it('should valid correct paragraph', () => {
    [
      'paragraph-1',
      'paragraph-2'
    ].forEach((type) => {
      expect(isSupported(type, true))
        .toBe(true);
    });
  });

  it('should not valid not paragraph', () => {
    [
      'heading-1',
      'paragrap-1'
    ].forEach((type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  it('should not valid incorrect formatted paragraph', () => {
    [
      ' paragraph ',
      ' paragraph-1',
      'paragraph-1 ',
      'PARAGRAPH-2'
    ].forEach((type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  it('should not valid incorrect size paragraph', () => {
    [
      'paragraph-3',
      'paragraph-0'
    ].forEach((type) => {
      expect(isSupported(type, true))
        .toBe(false);
    });
  });

  it('should valid correct heading', () => {
    [
      'heading-1',
      'heading-2',
      'heading-6'
    ].forEach((type) => {
      expect(isSupported(type, false))
        .toBe(true);
    });
  });

  it('should not valid not heading', () => {
    [
      'paragraph-1',
      'headin-1'
    ].forEach((type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });

  it('should not valid incorrect formatted heading', () => {
    [
      ' heading ',
      ' heading-1',
      'heading-1 ',
      'HEADING-2'
    ].forEach((type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });

  it('should not valid incorrect size heading', () => {
    [
      'heading-7',
      'heading-0'
    ].forEach((type) => {
      expect(isSupported(type, false))
        .toBe(false);
    });
  });
});

describe('getHeadingSize function', () => {
  it('should return correct heading size', () => {
    [
      ['heading-1', '1'],
      ['heading-2', '2'],
      ['heading-3', '3'],
      ['heading-4', '4'],
      ['heading-5', '5'],
      ['heading-6', '6']
    ].forEach(([type, size]) => {
      expect(getHeadingSize(type))
        .toBe(size);
    });
  });
});

describe('selectTag function', () => {
  it('should return correct html heading tag', () => {
    [
      ['heading-1', 'h1'],
      ['heading-2', 'h2'],
      ['heading-3', 'h3'],
      ['heading-4', 'h4'],
      ['heading-5', 'h5'],
      ['heading-6', 'h6']
    ].forEach(([type, tag]) => {
      expect(selectTag(type))
        .toBe(tag);
    });
  });

  it('should return correct html paragraph tag', () => {
    [
      ['paragraph-1', 'p'],
      ['paragraph-2', 'p']
    ].forEach(([type, tag]) => {
      expect(selectTag(type))
        .toBe(tag);
    });
  });

  it('should return correct html label tag', () => {
    expect(selectTag('label'))
      .toBe('label');
  });

  it('should return incorrect type', () => {
    [
      'hello',
      'paragraph-6'
    ].forEach((type) => {
      expect(selectTag(type))
        .toBe(type);
    });
  });
});

describe('component render', () => {
  const createTestComponent = (args, type = 'PARAGRAPH_1', text = 'test') => <Text {...{ text, type, ...args }} />;

  it('should render component without errors', () => {
    expect(shallow(createTestComponent()).contains(<p className="text paragraph-1 primary">test</p>)).toBe(true);
  });

  it('should have correct classes', () => {
    [
      [[{}], 'text paragraph-1 primary'],
      [[{}, 'PARAGRAPH_2'], 'text paragraph-2 primary'],
      [[{ state: 'WARNING' }], 'text paragraph-1 warning'],
      [[{ state: 'MUTED' }, 'HEADING_1'], 'text heading-1 muted'],
      [[{ state: 'BRIGHT' }, 'HEADING_6'], 'text heading-6 bright'],
      [[{ state: 'SUCCESS' }, 'LABEL'], 'text label success']
    ].forEach(([props, classes]) => {
      expect(shallow(createTestComponent(...props)).prop('className')).toBe(classes);
    });
  });

  it('should have correct tag', () => {
    [
      [[{}], 'p'],
      [[{}, 'PARAGRAPH_2'], 'p'],
      [[{}, 'HEADING_1'], 'h1'],
      [[{}, 'HEADING_6'], 'h6'],
      [[{}, 'LABEL'], 'label']
    ].forEach(([type, tag]) => {
      expect(shallow(createTestComponent(...type)).is(tag)).toBe(true);
    });
  });

  describe('should have correct text', () => {
    [
      ['test '],
      ['hello'],
      [''],
      ['kokokokokokoko'],
      ['    ']
    ].forEach(([text]) => {
      expect(render(createTestComponent({}, 'PARAGRAPH_1', text)).text()).toEqual(text);
    });
  });

  it('should have correct "for" attribute if is label', () => {
    [
      [[{ labelControl: 'test' }, 'LABEL'], 'test'],
      [[{}, 'LABEL'], '']
    ].forEach(([props, attributeValue]) => {
      expect(shallow(createTestComponent(...props)).prop('htmlFor')).toBe(attributeValue);
    });
  });

  it('should not have "for" attribute if is not label', () => {
    [
      [{ labelControl: 'test' }],
      [{}, 'HEADING_4']
    ].forEach(([props]) => {
      expect(shallow(createTestComponent(props)).prop('htmlFor')).toBe(undefined);
    });
  });
});
