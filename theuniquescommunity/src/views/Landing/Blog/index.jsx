import React, { useState, useEffect } from "react";
import { 
  Modal, 
  Box, 
  IconButton, 
  Chip, 
  Paper, 
  TextField, 
  Typography, 
  Divider,
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Button,
  InputAdornment,
  Drawer,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import BlogCard from "@/utils/Card/BlogCard";
import CelebrationComponent from "@/utils/Header";
import CallToAction from "../homComponents/CallToAction";
import { blogData } from "@/assets/dummyData/blogData";
import { useThemeContext } from "@/theme/ThemeProvider";

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDarkMode } = useThemeContext();

  // Extract unique categories from blogData
  const categories = [...new Set(blogData.map((blog) => blog.category || "Uncategorized"))];

  // Filtering logic with null checks
  const filteredBlogs = blogData.filter((blog) => {
    // Category filter (if no categories selected, show all)
    const categoryMatch = selectedCategories.length === 0 || 
      selectedCategories.includes(blog.category);
    
    // Search filter with null checks
    const searchMatch = searchQuery === "" || (
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (blog.content && blog.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.tags && Array.isArray(blog.tags) && blog.tags.some(tag => 
        tag && tag.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );
    
    return categoryMatch && searchMatch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  // Filter sidebar content
  const filterContent = (
    <Box sx={{ 
      width: isMobile ? 280 : 260, 
      p: 3,
      height: '100%',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="700" sx={{ color: isDarkMode ? '#fff' : '#333' }}>
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setMobileFilterOpen(false)} size="small" sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            color: isDarkMode ? '#fff' : 'inherit',
            '& fieldset': {
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            },
            '&:hover fieldset': {
              borderColor: '#CA0019',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            opacity: 1
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'action' }} />
            </InputAdornment>
          ),
        }}
        size="small"
      />

      <Divider sx={{ mb: 3, borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }} />
      
      <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary' }}>
        Categories
      </Typography>
      
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox 
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                size="small"
                sx={{
                  color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                  '&.Mui-checked': {
                    color: '#CA0019',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ 
                textTransform: 'capitalize',
                color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#444',
                fontWeight: selectedCategories.includes(category) ? 600 : 400
              }}>
                {category || "Uncategorized"}
              </Typography>
            }
            sx={{ mb: 0.5 }}
          />
        ))}
      </FormGroup>
      
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={clearFilters}
        sx={{ 
          mt: 4, 
          color: '#CA0019', 
          borderColor: '#CA0019',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#CA0019',
            backgroundColor: 'rgba(202, 0, 25, 0.08)',
          }
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#161616]' : 'bg-gray-50/50'}`}>
      <CelebrationComponent title="Shaping Perspectives → Read & Grow ✦" />

      <div className="flex">
        {/* Filter Sidebar - Desktop */}
        {!isMobile && (
          <Paper 
            elevation={0} 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'sticky',
              top: 0,
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
              borderRight: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              borderRadius: 0
            }}
          >
            {filterContent}
          </Paper>
        )}
        
        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          PaperProps={{
            sx: { backgroundColor: 'transparent' }
          }}
        >
          {filterContent}
        </Drawer>

        {/* Main Content */}
        <div className="flex-1 lg:max-w-7xl md:max-w-5xl mx-auto py-12 mt-5 px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`lg:text-5xl text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Latest <span className="text-[#CA0019]">Blogs</span>
            </h1>
            
            {/* Mobile filter button */}
            {isMobile && (
              <Button 
                startIcon={<FilterListIcon />}
                onClick={() => setMobileFilterOpen(true)}
                variant="contained"
                sx={{ 
                  backgroundColor: '#CA0019',
                  '&:hover': { backgroundColor: '#A50014' }
                }}
              >
                Filters
              </Button>
            )}
          </div>
          
          {/* Results info */}
          <div className="mb-8 flex items-center justify-between">
            <Typography variant="body1" sx={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'text.secondary', fontWeight: 500 }}>
              Showing <span className="text-[#CA0019]">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'result' : 'results'}
            </Typography>
            {(selectedCategories.length > 0 || searchQuery) && (
              <Button 
                size="small" 
                onClick={clearFilters}
                sx={{ color: '#CA0019', fontWeight: 700 }}
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Blog Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 place-items-stretch">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <BlogCard 
                  key={index} 
                  {...blog} 
                  onClick={() => setSelectedBlog(blog)}
                />
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <Box sx={{ opacity: 0.5, mb: 2 }}>
                  <SearchIcon sx={{ fontSize: 64, color: isDarkMode ? '#fff' : '#333' }} />
                </Box>
                <Typography variant="h5" sx={{ color: isDarkMode ? '#fff' : '#333', fontWeight: 700 }}>
                  No blogs found matching your filters
                </Typography>
                <Button 
                  variant="text" 
                  onClick={clearFilters}
                  sx={{ 
                    mt: 2, 
                    color: '#CA0019',
                    fontWeight: 700
                  }}
                >
                  Try clearing all filters
                </Button>
              </div>
            )}
          </div>

          <div className="py-8"></div>
        </div>
      </div>

      <CallToAction />
      <div className="py-8"></div>

      {/* Blog Modal */}
      <Modal
        open={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        aria-labelledby="blog-title"
        aria-describedby="blog-content"
      >
        <Box className="fixed inset-0 overflow-auto" 
          sx={{
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
        >
          {selectedBlog && (
            <div className="max-w-4xl mx-auto p-8 lg:py-16 bg-transparent">
              {/* Close Button */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1 pr-8">
                  <h2 id="blog-title" className={`text-4xl lg:text-5xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedBlog.title}
                  </h2>
                </div>
                <IconButton 
                  onClick={() => setSelectedBlog(null)}
                  sx={{ 
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    '&:hover': { backgroundColor: '#CA0019', color: '#fff' }
                  }}
                >
                  <CloseIcon sx={{ color: isDarkMode ? '#fff' : 'inherit' }} />
                </IconButton>
              </div>

              {/* Blog Meta Info */}
              <div className="flex items-center gap-4 mb-8">
                <Chip 
                  label={selectedBlog.category || "Uncategorized"} 
                  sx={{ 
                    backgroundColor: '#CA0019', 
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: '6px'
                  }} 
                />
                <Typography variant="body1" sx={{ color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'text.secondary' }}>
                   • {selectedBlog.readTime || "5"} Mins Read
                </Typography>
              </div>

              {/* Blog Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Blog Content Sections */}
              <div
                id="blog-content"
                className={`mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xl leading-relaxed space-y-10`}
              >
                {selectedBlog.subContents && selectedBlog.subContents.map((section, index) => (
                  <div key={index} className="space-y-4">
                    {section.heading && (
                      <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {section.heading}
                      </h3>
                    )}
                    <p>{section.paragraph}</p>
                  </div>
                ))}
              </div>

              {/* Tags Section */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <Typography variant="h6" sx={{ mb: 3, color: isDarkMode ? '#fff' : '#333', fontWeight: 700 }}>
                  Tags
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {selectedBlog.tags && selectedBlog.tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      variant="outlined"
                      sx={{ 
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                        '&:hover': {
                          backgroundColor: '#CA0019',
                          color: '#fff',
                          borderColor: '#CA0019'
                        }
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BlogPage;
