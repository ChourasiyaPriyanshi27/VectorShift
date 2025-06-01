import React, { useState, useCallback } from 'react';
import { Position, NodeProps } from 'reactflow';
import { FileText } from 'lucide-react';
import { TextContent } from '../NodeContent';
import BaseNode from '../BaseNode';

// Custom implementation for Text node to support dynamic handles
const TextNode = (props: NodeProps) => {
  const [dynamicHandles, setDynamicHandles] = useState<any[]>([]);
  
  // Merge static and dynamic handles
  const handles = [
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
    },
    ...dynamicHandles
  ];
  
  // Update handles when variables change
  const updateNodeHandles = useCallback((newHandles: any[]) => {
    setDynamicHandles(newHandles);
  }, []);
  
  const config = {
    type: 'text',
    label: 'Text',
    icon: <FileText size={16} />,
    color: '#F97316', // Orange
    handles: handles,
    contentComponent: (contentProps: any) => (
      <TextContent
        {...contentProps}
        updateNodeHandles={updateNodeHandles}
      />
    ),
    initialData: {
      text: ''
    }
  };
  
  return <BaseNode {...props} config={config} />;
};

export default TextNode;