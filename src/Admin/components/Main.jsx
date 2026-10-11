import React, { useState, useEffect } from "react";
import {
  Mail,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Send,
  Loader2,
} from "lucide-react";

import Table from "./Table";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getEmailSubByAdmin } from "../../api/subscribe";
import { getBlogs } from "../../api/Blog";
import { getMonthlyReaders } from "../../api/analytics";

// Small reusable loader used inside cards
const CardLoader = () => (
  <div className="flex items-center gap-2 text-slate-400">
    <Loader2 size={20} className="animate-spin" />
    <span className="text-xs">Loading...</span>
  </div>
);

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subscribers, setSubscribers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    viewsThisMonth: 0,
    viewsLastMonth: 0,
    monthlyReaders: 0,
    lastMonthReaders: 0,
    viewsPercentageChange: 0,
    readersPercentageChange: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [subscribersResponse, blogsResponse, analyticsResponse] =
          await Promise.all([
            getEmailSubByAdmin(),
            getBlogs(),
            getMonthlyReaders(),
          ]);

        // Subscribers
        const subscriberList = Array.isArray(subscribersResponse)
          ? subscribersResponse
          : subscribersResponse?.subscribers ||
            subscribersResponse?.data ||
            [];
        setSubscribers(subscriberList);

        // Blog posts
        const blogList = Array.isArray(blogsResponse)
          ? blogsResponse
          : blogsResponse?.blogs || blogsResponse?.data || [];
        setPosts(blogList);

        // Analytics
        setAnalytics({
          totalViews: analyticsResponse?.totalViews ?? 0,
          viewsThisMonth: analyticsResponse?.viewsThisMonth ?? 0,
          viewsLastMonth: analyticsResponse?.viewsLastMonth ?? 0,
          monthlyReaders: analyticsResponse?.monthlyReaders ?? 0,
          lastMonthReaders: analyticsResponse?.lastMonthReaders ?? 0,
          viewsPercentageChange:
            analyticsResponse?.viewsPercentageChange ?? 0,
          readersPercentageChange:
            analyticsResponse?.readersPercentageChange ?? 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const getPercentageColor = (percentage) => {
    if (percentage > 0) return "text-emerald-600";
    if (percentage < 0) return "text-red-600";
    return "text-slate-400";
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a1128] via-[#001f54] to-[#034078] rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-serif font-semibold">
            Welcome back, {user?.name?.split(" ")[0] || "admin"}! 👋
          </h2>

          <p className="text-slate-300 text-sm mt-1">
            Here's a snapshot of your blog's performance.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/all-post")}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm text-white transition-all w-full sm:w-auto text-center shrink-0"
        >
          View Live Blog
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Subscribers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Subscribers</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Mail size={20} />
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
                {subscribers.length.toLocaleString()}
              </h3>
            )}
          </div>
        </div>

        {/* Published Articles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Published Articles</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <FileText size={20} />
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
                {posts.length.toLocaleString()}
              </h3>
            )}

            <span className="text-slate-400 text-xs mt-1 block">
              All published posts
            </span>
          </div>
        </div>

        {/* Monthly Readers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Monthly Readers</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Eye size={20} />
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
                  {analytics.monthlyReaders.toLocaleString()}
                </h3>

                <span
                  className={`${getPercentageColor(
                    analytics.readersPercentageChange
                  )} text-xs font-semibold flex items-center gap-1 mt-1`}
                >
                  {analytics.readersPercentageChange > 0 ? (
                    <TrendingUp size={12} />
                  ) : analytics.readersPercentageChange < 0 ? (
                    <TrendingDown size={12} />
                  ) : null}

                  {analytics.readersPercentageChange > 0 ? "+" : ""}
                  {analytics.readersPercentageChange}% vs last month
                </span>
              </>
            )}
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Views</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Eye size={20} />
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
                {analytics.totalViews.toLocaleString()}
              </h3>
            )}

            <span className="text-slate-400 text-xs mt-1 block">
              All-time blog views
            </span>
          </div>
        </div>

        {/* Views This Month */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Views This Month</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
                  {analytics.viewsThisMonth.toLocaleString()}
                </h3>

                <span className="text-slate-400 text-xs mt-1 block">
                  Last month: {analytics.viewsLastMonth.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Monthly Growth</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              {analytics.viewsPercentageChange > 0 ? (
                <TrendingUp size={20} />
              ) : analytics.viewsPercentageChange < 0 ? (
                <TrendingDown size={20} />
              ) : (
                <TrendingUp size={20} />
              )}
            </div>
          </div>

          <div className="mt-4">
            {loading ? (
              <CardLoader />
            ) : (
              <>
                <h3
                  className={`text-2xl sm:text-3xl font-bold ${getPercentageColor(
                    analytics.viewsPercentageChange
                  )}`}
                >
                  {analytics.viewsPercentageChange > 0 ? "+" : ""}
                  {analytics.viewsPercentageChange}%
                </h3>

                <span className="text-slate-400 text-xs mt-1 block">
                  Compared with last month
                </span>
              </>
            )}
          </div>
        </div>

        {/* Campaigns Sent */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Campaigns Sent</span>

            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Send size={20} />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">
              —
            </h3>

            <span className="text-slate-400 text-xs mt-1 block">
              Coming soon
            </span>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <Table subscribers={subscribers} loading={loading} />
    </div>
  );
};

export default Main;