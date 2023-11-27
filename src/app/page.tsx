import CanvasArea from "@/components/CanvasArea";
import RightPanelData from "@/components/RightPanelData";

export default async function Page() {
  return (
    <section className=" scroll-smooth pt-28 px-2 gap-4 flex flex-row overflow-hidden justify-center ">
      <CanvasArea />
      <RightPanelData />
    </section>
  );
}
