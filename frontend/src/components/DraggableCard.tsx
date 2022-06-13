import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0,0,0,0.05)' : 'none'};
`;

interface IProps {
  item: string;
  index: number;
}

function DraggableCard({ item, index }: IProps) {
  return (
    <Draggable draggableId={item} index={index}>
      {(magic, snapshot) => (
        <Card
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          ref={magic.innerRef}
          isDragging={snapshot.isDragging}
        >
          {item}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
