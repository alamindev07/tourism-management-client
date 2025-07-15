// src/components/ui/Table.jsx
import React from "react";

export const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="table table-zebra w-full">{children}</table>
  </div>
);

export const Thead = ({ children }) => <thead>{children}</thead>;

export const Tbody = ({ children }) => <tbody>{children}</tbody>;

export const Tr = ({ children }) => <tr>{children}</tr>;

export const Th = ({ children }) => (
  <th className="bg-base-200 text-left text-sm font-medium">{children}</th>
);

export const Td = ({ children }) => (
  <td className="py-2 px-4 text-sm text-base-content">{children}</td>
);
