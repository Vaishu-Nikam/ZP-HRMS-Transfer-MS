import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePaymentStep4 } from "../../../../../services/employeeService";

const OtherSchemeForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [records, setRecords] = useState([
    { applicable: "", type: "", approvalDate: "", salary: "", applyDate: "" }
  ]);

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const addRow = () => {
    setRecords([
      ...records,
      { applicable: "", type: "", approvalDate: "", salary: "", applyDate: "" }
    ]);
  };

  const removeRow = (i) => {
    const data = records.filter((_, index) => index !== i);
    setRecords(data);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // 🔥 ONLY FIX HERE
  const handleSubmit = async () => {
    console.log("🔥 STEP4 CLICK");

    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // ✅ dropdown fix (object/string handle)
        const applicableValue =
          typeof item.applicable === "object"
            ? item.applicable.id
            : item.applicable;

        if (!applicableValue) {
          alert("सर्व माहिती भरा");
          return;
        }

        const payload = {
          user_id: userId,
          is_applicable: applicableValue === "होय" ? "true" : "false",
          scheme_type: item.type,
          approved_date: formatDate(item.approvalDate),
          revised_pay: item.salary,
          effective_date: formatDate(item.applyDate),
        };

        console.log("🚀 PAYLOAD:", payload);

        await savePaymentStep4(payload);
      }

      onNext();

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="इतर वेतन योजना माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >

      <div className="space-y-6">

        {records.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-slate-700">
                रेकॉर्ड {i + 1}
              </p>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* लागू आहे का */}
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  इतर योजना लागू आहे का?
                </p>
                <DropdownSearch
                  value={r.applicable}
                  onChange={(e) =>
                    handleChange(i, "applicable", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {/* ⚠️ UI SAME ठेवले (NO CHANGE) */}
              {r.applicable === "होय" && (
                <>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      इतर योजनाचा प्रकार
                    </p>
                    <Input
                      value={r.type}
                      onChange={(e) =>
                        handleChange(i, "type", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      मंजूर दिनांक
                    </p>
                    <DatePicker
                      value={r.approvalDate}
                      onChange={(val) =>
                        handleChange(i, "approvalDate", val)
                      }
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      निश्चित वेतन
                    </p>
                    <Input
                      value={r.salary}
                      onChange={(e) =>
                        handleChange(i, "salary", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      लागू दिनांक
                    </p>
                    <DatePicker
                      value={r.applyDate}
                      onChange={(val) =>
                        handleChange(i, "applyDate", val)
                      }
                    />
                  </div>
                </>
              )}

            </div>
          </div>
        ))}

        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>

    </EmployeeFormCard>
  );
};

export default OtherSchemeForm;