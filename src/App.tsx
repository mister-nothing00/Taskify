import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "./componenti/InputField";
import { Todo } from "./Model";
import TodoList from "./componenti/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo.trim()) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    let add,
      active = todos,
      complete = completed;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompleted(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        w="100%"
        minH="100vh"
        flexDir="column"
        alignItems="center"
        bg="blue.700"
      >
        <Box>
          <Heading
            color="white"
            fontFamily="Nunito"
            fontSize={40}
            my={{ md: 30, sm: 15 }}
          >
            TASKIFY
          </Heading>
        </Box>
        <Box>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        </Box>

        <TodoList
          todos={todos}
          setTodos={setTodos}
          completed={completed}
          setCompleted={setCompleted}
        />
      </Flex>
    </DragDropContext>
  );
};

export default App;
