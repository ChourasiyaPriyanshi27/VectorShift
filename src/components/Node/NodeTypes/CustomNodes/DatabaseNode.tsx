import React from 'react';
import { Position } from 'reactflow';
import { Database } from 'lucide-react';
import createNodeType from '../../createNodeType';
import styles from '../../Node.module.css';

const DatabaseContent = ({ data }) => {
  return (
    <div>
      <div>
        <label className={styles.label}>Database Type</label>
        <div className={styles.selectWrapper}>
          <select 
            value={data.dbType || 'postgres'} 
            onChange={(e) => data.onDbTypeChange && data.onDbTypeChange(e.target.value)}
            className={styles.select}
          >
            <option value="postgres">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="redis">Redis</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
      
      <div style={{ marginTop: '8px' }}>
        <label className={styles.label}>Query Type</label>
        <div className={styles.selectWrapper}>
          <select 
            value={data.queryType || 'select'} 
            onChange={(e) => data.onQueryTypeChange && data.onQueryTypeChange(e.target.value)}
            className={styles.select}
          >
            <option value="select">SELECT</option>
            <option value="insert">INSERT</option>
            <option value="update">UPDATE</option>
            <option value="delete">DELETE</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
    </div>
  );
};

const DatabaseNode = createNodeType({
  type: 'database',
  label: 'Database',
  icon: <Database size={16} />,
  color: '#4F46E5', // Indigo
  handles: [
    {
      id: 'query',
      type: 'target',
      position: Position.Left,
      label: 'Query'
    },
    {
      id: 'parameters',
      type: 'target',
      position: Position.Left,
      label: 'Parameters'
    },
    {
      id: 'results',
      type: 'source',
      position: Position.Right,
      label: 'Results'
    }
  ],
  contentComponent: DatabaseContent,
  initialData: {
    dbType: 'postgres',
    queryType: 'select'
  }
});

export default DatabaseNode;