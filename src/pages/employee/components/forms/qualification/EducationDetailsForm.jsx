import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveEducationStep1 } from "../../../../../services/employeeService";

const EducationDetailsForm = ({
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
      qualificationType: "",
      institute: "",
      qualification: "",
      passingYear: "",
      certificate: null,
      qualificationTime: "",
    },
  ]);

  const qualificationTypes = [
    { id: "निरक्षर", name: "निरक्षर" },
    { id: "पूर्व प्राथमिक", name: "पूर्व प्राथमिक" },
    { id: "उच्च प्राथमिक", name: "उच्च प्राथमिक" },
    { id: "माध्यमिक", name: "माध्यमिक" },
    { id: "उच्च माध्यमिक", name: "उच्च माध्यमिक" },
    { id: "पदवीधर", name: "पदवीधर" },
    { id: "पदव्युत्तर", name: "पदव्युत्तर" },
  ];

  const qualificationTimeOptions = [
    { id: "नियुक्तीच्या वेळी", name: "नियुक्तीच्या वेळी" },
    { id: "नियुक्तीनंतर", name: "नियुक्तीनंतर" },
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
        qualificationType: "",
        institute: "",
        qualification: "",
        passingYear: "",
        certificate: null,
        qualificationTime: "",
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
    handleChange(i, "certificate", file);
  };

  // ✅ HANDLE SUBMIT (PERSONAL STYLE)
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

        if (
          !item.qualificationType ||
          !item.institute ||
          !item.qualification ||
          !item.passingYear
        ) {
          alert("सर्व माहिती भरा");
          setLoading(false);
          return;
        }

        const payload = new FormData();

        payload.append("user_id", String(userId));

        payload.append(
          "edu_type",
          item.qualificationType?.id || item.qualificationType
        );

        payload.append("institution", item.institute);
        payload.append("qualification", item.qualification);
        payload.append("pass_year", item.passingYear);

        payload.append(
          "obtained_at",
          new Date().toISOString().split("T")[0]
        );

        if (item.certificate) {
          payload.append("passing_cert", item.certificate);
        }

        console.log("FORM DATA:", [...payload.entries()]);

        const res = await saveEducationStep1(payload);

        console.log("STEP EDUCATION SUCCESS:", res);
      }

      onNext();

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली";

      console.error("STEP EDUCATION ERROR:", err.response?.data || err.message);

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="शैक्षणिक अर्हता"
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

              <div>
                <label className="text-sm font-medium text-slate-700">
                  शैक्षणिक अहर्ता प्रकार
                </label>
                <DropdownSearch
                  options={qualificationTypes}
                  value={r.qualificationType}
                  onChange={(e) =>
                    handleChange(i, "qualificationType", e.target.value)
                  }
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="संस्था / विद्यापीठ"
                value={r.institute}
                onChange={(e) =>
                  handleChange(i, "institute", e.target.value)
                }
              />

              <Input
                label="शैक्षणिक अहर्ता"
                value={r.qualification}
                onChange={(e) =>
                  handleChange(i, "qualification", e.target.value)
                }
              />

              <Input
                label="उत्तीर्ण झालेले वर्ष"
                value={r.passingYear}
                onChange={(e) =>
                  handleChange(i, "passingYear", e.target.value)
                }
              />

              <div>
                <label className="text-sm font-medium text-slate-700">
                  पात्रता कधी प्राप्त केली
                </label>
                <DropdownSearch
                  options={qualificationTimeOptions}
                  value={r.qualificationTime}
                  onChange={(e) =>
                    handleChange(i, "qualificationTime", e.target.value)
                  }
                  placeholder="निवडा"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  प्रमाणपत्र (२ MB पर्यंत)
                </label>

                <input
                  type="file"
                  className="input mt-1"
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

export default EducationDetailsForm;