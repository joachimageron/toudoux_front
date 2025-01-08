"use client";

import React from "react";
import {Button, Input, Link, Form, Checkbox} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import toast from 'react-hot-toast';


export default function Page() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      const data = await signIn(email as string, password as string);
      toast.success("Login successful");
      
      console.log("Login successful:", data);
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
    
    return response.json();
  }
  
  
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in to your account</h1>
          <p className="text-small text-default-500">to continue to BypolarMedia</p>
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
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button isLoading={loading} className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <p className="text-center text-small">
          Need to create an account ?&nbsp;
          <Link href="/auth/register" size="sm">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
