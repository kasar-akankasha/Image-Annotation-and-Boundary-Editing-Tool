import React, { createContext, useContext, useState } from 'react';

const AnnotationContext = createContext();

export const AnnotationProvider = ({ children }) => {
  const [boundaries, setBoundaries] = useState([]);
  const [activeTool, setActiveTool] = useState('rectangle');
  const [selectedId, setSelectedId] = useState(null);

  const addBoundary = (boundary) => {
    setBoundaries([...boundaries, boundary]);
  };

  const updateBoundary = (id, updates) => {
    setBoundaries(boundaries.map(b => b.id === id ? {...b, ...updates} : b));
  };

  const deleteBoundary = (id) => {
    setBoundaries(boundaries.filter(b => b.id !== id));
    setSelectedId(null);
  };

  return (
    <AnnotationContext.Provider
      value={{
        boundaries,
        addBoundary,
        updateBoundary,
        deleteBoundary,
        activeTool,
        setActiveTool,
        selectedId,
        setSelectedId
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotation = () => useContext(AnnotationContext);