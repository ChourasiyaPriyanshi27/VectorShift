import React from 'react';
import { Position } from 'reactflow';
import { FileOutputIcon as OutputIcon } from 'lucide-react';
import createNodeType from '../createNodeType';
import { OutputContent } from '../NodeContent';

const OutputNode = createNodeType({
  type: 'output',
  label: 'Output',
  icon: <OutputIcon size={16} />,
  color: '#10B981', // Green
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
    }
  ],
  contentComponent: OutputContent,
  initialData: {
    value: '',
    label: 'Output'
  }
});

export default OutputNode;