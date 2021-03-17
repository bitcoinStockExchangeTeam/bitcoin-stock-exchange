import React from 'react';
import PropTypes from 'prop-types';
import './text.scss';

const types = {
  HEADING_1: 'heading-1',
  HEADING_2: 'heading-2',
  HEADING_3: 'heading-3',
  HEADING_4: 'heading-4',
  HEADING_5: 'heading-5',
  HEADING_6: 'heading-6',
  PARAGRAPH_1: 'paragraph-1',
  PARAGRAPH_2: 'paragraph-2',
  LABEL: 'label'
};

const states = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  MUTED: 'muted',
  ACCENT: 'accent',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
  BRIGHT: 'bright'
};

export const isSupported = (type, shouldBeParagraph) => {
  const supportedTypes = Object.values(types);
  const regex = shouldBeParagraph ? /paragraph-\d+/ : /heading-\d+/;
  const filteredTypes = supportedTypes.filter((supportedType) => (regex).test(supportedType));
  return filteredTypes.some((supportedType) => supportedType === type);
};

export const getHeadingSize = (type) => type.slice(-1);

export const selectTag = (type) => {
  if (isSupported(type, true)) {
    return 'p';
  }

  if (isSupported(type, false)) {
    const headerSize = getHeadingSize(type);
    return `h${headerSize}`;
  }

  return type;
};

const Text = ({ text, type, state, labelControl }) => {
  const classes = `text ${types[type]} ${states[state]}`;
  const Tag = selectTag(types[type]);

  return (
    <Tag {...(Tag === 'label' ? { htmlFor: labelControl } : {})} className={classes}>
      {text}
    </Tag>
  );
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(types)).isRequired,
  state: PropTypes.oneOf(Object.keys(states)),
  labelControl: PropTypes.string
};

Text.defaultProps = { state: 'PRIMARY', labelControl: '' };

export default Text;
