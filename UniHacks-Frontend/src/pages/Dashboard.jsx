import React, { useEffect, useRef } from "react"

const Dashboard = () => {

  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
          }
        })
      },
      { threshold: 0.2 }
    )

    revealRefs.current.forEach(el => el && observer.observe(el))
  }, [])

  const features = [
    {
      title: "Real-Time Updates",
      desc: "Track queue movement live without refreshing.",
      span: "md:col-span-2"
    },
    {
      title: "Smart Queue Logic",
      desc: "Optimized handling for faster and fair service."
    },
    {
      title: "Token Swap",
      desc: "Securely exchange your position with consent."
    },
    {
      title: "Multi-Venue Support",
      desc: "Banks, hospitals and government offices.",
      span: "md:col-span-2"
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7f8c8] via-yellow-100 to-amber-100 text-gray-800 overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-[#10b981] tracking-wide">
          QueueNest
        </h1>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-32 max-w-5xl mx-auto">
        <h1 className="title1 text-10xl font-extrabold mb-6 tracking-tight text-gray-900">
          QueueNest
        </h1>
        <p className="text-2xl text-[#10b981] font-semibold mb-4">
          Wait Smart. Not Long.
        </p>
        <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join virtual queues and track your position in real time.
        </p>

        <div className="flex justify-center gap-6">
          <button className="primary-btn">Join Queue →</button>
          <button className="secondary-btn">Admin Panel</button>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">

        <div
          className="text-center mb-20 reveal"
          ref={el => revealRefs.current[0] = el}
        >
          <h2 className="text-4xl font-bold mb-4 title1">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to modernize waiting systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 auto-rows-[240px]">

          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => revealRefs.current[index + 1] = el}
              className={`bento-card reveal ${feature.span || ""}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-10 text-gray-500">
        © 2025 QueueNest. All rights reserved.
      </footer>

      {/* Animations + Styles */}
      <style>{`

        /* Scroll Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.8s ease;
        }

        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Bento Card */
        .bento-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border-radius: 1.8rem;
          padding: 2rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .bento-card:hover {
          background: #10b981;
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 30px 60px rgba(16,185,129,0.35);
          color: white;
        }

        .bento-card:hover p,
        .bento-card:hover h3 {
          color: white;
        }

        /* Buttons */
        .primary-btn {
          background: #10b981;
          color: white;
          padding: 0.9rem 2.2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .primary-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 20px 40px rgba(16,185,129,0.4);
        }

        .secondary-btn {
          border: 2px solid #10b981;
          color: #10b981;
          padding: 0.9rem 2.2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: #10b981;
          color: white;
          transform: scale(1.08);
        }

      `}</style>

    </div>
  )
}

export default Dashboard
