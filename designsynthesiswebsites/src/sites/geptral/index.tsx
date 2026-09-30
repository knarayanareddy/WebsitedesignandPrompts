import { Hero } from "./Hero";
import { Section2 } from "./Section2";
import { Section3, Section4, Section5, Section6 } from "./Sections";
import { Wordmark, Footer } from "../../shared/ui";

export default function Geptral() {
  return (
    <main className="bg-[#1b1b1b] text-white">
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <div className="relative z-50">
        <Wordmark text="GEPTRAL" />
      </div>
      <Footer
        brand="Geptral"
        since="2015"
        partners={["Intel", "GoFound", "Oracle", "Nutanix", "Mstar"]}
        socials={["LinkedIn", "Instagram", "Clutch", "X"]}
        email="info@geptral.com"
        callText="Let's discuss your needs and KPI's in detail. Speak soon!"
        accent="#DE7D4D"
      />
    </main>
  );
}
