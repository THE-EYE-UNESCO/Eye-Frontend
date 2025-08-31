import { Eye } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        {/* Eye Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <Eye className="w-36 h-36 text-primary" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-secondary mb-4 leading-tight">
          AI-Powered
        </h1>
        <h1 className="text-6xl md:text-7xl font-bold text-primary mb-8 leading-tight">
          Crisis Response
        </h1>

        {/* Description */}
        <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
          Empowering humanitarian organizations like UNICEF to prioritize aid distribution<br />
          during crises using real-world data and machine learning intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-primary text-white px-10 py-4 rounded-md text-xl font-semibold hover:bg-blue-600 transition-colors">
            Start Monitoring Crisis
          </button>
          <button className="border border-primary text-primary px-10 py-4 rounded-md text-xl font-semibold hover:bg-primary hover:text-white transition-colors">
            View Live Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">150+</div>
            <div className="text-lg text-gray-600">Countries Monitored</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">24/7</div>
            <div className="text-lg text-gray-600">Real-time Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">&lt;60s</div>
            <div className="text-lg text-gray-600">Alert Response</div>
          </div>
        </div>
      </div>
    </section>
  )
}
