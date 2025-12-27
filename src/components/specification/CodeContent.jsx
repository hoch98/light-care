import { Box, Text, HStack, Stack, Spinner, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeContent = () => {
  const [activeFile, setActiveFile] = useState("index.js");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const files = [
    { name: "index.js", path: "code/index.js.txt", language: "javascript" },
    { name: "heartbeat.js", path: "code/heartbeat.js.txt", language: "javascript" },
    { name: "server.js", path: "code/server.js.txt", language: "javascript" },
    { name: "background.py", path: "code/background.py.txt", language: "python" },
  ];

  useEffect(() => {
    const fetchCode = async () => {
      setIsLoading(true);
      try {
        const fileToFetch = files.find(f => f.name === activeFile);
        const response = await fetch(fileToFetch.path);
        const text = await response.text();
        setCodeSnippet(text);
      } catch (error) {
        setCodeSnippet("// Failed to load code content.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCode();
  }, [activeFile]);

  return (
    <Stack spaceY={4} w="100%" textAlign="left">
      <HStack
        spaceX={2}
        borderBottom="1px solid"
        borderColor="gray.100"
        pb={2}
        overflowX="auto"
        whiteSpace="nowrap"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "scrollbarWidth": "none",
          "-ms-overflow-style": "none",
        }}
      >
        {files.map((file) => (
          <Box
            key={file.name}
            as="button"
            onClick={() => setActiveFile(file.name)}
            px={4}
            py={1}
            fontSize="sm"
            fontWeight="bold"
            borderRadius="md"
            flexShrink={0}
            transition="all 0.2s"
            bg={activeFile === file.name ? "#ffbe5cff" : "transparent"}
            color={activeFile === file.name ? "white" : "gray.500"}
            _hover={{ bg: activeFile === file.name ? "#ffbe5cff" : "gray.100" }}
          >
            {file.name}
          </Box>
        ))}
      </HStack>

      <Box
        borderRadius="lg"
        overflow="auto"
        boxShadow="inner"
        bg="#1d1f21"
        maxH="500px"
        minH="300px"
        css={{
          "&::-webkit-scrollbar": { width: "8px", height: "8px" },
          "&::-webkit-scrollbar-track": { background: "#1d1f21" },
          "&::-webkit-scrollbar-thumb": {
            background: "#4A5568",
            borderRadius: "10px",
            border: "2px solid #1d1f21"
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#ffbe5cff" },
        }}
      >
        {isLoading ? (
          <Center h="300px">
            <Spinner color="#ffbe5cff" />
          </Center>
        ) : (
          <SyntaxHighlighter
            language={files.find(f => f.name === activeFile)?.language}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: '20px',
              fontSize: '14px',
              backgroundColor: 'transparent',
              overflow: 'visible',
            }}
          >
            {codeSnippet}
          </SyntaxHighlighter>
        )}
      </Box>
    </Stack>
  );
};

export default CodeContent;