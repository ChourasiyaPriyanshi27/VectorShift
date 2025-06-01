import React from 'react';
import { Position } from 'reactflow';
import { Circle as InputCircle } from 'lucide-react';
import createNodeType from '../createNodeType';
import { InputContent } from '../NodeContent';

const InputNode = createNodeType({
  type: 'input',
  label: 'Input',
  icon: <InputCircle size={16} />,
  color: '#3B82F6', // Blue
  handles: [
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
    }
  ],
  contentComponent: InputContent,
  initialData: {
    value: '',
    label: 'Input'
  }
});

export default InputNode;