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

function selectTag(type) {
  if (type.includes('paragraph')) {
    return 'p';
  }
  if (type.includes('heading')) {
    return `h${type.slice(-1)}`;
  }
  return type;
}

export default function Text({ text, type, state }) {
  const classes = `${types[type]} ${types[type]}--${states[state]}`;
  const Tag = selectTag(types[type]);

  return (
    <Tag className={classes}>
      {text}
    </Tag>
  );
}

Text.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};
