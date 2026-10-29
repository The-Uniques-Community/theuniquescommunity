/**
 * @file index.jsx
 * @description Contact page layout orchestrating the celebration banner, comprehensive contact inquiry form, and community call-to-action.
 * @architecture Mounted at `/contact` route. Serves as the landing entrypoint for public inquiries and partner communications.
 * @agent_note Delegates form processing and API submission to `ContactForm` which hits `POST ${BASE_URL}/api/contact`.
 */

import React from 'react'
import ContactForm from './components/ContactForm'
import ContainerFull from '@/utils/Container/ContainerFull'
import CallToAction from '../homComponents/CallToAction'
import CelebrationComponent from '@/utils/Header'

import { useThemeContext } from "@/theme/ThemeProvider";

/**
 * @component ContactPage
 * @description Public contact page view rendering community office location, inquiry form, and social media links.
 */
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
