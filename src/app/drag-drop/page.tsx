"use client";

import Board from "@/lib/components/Board";
import { toDoState } from "@/lib/store/dragAtom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DragDrop = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // draggableId : 드래그한 아이템
    // destination : 도착점 정보
    // source : 시작점 정보

    //undefined면
    if (!destination) return;
    // setToDos((oldToDos) => {
    //   const copyOldTodos = [...oldToDos];
    //   //시작점
    //   copyOldTodos.splice(source.index, 1);
    //   //도착점
    //   copyOldTodos.splice(destination.index, 0, draggableId);

    //   return copyOldTodos;
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        {Object.keys(toDos).map((toDoKey) => (
          <>
            <h2>{toDoKey}</h2>
            <Board key={toDoKey} toDos={toDos[toDoKey]} droppableId={toDoKey} />
          </>
        ))}
      </Wrapper>
    </DragDropContext>
  );
};

export default DragDrop;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};

  display: flex;

  justify-content: center;
  gap: 20px;
`;
