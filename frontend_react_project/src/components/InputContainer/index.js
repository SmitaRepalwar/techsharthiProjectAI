import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { handleSendMessage, handleFileChange } from '../../service/chatHandlers';
import { setUserInput } from '../../store';
import CameraCapture from '../CameraCapture';
import { FaFilePdf } from 'react-icons/fa6';
import "./index.css";

function InputContainer({ pdfpage }) {
  const dispatch = useDispatch();
  const { chats, currentChatIndex } = useSelector((state) => state.chat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraCaptureOpen, setIsCameraCaptureOpen] = useState(false);

  const navigate = useNavigate()

  const userInput = chats[currentChatIndex]?.userInput || '';

  const onFileChange = (event) => handleFileChange(event, dispatch, chats, currentChatIndex);

  const onSendMessage = () => {
    navigate("/chats")
    handleSendMessage(chats, currentChatIndex, dispatch)
  };

  const handleCameraClick = () => {
    closeModal();
    setIsCameraCaptureOpen(true);
  };

  const handleCloseCameraCapture = () => {
    setIsCameraCaptureOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div id="input-container">
      <input
        type="text"
        id="user-input"
        placeholder="Hi! Ask me anything..."
        value={userInput}
        onChange={(e) => dispatch(setUserInput({ chatIndex: currentChatIndex, userInput: e.target.value }))}
        onKeyPress={handleKeyPress}
      />
      {!pdfpage && (
        <>
          <label id="file-upload-label" onClick={openModal}>
            <i className="fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </>
      )}
      <button id="send-button" onClick={onSendMessage}>
        <i className="fas fa-paper-plane"></i>
      </button>
      {isCameraCaptureOpen && (
        <div id="camera-capture" style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)' }}>
          <CameraCapture onCapture={onFileChange} onClose={handleCloseCameraCapture} />
        </div>
      )}
    </div>
  );
}

export default InputContainer;



































// import React, { useState } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import ModalComponent from '../ModalComponent';
// import { uploadFileToApi } from '../../service/serviceApi';
// import CameraCapture from '../CameraCapture';
// import { FaFilePdf } from 'react-icons/fa6';
// import "./index.css";

// function InputContainer({ handleSendMessage, setMessages, setLoading, userInput, setUserInput, pdfpage }) {
//   const [fileSelected, setFileSelected] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCameraCaptureOpen, setIsCameraCaptureOpen] = useState(false);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     setFileSelected(true);
//     if (file) {
//       setLoading(true);
//       try {
//         const response = await uploadFileToApi(file);
//         if (response.image_url) {
//           const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.image_url } }] };
//           setMessages(prevMessages => [...prevMessages, newImageMessage]);
//         } else if (response.image_urls) {
//           const newImageMessages = response.image_urls.map(url => ({
//             role: 'user', content: [{ type: 'image_url', image_url: { url } }],
//           }));
//           setMessages(prevMessages => [...prevMessages, ...newImageMessages]);
//         }
//       } catch (error) {
//         console.error('Error uploading file:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleCameraClick = () => {
//     closeModal();
//     setIsCameraCaptureOpen(true);
//   };

//   const handleCloseCameraCapture = () => {
//     setIsCameraCaptureOpen(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div id="input-container">
//       <input
//         type="text"
//         id="user-input"
//         placeholder="Hi! Ask me anything..."
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         onKeyPress={handleKeyPress}
//       />
//       {!pdfpage && (
//         <>
//           <label id="file-upload-label" onClick={openModal}>
//             <i className="fas fa-plus"></i>
//           </label>
//           <ModalComponent
//             isModalOpen={isModalOpen}
//             closeModal={closeModal}
//             handleFileChange={handleFileChange}
//             handleCameraClick={handleCameraClick}
//           />
//           <input
//             type="file"
//             id="file-upload"
//             accept=".png,.jpg,.jpeg,.pdf"
//             onChange={handleFileChange}
//             style={{ display: 'none' }}
//           />
//         </>
//       )}
//       <button id="send-button" onClick={handleSendMessage}>
//             <i className="fas fa-paper-plane"></i>
//       </button>
//       {isCameraCaptureOpen && (
//         <div id="camera-capture" style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)' }}>
//           <CameraCapture onCapture={handleFileChange} onClose={handleCloseCameraCapture} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default InputContainer;
