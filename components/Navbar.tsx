import Image from "next/image";
import Link from "next/link";
import React from "react";
// Search, Favorite, User icons
const navIcons = [
  {
    src: "/assets/icons/search.svg",
    alt: "search",
  },
  {
    src: "/assets/icons/black-heart.svg",
    alt: "favorite",
  },
  {
    src: "/assets/icons/user.svg",
    alt: "user",
  },
];
const Navbar = () => {
  return (
    <header className="max-w-full border-b-2 pb-4 border-primary border-opacity-25">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/sul-src/price4u.svg"
            width={36}
            height={36}
            alt="logo"
          />
          <p className="nav-logo">
            Price<span className="text-primary">4U</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon, index) => (
            <Image
              key={index}
              src={icon.src}
              width={28}
              height={28}
              alt={icon.alt}
              className="object-contain cursor-pointer"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
