export const Spinner: React.FC<{
  w?: number;
  h?: number;
}> = ({ w=12, h=12 }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`loader animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-${h} w-${w} mb-4 border-t-blue-500`}
      ></div>
    </div>
  );
};
