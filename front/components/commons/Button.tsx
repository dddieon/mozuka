import React, { FunctionComponent } from 'react';
import { colors, fontSizes, fontWeights } from '../../styles/variables';

interface OwnProps {
  style?: object | null,
  size?: keyof typeof fontSizes | null;
  bg?: keyof typeof colors | null;
  bd?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null;
  onClick?: (e: React.MouseEvent) => void;
  isFixed?: boolean | null;
}

type Props = OwnProps;

const fixedStyle = (value: OwnProps['isFixed']):object => {
  return value ? {
    position: 'fixed',
    borderRadius: 0,
    bottom: 0,
    left: 0,
    right: 0
  } : {}
}

const Button: FunctionComponent<Props> = (props) => {
  const { style, bg, bd, size, weight, onClick, isFixed, children } = props;

  return (
    <button
      type="button"
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
        ...fixedStyle(isFixed) // input focus -> fixed
      }}
    >
      {children}
    </button>
  );
};

export {
  Button
}
