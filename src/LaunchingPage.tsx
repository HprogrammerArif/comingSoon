import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BusinessForm } from "./BusinessForm";
import { PrivateForm } from "./PrivateForm";
import LogoIcon from "@/assets/LogoIcon.svg";
import logoWhiteIcon from "@/assets/logoWhiteIcon.svg";
import Process from "./components/Process";
import Footer from "./components/Footer";

export default function LaunchingPage() {
  const [activeTab, setActiveTab] = useState("entreprise");

  const backgroundClass =
    activeTab === "entreprise" ? "bg-[#1a482a]" : "bg-[#e6e4cc]";
  const textColor =
    activeTab === "entreprise" ? "text-gray-50" : "text-gray-900";

  const logo = activeTab === "entreprise" ? logoWhiteIcon : LogoIcon;

  return (
    <>
      <div
        className={`w-full  space-y-6 transition-colors duration-500 ${backgroundClass}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 justify-center items-center  py-10 md:py-20 lg:py-32 xl:py-36 container mx-auto px-4">
          <div className="grid  gap-6 lg:gap-10">
            <div className="text-center flex justify-center  transition-all duration-500">
              <img
                className="w-full  max-w-[60%] md:max-w-[200px] lg:max-w-[230px] xl:max-w-[260px] "
                src={logo}
                alt="Logo"
              />
            </div>

            <div className="text-center  transition-all duration-500">
              <h1 className={`text-3xl mb-3 font-semibold ${textColor}`}>
                swish.ma – Bientôt disponible au Maroc!
              </h1>
              <p className={`${textColor}`}>
                La nouvelle plateforme marocaine pour trouver facilement des
                artisans et des professionnels de confiance, partout au Maroc.
              </p>
            </div>
          </div>
          <div className="w-full max-w-lg mx-auto">
            <Tabs
              defaultValue="entreprise"
              onValueChange={(value) => setActiveTab(value)}
              className="space-y-4"
            >
              <TabsList className="w-full container mx-auto text-center">
                <TabsTrigger
                  value="entreprise"
                  className="px-4 py-2 text-lg font-semibold"
                >
                  Entreprise
                </TabsTrigger>
                <TabsTrigger
                  value="particulier"
                  className="px-4 py-2 text-lg font-semibold"
                >
                  Particulier
                </TabsTrigger>
              </TabsList>

              <TabsContent value="entreprise">
                <BusinessForm />
              </TabsContent>
              <TabsContent value="particulier">
                <PrivateForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Process />
      <Footer />
    </>
  );
}
