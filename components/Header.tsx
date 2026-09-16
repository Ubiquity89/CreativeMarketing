"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
};

export default function Header() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Check Payload session
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        console.log("PAYLOAD CURRENT USER:", data);

        if (!mounted) return;

        if (response.ok && data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check failed:", error);

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setCheckingUser(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  // Close mobile menu
  const closeMobile = () => {
    setMobileOpen(false);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
    setMobileOpen(false);

    router.refresh();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div
        className="max-w-[1400px] w-full flex items-center justify-between"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-[15px] font-medium tracking-tight"
        >
          Creative Marketing Agency
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#solutions"
            className="text-white/90 text-[14px] hover:text-white transition-colors"
          >
            Solutions
          </a>

          <a
            href="#features"
            className="text-white/90 text-[14px] hover:text-white transition-colors"
          >
            Features
          </a>

          <a
            href="#ai-power"
            className="text-white/90 text-[14px] hover:text-white transition-colors"
          >
            AI Power
          </a>

          <a
            href="#pricing"
            className="text-white/90 text-[14px] hover:text-white transition-colors"
          >
            Pricing
          </a>

          {/* Insights */}
          <Link
            href="/blog"
            className="text-white/90 text-[14px] hover:text-white transition-colors"
          >
            Insights
          </Link>

          {/* Authentication */}
          {checkingUser ? (
            <span className="text-white/30 text-[14px]">
              ...
            </span>
          ) : user ? (
            <>
              {/* Admin */}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-white/90 text-[14px] hover:text-white transition-colors"
                >
                  Admin
                </Link>
              )}

              {/* User */}
              <span className="text-white/60 text-[14px] max-w-[150px] truncate">
                {user.name || user.email}
              </span>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="text-white/90 text-[14px] hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="text-white/90 text-[14px] hover:text-white transition-colors"
              >
                Login
              </Link>

              {/* Get Started */}
              <Link
                href="/register"
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-neutral-200 transition-colors"
              >
                Get Started

                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                  ›
                </span>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-5">
          <a
            href="#solutions"
            className="text-white text-[16px]"
            onClick={closeMobile}
          >
            Solutions
          </a>

          <a
            href="#features"
            className="text-white text-[16px]"
            onClick={closeMobile}
          >
            Features
          </a>

          <a
            href="#ai-power"
            className="text-white text-[16px]"
            onClick={closeMobile}
          >
            AI Power
          </a>

          <a
            href="#pricing"
            className="text-white text-[16px]"
            onClick={closeMobile}
          >
            Pricing
          </a>

          <Link
            href="/blog"
            className="text-white text-[16px]"
            onClick={closeMobile}
          >
            Insights
          </Link>

          {/* Mobile Authentication */}
          {checkingUser ? (
            <span className="text-white/30 text-[16px]">
              ...
            </span>
          ) : user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-white text-[16px]"
                  onClick={closeMobile}
                >
                  Admin
                </Link>
              )}

              <div className="text-white/50 text-sm">
                {user.name || user.email}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="text-white text-[16px] text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white text-[16px]"
                onClick={closeMobile}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[14px] font-medium w-fit"
                onClick={closeMobile}
              >
                Get Started
                <span>›</span>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}