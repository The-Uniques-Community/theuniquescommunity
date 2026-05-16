import React from 'react'
import ContactForm from './components/ContactForm'
import ContainerFull from '@/utils/Container/ContainerFull'
import CallToAction from '../homComponents/CallToAction'
import CelebrationComponent from '@/utils/Header'

import { useThemeContext } from "@/theme/ThemeProvider";

const index = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <div className={`transition-colors duration-500 ${isDarkMode ? 'bg-[#161616]' : 'bg-gray-50'}`}>
      <CelebrationComponent title='Connect & Collaborate → Reach Out ✦' />
      <ContainerFull >
        <ContactForm />
      </ContainerFull>
      <CallToAction />
    </div>
  )
}

export default index
