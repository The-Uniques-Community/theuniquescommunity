import { Button } from "@mui/material";
import bg from "@/assets/img/404bg.jpg";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center relative bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-gray-900 opacity-20 z-[0]">
        <img src={bg} alt="" />
      </div>
      <div className="relative z-0">
        <p
          className="lg:text-9xl md:text-7xl text-5xl font-bold text-red-600"
        >
          404
        </p>
        <p className="mt-4 text-xl font-semibold text-gray-900">
          Sorry, the page can’t be found
        </p>
        <p className="mt-2 text-gray-600">
          The page you were looking for appears to have been moved, deleted, or
          does not exist.
        </p>
        <Button variant="contained" color="primary" sx={{ mt: 4 }} href="/">
          Back to homepage
        </Button>
      </div>
    </div>
  );
};

export default index;
