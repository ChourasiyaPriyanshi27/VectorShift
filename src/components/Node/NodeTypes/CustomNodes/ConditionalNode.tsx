import React from 'react';
import { Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import createNodeType from '../../createNodeType';
import styles from '../../Node.module.css';

const ConditionalContent = ({ data }) => {
  return (
    <div>
      <label className={styles.label}>Condition</label>
      <textarea
        value={data.condition || "// JavaScript condition\nreturn input > 10;"}
        onChange={(e) => data.onConditionChange && data.onConditionChange(e.target.value)}
        className={styles.textArea}
        style={{ height: '80px' }}
      />
    </div>
  );
};

const ConditionalNode = createNodeType({
  type: 'conditional',
  label: 'Conditional',
  icon: <GitBranch size={16} />,
  color: '#EF4444', // Red
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
      label: 'Input'
    },
    {
      id: 'true',
      type: 'source',
      position: Position.Right,
      label: 'True'
    },
    {
      id: 'false',
      type: 'source',
      position: Position.Bottom,
      label: 'False'
    }
  ],
  contentComponent: ConditionalContent,
  initialData: {
    condition: "// JavaScript condition\nreturn input > 10;"
  }
});

export default ConditionalNode;