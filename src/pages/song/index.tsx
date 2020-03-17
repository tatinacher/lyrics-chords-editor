import * as React from "react";
import { Preview } from "../../features/editor/preview";
import { useStore } from "effector-react";
import { $song } from "../../features/song/model";

export const Song: React.FC = () => {
  const song = useStore($song);
  return <Preview lyricsLines={song} title={""} />;
};
