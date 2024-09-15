import { currentViewType } from "@/types/view";
import Link from "next/link";
interface IndividualViewCardProps {
  setCurrentView: (value: currentViewType) => void;
  label: string;
  labelDesc: string;
  color: string;
  link: string;
}
export const IndividualViewCard: React.FC<IndividualViewCardProps> = ({
  setCurrentView,
  color,
  labelDesc,
  label,
  link,
}) => {
  return (
    <Link
      href={link}
      onClick={() => {
        if (color === "green") setCurrentView("admin");
        else setCurrentView("customer");
      }}
    >
      <div
        className={`bg-${color}-500 text-white px-10 py-6 md:px-16 md:py-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-${color}-600 hover:shadow-xl cursor-pointer`}
      >
        <h2 className="text-2xl md:text-3xl font-bold">{label}</h2>
        <p className="mt-4 text-md md:text-lg">{labelDesc}</p>
      </div>
    </Link>
  );
};
