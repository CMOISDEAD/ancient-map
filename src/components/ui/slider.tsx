import { worlds } from "../../data/data";
import { useAncientStore } from "../../store/useStore";

export const Slider = () => {
  const { index, date, setIndex } = useAncientStore(state => state);

  return (
    <div className="flex justify-center items-center flex-1 relative">
      <input
        type="range"
        min={0}
        max={worlds.length - 1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="w-full appearance-none bg-[#DFDEDE] h-2 border-2 border-[#BFBEBE] shadow-inner 
                   cursor-pointer accent-[#7A7A7A] rounded-lg 
                   [&::-webkit-slider-thumb]:appearance-none 
                   [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                   [&::-webkit-slider-thumb]:bg-[#FFFFFF] 
                   [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#BFBEBE] 
                   [&::-webkit-slider-thumb]:rounded-full 
                   [&::-webkit-slider-thumb]:hover:bg-[#E5E5E5] 
                   transition-all duration-200 ease-in-out"
      />
      <p className="absolute -bottom-10 left-0 right-0 w-fit m-auto font-classic uppercase text-[#7A7A7A]">
        {date}
      </p>
    </div>
  );
};
