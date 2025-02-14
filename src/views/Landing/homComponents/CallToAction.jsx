import ContainerFull from '@/utils/Container/ContainerFull'
import black from '@/assets/img/black.jpg'
const CallToAction = () => {
  return (
    
    <ContainerFull bgColor={"white"}>
        <div className='relative w-full mx-auto'>
            <img src={black} className='cta-clip lg:h-64 w-full object-cover' alt="" />
        </div>
    </ContainerFull>
  )
}

export default CallToAction