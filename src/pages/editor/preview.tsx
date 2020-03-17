import * as React from "react";
import styled from "styled-components";
import { Chord } from "../../ui/atoms/chord";
import { ChordType } from "../../constants/types";

interface PreviewProps {
  lyricsLines: Array<string | ChordType[]>;
  title: string | undefined;
}

const TextLine: React.FC<{ line: string }> = ({ line }) => <div>{line}</div>;

const ChordLine: React.FC<{ line: ChordType[] }> = ({ line }) => (
  <Line>
    {line.map((chord, index) => (
      <Chord
        background={chord.color}
        color="black"
        key={index}
        width={chord.width}
      >
        {chord.name}
      </Chord>
    ))}
  </Line>
);

const SongLine: React.FC<{ songline: string | ChordType[] }> = ({ songline }) =>
  typeof songline === "string" ? (
    <TextLine line={songline} />
  ) : (
    <ChordLine line={songline} />
  );

export const Preview: React.FC<PreviewProps> = ({ lyricsLines, title }) => (
  <PreviewContainer>
    <Title>{title}</Title>
    {lyricsLines.map((el, index) => (
      <SongLine songline={el} key={index} />
    ))}
  </PreviewContainer>
);

export const PreviewContainer = styled.div`
  font-size: 16px;
  font-family: Arial;
  padding-top: 30px;
`;

export const Line = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-size: 24px;
`;
