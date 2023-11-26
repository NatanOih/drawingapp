import CanvasArea from "@/components/CanvasArea";
import RightPanelData from "@/components/RightPanelData";

export default async function Page() {
  return (
    <section className="min-h-[100vh] scroll-smooth bg-gray-950 pt-28 px-2 gap-4 flex flex-row overflow-hidden justify-center ">
      <CanvasArea />
      <RightPanelData />
    </section>
  );
}
