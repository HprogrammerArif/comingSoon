"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BusinessForm } from "./BusinessForm";
import { PrivateForm } from "./PrivateForm";
import logoWhite from "@/assets/LogoLight.svg";
import logoBlack from "@/assets/logoBlack.svg";

export default function LaunchingPage() {
  const [activeTab, setActiveTab] = useState("entreprise");

  const backgroundClass =
    activeTab === "entreprise" ? "bg-[#1a482a]" : "bg-[#e6e4cc]"; // change second color as needed
  const textColor =
    activeTab === "entreprise" ? "text-gray-50" : "text-gray-900";

  const logo = activeTab === "entreprise" ? logoWhite : logoBlack;

  return (
    <div
      className={`w-full h-screen mx-auto p-4 space-y-6 transition-colors duration-500 ${backgroundClass}`}
    >
      <div className="text-center flex justify-center mt-6 md:mt-12">
        <img src={logo} alt="" />
      </div>

      <div className="text-center mb-12 ">
        <h1 className={`text-3xl font-semibold ${textColor}`}>
          Lancement imminent
        </h1>
        <p className={` ${textColor}`}>
          Inscrivez-vous ci-dessous pour être parmi les premiers informés lors
          du lancement.
        </p>
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
  );
}
