import React from 'react';
import { Position } from 'reactflow';
import { Globe } from 'lucide-react';
import createNodeType from '../../createNodeType';
import styles from '../../Node.module.css';

const APIContent = ({ data }) => {
  return (
    <div>
      <div>
        <label className={styles.label}>API Endpoint</label>
        <input
          type="text"
          value={data.endpoint || ''}
          onChange={(e) => data.onEndpointChange && data.onEndpointChange(e.target.value)}
          placeholder="https://api.example.com/data"
          className={styles.input}
        />
      </div>
      
      <div style={{ marginTop: '8px' }}>
        <label className={styles.label}>Method</label>
        <div className={styles.selectWrapper}>
          <select 
            value={data.method || 'GET'} 
            onChange={(e) => data.onMethodChange && data.onMethodChange(e.target.value)}
            className={styles.select}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
    </div>
  );
};

const APINode = createNodeType({
  type: 'api',
  label: 'API Request',
  icon: <Globe size={16} />,
  color: '#06B6D4', // Cyan
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
      label: 'Payload'
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Response'
    }
  ],
  contentComponent: APIContent,
  initialData: {
    endpoint: '',
    method: 'GET'
  }
});

export default APINode;