"use client";

import DraggableCard from "@/lib/components/draggableCard";
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
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // draggableId : 드래그한 아이템
    // destination : 도착점 정보
    // source : 시작점 정보

    //undefined면
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyOldTodos = [...oldToDos];
      //시작점
      copyOldTodos.splice(source.index, 1);
      //도착점
      copyOldTodos.splice(destination.index, 0, draggableId);

      return copyOldTodos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(dropEvent) => (
            <CardList ref={dropEvent.innerRef} {...dropEvent.droppableProps}>
              {toDos.map((todo, index) => (
                <DraggableCard key={todo} todo={todo} index={index} />
              ))}
              {/* 카드리스트 영역 사이즈 유지 */}
              {dropEvent.placeholder}
            </CardList>
          )}
        </Droppable>
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
  align-items: center;
  justify-content: center;
`;

const CardList = styled.ul`
  width: 500px;
  min-height: 500px;
  background-color: ${(props) => props.theme.cardListBgColor};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
