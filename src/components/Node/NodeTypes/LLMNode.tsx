import React from 'react';
import { Position } from 'reactflow';
import { Cpu } from 'lucide-react';
import createNodeType from '../createNodeType';
import { LLMContent } from '../NodeContent';

const LLMNode = createNodeType({
  type: 'llm',
  label: 'Language Model',
  icon: <Cpu size={16} />,
  color: '#8B5CF6', // Purple
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
      label: 'Prompt'
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Response'
    }
  ],
  contentComponent: LLMContent,
  initialData: {
    model: 'gpt-4',
    temperature: 0.7
  }
});

export default LLMNode;