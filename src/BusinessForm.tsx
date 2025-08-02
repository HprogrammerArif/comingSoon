import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";

const cities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Oujda",
  "Meknes",
  "Tetouan",
  "Kenitra",
  "Safi",
  "Essaouira",
  "Nador",
  "El Jadida",
  "Taza",
  "Beni Mellal",
  "Khouribga",
  "Mohammedia",
  "Laayoune",
  "Dakhla",
  "Khemisset",
  "Settat",
  "Taroudant",
  "Berrechid",
  "Larache",
  "Al Hoceima",
  "Ouarzazate",
  "Errachidia",
  "Guelmim",
  "Sidi Slimane",
  "Sidi Kacem",
  "Tiznit",
  "Tan-Tan",
  "Fnideq",
  "Chefchaouen",
  "Ifrane",
  "Azrou",
  "Ksar El Kebir",
  "Temara",
  "Sale",
];

const businessSchema = z.object({
  companyName: z.string().min(1, "Ce champ est requis"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  city: z.string().optional(),
  phone: z.string().optional(),
  iceNumber: z
    .string()
    .length(15, "Le numéro ICE doit contenir exactement 15 chiffres")
    .optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export const BusinessForm = () => {
  const [search, setSearch] = useState("");
  const [, setSelected] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Track highlighted index

  const filteredCities = search
    ? cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()))
    : [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    mode: "onChange",
  });

  const [phone, setPhone] = useState(""); // Phone state

  const onSubmit = async (data: BusinessFormData) => {
    const userData = {
      email: data.email,
      role: "company",
      company_name: data.companyName,
      city: data.city,
      telephone: data.phone,
      ice_number: data.iceNumber,
    };

    try {
      const response = await axios.post(
        "https://api.swish.ma/accounts/api/v1/pre-subscription",
        userData
      );
      
      toast.success("Business Profile Registered successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      // reset the form
        reset();
        setPhone("");
    } catch (error) {
      toast.error(error?.response?.data?.email[0], {
        position: "top-right",
        autoClose: 2000,
      });
      console.log({ error });
      reset();
      setPhone("");
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredCities.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      setSearch(filteredCities[highlightedIndex]);
      setSelected(filteredCities[highlightedIndex]);
      setIsDropdownOpen(false);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false); // Close dropdown on Escape
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-200 "
        >
          Nom de l'entreprise
        </label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="Nom de l'entreprise"
          className=""
        />
        {errors.companyName && (
          <span className="text-red-500">{errors.companyName.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200 "
        >
          Adresse e-mail
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Adresse e-mail"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-200 "
        >
          Ville
        </label>
        <Input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownOpen(true);
          }}
          onKeyDown={handleKeyDown} // Add keydown handler
          placeholder="Ville"
          className="h-12 pr-10 pl-4 shadow-md rounded-md"
          id="city"
        />

        {isDropdownOpen && filteredCities.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-md z-50">
            <Command className="w-full">
              <CommandList className="max-h-[400px] overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={() => {
                      setSearch(city);
                      setSelected(city);
                      setIsDropdownOpen(false);
                    }}
                    className={`${
                      highlightedIndex === index ? "bg-primary text-white" : ""
                    } cursor-pointer`}
                  >
                    {city}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </div>
        )}
        {/* Show message when no cities match */}
        {/* {isDropdownOpen && filteredCities.length === 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-md z-50">
            <div className="p-2 text-center text-gray-500">
              Aucune ville trouvée
            </div>
          </div>
        )} */}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-200 "
        >
          Numéro de téléphone
        </label>
        <PhoneInput
          country={"ma"}
          value={phone}
          onChange={setPhone}
          placeholder="Numéro de téléphone"
          inputStyle={{ height: "48px", width: "100%", borderRadius: "8px" }}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="iceNumber"
          className="block text-sm font-medium text-gray-200 "
        >
          Numéro ICE
        </label>
        <Input
          id="iceNumber"
          {...register("iceNumber")}
          placeholder="Numéro ICE"
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid || !phone}
        className="w-full h-12 mt-4 text-sm font-medium cursor-pointer disabled:opacity-50"
      >
        S'abonner
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </form>
  );
};

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./components/ui/input";
// import { Button } from "./components/ui/button";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useState } from "react";
// import {
//   Command,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// const cities = [
//   "Casablanca",
//   "Rabat",
//   "Marrakech",
//   "Fes",
//   "Tangier",
//   "Agadir",
//   "Oujda",
//   "Meknes",
//   "Tetouan",
//   "Kenitra",
//   "Safi",
//   "Essaouira",
//   "Nador",
//   "El Jadida",
//   "Taza",
//   "Beni Mellal",
//   "Khouribga",
//   "Mohammedia",
//   "Laayoune",
//   "Dakhla",
//   "Khemisset",
//   "Settat",
//   "Taroudant",
//   "Berrechid",
//   "Larache",
//   "Al Hoceima",
//   "Ouarzazate",
//   "Errachidia",
//   "Guelmim",
//   "Sidi Slimane",
//   "Sidi Kacem",
//   "Tiznit",
//   "Tan-Tan",
//   "Fnideq",
//   "Chefchaouen",
//   "Ifrane",
//   "Azrou",
//   "Ksar El Kebir",
//   "Temara",
//   "Sale"
// ];

