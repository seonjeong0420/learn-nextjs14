import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "About US",
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      {children}
      &copy; NextJS is Greate !
    </div>
  );
};

export default Layout;
