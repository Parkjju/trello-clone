import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
    height: 100vh;
    overflow: auto;
    white-space: nowrap;
`;
const Boards = styled.div`
    padding-top: 10px;
    padding-left: 10px;
    display: inline-flex;
`;

const Board = styled.div`
    padding-top: 10px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.boardColor};
    width: 260px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    min-height: 210px;
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
    width: 90%;
    text-align: left;
`;

const Card = styled.div`
    width: 90%;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
`;

const Text = styled.p`
    box-sizing: border-box;
    width: 100%;
    white-space: normal;
    line-height: 1.25rem;
`;

function App() {
    const onDragEnd = () => {
        return null;
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId='ONE'>
                        {(magic) => (
                            <Board
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                <Draggable index={1} draggableId='two'>
                                    {(magic) => (
                                        <Card
                                            ref={magic.innerRef}
                                            {...magic.dragHandleProps}
                                            {...magic.draggableProps}
                                        >
                                            <Text>Hello!</Text>
                                        </Card>
                                    )}
                                </Draggable>
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
