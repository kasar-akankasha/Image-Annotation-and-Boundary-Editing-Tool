import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        navigate('/editor', { state: { image: event.target.result } });
      };
      reader.readAsDataURL(file);
    }
  };
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  };

  const inputContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block'
  };

  const buttonStyle = {
    border: '2px solid #4299e1',
    borderRadius: '8px',
    padding: '12px 24px',
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#bee3f8',
      borderColor: '#3182ce'
    }
  };

  const inputStyle = {
    position: 'absolute',
    left: '0',
    top: '0',
    opacity: '0',
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  };

  const previewStyle = {
    maxWidth: '300px',
    maxHeight: '300px',
    borderRadius: '8px',
    border: image ? '2px solid #e2e8f0' : 'none',
    display: image ? 'block' : 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <button style={buttonStyle}>
          Choose Image File
        </button>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          style={inputStyle}
        />
      </div>
      
      {image && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '8px', color: '#4a5568' }}>Preview:</h3>
          <img 
            src={image} 
            alt="Preview" 
            style={previewStyle}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;