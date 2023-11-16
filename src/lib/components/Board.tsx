import { DraggableId, DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  droppableId: string;
  dragEvent: DraggableProvided;
  isBoard: boolean;
}
interface ISnapshot {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}
const Board = ({ toDos, droppableId, dragEvent, isBoard }: IBoardProps) => {
  return (
    <Wrapper
      ref={dragEvent.innerRef}
      {...dragEvent.draggableProps}
      {...dragEvent.dragHandleProps}
    >
      <Droppable droppableId={droppableId} isDropDisabled={isBoard}>
        {(dropEvent, snapshot) => (
          <CardList
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={dropEvent.innerRef}
            {...dropEvent.droppableProps}
          >
            <h2 className="boardName">{droppableId}</h2>
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

const CardList = styled.ul<ISnapshot>`
  width: 300px;
  min-height: 500px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#C4DFDF" : "#D2E9E9"};
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background-color 0.15s;

  .boardName {
    color: #333;
    font-size: 20px;
    font-weight: 700;
  }
`;
