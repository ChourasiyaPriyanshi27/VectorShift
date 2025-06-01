import React from 'react';
import { Position } from 'reactflow';
import { Code } from 'lucide-react';
import createNodeType from '../../createNodeType';

const DataProcessorContent = ({ data }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Function</label>
      <textarea
        value={data.function || "// Write your data transformation function here\nfunction process(data) {\n  return data;\n}"}
        onChange={(e) => data.onChange && data.onChange(e.target.value)}
        className="w-full h-24 p-2 text-sm border border-gray-300 rounded-md"
      />
    </div>
  );
};

const DataProcessorNode = createNodeType({
  type: 'dataProcessor',
  label: 'Data Processor',
  icon: <Code size={16} />,
  color: '#EC4899', // Pink
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
      label: 'Input'
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Output'
    }
  ],
  contentComponent: DataProcessorContent,
  initialData: {
    function: "// Write your data transformation function here\nfunction process(data) {\n  return data;\n}"
  }
});

export default DataProcessorNode;