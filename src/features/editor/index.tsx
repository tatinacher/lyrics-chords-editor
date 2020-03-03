import * as React from "react";
import styled from "styled-components";
import { getTextWidth } from "../../lib/measurement";
import { chordColor, chordsKeys } from "../../constants/chords";
import { Chord } from "../../ui/atoms/chord";
import { songTitle } from "../../constants/";

type ChordType = {
  name: string;
  width: number;
  color: string;
};

type ChordsType = {
  name: string;
  color: string;
};

interface EditorProps {
  title?: string;
  text?: string;
}

const removeDuplicates = (array: Array<boolean>) => {
  return array.filter((a, b) => array.indexOf(a) === b);
};

const findColorByName = (name: string, allChords: Set<ChordsType>) => {
  let color = "";
  allChords.forEach(chord => {
    if (chord.name === name) {
      color = chord.color;
    }
  });
  return color;
};

const removeExtraSpaces = (line: string) =>
  line
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

const setChords = (
  line: string,
  chords: Array<string>,
  allChords: Set<ChordsType>
) => {
  let index = 0;
  const res: Array<ChordType> = [];

  for (let i = 0; i < chords.length - 1; i++) {
    const substr = line.substring(index, line.indexOf(chords[i + 1]));
    const strLength = getTextWidth(substr, "16px Arial") || 0;
    const name = chords[i];
    const chordColor = findColorByName(name, allChords);
    console.log(name, allChords, chordColor);
    res.push({
      name: name,
      width: strLength,
      color: chordColor
    });
    index += substr.length;
  }

  const name = chords[chords.length - 1];
  const chordColor = findColorByName(name, allChords);

  res.push({
    name: name,
    width: 100,
    color: chordColor
  });
  return res;
};

const checkIfWordIsChord = (arrLine: Array<string>) =>
  arrLine.map(word => {
    let isChord = false;
    chordsKeys.forEach(chord => {
      if (word.includes(chord)) {
        isChord = true;
      }
    });
    return isChord;
  });

const isChordsLine = (line: string) => {
  const arrLine = removeExtraSpaces(line);
  const lines = checkIfWordIsChord(arrLine);
  const simpleLine = removeDuplicates(lines);
  return simpleLine.length === 1 && simpleLine[0];
};

const getAllChords = (lyrics: Array<string>) => {
  const res: Set<string> = new Set();
  lyrics.forEach(el => {
    if (isChordsLine(el)) {
      const chords = removeExtraSpaces(el);
      chords.forEach(chord => res.add(chord));
    }
  });
  return res;
};

const setColors = (chords: Set<string>) => {
  const res: Set<ChordsType> = new Set();
  let index = 0;
  chords.forEach(chord => {
    res.add({
      name: chord,
      color: chordColor[index]
    });
    index += 1;
  });
  return res;
};

export const Editor: React.FC<EditorProps> = ({ title, text }) => {
  const [lyrics, setLyrics] = React.useState("");
  const [lyricsLines, setLyricsLines] = React.useState<
    Array<string | ChordType[]>
  >([]);

  const parse = () => {
    const result = lyrics.split(/\r?\n/);
    const res: Array<string | ChordType[]> = [];
    const allChords = getAllChords(result);
    const chordsWithColors = setColors(allChords);
    result.forEach(el => {
      const containsChords = isChordsLine(el);
      if (containsChords) {
        const arrChords = removeExtraSpaces(el);
        const chords = setChords(el, arrChords, chordsWithColors);
        res.push(chords);
      } else {
        res.push(el);
      }
    });
    setLyricsLines(res);
  };

  const handleChange = React.useCallback(event => {
    setLyrics(event.target.value);
  }, []);

  return (
    <EditorBlock>
      <label>{songTitle}: </label>
      <Title>{title}</Title>
      <EditorInput name="name" value={lyrics} onChange={handleChange} />
      <button onClick={parse}>Parse</button>
      <Preview>
        {lyricsLines.map((el, index) =>
          typeof el === "string" ? (
            <div key={index}>{el}</div>
          ) : (
            <Line key={index}>
              {el.map(chord => (
                <Chord
                  background={chord.color}
                  width={chord.width}
                  color="black"
                >
                  {chord.name}
                </Chord>
              ))}
            </Line>
          )
        )}
      </Preview>
    </EditorBlock>
  );
};

export const EditorInput = styled.textarea`
  width: 100%;
  height: 400px;
  border: 1px solid #000000;
  font-size: 16px;
  font-family: Arial;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
`;

export const Line = styled.div`
  display: flex;
`;

export const Preview = styled.div`
  font-size: 16px;
  font-family: Arial;
`;

export const EditorBlock = styled.div`
  padding: 0 15px;
`;

export const Title = styled.input`
  border: 1px solid #000000;
  font-size: 16px;
  margin: 10px 0;
`;
