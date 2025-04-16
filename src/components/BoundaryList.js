import { useAnnotation } from '../context/AnnotationContext';
import React from 'react';

function BoundaryList() {
  const { boundaries, deleteBoundary } = useAnnotation();

  return (
    <div className="boundary-list">
      <h3>Boundaries</h3>
      <ul>
        {boundaries.map((boundary) => (
          <li key={boundary.id}>
            {boundary.type} - x: {boundary.x}, y: {boundary.y}
            <button onClick={() => deleteBoundary(boundary.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoundaryList;