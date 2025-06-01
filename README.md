# VectorShift Frontend Technical Assessment

This project implements a node-based interface for VectorShift's technical assessment. It allows users to create and connect various types of nodes in a flow-based interface, similar to the VectorShift platform.

## Features

- Node abstraction system for creating different types of nodes
- Dynamic text node with variable handle creation
- Backend integration for pipeline validation
- Modern, unified styling across all components
- Five demonstration custom nodes

## Project Structure

The project is organized as follows:

- `/src/components/Node`: Contains the node abstraction system
  - `BaseNode.tsx`: The core node component
  - `createNodeType.ts`: Factory function for creating node types
  - `/NodeContent`: Content components for different node types
  - `/NodeTypes`: Node type definitions

- `/src/components/FlowEditor`: Flow editor components
  - `FlowEditor.tsx`: Main flow editor component
  - `AddNodePanel.tsx`: Panel for adding new nodes
  - `flowUtils.ts`: Utility functions for flow operations

- `/src/components/Alert`: Alert component for showing backend responses

- `/backend`: FastAPI backend for pipeline validation

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
uvicorn main:app --reload
```

## Implementation Details

### Part 1: Node Abstraction

The node abstraction system uses a composition-based approach:

- `BaseNode.tsx`: Core node component that handles the common structure
- `createNodeType.ts`: Factory function for creating new node types
- Each node type defines its configuration (handles, color, icon, etc.)
- Content components for each node type handle the specific UI and logic

### Part 2: Styling

The styling uses a clean, modern design with:

- Consistent color scheme
- Card-based node design
- Clear visual hierarchy
- Smooth transitions and animations

### Part 3: Text Node Logic

The Text node includes:

- Dynamic resizing based on content
- Variable detection using the `{{variable}}` syntax
- Dynamic handle creation for detected variables

### Part 4: Backend Integration

The backend integration includes:

- Sending node and edge data to the FastAPI backend
- Analyzing the pipeline structure
- Displaying results in a user-friendly alert