import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { useState } from "react";
// import { useNavigate } from "react-router";

const privateSchema = z.object({
  fullName: z.string().min(1, "Ce champ est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  city: z.string().optional(),
  phone: z.string().optional(),
});

type PrivateFormData = z.infer<typeof privateSchema>;

export const PrivateForm = () => {
    // const [isRegistered, setIsRegistered] = useState(false);

  // const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrivateFormData>({
    resolver: zodResolver(privateSchema),
  });

  const onSubmit = async (data: PrivateFormData) => {
    console.log("Private Form Data:", data);

    const userData = {
      full_name: data.fullName,
      email: data.email,
      role: "private",
      city: data.city,
      telephone: data.phone,
    };
    console.log({ userData });

    try {
      const response = await axios.post(
        "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
        userData
      );
      console.log("Server response:", response.data);
      toast.success("Profile Registered successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      //   navigator("/SkeletonDemo");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-800"
        >
          Ville
        </label>
        <Input id="city" {...register("city")} placeholder="Ville" />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de téléphone
        </label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="Numéro de téléphone"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-sm font-medium bg-zinc-600 cursor-pointer "
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
