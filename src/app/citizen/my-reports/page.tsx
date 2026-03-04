"use client";

import React, { useEffect, useState } from "react";
import { CitizenShell } from "../_components/CitizenShell";
import { api } from "@/lib/api";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Edit, 
  Trash2,
  MapPin,
  Calendar,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  created_at: string;
  address?: string;
  landmark?: string;
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await api.get("/reports");
      setReports(data.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await api.delete(`/reports/${id}`);
      setReports(reports.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReport) return;

    setIsSubmitting(true);
    try {
      await api.put(`/reports/${editingReport.id}`, editingReport);
      setReports(reports.map(r => r.id === editingReport.id ? editingReport : r));
      setEditingReport(null);
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Failed to update report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "VERIFIED": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "PENDING": return <Clock className="h-4 w-4 text-amber-500" />;
      case "REJECTED": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-tealGlow" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "CRITICAL": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "HIGH": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "MEDIUM": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      default: return "text-tealGlow bg-tealGlow/10 border-tealGlow/20";
    }
  };

  return (
    <CitizenShell
      title="My Reports"
      subtitle="View and manage the incidents you've reported"
    >
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-panel flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">No reports found</h3>
            <p className="text-text-muted mt-2 max-w-xs">
              You haven&apos;t reported any incidents yet. When you do, they will appear here.
            </p>
            <button
              onClick={() => router.push("/citizen/report")}
              className="mt-6 px-6 py-2 bg-tealGlow text-night font-bold rounded-full shadow-glow-button hover:opacity-90 transition"
            >
              Report an Incident
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="glass-panel p-6 hover:border-tealGlow/30 transition-all group relative">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-text-primary capitalize">{report.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(report.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {report.address || report.landmark || "Location not provided"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 self-end md:self-start opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-primary transition"
                      title="Edit Report"
                      onClick={() => setEditingReport(report)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition"
                      title="Delete Report"
                      onClick={() => handleDelete(report.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-night/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg p-6 animate-fade-in relative">
            <button 
              onClick={() => setEditingReport(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-text-primary mb-6">Edit Report</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Title</label>
                <input 
                  type="text"
                  value={editingReport.title}
                  onChange={(e) => setEditingReport({...editingReport, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:border-tealGlow/50"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary">Description</label>
                <textarea 
                  value={editingReport.description}
                  onChange={(e) => setEditingReport({...editingReport, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:border-tealGlow/50 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Severity</label>
                  <select 
                    value={editingReport.severity}
                    onChange={(e) => setEditingReport({...editingReport, severity: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:border-tealGlow/50"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-primary">Category</label>
                  <input 
                    type="text"
                    value={editingReport.category}
                    onChange={(e) => setEditingReport({...editingReport, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:border-tealGlow/50"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingReport(null)}
                  className="flex-1 px-4 py-2 bg-white/5 text-text-primary font-medium rounded-full hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-tealGlow text-night font-bold rounded-full shadow-glow-button hover:opacity-90 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CitizenShell>
  );
}
