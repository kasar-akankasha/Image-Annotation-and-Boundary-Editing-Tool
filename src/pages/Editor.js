import { useLocation } from 'react-router-dom';
import { AnnotationProvider } from '../context/AnnotationContext';
import CanvasEditor from '../components/CanvasEditor';
import Toolbar from '../components/Toolbar';
import BoundaryList from '../components/BoundaryList';
import React from 'react';

function Editor() {
  const location = useLocation();
  const { image } = location.state || {};

  return (
    <AnnotationProvider>
      <div className="editor-container">
        <Toolbar />
        <div className="editor-content">
          {image ? (
            <CanvasEditor image={image} />
          ) : (
            <div>No image selected. Please go back and upload an image.</div>
          )}
          <BoundaryList />
        </div>
      </div>
    </AnnotationProvider>
  );
}

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8fafc'
  };

  const toolbarStyle = {
    padding: '12px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: '8px',
    zIndex: 10
  };

  const contentStyle = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  };

  const canvasWrapperStyle = {
    flex: 1,
    position: 'relative',
    overflow: 'auto',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0'
  };

  const boundaryListStyle = {
    width: '300px',
    backgroundColor: 'solid blue',
    overflowY: 'auto',
    padding: '16px',
    borderLeft: '1px solid #e2e8f0'
  };

export default Editor;