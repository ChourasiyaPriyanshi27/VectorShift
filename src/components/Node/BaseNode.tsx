import React, { useState, useEffect } from 'react';
import { Position, Handle, NodeProps } from 'reactflow';
import styles from './Node.module.css';

export interface HandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  label?: string;
  style?: React.CSSProperties;
  isConnectable?: boolean;
}

export interface NodeConfig {
  type: string;
  label: string;
  icon?: React.ReactNode;
  color: string;
  handles?: HandleConfig[];
  contentComponent?: React.ComponentType<any>;
  initialData?: any;
  minWidth?: number;
  minHeight?: number;
}

export const BaseNode: React.FC<NodeProps & { config: NodeConfig }> = ({ 
  id, 
  data, 
  selected,
  config
}) => {
  const { 
    label, 
    icon, 
    color, 
    handles = [], 
    contentComponent: ContentComponent,
    minWidth = 180,
    minHeight = 100
  } = config;
  
  const [dimensions, setDimensions] = useState({ width: minWidth, height: minHeight });

  // Update dimensions if content size changes
  const updateDimensions = (width: number, height: number) => {
    setDimensions({
      width: Math.max(width, minWidth),
      height: Math.max(height, minHeight)
    });
  };

  return (
    <div 
      className={styles.node}
      style={{ 
        borderColor: selected ? '#3B82F6' : color,
        width: dimensions.width,
        minHeight: dimensions.height
      }}
    >
      <div className={styles.header} style={{ backgroundColor: color }}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <div className={styles.title}>{label}</div>
      </div>
      
      <div className={styles.content}>
        {ContentComponent && (
          <ContentComponent 
            data={data} 
            id={id}
            updateDimensions={updateDimensions}
          />
        )}
      </div>
      
      {handles.map((handle) => (
        <Handle
          key={`${id}-${handle.id}`}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={handle.style || {}}
          isConnectable={handle.isConnectable !== false}
          className={styles.handle}
        >
          {handle.label && (
            <span className={handle.type === 'source' ? styles.handleLabelRight : styles.handleLabelLeft}>
              {handle.label}
            </span>
          )}
        </Handle>
      ))}
    </div>
  );
};

export default BaseNode;