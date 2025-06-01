import React from 'react';
import styles from '../Node.module.css';

interface OutputContentProps {
  data: any;
  id: string;
}

const OutputContent: React.FC<OutputContentProps> = ({ data }) => {
  return (
    <div>
      <label className={styles.label}>{data.label || 'Output'}</label>
      <div className={styles.input} style={{ backgroundColor: '#f9f9f9' }}>
        {data.value || 'No output yet'}
      </div>
    </div>
  );
};

export default OutputContent;