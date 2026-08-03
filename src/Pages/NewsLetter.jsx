import React from 'react'

const NewsLetter = () => {
  return (
    <div>
    <section className="w-full py-section-gap bg-surface-container-low">
    <div className="max-w-[800px] mx-auto px-margin-desktop text-center">
    <span className="text-secondary font-label-caps text-label-caps tracking-[0.2em]">JOIN OUR WORLD</span>
    <h3 className="font-headline-md text-headline-md mt-4 mb-8 italic">Receive our weekly curation of style and substance.</h3>
    <form className="grid grid-cols-1 sm:grid-cols-2  gap-4 max-w-md mx-auto">
    <input className="flex-grow bg-transparent border px-3 rounded-lg border-outline 
    text-body-md py-2 focus:outline-none focus:border-primary
     placeholder: font-label-caps text-[12px] 
     tracking-widest" placeholder="YOUR EMAIL ADDRESS" type="email"/>
    <button className="font-label-caps text-label-caps bg-primary text-on-primary px-8 py-3 rounded-lg tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap">SUBSCRIBE NOW</button>
    </form>
    </div>
    </section>
    </div>
  )
}

export default NewsLetter
