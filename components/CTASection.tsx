import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-primary py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Ready to Transform Crisis Response?
        </h2>
        
        {/* Subheading with stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 text-white">
          <span className="text-xl">Join humanitarian organizations</span>
          <div className="flex items-center gap-2">
           
          
          </div>
          <span className="text-xl">using The Eye to save lives through AI</span>
          
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 text-black px-10 py-4 rounded-md text-xl font-semibold hover:bg-yellow-400 transition-colors">
            Start Your Journey 
              
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-md text-xl font-semibold hover:bg-white hover:text-primary transition-colors">
            View Live Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}
