import React from 'react';
import { Position } from 'reactflow';
import { Image } from 'lucide-react';
import createNodeType from '../../createNodeType';
import styles from '../../Node.module.css';

const ImageGeneratorContent = ({ data }) => {
  return (
    <div>
      <div>
        <label className={styles.label}>Model</label>
        <div className={styles.selectWrapper}>
          <select 
            value={data.model || 'dalle3'} 
            onChange={(e) => data.onModelChange && data.onModelChange(e.target.value)}
            className={styles.select}
          >
            <option value="dalle3">DALL-E 3</option>
            <option value="dalle2">DALL-E 2</option>
            <option value="sdxl">Stable Diffusion XL</option>
            <option value="midjourney">Midjourney</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
      
      <div style={{ marginTop: '8px' }}>
        <label className={styles.label}>Size</label>
        <div className={styles.selectWrapper}>
          <select 
            value={data.size || '1024x1024'} 
            onChange={(e) => data.onSizeChange && data.onSizeChange(e.target.value)}
            className={styles.select}
          >
            <option value="1024x1024">1024x1024</option>
            <option value="512x512">512x512</option>
            <option value="256x256">256x256</option>
          </select>
          <div className={styles.selectArrow}>▼</div>
        </div>
      </div>
    </div>
  );
};

const ImageGeneratorNode = createNodeType({
  type: 'imageGenerator',
  label: 'Image Generator',
  icon: <Image size={16} />,
  color: '#14B8A6', // Teal
  handles: [
    {
      id: 'prompt',
      type: 'target',
      position: Position.Left,
      label: 'Prompt'
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
      label: 'Image URL'
    }
  ],
  contentComponent: ImageGeneratorContent,
  initialData: {
    model: 'dalle3',
    size: '1024x1024'
  }
});

export default ImageGeneratorNode;