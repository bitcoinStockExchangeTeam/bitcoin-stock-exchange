import React from 'react';
import { shallow, render } from 'enzyme';
import Text, { isParagraph, isHeading, getHeadingSize, selectTag } from './Text';

describe('Checking if type is paragraph', () => {
  it('for paragraph', () => {
    expect(isParagraph('paragraph-1'))
      .toBe(true);
    expect(isParagraph('paragraph-2'))
      .toBe(true);
  });

  it('for not paragraph', () => {
    expect(isParagraph('heading-1'))
      .toBe(false);
    expect(isParagraph('paragrap-1'))
      .toBe(false);
  });

  it('for wrong format paragraph', () => {
    expect(isParagraph(' paragraph '))
      .toBe(false);
    expect(isParagraph(' paragraph-1'))
      .toBe(false);
    expect(isParagraph('paragraph-1 '))
      .toBe(false);
    expect(isParagraph('PARAGRAPH-2'))
      .toBe(false);
  });

  it('for paragraph with wrong size', () => {
    expect(isParagraph('paragraph-3'))
      .toBe(false);
    expect(isParagraph('paragraph-0'))
      .toBe(false);
  });
});

describe('Checking if type is heading', () => {
  it('for heading', () => {
    expect(isHeading('heading-1'))
      .toBe(true);
    expect(isHeading('heading-2'))
      .toBe(true);
    expect(isHeading('heading-6'))
      .toBe(true);
  });

  it('for not heading', () => {
    expect(isHeading('paragraph-1'))
      .toBe(false);
    expect(isHeading('headin-1'))
      .toBe(false);
  });

  it('for wrong format heading', () => {
    expect(isHeading(' heading '))
      .toBe(false);
    expect(isHeading(' heading-1'))
      .toBe(false);
    expect(isHeading('heading-1 '))
      .toBe(false);
    expect(isHeading('HEADING-2'))
      .toBe(false);
  });

  it('for heading with wrong size', () => {
    expect(isHeading('heading-7'))
      .toBe(false);
    expect(isHeading('heading-0'))
      .toBe(false);
  });
});

describe('Checking size of heading', () => {
  it('for correct type', () => {
    expect(getHeadingSize('heading-1'))
      .toBe('1');
    expect(getHeadingSize('heading-2'))
      .toBe('2');
    expect(getHeadingSize('heading-3'))
      .toBe('3');
    expect(getHeadingSize('heading-4'))
      .toBe('4');
    expect(getHeadingSize('heading-5'))
      .toBe('5');
    expect(getHeadingSize('heading-6'))
      .toBe('6');
  });

  it('for incorrect type', () => {
    expect(getHeadingSize('heading-7'))
      .toBe('');
    expect(getHeadingSize('hello-6'))
      .toBe('');
    expect(getHeadingSize('paragraph-1'))
      .toBe('');
  });
});

describe('Selecting tag by type', () => {
  it('for heading', () => {
    expect(selectTag('heading-1'))
      .toBe('h1');
    expect(selectTag('heading-2'))
      .toBe('h2');
    expect(selectTag('heading-3'))
      .toBe('h3');
    expect(selectTag('heading-4'))
      .toBe('h4');
    expect(selectTag('heading-5'))
      .toBe('h5');
    expect(selectTag('heading-6'))
      .toBe('h6');
  });

  it('for paragraph', () => {
    expect(selectTag('paragraph-1'))
      .toBe('p');
    expect(selectTag('paragraph-2'))
      .toBe('p');
  });

  it('for label', () => {
    expect(selectTag('label'))
      .toBe('label');
  });

  it('for not supported types', () => {
    expect(selectTag('hello'))
      .toBe('hello');
    expect(selectTag('paragraph-6'))
      .toBe('paragraph-6');
  });
});

describe('Test component rendering', () => {
  it('to render without throwing error', () => {
    expect(shallow(<Text text="test" type="PARAGRAPH_1" />).contains(<p className="paragraph-1 paragraph-1--primary">test</p>)).toBe(true);
  });

  it('to have correct classes', () => {
    expect(shallow(<Text text="test" type="PARAGRAPH_1" />).is('.paragraph-1')).toBe(true);
    expect(shallow(<Text text="test" type="PARAGRAPH_2" />).is('.paragraph-2')).toBe(true);
    expect(shallow(<Text text="test" type="PARAGRAPH_1" />).is('.paragraph-1--primary')).toBe(true);
    expect(shallow(<Text text="test" type="PARAGRAPH_1" state="WARNING" />).is('.paragraph-1--warning')).toBe(true);
    expect(shallow(<Text text="test" type="HEADING_1" state="MUTED" />).is('.heading-1--muted')).toBe(true);
    expect(shallow(<Text text="test" type="HEADING_6" state="BRIGHT" />).is('.heading-6--bright')).toBe(true);
    expect(shallow(<Text text="test" type="LABEL" state="SUCCESS" />).is('.label')).toBe(true);
  });

  it('to have correct tag', () => {
    expect(shallow(<Text text="test" type="PARAGRAPH_1" state="WARNING" />).is('p')).toBe(true);
    expect(shallow(<Text text="test" type="PARAGRAPH_2" />).is('p')).toBe(true);
    expect(shallow(<Text text="test" type="HEADING_1" state="MUTED" />).is('h1')).toBe(true);
    expect(shallow(<Text text="test" type="HEADING_6" state="BRIGHT" />).is('h6')).toBe(true);
    expect(shallow(<Text text="test" type="LABEL" state="SUCCESS" />).is('label')).toBe(true);
  });

  it('to have correct text', () => {
    expect(render(<Text text="test " type="PARAGRAPH_1" />).text()).toEqual('test ');
    expect(render(<Text text="hello" type="PARAGRAPH_2" />).text()).toBe('hello');
    expect(render(<Text text="" type="PARAGRAPH_1" />).text()).toBe('');
    expect(render(<Text text="kokokokokokoko" type="PARAGRAPH_1" state="WARNING" />).text()).toBe('kokokokokokoko');
    expect(render(<Text text="    " type="HEADING_1" state="MUTED" />).text()).toBe('    ');
  });

  it('for label to have correct for attribute', () => {
    expect(shallow(<Text text="test" type="LABEL" labelControl="test" />).is('[htmlFor="test"]')).toBe(true);
    expect(shallow(<Text text="test" type="LABEL" />).is('[htmlFor=""]')).toBe(true);
  });

  it('for not label to do not have for attribute', () => {
    expect(shallow(<Text text="test" type="PARAGRAPH_1" labelControl="test" />).is('[htmlFor="test"]')).toBe(false);
    expect(shallow(<Text text="test" type="HEADING_4" />).is('[htmlFor=""]')).toBe(false);
  });
});
