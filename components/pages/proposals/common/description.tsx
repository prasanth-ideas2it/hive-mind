"use client";

import Accordion from "@/components/ui/accordion";
import { useState } from "react";

const Description = ({ data }: any) => {
  const [expanded, setExpanded] = useState(true);

  const onExpandAccordion = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="border-4 border-[#C0D7DC69] rounded-xl">
      <Accordion
        icon="/assets/icons/down-arrow-orange.svg"
        title="Description"
        className="bg-[#FFFFFF] rounded-lg py-2"
        buttonStyle="py-[12px] px-[24px]"
        expanded={expanded}
        callback={onExpandAccordion}
        data={data}
      />
    </div>
  );
};

export default Description;
