import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import rehypePrism from 'rehype-prism-plus'

const Message = ({role, content}) => {

  const copyMessage = ()=>{
    navigator.clipboard.writeText(content)
    toast.success('Message copied to clipboard')
  }

  return (
    <div className='flex flex-col items-center w-full max-w-3xl text-sm'>
      <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
        <div
          className={`group relative flex max-w-2xl py-3 rounded-2xl ${role === 'user' ? 'px-5 border border-white/[0.08]' : 'gap-3'}`}
          style={role === 'user' ? { background: 'linear-gradient(135deg, #1c1c20 0%, #16161a 100%)' } : undefined}
        >
          <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-16 top-2.5' : 'left-9 -bottom-6'} transition-all duration-200`}>
            <div className='flex items-center gap-2.5 opacity-60 hover:opacity-100'>
              {
                role === 'user' ? (
                  <>
                    <Image onClick={copyMessage} src={assets.copy_icon} alt='' className='w-4 cursor-pointer hover:opacity-100 transition-opacity'/>
                    <Image src={assets.pencil_icon} alt='' className='w-4.5 cursor-pointer hover:opacity-100 transition-opacity'/>

                  </>
                ):(
                  <>
                    <Image onClick={copyMessage} src={assets.copy_icon} alt='' className='w-4.5 cursor-pointer hover:opacity-100 transition-opacity'/>
                    <Image src={assets.regenerate_icon} alt='' className='w-4 cursor-pointer hover:opacity-100 transition-opacity'/>
                    <Image src={assets.like_icon} alt='' className='w-4 cursor-pointer hover:opacity-100 transition-opacity'/>
                    <Image src={assets.dislike_icon} alt='' className='w-4 cursor-pointer hover:opacity-100 transition-opacity'/>
                  </>
                )
              }
            </div>
          </div>
          {
            role === 'user' ? (
              <span className='text-white/85 tracking-wide'>{content}</span>
            ):(
             <>
              <div className='h-9 w-9 p-1 rounded-full flex items-center justify-center border border-white/15 shrink-0'
                style={{ background: 'linear-gradient(135deg, #2a2a2e, #141416)' }}>
                <Image src={assets.logo_icon} alt='' className='w-full h-full object-contain'/>
              </div>
              <div className='space-y-4 w-full overflow-scroll text-white/85 leading-relaxed'>
                <Markdown rehypePlugins={[rehypePrism]}>{content}</Markdown>
                </div>
             </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Message