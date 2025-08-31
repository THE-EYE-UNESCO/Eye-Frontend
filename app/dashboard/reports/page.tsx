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
  FileText,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">The Eye</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">HA</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Humanitarian Analyst</div>
                  <div className="text-gray-500 text-xs">UNICEF Operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Active Crisis */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Crisis</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
                <p className="text-xs text-gray-500">+3 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500">Attention required</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          {/* People Affected */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">People Affected</p>
                <p className="text-2xl font-bold text-gray-900">2.3M</p>
                <p className="text-xs text-gray-500">Across 17 regions</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">47s</p>
                <p className="text-xs text-gray-500">Average alert time</p>
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
            <Link href="/dashboard/analysis" className="text-gray-600 hover:text-gray-900 pb-2">Analysis</Link>
            <Link href="/dashboard/reports" className="text-primary border-b-2 border-primary pb-2 font-medium">Reports</Link>
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

        {/* Crisis Reports & Analytics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Crisis Reports & Analytics</h2>
          </div>
          <p className="text-gray-600 mb-12">
            Comprehensive reports and predictive analytics for humanitarian planning
          </p>

          {/* Advanced Reporting Module */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-gray-400" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Advance Reporting Module
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Generate detailed crisis reports with predictive modeling and resource allocation recommendations
            </p>
            
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium">
              Generate New Report
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
