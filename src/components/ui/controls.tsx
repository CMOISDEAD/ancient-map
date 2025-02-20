import { worlds } from "../../data/data";
import { useAncientStore } from "../../store/useStore"
import { Slider } from "./slider"

export const Controls = () => {
  const { index, setIndex } = useAncientStore(state => state);

  return (
    <div className="absolute top-0 w-full z-10 flex justify-between items-center px-6 py-3 md:gap-16 gap-8">
      <Button callback={() => setIndex((index - 1 + worlds.length) % worlds.length)} content="Previous" />
      <Slider />
      <Button callback={() => setIndex((index + 1) % worlds.length)} content="Next" />
    </div>
  )
}

const Button = ({ callback, content, className }: { callback: () => void, content: string, className?: string }) => {
  return (
    <button
      onClick={callback}
      className={`bg-[#FFFFFF] p-2 md:p-4 text-[#7A7A7A] font-bold font-classic uppercase text-xs 
              border-2 border-[#BFBEBE] shadow-md 
              hover:bg-[#DFDEDE] hover:shadow-lg active:bg-[#E5E5E5] 
              transition-all duration-200 ease-in-out ${className}`}>
      {content}
    </button>
  );
};

