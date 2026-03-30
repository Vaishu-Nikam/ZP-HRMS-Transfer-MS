// import React, { useState, useEffect } from 'react';
// import { PageHeader } from '../components/common/PageHeader';
// import MaharashtraMap from '../components/dashboard/MaharashtraMap';
// import { DistrictStatsPanel } from '../components/dashboard/DistrictStatsPanel';
// import api from '../services/api';

// const Dashboard = () => {
//   const [summaryData, setSummaryData] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await api.get('/admin/dashboard/summary-by-district');
//         if (response.data?.success) {
//           setSummaryData(response.data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch dashboard summary:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleDistrictSelect = (districtData) => {
//     // If clicking the same district, deselect it
//     if (selectedDistrict?.district_name === districtData.district_name) {
//       setSelectedDistrict(null);
//     } else {
//       setSelectedDistrict(districtData);
//     }
//   };

//   return (
//     <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
//       <PageHeader
//         title="Dashboard"
//         description="Overview of recruitment posts and applications across Maharashtra"
//       />
      
//       {loading ? (
//         <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed">
//           <p className="text-slate-500">Loading dashboard data...</p>
//         </div>
//       ) : (
//         <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
//           {/* Map Section - 60% on large screens */}
//           <div className="w-full lg:w-[60%] h-[500px] lg:h-auto min-h-[400px]">
//             <MaharashtraMap 
//               summaryData={summaryData}
//               onDistrictSelect={handleDistrictSelect}
//               selectedDistrictName={selectedDistrict?.district_name}
//             />
//           </div>

//           {/* Stats Panel - 40% on large screens */}
//           <div className="w-full lg:w-[40%] h-auto lg:h-auto overflow-y-auto">
//             <DistrictStatsPanel 
//               selectedDistrict={selectedDistrict}
//               allDistrictsData={summaryData}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import MaharashtraMap from '../components/dashboard/MaharashtraMap';
import { DistrictStatsPanel } from '../components/dashboard/DistrictStatsPanel';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        district_name: "Gondia",
        total_posts: 7,
        total_applications: 0,
      },
      {
        district_name: "AHILYANAGAR",
        total_posts: 10,
        total_applications: 2,
      },
      {
        district_name: "AKOLA",
        total_posts: 5,
        total_applications: 0,
      },
      {
        district_name: "PUNE",
        total_posts: 20,
        total_applications: 5,
      },
      {
        district_name: "NAGPUR",
        total_posts: 15,
        total_applications: 3,
      },
    ];

    setSummaryData(dummyData);
    setLoading(false);
  }, []);

  const handleDistrictSelect = (districtData) => {
    if (selectedDistrict?.district_name === districtData.district_name) {
      setSelectedDistrict(null);
    } else {
      setSelectedDistrict(districtData);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <PageHeader
        title="Dashboard"
        description="Overview of recruitment posts and applications across Maharashtra"
      />
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed">
          <p className="text-slate-500">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
          
          {/* Map */}
          <div className="w-full lg:w-[60%] h-[500px] lg:h-auto min-h-[400px]">
            <MaharashtraMap 
              summaryData={summaryData}
              onDistrictSelect={handleDistrictSelect}
              selectedDistrictName={selectedDistrict?.district_name}
            />
          </div>

          {/* Stats */}
          <div className="w-full lg:w-[40%] h-auto lg:h-auto overflow-y-auto">
            <DistrictStatsPanel 
              selectedDistrict={selectedDistrict}
              allDistrictsData={summaryData}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;

