import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePaymentStep2 } from "../../../../../services/employeeService";

const SalaryIncrementForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [records, setRecords] = useState([
    {
      year: "",
      amount: "",
      incrementDate: "",
      applyDate: "",
      isAdvance: "",
      file: null,
    },
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

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File < 2MB");
      return;
    }
    handleChange(i, "file", file);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        year: "",
        amount: "",
        incrementDate: "",
        applyDate: "",
        isAdvance: "",
        file: null,
      },
    ]);
  };

  const removeRow = (i) => {
    const data = records.filter((_, index) => index !== i);
    setRecords(data);
  };

  // ✅ SAME AS REFERENCE
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // ✅ REFERENCE STYLE SUBMIT
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // ✅ validation
        if (
          !item.year ||
          !item.amount ||
          !item.incrementDate ||
          !item.applyDate ||
          !item.isAdvance
        ) {
          alert("सर्व माहिती भरा");
          return;
        }

        const formData = new FormData();

        formData.append("user_id", userId);
        formData.append("increment_year", item.year);
        formData.append("increment_amount", item.amount);
        formData.append("increment_date", formatDate(item.incrementDate));
        formData.append("effective_date", formatDate(item.applyDate));

        // 🔥 IMPORTANT (reference logic)
        formData.append(
          "is_advance",
          item.isAdvance === "होय" ? "true" : "false"
        );

        if (item.file) {
          formData.append("increment_cert", item.file);
        }

        console.log("FORM DATA:", Object.fromEntries(formData));

        // ✅ API CALL (inside loop)
        await savePaymentStep2(formData);
      }

      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="वेतनवाढ तपशील"
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

              <div>
                <p className="text-xs text-slate-500 mb-1">वर्ष</p>
                <Input
                  placeholder="उदा. 2024"
                  value={r.year}
                  onChange={(e) =>
                    handleChange(i, "year", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतनवाढ रक्कम
                </p>
                <Input
                  placeholder="उदा. 5000"
                  value={r.amount}
                  onChange={(e) =>
                    handleChange(i, "amount", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतनवाढीचा दिनांक
                </p>
                <DatePicker
                  value={r.incrementDate}
                  onChange={(val) =>
                    handleChange(i, "incrementDate", val)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  लागू करण्याचा दिनांक
                </p>
                <DatePicker
                  value={r.applyDate}
                  onChange={(val) =>
                    handleChange(i, "applyDate", val)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  आगाऊ वेतनवाढ आहे का?
                </p>
                <DropdownSearch
                  value={r.isAdvance}
                  onChange={(e) =>
                    handleChange(i, "isAdvance", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतनवाढ ऑर्डर (2MB)
                </p>
                <input
                  type="file"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50"
                  onChange={(e) =>
                    handleFile(i, e.target.files[0])
                  }
                />
              </div>

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

export default SalaryIncrementForm;