import React, { useEffect, useMemo, useState } from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import { feature, merge } from 'topojson-client';
import { scaleLinear } from 'd3-scale';

// Mapping old district names from topojson to new database names (normalized, lowercase)
const DISTRICT_NAME_MAPPING = {
  'aurangabad': 'chatrapati shambhaji nagar',
  'chhatrapati sambhajinagar': 'chatrapati shambhaji nagar',
  'sambhajinagar': 'chatrapati shambhaji nagar',
  'osmanabad': 'dharashiv',
  'ahmednagar': 'ahilyanagar',
  'bombay': 'mumbai',
  'bombay city': 'mumbai',
  'bombay suburban': 'mumbai',
  'mumbai suburban': 'mumbai',
  'mumbai sub': 'mumbai',
  'mumbai city': 'mumbai',
  'mumbai city district': 'mumbai',
  'mumbai suburban district': 'mumbai',
  'mumbai district': 'mumbai',
  'mumbai': 'mumbai',
  'bid': 'beed',
  'yavatmal': 'yawatmal',
  'thane district': 'thane',
};

const DIVISION_MAPPING = {
  'akola': 'Amravati',
  'amravati': 'Amravati',
  'buldhana': 'Amravati',
  'washim': 'Amravati',
  'yawatmal': 'Amravati',
  'chatrapati shambhaji nagar': 'Aurangabad',
  'beed': 'Aurangabad',
  'hingoli': 'Aurangabad',
  'jalna': 'Aurangabad',
  'latur': 'Aurangabad',
  'nanded': 'Aurangabad',
  'dharashiv': 'Aurangabad',
  'parbhani': 'Aurangabad',
  'mumbai': 'Konkan',
  'palghar': 'Konkan',
  'raigad': 'Konkan',
  'ratnagiri': 'Konkan',
  'sindhudurg': 'Konkan',
  'thane': 'Konkan',
  'bhandara': 'Nagpur',
  'chandrapur': 'Nagpur',
  'gadchiroli': 'Nagpur',
  'gondia': 'Nagpur',
  'nagpur': 'Nagpur',
  'wardha': 'Nagpur',
  'ahilyanagar': 'Nashik',
  'dhule': 'Nashik',
  'jalgaon': 'Nashik',
  'nandurbar': 'Nashik',
  'nashik': 'Nashik',
  'kolhapur': 'Pune',
  'pune': 'Pune',
  'sangli': 'Pune',
  'satara': 'Pune',
  'solapur': 'Pune',
};

const divisionHues = {
  'Amravati': 20,
  'Aurangabad': 60,
  'Konkan': 140,
  'Nagpur': 180,
  'Nashik': 240,
  'Pune': 300,
};

const divisions = ['Konkan', 'Pune', 'Nashik', 'Aurangabad', 'Amravati', 'Nagpur'];

const normalizeName = (name = '') =>
  name.toLowerCase().trim().replace(/\s+/g, ' ');

const formatDistrictName = (name = '') => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const canonicalDistrictName = (raw = '') => {
  const normalized = normalizeName(raw);
  return DISTRICT_NAME_MAPPING[normalized] || normalized;
};

