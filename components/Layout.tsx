import React, { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return <div>{props.children}</div>;
}
