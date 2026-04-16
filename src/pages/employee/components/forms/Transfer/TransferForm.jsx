import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const TransferForm = (props) => {

  const [records, setRecords] = useState([
    {
      transferType: "",
      category: "",
      orderDate: "",
      isCurrentPost: "",
      isDistrictTransfer: "",
      postingPlace: "",
      panchayat: "",
      level: "",
      office: "",
      designation: "",
      isGazetted: "",
      joinDate: "",
      endDate: "",
    },
  ]);

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const transferTypes = [
    { id: "1", name: "पती/पत्नी एकत्रीकरण" },
    { id: "2", name: "सेवा जेष्ठता" },
    { id: "3", name: "समायोजन" },
    { id: "4", name: "प्रशासकीय" },
    { id: "5", name: "विनंती बदली" },
    { id: "6", name: "प्रतिनियुक्ती" },
  ];

  const levels = [
    { id: "1", name: "मुख्यालय विभाग" },
    { id: "2", name: "पंचायत समिती" },
    { id: "3", name: "ग्रामपंचायत" },
    { id: "4", name: "आरोग्य केंद्र" },
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
        transferType: "",
        category: "",
        orderDate: "",
        isCurrentPost: "",
        isDistrictTransfer: "",
        postingPlace: "",
        panchayat: "",
        level: "",
        office: "",
        designation: "",
        isGazetted: "",
        joinDate: "",
        endDate: "",
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="बदली माहिती" {...props}>
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

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium">बदली प्रकार</label>
                <DropdownSearch
                  value={r.transferType}
                  onChange={(e) => handleChange(i, "transferType", e.target.value)}
                  options={transferTypes}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="बदली प्रवर्ग"
                value={r.category}
                onChange={(e) => handleChange(i, "category", e.target.value)}
              />

              <DatePicker
                label="आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) => handleChange(i, "orderDate", val)}
              />

              <div>
                <label className="text-sm font-medium">सध्याचे पद आहे का</label>
                <DropdownSearch
                  value={r.isCurrentPost}
                  onChange={(e) => handleChange(i, "isCurrentPost", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <div>
                <label className="text-sm font-medium">जिल्हा बदली</label>
                <DropdownSearch
                  value={r.isDistrictTransfer}
                  onChange={(e) => handleChange(i, "isDistrictTransfer", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="पदस्थापना ठिकाण"
                value={r.postingPlace}
                onChange={(e) => handleChange(i, "postingPlace", e.target.value)}
              />

              <Input
                label="पंचायत समिती"
                value={r.panchayat}
                onChange={(e) => handleChange(i, "panchayat", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">विभाग स्तर</label>
                <DropdownSearch
                  value={r.level}
                  onChange={(e) => handleChange(i, "level", e.target.value)}
                  options={levels}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="कार्यालय"
                value={r.office}
                onChange={(e) => handleChange(i, "office", e.target.value)}
              />

              <Input
                label="पदनाम"
                value={r.designation}
                onChange={(e) => handleChange(i, "designation", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">राजपत्रित आहे का</label>
                <DropdownSearch
                  value={r.isGazetted}
                  onChange={(e) => handleChange(i, "isGazetted", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="रुजू दिनांक"
                value={r.joinDate}
                onChange={(val) => handleChange(i, "joinDate", val)}
              />

              <DatePicker
                label="समाप्त दिनांक"
                value={r.endDate}
                onChange={(val) => handleChange(i, "endDate", val)}
              />

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

export default TransferForm;