import { setMessages, setUserInput, setLoading, setFileSelected } from '../store';
import { sendMessageToApi, uploadFileToApi } from '../service/serviceApi';

export const handleSendMessage = async (chats, currentChatIndex, dispatch) => {
  if (chats[currentChatIndex].userInput.trim()) {
    const newMessage = { role: 'user', content: [{ type: 'text', text: chats[currentChatIndex].userInput }] };
    const updatedMessages = [...chats[currentChatIndex].messages, newMessage];
    dispatch(setMessages({ chatIndex: currentChatIndex, messages: updatedMessages }));
    dispatch(setUserInput({ chatIndex: currentChatIndex, userInput: '' }));
    dispatch(setLoading(true));

    try {
      const response = await sendMessageToApi(updatedMessages);

      if (response.messages) {
        const assistantMessageContent = response.messages
          .map(msg => msg.content.map(c => c.text || '').join(' '))
          .join('\n\n');

        const assistantMessage = {
          role: 'assistant',
          content: [{ type: 'text', text: assistantMessageContent }],
        };
        dispatch(setMessages({ chatIndex: currentChatIndex, messages: [...updatedMessages, assistantMessage] }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }
};

export const handleFileChange = async (event, dispatch, chats, currentChatIndex) => {
  const file = event.target.files[0];
  dispatch(setFileSelected(true));
  if (file) {
    dispatch(setLoading(true));

    try {
      const response = await uploadFileToApi(file);

      if (response.image_url) {
        const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.image_url } }] };
        dispatch(setMessages({ chatIndex: currentChatIndex, messages: [...chats[currentChatIndex].messages, newImageMessage] }));
      } else if (response.image_urls) {
        const newImageMessages = response.image_urls.map(url => ({
          role: 'user', content: [{ type: 'image_url', image_url: { url } }],
        }));
        dispatch(setMessages({ chatIndex: currentChatIndex, messages: [...chats[currentChatIndex].messages, ...newImageMessages] }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }
};

export const handleSendImageAsPDF = async (pdfBlob, dispatch, chats, currentChatIndex) => {
  dispatch(setLoading(true));
  try {
    const response = await uploadFileToApi(new File([pdfBlob], 'image.pdf'));
    if (response.image_url) {
      const newImageMessage = { role: 'user', content: [{ type: 'image_url', image_url: { url: response.image_url } }] };
      dispatch(setMessages({ chatIndex: currentChatIndex, messages: [...chats[currentChatIndex].messages, newImageMessage] }));
    }
  } catch (error) {
    console.error('Error uploading PDF:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
