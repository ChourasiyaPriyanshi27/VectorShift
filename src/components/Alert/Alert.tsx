import React from 'react';
import styles from '../FlowEditor/FlowEditor.module.css';

interface ParseResult {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

interface AlertProps {
  result: ParseResult;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ result, onClose }) => {
  return (
    <div className={styles.alertOverlay}>
      <div className={styles.alert}>
        <div className={styles.alertTitle}>Pipeline Analysis</div>
        <div className={styles.alertContent}>
          <div className={styles.alertItem}>
            <span className={styles.alertLabel}>Number of Nodes:</span>
            <span className={styles.alertValue}>{result.num_nodes}</span>
          </div>
          <div className={styles.alertItem}>
            <span className={styles.alertLabel}>Number of Edges:</span>
            <span className={styles.alertValue}>{result.num_edges}</span>
          </div>
          <div className={styles.alertItem}>
            <span className={styles.alertLabel}>Is DAG:</span>
            <span className={`${styles.alertValue} ${result.is_dag ? styles.success : styles.error}`}>
              {result.is_dag ? 'Yes ✓' : 'No ✗'}
            </span>
          </div>
          
          {!result.is_dag && (
            <div style={{ marginTop: '12px', fontSize: '14px', color: '#64748b' }}>
              <p>Your pipeline contains a cycle. In a DAG (Directed Acyclic Graph), nodes cannot form circular dependencies.</p>
            </div>
          )}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;