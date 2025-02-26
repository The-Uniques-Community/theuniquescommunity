import React, { useState } from "react";
import { Button, Card, CardContent, Avatar } from "@mui/material";
import { FaEye } from "react-icons/fa";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import tu from "@/assets/logos/tu.png";
import { Link } from "react-router";
export const MemberCardDashboard = ({ user }) => {
  

  return (
    <>
      {/* User Card */}
      <Card className="rounded-2xl shadow-lg border border-slate-200 bg-white p-4 max-w-96">
        <CardContent className="flex flex-col gap-2">
          {/* Status Tags */}
          <div className="flex justify-between items-center my-4">
            <div className="font-medium">
              <img
                src={tu}
                alt="The Uniques"
                className="w-5 inline h-5 object-contain object-center"
              />{" "}
              {user.batch}
            </div>
            <span className="bg-yellow-400 text-yellow-800 text-sm px-3 py-1 rounded-full">
              Pending
            </span>
          </div>

          {/* User Details */}
          <div className="flex items-center gap-3">
            <Avatar
              src={user.profilePic}
              alt={user.fullName}
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-gray-500 text-sm">
                {user.bio.slice(0, 36) + "..." || "No bio available"}
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-x-4 mt-3">
            <Link to="">
              <div className="w-10 h-10 p-1 bg-black rounded-full">
                <div className="w-full h-full flex items-center justify-center">
                  <GitHubIcon
                    fontSize="medium"
                    className="text-white"
                  />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 p-1 bg-black rounded-full">
                <div className="w-full h-full flex items-center justify-center">
                  <LinkedInIcon
                    fontSize="medium"
                    className="text-white"
                  />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 p-1 bg-black rounded-full">
                <div className="w-full h-full flex items-center justify-center">
                  <XIcon
                    fontSize="medium"
                    className="text-white"
                  />
                </div>
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 p-1 bg-black rounded-full">
                <div className="w-full h-full flex items-center justify-center">
                  <WhatsAppIcon
                    fontSize="medium"
                    className="text-white"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Button
              variant="contained"
              startIcon={<FaEye />}
              className=" text-white w-full hover:bg-black"
              onClick={() => setOpen(true)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
    </>
  );
};
