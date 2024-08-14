import React from 'react';
import Modal from 'react-modal';
import "./index.css"

Modal.setAppElement('#root');

function ModalComponent({ isModalOpen, closeModal, handleFileChange, handleCameraClick }) {
  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px 0',
    margin: '10px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Upload Options"
      className="modal"
      overlayClassName="overlay"
      style={{
        content: {
          top: '200px',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translateX(-50%)',
          width: '350px',
          padding: '25px',
          border: '2px solid #ccc',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <h2 style={{ 
        fontSize: '20px', 
        marginBottom: '20px', 
        textAlign: 'center', 
        color: '#333', 
        fontFamily: 'Arial, sans-serif' 
      }}>
        Select an Option
      </h2>
      <button 
        onClick={() => document.getElementById('file-upload').click()} 
        style={buttonStyle}>
        Upload File
      </button>
      <button onClick={handleCameraClick} style={buttonStyle}>
        Use Camera
      </button>
      <button onClick={closeModal} style={closeButtonStyle}>
        Close
      </button>
    </Modal>
  );
}

export default ModalComponent;
