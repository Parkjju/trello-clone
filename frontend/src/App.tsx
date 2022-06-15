import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import Board from './components/Board';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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

interface IForm {
    category: string;
}

function App() {
    const [todos, setTodos] = useRecoilState(todoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    useEffect(() => {
        Object.keys(todos).map((category) => {
            if (!localStorage.getItem(`${category}`)) {
                localStorage.setItem(`${category}`, '[]');
            }
        });
        Object.keys(localStorage).map((category) => {
            const regex = /reactQ/;

            if (!category.match(regex)) {
                if (!localStorage.getItem(category)) {
                    localStorage.setItem(category, `[]`);
                } else {
                    const jsonString = '' + localStorage.getItem(`${category}`);
                    const categoryItem = JSON.parse(jsonString);

                    setTodos((allBoard) => {
                        // 보드 특정 카테고리가 undefined면 -> 로컬에 셋팅 하고 state에도 세팅
                        if (!allBoard[category]) {
                            const stringifiedCategoryItem =
                                JSON.stringify(categoryItem);
                            localStorage.setItem(
                                `${category}`,
                                stringifiedCategoryItem
                            );
                            return {
                                ...allBoard,
                                [category]: [...categoryItem],
                            };
                        } else {
                            return {
                                ...allBoard,
                                [category]: [...categoryItem],
                            };
                        }
                    });
                }
            }
        });
    }, []);

    const onValid = ({ category }: IForm) => {
        setValue('category', '');
        setTodos((allBoard) => {
            localStorage.setItem(`${category}`, '[]');

            return {
                ...allBoard,
                [`${category}`]: [],
            };
        });
    };

    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setTodos((allBoard) => {
                const copyBoard = [...allBoard[source.droppableId]];
                const deleteData = copyBoard.splice(source.index, 1);
                copyBoard.splice(destination.index, 0, deleteData[0]);

                const JsonString =
                    '' + localStorage.getItem(source.droppableId);
                let categoryItems = JSON.parse(JsonString);

                if (Array.isArray(categoryItems)) {
                    categoryItems = [...copyBoard];
                    localStorage.setItem(
                        `${source.droppableId}`,
                        JSON.stringify(categoryItems)
                    );
                }

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

                const sourceJsonString =
                    '' + localStorage.getItem(`${source.droppableId}`);
                const destinationJsonString =
                    '' + localStorage.getItem(`${destination.droppableId}`);

                let sourceJsonItem = JSON.parse(sourceJsonString);
                let destinationJsonItem = JSON.parse(destinationJsonString);

                if (Array.isArray(sourceJsonItem)) {
                    sourceJsonItem = [...copySourceBoard];
                    localStorage.setItem(
                        `${source.droppableId}`,
                        JSON.stringify(sourceJsonItem)
                    );
                }
                if (Array.isArray(destinationJsonItem)) {
                    destinationJsonItem = [...copyDestinationBoard];
                    localStorage.setItem(
                        `${destination.droppableId}`,
                        JSON.stringify(destinationJsonItem)
                    );
                }

                return {
                    ...allBoard,
                    [source.droppableId]: copySourceBoard,
                    [destination.droppableId]: copyDestinationBoard,
                };
            });
        }
    };
    console.log(todos);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(todos).map((category, index) => {
                        return <Board key={index} category={category} />;
                    })}
                </Boards>
                <form onSubmit={handleSubmit(onValid)}>
                    <input
                        type='text'
                        {...register('category')}
                        placeholder='Add custom category...'
                    />
                </form>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
