import React from 'react';
import { Circle as InputCircle, FileOutputIcon as OutputIcon, Cpu, FileText, Code, Globe, Image, Database, GitBranch } from 'lucide-react';
import styles from './FlowEditor.module.css';

interface AddNodePanelProps {
  onAddNode: (type: string) => void;
  onClose: () => void;
}

const nodeOptions = [
  { type: 'input', label: 'Input', icon: <InputCircle size={18} /> },
  { type: 'output', label: 'Output', icon: <OutputIcon size={18} /> },
  { type: 'llm', label: 'Language Model', icon: <Cpu size={18} /> },
  { type: 'text', label: 'Text', icon: <FileText size={18} /> },
  { type: 'dataProcessor', label: 'Data Processor', icon: <Code size={18} /> },
  { type: 'api', label: 'API Request', icon: <Globe size={18} /> },
  { type: 'imageGenerator', label: 'Image Generator', icon: <Image size={18} /> },
  { type: 'database', label: 'Database', icon: <Database size={18} /> },
  { type: 'conditional', label: 'Conditional', icon: <GitBranch size={18} /> }
];

const AddNodePanel: React.FC<AddNodePanelProps> = ({ onAddNode, onClose }) => {
  return (
    <div className={styles.nodePanel}>
      <div className={styles.nodePanelTitle}>Add Node</div>
      <div className={styles.nodeList}>
        {nodeOptions.map((node) => (
          <div
            key={node.type}
            className={styles.nodeItem}
            onClick={() => onAddNode(node.type)}
          >
            <div className={styles.nodeIcon}>{node.icon}</div>
            <div className={styles.nodeLabel}>{node.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNodePanel;