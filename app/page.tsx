
"use client";

import Link from "next/link";
import Image from "next/image";
import BitpandaNavbar from "@/components/BitpandaNavbar";
import CryptoTicker from "@/components/CryptoTicker";

// Crypto data
const topCryptos = [
  { symbol: "BTC", name: "Bitcoin", price: "€45,234.56", change: "+2.34%", volume: "€28.5B", logo: "/btc-logo.png" },
  { symbol: "ETH", name: "Ethereum", price: "€2,876.43", change: "-1.23%", volume: "€12.8B", logo: "/eth-logo.png" },
  { symbol: "BNB", name: "BNB", price: "€298.76", change: "+3.45%", volume: "€2.1B", logo: "/bnb-logo.png" },
  { symbol: "ADA", name: "Cardano", price: "€0.4521", change: "+1.87%", volume: "€890M", logo: "/ada-logo.png" },
  { symbol: "SOL", name: "Solana", price: "€98.32", change: "+4.12%", volume: "€1.2B", logo: "/sol-logo.png" },
  { symbol: "XRP", name: "XRP", price: "€0.6234", change: "-0.45%", volume: "€1.8B", logo: "/xrp-logo.png" }
];

// Investment options
const investmentOptions = [
  {
    title: "Cryptocurrencies",
    description: "Buy, sell, and swap the cryptocurrencies you want anytime, anywhere.",
    image: "https://a.storyblok.com/f/176646/960x600/6795a4c32d/website_homepage_cryptocurrencies.png",
    link: "/crypto"
  },
  {
    title: "Stocks*",
    description: "Invest in fractions of your favourite companies without buying a full share.",
    image: "https://a.storyblok.com/f/176646/960x600/cc80628f6b/website_homepage_stocks.png",
    link: "/stocks"
  },
  {
    title: "ETFs*",
    description: "Invest in fractions of your favourite ETFs* without buying a full share.",
    image: "https://a.storyblok.com/f/176646/960x600/bc62fd7985/website_homepage_etfs.png",
    link: "/etfs"
  },
  {
    title: "Commodities*",
    description: "Fortify your portfolio with commodities* and shield it against inflation.",
    image: "https://a.storyblok.com/f/176646/960x600/ff72d39829/website_homepage_commodities.png",
    link: "/commodities"
  },
  {
    title: "Crypto Indices",
    description: "Auto-invest in the whole crypto market with a single click.",
    image: "https://a.storyblok.com/f/176646/960x600/b971c0ccf7/website_homepage_crypto-indices.png",
    link: "/indices"
  },
  {
    title: "Precious Metals",
    description: "Diversify your portfolio by investing in physically-backed precious metals.",
    image: "https://a.storyblok.com/f/176646/960x600/5c79402c90/website_homepage_metals.png",
    link: "/metals"
  }
];

// Steps data
const steps = [
  {
    number: "01",
    title: "Register",
    description: "Sign up to create your free Bitpanda account.",
    image: "https://a.storyblok.com/f/176646/840x1080/4e498da1d7/website_homepage_register_en.png"
  },
  {
    number: "02",
    title: "Verify",
    description: "Verify your identity with one of our trusted verification partners.",
    image: "https://a.storyblok.com/f/176646/840x1080/20149b912b/website_homepage_verify_en.png"
  },
  {
    number: "03",
    title: "Deposit",
    description: "Deposit your funds securely through popular options.",
    image: "https://a.storyblok.com/f/176646/840x1080/af2f5ef73e/website_homepage_deposit_en.png"
  },
  {
    number: "04",
    title: "Trade",
    description: "Buy, sell and swap digital assets 24/7.",
    image: "https://a.storyblok.com/f/176646/840x1080/ffa905c022/website_homepage_trade_en.png"
  }
];

// Assets data for asset cards
const assets = [
  { symbol: "XAU", name: "Gold", price: "€2,045.32", change: "+0.85%", type: "commodity", chart: "up" },
  { symbol: "NVDA", name: "NVIDIA Corp", price: "€875.45", change: "+3.24%", type: "stock", chart: "up" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "€172.89", change: "-0.56%", type: "stock", chart: "down" },
  { symbol: "AAPL", name: "Apple Inc", price: "€185.67", change: "+1.12%", type: "stock", chart: "up" },
  { symbol: "MSFT", name: "Microsoft Corp", price: "€415.23", change: "+2.45%", type: "stock", chart: "up" },
  { symbol: "AMZN", name: "Amazon.com", price: "€178.34", change: "+1.89%", type: "stock", chart: "up" },
  { symbol: "BTC", name: "Bitcoin", price: "€52,340.00", change: "+4.56%", type: "crypto", chart: "up" },
  { symbol: "TSM", name: "Taiwan Semi", price: "€142.78", change: "-1.23%", type: "stock", chart: "down" },
  { symbol: "FB", name: "Meta Platforms", price: "€485.67", change: "+2.78%", type: "stock", chart: "up" },
  { symbol: "AVGO", name: "Broadcom Inc", price: "€1,245.89", change: "+5.12%", type: "stock", chart: "up" },
  { symbol: "TSLA", name: "Tesla Inc", price: "€189.45", change: "-2.34%", type: "stock", chart: "down" },
  { symbol: "BRK", name: "Berkshire B", price: "€415.67", change: "+0.89%", type: "stock", chart: "up" },
  { symbol: "LLY", name: "Eli Lilly", price: "€782.34", change: "+1.56%", type: "stock", chart: "up" },
  { symbol: "JPM", name: "JPMorgan", price: "€198.56", change: "+0.78%", type: "stock", chart: "up" },
  { symbol: "WMT", name: "Walmart Inc", price: "€165.23", change: "-0.34%", type: "stock", chart: "down" },
  { symbol: "TCTZF", name: "Tata Consumer", price: "€12.45", change: "+0.67%", type: "stock", chart: "up" },
  { symbol: "V", name: "Visa Inc", price: "€278.90", change: "+1.23%", type: "stock", chart: "up" },
  { symbol: "SMSN", name: "Samsung Elec", price: "€1,234.56", change: "+2.45%", type: "stock", chart: "up" },
  { symbol: "XOM", name: "Exxon Mobil", price: "€108.78", change: "-0.89%", type: "stock", chart: "down" },
  { symbol: "ORCL", name: "Oracle Corp", price: "€127.89", change: "+1.45%", type: "stock", chart: "up" },
  { symbol: "MA", name: "Mastercard", price: "€445.67", change: "+1.78%", type: "stock", chart: "up" },
  { symbol: "JNJ", name: "Johnson&John", price: "€156.78", change: "-0.45%", type: "stock", chart: "down" },
  { symbol: "ASML", name: "ASML Holding", price: "€867.89", change: "+3.67%", type: "stock", chart: "up" },
  { symbol: "BAC", name: "Bank of Amer", price: "€34.56", change: "+0.89%", type: "stock", chart: "up" },
  { symbol: "PLTR", name: "Palantir", price: "€24.78", change: "-1.56%", type: "stock", chart: "down" }
];

