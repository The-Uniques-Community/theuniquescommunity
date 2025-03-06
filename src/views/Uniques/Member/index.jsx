import React from 'react'
import { Button, Modal, Tooltip } from "@mui/material";
import tu from "@/assets/logos/tu.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router";
import { members } from '@/assets/dummyData/memberData';
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {ArrowUpRight,Award} from "lucide-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BusinessIcon from "@mui/icons-material/Business";
import PropTypes from "prop-types";
import LabelIcon from "@mui/icons-material/Label";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
		{...other}
	  >
		{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
	  </div>
	);
  }
  
  CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
	return {
	  id: `simple-tab-${index}`,
	  "aria-controls": `simple-tabpanel-${index}`,
	};
  }
const index = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};
	return (
		<div className=" bg-white">
		  <div className="flex justify-end py-2 mb-3">
		  </div>
		  <div className="grid xl:grid-cols-4 lg:grid-cols-3 col-span-1 mb-7 gap-x-6 gap-y-5">
			<div className="xl:col-span-1 lg:col-span-1 col-span-1 flex gap-x-5 items-center">
			  <div className="bg-black w-36 h-36 overflow-hidden rounded-full">
				<img
				  src={members[0].profilePic}
				  className="w-full h-full object-center"
				  alt=""
				/>
			  </div>
			  <div>
				<span className="text-xs text-slate-500">//member</span>
				<p className="text-3xl font-medium">{members[0].fullName}</p>
				<div className="flex justify-start gap-x-4 mt-3">
				  {members[0].githubProfile && (
					<Link to={members[0].githubProfile || ""}>
					  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
						<div className="w-full h-full flex items-center justify-center">
						  <GitHubIcon fontSize="small" className="text-white" />
						</div>
					  </div>
					</Link>
				  )}
				  {members[0].linkedinProfile && (
					<Link to={members[0].linkedinProfile || ""}>
					  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
						<div className="w-full h-full flex items-center justify-center">
						  <LinkedInIcon fontSize="small" className="text-white" />
						</div>
					  </div>
					</Link>
				  )}
				  {members[0].twitterProfile && (
					<Link to={members[0].twitterProfile || ""}>
					  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
						<div className="w-full h-full flex items-center justify-center">
						  <XIcon fontSize="small" className="text-white" />
						</div>
					  </div>
					</Link>
				  )}
				  {members[0].whatsappContact && (
					<Link to={`https://wa.me/${members[0].whatsappContact}` || ""}>
					  <div className="w-7 h-7 p-1 bg-slate-500 rounded-full">
						<div className="w-full h-full flex items-center justify-center">
						  <WhatsAppIcon fontSize="small" className="text-white" />
						</div>
					  </div>
					</Link>
				  )}
				</div>
			  </div>
			</div>
			<div className="border-l p-5 xl:col-span-2 lg:col-span-1 col-span-1">
			  <div className="flex items-center justify-start gap-x-3 mb-3">
				<img src={tu} className="h-7 w-7 object-contain" alt="" />
				<p className="text-slate-500">
				  <span className="font-medium">Batch:</span> {members[0].batch}
				</p>
			  </div>
			  <div className="flex items-center gap-x-3 mb-4">
				<AutoStoriesIcon fontSize="medium" className="text-slate-500" />
				<p className="text-slate-500">
				  <span className="font-medium">Course:</span> {members[0].course}
				</p>
			  </div>
			  <div className="flex items-center gap-x-3 mb-4">
				<LabelIcon fontSize="medium" className="text-slate-500" />
				<p className="text-slate-500">
				  <span className="font-medium">Admn No:</span> {members[0].admno}
				</p>
			  </div>
			  <div className="flex items-center gap-x-3 mb-4">
				<BusinessIcon fontSize="medium" className="text-slate-500" />
				<p className="text-slate-500">
				  <span className="font-medium">Placement:</span>{" "}
				  {members[0].isPlaced === true ? "Placed" : "Not Placed"}
				</p>
			  </div>
			  <div className="flex items-center justify-end gap-x-3 mb-4">
				<LoginIcon fontSize="small" className="text-slate-500" />
				<p className="text-slate-500 text-sm">
				  <span className="font-medium">Joined on:</span>{" "}
				  {members[0].createdAt}
				</p>
			  </div>
			</div>
			<div className="col-span-1">
			  <div className="flex items-center h-full gap-x-3">
				<Button variant="outlined" color="primary" size="medium">
				  <EditIcon fontSize="small" /> Edit
				</Button>
				
			  </div>
			</div>
		  </div>
		  <div className="mt-4 grid grid-cols-4 gap-4">
			<div className="lg:col-span-1 col-span-4">
			  <h3 className="text-xl font-medium">Overview</h3>
			  <div className="my-3 ">
				<div>
				  <p className="bg-black p-1 px-2 rounded-tr-full text-white">
					BIO
				  </p>
				  <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
					<div className="flex items-start mb-2 gap-x-3">
					  <BookmarkIcon fontSize="small" className="text-slate-500" />
					  <p className="text-slate-500 text-sm">{members[0].bio}</p>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="my-3 ">
				<div>
				  <p className="bg-black p-1 px-2 rounded-tr-full text-white">
					CONTACT INFORMATION
				  </p>
				  <div className="py-3 px-2 bg-slate-50 border border-slate-200 rounded-b-md">
					<div className="flex items-center mb-2 gap-x-3">
					  <EmailIcon fontSize="small" className="text-slate-500" />
					  <p className="text-slate-500 text-sm">{members[0].email}</p>
					</div>
					<div className="flex items-center mb-2 gap-x-3">
					  <PhoneIcon fontSize="small" className="text-slate-500" />
					  <p className="text-slate-500 text-sm">
						<Link to={`tel:${members[0].contact}`}>{members[0].contact}</Link>
					  </p>
					</div>
					<div className="flex items-start mb-2 gap-x-3">
					  <LocationOnIcon fontSize="small" className="text-slate-500"/>
					  <p className="text-slate-500 text-sm">
						{members[0].address} | {members[0].city}, {members[0].state}
					  </p>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="my-3 ">
				<div>
				  <p className="bg-black p-1 px-2 rounded-tr-full text-white">
					SKILLS
				  </p>
				  <div className="py-3 bg-slate-50 border border-slate-200 rounded-b-md">
					{members[0].skills.map((skill, index) => {
					  return (
						<span key={index} className="bg-slate-200 text-xs my-1 inline-block mx-1 p-1 px-2 rounded-full">
						  {skill}
						</span>
					  );
					})}
				  </div>
				</div>
			  </div>
			</div>
			<div className="lg:col-span-3 col-span-4">
			  <Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				  <Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="auto"
				  >
					<Tab label="Statistics" {...a11yProps(0)} />
					<Tab label="Achievements" {...a11yProps(1)} />
					<Tab label="Certifications" {...a11yProps(2)} />
					<Tab label="Projects" {...a11yProps(3)} />
					<Tab label="Events" {...a11yProps(4)} />
				  </Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
				  Stats
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
				  {members[0].achievements.length > 0 && (
					<div className="mb-8">
					  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{members[0].achievements.map((achievement) => (
						  <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-start gap-3">
							  <div className={`text-white p-2 rounded-full flex items-center justify-center ${achievement.color}`}>
								{achievement.icon || (
								  <Award className="w-10 h-10 text-slate-500" />
								)}
							  </div>
							  <div>
								<h5 className="font-medium text-gray-900">
								  {achievement.title}
								</h5>
								<p className="text-sm text-gray-600 mt-1">
								  {achievement.description}
								</p>
								{achievement.date && (
								  <p className="text-xs text-gray-500 mt-1.5">
									{achievement.date||"------"}
								  </p>
								)}
							  </div>
							</div>
						  </div>
						))}
					  </div>
					</div>
				  )}
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
				  <div>
					<div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5">
					  {members[0].certifications.map((certificate) => (
						<div key={certificate.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
						  <div className="aspect-[16/9] overflow-hidden bg-gray-50 flex items-center justify-center">
							<img
							  src={
								certificate.imageUrl ||
								"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
							  }
							  alt={certificate.title}
							  className="w-full h-full object-contain"
							/>
						  </div>
						  <div className="p-4">
							<h5 className="font-medium text-gray-900">
							  {certificate.title}
							</h5>
							<p className="text-sm text-gray-600 mt-1">
							  {certificate.issuer}
							</p>
							<p className="text-xs text-gray-500 mt-1.5">
							  {certificate.date}
							</p>
						  </div>
						</div>
					  ))}
					</div>
				  </div>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={3}>
				<div>
					<div className="space-y-6 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-5">
					  {members[0].projects.map((project) => (
						<div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
						  {project.imageUrl && (
							<div className="aspect-[21/9] overflow-hidden bg-gray-50">
							  <img
								src={project.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
								alt={project.title}
								className="w-full h-full object-cover"
							  />
							</div>
						  )}
						  <div className="p-5">
							<h5 className="font-medium text-lg text-gray-900">{project.title}</h5>
							<p className="text-gray-700 my-3 leading-relaxed">{project.description}</p>
							<div className="flex flex-wrap gap-2 mb-4">
							  {project.technologies.map((tech, index) => (
								<span key={index} className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">
								  {tech}
								</span>
							  ))}
							</div>
							{project.link && (
							  <a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm text-[#ca0019] hover:underline flex items-center gap-1 font-medium">
								View Project <ArrowUpRight size={14} />
							  </a>
							)}
						  </div>
						</div>
					  ))}
					</div>
				  </div>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={4}>
				  Events
				</CustomTabPanel>
			  </Box>
			</div>
		  </div>
		</div>
	);
}

export default index
