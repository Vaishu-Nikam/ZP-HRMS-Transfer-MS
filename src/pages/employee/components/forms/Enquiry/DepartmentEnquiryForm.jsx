import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const DepartmentEnquiryForm = (props) => {

  const [records, setRecords] = useState([
    {
      isEnquiry: "",
      fromDate: "",
      finalDecision: "",
      disciplineDate: "",
      orderNo: "",
      punishmentType: "",
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
        isEnquiry: "",
        fromDate: "",
        finalDecision: "",
        disciplineDate: "",
        orderNo: "",
        punishmentType: "",
        orderDate: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="विभागीय चौकशी" {...props}>
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

              {/* चौकशी */}
              <div>
                <label className="text-sm font-medium">
                  विभागीय चौकशी सुरु/प्रलंबित आहे का?
                </label>
                <DropdownSearch
                  value={r.isEnquiry}
                  onChange={(e) =>
                    handleChange(i, "isEnquiry", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="केव्हापासून दिनांक"
                value={r.fromDate}
                onChange={(val) =>
                  handleChange(i, "fromDate", val)
                }
              />

              <Input
                label="विभागीय चौकशी अंतिम निर्णय"
                value={r.finalDecision}
                onChange={(e) =>
                  handleChange(i, "finalDecision", e.target.value)
                }
              />

              <DatePicker
                label="शिस्तभंग कार्यवाही सुरु दिनांक"
                value={r.disciplineDate}
                onChange={(val) =>
                  handleChange(i, "disciplineDate", val)
                }
              />

              <Input
                label="शास्ती आदेश क्रमांक"
                value={r.orderNo}
                onChange={(e) =>
                  handleChange(i, "orderNo", e.target.value)
                }
              />

              <Input
                label="शास्तीचा प्रकार"
                value={r.punishmentType}
                onChange={(e) =>
                  handleChange(i, "punishmentType", e.target.value)
                }
              />

              <DatePicker
                label="शास्ती आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) =>
                  handleChange(i, "orderDate", val)
                }
              />

              <div className="col-span-2">
                <label className="text-sm font-medium">
                  शास्ती आदेश (2MB)
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

export default DepartmentEnquiryForm;