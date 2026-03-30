import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  Shield,
  ChevronDown,
  Globe,
  Database,
  MapPin,
  Building2,
  FileText,
  Award,
  ClipboardCheck,
  Briefcase,
  UserSquare,
} from "lucide-react";
import { cn } from "../../../utils/cn";
import { useSidebar } from "./useSidebar";
import { PermissionGuard } from "../../auth/PermissionGuard";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Shield, label: "Roles & Permissions", path: "/roles" },
  { icon: Users, label: "Users", path: "/users" },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { openSection, toggleSection, handleLogout } = useSidebar();
  const hasAnyMaster = true;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col min-h-full",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex h-[6px]">
            <div className="flex-1 bg-orange-500" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-green-500" />
          </div>

          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold">Zilla Parishad</div>
                <div className="text-[11px] opacity-90">HRMS & Transfer Management System</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-white/20 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">

          {/* ── Main Menu ── */}
          <div className="text-[11px] font-bold text-gray-500 px-3 pb-2 uppercase tracking-wider">
            Main Menu
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <item.icon size={17} />
              </div>
              {item.label}
            </NavLink>
          ))}

          {/* ── Management ── */}
          <div className="text-[11px] font-bold text-gray-500 px-3 pt-4 pb-2 uppercase tracking-wider">
            Management
          </div>

          {/* Master Data Dropdown */}
          {hasAnyMaster && (
            <>
              <button
                onClick={() => toggleSection("masters")}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  openSection === "masters"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-500"
                    : "text-gray-700 border-transparent hover:bg-gray-50 hover:text-indigo-700 hover:border-indigo-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                    <Database size={17} />
                  </div>
                  Master Data
                </div>
                <ChevronDown
                  size={17}
                  className={cn(
                    "transition-transform duration-200",
                    openSection === "masters" && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ml-7 mt-1",
                  openSection === "masters"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="space-y-0.5 border-l-2 border-gray-100 pl-2 ml-2">

                  <PermissionGuard permissions="masters.departments.view" fallback={null}>
                    <NavLink
                      to="/masters/departments"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <Building2 size={14} />
                      Departments
                    </NavLink>
                  </PermissionGuard>

                  <PermissionGuard permissions="masters.districts.view" fallback={null}>
                    <NavLink
                      to="/masters/districts"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <MapPin size={14} />
                      Districts
                    </NavLink>
                  </PermissionGuard>

                  <PermissionGuard permissions="masters.caste.view" fallback={null}>
                    <NavLink
                      to="/masters/caste"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <UserSquare size={14} />
                      Caste
                    </NavLink>
                  </PermissionGuard>

                  <PermissionGuard permissions="masters.cadre.view" fallback={null}>
                    <NavLink
                      to="/masters/cadre"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <Shield size={14} />
                      Cadre
                    </NavLink>
                  </PermissionGuard>

                  <PermissionGuard permissions="masters.designation.view" fallback={null}>
                    <NavLink
                      to="/masters/designation"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <Award size={14} />
                      Designation
                    </NavLink>
                  </PermissionGuard>

                  <PermissionGuard permissions="masters.office.view" fallback={null}>
                    <NavLink
                      to="/masters/office"
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all",
                          isActive
                            ? "text-blue-700 bg-blue-50 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                        )
                      }
                    >
                      <Building2 size={14} />
                      Office
                    </NavLink>
                  </PermissionGuard>

                </div>
              </div>
            </>
          )}

          {/* Employees */}
          <PermissionGuard permissions="employees.view" fallback={null}>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <Users size={17} />
              </div>
              Employees
            </NavLink>
          </PermissionGuard>

          {/* Roster */}
          <PermissionGuard permissions="roster.view" fallback={null}>
            <NavLink
              to="/roster"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <ClipboardCheck size={17} />
              </div>
              Roster
            </NavLink>
          </PermissionGuard>

          {/* Transfer */}
          <PermissionGuard permissions="transfer.view" fallback={null}>
            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <Briefcase size={17} />
              </div>
              Transfer
            </NavLink>
          </PermissionGuard>

          {/* Appraisal */}
          <PermissionGuard permissions="appraisal.view" fallback={null}>
            <NavLink
              to="/appraisal"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <Award size={17} />
              </div>
              Appraisal
            </NavLink>
          </PermissionGuard>

          {/* Reports */}
          <PermissionGuard permissions="reports.view" fallback={null}>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                    : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                )
              }
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                <FileText size={17} />
              </div>
              Reports
            </NavLink>
          </PermissionGuard>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-4",
                isActive
                  ? "bg-blue-50 text-blue-700 border-blue-500 shadow-sm"
                  : "text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
              )
            }
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
              <Settings size={17} />
            </div>
            Settings
          </NavLink>

        </nav>

        {/* FOOTER */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-sm transition-all hover:bg-gray-50">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">Admin Officer</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};