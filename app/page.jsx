'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

    useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div>
      <div className="flex h-screen">
       <Sidebar expand={expand} setExpand={setExpand}/>
        <div
          className="flex-1 flex flex-col items-center justify-center px-4 pb-8 text-white relative overflow-hidden"
          style={{ background: 'radial-gradient(circle at 50% 0%, #1a1a1e 0%, #0c0c0e 55%, #080809 100%)' }}
        >
          {/* faint metallic ambient glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.06] blur-3xl"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />

          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full z-10">
            <Image onClick={()=>(expand ? setExpand(false): setExpand(true))} className="rotate-180 opacity-70" src={assets.menu_icon} alt=""/>
             <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3 relative z-10">
                <p className="text-3xl font-medium tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #a8a8ae 60%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Hello, I'm Nexora
                </p>
              </div>
              <p className="text-sm mt-2 text-white/40 tracking-wide relative z-10">Ask me anything</p>
            </>
          ):(<div className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto z-10" ref={containerRef}>
            <p className="fixed top-8 border border-transparent hover:border-white/15 py-1.5 px-3 rounded-lg font-medium mb-6 tracking-wide text-white/85 hover:bg-white/[0.04] transition-all duration-200">{selectedChat.name}</p>
            {messages.map((msg, index)=>(
              <Message key={index} role={msg.role} content={msg.content}/>
            ))}
             {isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <div className="h-9 w-9 p-1 rounded-full flex items-center justify-center border border-white/15 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2a2a2e, #141416)' }}>
                  <Image className="w-full h-full object-contain" src={assets.logo_icon} alt="Logo"/>
                </div>
                <div className="loader flex justify-center items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
             ) }
          </div>)
          }
         <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
          <p className="text-xs absolute bottom-1 text-white/25 tracking-wide z-10">AI-generated, for reference only</p>
        </div>
      </div>
    </div>
  );
}