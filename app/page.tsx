"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartTrading = () => {
    router.push("/auth/signin");
  };

  const handleTryDemo = () => {
    router.push("/demo");
  };

  const handleExploreAssets = () => {
    router.push("/markets");
  };

  const handleOpenAccount = () => {
    router.push("/auth/signup");
  };

  const handleContactUs = () => {
    router.push("/contact-us");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-emerald-400 transition duration-300">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-lg">Bitpanda Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/markets" className="text-gray-300 hover:text-emerald-400 transition duration-300 font-medium">Markets</Link>
            <Link href="/support" className="text-gray-300 hover:text-emerald-400 transition duration-300 font-medium">Support</Link>
            <Link href="/contact-us" className="text-gray-300 hover:text-emerald-400 transition duration-300 font-medium">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button onClick={handleStartTrading} className="hidden sm:block bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition duration-300 font-medium border border-slate-600 hover:border-emerald-500">
              Sign In
            </Button>
            <Button onClick={handleOpenAccount} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg transition duration-300 font-medium shadow-lg hover:shadow-emerald-500/50">
              Open Account
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition duration-1000 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="space-y-6">
                <div className="inline-block bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 py-2">
                  <span className="text-emerald-400 text-sm font-semibold">🚀 Join 5M+ Traders Worldwide</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400">
                  Where Fearless Ambition Meets Smart Trading
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Trade Forex, Metals, Indices &amp; more with Bitpanda Pro — trusted by millions of traders worldwide.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleStartTrading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 text-lg rounded-lg transition duration-300 font-semibold shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1">
                  Start Trading
                </Button>
                <Button onClick={handleTryDemo} className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg rounded-lg bg-transparent transition duration-300 font-semibold">
                  Try Free Demo →
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Spreads from 0.0 pips</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">60-second deposits</span>
                </div>
              </div>
            </div>

            {/* Right Image - Enhanced */}
            <div className={`hidden lg:flex justify-center transition duration-1000 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-2xl blur-2xl"></div>
                <div className="relative h-96 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-blue-500/20 rounded-2xl border border-emerald-500/30 p-8 flex flex-col items-center justify-center backdrop-blur-sm hover:border-emerald-500/60 transition duration-500">
                  <div className="mb-6">
                    <svg className="w-24 h-24 text-emerald-400 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-300 font-semibold">Trading Platform Preview</p>
                  <p className="text-sm text-gray-400 mt-2">Advanced charting & real-time data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Assets Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Multiple Assets, One Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Access leading assets with spreads from 0.0 pips, low and transparent commissions. Trade smarter with advanced tools and superior execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Forex CFD", icon: "💱", count: "90+", color: "from-blue-500 to-cyan-500" },
              { title: "Cryptocurrencies", icon: "₿", count: "150+", color: "from-amber-500 to-orange-500" },
              { title: "Commodities", icon: "🛢️", count: "20+", color: "from-yellow-500 to-amber-500" },
              { title: "Precious Metals", icon: "🏆", count: "10+", color: "from-yellow-400 to-yellow-600" },
              { title: "Indices", icon: "📈", count: "40+", color: "from-emerald-500 to-teal-500" },
              { title: "Stocks", icon: "📊", count: "5000+", color: "from-purple-500 to-pink-500" },
            ].map((asset, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${asset.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-8 hover:border-slate-600 transition duration-350 cursor-pointer h-full flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <p className="text-5xl mb-4 transform group-hover:scale-110 transition duration-500">{asset.icon}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{asset.title}</h3>
                  </div>
                  <div className="flex items-baseline justify-between pt-4 border-t border-slate-700/50">
                    <p className="text-emerald-400 font-semibold text-lg">{asset.count}</p>
                    <p className="text-gray-400 text-sm">Instruments</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button onClick={handleExploreAssets} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1">
              Explore All Assets →
            </Button>
          </div>
        </div>
      </section>

      {/* Built for Traders Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Built for Traders
            </h2>
            <p className="text-xl text-gray-400">Everything you need to trade successfully</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Multi-Platform Trading Experience",
                desc: "Seamless access via MT4, MT5, Web, and mobile apps for uninterrupted trading across all devices.",
                icon: "🖥️"
              },
              {
                title: "Ultra-Low Latency Execution",
                desc: "Millisecond-level order execution powered by our advanced matching engine.",
                icon: "⚡"
              },
              {
                title: "Global Regulatory Compliance",
                desc: "Licensed and regulated, compliant with international standards ensuring safety and trust.",
                icon: "🛡️"
              },
              {
                title: "Dedicated Expert Support",
                desc: "24/7 multilingual support team ready to assist you whenever you need help.",
                icon: "🎯"
              },
              {
                title: "Fast Fund Transfers",
                desc: "60-second instant deposits and efficient 20-minute withdrawals.",
                icon: "💨"
              },
              {
                title: "Advanced Trading Tools",
                desc: "Access cutting-edge charting tools, economic calendars, and market analysis.",
                icon: "🔧"
              },
            ].map((feature, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl p-8 hover:border-slate-600/80 transition duration-500 backdrop-blur-sm">
                  <div className="mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition duration-300">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-r from-emerald-600/10 via-slate-950 to-blue-600/10 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Reliable. Trusted. Awarded.
            </h2>
            <p className="text-xl text-gray-300">
              Backed by millions of traders worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5M+", label: "Active Users", icon: "👥" },
              { number: "10M+", label: "Downloads", icon: "📥" },
              { number: "$60B", label: "Monthly Volume", icon: "💰" },
              { number: "50+", label: "Countries", icon: "🌍" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 text-4xl transform group-hover:scale-110 transition duration-300">{stat.icon}</div>
                <p className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200 mb-2">{stat.number}</p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Trade in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-400">
              Smarter trading starts here! Join millions of traders who choose our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                desc: "Create your account in just 2 minutes with our simple registration process.",
                icon: "✏️"
              },
              {
                step: 2,
                title: "Deposit",
                desc: "Fund your account using your preferred payment method.",
                icon: "💳"
              },
              {
                step: 3,
                title: "Start Trading",
                desc: "Access 300+ financial instruments and begin trading immediately.",
                icon: "🚀"
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-blue-600/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 text-center hover:border-slate-600 transition duration-500">
                  <div className="mb-6 flex justify-center">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 rounded-full flex items-center justify-center border border-emerald-500/50 group-hover:border-emerald-500 transition duration-300">
                      <span className="text-3xl font-bold text-emerald-400">{item.step}</span>
                    </div>
                    <span className="absolute top-6 right-0 text-4xl transform -translate-x-8">{item.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-500/30 opacity-50"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
            <Button onClick={handleStartTrading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1">
              Start Trading
            </Button>
            <Button onClick={handleTryDemo} className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-10 py-4 rounded-lg text-lg font-semibold transition duration-300">
              Try Free Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Download Our App
            </h2>
            <p className="text-xl text-gray-400">
              Trade on the go with our mobile apps for iOS and Android
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "iOS App",
                icon: "📱",
                desc: "Optimized for iPhone and iPad",
                buttonText: "App Store",
                url: "https://apps.apple.com/app/bitpanda-pro",
                color: "from-blue-600 to-blue-400"
              },
              {
                title: "Android App",
                icon: "🤖",
                desc: "Download on Google Play",
                buttonText: "Google Play",
                url: "https://play.google.com/store/apps/details?id=com.bitpanda.pro",
                color: "from-green-600 to-green-400"
              },
              {
                title: "Web Platform",
                icon: "🖥️",
                desc: "Trade directly in browser",
                buttonText: "Open Web App",
                isInternalLink: true,
                color: "from-emerald-600 to-emerald-400"
              },
            ].map((app, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${app.color} rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition duration-500`}></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-8 text-center hover:border-slate-600 transition duration-500 backdrop-blur-sm flex flex-col h-full">
                  <div>
                    <p className="text-6xl mb-4 transform group-hover:scale-110 transition duration-300">{app.icon}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{app.title}</h3>
                    <p className="text-gray-400 mb-8">{app.desc}</p>
                  </div>
                  {app.isInternalLink ? (
                    <Button onClick={handleStartTrading} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg w-full font-semibold transition duration-300">
                      {app.buttonText}
                    </Button>
                  ) : (
                    <Button asChild className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-6 py-3 rounded-lg w-full font-semibold transition duration-300">
                      <a href={app.url} target="_blank" rel="noopener noreferrer">
                        {app.buttonText}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4 md:px-8 border-t border-slate-700/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Trade?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join millions of traders and start your trading journey today. Sign up in seconds and access professional trading tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleOpenAccount} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1">
              Open Account
            </Button>
            <Button onClick={handleContactUs} className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-12 py-4 rounded-lg text-lg font-semibold transition duration-300">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700/50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-white hover:text-emerald-400 transition mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-bold">Bitpanda Pro</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">Professional trading platform for everyone. Trade Forex, Crypto, Commodities & more.</p>
            </div>

            {/* Trading */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Trading</h3>
              <ul className="space-y-3">
                <li><Link href="/markets" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Markets</Link></li>
                <li><Link href="/demo" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Demo Account</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Platform</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Tools</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/contact-us" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Contact</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Support</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Terms & Conditions</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Disclaimer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition text-sm font-medium">Cookies</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">Get trading tips and market insights delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                />
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-6">
              <p>&copy; 2026 Bitpanda Pro. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-emerald-400 transition font-medium">Twitter</a>
                <a href="#" className="hover:text-emerald-400 transition font-medium">LinkedIn</a>
                <a href="#" className="hover:text-emerald-400 transition font-medium">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

