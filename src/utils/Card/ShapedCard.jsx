/**
 * @file ShapedCard.jsx
 * @description Clipped graphic banner card featuring textured background imagery and centered headline/copy.
 * @architecture UI presentational component in src/utils/Card/ styled with custom CSS clipping (corporate-clip).
 * @agent_note Relies on imported slate texture asset `bg-slate.webp` and CSS clip-path class `corporate-clip`.
 */

import bgImg from '@/assets/img/bg-slate.webp'

/**
 * @component ShapedCard
 * @description Renders a stylized graphic banner card with a clipped backdrop image and centered headline and content text.
 * @param {Object} props - Component properties
 * @param {string} props.heading - Card header title
 * @param {string} props.content - Supporting description or subtitle
 * @state None
 * @api None
 */
const ShapedCard = ({heading, content}) => {
  return (
    <div className='relative w-full h-full'>
        <img className='corporate-clip w-full h-full object-cover object-center' src={bgImg} alt="" />
        <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 p-3 -translate-y-1/2 text-center'>
            <h1 className='text-xl font-bold py-2 text-black'>{heading}</h1>
            <p className='text-red-500 p-3 text-sm w-full'>{content}</p>
        </div>
    </div>
  )
}

export default ShapedCard
