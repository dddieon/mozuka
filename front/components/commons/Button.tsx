import React, {FunctionComponent} from 'react';
import {colors, fontSizes, fontWeights} from '../../styles/variables';
import {css} from "@emotion/react";

interface OwnProps {
  type?: 'kakao' | null,
  style?: object | null,
  size?: keyof typeof fontSizes | null;
  bg?: keyof typeof colors | null;
  bd?: keyof typeof colors | null;
  color?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null;
  onClick?: (e: React.MouseEvent) => void;
  isFixed?: boolean | null;
}

type Props = OwnProps;

const fixedStyle = (value: OwnProps['isFixed']): object => {
  return value ? {
    position: 'fixed',
    borderRadius: 0,
    bottom: 0,
    left: 0,
    right: 0
  } : {}
}

const kakaoStyle = (value: boolean): object => {
  return value ? {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  } : {}
}

const kakaoIconStyle = css`
  display: inline-block;
  width: 2.2rem;
  height: 2rem;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('/images/kakao.svg');
`

const Button: FunctionComponent<Props> = (props) => {
  const {type, style, bg, bd, color, size, weight, onClick, isFixed, children} = props;
  const isKakao = type === "kakao";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
      css={{
        display: 'inline-block',
        width: '100%',
        borderRadius: '1rem',
        padding: '1.6rem',
        backgroundColor: bg ? colors[bg] : isKakao ? colors.kakao : colors.gray,
        color: color ? colors[color] : bg !== "theme" ? colors.black : colors.white,
        border: bd ? `1px solid ${colors[bd]}` : colors.theme,
        fontSize: size ? fontSizes[size] : fontSizes.normal,
        fontWeight: weight ? fontWeights[weight] : fontWeights.medium,
        ...style,
        ...fixedStyle(isFixed),// input focus -> fixed
        ...kakaoStyle(isKakao)
      }}
    >
      {type === "kakao" ? <i css={kakaoIconStyle}/> : null}
      {children}
    </button>
  );
};

export {
  Button
}
