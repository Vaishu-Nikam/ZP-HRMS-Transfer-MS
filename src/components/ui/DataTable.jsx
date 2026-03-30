import React, { useState, useRef } from "react";
import { ArrowDown, ArrowUp, Search, Trash2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { Pagination } from "../common/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { usePermission } from "../../hooks/usePermission";
import { ConfirmationModal } from "../common/ConfirmationModal";

export function DataTable({
  columns,
  data,
  isLoading,
  onSearch,
  onSort,
  onDelete,
  deletePermission,
  onSelectionChange,
  pagination,
  rowKey = "id",
  selectionResetKey,
  enableSelection = true,
  showRowNumbers = false,
  rowNumberHeader = "Sr No.",
  extraHeaderContent,
  rowClassName = "",
}) {
  const { hasPermission } = usePermission();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [sortConfig, setSortConfig] = useState(null);
  const [pendingSearch, setPendingSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemsPendingDelete, setItemsPendingDelete] = useState([]);
  const hasSentInitialSearch = useRef(false);

  const tableData = Array.isArray(data) ? data : [];
  const canDelete = deletePermission ? hasPermission(deletePermission) : true;
  const debouncedSearch = useDebounce(pendingSearch, 300);

  React.useEffect(() => {
    if (!onSearch) return;
    if (!hasSentInitialSearch.current) {
      hasSentInitialSearch.current = true;
      return;
    }
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  React.useEffect(() => {
    if (enableSelection && onSelectionChange) {
      const selectedList = tableData.filter((item) =>
        selectedItems.has(String(item[rowKey]))
      );
      onSelectionChange(selectedList);
    }
  }, [enableSelection, selectedItems, onSelectionChange]);

  React.useEffect(() => {
    if (selectionResetKey !== undefined) setSelectedItems(new Set());
  }, [selectionResetKey]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
    if (onSort) onSort(key, direction);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(new Set(tableData.map((item) => String(item[rowKey]))));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectOne = (id) => {
    const newSelected = new Set(selectedItems);
    const strId = String(id);
    newSelected.has(strId) ? newSelected.delete(strId) : newSelected.add(strId);
    setSelectedItems(newSelected);
  };

  const handleDeleteClick = (items) => {
    setItemsPendingDelete(Array.isArray(items) ? items : [items]);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (onDelete && itemsPendingDelete.length > 0) {
      await onDelete(itemsPendingDelete);
      setSelectedItems(new Set());
      setItemsPendingDelete([]);
    }
    setShowDeleteModal(false);
  };

  const leadingColumnCount = (enableSelection ? 1 : 0) + (showRowNumbers ? 1 : 0);
  const totalColumnCount = columns.length + leadingColumnCount;

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">

      {/* ── Toolbar ── */}
      <div className="px-5 py-3.5 flex flex-col sm:flex-row justify-between gap-3 sm:items-center bg-slate-50 border-b border-slate-200">

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            placeholder="Search records..."
            value={pendingSearch}
            onChange={(e) => {
              setPendingSearch(e.target.value);
              if (pagination?.onPageChange) pagination.onPageChange(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {extraHeaderContent}
          {enableSelection && selectedItems.size > 0 && canDelete && onDelete && (
            <button
              onClick={() =>
                handleDeleteClick(
                  tableData.filter((item) => selectedItems.has(String(item[rowKey])))
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete ({selectedItems.size})
            </button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setItemsPendingDelete([]); }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${itemsPendingDelete.length} item(s)? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="min-w-full">

          {/* ── Header ── */}
          <thead>
            <tr className="bg-blue-600/90 border-b-0">
              {enableSelection && (
                <th scope="col" className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-blue-400 bg-blue-600 accent-white cursor-pointer"
                    onChange={handleSelectAll}
                    checked={tableData.length > 0 && selectedItems.size === tableData.length}
                  />
                </th>
              )}

              {showRowNumbers && (
                <th scope="col" className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-blue-200">
                  {rowNumberHeader}
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  scope="col"
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    "px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-blue-200 select-none transition-colors",
                    column.sortable && "cursor-pointer hover:text-white",
                    column.className
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-1.5",
                    column.className?.includes("text-center") && "justify-center",
                    column.className?.includes("text-right") && "justify-end"
                  )}>
                    {column.header}
                    {sortConfig?.key === column.key ? (
                      sortConfig.direction === "asc"
                        ? <ArrowUp className="h-3 w-3 text-blue-200" />
                        : <ArrowDown className="h-3 w-3 text-blue-200" />
                    ) : (
                      column.sortable && (
                        <ArrowUp className="h-3 w-3 text-blue-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={totalColumnCount} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
                      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-700 animate-spin" />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Loading records…</p>
                  </div>
                </td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan={totalColumnCount} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
                      <Search className="h-6 w-6 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">No records found</p>
                      <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              tableData.map((item, index) => {
                if (!item) return null;
                const safeItem = item || {};
                const itemId = String(safeItem[rowKey]);
                const isSelected = selectedItems.has(itemId);

                return (
                  <tr
                    key={itemId || `row-${index}`}
                    className={cn(
                      "transition-colors duration-100",
                      isSelected
                        ? "bg-blue-50"
                        : index % 2 === 0
                          ? "bg-white hover:bg-blue-50/40"
                          : "bg-slate-50/50 hover:bg-blue-50/40",
                      rowClassName
                    )}
                  >
                    {enableSelection && (
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 accent-blue-700 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleSelectOne(itemId)}
                        />
                      </td>
                    )}

                    {showRowNumbers && (
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 tabular-nums">
                          {pagination
                            ? (pagination.currentPage - 1) * pagination.pageSize + index + 1
                            : index + 1}
                        </span>
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "px-5 py-3.5 text-sm text-slate-700 align-middle",
                          column.className
                        )}
                      >
                        {column.render
                          ? column.render(safeItem[column.key], safeItem, {
                              onDelete: () => handleDeleteClick(safeItem),
                            })
                          : safeItem[column.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      {pagination && (
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">

          {/* Left — page size + count */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            {pagination.pageSizeOptions && pagination.onPageSizeChange && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Rows per page</span>
                <select
                  value={pagination.pageSize}
                  onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                  className="border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-500 cursor-pointer transition-all"
                >
                  {pagination.pageSizeOptions.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            <span className="text-slate-400">
              {(() => {
                const pageSize = pagination.pageSize || tableData.length || 0;
                const currentPage = pagination.currentPage || 1;
                let totalCount = pagination.totalItems ?? pagination.total;
                if (totalCount === undefined) {
                  totalCount = (currentPage - 1) * pageSize + tableData.length;
                }
                const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
                const end = Math.min(currentPage * pageSize, totalCount || currentPage * pageSize);
                return (
                  <>
                    Showing{" "}
                    <span className="font-bold text-slate-600">{start}</span>
                    {" "}–{" "}
                    <span className="font-bold text-slate-600">{end}</span>
                    {" "}of{" "}
                    <span className="font-bold text-slate-600">{totalCount}</span>
                    {" "}results
                  </>
                );
              })()}
            </span>
          </div>

          {/* Right — Pagination */}
          <div className="flex justify-center sm:justify-end">
            <Pagination
              key={`pagination-${pagination.currentPage}`}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange || (() => {})}
            />
          </div>
        </div>
      )}
    </div>
  );
}