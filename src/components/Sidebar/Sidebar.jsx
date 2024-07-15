import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const sidebar = () => {

  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompts, setRecentPrompt, newchat } = useContext(Context)
  const loadprompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className='Sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick = {()=>newchat()} className="chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Query</p> : null}
        </div>
        {extended
          ? <div className="recent">
            <p className="recent-title"></p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick = {()=> loadprompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)} ...</p>
                </div>
              )
            })}

          </div>
          : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default sidebar