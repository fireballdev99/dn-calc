import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function Home() {
  return (
    <section className="bg-gray-400 flex flex-col items-center justify-center gap-4 ">
      <div className="flex gap-2 w-full items-center justify-center p-2">
        <div className="bg-green-200 w-full h-screen p-4">
          <p className="text-black">Left</p>
          <div className="flex">
            <Input endContent={
              <Button color="primary">Save</Button>
            } />
          </div>
        </div>
        <div className="bg-blue-200 w-full h-screen p-4">
          <p className="text-black">Right</p>
        </div>
      </div>
    </section>
  );
}
