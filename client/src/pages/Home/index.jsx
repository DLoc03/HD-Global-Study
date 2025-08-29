import React from "react";

import Overview from "@/components/ui/Overview";
import AutoSlider from "@/components/common/AutoSlide";
import { BANNER_MAP } from "@/constants";
import Introduction from "@/components/ui/Introduction";
import GuestReviews from "@/components/ui/GuestReviews";

function Home() {
  return (
    <div className="space-y-8">
      <Overview />
      <AutoSlider images={BANNER_MAP} isShowTitle={false} />
      <Introduction />
      <GuestReviews />
    </div>
  );
}

export default Home;
