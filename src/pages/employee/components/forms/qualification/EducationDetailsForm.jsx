import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";

const EducationDetailsForm = (props) => {
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
    "निरक्षर",
    "पूर्व प्राथमिक",
    "उच्च प्राथमिक",
    "माध्यमिक",
    "उच्च माध्यमिक",
    "पदवीधर",
    "पदव्युत्तर",
  ];

  const qualificationTimeOptions = [
    "नियुक्तीच्या वेळी",
    "नियुक्तीनंतर",
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

  return (
    <EmployeeFormCard title="शैक्षणिक अर्हता" {...props}>
      <div className="space-y-4">

        {records.map((r, i) => (
          <div key={i} className="border rounded-xl p-4 bg-slate-50">

            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">
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

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              {/* शैक्षणिक अहर्ता प्रकार */}
              <div>
                <label className="text-sm font-medium">
                  शैक्षणिक अहर्ता प्रकार
                </label>
                <select
                  className="input mt-1"
                  value={r.qualificationType}
                  onChange={(e) =>
                    handleChange(i, "qualificationType", e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {qualificationTypes.map((q, idx) => (
                    <option key={idx}>{q}</option>
                  ))}
                </select>
              </div>

              {/* संस्था */}
              <Input
                label="संस्था / विद्यापीठ"
                placeholder="Enter Institute"
                value={r.institute}
                onChange={(e) =>
                  handleChange(i, "institute", e.target.value)
                }
              />

              {/* शैक्षणिक अहर्ता */}
              <Input
                label="शैक्षणिक अहर्ता"
                placeholder="Enter Qualification"
                value={r.qualification}
                onChange={(e) =>
                  handleChange(i, "qualification", e.target.value)
                }
              />

              {/* वर्ष */}
              <Input
                label="उत्तीर्ण झालेले वर्ष"
                placeholder="Enter Year"
                value={r.passingYear}
                onChange={(e) =>
                  handleChange(i, "passingYear", e.target.value)
                }
              />

              {/* पात्रता कधी */}
              <div>
                <label className="text-sm font-medium">
                  पात्रता कधी प्राप्त केली
                </label>
                <select
                  className="input mt-1"
                  value={r.qualificationTime}
                  onChange={(e) =>
                    handleChange(i, "qualificationTime", e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {qualificationTimeOptions.map((q, idx) => (
                    <option key={idx}>{q}</option>
                  ))}
                </select>
              </div>

              {/* Certificate */}
              <div>
                <label className="text-sm font-medium">
                  प्रमाणपत्र (2MB पर्यंत)
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

        {/* Add */}
        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default EducationDetailsForm;