import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../store/dragAtom";

interface IDraggableCard {
  todo: IToDo;
  index: number;
}
interface ISnapshot {
  isDragging: boolean;
}

const DraggableCard = ({ todo, index }: IDraggableCard) => {
  console.log(todo);
  
  return (
    <Draggable draggableId={todo.id + ""} index={index}>
      {(dragEvent, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={dragEvent.innerRef}
          {...dragEvent.draggableProps}
          {...dragEvent.dragHandleProps}
        >
          {todo.text}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.div<ISnapshot>`
  background-color: ${(props) =>
    props.isDragging ? "white" : props.theme.cardBgColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 3px 5px 3px rgb(7,7,7,0.2)" : ""};
  border-radius: 5px;
  padding: 30px;
  font-size: 20px;
  color: #444;
  transition: 0.15s;
`;

//export default DraggableCard;

//렌더링 최적화 props 변경된 엘리먼트 렌더링
export default React.memo(DraggableCard);
