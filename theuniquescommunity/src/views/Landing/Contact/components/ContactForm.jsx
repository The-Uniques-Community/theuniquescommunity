import React, { useState } from "react";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import tu from "@/assets/logos/theuniquesCommunity.png";
import darkLogo from "@/assets/logos/theuniquesCommunity copy.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useThemeContext } from "@/theme/ThemeProvider";

const CustomInput = ({ label, name, type = "text", value, onChange, error, required, multiline, rows }) => {
  const { isDarkMode } = useThemeContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6 w-full group">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${(isFocused || value) ? '-top-2.5 text-xs font-bold px-2' : 'top-4 text-base'}
          ${isFocused ? 'text-[#ca0019]' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          ${(isFocused || value) ? (isDarkMode ? 'bg-[#161616]' : 'bg-white') : ''}
          z-10`}
      >
        {label} {required && <span className="text-[#ca0019]">*</span>}
      </label>

      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={rows || 4}
          className={`w-full px-4 py-4 rounded-xl border-2 outline-none transition-all duration-300 bg-transparent
            ${isDarkMode ? 'text-white border-white/10 hover:border-white/20' : 'text-gray-900 border-gray-200 hover:border-gray-300'}
            ${isFocused ? '!border-[#ca0019] shadow-[0_0_15px_rgba(202,0,25,0.1)]' : ''}
            ${error ? 'border-red-500' : ''}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-4 rounded-xl border-2 outline-none transition-all duration-300 bg-transparent
            ${isDarkMode ? 'text-white border-white/10 hover:border-white/20' : 'text-gray-900 border-gray-200 hover:border-gray-300'}
            ${isFocused ? '!border-[#ca0019] shadow-[0_0_15px_rgba(202,0,25,0.1)]' : ''}
            ${error ? 'border-red-500' : ''}`}
        />
      )}

      {error && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">{error}</span>}
    </div>
  );
};

const ContactForm = () => {
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: []
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({});

  const services = ["Website design", "Content creation", "UX design", "Strategy & consulting", "User research", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleCheckboxChange = (service) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(item => item !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services: newServices });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);
      if (response.data.success) {
        setAlert({ open: true, message: 'Message sent successfully!', severity: 'success' });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', services: [] });
      } else {
        throw new Error(response.data.message || 'Failed to send');
      }
    } catch (error) {
      setAlert({ open: true, message: 'Error sending message. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column - Contact Info & Branding */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <img className="h-16 w-auto object-contain" src={isDarkMode ? darkLogo : tu} alt="The Uniques Logo" />
              <h2 className={`text-4xl md:text-6xl font-black tracking-tighter leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Let's build something <span className="text-[#ca0019]">extraordinary</span>.
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
                Whether you have a specific project in mind or just want to learn more about our community, we're ready to connect.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-[#ca0019]/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <MailOutlineIcon className="text-[#ca0019]" />
                </div>
                <div>
                  <p className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Email Us</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>hello@theuniques.in</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-[#ca0019]/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <PhoneInTalkIcon className="text-[#ca0019]" />
                </div>
                <div>
                  <p className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Call Us</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-[#ca0019]/10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <LocationOnIcon className="text-[#ca0019]" />
                </div>
                <div>
                  <p className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Visit Us</p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SVIET, Banur, Punjab-140601</p>
                </div>
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              {[
                { icon: <InstagramIcon />, link: "https://instagram.com/theuniquesofficial" },
                { icon: <LinkedInIcon />, link: "https://linkedin.com/company/theuniquesofflicial" },
                { icon: <WhatsAppIcon />, link: "https://chat.whatsapp.com/HYOloogGXKcIkR83DnOjFj" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                    ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 md:p-12 rounded-[2.5rem] border-2 backdrop-blur-xl shadow-2xl
                ${isDarkMode ? 'bg-white/5 border-white/10 shadow-black/40' : 'bg-white border-gray-100 shadow-gray-200/50'}`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  <CustomInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <CustomInput
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <CustomInput
                  label="How can we help?"
                  name="message"
                  multiline
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                />

                <div className="py-4">
                  <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    What are you interested in?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleCheckboxChange(service)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2
                          ${formData.services.includes(service)
                            ? 'bg-[#ca0019] border-[#ca0019] text-white shadow-lg shadow-red-900/20 scale-105'
                            : isDarkMode
                              ? 'border-white/10 text-gray-400 hover:border-white/30'
                              : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3
                    ${loading ? 'bg-gray-500' : 'bg-[#ca0019] hover:bg-[#b00016] text-white shadow-xl shadow-red-900/20'}`}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl h-[450px] relative group"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.82409273242!2d76.70145491128464!3d30.55434119412627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc3b350bbf2e7%3A0xece92a925f664640!2sThe%20uniques!5e1!3m2!1sen!2sin!4v1740583636506!5m2!1sen!2sin"
            style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' : 'none' }}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          />
          <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5 rounded-[2.5rem]" />
        </motion.div>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%', borderRadius: '12px' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactForm;
