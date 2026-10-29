/**
 * @file CallToAction.jsx
 * @description Conversion banner encouraging visitors to join The Uniques community by navigating to the `/register` registration page.
 * @architecture Sub-component loaded into the "How It Started" flow. Uses `ContainerFull` layout wrapper and primary theme `Button`.
 * @agent_note The background banner graphic uses a custom CSS clip-path class (`cta-clip`). The register CTA routes the user to `/register`.
 */

import Button from '@/utils/Buttons/Button'
import ContainerFull from '@/utils/Container/ContainerFull'

/**
 * @component CallToAction
 * @description Promotional call-to-action banner rendering registration headline and direct action button.
 * @returns {JSX.Element} The rendered registration CTA section.
 * @state None.
 * @api None.
 */
const CallToAction = () => {
    return (

        <ContainerFull bgColor={"white"} minHeight={"80vh"} >
            <div className='relative w-full mx-auto'>
                <img src="https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rwhWULuzIBoNhPGFRMty2dXZHT8VQuqiwxelD" className='cta-clip w-full lg:h-36 h-40 object-cover' alt="" />
                <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <h1 className='text-4xl font-bold py-2 text-white'>Join Us Today</h1>
                    <p className='text-white p-3 text-lg'>Join the community of unique individuals and learn from the best</p>
                    <Button
                        path="/register"
                        color={"white"}
                        bgColor={"#ca0019"}
                        border={4}
                        borderColor={"#ca0019"}
                        iconColor={"black"}
                    >
                        <span>Register</span>
                    </Button>

                </div>
            </div>
        </ContainerFull>
    )
}

export default CallToAction
