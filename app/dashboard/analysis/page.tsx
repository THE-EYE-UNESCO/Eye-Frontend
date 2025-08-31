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
  Brain,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function AnalysisPage() {
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
            <Link href="/dashboard/crisis-map" className="text-gray-600 hover:text-gray-900 pb-2">Crisis Map</Link>
            <Link href="/dashboard/analysis" className="text-primary border-b-2 border-primary pb-2 font-medium">Analysis</Link>
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

        {/* AI-Powered News Analysis */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="w-5 h-5 text-blue-500 mr-2" />
              AI-Powered News Analysis
            </h3>
            <p className="text-sm text-gray-600 mt-1">Real-time analysis of global news sources with humanitarian impact assessment</p>
          </div>
          <div className="p-6 space-y-6">
            
            {/* News Item 1 */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">UN reports escalating crisis in Eastern Ukraine</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  5 minutes ago
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Recent conflict escalation has severely impacted civilian infrastructure, affecting water and power supplies for 150,000 people.
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Reuters</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">URGENT</span>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">Food Security reaches critical levels in Northern Ethiopia</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  23 minutes ago
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                WFP reports severe malnutrition rates climbing among children under 5, with harvest failures contributing to the crisis.
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">BBC News</span>
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">URGENT</span>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="pb-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">International aid organizations mobilize for Haiti cholera response</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  24 minutes ago
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                WHO and partners coordinate emergency response as cholera cases surge in Port-au-Prince metropolitan area.
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">AP News</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">NORMAL</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
