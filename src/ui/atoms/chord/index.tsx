import * as React from "react";
import styled, { StyledComponent } from "styled-components";

interface ChordProps {
  background: string;
  color: string;
  width: number;
}

export const Chord: React.FC<ChordProps> = ({
  background,
  color,
  width,
  children
}) => (
  <ChordBlock>
    <ChordText> {children} </ChordText>
    <ChordLine background={background} color={color} width={width} />
  </ChordBlock>
);

const ChordLine: StyledComponent<"div", any, ChordProps> = styled.div<
  ChordProps
>`
  background: ${props => props.background};
  color: ${props => props.color};
  width: ${props => props.width}px;
  height: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 5px 0 10px;
`;

const ChordText = styled.div``;
const ChordBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
