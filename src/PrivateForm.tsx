import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
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

const privateSchema = z.object({
  fullName: z.string().min(2, "Ce champ est requis"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  city: z.string().min(2, "La ville est requise"),
  phone: z.string().min(5, "Le numéro de téléphone est requis"),
});

type PrivateFormData = z.infer<typeof privateSchema>;

export const PrivateForm = () => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [phone, setPhone] = useState("");

  const filteredCities = search
    ? cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()))
    : [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<PrivateFormData>({
    resolver: zodResolver(privateSchema),
    mode: "onChange",
  });

  // Sync phone state with form
  useEffect(() => {
    setValue("phone", phone, { shouldValidate: true });
  }, [phone, setValue]);

  // Sync city state with form
  useEffect(() => {
    setValue("city", search, { shouldValidate: true });
  }, [search, setValue]);

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredCities.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      setSearch(filteredCities[highlightedIndex]);
      setValue("city", filteredCities[highlightedIndex], {
        shouldValidate: true,
      });
      setIsDropdownOpen(false);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const onSubmit = async (data: PrivateFormData) => {
    const userData = {
      email: data.email,
      role: "private",
      phone_number: data.phone,
      full_name: data.fullName,
      city: data.city,
    };

    console.log({ userData });

    try {
      const response = await axios.post(
        "https://api.swish.ma/accounts/api/v1/pre-subscription",
        userData
      );
      console.log({ response });

      toast.success("Profile Registered successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      reset();
      setPhone("");
      setSearch("");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.email[0] || "Something went wrong!",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
      }

      reset();
      setPhone("");
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-800"
        >
          Nom complet
        </label>
        <Input
          id="fullName"
          {...register("fullName")}
          placeholder="Nom complet"
        />
        {errors.fullName && (
          <span className="text-red-500">{errors.fullName.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800"
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
          className="block text-sm font-medium text-gray-800"
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
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Ville"
          className="h-12 pr-10 pl-4 shadow-md rounded-md"
          id="city"
        />
        {/* {errors.city && (
  <span className="text-red-500">{errors.city.message}</span>
)} */}
        {isDropdownOpen && filteredCities.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md z-50">
            <Command className="w-full">
              <CommandList className="max-h-[400px] overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={() => {
                      setSearch(city);
                      setValue("city", city, { shouldValidate: true });
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
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de téléphone
        </label>
        <PhoneInput
          country={"ma"}
          value={phone}
          onChange={(value) => setPhone(value)}
          placeholder="Numéro de téléphone"
          inputStyle={{ height: "48px", width: "100%", borderRadius: "8px" }}
        />
        {/* {errors.phone && (
  <span className="text-red-500">{errors.phone.message}</span>
)} */}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
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

// import { Command, CommandItem, CommandList } from "@/components/ui/command";

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
//   "Sale",
// ];

// const privateSchema = z.object({
//   fullName: z.string().min(1, "Ce champ est requis"),
//   email: z.string().email("Veuillez entrer une adresse e-mail valide"),
//   city: z.string().optional(),
//   phone: z.string().optional(),
// });

// type PrivateFormData = z.infer<typeof privateSchema>;

// export const PrivateForm = () => {
//  const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const filteredJobs = search
//     ? cities.filter((city) =>
//         city.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   // Handle keyboard events for input
//   const handleKeyDown: React.KeyboardEventHandler = (e) => {
//     if (e.key === "Escape") {
//       setIsDropdownOpen(false);
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PrivateFormData>({
//     resolver: zodResolver(privateSchema),
//   });
//   const [phone, setPhone] = useState(""); // Initialize the phone state

//   const onSubmit = async (data: PrivateFormData) => {
//     const userData = {
//       full_name: data.fullName,
//       email: data.email,
//       role: "private",
//       city: data.city,
//       telephone: data.phone,
//     };

//     try {
//       const response = await axios.post(
//         "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
//         userData
//       );
//       console.log({ response });
//       toast.success("Profile Registered successfully!", {
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
//           htmlFor="fullName"
//           className="block text-sm font-medium text-gray-800"
//         >
//           Nom complet
//         </label>
//         <Input
//           id="fullName"
//           {...register("fullName")}
//           placeholder="Nom complet"
//         />
//         {errors.fullName && (
//           <span className="text-red-500">{errors.fullName.message}</span>
//         )}
//       </div>

//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-800"
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

//       {/* <div className="relative w-full max-w-xl mx-auto">
//         <label
//           htmlFor="city"
//           className="block text-sm font-medium text-gray-800 mb-1"
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
//       </div> */}

//       <div className="relative w-full max-w-xl mx-auto">
//         <label
//           htmlFor="city"
//           className="block text-sm font-medium text-gray-800 mb-1"
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
//           onKeyDown={handleKeyDown} // Add keydown handler
//           onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
//           placeholder="Ville"
//           className="h-12 pr-10 pl-4 shadow-md rounded-md"
//           id="city"
//         />

//         {isDropdownOpen && filteredJobs.length > 0 && (
//           <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-md z-50">
//             <Command
//               className="w-full"
//               // Enable cmdk's built-in keyboard navigation
//               filter={(value, search) =>
//                 value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
//               }
//             >
//               <CommandList className="max-h-[400px] overflow-y-auto">
//                 {filteredJobs.map((city) => (
//                   <CommandItem
//                     key={city}
//                     value={city}
//                     onSelect={() => {
//                       setSearch(city);
//                       setSelected(city);
//                       setIsDropdownOpen(false);
//                     }}
//                   >
//                     {city}
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
//           className="block text-sm font-medium text-gray-700"
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
//       </div>

//       <Button
//         type="submit"
//         className="w-full h-12 text-sm font-medium bg-zinc-600 cursor-pointer"
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

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "./components/ui/input";
// import { Button } from "./components/ui/button";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// // import { useState } from "react";
// // import { useNavigate } from "react-router";

// const privateSchema = z.object({
//   fullName: z.string().min(1, "Ce champ est requis"),
//   email: z.string().email("Adresse e-mail invalide"),
//   city: z.string().optional(),
//   phone: z.string().optional(),
// });

// type PrivateFormData = z.infer<typeof privateSchema>;

// export const PrivateForm = () => {
//     // const [isRegistered, setIsRegistered] = useState(false);

//   // const navigator = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PrivateFormData>({
//     resolver: zodResolver(privateSchema),
//   });

//   const onSubmit = async (data: PrivateFormData) => {
//     console.log("Private Form Data:", data);

//     const userData = {
//       full_name: data.fullName,
//       email: data.email,
//       role: "private",
//       city: data.city,
//       telephone: data.phone,
//     };
//     console.log({ userData });

//     try {
//       const response = await axios.post(
//         "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
//         userData
//       );
//       console.log("Server response:", response.data);
//       toast.success("Profile Registered successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       //   navigator("/SkeletonDemo");
//     } catch (error) {
//       console.error("Error during form submission:", error);
//       toast.error("Something went wrong!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label
//           htmlFor="fullName"
//           className="block text-sm font-medium text-gray-800"
//         >
//           Nom complet
//         </label>
//         <Input
//           id="fullName"
//           {...register("fullName")}
//           placeholder="Nom complet"
//         />
//         {errors.fullName && (
//           <span className="text-red-500">{errors.fullName.message}</span>
//         )}
//       </div>

//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-800"
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

//       <div>
//         <label
//           htmlFor="city"
//           className="block text-sm font-medium text-gray-800"
//         >
//           Ville
//         </label>
//         <Input id="city" {...register("city")} placeholder="Ville" />
//       </div>

//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Numéro de téléphone
//         </label>
//         <Input
//           id="phone"
//           type="tel"
//           {...register("phone")}
//           placeholder="Numéro de téléphone"
//         />
//       </div>

//       <Button
//         type="submit"
//         className="w-full h-12 text-sm font-medium bg-zinc-600 cursor-pointer "
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
