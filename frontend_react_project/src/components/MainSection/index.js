import './index.css';
import React, { useState } from 'react';
import Header from "../Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactLoading from 'react-loading';
import { sendMessageToApi, uploadFileToApi } from '../../service/serviceApi';
import { FaFilePdf } from 'react-icons/fa6';
import CameraCapture from '../CameraPage';

function MainSection({ containerClassName, pdfpage }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessage = { role: 'user', content: [{ type: 'text', text: userInput }] };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setUserInput('');
      setLoading(true);

      try {
        const response = await sendMessageToApi([...messages, newMessage]);

        if (response.messages) {
          const assistantMessageContent = response.messages
            .map(msg => msg.content.map(c => c.text || '').join(' '))
            .join('\n\n');

          const assistantMessage = {
            role: 'assistant',
            content: [{ type: 'text', text: assistantMessageContent }],
          };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileSelected(true);
    if (file) {
      setLoading(true);

      try {
        const response = await uploadFileToApi(file);

        if (response.image_url) {
          const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.image_url } }] };
          setMessages(prevMessages => [...prevMessages, newImageMessage]);
        } else if (response.image_urls) {
          const newImageMessages = response.image_urls.map(url => ({
            role: 'user', content: [{ type: 'image_url', image_url: { url } }],
          }));
          setMessages(prevMessages => [...prevMessages, ...newImageMessages]);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCapture = (imageSrc) => {
    // Handle the captured image, if needed
  };

  const handleSendImageAsPDF = async (pdfBlob) => {
    setLoading(true);
    try {
      const response = await uploadFileToApi(new File([pdfBlob], 'image.pdf'));
      if (response.image_url) {
        const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.image_url } }] };
        setMessages(prevMessages => [...prevMessages, newImageMessage]);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    if (content[0].type === 'text') {
      const formattedText = content[0].text.split('\n').map((str, index) => {
        const boldItalic = str.replace(/\*\*(.*?)\*\*/g, '<b><i>$1</i></b>') // Bold and Italic
                              .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
                              .replace(/__(.*?)__/g, '<b>$1</b>'); // Bold
        return <p key={index} dangerouslySetInnerHTML={{ __html: boldItalic }} />;
      });
      return formattedText;
    } else if (content[0].type === 'image_url') {
      return <img src={content[0].image_url.url} alt="Uploaded" style={{ maxWidth: '100%' }} />;
    }
  };

  return (
    <div>
      <div className={containerClassName}>
        <Header />
        <div id="chat-container">
          {pdfpage && !fileSelected && (
            <div className='upload-pdf-con'>
              <label id="file-upload-label" htmlFor="file-upload">
                <FaFilePdf />Upload PDF File Here
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {renderMessageContent(message.content)}
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <ReactLoading type="bubbles" color="#000" height={24} width={24} />
            </div>
          )}
        </div>
        <div id="input-container">
          <input
            type="text"
            id="user-input"
            placeholder="Hi! Ask me anything..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {!pdfpage && (
            <>
              <label id="file-upload-label" htmlFor="file-upload">
                <i className="fas fa-plus"></i>
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
              />
            </>
          )}
          <button id="send-button" onClick={handleSendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <CameraCapture onCapture={handleCapture} onSendImageAsPDF={handleSendImageAsPDF} />
      </div>
    </div>
  );
}

export default MainSection;
