import React from "react";
import { useForm } from "react-hook-form";

const EditProfile = ({ onSubmit, profileData, handleCancelEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: profileData,
  });

  // Set default values if profileData changes
  React.useEffect(() => {
    if (profileData) {
      setValue("username", profileData.username);
      setValue("email", profileData.email);
      setValue("first_name", profileData.first_name);
      setValue("last_name", profileData.last_name);
    }
  }, [profileData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username">
          <p className="text-gray-700 text-start">Username</p>
        </label>
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="p-2 border tracking-widest border-gray-300 text-blue-800 font-montserrat rounded w-full"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div>
      <label htmlFor="email">
          <p className="text-gray-700 text-start">Email</p>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid",
            },
          })}
          placeholder="Email"
          className="p-2 border tracking-widest border-gray-300 text-blue-800 font-montserrat rounded w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
      <label htmlFor="first_name">
          <p className="text-gray-700 text-start">First Name</p>
        </label>
        <input
          {...register("first_name", { required: "First name is required" })}
          placeholder="First Name"
          className="p-2 border tracking-widest border-gray-300 text-blue-800 font-montserrat rounded w-full"
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm">{errors.first_name.message}</p>
        )}
      </div>
      <div>
      <label htmlFor="last_name">
          <p className="text-gray-700 text-start">Last Name</p>
        </label>
        <input
          {...register("last_name", { required: "Last name is required" })}
          placeholder="Last Name"
          className="p-2 border tracking-widest border-gray-300 text-blue-800 font-montserrat rounded w-full"
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm">{errors.last_name.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancelEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
