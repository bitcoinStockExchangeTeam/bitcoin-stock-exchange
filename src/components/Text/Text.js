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

function isParagraph(type) {
  return type.includes('paragraph');
}

function isHeading(type) {
  return type.includes('heading');
}

function getHeadingSize(type) {
  if (!isHeading(type)) throw new Error('Type is not heading');
  return type.slice(-1);
}

function selectTag(type) {
  if (isParagraph(type)) {
    return 'p';
  }

  if (isHeading(type)) {
    const headerSize = getHeadingSize(type);
    return `h${headerSize}`;
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
  type: PropTypes.oneOf([
    'HEADING_1',
    'HEADING_2',
    'HEADING_3',
    'HEADING_4',
    'HEADING_5',
    'HEADING_6',
    'PARAGRAPH_1',
    'PARAGRAPH_2',
    'LABEL'
  ]).isRequired,
  state: PropTypes.oneOf([
    'PRIMARY',
    'SECONDARY',
    'MUTED',
    'ACCENT',
    'WARNING',
    'SUCCESS',
    'ERROR',
    'BRIGHT'
  ])
};

Text.defaultProps = { state: 'PRIMARY' };
