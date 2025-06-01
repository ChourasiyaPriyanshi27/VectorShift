from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_for_cycle(nodes, edges):
    """
    Check if the graph represented by nodes and edges has a cycle.
    If it does, then it's not a DAG.
    """
    # Create adjacency list
    graph = {node["id"]: [] for node in nodes}
    for edge in edges:
        if edge["source"] in graph:
            graph[edge["source"]].append(edge["target"])
    
    # Detect cycle using DFS
    visited = set()
    rec_stack = set()
    
    def is_cyclic_util(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if is_cyclic_util(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
                
        rec_stack.remove(node_id)
        return False
    
    for node in nodes:
        if node["id"] not in visited:
            if is_cyclic_util(node["id"]):
                return True
    
    return False

@app.post("/pipelines/parse")
async def parse_pipeline(request: PipelineRequest):
    """
    Parse the pipeline and return the number of nodes, edges, and whether it's a DAG.
    """
    nodes = request.nodes
    edges = request.edges
    
    # Count nodes and edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a DAG (no cycles)
    has_cycle = check_for_cycle(nodes, edges)
    is_dag = not has_cycle
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }