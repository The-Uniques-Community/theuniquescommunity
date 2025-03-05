import CommunityCard from "@/utils/Card/CommunityCard";
import WeirdCard from "@/utils/Card/WeirdCard";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <WeirdCard/>
        <CommunityCard/>
    </div>
  )
}

export default index