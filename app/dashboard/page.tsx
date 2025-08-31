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
  MapPin,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
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
            <Link href="/dashboard" className="text-primary border-b-2 border-primary pb-2 font-medium">Overview</Link>
            <Link href="/dashboard/crisis-map" className="text-gray-600 hover:text-gray-900 pb-2">Crisis Map</Link>
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

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time Crisis Alerts */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  Real-time Crisis Alerts
                </h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">4 Active</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Eastern Ukraine Alert */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <h4 className="font-semibold text-gray-900">Eastern Ukraine</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Escalating conflict affecting civilian infrastructure</p>
                    <p className="text-sm text-gray-600">• 150,000 affected</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    2 minutes ago
                  </div>
                </div>
              </div>

              {/* Northern Ethiopia Alert */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <h4 className="font-semibold text-gray-900">Northern Ethiopia</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Severe food insecurity detected in rural areas</p>
                    <p className="text-sm text-gray-600">• 89,000 affected</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    15 minutes ago
                  </div>
                </div>
              </div>

              {/* Haiti Alert */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <h4 className="font-semibold text-gray-900">Haiti</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Cholera outbreak spreading in Port-au-Prince</p>
                    <p className="text-sm text-gray-600">• 45,000 affected</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    1 hours ago
                  </div>
                </div>
              </div>

              {/* Afghanistan Alert */}
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <h4 className="font-semibold text-gray-900">Afghanistan</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Displacement crisis following recent events</p>
                    <p className="text-sm text-gray-600">• 120,000 affected</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    3 hours ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aid Recommendations */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <span className="text-red-500 mr-2">♡</span>
                Aid Recommendations
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Immediate Action Required */}
              <div style={{backgroundColor: 'rgba(239, 10, 14, 0.1)'}} className="p-4 rounded-lg">
                <div className="mb-3">
                  <span style={{backgroundColor: 'rgba(239, 10, 14, 0.2)'}} className="text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Immediate Action Required</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Eastern Ukraine - Medical supplies critically needed</h4>
                <div className="flex space-x-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Medical</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Shelter</span>
                </div>
              </div>

              {/* High Priority */}
              <div style={{backgroundColor: 'rgba(224, 169, 32, 0.1)'}} className="p-4 rounded-lg">
                <div className="mb-3">
                  <span style={{backgroundColor: 'rgba(224, 169, 32, 0.2)'}} className="text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High Priority</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Northern Ethiopia - Food assistance required</h4>
                <div className="flex space-x-2">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Food</span>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Water</span>
                </div>
              </div>

              {/* Medium Priority */}
              <div style={{backgroundColor: 'rgba(248, 190, 255, 0.3)'}} className="p-4 rounded-lg">
                <div className="mb-3">
                  <span style={{backgroundColor: 'rgba(248, 190, 255, 0.5)'}} className="text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Medium Priority</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Afghanistan - Shelter Support Needed</h4>
                <div className="flex space-x-2">
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Food</span>
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Shelter</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Crisis Breakdown */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="w-5 h-5 text-blue-500 mr-2" />
              Regional Crisis Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Population</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Food Security</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Aid Types</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Eastern Ukraine</div>
                    <div className="text-sm text-gray-500">Ukraine</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2,400,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">critical</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Medical</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Shelter</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 min ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Northern Ethiopia</div>
                    <div className="text-sm text-gray-500">Ethiopia</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">890,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-yellow-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">severe</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Food</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">water</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">medical</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 min ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Port-au-Prince</div>
                    <div className="text-sm text-gray-500">Haiti</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">450,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">moderate</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Medical</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Shelter</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 hour ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Kabul Province</div>
                    <div className="text-sm text-gray-500">Afghanistan</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,200,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">stressed</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Medical</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Shelter</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
