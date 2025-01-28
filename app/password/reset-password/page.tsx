"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Button, Input, Link, Form, Checkbox } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | unknown>(null);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true); // état pour gérer la validité du token

  const errorPassword: string[] = [];
  const urlParams = new URLSearchParams(window.location.search);
  const token: string | null  = urlParams.get('token');
  let errorConfirmPassword: string | null = null;

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    setLoading(true); // Mettre à jour l'état de chargement
    setError(null);
    setMessage(null);
    setIsTokenValid(true); // On réinitialise la validité du token
    
    try {
      const response = await fetch(`http://localhost:8000/reset-password?token=${token}`);

      if (response.status === 404) {
        setMessage('Le token is invalid.');
        setIsTokenValid(false);  // Token invalide
      } else if (response.status === 400) {
        setMessage('Le token is expired.');
        setIsTokenValid(false);  // Token expiré
      } else {
        const data = await response.json();
        setUserId(data.userId);
        setMessage(data); // Afficher le message du serveur si succès
        setIsTokenValid(true);  // Token valide
      }
    } catch (error) {
      setMessage('An error occured.');
      setIsTokenValid(false);  // En cas d’erreur réseau
    } finally {
      setLoading(false); // Lorsque le chargement est terminé, mettre à jour l'état de loading
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Logique de soumission pour la mise à jour du mot de passe
    } catch (err) {
      toast.error(String(err));
    }

    setLoading(false);
  };

  const changePassword = async (userId: string, token: string | null, password: string) => {
    try {
      // Ensure token is not null before sending the request
  
      const response = await fetch(`http://localhost:8000/change-password?userId=${userId}&token=${token}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),  // Passing password to the backend
      });
  
      if (response.status === 404) {
        toast.error('Token is invalid.');
      } else if (response.status === 400) {
        toast.error('Token is expired.');
      } else {
        toast.success('Changing password successful');
      }
      
    } catch (error) {
      toast.error(`Error changing password`);
      // You can show the error to the user here (e.g., in an alert or UI component)
      //alert(error.message || 'Something went wrong!');
    }
  };

  const errorMessages = () => {
    return (
      <ul>
        {errorPassword.map((error, i) => (
          <li key={i + "dd"}>{error}</li>
        ))}
      </ul>
    );
  };

  if (password.length > 0) {
    if (password.length < 4) {
      errorPassword.push("Password must be 4 characters or more.");
    }
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
          <h1 className="text-large font-medium">Change password</h1>
          <p className="text-small text-default-500">to continue Toudoux</p>
        </div>

        {isTokenValid ? (
          <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
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
            <Button onClick={() => changePassword(userId, token, password)} isLoading={loading} className="w-full" color="primary" type="submit">
              Change password
            </Button>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center">
            { message ? <p className="text-red-500">{message}</p> : <></>}
            <Button
              onClick={() => router.push("/password/forgot-password")}
              className="mt-4"
              color="primary"
            >
              Renvoyer un mail
            </Button>
          </div>
        )}

        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/auth/signin" size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
