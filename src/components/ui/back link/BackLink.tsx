import Link from "next/link";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface Props {
  href: string;
  name: string;
}

const BackLink: FC<Props> = (props) => {
  return (
    <Link href={props.href} className="flex items-end space-x-4 py-4 pl-1">
      <IoIosArrowBack className="icon-large" />
      <h1 className="secondary-header">{props.name}</h1>
    </Link>
  );
};

export default BackLink;
