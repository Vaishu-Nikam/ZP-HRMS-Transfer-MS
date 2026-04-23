import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

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
    { id: "उजळणी", name: "उजळणी" },
    { id: "पायाभूत", name: "पायाभूत" },
    { id: "सेवा अंतर्गत प्रशिक्षण", name: "सेवा अंतर्गत प्रशिक्षण" },
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

      <div className="space-y-5">

        {records.map((r, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

            {/* Header */}
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

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="कोर्सचे नाव"
                placeholder="उदा. संगणक प्रशिक्षण"
                value={r.courseName}
                onChange={(e) =>
                  handleChange(i, "courseName", e.target.value)
                }
              />

              <Input
                label="संस्थेचे नाव"
                placeholder="उदा. YCMOU"
                value={r.institute}
                onChange={(e) =>
                  handleChange(i, "institute", e.target.value)
                }
              />

              <Input
                label="कोर्स समन्वयक"
                placeholder="उदा. श्री. देशमुख"
                value={r.coordinator}
                onChange={(e) =>
                  handleChange(i, "coordinator", e.target.value)
                }
              />

              {/* Dropdown */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  प्रशिक्षण प्रकार
                </label>
                <DropdownSearch
                  options={trainingTypes}
                  value={r.type}
                  onChange={(e) =>
                    handleChange(i, "type", e.target.value)
                  }
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="प्रारंभ दिनांक (dd/MM/yyyy)"
                value={r.startDate}
                onChange={(val) =>
                  handleChange(i, "startDate", val)
                }
                placeholder="दिनांक निवडा"
              />

              <DatePicker
                label="अंतिम दिनांक (dd/MM/yyyy)"
                value={r.endDate}
                onChange={(val) =>
                  handleChange(i, "endDate", val)
                }
                placeholder="दिनांक निवडा"
              />

              {/* FILE */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  दस्तऐवज (२ MB पर्यंत)
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