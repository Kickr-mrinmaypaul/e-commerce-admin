// 'use client';

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import ProductServices from "@/services/ProductServices";

// export default function AddBanner() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async(data) => {
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("bannerImage", data.image[0]);

//     try {
//         setLoading(true);
//         const respnse = await ProductServices.addBanner(formData);
//         console.log("Banner added resp:", respnse);
//     } catch (error) {
//         console.error(error);
//     }finally{
//         setLoading(false);
//     }
//     console.log("Submitted Banner:");
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     setPreview(null);
//     reset();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 border rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Add Banner</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//         {/* Banner Image Upload */}
//         <div>
//           <label className="block mb-2 font-medium">
//             Banner Image
//           </label>

//           <div className="w-full h-52 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 relative">
//             {preview ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-gray-400">
//                 Click to upload banner image
//               </span>
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               {...register("image", {
//                 required: "Banner image is required",
//                 onChange: handleImageChange,
//               })}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>

//           {errors.image && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.image.message}
//             </p>
//           )}
//         </div>

//         {/* Title */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Title
//           </label>
//           <input
//             type="text"
//             placeholder="Enter title"
//             {...register("title", { required: "Title is required" })}
//             className="w-full border rounded p-2"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">
//               {errors.title.message}
//             </p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1 font-medium">
//             Description
//           </label>
//           <textarea
//             rows={3}
//             placeholder="Enter description"
//             {...register("description", {
//               required: "Description is required",
//             })}
//             className="w-full border rounded p-2"
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
//         >
//           Add Banner
//         </button>

//       </form>
//     </div>
//   );
// }


'use client';

import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProductServices from "@/services/ProductServices";
import { toast } from 'sonner';

type FormValues = {
  title: string;
  description: string;
  image: FileList;
};

export default function AddBanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("bannerImage", data.image[0]);

    try {
      setLoading(true);

      const response = await ProductServices.addBanner(formData);
      console.log("Banner added resp:", response);

      toast.success("Banner added successfully 🎉");

      setPreview(null);
      reset();

    } catch (error) {
      console.error(error);
      toast.error("Failed to add banner");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add Banner</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Banner Image Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Banner Image
          </label>

          <div className="w-full h-52 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 relative">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">
                Click to upload banner image
              </span>
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Banner image is required",
                onChange: handleImageChange,
              })}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded p-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Banner"}
        </button>

      </form>
    </div>
  );
}
