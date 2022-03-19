import React, {FunctionComponent} from 'react';
import Image from "next/image";
import {css} from "@emotion/react";
import {P, Span} from "./Font";
import {colors} from "../../styles/variables";

const boxStyle = css`
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 2rem 3rem;
  margin-bottom: 5.2rem;
  width: 100%;
  background-color: ${colors.gray};

  > span {
    min-width: 3.3rem;
  }

  > div {
    margin-left: 3rem;

    > p {
      margin-bottom: 0.6rem;
    }
  }
`

interface OwnProps {
  image: string;
  text: string;
  linkText?: string;
  href?: string;
}

type Props = OwnProps;

const Box: FunctionComponent<Props> = (props) => {
  const {image, text, linkText, href} = props;
  return (
    <div css={boxStyle}>
      <Image
        //src="/images/gift-box.svg"
        src={image}
        alt="선물 아이콘"
        width={50}
        height={50}
      />
      <div>
        <P color={'darkGray'}>
          {/*시작하기를 누르면 새로운 랜프티콘을 생성할 수 있어요.*/}
          {text}
        </P>
        {
          linkText && href ?
            <a href={href} target={"_blank"} rel="noreferrer">
              <Span color={'theme'} weight={'bold'}>
                {linkText}
              </Span>
            </a>
            :
            null
        }
      </div>
    </div>
  )
}

export {
  Box
}
