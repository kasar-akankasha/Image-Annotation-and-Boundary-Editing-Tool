import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        navigate('/editor', { state: { image: event.target.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#2d3748',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const uploadBoxStyle = {
    border: '2px dashed #cbd5e0',
    borderRadius: '8px',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#4299e1',
      backgroundColor: '#ebf8ff'
    }
  };

  const previewStyle = {
    maxWidth: '300px',
    maxHeight: '300px',
    marginTop: '20px',
    borderRadius: '8px',
    border: previewImage ? '2px solid #e2e8f0' : 'none',
    display: previewImage ? 'block' : 'none'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Image Annotation Tool</h1>
      
      <label style={uploadBoxStyle}>
        Choose an Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </label>
      
      {previewImage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3 style={{ marginBottom: '8px', color: '#4a5568' }}>Preview:</h3>
          <img 
            src={previewImage} 
            alt="Preview" 
            style={previewStyle}
          />
        </div>
      )}
    </div>
  );
}

export default Home;