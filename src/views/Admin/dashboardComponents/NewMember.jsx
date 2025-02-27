import React, { useState } from "react";
import { Button, Card, CardContent, Avatar, Modal, Box } from "@mui/material";
import { FaCheck, FaTimes, FaEye, FaCopy, FaUser } from "react-icons/fa";
import InfoIcon from '@mui/icons-material/Info';
import PushPinIcon from '@mui/icons-material/PushPin';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import tu from '@/assets/logos/tu.png'
import CallIcon from '@mui/icons-material/Call';
export const NewMember = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* User Card */}
      <Card className="rounded-2xl shadow-lg border border-slate-200 bg-white p-4 max-w-96">
        <CardContent className="flex flex-col gap-2">
          {/* Status Tags */}
          <div className="flex justify-between items-center my-4">
          <div>
                <img src={tu} alt="The Uniques" className="w-5 inline h-5 object-contain object-center" /> {user.batch}
            </div>
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
              New
            </span>
          </div>

          {/* User Details */}
          <div className="flex items-center gap-3">
            <Avatar src={user.profilePic} alt={user.fullName} className="w-12 h-12" />
            <div>
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-gray-500 text-sm">{user.bio.slice(0,36)+"..." || "No bio available"}</p>
            </div>
          </div>
          <div className="flex justify-between gap-x-2 mt-3">
            {/* <Button variant="outlined" style={{border: '1px solid #22c55e'}} startIcon={<FaCheck className="group-hover:text-white text-green-400 " />} className="hover:text-white group text-green-500 w-1/2 hover:bg-green-600">
              <span className="text-green-500 group-hover:text-white">Approve</span>
            </Button>
            <Button variant="outlined" startIcon={<FaTimes />} className="border-red-500 w-1/2 text-red-500 hover:bg-red-100">
              Reject
            </Button> */}
          </div>
          <div className="mt-3 text-center">
            <Button variant="contained" startIcon={<FaEye />} className=" text-white w-full hover:bg-black" onClick={() => setOpen(true)}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-11/12 max-w-lg">
          
          {/* Profile Header */}
          <div className="flex items-center flex-wrap gap-y-5 justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={user.profilePic} alt={user.fullName} className="w-16 h-16 border-2 border-blue-500" />
              <div>
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            
            
          </div>
          <div className="mt-5 space-y-2">
           
            <div>
                <span className="text-xs text-slate-500 px-1"><InfoIcon style={{fontSize: '14px'}} /> BIO</span>
                <div className="bg-slate-100 text-sm p-2 rounded-lg">
                    {user.bio || "No bio available"}
                </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-4">
            <div>
                <span className="text-xs inline-block mt-2 text-slate-500 px-1"><CallIcon style={{fontSize: '14px'}} /> CONTACT</span>
                <div className="bg-slate-100 text-sm p-2 rounded-lg">
                    {user.contact}
                </div>
            </div>
            <div>
                <span className="text-xs inline-block mt-2 text-slate-500 px-1"><WhatsAppIcon style={{fontSize: '14px'}} /> WHATSAPP</span>
                <div className="bg-slate-100 text-sm p-2 rounded-lg">
                    {user.whatsappContact}
                </div>
            </div>
            <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 col-span-2">
                <span className="text-xs inline-block mt-2 text-slate-500 px-1"><PushPinIcon style={{fontSize: '14px'}} /> CITY</span>
                <div className="bg-slate-100 text-sm p-2 rounded-lg">
                    {user.city}
                </div>
            </div>
            </div>
            <div>
                <span className="text-xs text-slate-500 px-1"><InfoIcon style={{fontSize: '14px'}} /> ADDRESS</span>
                <div className="bg-slate-100 text-sm p-2 rounded-lg">
                    {user.address}, {user.city}, {user.state}
                </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button variant="outlined" className="border-red-500 text-red-500 hover:bg-red-100">Block</Button>
            <div className="flex gap-3">
              <Button variant="contained" className="border-gray-500 text-gray-700 hover:bg-gray-100" onClick={() => setOpen(false)}>Cancel</Button>
              {/* <Button variant="contained" className="bg-[#ca0019] text-white hover:bg-black">Approve</Button> */}
            </div>
          </div>
        </Box>
      </Modal> 
    </>
  );
};
