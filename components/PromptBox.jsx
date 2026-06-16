import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const PromptBox = ({setIsLoading, isLoading}) => {

  const [prompt, setPrompt] = useState('');
  const { user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat} = useAppContext();

  const handleKeyDown = (e)=>{
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault();
      sendPrompt(e);
    }
  }

        const sendPrompt = async (e)=>{
          const promptCopy = prompt;

          try {
            e.preventDefault();
            if(!user) return toast.error('Login to send message');
            if(isLoading) return toast.error('Wait for the previous prompt response');

            setIsLoading(true)
            setPrompt("")

            const userPrompt = {
              role: "user",
              content: prompt,
              timestamp: Date.now(),
            }

            //saving user prompts in chats array
            setChats((prevChats)=>prevChats.map((chat)=> chat._id === selectedChat._id ? {
              ...chat,
              messages: [...chat.messages, userPrompt]
            }: chat
          ))

          //saving user prompts in selected chats

          setSelectedChat((prev)=> ({
            ...prev,
            messages: [...prev.messages, userPrompt]
          }))

          const {data} = await axios.post('/api/chat/ai', {
            chatId: selectedChat._id,
            prompt
          })

          if(data.success){
            setChats((prevChats)=>prevChats.map((chat)=>chat._id === selectedChat._id ? {
              ...chat,
              messages: [...chat.messages, data.data]
            } : chat))

            const message = data.data.content;
            const messageToken = message.split(" ");
            let assistantMessage = {
              role: 'assistant',
              content: "",
              timestamp: Date.now()
            }

            setSelectedChat((prev) => ({
              ...prev,
              messages: [...prev.messages, assistantMessage],
            }))

            for (let i = 0; i < messageToken.length; i++) {
              setTimeout(()=>{
                assistantMessage.content = messageToken.slice(0, i + 1).join(" ");
                setSelectedChat((prev)=>{
                  const updatedMessages = [
                    ...prev.messages.slice(0, -1),
                    assistantMessage
                  ]
                  return {...prev, messages: updatedMessages}
                })
              }, i * 100)
              
            }

          }else{
            toast.error(data.message)
            setPrompt(promptCopy);
          }

          } catch (error) {
            toast.error(error.message)
            setPrompt(promptCopy);
          }finally{
            setIsLoading(false);
          }
        }

  return (
    <form
      onSubmit={sendPrompt}
      className={`group w-full ${selectedChat?.messages.length > 0 ? 'max-w-3xl' : 'max-w-2xl'} p-4 rounded-[1.75rem] mt-4 transition-all duration-300 border border-white/[0.08] hover:border-white/[0.14] focus-within:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
      style={{
        background: 'linear-gradient(180deg, #18181b 0%, #131316 100%)',
      }}
    >
      <textarea
        onKeyDown={handleKeyDown}
        onChange={(e)=> setPrompt(e.target.value)}
        value={prompt}
        rows={2}
        placeholder='Message Nexora'
        required
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white/90 placeholder:text-white/30 text-[15px] tracking-wide'
      />
      <div className='flex items-center justify-between text-sm mt-1'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-2 text-xs border border-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:border-white/25 hover:bg-white/[0.05] transition-all duration-200 text-white/65'>
            <Image src={assets.deepthink_icon} alt='' className='h-4 opacity-80'/>
            NexBrain (R1)
          </p>
           <p className='flex items-center gap-2 text-xs border border-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:border-white/25 hover:bg-white/[0.05] transition-all duration-200 text-white/65'>
            <Image src={assets.search_icon} alt='' className='h-4 opacity-80'/>
            Search (R1)
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Image src={assets.pin_icon} alt='' className='w-4 cursor-pointer opacity-50 hover:opacity-80 transition-opacity'/>
          <button
            className={`rounded-full p-2.5 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed ${prompt ? 'shadow-[0_0_16px_rgba(255,255,255,0.15)]' : ''}`}
            style={{
              background: prompt
                ? 'linear-gradient(135deg, #f0f0f0 0%, #c4c4c8 50%, #e8e8e8 100%)'
                : 'rgba(255,255,255,0.06)',
              border: prompt ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Image
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=''
              className='w-3.5 aspect-square'
              style={prompt ? { filter: 'invert(1) brightness(0.15)' } : { opacity: 0.4 }}
            />
          </button>
        </div>
      </div>
    </form>
  )
}

export default PromptBox