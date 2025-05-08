import { cn } from "@/lib/utils";

interface PostTypePickerProps {
  currentPostType: string;
  setPostType: (...event: any[]) => void;
}

export default function PostTypePicker({ currentPostType, setPostType }: PostTypePickerProps) {
  return (
    <div className="mx-auto grid w-52 grid-cols-2 text-sm md:w-60 md:text-lg">
      <input
        type="button"
        value="Erbjuds"
        onClick={() => setPostType("Erbjuds")}
        className={cn("cursor-pointer rounded-s-md bg-white py-[3px] hover:bg-opacity-60", currentPostType === "Erbjuds" && "bg-offerColor bg-opacity-65")}
      ></input>
      <input
        type="button"
        value="Efterfrågas"
        onClick={() => setPostType("Efterfrågas")}
        className={cn("cursor-pointer rounded-e-md bg-white py-[3px] hover:bg-opacity-60", currentPostType === "Efterfrågas" && "bg-requestColor bg-opacity-65")}
      ></input>
    </div>
  );
}
