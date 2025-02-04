import { worlds } from "../../data/data";
import { useAncientStore } from "../../store/useStore"

export const Slider = () => {
  const { index, date } = useAncientStore(state => state);

  return (
    <div className="flex justify-center items-center flex-1 relative">
      <input type="range" min={0} max={worlds.length - 1} value={index} className="slider w-full rounded-none" />
      <p className="absolute -bottom-10 left-0 right-0 w-fit m-auto font-classic uppercase">{date}</p>
    </div>
  )
}
