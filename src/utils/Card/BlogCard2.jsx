// src/components/BlogCard.jsx
import { ArrowOutward } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function BlogCard2({ title, subtitle, imgSrc }) {
  return (
    <Card className="!bg-transparent !shadow-none text-white">
      <div className="flex items-center justify-between pt-4 pb-2">
        <div>
          <Typography variant="h6" className="!text-black">
            {title}
          </Typography>
          <Typography variant="body2" className="text-slate-700">
            {subtitle}
          </Typography>
        </div>
        <div className="bg-black hover:bg-[#ca0019] w-10 h-10 flex items-center justify-center rounded-full p-1">
          <ArrowOutward className="text-white" fontSize="small" />
        </div>
      </div>
      {imgSrc && (
        <CardMedia
          component="img"
          height="100"
          image={imgSrc}
          alt={title}
          className="rounded-lg mt-4"
        />
      )}
    </Card>
  );
}
