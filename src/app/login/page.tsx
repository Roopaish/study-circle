"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import pb from "@/utils/pb";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      await pb
        .collection("users")
        .authWithPassword(
          e.target["usernameOrEmail"].value,
          e.target["password"].value
        );

      toast("Logged in successfully", { type: "success" });
      router.push("/");
      router.refresh();
    } catch (e) {
      toast("Invalid username or password", { type: "error" });
    }
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="">
              Sign in to Study<span className="text-orange-500 ">O</span>
            </h2>
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                title=""
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
              >
                Create a free account
              </Link>
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <InputField
                label="Username or Email"
                type="text"
                name="usernameOrEmail"
                required
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                required
              />
              <Button type="submit">Login</Button>
              {/* <Link href="/forgot-password" title="">
                {" "}
                Forgot password?{" "}
              </Link> */}
            </form>

            {/* <div className="mt-3 space-y-3">
              <SocialButton
                icon={
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                }
              >
                Sign in with Google
              </SocialButton>

              <SocialButton
                icon={
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                }
              >
                Sign in with Facebook
              </SocialButton>
            </div> */}
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-50 px-4 py-10 sm:py-16 sm:px-6 lg:py-24 lg:px-8">
          <div>
            <Image
              className="mx-auto w-full max-w-sm"
              src="/images/books.png"
              alt="books"
              width={300}
              height={300}
              quality={100}
            />
            <div className="mx-auto w-full max-w-md xl:max-w-xl">
              <h3 className="text-center text-2xl font-bold text-black">
                Learn together, grow together
              </h3>
              <p className="mt-2.5 text-center leading-relaxed text-gray-500">
                StudyO is a community of students who are passionate about
                learning and sharing knowledge. Join us and learn together.
              </p>

              <div className="mt-10 flex items-center justify-center space-x-3">
                <div className="h-1.5 w-20 rounded-full bg-orange-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
