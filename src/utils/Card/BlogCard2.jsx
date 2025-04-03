import { ArrowOutward } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function BlogCard2({ title, subtitle, imgSrc }) {
  return (
    <Card 
      className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300" 
      sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {imgSrc && (
        <CardMedia
          component="img"
          height="200"
          image={imgSrc}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, padding: '24px' }}>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#000',
                mb: 1
              }}
            >
              {title}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ color: 'text.secondary' }}
            >
              {subtitle}
            </Typography>
          </div>
          
          <Box 
            sx={{
              backgroundColor: '#CA0019',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          >
            <ArrowOutward fontSize="small" sx={{ color: 'white' }} />
          </Box>
        </div>
        
        <Box className="mt-4">
          <Typography variant="caption" className="text-gray-500">
            March 28, 2025
          </Typography>
          
          <Box 
            sx={{ 
              mt: 2, 
              display: 'flex',
              gap: 1
            }}
          >
            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Design</span>
            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Technology</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}