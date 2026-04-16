import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const AdvanceForm = (props) => {

  const [records, setRecords] = useState([
    {
      type: "",
      details: "",
      amount: "",
      isPaid: "",
      certificate: "",
      document: null,
    },
  ]);

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const advanceTypes = [
    { id: "1", name: "वेतन अग्रिम" },
    { id: "2", name: "गृह बांधणी अग्रिम" },
    { id: "3", name: "वाहन अग्रिम" },
    { id: "4", name: "संगणक अग्रिम" },
    { id: "5", name: "प्रवास अग्रिम" },
    { id: "6", name: "विवाह अग्रिम" },
    { id: "7", name: "वैद्यकीय अग्रिम" },
    { id: "8", name: "शिक्षण अग्रिम" },
    { id: "9", name: "नैसर्गिक आपत्ती अग्रिम" },
    { id: "10", name: "इतर अग्रिम" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    handleChange(i, "document", file);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        type: "",
        details: "",
        amount: "",
        isPaid: "",
        certificate: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="अग्रिम माहिती" {...props}>
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

            {records.length > 1 && (
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold">
                  रेकॉर्ड {i + 1}
                </h3>
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">

              {/* अग्रिम प्रकार */}
              <div>
                <label className="text-sm font-medium">
                  अग्रिम प्रकार
                </label>
                <DropdownSearch
                  value={r.type}
                  onChange={(e) => handleChange(i, "type", e.target.value)}
                  options={advanceTypes}
                  placeholder="निवडा"
                />
              </div>

              {/* तपशील */}
              <Input
                label="अग्रिम तपशील"
                value={r.details}
                onChange={(e) => handleChange(i, "details", e.target.value)}
              />

              {/* रक्कम */}
              <Input
                label="अग्रिम रक्कम"
                value={r.amount}
                onChange={(e) => handleChange(i, "amount", e.target.value)}
              />

              {/* परतफेड */}
              <div>
                <label className="text-sm font-medium">
                  संपूर्ण परतफेड झाली आहे का?
                </label>
                <DropdownSearch
                  value={r.isPaid}
                  onChange={(e) => handleChange(i, "isPaid", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {/* प्रमाणपत्र */}
              <Input
                label="प्रमाणपत्र क्रमांक / दिनांक"
                value={r.certificate}
                onChange={(e) => handleChange(i, "certificate", e.target.value)}
              />

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  प्रमाणपत्र / आदेश (2MB)
                </label>
                <input
                  type="file"
                  className="input mt-1"
                  onChange={(e) => handleFile(i, e.target.files[0])}
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

export default AdvanceForm;