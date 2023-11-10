import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  todo: string;
  index: number;
}

const DraggableCard = ({ todo, index }: IDraggableCard) => {


  return (
    <Draggable draggableId={todo} index={index}>
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
  );
};

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 5px;
  padding: 30px;
  font-size: 20px;
`;

//export default DraggableCard;

//렌더링 최적화 props 변경된 엘리먼트 렌더링
export default React.memo(DraggableCard);
