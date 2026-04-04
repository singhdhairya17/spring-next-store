"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBasket, User } from "lucide-react";
import { StoreLogo, SearchIcon } from "./NavIcons";
import {
  navContainerVariants,
  navItemVariants,
  searchVariants,
} from "./nav-variants";
import { STORE_NAME } from "@/lib/brand";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutUser, itemsCount } = useAuth();

  const routes = [
    { path: "/allproducts", label: "All Products" },
    { path: "/categories", label: "Categories" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
      className="w-full"
    >
      <Navbar
        maxWidth="full"
        classNames={{
          base: "bg-surface/80 backdrop-saturate-150 backdrop-blur-xl border-b border-line shadow-nav",
          wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16",
        }}
      >
        <NavbarContent justify="start" className="gap-4">
          <motion.div variants={navItemVariants}>
            <NavbarBrand className="mr-2 gap-2.5 sm:mr-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer text-brand"
                onClick={() => router.push("/")}
              >
                <StoreLogo />
              </motion.div>
              <motion.span
                className="hidden font-semibold tracking-tight text-ink sm:inline text-[15px]"
                whileHover={{ opacity: 0.85 }}
                onClick={() => router.push("/")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push("/");
                  }
                }}
              >
                {STORE_NAME}
              </motion.span>
            </NavbarBrand>
          </motion.div>

          <NavbarContent className="hidden sm:flex gap-0.5">
            {routes.map((route) => (
              <motion.div key={route.path} variants={navItemVariants}>
                <NavbarItem>
                  <motion.div whileHover={{ y: -1 }} className="relative">
                    <Link
                      className="px-3 py-2 text-[14px] font-medium text-ink-secondary data-[hover=true]:text-ink"
                      href="#"
                      onPress={() => router.push(route.path)}
                    >
                      {route.label}
                      {pathname === route.path ? (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-brand"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                        />
                      ) : null}
                    </Link>
                  </motion.div>
                </NavbarItem>
              </motion.div>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2 sm:gap-3">
          <motion.div variants={navItemVariants} className="hidden md:block">
            <motion.div
              variants={searchVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[220px] lg:max-w-[260px]",
                  inputWrapper:
                    "h-10 bg-surface-muted/80 border border-line shadow-elevate-sm hover:border-line-strong transition-colors duration-200",
                  input: "text-sm text-ink placeholder:text-ink-muted",
                }}
                placeholder="Search…"
                startContent={
                  <SearchIcon className="text-ink-muted shrink-0" />
                }
                endContent={
                  <span className="hidden text-[10px] font-medium uppercase tracking-wide text-ink-muted sm:inline">
                    Soon
                  </span>
                }
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={navItemVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative cursor-pointer rounded-xl p-2 text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink"
            onClick={() => router.push("/cart")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push("/cart");
              }
            }}
            aria-label="Shopping cart"
          >
            <ShoppingBasket className="h-[22px] w-[22px]" strokeWidth={1.75} />
            {itemsCount > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white shadow-elevate-sm"
              >
                {itemsCount > 99 ? "99+" : itemsCount}
              </motion.span>
            ) : null}
          </motion.div>

          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key="user-menu"
                variants={navItemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <User
                      size={22}
                      strokeWidth={1.75}
                      className="cursor-pointer text-ink-secondary transition-colors hover:text-brand"
                      aria-label="Account menu"
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Profile actions"
                    variant="flat"
                    className="border border-line bg-surface/95 backdrop-blur-xl"
                  >
                    <DropdownItem
                      key="profile"
                      className="h-auto min-h-14 gap-1 py-3 bg-brand-subtle/50"
                      textValue={user.email}
                    >
                      <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                        Signed in
                      </p>
                      <p className="truncate font-medium text-ink max-w-[240px]">
                        {user.email}
                      </p>
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-red-600 data-[hover=true]:bg-red-50"
                      onPress={() => logoutUser?.()}
                    >
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </motion.div>
            ) : (
              <motion.div
                key="auth-links"
                variants={navItemVariants}
                className="flex items-center gap-0.5 sm:gap-1"
              >
                {[
                  { path: "/login", label: "Log in" },
                  { path: "/register", label: "Register" },
                ].map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      className="relative px-3 py-2 text-[14px] font-medium text-ink-secondary data-[hover=true]:text-ink"
                      href="#"
                      onPress={() => router.push(item.path)}
                    >
                      {item.label}
                      {pathname === item.path ? (
                        <motion.div
                          layoutId="auth-underline"
                          className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-brand"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 34,
                          }}
                        />
                      ) : null}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarContent>
      </Navbar>
    </motion.div>
  );
}
