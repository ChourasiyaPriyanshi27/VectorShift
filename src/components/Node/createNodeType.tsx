import { NodeProps } from 'reactflow';
import BaseNode, { NodeConfig } from './BaseNode';

// Function to create a node type with a specific configuration
export const createNodeType = (config: NodeConfig) => {
  const NodeComponent = (props: NodeProps) => {
    return <BaseNode {...props} config={config} />;
  };
  
  // Set display name for debugging
  NodeComponent.displayName = `${config.type}Node`;
  
  return NodeComponent;
};

export default createNodeType;