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

  // ✅ Date format
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // ✅ Submit
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // ✅ Validation
        if (!item.applicable) {
          alert("कृपया 'इतर योजना लागू आहे का?' निवडा");
          return;
        }

        if (item.applicable === "होय") {
          if (!item.type || !item.approvalDate || !item.salary || !item.applyDate) {
            alert("सर्व माहिती भरा");
            return;
          }
        }

        const payload = {
          user_id: userId,
          is_applicable: item.applicable === "होय" ? "true" : "false",
          scheme_type: item.type || "",
          approved_date: formatDate(item.approvalDate),
          revised_pay: item.salary || "",
          effective_date: formatDate(item.applyDate),
        };

        console.log("PAYLOAD:", payload);

        await savePaymentStep4(payload);
      }

      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.message || "API Error");
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  const addRow = () => {
    setRecords([
      ...records,
      { applicable: "", type: "", approvalDate: "", salary: "", applyDate: "" }
    ]);
  };

  const removeRow = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
  };

  return (
    <EmployeeFormCard
      title="१३. इतर वेतन योजना माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-6">

        {records.map((r, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-slate-700">
                रेकॉर्ड {index + 1}
              </p>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* लागू आहे का */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  इतर योजना लागू आहे का?
                </label>
                <DropdownSearch
                  value={r.applicable}
                  onChange={(e) =>
                    handleChange(index, "applicable", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {r.applicable === "होय" && (
                <>

                  {/* योजना प्रकार */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      इतर योजनाचा प्रकार
                    </label>
                    <Input
                      placeholder="उदा. 7th Pay"
                      value={r.type}
                      onChange={(e) =>
                        handleChange(index, "type", e.target.value)
                      }
                    />
                  </div>

                  {/* मंजुरी दिनांक */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      योजना मंजूर केल्याचा दिनांक
                    </label>
                    <DatePicker
                      value={r.approvalDate}
                      onChange={(val) =>
                        handleChange(index, "approvalDate", val)
                      }
                      placeholder="dd/MM/yyyy"
                    />
                  </div>

                  {/* वेतन */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      नंतर निश्चित झालेले वेतन
                    </label>
                    <Input
                      placeholder="उदा. 45000"
                      value={r.salary}
                      onChange={(e) =>
                        handleChange(index, "salary", e.target.value)
                      }
                    />
                  </div>

                  {/* लागू दिनांक */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      योजना लागू केल्याचा दिनांक
                    </label>
                    <DatePicker
                      value={r.applyDate}
                      onChange={(val) =>
                        handleChange(index, "applyDate", val)
                      }
                      placeholder="dd/MM/yyyy"
                    />
                  </div>

                </>
              )}

            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default OtherSchemeForm;