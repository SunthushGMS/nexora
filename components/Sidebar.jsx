import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { useClerk, UserButton } from '@clerk/nextjs'
import { useAppContext } from '@/context/AppContext'
import ChatLabel from './ChatLabel'

const Sidebar = ({ expand, setExpand }) => {

  const { openSignIn } = useClerk()
  const { user, chats, createNewChat } = useAppContext()
  const [openMenu, setOpenMenu] = useState({ id: null, open: false })

  return (
    <div className={`relative flex flex-col justify-between pt-7 transition-all duration-300 z-50 max-md:absolute max-md:h-screen border-r border-white/[0.06] ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}
      style={{
        background: 'linear-gradient(180deg, #0a0a0c 0%, #0d0d10 50%, #0a0a0c 100%)',
      }}
    >
      {/* subtle metallic top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.05]"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, transparent 100%)' }} />

      <div className="relative">
        <div className={`flex ${expand ? 'flex-row items-center justify-between gap-10' : 'flex-col items-center gap-8'}`}>
          <Image className={expand ? 'h-8 mt-1' : 'w-9'} src={expand ? assets.logo_icon2 : assets.logo_icon} alt='' />

          <div
            onClick={() => expand ? setExpand(false) : setExpand(true)}
            className='group relative flex items-center justify-center transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06]'
          >
            <Image src={assets.menu_icon} alt='' className='md:hidden opacity-70' />
            <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='' className='hidden md:block w-5 opacity-70 group-hover:opacity-100 transition-opacity' />
            <div className={`absolute w-max ${expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'} opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#161618] border border-white/10 text-white/90 text-xs px-3 py-2 rounded-md shadow-2xl pointer-events-none tracking-wide`}>
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div className={`w-2 h-2 absolute bg-[#161618] border-white/10 rotate-45 ${expand ? 'left-1/2 -top-1 -translate-x-1/2 border-l border-t' : 'left-4 -bottom-1 border-r border-b'}`}></div>
            </div>
          </div>
        </div>

        <button
          onClick={createNewChat}
          className={`group mt-8 flex items-center justify-center cursor-pointer transition-all duration-300 ${
            expand
              ? 'rounded-2xl gap-2.5 px-4 py-2.5 w-max border border-white/10 hover:border-white/25'
              : 'relative h-9 w-9 mx-auto rounded-lg border border-white/[0.08] hover:border-white/20'
          }`}
          style={expand ? {
            background: 'linear-gradient(135deg, #e8e8e8 0%, #b8b8bc 50%, #d4d4d8 100%)',
          } : { background: 'rgba(255,255,255,0.02)' }}
        >
          <Image
            className={expand ? 'w-4.5' : 'w-6'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
            style={expand ? { filter: 'invert(1) brightness(0.2)' } : undefined}
          />

          <div className={`absolute w-max -top-12 -right-12 transition-all duration-200 bg-[#161618] border border-white/10 text-white/90 text-xs px-3 py-2 rounded-md shadow-2xl pointer-events-none tracking-wide ${expand ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            New chat
            <div className="w-2 h-2 absolute bg-[#161618] border-l border-t border-white/10 rotate-45 left-4 -bottom-1" />
          </div>

          <p className={`font-medium tracking-tight transition-all ${expand ? 'opacity-100 block text-[#0a0a0c] text-sm' : 'opacity-0 hidden'}`}>
            New chat
          </p>
        </button>

        <div className={`mt-9 text-white/35 text-xs uppercase tracking-[0.12em] ${expand ? 'block' : 'hidden'}`}>
          <p className='my-1 px-1 font-medium'>Recents</p>
          <div className='h-px mt-4 mb-1' style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }} />
          <div className="mt-1 space-y-0.5 normal-case tracking-normal text-[13px]">
            {chats.map((chat) => (
              <ChatLabel key={chat._id} name={chat.name} id={chat._id} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className={`flex items-center cursor-pointer group relative transition-all duration-200 ${expand ? 'gap-2 text-white/70 text-sm px-3 py-2.5 border border-white/10 rounded-xl hover:border-white/25 hover:bg-white/[0.04]' : 'h-10 w-10 mx-auto rounded-lg hover:bg-white/[0.06]'}`}>
          <Image className={expand ? 'w-4.5' : 'w-6 mx-auto opacity-70'} src={expand ? assets.phone_icon : assets.phone_icon_dull} alt='' />
          <div className={`absolute -top-60 pb-8 ${!expand && '-right-40'} opacity-0 group-hover:opacity-100 hidden group-hover:block transition-all duration-200`}>
            <div className='relative w-max bg-[#161618] border border-white/10 text-white text-sm p-4 rounded-xl shadow-2xl'>
              <Image src={assets.qrcode} alt='' className='w-40 rounded-md' />
              <p className='mt-2 text-white/70 text-xs tracking-wide'>Scan to get the Nexora app</p>
              <div className={`w-3 h-3 absolute bg-[#161618] border-white/10 rotate-45 ${expand ? 'right-1/2 border-l border-t' : 'left-4 border-r border-b'} -bottom-1.5`}></div>
            </div>
          </div>
          {expand && (
            <>
              <span className="tracking-wide">Get the app</span>
              <Image alt='' src={assets.new_icon} className="opacity-80" />
            </>
          )}
        </div>

        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center ${expand ? 'hover:bg-white/[0.05] rounded-xl px-2' : 'justify-center w-full'} gap-3 text-white/55 text-sm py-2.5 mt-2 cursor-pointer transition-colors duration-200`}
        >
          {user ? <UserButton /> : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center border border-white/15"
              style={{ background: 'linear-gradient(135deg, #2a2a2e, #1a1a1c)' }}>
              <Image src={assets.profile_icon} alt='' className='w-4 opacity-70' />
            </div>
          )}
          {expand && <span className="tracking-wide">My profile</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar