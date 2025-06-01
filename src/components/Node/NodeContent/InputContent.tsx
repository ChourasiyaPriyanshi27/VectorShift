import React, { useState } from 'react';
import styles from '../Node.module.css';

interface InputContentProps {
  data: any;
  id: string;
  updateDimensions?: (width: number, height: number) => void;
}

const InputContent: React.FC<InputContentProps> = ({ data, id }) => {
  const [value, setValue] = useState(data.value || '');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (data.onChange) {
      data.onChange(newValue);
    }
  };
  
  return (
    <div>
      <label className={styles.label}>{data.label || 'Input'}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={data.placeholder || 'Enter value...'}
        className={styles.input}
      />
    </div>
  );
};

export default InputContent;