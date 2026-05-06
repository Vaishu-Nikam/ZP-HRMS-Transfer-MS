import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveEducationStep2 } from "../../../../../services/employeeService";

const TrainingDetailsForm = ({
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
      courseName: "",
      institute: "",
      coordinator: "",
      startDate: "",
      endDate: "",
      type: "",
      document: null,
    },
  ]);

  const trainingTypes = [
    { id: 1, name: "उजळणी" },
    { id: 2, name: "पायाभूत" },
    { id: 3, name: "सेवा अंतर्गत प्रशिक्षण"},
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
        courseName: "",
        institute: "",
        coordinator: "",
        startDate: "",
        endDate: "",
        type: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    handleChange(i, "document", file);
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

        // ✅ validation
        if (
          !item.courseName ||
          !item.institute ||
          !item.coordinator ||
          !item.startDate ||
          !item.endDate ||
          !item.type
        ) {
          alert("सर्व माहिती भरा");
          setLoading(false);
          return;
        }

        const payload = new FormData();

        payload.append("user_id", String(userId));
        payload.append("course_name", item.courseName);
        payload.append("institution", item.institute);
        payload.append("coordinator", item.coordinator);

        payload.append("start_date", item.startDate);
        payload.append("end_date", item.endDate);

        payload.append(
          "training_type",
          item.type?.id || item.type
        );

        if (item.document) {
          payload.append("training_cert", item.document);
        }

        console.log("TRAINING PAYLOAD:", [...payload.entries()]);

        // 🔥 FIXED API CALL
        const res = await saveEducationStep2(payload);

        console.log("STEP 2 SUCCESS:", res);
      }

      onNext();

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली";

      console.error("STEP 2 ERROR:", err.response?.data || err.message);

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="प्रशिक्षण माहिती"
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
                label="कोर्सचे नाव"
                value={r.courseName}
                onChange={(e) =>
                  handleChange(i, "courseName", e.target.value)
                }
              />

              <Input
                label="संस्थेचे नाव"
                value={r.institute}
                onChange={(e) =>
                  handleChange(i, "institute", e.target.value)
                }
              />

              <Input
                label="कोर्स समन्वयक"
                value={r.coordinator}
                onChange={(e) =>
                  handleChange(i, "coordinator", e.target.value)
                }
              />

              <div>
                <label className="text-sm font-medium">
                  प्रशिक्षण प्रकार
                </label>
                <DropdownSearch
                  options={trainingTypes}
                  value={r.type}
                  onChange={(e) =>
                    handleChange(i, "type", e.target.value)
                  }
                />
              </div>

              <DatePicker
                label="प्रारंभ दिनांक"
                value={r.startDate}
                onChange={(val) =>
                  handleChange(i, "startDate", val)
                }
              />

              <DatePicker
                label="अंतिम दिनांक"
                value={r.endDate}
                onChange={(val) =>
                  handleChange(i, "endDate", val)
                }
              />

              <div className="md:col-span-2">
  <label className="text-sm font-medium text-slate-700">
    दस्तऐवज (२ MB पर्यंत)
  </label>

  <div className="mt-1 flex items-center gap-3">

    <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
      फाईल निवडा
      <input
        type="file"
        className="hidden"
        onChange={(e) =>
          handleFile(i, e.target.files[0])
        }
      />
    </label>

    {r.document && (
      <span className="text-sm text-green-600">
        ✔ {r.document.name}
      </span>
    )}

  </div>
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

export default TrainingDetailsForm;