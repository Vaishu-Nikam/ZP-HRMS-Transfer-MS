import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePaymentStep5 } from "../../../../../services/employeeService";

const RecoveryForm = (props) => {

  const [records, setRecords] = useState([
    {
      isRecovery: "",
      fromDate: "",
      toDate: "",
      amount: "",
      reason: "",
      certNo: "",
      certDate: "",
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

  const addRow = () => {
    setRecords([
      ...records,
      {
        isRecovery: "",
        fromDate: "",
        toDate: "",
        amount: "",
        reason: "",
        certNo: "",
        certDate: "",
      },
    ]);
  };

  const removeRow = (i) => {
    const data = records.filter((_, index) => index !== i);
    setRecords(data);
  };

  // ✅ SAME DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ✅ SUBMIT (SAME PATTERN)
  const handleSubmit = async () => {
    console.log("🔥 STEP5 CLICK");

    try {
      if (!props.userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // 🔥 dropdown fix
        const recoveryValue =
          typeof item.isRecovery === "object"
            ? item.isRecovery.id
            : item.isRecovery;

        if (!recoveryValue) {
          alert("सर्व माहिती भरा");
          return;
        }

        const payload = {
          user_id: props.userId,
          recovery_done: recoveryValue === "होय" ? "true" : "false",
          from_date: formatDate(item.fromDate),
          to_date: formatDate(item.toDate),
          amount: item.amount,
          reason: item.reason,
          cert_number: item.certNo,
          cert_date: formatDate(item.certDate),
        };

        console.log("🚀 PAYLOAD:", payload);

        await savePaymentStep5(payload);
      }

      if (props.onNext) props.onNext();

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="अतिरिक्त वेतन वसुली माहिती"
      {...props}
      onNext={handleSubmit}   // 🔥 IMPORTANT (LAST)
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
                <p className="text-xs text-slate-500 mb-1">
                  अतिरिक्त वेतन असल्यास वसुली केली आहे का?
                </p>
                <DropdownSearch
                  value={r.isRecovery}
                  onChange={(e) =>
                    handleChange(i, "isRecovery", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {r.isRecovery === "होय" && (
                <>
                  <DatePicker
                    value={r.fromDate}
                    onChange={(val) =>
                      handleChange(i, "fromDate", val)
                    }
                  />

                  <DatePicker
                    value={r.toDate}
                    onChange={(val) =>
                      handleChange(i, "toDate", val)
                    }
                  />

                  <Input
                    placeholder="उदा. 2000"
                    value={r.amount}
                    onChange={(e) =>
                      handleChange(i, "amount", e.target.value)
                    }
                  />

                  <Input
                    placeholder="कारण लिहा"
                    value={r.reason}
                    onChange={(e) =>
                      handleChange(i, "reason", e.target.value)
                    }
                  />

                  <Input
                    placeholder="उदा. 12345"
                    value={r.certNo}
                    onChange={(e) =>
                      handleChange(i, "certNo", e.target.value)
                    }
                  />

                  <DatePicker
                    value={r.certDate}
                    onChange={(val) =>
                      handleChange(i, "certDate", val)
                    }
                  />
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

export default RecoveryForm;