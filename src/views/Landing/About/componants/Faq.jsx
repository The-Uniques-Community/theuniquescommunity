import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const faqList = [
	{
	  "isActive": true,
	  "question": "What is The Uniques Community?",
	  "answer": "The Uniques Community is a student-driven tech community based in Jammu, India. We bring together passionate learners and builders to grow through hands-on training, real-world projects, and peer collaboration — bridging the gap between academic knowledge and industry readiness."
	},
	{
	  "isActive": false,
	  "question": "Who can join The Uniques Community?",
	  "answer": "Any college student who is curious, driven, and eager to grow in the tech field can join. Whether you are from a CS background or not, if you have the will to learn and contribute, The Uniques Community is the right place for you."
	},
	{
	  "isActive": false,
	  "question": "What does the training model look like?",
	  "answer": "Our training is structured in 5 rounds: Round I covers Designing (Graphic Design & Video Editing), Round II is Advanced Python, Round III is Full-Stack Development, Round IV focuses on Data Structures & Algorithms, and Round V is Salesforce CRM. Each round is practical and project-based."
	},
	{
	  "isActive": false,
	  "question": "Do members get real-world project experience?",
	  "answer": "Yes! Members work on real client projects, community products, and internal initiatives. From building dashboards to launching events, every member gets hands-on exposure that directly enhances their portfolio and employability."
	},
	{
	  "isActive": false,
	  "question": "Is there any fee to join The Uniques Community?",
	  "answer": "The Uniques Community operates as a merit-based program. Selected members may be enrolled in sponsored training tracks. There is no upfront fee for the selection process itself — we believe in investing in talent first."
	},
	{
	  "isActive": false,
	  "question": "How can I stay updated about events and opportunities?",
	  "answer": "You can follow us on Instagram and LinkedIn @theuniquesofficial, or join our WhatsApp community group. All events, workshops, and announcements are shared there first. You can also check the Events section on this website."
	}
];


const FaqItem = ({ faq }) => {
	const [isOpen, setIsOpen] = useState(faq.isActive || false);

	const toggleFaq = () => setIsOpen(!isOpen);

	return (
		<div className={`${isOpen && "active"} rounded-lg`}>
			<a
				href="#!"
				className="btn p-4 lg:p-6 w-full text-start flex justify-between items-center cursor-pointer"
				onClick={toggleFaq}
			>
				<span>{faq.question}</span>
				<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
			</a>
			{isOpen && (
				<div className="p-4 lg:p-6 bg-white shadow dark:shadow-none  rounded-xl">
					<p className="opacity-50">{faq.answer}</p>
				</div>
			)}
		</div>
	);
};

const Faq8 = () => {
	return (
		<section className="ezy__faq8 light py-6 md:py-10 bg-white text-zinc-900">
			<div className="container px-16 md:px-8 lg:px-28">
				<div className="grid grid-cols-12 justify-between gap-6">
					<div className="col-span-12 md:col-span-5">
						<h2 className="font-bold text-[25px] md:text-[45px] leading-none mb-6">
							Frequently Asked Questions
						</h2>
						<p className="text-lg opacity-70">
							Everything you need to know about The Uniques Community — our mission, training model, and how to be part of it.
						</p>
		
					</div>
					<div className="col-span-12 md:col-span-6 md:col-start-7">
						{faqList.map((faq, i) => (
							<FaqItem faq={faq} key={i} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq8;
