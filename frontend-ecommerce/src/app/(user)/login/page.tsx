"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import { ArrowRight } from "lucide-react";
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
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const inputClassNames = {
  input: "text-ink",
  inputWrapper:
    "border-line bg-surface shadow-elevate-sm hover:border-line-strong data-[hover=true]:bg-surface transition-colors",
  label: "text-ink-secondary font-medium text-sm",
};

export default function LoginForm() {
  const { signin } = useAuth();
  const [state, action, pending] = React.useActionState<{
    errors?: { email?: string; password?: string[] };
  }>(signin, undefined);
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
          className="w-full max-w-[420px] rounded-3xl border border-line bg-surface/90 p-8 shadow-elevate-lg backdrop-blur-xl sm:p-10"
          variants={itemVariants}
        >
          <div className="mb-10 space-y-2 text-center">
            <motion.h1
              className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl"
              variants={itemVariants}
            >
              Welcome back
            </motion.h1>
            <motion.p
              className="text-sm text-ink-secondary"
              variants={itemVariants}
            >
              Sign in to continue checkout and order history.
            </motion.p>
          </div>

          <Form
            validationBehavior="native"
            action={action}
            className="space-y-5"
          >
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
              {state?.errors?.email ? (
                <p className="mt-2 text-sm text-red-600">
                  {state.errors.email}
                </p>
              ) : null}
            </motion.div>

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
              {state?.errors?.password ? (
                <div className="mt-2 text-sm text-red-600">
                  <p>Password requirements:</p>
                  <ul className="mt-1 list-inside list-disc">
                    {state.errors.password.map((msg) => (
                      <li key={msg}>{msg}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
              <Link
                href="#"
                className="text-sm font-medium text-brand hover:text-brand-hover"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                disabled={pending}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-[15px] font-semibold text-white shadow-elevate-sm transition-opacity hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ scale: pending ? 1 : 1.01 }}
                whileTap={{ scale: pending ? 1 : 0.99 }}
              >
                {pending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in…
                  </span>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} strokeWidth={2} aria-hidden />
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="pt-2 text-center text-sm text-ink-secondary"
            >
              No account?{" "}
              <Link
                href="/register"
                className="font-semibold text-brand hover:text-brand-hover"
              >
                Create one
              </Link>
            </motion.p>
          </Form>
        </motion.div>
      </motion.div>
    </>
  );
}
