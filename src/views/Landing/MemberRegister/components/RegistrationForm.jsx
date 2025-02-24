import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    course: "",
    whatsappContact: "",
    batch: "",
    admnNo: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white  rounded-lg m-3">
      <h2 className="text-2xl font-bold text-center mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="">
        <div className=" grid lg:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-4">
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "WhatsApp Contact", name: "whatsappContact" },
          { label: "Admission Number", name: "admnNo" },
          { label: "Contact", name: "contact" },
        ].map((field, index) => (
          <div
            key={index}
            className="lg:col-span-1 col-span-1"
          >
            <div className="">
              <TextField
                fullWidth
                className="w-full"
                variant="outlined"
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}
        <div className="lg:col-span-2 col-span-1">
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 my-4 gap-4">
            <div className="col-span-1">
                <FormControl fullWidth>
                    <InputLabel>Course</InputLabel>
                    <Select
                    value={formData.course}
                    onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                    }
                    name="course"
                    >
                    <MenuItem value="">Select Course</MenuItem>
                    <MenuItem value="course1">Course 1</MenuItem>
                    <MenuItem value="course2">Course 2</MenuItem>
                    <MenuItem value="course3">Course 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="col-span-1">
                <FormControl fullWidth>
                    <InputLabel>Batch</InputLabel>
                    <Select
                    value={formData.batch}
                    onChange={(e) =>
                        setFormData({ ...formData, batch: e.target.value })
                    }
                    name="batch"
                    >
                    <MenuItem value="">Select Batch</MenuItem>
                    <MenuItem value="The Uniques 1.0">The Uniques 1.0</MenuItem>
                    <MenuItem value="The Uniques 2.0">The Uniques 2.0</MenuItem>
                    <MenuItem value="The Uniques 3.0">The Uniques 3.0</MenuItem>
                    <MenuItem value="The Uniques 4.0">The Uniques 4.0</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>

        <Button type="submit" variant="contained" sx={{py:1.3}} color="primary" fullWidth>
          REGISTER
        </Button>
      </form>
    </div>
  );
}
