"use client";
import Edit from "@/app/context/edit/page";
import List from "@/app/context/list/page";

export default function ContextProduct() {
  return (
    <div>
      <div>product context</div>
      <div className="app">
        <Edit />
        <List />
      </div>
    </div>
  );
}
