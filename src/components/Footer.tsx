import Logo from "@/assets/LogoLight.svg";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/company/swish-ma",
    },
    {
      icon: Facebook,
      url: "https://www.facebook.com/swish.ma",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/swish.ma/",
    },
    {
      icon: FaTiktok,
      url: "https://www.tiktok.com/@swish.ma",
    },
  ];

  return (
    <footer className="text-white bg-[#0c381b]">
      <div className="py-12 md:py-16 lg:py-20 xl:py-28  container mx-auto text-white justify-center items-center text-center md:justify-start md:items-start md:text-left">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex px-4">
              <img src={Logo} alt="swish.ma" className="" />
            </div>

            <p className="text-sm font-normal">Swish by Zoopy SARL © 2025</p>

            {/* <div className="w-full flex items-center justify-center md:justify-start gap-3">
              {footerLinks.map((link, index) => (
                <Link
                  to={link.url}
                  target="_blank"
                  className="transition-all duration-300 hover:underline text-sm font-normal"
                  key={index}
                >
                  {link.name}
                </Link>
              ))}
            </div> */}
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            {socialLinks.map((socialLink, index) => (
              <Link
                to={socialLink.url}
                target="_blank"
                className="transition-all duration-300 hover:bg-primary hover:border-primary text-sm border border-white rounded-full p-2"
                key={index}
              >
                <socialLink.icon size={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
