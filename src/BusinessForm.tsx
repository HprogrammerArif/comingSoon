import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const businessSchema = z.object({
  companyName: z.string().min(1, "Ce champ est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  city: z.string().optional(),
  phone: z.string().optional(),
  iceNumber: z.string().optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export const BusinessForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit = async (data: BusinessFormData) => {
    console.log("Business Form Data:", data);

    const userData = {
      email: data.email,
      role: "company",
      company_name: data.companyName,
      telephone: data.phone,
      ice_number: data.iceNumber,
    };
    console.log({ userData });

    try {
      const response = await axios.post(
        "http://10.10.13.59:8001/accounts/api/v1/pre-subscription",
        userData
      );

      console.log("Server response:", response.data);
      toast.success("Business Profile Registered successfully!", {
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
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          Nom de l'entreprise
        </label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="Nom de l'entreprise"
        />
        {errors.companyName && (
          <span className="text-red-500">{errors.companyName.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200 mb-1"
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
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          Ville
        </label>
        <Input id="city" {...register("city")} placeholder="Ville" />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-200 mb-1"
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

      <div>
        <label
          htmlFor="iceNumber"
          className="block text-sm font-medium text-gray-200 mb-1"
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
        className="w-full h-12 text-sm font-medium cursor-pointer"
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
