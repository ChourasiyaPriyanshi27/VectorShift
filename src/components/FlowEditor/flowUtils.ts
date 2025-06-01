import { Node, Edge } from 'reactflow';

export const hasCycle = (nodes: Node[], edges: Edge[]): boolean => {
  const graph: Record<string, string[]> = {};
  
  nodes.forEach(node => {
    graph[node.id] = [];
  });
  
  edges.forEach(edge => {
    if (graph[edge.source]) {
      graph[edge.source].push(edge.target);
    }
  });
  
  const visited: Record<string, boolean> = {};
  const recStack: Record<string, boolean> = {};
  
  const isCyclicUtil = (nodeId: string): boolean => {
    visited[nodeId] = true;
    recStack[nodeId] = true;
    
    for (const adjNode of graph[nodeId]) {
      if (!visited[adjNode] && isCyclicUtil(adjNode)) {
        return true;
      }
      else if (recStack[adjNode]) {
        return true;
      }
    }
    
    recStack[nodeId] = false;
    return false;
  };
  
  for (const node of nodes) {
    if (!visited[node.id] && isCyclicUtil(node.id)) {
      return true;
    }
  }
  
  return false;
};

export const getFlowData = () => {
  return {
    getNodes: () => [],
    getEdges: () => []
  };
};