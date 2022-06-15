import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import React from 'react';

const Card = styled.div`
    width: 90%;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
`;

interface ICardProps {
    index: number;
    draggableId: string;
}

const Text = styled.p`
    box-sizing: border-box;
    width: 100%;
    white-space: normal;
    line-height: 1.25rem;
    font-size: 14px;
`;

function BoardCard({ index, draggableId }: ICardProps) {
    return (
        <Draggable index={index} draggableId={draggableId}>
            {(magic) => (
                <Card
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <Text>{draggableId}</Text>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(BoardCard);
