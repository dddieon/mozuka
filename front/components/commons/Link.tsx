import NextLink from 'next/link';
import React, { FunctionComponent } from 'react';
import { colors, fontSizes, fontWeights } from '../../styles/variables';
import styled from "@emotion/styled";

interface OwnProps {
  href: string,
  style?: object | null,
  size?: keyof typeof fontSizes | null;
  bg?: keyof typeof colors | null;
  bd?: keyof typeof colors | null;
  weight?: keyof typeof fontWeights | null;
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

const Div = styled.div`
  > a {
    display: block;
  }
`

const Link: FunctionComponent<Props> = (props) => {
  const { href, style, bg, bd, size, weight, isFixed, children } = props;

  return (
    <Div
      css={{
        width: '100%',
        borderRadius: '1rem',
        padding: '1.6rem',
        textAlign: 'center',
        backgroundColor: bg ? colors[bg] : colors.gray,
        color: bg !== "theme" ? colors.black : colors.white,
        border: bd ? `1px solid ${colors[bd]}` : colors.theme,
        fontSize: size ? fontSizes[size] : fontSizes.normal,
        fontWeight: weight ? fontWeights[weight] : fontWeights.medium,
        cursor: 'pointer',
        ...style,
        ...fixedStyle(isFixed) // input focus -> fixed
      }}
    >
      <NextLink href={href}>{children}</NextLink>
    </Div>
  );
};

export {
  Link
}
