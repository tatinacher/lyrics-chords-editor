import * as React from "react";
import { Preview } from "./preview";
import { parseLyrics } from "../../lib/chords/";
import { EditorBlock, EditorContainer, EditorInput, Title } from "./styles";
import { ChordType } from "../../constants/types";
import { songTitle } from "../../constants/";
import { updateSong } from "../song/model";
interface EditorProps {
  title?: string;
  text?: string;
}

export const Editor: React.FC<EditorProps> = ({ title, text }) => {
  const [
    lyrics,
    setLyrics
  ] = React.useState(` B        F#        B        F#        E          E7
Good day sunshine, good day sunshine, good day sunshine`);
  const [lyricsLines, setLyricsLines] = React.useState<
    Array<string | ChordType[]>
  >([]);

  const handleChange = React.useCallback(event => {
    setLyrics(event.target.value);
  }, []);

  const onClickHandler = React.useCallback(() => {
    const lines = parseLyrics(lyrics);
    setLyricsLines(lines);
    updateSong(lines);
  }, [lyrics]);

  return (
    <EditorContainer>
      <EditorBlock>
        <label>
          {songTitle}: <Title>{title}</Title>
        </label>
        <EditorInput name="name" value={lyrics} onChange={handleChange} />
        <button onClick={onClickHandler}>Parse</button>
      </EditorBlock>
      <Preview title={title} lyricsLines={lyricsLines} />
    </EditorContainer>
  );
};
