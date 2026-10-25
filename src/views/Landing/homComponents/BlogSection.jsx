import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/config";
import BlogCard2 from "@/utils/Card/BlogCard2";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/blogs?limit=3`);
        if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const formatted = response.data.data.map((b, idx) => ({
            id: b._id || idx + 1,
            title: b.title,
            subtitle: b.description || (b.subContents && b.subContents[0]?.paragraph) || "Read more insights from the community",
            imgSrc: b.image || "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
          }));
          setBlogPosts(formatted.slice(0, 3));
          setError(null);
        } else {
          setBlogPosts([]);
        }
      } catch (err) {
        console.warn("Failed to fetch blog posts:", err?.message || err);
        setError("Unable to load latest blog posts.");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <Box 
      sx={{ 
        py: 8,
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#CA0019',
              fontWeight: 600,
              letterSpacing: 1.5
            }}
          >
            OUR INSIGHTS
          </Typography>
          
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#000'
            }}
          >
            Latest Blog Posts
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              maxWidth: '650px',
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            Discover the latest insights, tutorials, and community stories from The Uniques Community
          </Typography>
        </Box>
        
        {blogPosts.length > 0 ? (
          <>
            <Grid container spacing={4}>
              {blogPosts.map(post => (
                <Grid item xs={12} md={4} key={post.id}>
                  <BlogCard2 
                    title={post.title} 
                    subtitle={post.subtitle} 
                    imgSrc={post.imgSrc} 
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button 
                component={Link}
                to="/blogs"
                variant="outlined" 
                sx={{ 
                  borderColor: '#CA0019',
                  color: '#CA0019',
                  borderRadius: '50px',
                  px: 4,
                  py: 1,
                  '&:hover': {
                    borderColor: '#A00014',
                    backgroundColor: 'rgba(202, 0, 25, 0.04)'
                  }
                }}
              >
                View All Posts
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" color="text.secondary">
              {loading ? "Loading latest blog posts..." : (error || "No blog posts available at this time.")}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogSection;
