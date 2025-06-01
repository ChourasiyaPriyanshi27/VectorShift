import React, { useState } from 'react';
import styles from '../Node.module.css';

interface LLMContentProps {
  data: any;
  id: string;
}

const LLMContent: React.FC<LLMContentProps> = ({ data }) => {
  const [model, setModel] = useState(data.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setModel(newModel);
    
    if (data.onModelChange) {
      data.onModelChange(newModel);
    }
  };
  
  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTemp = parseFloat(e.target.value);
    setTemperature(newTemp);
    
    if (data.onTempChange) {
      data.onTempChange(newTemp);
    }
  };
  
  return (
    <div>
      <div className={styles.field}>
        <label className={styles.label}>Model</label>
        <div className={styles.selectWrapper}>
          <select 
            value={model} 
            onChange={handleModelChange}
            className={styles.select}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="palm-2">PaLM 2</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
      
      <div className={styles.field} style={{ marginTop: '8px' }}>
        <label className={styles.label}>Temperature: {temperature}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={handleTempChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default LLMContent;