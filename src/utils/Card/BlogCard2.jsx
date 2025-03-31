// src/components/BlogCard.jsx
import { ArrowOutward } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function BlogCard2({ title, subtitle, imgSrc }) {
  return (
    <Card className="bg-transparent shadow-none text-white">
      <div className="flex items-center justify-between border-t border-slate-500 pt-4 pb-2">
        <div>
          <Typography variant="h6" className="!text-white">
            {title}
          </Typography>
          <Typography variant="body2" className="text-slate-400">
            {subtitle}
          </Typography>
        </div>
        <div className="border border-slate-500 rounded-full p-1">
          <ArrowOutward className="text-white" fontSize="small" />
        </div>
      </div>
      {imgSrc && (
        <CardMedia
          component="img"
          height="140"
          image={imgSrc}
          alt={title}
          className="rounded-lg mt-4"
        />
      )}
    </Card>
  );
}
