import styled from "styled-components";

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

export const EditorBlock = styled.div`
  padding: 0 15px;
  flex-basis: 50%;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
