import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePaymentStep3 } from "../../../../../services/employeeService";

const AllowanceForm = (props) => {

  const [records, setRecords] = useState([
    { type: "", startDate: "", endDate: "", amount: "" }
  ]);

  const allowanceOptions = [
    { id: "1", name: "DA - महागाई भत्ता" },
    { id: "2", name: "HRA - घरभाडे भत्ता" },
    { id: "3", name: "TA - वाहतूक भत्ता" },
    { id: "4", name: "OTA - ओव्हरटाईम भत्ता" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  // ➕ Add record
  const addRow = () => {
    setRecords([
      ...records,
      { type: "", startDate: "", endDate: "", amount: "" }
    ]);
  };

  // ❌ Remove record
  const removeRow = (i) => {
    const data = records.filter((_, index) => index !== i);
    setRecords(data);
  };

  // ✅ Date format
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ✅ SUBMIT (API CALL)
  const handleSubmit = async () => {
    console.log("🔥 SUBMIT CLICKED");

    try {
      if (!props.userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // validation
        if (
          !item.type ||
          !item.startDate ||
          !item.endDate ||
          !item.amount
        ) {
          alert("सर्व माहिती भरा");
          return;
        }

        const payload = {
          user_id: props.userId,
          allowance_type: item.type,
          effective_from: formatDate(item.startDate),
          effective_to: formatDate(item.endDate),
          amount: item.amount,
        };

        console.log("🚀 PAYLOAD:", payload);

        await savePaymentStep3(payload);
      }

      // next step
      if (props.onNext) props.onNext();

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="वेतन भत्ता माहिती"
    {...props}           
    onNext={handleSubmit} 
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

              {/* भत्ता प्रकार */}
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतन भत्ता प्रकार
                </p>
                <DropdownSearch
                  value={r.type}
                  onChange={(e) =>
                    handleChange(i, "type", e.target.value)
                  }
                  options={allowanceOptions}
                  placeholder="निवडा"
                />
              </div>

              {/* लागू दिनांक */}
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  लागू करण्याचा दिनांक
                </p>
                <DatePicker
                  value={r.startDate}
                  onChange={(val) =>
                    handleChange(i, "startDate", val)
                  }
                />
              </div>

              {/* रद्द दिनांक */}
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  रद्द करण्याचा दिनांक
                </p>
                <DatePicker
                  value={r.endDate}
                  onChange={(val) =>
                    handleChange(i, "endDate", val)
                  }
                />
              </div>

              {/* रक्कम */}
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतन भत्ता रक्कम
                </p>
                <Input
                  placeholder="उदा. 5000"
                  value={r.amount}
                  onChange={(e) =>
                    handleChange(i, "amount", e.target.value)
                  }
                />
              </div>

            </div>
          </div>
        ))}

        {/* ➕ Add Button */}
        <div>
          <button
            onClick={addRow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            + रेकॉर्ड जोडा
          </button>
        </div>

      </div>

    </EmployeeFormCard>
  );
};

export default AllowanceForm;