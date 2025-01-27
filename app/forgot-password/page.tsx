'use client'
// app/forgot-password/page.tsx
import { useState } from 'react';
import { Button, Input, Link, Form } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Unable to send reset email');
      }

      toast.success("Sending mail successful");
    } catch (err) {
      toast.error("Failed sending mail...");
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
      <div className="flex flex-col gap-1">
        <h1 className="text-large font-medium">Forgot your password ?</h1>
        <p className="text-small text-default-500">Change it to continue Toudoux</p>
      </div>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-3" validationBehavior="native" >
        <Input
          isRequired
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="w-full" color="primary" type="submit">
          {isLoading ? 'Sending...' : 'Send Reset Email'}
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

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  field: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  message: {
    color: 'green',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
};