// FAQ Questions data
const faqQuestions = [
  {
    question: "How do I verify my account?",
    answer: "Verify your identity with one of our trusted verification partners in just a few minutes.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept bank transfers, credit/debit cards, PayPal, and various local payment methods.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
  },
  {
    question: "Are my funds secure?",
    answer: "Funds are secured in offline wallets with full compliance to European standards.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  },
  {
    question: "How do I withdraw my crypto?",
    answer: "Withdraw your digital assets anytime with low fees and fast processing times.",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
  },
  {
    question: "What are the trading fees?",
    answer: "Competitive fees starting from 0.1% per trade with no hidden costs.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    question: "Is there a mobile app?",
    answer: "Yes! Download our app on iOS and Android for trading on the go.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
  },
  {
    question: "How do I enable 2FA?",
    answer: "Enable two-factor authentication in your account settings for enhanced security.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    question: "What cryptocurrencies can I trade?",
    answer: "Trade 650+ cryptocurrencies including Bitcoin, Ethereum, Solana, and many more.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    question: "Can I invest in stocks and ETFs?",
    answer: "Yes! Invest in fractions of your favourite companies and ETFs with zero commissions.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  },
  {
    question: "What are Bitpanda Pro Crypto Indices?",
    answer: "Auto-invest in the whole crypto market with a single click using our diversified indices.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
  },
  {
    question: "How fast are deposits and withdrawals?",
    answer: "Bank transfers typically process within 1-2 business days, crypto withdrawals within minutes.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    question: "Is Bitpanda Pro regulated?",
    answer: "Yes, we're Austria-based and European regulated crypto & securities broker platform.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    question: "What is Bitpanda Pro Leverage?",
    answer: "Go Long or Short on top cryptocurrencies with up to 10x leverage for amplified positions.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  },
  {
    question: "How do I contact support?",
    answer: "Reach our support team through the Helpdesk or contact form available 24/7.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <BitpandaNavbar />
      
      {/* Crypto Ticker */}
      <CryptoTicker />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-900 pt-20 pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[#103e36]"></div>
        <div className="bp-container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Fast-track your financial freedom.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Join over 7 million people investing in 650+ cryptos and 3,000+ digital assets with Bitpanda Pro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/signup" className="bp-button bp-button-primary bp-button-lg">
                  Start investing
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <Image 
                  src="/website_homepage_header (1).webp" 
                  alt="Man in a gray suit with a striped shirt, sitting and holding a phone, looking to the side, with a green background." 
                  width={500}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-green-800 text-white">
        <div className="bp-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Regulated</h3>
              <p className="text-white/90 mb-4">Austria based and European regulated crypto & securities broker platform</p>
              <Link href="/security" className="text-white underline font-medium">Read more</Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe and secure</h3>
              <p className="text-white/90 mb-4">Funds secured in offline wallets. Fully compliant with European data, IT and money laundering standards.</p>
              <Link href="/security" className="text-white underline font-medium">Read more</Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted</h3>
              <p className="text-white/90 mb-4">7+ million happy users. Excellent Trustpilot rating.</p>
              <Link href="#" className="text-white underline font-medium">Read reviews</Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Your Investments Section */}
      <section className="py-20 bg-white">
        <div className="bp-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
              All your investments.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>All on Bitpanda Pro.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentOptions.map((option, index) => (
              <div key={index} className="bp-card">
                <div className="aspect-video bg-gray-100">
                  <Image 
                    src={option.image} 
                    alt={option.title} 
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <Link href={option.link} className="text-green-800 font-medium flex items-center">
                    Learn more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Investing in stocks, ETFs and commodities carries risks. Conduct your own research before concluding a transaction.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              *Stocks and ETFs are the underlying assets of the contracts offered as Bitpanda Pro Stocks and are brought to you by Bitpanda Pro Financial Services GmbH. 
              More information about the product is available at bitpandapro.com. For more details, consult the prospectus available at bitpandapro.com.
            </p>
          </div>
        </div>
      </section>

      {/* More Money in Portfolio */}
      <section className="py-20 bg-gray-100">
        <div className="bp-container">
          <div className="bp-card bg-green-800 text-white">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="bp-badge bp-badge-green mb-4 w-fit">
                  Invest with zero deposit fees
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  More money in your portfolio
                </h3>
                <p className="text-white/90 mb-6">
                  No deposit or withdrawal fees on any payment method for all fiat currencies with Bitpanda Pro. 
                  More opportunities to grow your investments and make impactful decisions.
                </p>
                <Link href="/fees" className="bp-button bp-button-secondary w-fit">
                  Read more
                </Link>
              </div>
              <div className="bg-white flex items-center justify-center p-8">
                <div className="relative w-full max-w-xs">
                  <Image 
                    src="https://a.storyblok.com/f/176646/2063x2126/81da40be44/website_homepage_more-money-in-you-portfolio_en.png" 
                    alt="Payment options: Apple Pay, PayPal, Mastercard, and Visa, all listed as free."
                    width={500}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-green-800 text-white">
        <div className="bp-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get started in minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="relative w-full aspect-[3/4]">
                    <Image 
                      src={step.image} 
                      alt={step.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="bp-badge bp-badge-green mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Tabs Section */}
      <section className="py-20 bg-gray-100">
        <div className="bp-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
              Keep tabs on your favourite assets
            </h2>
          </div>
          <div className="bp-card">
            <div className="divide-y divide-gray-200">
              {topCryptos.map((crypto, index) => (
                <div key={index} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image 
                        src={crypto.logo} 
                        alt={`${crypto.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-xl"
                      />
                      <div>
                        <h3 className="font-bold text-base sm:text-lg">{crypto.name}</h3>
                        <p className="text-sm text-gray-500">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-base sm:text-lg">{crypto.price}</h3>
                      <p className={`text-sm ${crypto.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {crypto.change}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-gray-500">
            Past performance is not an indication of future performance.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white">
        <div className="bp-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl mb-8 text-white/75">
              Join millions of investors who trust BITPANDA PRO for their financial future
            </p>
            <p className="text-xl mb-8 text-white/75">
              Get started in under 5 minutes • No hidden fees • European regulated • Professional Trading Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="bp-button bp-button-primary bp-button-lg">
                Start Trading Now
              </Link>
              <Link href="/tutorials" className="bp-button bp-button-secondary bp-button-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Tutorials
              </Link>
            </div>
            <p className="text-sm mt-6 text-white/75">
              Get started in under 5 minutes • No hidden fees • European regulated
            </p>
          </div>
        </div>
      </section>

      {/* Questions Section with Moving Animation */}
      <section className="py-20 bg-green-800 text-white overflow-hidden">
        <div className="bp-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Questions? We&apos;re here for you
            </h2>
          </div>
        </div>
        
        {/* Moving FAQ Cards Container */}
        <div className="faq-marquee-container">
          <div className="faq-marquee-content">
            {/* First set of cards */}
            {faqQuestions.map((faq, index) => (
              <div key={`first-${index}`} className="faq-card">
                <div className="faq-card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={faq.icon} />
                  </svg>
                </div>
                <h3 className="faq-card-question">{faq.question}</h3>
                <p className="faq-card-answer">{faq.answer}</p>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {faqQuestions.map((faq, index) => (
              <div key={`second-${index}`} className="faq-card">
                <div className="faq-card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={faq.icon} />
                  </svg>
                </div>
                <h3 className="faq-card-question">{faq.question}</h3>
                <p className="faq-card-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Contact Cards */}
     { /*<div className="bp-container mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bp-card bg-green-900 text-white">
              <div className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Community</h3>
                <p className="mb-4">
                  Join our online community so you can be the first to hear about company news, new products and more.
                </p>
                <Link href="#" className="text-white underline font-medium">Join us</Link>
              </div>
            </div>
            <div className="bp-card bg-green-900 text-white">
              <div className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Contact us</h3>
                <p className="mb-4">
                  Our Bitpanda Pro Helpdesk is filled with in-depth articles, and if you need more help, we are always available to lend a helping hand through our contact form.
                </p>
                <Link href="#" className="text-white underline font-medium">Go to Helpdesk</Link>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* Assets Section */}
      <section className="py-20 bg-white">
        <div className="bp-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">
              Explore Popular Assets
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trade a wide variety of assets including cryptocurrencies, stocks, commodities and more
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {assets.map((asset, index) => (
              <div key={index} className="bp-card p-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      asset.type === 'crypto' ? 'bg-orange-100 text-orange-600' :
                      asset.type === 'commodity' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{asset.symbol}</h4>
                      <p className="text-xs text-gray-500">{asset.name}</p>
                    </div>
                  </div>
                </div>
                <div className="h-16 mb-3">
                  <svg viewBox="0 0 100 40" className={`w-full h-full ${asset.chart === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <path
                      d={asset.chart === 'up' 
                        ? "M0,35 L10,32 L20,33 L30,28 L40,30 L50,25 L60,27 L70,20 L80,22 L90,15 L100,18"
                        : "M0,10 L10,15 L20,12 L30,18 L40,15 L50,22 L60,18 L70,25 L80,20 L90,28 L100,30"
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">{asset.price}</p>
                    <p className={`text-xs ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {asset.change}
                    </p>
                  </div>
                  <button className="bp-button bp-button-primary bp-button-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/markets" className="bp-button bp-button-outline">
              View All Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="bp-container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image 
                  src="/bitpanda-logo.svg"
                  alt="Bitpanda Pro"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-2xl font-bold text-white uppercase">BITPANDA PRO</span>
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Europe&apos;s leading cryptocurrency trading platform. Bitpanda Pro is regulated, secure, and trusted by millions of users across the continent. Start your investment journey with confidence.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.218.682-.485 0-.236-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Invest</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/crypto" className="text-gray-300 hover:text-white">Cryptocurrencies</Link></li>
                <li><Link href="/stocks" className="text-gray-300 hover:text-white">Stocks</Link></li>
                <li><Link href="/etfs" className="text-gray-300 hover:text-white">ETFs</Link></li>
                <li><Link href="/metals" className="text-gray-300 hover:text-white">Precious Metals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="text-gray-300 hover:text-white">Press</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link href="/security" className="text-gray-300 hover:text-white">Security</Link></li>
                <li><Link href="/imprint" className="text-gray-300 hover:text-white">Imprint</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 BITPANDA PRO. All rights reserved. Bitpanda Pro GmbH ve grup şirketleri (Bitpanda Pro) Türkiye&apos;de bankacılık ve finansal hizmetler kanunlarının düzenlediği hiçbir faaliyet için yetkilendirilmemiştir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

