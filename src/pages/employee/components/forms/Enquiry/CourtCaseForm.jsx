import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const CourtCaseForm = (props) => {

  const [records, setRecords] = useState([
    {
      isCourtCase: "",
      courtName: "",
      orderNo: "",
      orderDate: "",
      document: null,
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
        isCourtCase: "",
        courtName: "",
        orderNo: "",
        orderDate: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="न्यायालयीन प्रकरण माहिती" {...props}>
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

            {/* Header */}
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

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              {/* कोर्ट केस आहे का */}
              <div>
                <label className="text-sm font-medium">
                  न्यायालयीन प्रकरण सुरु आहे का?
                </label>
                <DropdownSearch
                  value={r.isCourtCase}
                  onChange={(e) =>
                    handleChange(i, "isCourtCase", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {/* कोर्ट नाव */}
              <Input
                label="न्यायालयाचे नाव"
                value={r.courtName}
                onChange={(e) =>
                  handleChange(i, "courtName", e.target.value)
                }
              />

              {/* आदेश क्रमांक */}
              <Input
                label="आदेश क्रमांक"
                value={r.orderNo}
                onChange={(e) =>
                  handleChange(i, "orderNo", e.target.value)
                }
              />

              {/* आदेश दिनांक */}
              <DatePicker
                label="आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) =>
                  handleChange(i, "orderDate", val)
                }
              />

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  आदेश (2MB)
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

        {/* Add Button */}
        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default CourtCaseForm;