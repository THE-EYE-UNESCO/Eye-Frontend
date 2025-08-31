import { Database, MapPin, AlertTriangle, TrendingUp, Shield, Brain } from 'lucide-react'

export default function HowItWorksSection() {
  const features = [
    {
      icon: Database,
      title: "Global Data Collection",
      description: "Aggregates data from 150+ sources including satellite imagery, weather, and OSINT to map humanitarian needs.",
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      title: "Interactive Mapping",
      description: "Visualizes and distributes analysis geographically.",
      color: "text-red-500"
    },
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Provides real-time alerts for emerging crises and events.",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analysis",
      description: "Predicts potential crisis developments and allows proactive humanitarian response.",
      color: "text-blue-500"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Built to exceed privacy standards and compliance requirements.",
      color: "text-red-500"
    },
    {
      icon: Brain,
      title: "AI Monitoring",
      description: "Machine learning algorithms continuously monitor and analyze data based on regional analysis.",
      color: "text-blue-500"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-secondary mb-4 leading-tight">
            How The Eye Works
          </h2>
          <p className="text-2xl text-gray-600 leading-relaxed">
            Advanced AI algorithm analyzes multiple data sources to provide actionable<br />
            insights for humanitarian response
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-semibold text-secondary mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
