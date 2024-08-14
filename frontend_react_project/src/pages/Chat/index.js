import './index.css';
import React, { useState } from 'react';
import SideBar from "../../components/SideBar/index.js"
import MainSection from '../../components/MainSection';
//import RightSidebar from '../RightSidebar/index.js';

function Chat() {
    const [isExpanded, setExpand] = useState(false);
    const onChangesidebar = () => {
        setExpand(!isExpanded);
      };


    let sideClassName = isExpanded ? "sidebar-opened" : "sidebar-closed";
    let containerClassName = isExpanded ? "body-container-with-full-sidebar" : "body-container-without-full-sidebar";
   

    return(
        <div className='chat-con'>
            <SideBar sideClassName={sideClassName} onChangesidebar={onChangesidebar} isExpanded={isExpanded} />
            <MainSection containerClassName={containerClassName} chatPage/>
        </div>
    )
}
export default Chat;