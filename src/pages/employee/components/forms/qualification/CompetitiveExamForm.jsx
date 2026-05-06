import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveEducationStep4 } from "../../../../../services/employeeService";

const CompetitiveExamForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [records, setRecords] = useState([
    {
      examName: "",
      status: "",
      passDate: "",
      attemptNo: "",
    },
  ]);

  const statusOptions = [
    { id: "परीक्षा दिली नाही", name: "परीक्षा दिली नाही" },
    { id: "उत्तीर्ण", name: "उत्तीर्ण" },
    { id: "अनुतीर्ण", name: "अनुतीर्ण" },
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
        examName: "",
        status: "",
        passDate: "",
        attemptNo: "",
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  // 🔥 STATUS MAPPING
  const mapStatus = (val) => {
    if (val === "उत्तीर्ण") return "passed";
    if (val === "अनुतीर्ण") return "failed";
    return "not_attempted";
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!userId) {
        alert("User ID missing");
        setLoading(false);
        return;
      }

      for (let item of records) {

        if (!item.examName || !item.status) {
          alert("सर्व माहिती भरा");
          setLoading(false);
          return;
        }

        const payload = {
          user_id: String(userId),
          exam_name: item.examName,
          status: mapStatus(item.status?.id || item.status),
          pass_date: item.passDate || null,
          attempt_number: item.attemptNo || null,
        };

        console.log("STEP 4 PAYLOAD:", payload);

        const res = await saveEducationStep4(payload);

        console.log("STEP 4 SUCCESS:", res);
      }

      onNext();

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली";

      console.error("STEP 4 ERROR:", err.response?.data || err.message);

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="स्पर्धा परीक्षा माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >

      <div className="space-y-5">

        {records.map((r, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">
                रेकॉर्ड {i + 1}
              </h3>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="परीक्षेचे नाव"
                value={r.examName}
                onChange={(e) =>
                  handleChange(i, "examName", e.target.value)
                }
              />

              <div>
                <label className="text-sm font-medium">
                  सद्यस्थिती
                </label>
                <DropdownSearch
                  options={statusOptions}
                  value={r.status}
                  onChange={(e) =>
                    handleChange(i, "status", e.target.value)
                  }
                />
              </div>

              {r.status === "उत्तीर्ण" && (
                <>
                  <DatePicker
                    label="उत्तीर्ण झाल्याची तारीख"
                    value={r.passDate}
                    onChange={(val) =>
                      handleChange(i, "passDate", val)
                    }
                  />

                  <Input
                    label="संधी क्रमांक"
                    value={r.attemptNo}
                    onChange={(e) =>
                      handleChange(i, "attemptNo", e.target.value)
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

export default CompetitiveExamForm;