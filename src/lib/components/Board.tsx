import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./draggableCard";
import styled from "styled-components";

interface IBoardProps {
  toDos: string[];
  droppableId: string;
}
const Board = ({ toDos, droppableId }: IBoardProps) => {
  return (
    <Droppable droppableId={droppableId}>
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
  );
};

export default Board;

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
