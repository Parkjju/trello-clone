import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IProps {
  item: string;
  index: number;
}

function DraggableCard({ item, index }: IProps) {
  return (
    <Draggable draggableId={item} index={index}>
      {(magic) => (
        <Card
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          ref={magic.innerRef}
        >
          {item}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
