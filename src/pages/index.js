import InputField from "@/components/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import useGlobalStore from "@/store/useGlobalStore";
import { getAllProducts } from "../../components/npl/pages/product/service";
import { userLogin } from "@/services/apiservices";

export default function SocialFeed() {

  const setToken = useGlobalStore(state => state.setToken)
  const setUserProfile = useGlobalStore(state => state.setUserProfile)
  const route = useRouter()
  const methods = useForm({
    mode: 'onChange'
  })
  const { handleSubmit, setError } = methods
  useEffect(() => {
    const fetchProduction = async () => {
      const res = await getAllProducts.getAll();
    }
    fetchProduction();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await userLogin.post(data);
      setUserProfile(res)
      const accessToken = res.accessToken;
      sessionStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      const expireAt = Date.now() + 2 * 60 * 1000; 
      sessionStorage.setItem('tokenExpireAt', expireAt);
      if (accessToken) {
        route.push('/landing_page');
      }
    } catch (error) {
      const message = error.response?.data?.message
      setError("root.serverError", {
        type: "manual",
        message: message,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto mt-10">
              <InputField
                name="username"
                label="Username"
                placeholder="Enter your username"
                rules={{ required: "Username is required" }}
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                rules={{ required: "Password is required", minLength: { value: 6, message: "Password too short" } }}
              />
              {methods.formState.errors.root?.serverError && (
                <p className="text-red-600 text-center mb-3">
                  {methods.formState.errors.root.serverError.message}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Login
              </button>

            </form>
          </FormProvider>
        </div>
      </div>

    </>
  );
}