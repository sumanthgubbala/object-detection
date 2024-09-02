import ObjectDetection from "@/components/objectDetection";
import Image from "next/image";

export default function Home() {
  return (
   <main className="flex min-h-screen flex-col items-center p-[32px]">
    <h1
    className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl 
    tracking-tighter md:px-6 text-center"
    >Object Detection</h1>
    <ObjectDetection />
   </main>
  );
}
