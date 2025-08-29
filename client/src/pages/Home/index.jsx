import React from "react";

import Overview from "@/components/ui/Overview";
import AutoSlider from "@/components/common/AutoSlide";
import { BANNER_MAP } from "@/constants";
import Introduction from "@/components/ui/Introduction";

function Home() {
  return (
    <div className="space-y-8">
      <Overview />
      <AutoSlider images={BANNER_MAP} isShowTitle={false} />
      <Introduction />
    </div>
  );
}

export default Home;
