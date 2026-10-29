/**
 * @file CallToAction.jsx
 * @description Call-to-action banner section encouraging visitors to join the community and open the companion web portal.
 * @architecture Child component of the landing page view, linking out to `PORTAL_URL` defined in configuration.
 * @agent_note Directs traffic to external/portal authentication flow via `PORTAL_URL`.
 */

import Button from '@/utils/Buttons/Button'
import ContainerFull from '@/utils/Container/ContainerFull'
import { PORTAL_URL } from '@/config'

/**
 * @component CallToAction
 * @description Displays a stylized clipped background image overlay with call-to-action headline, invitation copy, and an action button redirecting to the portal.
 * @param {Object} props - Component properties (empty)
 * @state None
 * @api None (Direct navigation link to PORTAL_URL)
 */
const CallToAction = () => {
  return (
    <div className='relative w-full mx-auto my-2 sm:my-4'>
      <img src="https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rwhWULuzIBoNhPGFRMty2dXZHT8VQuqiwxelD" className='cta-clip w-full lg:h-72 h-80 object-cover' alt="" />
            <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <h1 className='text-4xl font-bold py-2 text-white'>
                  Join Us <span className='brush-bg text-white [--brush-color:#000]'>Today</span>
                </h1>
                <p className='text-white p-3 text-lg'>Join the community of unique individuals and learn from the best</p>
                <div className="flex justify-center items-center mt-2">
                  <Button
                    path={PORTAL_URL}
                    color={"white"}
                    bgColor={"#ca0019"}
                    border={4}
                    borderColor={"#ca0019"}
                    iconColor={"black"}
                  >
                    <span>Open Portal</span>
                  </Button>
                </div>
          </div>
        </div>

  )
}

export default CallToAction
