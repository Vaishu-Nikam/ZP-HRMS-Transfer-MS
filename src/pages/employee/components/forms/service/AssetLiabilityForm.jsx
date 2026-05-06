import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveServiceStep3 } from "../../../../../services/employeeService"; // ✅ SAME API

const AssetLiabilityForm = (props) => {

  const [records, setRecords] = useState([
    {
      year: "",
      submitted: "",
      date: "",
      file: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const yesNoOptions = [
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
      alert("File must be under 2MB");
      return;
    }
    handleChange(i, "file", file);
  };

  const handleNext = async () => {
    setError("");
    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("user_id", props.userId);

      // 🔥 REQUIRED services (dummy)
      payload.append(
        "services",
        JSON.stringify([
          {
            years_required: "10",
            benefit_no: "0",
            service_completion_date: "2024-01-01",
            benefit_received: "no",
            benefit_date: "2024-01-01",
            due_date: "2024-01-01",
            order_number: "0",
            order_date: "2024-01-01",
          },
        ])
      );

      // 👉 last record
      const last = records[records.length - 1];

      payload.append("year", last.year || "0");

      payload.append(
        "submitted",
        last.submitted === "होय" ? "yes" : "no"
      );

      payload.append(
        "submitted_date",
        last.date || "2024-01-01"
      );

      if (last.file) {
        payload.append("asset_liability_cert", last.file);
      } else {
        payload.append("asset_liability_cert", "");
      }

      // 🔥 REQUIRED FIELDS (dummy)
      payload.append("chattopadhyay_granted", "no");
      payload.append("chattopadhyay_order_no", "0");
      payload.append("chattopadhyay_order_date", "2024-01-01");

      payload.append("nivadshreeni_order_no", "0");
      payload.append("nivadshreeni_order_date", "2024-01-01");

      await saveServiceStep3(payload); // ✅ SAME STEP3 API

      if (props.onNext) props.onNext();

    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="मत्ता व दायित्व माहिती"
      onNext={handleNext}
      onPrev={props.onPrev}
      onCancel={props.onCancel}
      isFirst={props.isFirst}
      isLast={props.isLast}
      loading={loading}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">

        {records.map((r, i) => (
          <div key={i} className="border rounded-xl p-4 bg-slate-50">

            <div className="grid grid-cols-2 gap-4">

              {/* वर्ष */}
              <Input
                label="वर्ष"
                value={r.year}
                onChange={(e) =>
                  handleChange(i, "year", e.target.value)
                }
              />

              {/* Submitted */}
              <div>
                <label className="text-sm font-medium">
                  पोच अपलोड केली आहे का?
                </label>
                <DropdownSearch
                  value={r.submitted}
                  onChange={(e) =>
                    handleChange(i, "submitted", e.target.value)
                  }
                  options={yesNoOptions}
                  placeholder="निवडा"
                />
              </div>

              {/* Date */}
              {r.submitted === "होय" && (
                <DatePicker
                  label="दिनांक"
                  value={r.date}
                  onChange={(val) =>
                    handleChange(i, "date", val)
                  }
                />
              )}

              {/* File */}
              {r.submitted === "होय" && (
                <div>
                  <label className="text-sm font-medium">
                    मत्ता व दायित्व पोच (2MB)
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFile(i, e.target.files[0])
                    }
                  />
                </div>
              )}

            </div>
          </div>
        ))}

      </div>
    </EmployeeFormCard>
  );
};

export default AssetLiabilityForm;