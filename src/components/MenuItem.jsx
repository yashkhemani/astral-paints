import Link from "next/link";
import React from "react";

export const MenuItem = ({ title, address }) => {
  return (
    <div>
      <Link
        href={address}
        className="text-amber-50 hover:text-amber-300 font-bold"
      >
        <p className="text-md">{title}</p>
      </Link>
    </div>
  );
};
