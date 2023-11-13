import {
  DraggableProvided,
  DraggableProvidedDraggableProps,
  Droppable,
} from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

interface IBoardProps {
  toDos: string[];
  droppableId: string;
  
  dragEvent: DraggableProvided;
}
const Board = ({ toDos, droppableId, dragEvent }: IBoardProps) => {
  return (
    <Wrapper
      ref={dragEvent.innerRef}
      {...dragEvent.draggableProps}
      {...dragEvent.dragHandleProps}
    >
      <Droppable droppableId={droppableId}>
        {(dropEvent) => (
          <CardList ref={dropEvent.innerRef} {...dropEvent.droppableProps}>
            <h2>{droppableId}</h2>
            {toDos.map((todo, index) => (
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {/* 카드리스트 영역 사이즈 유지 */}
            {dropEvent.placeholder}
          </CardList>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
const Wrapper = styled.div``;

const CardList = styled.ul`
  width: 300px;
  min-height: 500px;
  background-color: ${(props) => props.theme.cardListBgColor};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;
