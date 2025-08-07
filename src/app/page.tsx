import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/60 flex items-center justify-center">
      {/* Background pattern - slightly more visible */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-80" />

      <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-12 text-center">
        {/* Hero content */}
        <header className="space-y-8">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            AI Assistant
          </h1>
          <div className="max-w-[650px] space-y-4">
            <p className="text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed leading-relaxed">
              Your smart AI assistant that can summarize YouTube videos,
              interact with external APIs via tools, and search Google Books{" "}
              <span className="text-gray-800 font-medium">
                all inside chat.
              </span>
            </p>
          </div>
        </header>

        {/* CTA Button */}
        <SignedIn>
          <Link href="/dashboard">
            <button className="group relative inline-flex items-center justify-center px-10 py-4 text-lg cursor-pointer font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Get Started
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl={"/dashboard"}
            forceRedirectUrl={"/dashboard"}
          >
            <button className="group relative inline-flex items-center justify-center px-10 py-4 cursor-pointer text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Sign Up
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </SignInButton>
        </SignedOut>

        {/* Features grid - enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 py-8 max-w-4xl mx-auto">
          {[
            {
              title: "YouTube Summarizer",
              description: "Drop a link, get a summary.",
            },
            {
              title: "Web Tool Agent",
              description: "Interacts with APIs & JSON data.",
            },
            {
              title: "Book Finder",
              description: "Powered by Google Books API.",
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="text-center group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-gray-700 mb-3">
                {title}
              </div>
              <div className="text-gray-600 leading-relaxed">{description}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
