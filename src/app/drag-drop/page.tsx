"use client";

import Board from "@/lib/components/Board";
import { toDoState } from "@/lib/store/dragAtom";
import { useState } from "react";
import {
  DragDropContext,
  DragStart,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DragDrop = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isBoard, setIsBoard] = useState(false);

  const onDragStart = (info: DragStart) => {
    const { source } = info;
    if (source.droppableId === "all") {
      setIsBoard(true);
    } else {
      setIsBoard(false);
    }
  };

  const onDragEnd = (info: DropResult) => {
    // draggableId : 드래그한 아이템
    // destination : 도착점 정보
    // source : 시작점 정보
    const { destination, source, draggableId } = info;

    //undefined면
    if (!destination) return;
    //Board 자체 이동
    if (source.droppableId === "all") {
      setToDos((allBoards) => {
        const copyBoardKeys = Object.keys(toDos).map((toDoKey) => {
          return toDoKey;
        });
        copyBoardKeys.splice(source.index, 1);
        copyBoardKeys.splice(destination.index, 0, draggableId);

        const temp: { [key: string]: string[] } = {};

        copyBoardKeys.forEach((_, index) => {
          const copyKey = copyBoardKeys[index];
          temp[copyKey] = allBoards[copyKey];
        });

        return temp;
      });
    } //same Board라면
    else if (
      destination.droppableId === source.droppableId &&
      source.droppableId !== "all"
    ) {
      setToDos((allBoards) => {
        const copyOldTodos = [...allBoards[source.droppableId]];
        //시작점
        copyOldTodos.splice(source.index, 1);
        //도착점
        copyOldTodos.splice(destination.index, 0, draggableId);
        return { ...allBoards, [source.droppableId]: copyOldTodos };
      });
    } //diffrent Board라면
    else {
      setToDos((allBoards) => {
        console.log(allBoards);
        const sourceTodos = [...allBoards[source.droppableId]];
        const destTodos = [...allBoards[destination.droppableId]];

        sourceTodos.splice(source.index, 1);
        destTodos.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceTodos,
          [destination.droppableId]: destTodos,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable
        droppableId="all"
        direction="horizontal"
        isDropDisabled={!isBoard}
      >
        {(dropEvent) => (
          <Wrapper ref={dropEvent.innerRef} {...dropEvent.droppableProps}>
            {Object.keys(toDos).map((toDoKey, index) => (
              <Draggable key={toDoKey} draggableId={toDoKey} index={index}>
                {(dragEvent) => (
                  <Board
                    key={toDoKey}
                    toDos={toDos[toDoKey]}
                    droppableId={toDoKey}
                    dragEvent={dragEvent}
                    isBoard={isBoard}
                  />
                )}
              </Draggable>
            ))}
            {/* 카드리스트 영역 사이즈 유지 */}
            {dropEvent.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;

const Wrapper = styled.section`
  padding: 30px;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  gap: 20px;
`;
