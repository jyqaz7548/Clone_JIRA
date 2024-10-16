import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Input />
      <Select> </Select>
      <Button size={"xs"}>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"muted"}>Muted</Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"teritrary"}>teritary</Button>
    </div>
  );
}
