import React, {FunctionComponent} from 'react';
import {css} from '@emotion/react';
import {colors, fontSizes, fontWeights} from '../../styles/variables';
import {Button} from "./Button";

interface OwnProps {
  size?: keyof typeof fontSizes | null;
  color?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null; // 여기서 막힘! todo
}

type Props = OwnProps;

const Span: FunctionComponent<Props> = (props) => {
  const {size, color, weight, children} = props;
  return (
    <span
      css={css`
        color: ${color ? colors[color] : colors.black};
        font-size: ${size ? fontSizes[size] : fontSizes.normal};
        font-weight: ${weight ? fontWeights[weight] : fontWeights.medium};
        word-break: keep-all;
      `}
    >
      {children}
    </span>
  );
};

const P: FunctionComponent<Props> = (props) => {
  const {size, color, weight, children} = props;
  return (
    <p
      css={css`
        color: ${color ? colors[color] : colors.black};
        font-size: ${size ? fontSizes[size] : fontSizes.normal};
        font-weight: ${weight ? fontWeights[weight] : fontWeights.medium};
        word-break: keep-all;
      `}
    >
      {children}
    </p>
  );
};

const H2: FunctionComponent<Props> = (props) => {
  const {size, color, weight, children} = props;
  return (
    <h2
      css={css`
        color: ${color ? colors[color] : colors.black};
        font-size: ${size ? fontSizes[size] : fontSizes.big};
        font-weight: ${weight ? fontWeights[weight] : fontWeights.bold};
        word-break: keep-all;
      `}
    >
      {children}
    </h2>
  );
};

export {H2, P, Span, Button};
