import { Box, Flex, Heading } from "@chakra-ui/react";
import { Todo } from "../Model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completed: Todo[];
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completed, setCompleted }) => {
  return (
    <>
      <Heading color="whiteAlpha.800" fontSize={32} my={8}>
        Attività
      </Heading>
      <Flex
        w="100%"
        maxW="1200px"
        direction={{ base: "column", md: "row" }}
        gap={8}
        mb={8}
      >
        <Droppable droppableId="TodosList">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              w="100%"
              bg="blackAlpha.50"
              p={8}
              borderRadius={16}
              overflow="hidden"
              boxShadow="lg"
            >
              <Heading color="whiteAlpha.800" fontSize={24} mb={4}>
                Attive
              </Heading>
              <Flex direction="column" gap={4}>
                {todos
                  .filter((todo) => !todo.isDone)
                  .map((todo, index) => (
                    <SingleTodo
                      key={todo.id}
                      todo={todo}
                      todos={todos}
                      setTodos={setTodos}
                      index={index}
                      setCompleted={setCompleted}
                    />
                  ))}
              </Flex>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>

        <Droppable droppableId="CompletedList">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              w="100%"
              bg="blackAlpha.50"
              p={8}
              borderRadius={16}
              overflow="hidden"
              boxShadow="lg"
            >
              <Heading color="whiteAlpha.800" fontSize={24} mb={4}>
                Completate
              </Heading>
              <Flex direction="column" gap={4}>
                {completed.map((todo, index) => (
                  <SingleTodo
                    key={todo.id}
                    todo={todo}
                    todos={completed}
                    setTodos={setCompleted}
                    index={index}
                    setCompleted={setCompleted} 
                  />
                ))}
              </Flex>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Flex>
    </>
  );
};

export default TodoList;
