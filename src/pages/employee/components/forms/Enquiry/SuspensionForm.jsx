import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const SuspensionForm = (props) => {

  const [records, setRecords] = useState([
    {
      isSuspended: "",
      suspensionDate: "",
      period: "",
      reason: "",
      isCriminalCase: "",
      allowance: "",
      disciplineDate: "",
      enquiryOfficerDate: "",
      reinstatementOrderDate: "",
      joinDate: "",
      suspensionDecision: "",
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

  return (
    <EmployeeFormCard title="निलंबन माहिती" {...props}>
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
                  onClick={() => setRecords(records.filter((_, idx) => idx !== i))}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium">
                  निलंबन सुरु आहे का?
                </label>
                <DropdownSearch
                  value={r.isSuspended}
                  onChange={(e) => handleChange(i, "isSuspended", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="निलंबन दिनांक"
                value={r.suspensionDate}
                onChange={(val) => handleChange(i, "suspensionDate", val)}
              />

              <Input
                label="निलंबन कालावधी"
                value={r.period}
                onChange={(e) => handleChange(i, "period", e.target.value)}
              />

              <Input
                label="निलंबनाचे कारण"
                value={r.reason}
                onChange={(e) => handleChange(i, "reason", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">
                  फौजदारी गुन्हा आहे का?
                </label>
                <DropdownSearch
                  value={r.isCriminalCase}
                  onChange={(e) => handleChange(i, "isCriminalCase", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="निर्वाह भत्ता (%)"
                value={r.allowance}
                onChange={(e) => handleChange(i, "allowance", e.target.value)}
              />

              <DatePicker
                label="शिस्तभंग दिनांक"
                value={r.disciplineDate}
                onChange={(val) => handleChange(i, "disciplineDate", val)}
              />

              <DatePicker
                label="चौकशी अधिकारी दिनांक"
                value={r.enquiryOfficerDate}
                onChange={(val) => handleChange(i, "enquiryOfficerDate", val)}
              />

              <DatePicker
                label="पुनर्स्थापना आदेश दिनांक"
                value={r.reinstatementOrderDate}
                onChange={(val) => handleChange(i, "reinstatementOrderDate", val)}
              />

              <DatePicker
                label="हजर दिनांक"
                value={r.joinDate}
                onChange={(val) => handleChange(i, "joinDate", val)}
              />

              <Input
                label="निलंबन निर्णय"
                value={r.suspensionDecision}
                onChange={(e) => handleChange(i, "suspensionDecision", e.target.value)}
              />

              <Input
                label="आदेश क्रमांक"
                value={r.orderNo}
                onChange={(e) => handleChange(i, "orderNo", e.target.value)}
              />

              <DatePicker
                label="आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) => handleChange(i, "orderDate", val)}
              />

              <div className="col-span-2">
                <label className="text-sm font-medium">
                  आदेश (2MB)
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

        <button
          onClick={() =>
            setRecords([
              ...records,
              {
                isSuspended: "",
                suspensionDate: "",
                period: "",
                reason: "",
                isCriminalCase: "",
                allowance: "",
                disciplineDate: "",
                enquiryOfficerDate: "",
                reinstatementOrderDate: "",
                joinDate: "",
                suspensionDecision: "",
                orderNo: "",
                orderDate: "",
                document: null,
              },
            ])
          }
          className="btn-primary"
        >
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default SuspensionForm;