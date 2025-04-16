import React from 'react';
import { useAnnotation } from '../context/AnnotationContext';

function Toolbar() {
  const { activeTool, setActiveTool, selectedId, deleteBoundary } = useAnnotation();

  const buttonStyle = (tool) => ({
    padding: '8px 16px',
    marginRight: '8px',
    backgroundColor: activeTool === tool ? '#4299e1' : '#ffffff',
    color: activeTool === tool ? 'white' : '#2d3748',
    border: `1px solid ${activeTool === tool ? '#3182ce' : '#e2e8f0'}`,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  });

  const deleteButtonStyle = {
    padding: '8px 16px',
    marginRight: '8px',
    backgroundColor: '#e53e3e',
    color: 'white',
    border: '1px solid #c53030',
    borderRadius: '4px',
    cursor: selectedId ? 'pointer' : 'not-allowed',
    opacity: selectedId ? 1 : 0.5,
    transition: 'all 0.2s ease',
    fontWeight: '500'
  };

  return (
    <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
      <button style={buttonStyle('rectangle')} onClick={() => setActiveTool('rectangle')}>
        Rectangle
      </button>
      <button style={buttonStyle('circle')} onClick={() => setActiveTool('circle')}>
        Circle
      </button>
      <button 
        style={deleteButtonStyle} 
        onClick={() => selectedId && deleteBoundary(selectedId)}
        disabled={!selectedId}
      >
       Download Image
      </button>
    </div>
  );
}

export default Toolbar;