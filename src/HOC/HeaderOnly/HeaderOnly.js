import React from "react";
import Header from "../../components/Header/Header";
export default function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
