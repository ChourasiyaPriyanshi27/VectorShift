import React, { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import styles from '../Node.module.css';

interface TextContentProps {
  data: any;
  id: string;
  updateDimensions: (width: number, height: number) => void;
  updateNodeHandles?: (handles: any[]) => void;
}

const TextContent: React.FC<TextContentProps> = ({ data, id, updateDimensions, updateNodeHandles }) => {
  const [text, setText] = useState(data.text || '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const extractVariables = (text: string) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1].trim());
    }
    
    return [...new Set(matches)]; 
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    if (data.onChange) {
      data.onChange(newText);
    }
    
    resizeTextArea();
    
    const variables = extractVariables(newText);
    if (updateNodeHandles) {
      const handles = variables.map(variable => ({
        id: `var-${variable}`,
        type: 'target' as const,
        position: Position.Left,
        label: variable
      }));
      updateNodeHandles(handles);
    }
  };
  
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      
      updateDimensions(textarea.scrollWidth, textarea.scrollHeight + 40);
    }
  };
  
  useEffect(() => {
    resizeTextArea();
    
    if (updateNodeHandles) {
      const variables = extractVariables(text);
      const handles = variables.map(variable => ({
        id: `var-${variable}`,
        type: 'target' as const,
        position: Position.Left,
        label: variable
      }));
      updateNodeHandles(handles);
    }
  }, []);
  
  return (
    <textarea
      ref={textAreaRef}
      value={text}
      onChange={handleTextChange}
      placeholder="Enter text here... Use {{variable}} syntax to create input handles."
      className={styles.textArea}
    />
  );
};

export default TextContent;