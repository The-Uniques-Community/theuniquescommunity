import React, { useState } from 'react';
import { Search, Filter, Bell, Calendar, Tag, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AdvisoryBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const notices = [
    {
      id: 1,
      title: "Annual Community Meeting",
      category: "events",
      priority: "high",
      date: "2025-03-15",
      time: "10:00 AM EST",
      location: "Virtual Meeting",
      content: "Join us for our annual community gathering to discuss future initiatives.",
      registrationLink: "#",
      attachments: ["agenda.pdf", "previous-minutes.pdf"]
    },
    {
      id: 2,
      title: "New Research Grant Applications",
      category: "opportunities",
      priority: "medium",
      date: "2025-03-20",
      deadline: "2025-04-20",
      fundingAmount: "$50,000",
      content: "Applications are now open for research grants in sustainable technology.",
      eligibility: ["PhD Researchers", "Research Institutions", "Startups"],
      applicationLink: "#"
    },
    {
      id: 3,
      title: "Platform Maintenance Notice",
      category: "maintenance",
      priority: "low",
      date: "2025-03-25",
      time: "2:00 AM - 4:00 AM EST",
      content: "Scheduled maintenance will occur on March 25th from 2-4 AM EST.",
      affectedServices: ["User Portal", "API Services", "Documentation"],
      status: "Scheduled"
    }
  ];

  const upcomingDeadlines = [
    { title: "Grant Application Deadline", date: "2025-04-20" },
    { title: "Conference Registration", date: "2025-05-01" },
    { title: "Workshop Submission", date: "2025-05-15" }
  ];

  const categories = ["events", "opportunities", "maintenance", "announcements", "updates"];
  
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notice.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-secondary text-light">
      {/* Header Section */}
      <div className="bg-secondary border-b border-accent/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Community Notices</h1>
            <p className="text-accent max-w-2xl mx-auto">
              Stay updated with the latest announcements, opportunities, and important information
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-secondary/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent" />
              <input
                type="text"
                placeholder="Search notices..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-accent/20 rounded-lg focus:border-primary focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
              <select
                className="px-4 py-2 bg-secondary border border-accent/20 rounded-lg focus:border-primary focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 bg-secondary border border-accent/20 rounded-lg focus:border-primary focus:outline-none"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notices List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredNotices.map(notice => (
                <div key={notice.id} className="p-6 bg-secondary border border-accent/20 rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">{notice.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      notice.priority === 'high' ? 'bg-primary/20 text-primary' :
                      notice.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-accent mb-4">{notice.content}</p>
                  
                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-accent">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{notice.date}</span>
                    </div>
                    {notice.time && (
                      <div className="flex items-center text-sm text-accent">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{notice.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Category Tags */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Tag className="w-4 h-4 text-accent" />
                    <span className="capitalize text-accent">{notice.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="p-6 bg-secondary border border-accent/20 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Notice Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-accent">Total Notices</span>
                    <span className="font-bold">{notices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-accent">High Priority</span>
                    <span className="text-primary font-bold">
                      {notices.filter(n => n.priority === 'high').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="p-6 bg-secondary border border-accent/20 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Upcoming Deadlines</h3>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-accent">{deadline.title}</span>
                      <span className="font-bold">{deadline.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Legend */}
              <div className="p-6 bg-secondary border border-accent/20 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="capitalize text-accent">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvisoryBoard;