import { chordsKeys, chordColor, chordsSuffixes } from "../../constants/chords";
import { getTextWidth } from "../../lib/measurement";
import { ChordsType, ChordType } from "../../constants/types";

const removeDuplicates = (array: Array<boolean>) => {
  return array.filter((a, b) => array.indexOf(a) === b);
};

const containsKey: (word: string) => string | undefined = word => {
  let keyChord;
  chordsKeys.forEach(chord => {
    if (word.includes(chord)) {
      keyChord = chord;
    }
  });
  return keyChord;
};

const checkIfChordsLine = (arrLine: Array<string>) =>
  arrLine.map((word: string) => {
    let isChord = false;
    const chordKey = containsKey(word);
    if (!chordKey) {
      return isChord;
    }

    const suffix = word.slice(chordKey.length);
    if (suffix.length === 0) {
      isChord = true;
      return isChord;
    }

    const hasSuffix = chordsSuffixes.includes(word.slice(chordKey.length));
    if (chordKey && hasSuffix) {
      isChord = true;
    }
    return isChord;
  });

export const removeExtraSpaces = (line: string) =>
  line
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

export const isChordsLine = (line: string) => {
  const arrLine = removeExtraSpaces(line);
  const lines = checkIfChordsLine(arrLine);
  const simpleLine = removeDuplicates(lines);
  return simpleLine.length === 1 && simpleLine[0];
};

export const getAllChords = (lyrics: Array<string>) => {
  const res: Set<string> = new Set();
  lyrics.forEach(el => {
    if (isChordsLine(el)) {
      const chords = removeExtraSpaces(el);
      chords.forEach(chord => res.add(chord));
    }
  });
  return res;
};

export const setColors = (chords: Set<string>) => {
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

const findColorByName = (name: string, allChords: Set<ChordsType>) => {
  let color = "";
  allChords.forEach(chord => {
    if (chord.name === name) {
      color = chord.color;
    }
  });
  return color;
};

export const setChords = (
  line: string,
  chords: Array<string>,
  allChords: Set<ChordsType>,
  nextLine: string
) => {
  let index = 0;
  const res: Array<ChordType> = [];
  let width = 0;
  const maxLendth = getTextWidth(nextLine, "16px Arial") || 0;

  for (let i = 0; i < chords.length - 1; i++) {
    const substr = line.substring(index, line.indexOf(chords[i + 1]));
    const strLength = getTextWidth(substr, "16px Arial") || 0;
    const name = chords[i];
    const chordColor = findColorByName(name, allChords);
    res.push({
      name: name,
      width: strLength,
      color: chordColor
    });
    index += substr.length;
    width += strLength;
  }

  const name = chords[chords.length - 1];
  const chordColor = findColorByName(name, allChords);

  res.push({
    name: name,
    width: maxLendth - width,
    color: chordColor
  });
  return res;
};

export const parseLyrics: (
  lyrics: string
) => Array<string | ChordType[]> = lyrics => {
  const lines: Array<string | ChordType[]> = [];
  const lyricLines = lyrics.split(/\r?\n/);
  const allChords = getAllChords(lyricLines);
  const chordsWithColors = setColors(allChords);

  for (let i = 0; i < lyricLines.length; i++) {
    const line = lyricLines[i];
    const nextLine = lyricLines[i + 1];
    const containsChords = isChordsLine(line);
    if (containsChords && nextLine !== "") {
      const chords = removeExtraSpaces(line);
      const chordsInfo = setChords(line, chords, chordsWithColors, nextLine);
      lines.push(chordsInfo, nextLine);
      i += 1;
    } else {
      lines.push(line);
    }
  }
  return lines;
};
