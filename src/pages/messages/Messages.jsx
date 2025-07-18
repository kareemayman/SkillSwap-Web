import React from "react";
import { TabItem, Tabs } from "flowbite-react";
import MsgCart from "./components/MsgCart";
import Header from "../../components/Header";
export default function Messages() {
  const staticdata = [
    {
      pic: "",
      name: "doaa",
      msg: "hiiii every one",
      time: "10:00 AM",
      unread: true,
    },
    {
      pic: "",
      name: "ahmed",
      msg: "welcome back",
      time: "10:00 AM",
      unread: true,
    },
  ];
  return (
    <>
      <Header></Header>

      <div className="container mx-auto py-6 px-4 md:px-16 ">
        <h1 className="text-[var(--color-text-primary)] text-3xl font-bold mb-4">
          Messages
        </h1>
        <p className="text-3 text-[var(--color-text-secondary)] leading-5 mb-4 ">
          Communicate with potential matches, discuss details of the skill
          exchange, and schedule sessions.
        </p>
        <Tabs aria-label="Tabs with underline" variant="underline">
          <TabItem active title="All"></TabItem>
          <TabItem title="Unread"></TabItem>
        </Tabs>

        <div className="flex flex-col gap-4  w-full">
          {staticdata.map((item, index) => (
            <MsgCart key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}
