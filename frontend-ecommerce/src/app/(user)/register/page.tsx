"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const inputClassNames = {
  input: "text-ink",
  inputWrapper:
    "w-full border-line bg-surface shadow-elevate-sm hover:border-line-strong data-[hover=true]:bg-surface transition-colors",
  label: "text-ink-secondary font-medium text-sm",
};

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <ul className="mt-2 list-inside list-disc text-sm text-red-600">
      {messages.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}

export default function RegisterForm() {
  const { signup } = useAuth();
  const [error] = useState<string | null>(null);
  const [state, action, pending] = React.useActionState<{
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
      address?: string[];
      city?: string[];
      phone?: string[];
    };
  }>(signup, undefined);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ParticlesBackground />
      <motion.div
        className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full max-w-xl rounded-3xl border border-line bg-surface/90 p-8 shadow-elevate-lg backdrop-blur-xl sm:p-10"
          variants={itemVariants}
        >
          <div className="mb-10 space-y-2 text-center">
            <h1 className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl">
              Create account
            </h1>
            <p className="text-sm text-ink-secondary">
              Shipping details help us fulfill your first order faster.
            </p>
          </div>

          <Form
            validationBehavior="native"
            action={action}
            className="space-y-5"
          >
            <motion.div variants={itemVariants}>
              <Input
                isRequired
                label="Full name"
                labelPlacement="outside"
                type="text"
                name="name"
                id="name"
                placeholder="Jane Doe"
                variant="bordered"
                radius="lg"
                classNames={inputClassNames}
              />
              <FieldError messages={state?.errors?.name} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                isRequired
                label="Email"
                labelPlacement="outside"
                type="email"
                name="email"
                id="email"
                placeholder="you@company.com"
                variant="bordered"
                radius="lg"
                classNames={inputClassNames}
              />
              <FieldError messages={state?.errors?.email} />
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Input
                  isRequired
                  label="Password"
                  labelPlacement="outside"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  minLength={4}
                  variant="bordered"
                  radius="lg"
                  classNames={inputClassNames}
                />
                <FieldError messages={state?.errors?.password} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  isRequired
                  label="Confirm password"
                  labelPlacement="outside"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  minLength={4}
                  variant="bordered"
                  radius="lg"
                  classNames={inputClassNames}
                />
                <FieldError messages={state?.errors?.confirmPassword} />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <Input
                isRequired
                label="Address"
                labelPlacement="outside"
                type="text"
                name="address"
                id="address"
                placeholder="Street and number"
                variant="bordered"
                radius="lg"
                classNames={inputClassNames}
              />
              <FieldError messages={state?.errors?.address} />
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div variants={itemVariants}>
                <Input
                  isRequired
                  label="City"
                  labelPlacement="outside"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  variant="bordered"
                  radius="lg"
                  classNames={inputClassNames}
                />
                <FieldError messages={state?.errors?.city} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  isRequired
                  label="Phone"
                  labelPlacement="outside"
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  variant="bordered"
                  radius="lg"
                  pattern="[+]{0,1}[0-9\s-]+"
                  inputMode="tel"
                  classNames={inputClassNames}
                />
                <FieldError messages={state?.errors?.phone} />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                disabled={pending}
                type="submit"
                className="w-full rounded-xl bg-ink py-3.5 text-[15px] font-semibold text-white shadow-elevate-sm transition-opacity hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ scale: pending ? 1 : 1.01 }}
                whileTap={{ scale: pending ? 1 : 0.99 }}
              >
                {pending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account…
                  </span>
                ) : (
                  "Create account"
                )}
              </motion.button>
            </motion.div>

            <p className="text-center text-sm text-ink-secondary">
              Already registered?{" "}
              <Link
                href="/login"
                className="font-semibold text-brand hover:text-brand-hover"
              >
                Sign in
              </Link>
            </p>
          </Form>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
}
