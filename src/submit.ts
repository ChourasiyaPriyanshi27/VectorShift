import { Node, Edge } from 'reactflow';

export const submitPipeline = async (nodes: Node[], edges: Edge[]) => {
  try {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting pipeline:', error);
    throw error;
  }
};