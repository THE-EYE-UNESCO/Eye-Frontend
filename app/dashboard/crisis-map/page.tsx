import { 
  Eye, 
  Search, 
  Bell, 
  Settings, 
  RefreshCw, 
  ChevronDown,
  Globe,
  AlertTriangle,
  Users,
  Clock,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

export default function CrisisMapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <span className="text-2xl font-bold text-secondary">The Eye</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search regions..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-3 py-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">H</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Humanitarian Analyst</div>
                  <div className="text-gray-500">UNICEF Operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Active Crisis */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Crisis</p>
                <p className="text-3xl font-bold text-gray-900">42</p>
                <p className="text-sm text-green-600">+3 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-red-600">⚠ Attention required</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* People Affected */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">People Affected</p>
                <p className="text-3xl font-bold text-gray-900">2.3M</p>
                <p className="text-sm text-gray-600">⚠ Across 23 regions</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-3xl font-bold text-gray-900">47s</p>
                <p className="text-sm text-green-600">⏱ Average alert time</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 pb-2">Overview</Link>
            <Link href="/dashboard/crisis-map" className="text-primary border-b-2 border-primary pb-2 font-medium">Crisis Map</Link>
            <Link href="/dashboard/analysis" className="text-gray-600 hover:text-gray-900 pb-2">Analysis</Link>
            <Link href="/dashboard/reports" className="text-gray-600 hover:text-gray-900 pb-2">Reports</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <span>Regions</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real Interactive Map */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Global Crisis Map</h2>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Satellite View</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Terrain</button>
              <button className="text-sm text-primary border-b border-primary">Crisis Layer</button>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="relative rounded-lg overflow-hidden mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127748441.89219016!2d0!3d20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1693234567890!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96"
            />
            
            {/* Crisis Markers Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Ukraine */}
              <div className="absolute" style={{ top: '25%', left: '52%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Ukraine - Critical
                  </div>
                </div>
              </div>
              
              {/* Ethiopia */}
              <div className="absolute" style={{ top: '55%', left: '58%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Ethiopia - High Priority
                  </div>
                </div>
              </div>
              
              {/* Haiti */}
              <div className="absolute" style={{ top: '45%', left: '28%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Haiti - Moderate
                  </div>
                </div>
              </div>
              
              {/* Afghanistan */}
              <div className="absolute" style={{ top: '35%', left: '68%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Afghanistan - Critical
                  </div>
                </div>
              </div>
              
              {/* Syria */}
              <div className="absolute" style={{ top: '32%', left: '54%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Syria - High Priority
                  </div>
                </div>
              </div>
              
              {/* Yemen */}
              <div className="absolute" style={{ top: '48%', left: '57%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Yemen - Critical
                  </div>
                </div>
              </div>
              
              {/* Somalia */}
              <div className="absolute" style={{ top: '60%', left: '59%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Somalia - High Priority
                  </div>
                </div>
              </div>
              
              {/* Bangladesh */}
              <div className="absolute" style={{ top: '40%', left: '72%' }}>
                <div className="relative group pointer-events-auto">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Bangladesh - Moderate
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Info Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <div className="text-sm font-medium text-gray-900">Active Crises: 8</div>
              <div className="text-xs text-gray-600">Last updated: 2 min ago</div>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Critical (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">High Priority (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Moderate (2)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Stable</span>
            </div>
          </div>
        </div>
        
        {/* Crisis Details Panel */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Crisis Updates</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Ukraine - Escalating Conflict</h4>
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">CRITICAL</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Humanitarian situation deteriorating in eastern regions</p>
                <p className="text-xs text-gray-500 mt-2">Affected: 2.1M people • Updated: 5 min ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Ethiopia - Food Security Crisis</h4>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">HIGH</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Severe drought affecting northern regions</p>
                <p className="text-xs text-gray-500 mt-2">Affected: 890K people • Updated: 23 min ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Haiti - Cholera Outbreak</h4>
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">MODERATE</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Health authorities mobilizing response efforts</p>
                <p className="text-xs text-gray-500 mt-2">Affected: 156K people • Updated: 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
