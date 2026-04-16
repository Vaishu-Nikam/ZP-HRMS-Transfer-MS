import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const TrainingDetailsForm = (props) => {
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
    "उजळणी",
    "पायाभूत",
    "सेवा अंतर्गत प्रशिक्षण",
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

  return (
    <EmployeeFormCard title="प्रशिक्षण माहिती" {...props}>
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

              <Input
                label="कोर्सचे नाव"
                placeholder="Enter Course Name"
                value={r.courseName}
                onChange={(e) =>
                  handleChange(i, "courseName", e.target.value)
                }
              />

              <Input
                label="संस्थेचे नाव"
                placeholder="Enter Institute Name"
                value={r.institute}
                onChange={(e) =>
                  handleChange(i, "institute", e.target.value)
                }
              />

              <Input
                label="कोर्स समन्वयक"
                placeholder="Enter Coordinator Name"
                value={r.coordinator}
                onChange={(e) =>
                  handleChange(i, "coordinator", e.target.value)
                }
              />

              {/* Training Type */}
              <div>
                <label className="text-sm font-medium">
                  प्रशिक्षण प्रकार
                </label>
                <select
                  className="input mt-1"
                  value={r.type}
                  onChange={(e) =>
                    handleChange(i, "type", e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {trainingTypes.map((t, idx) => (
                    <option key={idx}>{t}</option>
                  ))}
                </select>
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

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  दस्तऐवज (2MB पर्यंत)
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

export default TrainingDetailsForm;