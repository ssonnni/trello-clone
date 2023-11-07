"use client";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DragDrop = () => {
  const onDragEnd = () => {};

  const toDos = ["one", "two", "three", "four", "five", "six"];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="one">
          {(dropEvent) => (
            <CardList ref={dropEvent.innerRef} {...dropEvent.droppableProps}>
              {toDos.map((todo, index) => (
                <Draggable draggableId={todo} index={index} key={todo}>
                  {(dragEvent) => (
                    <Card
                      ref={dragEvent.innerRef}
                      {...dragEvent.draggableProps}
                      {...dragEvent.dragHandleProps}
                    >
                      {todo}
                    </Card>
                  )}
                </Draggable>
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

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 5px;
  padding: 30px;
  font-size: 20px;
`;
