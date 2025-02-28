import React from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Mail, Phone, Place, Chat } from "@mui/icons-material";
import { Link } from "react-router";

const ContactForm = () => {
  return (
    <div className="grid place-items-center min-h-screen p-6">
      <div className=" lg:p-8 md:p-8 p-3 max-w-9xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Contact our team</h2>
          <p className="text-gray-600 mb-6">
            Got any questions about the product or scaling on our platform?
            We’re here to help.
          </p>
          <div className="grid grid-cols-2 space-x-2 pe-2 my-3">
            <TextField label="First name" fullWidth />
            <TextField label="Last name" fullWidth />
          </div>
          <div className="grid grid-cols-1 space-y-4">
            <TextField label="Email" fullWidth />
            <TextField label="Phone number" fullWidth />
            <TextField label="Message" fullWidth multiline rows={4} />
          </div>

          <div className="mt-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-1">
            {[
              "Website design",
              "Content creation",
              "UX design",
              "Strategy & consulting",
              "User research",
              "Other",
            ].map((service) => (
              <FormControlLabel
                key={service}
                control={<Checkbox />}
                label={service}
              />
            ))}
          </div>
          <div className="mt-5">
            <Button
              variant="contained"
              fullWidth
              className="mt-4 bg-black text-white"
            >
              Send message
            </Button>
          </div>
        </div>

        {/* Right Side - Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Chat with us</h3>
          <p className="text-gray-600 mb-2">
            Speak to our friendly team via live chat.
          </p>
          <div className="flex-col">
            <Link to="" className="underline inline-block my-4 font-semibold">
              <div>
                <Chat /> Start a live chat
              </div>
            </Link>
            <Link to="" className="underline font-semibold">
              <div>
                <Chat /> Start a live chat
              </div>
            </Link>
            <Link to="" className="underline inline-block my-4 font-semibold">
              <div>
                <Chat /> Start a live chat
              </div>
            </Link>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-2">Call us</h3>
          <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm.</p>
          <Button
            startIcon={<Phone />}
            className="justify-start text-black normal-case"
            style={{ fontSize: "1rem", textTransform: "none" }}
          >
            +1 (555) 000-0000
          </Button>

          <h3 className="text-2xl font-semibold mt-8 mb-2">Visit us</h3>
          <p className="text-gray-600 mb-2">SVIET, Banur, Punjab-140601</p>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.82409273242!2d76.70145491128464!3d30.55434119412627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc3b350bbf2e7%3A0xece92a925f664640!2sThe%20uniques!5e1!3m2!1sen!2sin!4v1740583636506!5m2!1sen!2sin"
              style={{ border: 0 }}
              width={"100%"}
              height={"220px"}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
