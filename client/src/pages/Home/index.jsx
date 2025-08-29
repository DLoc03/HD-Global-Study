import React from "react";

import Overview from "@/components/ui/Overview";
import AutoSlider from "@/components/common/BannerSlider";
import { BANNER_MAP } from "@/constants";
import Introduction from "@/components/ui/Introduction";
import GuestReviews from "@/components/ui/GuestReviews";
import Services from "@/components/ui/Services";
import Blogs from "@/components/ui/Blogs";
import ContactForm from "@/components/common/ContactForm";

function Home() {
  return (
    <div className="space-y-8">
      <Overview />
      <AutoSlider images={BANNER_MAP} isShowTitle={false} />
      <Introduction />
      <Services />
      <GuestReviews />
      <Blogs />
      <ContactForm />
    </div>
  );
}

export default Home;
