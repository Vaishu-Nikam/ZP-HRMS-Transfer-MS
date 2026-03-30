import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../common/Card";
import { Users, FileText, MapPin, BarChart3, Filter, ArrowRight } from "lucide-react";
// import api from "../../services/api";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4 transition-all duration-200 hover:shadow-md">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
    </div>
  </div>
);

export const DistrictStatsPanel = ({ selectedDistrict, allDistrictsData = [] }) => {
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Calculate totals
  const totalPosts = allDistrictsData.reduce((sum, d) => sum + (d.post_count || 0), 0);
  const totalApplications = allDistrictsData.reduce((sum, d) => sum + (d.application_count || 0), 0);
  const totalDistricts = allDistrictsData.length;

  const data = selectedDistrict || {
    district_name: "Maharashtra State",
    post_count: totalPosts,
    application_count: totalApplications,
    isTotal: true,
  };

  // Fetch components on mount
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await api.get("/masters/components");
        if (res.data?.success) {
          setComponents(res.data.data || []);
        }
      } catch (error) {
        console.error("Failed to load components:", error);
      }
    };
    fetchComponents();
  }, []);

  // Fetch posts when district or component changes
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedDistrict) {
        setPosts([]);
        return;
      }

      setLoadingPosts(true);
      try {
        const params = {
          district_id: selectedDistrict.district_id,
          is_active: true,
        };
        if (selectedComponent) {
          params.component_id = selectedComponent;
        }

        const res = await api.get("/masters/posts", { params });
        if (res.data?.success) {
          const postsData = res.data.data;
          if (Array.isArray(postsData)) {
            setPosts(postsData);
          } else if (postsData?.posts && Array.isArray(postsData.posts)) {
            setPosts(postsData.posts);
          } else {
            setPosts([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [selectedDistrict, selectedComponent]);

  const handlePostClick = (post) => {
    navigate(`/review/posts/${post.post_id}?district_id=${selectedDistrict?.district_id || ""}`);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Card
        title={data.district_name}
        description={data.isTotal ? "State-wide Summary" : "District Details"}
        className="border-0 shadow-none bg-transparent p-0"
      >
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <StatCard
            title="Total Posts"
            value={data.post_count.toLocaleString()}
            icon={FileText}
            colorClass="bg-blue-500 text-white"
          />

          <StatCard
            title="Total Applications"
            value={data.application_count.toLocaleString()}
            icon={Users}
            colorClass="bg-emerald-500 text-white"
          />

          {!data.isTotal && (
            <StatCard
              title="Competition Ratio"
              value={data.post_count > 0 ? (data.application_count / data.post_count).toFixed(1) : "0"}
              icon={BarChart3}
              colorClass="bg-purple-500 text-white"
            />
          )}

          {data.isTotal && (
            <StatCard
              title="Total Districts"
              value={totalDistricts}
              icon={MapPin}
              colorClass="bg-orange-500 text-white"
            />
          )}
        </div> */}

        {!data.isTotal && (
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h4 className="text-lg font-semibold text-slate-900">District Posts</h4>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  className="w-full sm:w-auto text-sm border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 py-2 pl-3 pr-8 shadow-sm"
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value)}
                >
                  <option value="">All Components</option>
                  {components.map((c) => (
                    <option key={c.component_id} value={c.component_id}>
                      {c.component_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Post Name</th>
                      <th className="px-6 py-4 text-center">Positions</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingPosts ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                          <div className="flex justify-center mb-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          </div>
                          Loading posts...
                        </td>
                      </tr>
                    ) : posts.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                          No posts found for this selection.
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.post_id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">
                            <div>{post.post_name}</div>
                            <div className="text-xs text-slate-500 mt-0.5 font-normal">{post.post_code}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              {post.total_positions}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handlePostClick(post)}
                              className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Merit List <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {data.isTotal && (
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Top Districts by Applications</h4>
            <div className="space-y-3">
              {[...allDistrictsData]
                .sort((a, b) => b.application_count - a.application_count)
                .slice(0, 5)
                .map((d, i) => (
                  <div key={d.district_id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border ${
                          i === 0
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : i === 1
                            ? "bg-slate-50 text-slate-700 border-slate-200"
                            : i === 2
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : "bg-white text-slate-500 border-slate-200"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-medium text-slate-700">{d.district_name}</span>
                    </div>
                    {/* <span className="text-sm font-bold text-slate-900">{d.application_count.toLocaleString()}</span> */}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

