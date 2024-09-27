import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
export default function InputField({ todo, setTodo, handleAdd }: Props) {
  return (
    <form onSubmit={handleAdd}>
      <FormControl
        display="flex"
        width="full"
        position="relative"
        alignItems="center"
      >
        <InputGroup width="full">
          <Input
            color={"white"}
            letterSpacing={1.2}
            placeholder="Scrivi un'attività da svolgere"
            size="md"
            w={{ base: "300px", md: "500px" }}
            htmlSize={4}
            fontFamily="Source Sans Pro"
            borderRadius="50px"
            boxShadow="inset 0 0 10px gray.900"
            py="20px"
            px="30px"
            transition="all 0.2s ease-in"
            _focus={{
              borderColor: "#2c5282",
              boxShadow: "0 0 0 2px  #90cdf4",
            }}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <InputRightElement>
            <Button
              type="submit"
              colorScheme="blue"
              border="none"
              position={"absolute"}
              right={0}
              fontSize={14}
              width={"auto"}
              height={"auto"}
              margin={"12px"}
              padding={"4px 2px"}
              transition={"all 0.2s "}
              boxShadow={"0 0 10px #51555E"}
              borderRadius={"50px"}
              _hover={{ backgroundColor: "#388ae2" }}
              _active={{
                transform: "scale(0.8)",
                boxShadow: "0 0 5px #718096",
              }}
            >
              Go
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}
