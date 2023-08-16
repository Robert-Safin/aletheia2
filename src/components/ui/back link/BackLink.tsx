import Link from "next/link";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface Props {
  href: string;
  name: string;
}

const BackLink: FC<Props> = (props) => {
  return (
    <Link href={props.href} className="flex items-end space-x-4 py-2 pl-1 sticky top-0 z-10 bg-black">
      <IoIosArrowBack className="icon-large" />
      <h1 className="secondary-header">{props.name}</h1>
    </Link>
  );
};

export default BackLink;
