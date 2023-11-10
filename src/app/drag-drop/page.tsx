"use client";

import Board from "@/lib/components/Board";
import { toDoState } from "@/lib/store/dragAtom";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DragDrop = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);

    // draggableId : 드래그한 아이템
    // destination : 도착점 정보
    // source : 시작점 정보
    const { destination, source, draggableId } = info;
    console.log(info);

    //undefined면
    if (!destination) return;

    //same Board라면
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const copyOldTodos = [...allBoards[source.droppableId]];
        //시작점
        copyOldTodos.splice(source.index, 1);
        //도착점
        copyOldTodos.splice(destination.index, 0, draggableId);
        return { ...allBoards, [source.droppableId]: copyOldTodos };
      });
    } else {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all">
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
                  />
                )}
              </Draggable>
            ))}
          </Wrapper>
        )}
      </Droppable>
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
