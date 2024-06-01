"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/Button";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        "https://api.antrein.com/bc/dashboard/auth/login",
        formData
      );
      if (res.status === 200) {
        const data = res.data.data;
        if (data) {
          const { token, tenant } = data;
          Cookies.set("auth", JSON.stringify({ token, tenant }));
          router.push("/");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError((err as any)?.response?.data?.error || err.message);
        toast.error((err as any)?.response?.data?.error || err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <span>{error}</span>
          </div>
          <button className="btn btn-sm btn-ghost" onClick={() => setError("")}>
            ✕
          </button>
        </div>
      )}
      <form onSubmit={login} className="mt-4">
        <div className="flex flex-col mb-4">
          <label
            htmlFor="login"
            className="input input-bordered flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              required
              disabled={submitting}
              placeholder="Email"
              aria-label="Email"
              value={formData.email}
              onChange={handleChange}
              id="login"
            />
          </label>
        </div>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="password"
            className="input input-bordered flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="password"
              name="password"
              required
              disabled={submitting}
              placeholder="Password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="w-full mb-4">
          <Button
            type="submit"
            title="Sign In"
            disabled={submitting}
            variant="btn_orange"
            full
          />
        </div>

        <div className="w-full">
          <Link href="/register">
            <Button
              type="button"
              title="Register"
              variant="btn_dark_green"
              full
            />
          </Link>
        </div>
      </form>
      <Toaster />
    </>
  );
}
