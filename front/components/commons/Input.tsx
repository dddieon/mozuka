import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { colors, fontSizes, fontWeights } from '../../styles/variables';

interface OwnProps {
  size?: keyof typeof fontSizes | null;
  color?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null; // 여기서 막힘! todo
  onChange: (e: React.ChangeEvent) => void;
}

type Props = OwnProps;

const Input: FunctionComponent<Props> = (props) => {
  const { size, color, weight, children, onChange } = props;
  return (
    <input
      onChange={onChange}
      css={css`
          color: ${color ? colors[color] : colors.black};
          font-size: ${size ? fontSizes[size] : fontSizes.normal};
          font-weight: ${weight ? fontWeights[weight] : fontWeights.medium};
        `}
    >
      {children}
    </input>
  );
};

export {
  Input
}
