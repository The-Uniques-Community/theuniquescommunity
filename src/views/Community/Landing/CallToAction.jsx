import { useState } from 'react';
import { createPortal } from 'react-dom';
import DoubleQuotes from '@/assets/img/Community/Sample1.png';
import ApplicationForm from '@/components/ApplicationForm';
import { useThemeContext } from '@/theme/ThemeProvider';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#18181b] rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-[#18181b] z-20 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default function Example() {
    const { isDarkMode } = useThemeContext();
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);

    const benefits = (
        <div className="space-y-4 text-gray-600">
            <h3 className="text-xl font-semibold text-gray-900">Benefits of being a Campus Ambassador:</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Official certification and recognition</li>
                <li>Exclusive networking opportunities</li>
                <li>Leadership skill development</li>
                <li>Access to premium events and workshops</li>
                <li>Mentorship from industry professionals</li>
                <li>Performance-based incentives</li>
                <li>Career guidance and support</li>
                <li>Brand merchandise and goodies</li>
            </ul>
            <p className="mt-4">
                Join our community of passionate student leaders and help shape the future of technology and innovation on your campus!
            </p>
        </div>
    );

    return (
        <div className={`transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className="container mx-auto max-w-7xl py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-black px-6 pt-12 pb-0 sm:rounded-3xl rounded-2xl sm:px-10 sm:pt-16 lg:flex lg:items-center lg:gap-x-8 xl:gap-x-12 lg:px-14 lg:pt-0 shadow-2xl">
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    >
                        <circle r={512} cx={512} cy={512} fill="url(#red-gradient)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="red-gradient">
                                <stop stopColor="#FF0000" />
                                <stop offset={1} stopColor="#8B0000" />
                            </radialGradient>
                        </defs>
                    </svg>

                    {/* Left text column */}
                    <div className="mx-auto max-w-md lg:max-w-none lg:w-[45%] xl:w-[42%] text-left lg:py-20 xl:py-24">
                        <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
                            Become a Campus Ambassador Today!
                        </h2>
                        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                            Join our exclusive program, represent our brand, and gain incredible experience while building your leadership skills.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-start gap-4 sm:gap-x-6">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsApplyModalOpen(true);
                                }}
                                className="rounded-md bg-red-600 px-5 py-2.5 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-red-700 transition"
                            >
                                Apply Now
                            </a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsLearnMoreModalOpen(true);
                                }}
                                className="text-sm sm:text-base font-semibold text-white hover:text-gray-200 transition"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right illustration column - Large & Prominent */}
                    <div className="relative w-full lg:w-[55%] xl:w-[58%] flex-1 flex items-end justify-center lg:justify-end mt-10 lg:mt-0 self-end">
                        <img
                            alt="Campus Ambassador Program"
                            src={DoubleQuotes}
                            className="w-full max-w-[480px] sm:max-w-[540px] md:max-w-[600px] lg:max-w-[680px] xl:max-w-[740px] 2xl:max-w-[800px] h-auto object-contain object-bottom drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                title="Campus Ambassador Application"
            >
                <div className="max-h-[80vh] overflow-y-auto pr-1">
                    <ApplicationForm onClose={() => setIsApplyModalOpen(false)} />
                </div>
            </Modal>

            <Modal
                isOpen={isLearnMoreModalOpen}
                onClose={() => setIsLearnMoreModalOpen(false)}
                title="Campus Ambassador Program"
            >
                <div className="max-h-[80vh] overflow-y-auto pr-1">
                    {benefits}
                </div>
            </Modal>
        </div>
    );
}
