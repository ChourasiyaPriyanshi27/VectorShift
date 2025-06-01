import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Connection,
  Node,
  NodeChange,
  EdgeChange,
  ConnectionLineType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '../Node/NodeTypes';
import AddNodePanel from './AddNodePanel';
import styles from './FlowEditor.module.css';

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 100 },
    data: { label: 'User Input', value: '' }
  },
  {
    id: '2',
    type: 'llm',
    position: { x: 500, y: 100 },
    data: { model: 'gpt-4', temperature: 0.7 }
  },
  {
    id: '3',
    type: 'output',
    position: { x: 750, y: 100 },
    data: { label: 'Response' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'output', targetHandle: 'input', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'input', type: 'smoothstep' }
];

const FlowEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isAddingNode, setIsAddingNode] = useState<boolean>(false);
  
  // Handle node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  // Handle new connections
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3B82F6' }
      }, eds));
    },
    []
  );
  
  // Add a new node to the flow
  const addNode = useCallback((type: string) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position: { x: 350, y: 250 },
      data: {} // Default data will come from the node type
    };
    
    setNodes((nds) => [...nds, newNode]);
    setIsAddingNode(false);
  }, [nodes]);
  
  // Get data for the submit function
  const getFlowData = () => {
    return { nodes, edges };
  };
  
  return (
    <div className={styles.flowEditor}>
      <div className={styles.header}>
        <div className={styles.title}>VectorShift Flow Editor</div>
        <div className={styles.actions}>
          <button 
            className={styles.addButton}
            onClick={() => setIsAddingNode(!isAddingNode)}
          >
            {isAddingNode ? 'Cancel' : 'Add Node'}
          </button>
        </div>
      </div>
      
      <div className={styles.flowContainer}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        
        {isAddingNode && (
          <AddNodePanel onAddNode={addNode} onClose={() => setIsAddingNode(false)} />
        )}
      </div>
    </div>
  );
};

export default FlowEditor;
export { getFlowData } from './flowUtils';