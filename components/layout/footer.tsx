import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="pb-8 flex items-center gap-3 select-none justify-center text-gray-500 text-sm">
      <p>By</p>
      <Button variant={"ghost"} className="p-0">
        <Link href={"https://github.com/swargaraj"} target="_blank">
          @swrg
        </Link>
      </Button>
      <p>on</p>
      <Button variant={"ghost"} className="p-0">
        <Link href={"https://github.com/swargaraj/prep"} target="_blank">
          Github
        </Link>
      </Button>
    </div>
  );
}