const hexToRgb = (hex) => {
  const parsed = hex.replace('#', '');
  const bigint = parseInt(parsed, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const rgbToHex = ({ r, g, b }) =>
  '#' +
  [r, g, b]
    .map((v) => {
      const h = v.toString(16);
      return h.length === 1 ? '0' + h : h;
    })
    .join('');

const mixHex = (fromHex, toHex, t) => {
  const a = hexToRgb(fromHex);
  const b = hexToRgb(toHex);
  const mix = (ax, bx) => Math.round(ax + (bx - ax) * t);
  return rgbToHex({ r: mix(a.r, b.r), g: mix(a.g, b.g), b: mix(a.b, b.b) });
};

const hslToHex = (h, s, l) => {
  const a = s * Math.min(l, 100 - l) / 10000;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1) * 100;
    return Math.round(color * 2.55)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const MaharashtraMap = ({ summaryData = [], onDistrictSelect, selectedDistrictName }) => {
  const [geographies, setGeographies] = useState([]);
  const [stateBoundary, setStateBoundary] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: null });
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  useEffect(() => {
    fetch('maps/maharashtra.topo.json')
      .then(res => res.json())
      .then(topo => {
        const geo = feature(topo, topo.objects.districts);
        setGeographies(geo.features);
        
        const merged = merge(topo, topo.objects.districts.geometries);
        setStateBoundary(merged);
      })
      .catch(err => console.error('Failed to load map topology:', err));
  }, []);

  const summaryLookup = useMemo(() => {
    const aggregated = {};
    summaryData.forEach((district) => {
      const key = canonicalDistrictName(district.district_name);
      if (!key) return;
      if (!aggregated[key]) {
        aggregated[key] = {
          district_name: formatDistrictName(key),
          application_count: 0,
          post_count: 0,
        };
      }
      aggregated[key].application_count += district.application_count ?? 0;
      aggregated[key].post_count += district.post_count ?? 0;
    });
    return aggregated;
  }, [summaryData]);

  const getDistrictNameForMatching = (mapDistrictName) => {
    return canonicalDistrictName(mapDistrictName);
  };

  const { path, viewBox } = useMemo(() => {
    if (geographies.length === 0) return { path: null, viewBox: '0 0 800 600' };
    const size = [800, 600];
    const projection = geoMercator().fitSize(size, { type: 'FeatureCollection', features: geographies });
    const p = geoPath().projection(projection);
    return { path: p, viewBox: `0 0 ${size[0]} ${size[1]}` };
  }, [geographies]);

  const palette = useMemo(() => {
    const districtColors = {};
    const divisionDistricts = {};
    geographies.forEach((geo) => {
      const districtKey = getDistrictNameForMatching(geo.properties.district);
      const division = DIVISION_MAPPING[districtKey] || 'Unknown';
      if (!divisionDistricts[division]) divisionDistricts[division] = [];
      if (!divisionDistricts[division].includes(districtKey)) {
        divisionDistricts[division].push(districtKey);
      }
    });

    Object.keys(divisionDistricts).forEach((division) => {
      const districts = divisionDistricts[division].sort();
      const n = districts.length;
      const baseHue = divisionHues[division] || 0;
      const hueSpread = 30;
      districts.forEach((dist, i) => {
        const offset = n > 1 ? (i / (n - 1) - 0.5) * hueSpread : 0;
        const hue = (baseHue + offset + 360) % 360;
        districtColors[dist] = hslToHex(hue, 70, 55);
      });
    });
    return districtColors;
  }, [geographies]);

  // Base color for each division (using average hue)
  const divisionColors = useMemo(() => {
    return divisions.reduce((acc, div) => {
      acc[div] = hslToHex(divisionHues[div], 70, 55);
      return acc;
    }, {});
  }, []);

  const { intensityScale, maxMetric } = useMemo(() => {
    const counts = summaryData.map(d => d.application_count ?? d.post_count ?? 0);
    const max = Math.max(...counts, 1);
    const scale = scaleLinear()
      .domain([0, max])
      .range([0.08, 1])
      .clamp(true);
    return { intensityScale: scale, maxMetric: max };
  }, [summaryData]);

  const handleMouseMove = (e, name, data, districtKey) => {
    setHoveredDistrict(districtKey);
    setTooltip({
      show: true,
      x: e.clientX,
      y: e.clientY,
      content: {
        name,
        posts: data?.post_count || 0,
        apps: data?.application_count || 0
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredDistrict(null);
    setTooltip(prev => ({ ...prev, show: false }));
  };

  if (!geographies.length || !path) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] text-slate-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div>Loading Map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
      <svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className="drop-shadow-md">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g className="districts">
          {geographies.map((geo, i) => {
            const mapDistrictName = geo.properties.district;
            const districtNameForMatching = getDistrictNameForMatching(mapDistrictName);
            const data = summaryLookup[districtNameForMatching];
            const isSelected = selectedDistrictName && normalizeName(selectedDistrictName) === districtNameForMatching;
            const isHovered = hoveredDistrict === districtNameForMatching;

            const displayName = data?.district_name || formatDistrictName(mapDistrictName);
            const metric = data?.application_count ?? data?.post_count ?? 0;
            const baseColor = palette[districtNameForMatching] || '#94a3b8';
            const intensity = intensityScale(metric);

            let fillColor = mixHex('#ffffff', baseColor, intensity);
            if (isHovered || isSelected) {
              fillColor = mixHex(fillColor, baseColor, 0.4);
            }
            if (isSelected) {
              fillColor = '#2563eb';
            }

            return (
              <path
                key={`path-${i}`}
                d={path(geo)}
                className="transition-all duration-300 cursor-pointer outline-none"
                style={{
                  fill: fillColor,
                  stroke: '#1e293b',
                  strokeWidth: isHovered || isSelected ? '2.5' : '1.2',
                  strokeLinejoin: 'round',
                  filter: isSelected ? 'url(#glow)' : 'none',
                  opacity: 1
                }}
                onClick={() =>
                  onDistrictSelect &&
                  onDistrictSelect(
                    data || {
                      district_id: null,
                      district_name: displayName,
                      post_count: 0,
                      application_count: 0
                    }
                  )
                }
                onMouseMove={(e) => handleMouseMove(e, displayName, data, districtNameForMatching)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </g>

        {/* State boundary outline */}
        {stateBoundary && (
          <path
            d={path(stateBoundary)}
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.8"
            strokeLinejoin="round"
            className="pointer-events-none"
          />
        )}
      </svg>

      {/* Division Legend in bottom-right (south-east) corner */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-lg shadow-lg border border-slate-200 max-w-[200px]">
        <div className="text-xs font-semibold text-slate-700 mb-2">Divisions</div>
        <div className="space-y-1.5">
          {divisions.map((div) => (
            <div key={div} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-slate-300"
                style={{ backgroundColor: divisionColors[div] }}
              />
              <span className="text-xs text-slate-600">{div}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && tooltip.content && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 10}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-slate-700 backdrop-blur-sm">
            <div className="font-semibold text-sm mb-2 text-slate-100">{tooltip.content.name}</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-300">Posts:</span>
                <span className="font-mono font-medium text-blue-300">{tooltip.content.posts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-slate-300">Applications:</span>
                <span className="font-mono font-medium text-emerald-300">{tooltip.content.apps.toLocaleString()}</span>
              </div>
              {maxMetric > 0 && (
                <div className="pt-2 mt-2 border-t border-slate-700 text-[10px] text-slate-400">
                  Activity: {Math.round((tooltip.content.apps / maxMetric) * 100)}% of max
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaharashtraMap;