import { cn } from "@/utils/cn";
const Skeleton = ({ className }) => {
  return (
    <div className={cn("rounded bg-gray-200 animate-pulse h-1", className)}></div>
  );
};

export default Skeleton;
