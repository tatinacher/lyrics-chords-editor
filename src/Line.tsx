import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import styled, { StyledComponent } from "styled-components";
//import { Chord } from "./ui";
import { Editor } from "./pages/editor";

interface ChordsLine {
  id: string;
  content: string;
  background: string;
  color: string;
  width: number;
  height: number;
}

interface LineProps {
  chords: ChordsLine[];
  lyrics: string;
}

// const lyrics = "Good day sunshine";
// const chords = [
//   {
//     id: "0",
//     content: "B",
//     width: 100,
//     height: 30,
//     color: "black",
//     background: "#D6CE93"
//   },
//   {
//     id: "1",
//     content: "C",
//     width: 50,
//     height: 30,
//     color: "black",
//     background: "#A3A380"
//   },
//   {
//     id: "2",
//     content: "C",
//     width: 50,
//     height: 30,
//     color: "black",
//     background: "#D8A48F"
//   }
//];

const reorder = (list: ChordsLine[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const getItems = (items: Array<string>) => {
//   return items.map((el, index) => {
//     return {
//       id: index.toString(),
//       content: el
//     };
//   });
// };

const App: React.FC = () => <Editor />;

export const Line: React.FC<LineProps> = ({ chords, lyrics }) => {
  //const [isLyricEdit, setLyrics] = React.useState<boolean>(false);
  const [chordsLine, setChordsLine] = React.useState<ChordsLine[]>(chords);

  const onDragChordsEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newChordsLine = reorder(
      chordsLine,
      result.source.index,
      result.destination.index
    );
    setChordsLine(newChordsLine);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragChordsEnd}>
        <Droppable droppableId="droppable-2" direction="horizontal">
          {(provided, snapshot) => (
            <LineBlock
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {chordsLine.map((item, index) => (
                <Draggable key={index} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    // <Chord
                    //   ref={provided.innerRef}
                    //   {...provided.draggableProps}
                    //   {...provided.dragHandleProps}
                    //   width={item.width}
                    //   color={item.color}
                    //   background={item.background}
                    // >
                    //   {item.content}
                    // </Chord>
                    <div></div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </LineBlock>
          )}
        </Droppable>
      </DragDropContext>
      {lyrics}
    </>
  );
};

interface LineBlockProps {
  isDraggingOver: boolean;
}

const map = (props: LineBlockProps) => ({
  "data-isdraggingover": props.isDraggingOver
});

export const LineBlock: StyledComponent<"div", any, any> = styled.div.attrs(
  map
)`
  background: #efebce;
  display: flex;
  padding: grid;
  overflow: auto;
  &[data-isdraggingover="true"] {
    background: "#BB8588";
  }
`;

export default App;
