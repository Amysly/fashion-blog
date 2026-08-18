import React from 'react'
import bgImage from '../assets/images/bgimge.jpg';

const Herosection = () => {
  return (
    <div>

<section className="relative w-full h-[870px] overflow-hidden">
<div className="absolute inset-0 bg-cover bg-center" data-alt="A cinematic editorial fashion photograph of a woman wearing a flowing silk cream-colored dress in a sun-drenched, minimalist high-ceiling studio. The lighting is soft and directional, 
casting gentle shadows that emphasize the texture of the fabric. The overall mood is serene and expensive, utilizing a palette of off-whites, 
soft beiges, and subtle hints of sky blue. High-end magazine aesthetic with a quiet luxury feel." 
style={{ backgroundImage: `url(${bgImage})`,
 backgroundPosition: 'center',
  backgroundSize: 'cover'}}> 
</div>
<div className="absolute inset-0 hero-gradient"></div>
<div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center">
<h2 className="text-white font-display-lg text-display-lg  max-w-2xl mb-8 leading-tight">Helping women dress beautifully and confidently.</h2>
<button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-label-caps text-label-caps tracking-widest hover:bg-white hover:text-primary transition-all duration-500">EXPLORE THE COLLECTION</button>
</div>
</section>
    </div>
  )
}

export default Herosection
