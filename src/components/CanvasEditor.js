import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Text } from 'react-konva';
import { useAnnotation } from '../context/AnnotationContext';

function CanvasEditor({ image }) {
  const {
    boundaries,
    addBoundary,
    updateBoundary,
    deleteBoundary,
    activeTool,
    selectedId,
    setSelectedId,
    currentColor,
    currentLabel
  } = useAnnotation();
  
  const stageRef = useRef();
  const [newShape, setNewShape] = useState(null);
  const [img, setImg] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  useEffect(() => {
    if (!image) return;
    
    const imageObj = new window.Image();
    imageObj.onload = () => {
      
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = 500;
      const scale = Math.min(
        maxWidth / imageObj.width,
        maxHeight / imageObj.height,
        1
      );
      setImageScale(scale);
      setImg(imageObj);
    };
    imageObj.src = image;
  }, [image]);
  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      const pos = e.target.getPointerPosition();
      
      const baseShape = {
        x: pos.x,
        y: pos.y,
        fill: currentColor || 'rgba(255,0,0,0.5)',
        stroke: 'black',
        strokeWidth: 2,
        id: Date.now().toString(),
        label: currentLabel || '',
        labelPosition: { x: pos.x, y: pos.y }
      };

      if (activeTool === 'rectangle') {
        setNewShape({
          ...baseShape,
          type: 'rectangle',
          width: 0,
          height: 0
        });
      } else if (activeTool === 'circle') {
        setNewShape({
          ...baseShape,
          type: 'circle',
          radius: 0
        });
      }
      setSelectedId(null);
    }
  };


  const handleMouseMove = (e) => {
    if (!newShape) return;
    
    const pos = e.target.getPointerPosition();
    
    if (newShape.type === 'rectangle') {
      setNewShape({
        ...newShape,
        width: pos.x - newShape.x,
        height: pos.y - newShape.y,
        labelPosition: {
          x: newShape.x + (pos.x - newShape.x)/2,
          y: newShape.y + (pos.y - newShape.y)/2
        }
      });
    } else if (newShape.type === 'circle') {
      const radius = Math.sqrt(
        Math.pow(pos.x - newShape.x, 2) + 
        Math.pow(pos.y - newShape.y, 2)
      );
      setNewShape({
        ...newShape,
        radius,
        labelPosition: { x: newShape.x, y: newShape.y }
      });
    }
  };

  
  const handleMouseUp = () => {
    if (newShape) {
      if (
        (newShape.type === 'rectangle' && Math.abs(newShape.width) > 5 && Math.abs(newShape.height) > 5) ||
        (newShape.type === 'circle' && newShape.radius > 5)
      ) {
        addBoundary(newShape);
      }
      setNewShape(null);
    }
  };

 
  const handleShapeClick = (e) => {
    e.cancelBubble = true;
    const id = e.target.id();
    setSelectedId(id === selectedId ? null : id);
  };

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedId) {
        deleteBoundary(selectedId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, deleteBoundary]);

 
  return (
    <Stage
      width={window.innerWidth * 0.8}
      height={500}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <Layer>
        {img && (
          <KonvaImage 
            image={img}
            width={img.width * imageScale}
            height={img.height * imageScale}
            x={(window.innerWidth * 0.8 - img.width * imageScale) / 2}
          />
        )}
        {boundaries.map((shape) => {
          const isSelected = shape.id === selectedId;
          const commonProps = {
            ...shape,
            key: shape.id,
            id: shape.id,
            onClick: handleShapeClick,
            stroke: isSelected ? 'blue' : shape.stroke,
            strokeWidth: isSelected ? 4 : shape.strokeWidth,
            draggable: true,
            onDragEnd: (e) => {
              updateBoundary(shape.id, {
                x: e.target.x(),
                y: e.target.y(),
                labelPosition: {
                  x: shape.labelPosition.x + (e.target.x() - shape.x),
                  y: shape.labelPosition.y + (e.target.y() - shape.y)
                }
              });
            },
            onTransformEnd: (e) => {
              const node = e.target;
              if (shape.type === 'rectangle') {
                updateBoundary(shape.id, {
                  x: node.x(),
                  y: node.y(),
                  width: node.width(),
                  height: node.height()
                });
              } else {
                updateBoundary(shape.id, {
                  x: node.x(),
                  y: node.y(),
                  radius: node.radius()
                });
              }
            }
          };

          return (
            <React.Fragment key={shape.id}>
              {shape.type === 'rectangle' ? (
                <Rect {...commonProps} />
              ) : (
                <Circle {...commonProps} />
              )}
              {shape.label && (
                <Text
                  text={shape.label}
                  x={shape.labelPosition.x}
                  y={shape.labelPosition.y}
                  fontSize={16}
                  fill="black"
                  align="center"
                  draggable
                  onDragEnd={(e) => {
                    updateBoundary(shape.id, {
                      labelPosition: {
                        x: e.target.x(),
                        y: e.target.y()
                      }
                    });
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
        {newShape && (
          <>
            {newShape.type === 'rectangle' ? (
              <Rect {...newShape} />
            ) : (
              <Circle {...newShape} />
            )}
            {newShape.label && (
              <Text
                text={newShape.label}
                x={newShape.labelPosition.x}
                y={newShape.labelPosition.y}
                fontSize={16}
                fill="black"
                align="center"
              />
            )}
          </>
        )}
      </Layer>
    </Stage>
  );
}

export default CanvasEditor;