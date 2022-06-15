import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import Board from './components/Board';

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

function App() {
    const [todos, setTodos] = useRecoilState(todoState);
    const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setTodos((allBoard) => {
                const copyBoard = [...allBoard[source.droppableId]];
                const deleteData = copyBoard.splice(source.index, 1);
                copyBoard.splice(destination.index, 0, deleteData[0]);
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

                const deleteData = copySourceBoard.splice(source.index, 1);
                copyDestinationBoard.splice(
                    destination.index,
                    0,
                    deleteData[0]
                );

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
                        return <Board key={index} category={category} />;
                    })}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
