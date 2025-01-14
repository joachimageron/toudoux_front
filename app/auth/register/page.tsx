"use client";

import React from "react";
import {Button, Input, Link, Form, Checkbox} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const errorPassword: string[] = [];
  let errorConfirmPassword: string | null = null;
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      const data = await register(email as string, password as string);
      toast.success("Registration successful");
      
      console.log("Registration successful:", data);
      toast.promise(signIn(email as string, password as string), {
        loading: "Logging in...",
        success: "Login successful",
        error: "Login failed",
      })
      
      // Automatically switch to login form
    } catch (err) {
      toast.error(err.toString());
    }
    
    setLoading(false);
  };
  
  const signIn = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
    
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();
    window.sessionStorage.setItem("token", data.token);
    router.refresh();
    return data;
  }
  
  const register = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
      },
      body: JSON.stringify({
        email: email,
        plainPassword: password,
      }),
    });
    
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    
    return response.json();
    
  }

const errorMessages = () => {
  return (
    <ul>
      {errorPassword.map((error, i) => (
        <li key={i + "dd"}>{error}</li>
      ))}
    </ul>
  )
}

if (password.length > 0) {
  if (password.length < 4) {
    errorPassword.push("Password must be 4 characters or more.");
  }
  // if ((password.match(/[A-Z]/g) || []).length < 1) {
  //   errorPassword.push("Password must include at least 1 upper case letter");
  // }
  if ((password.match(/[^a-z0-9]/gi) || []).length < 1) {
    errorPassword.push("Password must include at least 1 symbol.");
  }
  if (password !== confirmPassword) {
    errorConfirmPassword = "Passwords do not match.";
  }
}

return (
  <div className="flex h-[90vh] w-full items-center justify-center">
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
      <div className="flex flex-col gap-1">
        <h1 className="text-large font-medium">Create an account</h1>
        <p className="text-small text-default-500">to continue to Toudoux</p>
      </div>
      
      <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
        
        <Input
          isRequired
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
        />
        <Input
          value={password}
          onValueChange={setPassword}
          isRequired
          endContent={
            <button type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Icon
                  className="pointer-events-none text-xl text-default-400"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="pointer-events-none text-xl text-default-400"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          isInvalid={errorPassword.length > 0}
          errorMessage={() => errorMessages()}
        />
        <Input
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          isRequired
          endContent={
            <button type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Icon
                  className="pointer-events-none text-xl text-default-400"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="pointer-events-none text-xl text-default-400"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          isInvalid={!!errorConfirmPassword}
          errorMessage={errorConfirmPassword}
        />
        <div className="flex w-full items-center justify-between px-1 py-2">
          <Checkbox name="remember" size="sm">
            Remember me
          </Checkbox>
        </div>
        <Button isLoading={loading} className="w-full" color="primary" type="submit">
          Register
        </Button>
      </Form>
      <p className="text-center text-small">
        Already an account ?&nbsp;
        <Link href="/auth/signin" size="sm">
          Sign In
        </Link>
      </p>
    </div>
  </div>
);
}
