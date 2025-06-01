import InputNode from './InputNode';
import OutputNode from './OutputNode';
import LLMNode from './LLMNode';
import TextNode from './TextNode';
import DataProcessorNode from './CustomNodes/DataProcessorNode';
import APINode from './CustomNodes/APINode';
import ImageGeneratorNode from './CustomNodes/ImageGeneratorNode';
import DatabaseNode from './CustomNodes/DatabaseNode';
import ConditionalNode from './CustomNodes/ConditionalNode';

// Export the standard node types
export const standardNodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
};

// Export individual components
export { InputNode, OutputNode, LLMNode, TextNode };
export { DataProcessorNode, APINode, ImageGeneratorNode, DatabaseNode, ConditionalNode };

// Export the node types with custom nodes included
export const nodeTypes = {
  ...standardNodeTypes,
  dataProcessor: DataProcessorNode,
  api: APINode,
  imageGenerator: ImageGeneratorNode,
  database: DatabaseNode,
  conditional: ConditionalNode,
};