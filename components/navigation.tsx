"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const Navigation = () => {
  const path = usePathname();
  console.log("path:: ", path);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link> {path === "/" ? "💜" : ""}
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
          {path === "/about-us" ? "✅" : ""}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
