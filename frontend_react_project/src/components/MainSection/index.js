import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSendMessage } from '../../service/chatHandlers';
import { setUserInput } from '../../store';
import Header from "../Header";
import Footer from "../Footer";
import ChatContainer from '../ChatContainer';
import InputContainer from '../InputContainer';
import PdfPage from '../PdfPage';
import CardsPage from '../CardsPage';  

function MainSection({ containerClassName, pdfpage, chatPage }) {
  const dispatch = useDispatch();
  const { chats, currentChatIndex } = useSelector((state) => state.chat);

  const renderMessageContent = (content) => {
    if (content[0].type === 'text') {
      const formattedText = content[0].text
        .split('\n')
        .map((str, index, arr) => {
          const trimmedStr = index < arr.length - 1 ? str.trimEnd() : str;
          const boldItalic = trimmedStr
            .replace(/\*\*(.*?)\*\*/g, '<b><i>$1</i></b>')
            .replace(/\*(.*?)\*/g, '<i>$1</i>')
            .replace(/__(.*?)__/g, '<b>$1</b>');
          return <span key={index} dangerouslySetInnerHTML={{ __html: boldItalic }} />;
        });

      return <p>{formattedText.reduce((acc, curr) => [acc, ' ', curr])}</p>; // Join with space
    } else if (content[0].type === 'image_url') {
      return <img src={content[0].image_url.url} alt="Uploaded" style={{ maxWidth: '50%' }} />;
    }
  };

  return (
    <div className={containerClassName} style={{height: chatPage && "100vh"}}>
      <ChatContainer renderMessageContent={renderMessageContent} chatPage={chatPage} />
      {!chatPage && <PdfPage />}
      <InputContainer pdfpage={pdfpage} />
      {/* {!chatPage && <CardsPage />} */}
      {!chatPage && <Footer />}
    </div>
  );
}

export default MainSection;


















































// import React, { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import { sendMessageToApi, uploadFileToApi } from '../../service/serviceApi';
// import Header from "../Header";
// import Footer from "../Footer";
// import ChatContainer from '../ChatContainer';
// import InputContainer from '../InputContainer';
// import PdfPage from '../PdfPage'
// // import ModalComponent from '../ModalComponent';
// import CardsPage from '../CardsPage';  

// function MainSection({ containerClassName, pdfpage, chatPage }) {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate()

//   const handleSendMessage = async () => {

//     if (userInput.trim()) {
//       const newMessage = { role: 'user', content: [{ type: 'text', text: userInput }] };
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//       setUserInput('');
//       setLoading(true);

//       try {
//         const response = await sendMessageToApi([...messages, newMessage]);
//         if (response.messages) {
//           const assistantMessageContent = response.messages
//             .map(msg => msg.content.map(c => c.text || '').join(' '))
//             .join('\n\n');
//           const assistantMessage = {
//             role: 'assistant',
//             content: [{ type: 'text', text: assistantMessageContent }],
//           };
//           setMessages(prevMessages => [...prevMessages, assistantMessage]);
//         }
//       } catch (error) {
//         console.error('Error sending message:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     navigate("/chats")

//   };

//   const renderMessageContent = (content) => {
//     if (content[0].type === 'text') {
//       const formattedText = content[0].text.split('\n').map((str, index) => {
//         const boldItalic = str.replace(/\*\*(.*?)\*\*/g, '<b><i>$1</i></b>') // Bold and Italic
//                               .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
//                               .replace(/__(.*?)__/g, '<b>$1</b>'); // Bold
//         return <p key={index} dangerouslySetInnerHTML={{ __html: boldItalic }} />;
//       });
//       return formattedText;
//     } else if (content[0].type === 'image_url') {
//       return <img src={content[0].image_url.url} alt="Uploaded" style={{ maxWidth: '100%' }} />;
//     }
//   };

//   return (
//     <div className={containerClassName} style={{height: chatPage && "100vh"}}>
//       {/* <Header /> */}
//       <ChatContainer messages={messages} 
//                      renderMessageContent={renderMessageContent} 
//                      loading={loading} 
//                      chatPage={chatPage}
//                      />
//        {!chatPage &&
//          <PdfPage/>
//        }
//       <InputContainer
//         handleSendMessage={handleSendMessage}
//         setMessages={setMessages}
//         setLoading={setLoading}
//         userInput={userInput}
//         setUserInput={setUserInput}
//         pdfpage={pdfpage}
//       />
//       {!chatPage && <CardsPage />}
//       {!chatPage && <Footer />}
//     </div>
//   );
// }

// export default MainSection;




