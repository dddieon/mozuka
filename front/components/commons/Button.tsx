import React, { FunctionComponent } from 'react';
import { colors, fontSizes, fontWeights } from '../../styles/variables';

interface OwnProps {
  style?: object | null,
  size?: keyof typeof fontSizes | null;
  bg?: keyof typeof colors | null;
  bd?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null; // 여기서 막힘! todo
  onClick?: (e: React.MouseEvent) => void;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = (props) => {
  const { style, bg, bd, size, weight, children, onClick } = props;
  return (
    <button
      onClick={onClick}
      css={{
        display: 'inline-block',
        width: '100%',
        borderRadius: '1rem',
        padding: '1.6rem',
        backgroundColor: bg ? colors[bg] : colors.gray,
        color: bg !== "theme" ? colors.black : colors.white,
        border: bd ? `1px solid ${colors[bd]}` : colors.theme,
        fontSize: size ? fontSizes[size] : fontSizes.normal,
        fontWeight: weight ? fontWeights[weight] : fontWeights.medium,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export {
  Button
}