// const businessSchema = z.object({
//   companyName: z.string().min(1, "Ce champ est requis"),
//   email: z.string().email("Veuillez entrer une adresse e-mail valide"),
//   city: z.string().optional(),
//   phone: z.string().optional(),
//   iceNumber: z
//     .string()
//     .length(15, "Le numéro ICE doit contenir exactement 15 chiffres")
//     .optional(),
// });

// type BusinessFormData = z.infer<typeof businessSchema>;

// export const BusinessForm = () => {
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const filteredJobs = search
//     ? cities.filter((job) => job.toLowerCase().includes(search.toLowerCase()))
//     : [];

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<BusinessFormData>({
//     resolver: zodResolver(businessSchema),
//   });

//   const [phone, setPhone] = useState(""); //

//   const onSubmit = async (data: BusinessFormData) => {
//     const userData = {
//       email: data.email,
//       role: "company",
//       company_name: data.companyName,
//       telephone: data.phone,
//       ice_number: data.iceNumber,
//     };

//     try {
//       const response = await axios.post(
//         "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
//         userData
//       );
//       console.log({ response });
//       toast.success("Business Profile Registered successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error("Something went wrong!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       console.log({ error });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label
//           htmlFor="companyName"
//           className="block text-sm font-medium text-gray-200 "
//         >
//           Nom de l'entreprise
//         </label>
//         <Input
//           id="companyName"
//           {...register("companyName")}
//           placeholder="Nom de l'entreprise"
//         />
//         {errors.companyName && (
//           <span className="text-red-500">{errors.companyName.message}</span>
//         )}
//       </div>

//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-200 mb-1"
//         >
//           Adresse e-mail
//         </label>
//         <Input
//           id="email"
//           type="email"
//           {...register("email")}
//           placeholder="Adresse e-mail"
//         />
//         {errors.email && (
//           <span className="text-red-500">{errors.email.message}</span>
//         )}
//       </div>

//       <div className="relative w-full max-w-xl mx-auto">
//         <label
//           htmlFor="city"
//           className="block text-sm font-medium text-gray-200 mb-1"
//         >
//           Ville
//         </label>
//         <Input
//           type="text"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setIsDropdownOpen(true);
//           }}
//           placeholder="Ville"
//           className="h-12 pr-10 pl-4 shadow-md rounded-md"
//         />

//         {search && isDropdownOpen && filteredJobs.length > 0 && (
//           <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-md z-50">
//             <Command className="w-full">
//               <CommandList className="max-h-[400px] overflow-y-auto">
//                 {filteredJobs.map((job) => (
//                   <CommandItem
//                     key={job}
//                     value={job}
//                     onSelect={() => {
//                       setSearch(job);
//                       setSelected(job);
//                       setIsDropdownOpen(false);
//                     }}
//                   >
//                     {job}
//                   </CommandItem>
//                 ))}
//               </CommandList>
//             </Command>
//           </div>
//         )}
//       </div>

//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-200 mb-1"
//         >
//           Numéro de téléphone
//         </label>
//         <PhoneInput
//           country={"ma"}
//           value={phone}
//           onChange={setPhone}
//           placeholder="Numéro de téléphone"
//           inputStyle={{ height: "48px", width: "100%", borderRadius: "8px" }}
//         />
//         {errors.phone && (
//           <span className="text-red-500">{errors.phone.message}</span>
//         )}
//       </div>

//       <div>
//         <label
//           htmlFor="iceNumber"
//           className="block text-sm font-medium text-gray-200 mb-1"
//         >
//           Numéro ICE
//         </label>
//         <Input
//           id="iceNumber"
//           {...register("iceNumber")}
//           placeholder="Numéro ICE"
//         />
//       </div>

//       <Button
//         type="submit"
//         className="w-full h-12 text-sm font-medium cursor-pointer"
//       >
//         S'abonner
//       </Button>
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         style={{ zIndex: 9999 }}
//       />
//     </form>
//   );
// };

// // import { useForm } from "react-hook-form";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Input } from "./components/ui/input";
// // import { Button } from "./components/ui/button";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const businessSchema = z.object({
// //   companyName: z.string().min(1, "Ce champ est requis"),
// //   email: z.string().email("Adresse e-mail invalide"),
// //   city: z.string().optional(),
// //   phone: z.string().optional(),
// //   iceNumber: z.string().optional(),
// // });

// // type BusinessFormData = z.infer<typeof businessSchema>;

// // export const BusinessForm = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<BusinessFormData>({
// //     resolver: zodResolver(businessSchema),
// //   });

// //   const onSubmit = async (data: BusinessFormData) => {
// //     console.log("Business Form Data:", data);

// //     const userData = {
// //       email: data.email,
// //       role: "company",
// //       company_name: data.companyName,
// //       telephone: data.phone,
// //       ice_number: data.iceNumber,
// //     };
// //     console.log({ userData });

// //     try {
// //       const response = await axios.post(
// //         "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
// //         userData
// //       );

// //       console.log("Server response:", response.data);
// //       toast.success("Business Profile Registered successfully!", {
// //         position: "top-right",
// //         autoClose: 2000,
// //       });
// //       //   navigator("/SkeletonDemo");
// //     } catch (error) {
// //       console.error("Error during form submission:", error);
// //       toast.error("Something went wrong!", {
// //         position: "top-right",
// //         autoClose: 2000,
// //       });
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //       <div>
// //         <label
// //           htmlFor="companyName"
// //           className="block text-sm font-medium text-gray-200 mb-1"
// //         >
// //           Nom de l'entreprise
// //         </label>
// //         <Input
// //           id="companyName"
// //           {...register("companyName")}
// //           placeholder="Nom de l'entreprise"
// //         />
// //         {errors.companyName && (
// //           <span className="text-red-500">{errors.companyName.message}</span>
// //         )}
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="email"
// //           className="block text-sm font-medium text-gray-200 mb-1"
// //         >
// //           Adresse e-mail
// //         </label>
// //         <Input
// //           id="email"
// //           type="email"
// //           {...register("email")}
// //           placeholder="Adresse e-mail"
// //         />
// //         {errors.email && (
// //           <span className="text-red-500">{errors.email.message}</span>
// //         )}
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="city"
// //           className="block text-sm font-medium text-gray-200 mb-1"
// //         >
// //           Ville
// //         </label>
// //         <Input id="city" {...register("city")} placeholder="Ville" />
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="phone"
// //           className="block text-sm font-medium text-gray-200 mb-1"
// //         >
// //           Numéro de téléphone
// //         </label>
// //         <Input
// //           id="phone"
// //           type="tel"
// //           {...register("phone")}
// //           placeholder="Numéro de téléphone"
// //         />
// //       </div>

// //       <div>
// //         <label
// //           htmlFor="iceNumber"
// //           className="block text-sm font-medium text-gray-200 mb-1"
// //         >
// //           Numéro ICE
// //         </label>
// //         <Input
// //           id="iceNumber"
// //           {...register("iceNumber")}
// //           placeholder="Numéro ICE"
// //         />
// //       </div>

// //       <Button
// //         type="submit"
// //         className="w-full h-12 text-sm font-medium cursor-pointer"
// //       >
// //         S'abonner
// //       </Button>
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={2000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="dark"
// //         style={{ zIndex: 9999 }}
// //       />
// //     </form>
// //   );
// // };
