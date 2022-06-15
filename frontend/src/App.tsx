import styled from 'styled-components';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import BoardCard from './components/BoardCard';

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
    font-size: 18px;
    margin-bottom: 10px;
    width: 90%;
    text-align: left;
`;

function App() {
    const [todos, setTodos] = useRecoilState(todoState);
    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setTodos((allBoard) => {
                const copyBoard = [...allBoard[source.droppableId]];
                copyBoard.splice(source.index, 1);
                copyBoard.splice(destination.index, 0, draggableId);
                return {
                    ...allBoard,
                    [source.droppableId]: copyBoard,
                };
            });
        } else {
            setTodos((allBoard) => {
                const copySourceBoard = [...allBoard[source.droppableId]];
                const copyDestinationBoard = [
                    ...allBoard[destination.droppableId],
                ];

                copySourceBoard.splice(source.index, 1);
                copyDestinationBoard.splice(destination.index, 0, draggableId);

                return {
                    ...allBoard,
                    [source.droppableId]: copySourceBoard,
                    [destination.droppableId]: copyDestinationBoard,
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(todos).map((category, index) => {
                        return (
                            <Droppable key={category} droppableId={category}>
                                {(magic) => (
                                    <Board
                                        ref={magic.innerRef}
                                        {...magic.droppableProps}
                                    >
                                        <Title>{category}</Title>
                                        {todos[category].map((todo, index) => (
                                            <BoardCard
                                                key={todo}
                                                index={index}
                                                draggableId={todo}
                                            />
                                        ))}
                                        {magic.placeholder}
                                    </Board>
                                )}
                            </Droppable>
                        );
                    })}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
