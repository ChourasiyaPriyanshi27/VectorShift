import React, { useState } from 'react';
import FlowEditor from './components/FlowEditor/FlowEditor';
import Alert from './components/Alert/Alert';
import { submitPipeline } from './submit';
import { getFlowData } from './components/FlowEditor/flowUtils';
import styles from './components/FlowEditor/FlowEditor.module.css';

function App() {
  const [alertResult, setAlertResult] = useState<null | any>(null);
  
  const handleSubmit = async () => {
    const flowInstance = getFlowData();
    const nodes = flowInstance.getNodes();
    const edges = flowInstance.getEdges();
    
    try {
      const result = await submitPipeline(nodes, edges);
      setAlertResult(result);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setAlertResult({
        num_nodes: 0,
        num_edges: 0,
        is_dag: false,
        error: 'Failed to submit pipeline. Please try again.'
      });
    }
  };
  
  return (
    <div className="app">
      <div className={styles.flowEditor}>
        <div className={styles.header}>
          <div className={styles.title}>VectorShift Flow Editor</div>
          <div className={styles.actions}>
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit Pipeline
            </button>
          </div>
        </div>
        
        <div className={styles.flowContainer}>
          <FlowEditor />
        </div>
      </div>
      
      {alertResult && (
        <Alert result={alertResult} onClose={() => setAlertResult(null)} />
      )}
    </div>
  );
};

export default App;