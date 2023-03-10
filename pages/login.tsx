import Head from "next/head";
import Image from "next/image";
import logo from "../public/transparent_logo.png";
import axios from 'axios';
import $ from 'jquery';
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/router";


export default function Login() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    $(".alert").addClass("hidden");
    const payload = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    axios
      .post("/api/login", payload)
      .then((response) => {
        const { token } = response.data;
        console.log(token);
        router.push("/chat");
      })
      .catch((error) => {
        const { message } = error.response.data;
        console.log(message);
        if (message == "Invalid email or password") {
          $(".alert").removeClass("hidden");
        }
      });
  }
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Make it all login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/transparent_logo.png" />
      </Head>

      <main className="flex justify-center">
        <div className="h-screen container flex justify-center items-center">
          <div className="border rounded p-8 mx-4 w-full sm:w-3/4 md:w-1/2 ">
            <div className="alert alert-error mb-8 hidden">
              <div>
                <AlertCircle />
                <span>Incorrect Username or Password</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-3xl">Login</h1>
                <Image
                  className="w-14"
                  src={logo}
                  alt="logo"
                  width={268}
                  height={260}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="input input-bordered w-full"
                  id="email"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input input-bordered w-full"
                  id="password"
                />
              </div>
              <button className="btn btn-primary w-full mt-6" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}