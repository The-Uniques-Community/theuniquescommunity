import React, { useState } from 'react';

const ApplicationForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        college: '',
        year: '',
        why: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">College</label>
                <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                <select
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Why do you want to be a Campus Ambassador?</label>
                <textarea
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    rows="4"
                    value={formData.why}
                    onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                    Submit Application
                </button>
            </div>
        </form>
    );
};

export default ApplicationForm;