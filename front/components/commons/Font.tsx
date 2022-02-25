import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { colors, fontSizes } from '../../styles/variables';

export interface fontType {
  small: string;
  normal: string;
  big: string;
}

interface OwnProps {
  size: keyof fontType;
  text: string;
  color?: 'gray' | 'theme';
}

type Props = OwnProps;

const Font: FunctionComponent<Props> = (props) => {
  const { size, text, color } = props;
  if (size === 'big') {
    return (
      <h2
        css={css`
          color: ${color ? colors[color] : null};
          font-size: ${fontSizes[size]};
        `}
      >
        {text}
      </h2>
    );
  } else {
    return (
      <p
        css={css`
          color: ${color ? colors[color] : null};
          font-size: ${fontSizes[size]};
        `}
      >
        {text}
      </p>
    );
  }
};

export default Font;
