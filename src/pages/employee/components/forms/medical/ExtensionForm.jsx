import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveServiceExtension } from "../../../../../services/employeeService";

const ExtensionForm = (props) => {
  const [records, setRecords] = useState([
    {
      isExtended: "",
      orderNo: "",
      orderDate: "",
      isIncrementStopped: "",
      fromDate: "",
      toDate: "",
      stopOrderDate: "",
      stopOrderNo: "",
      document: null,
    },
  ]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      if (!props.userId) return;

      const item = records[0];

      const formData = new FormData();

      formData.append("user_id", props.userId);

      formData.append(
        "extension_granted",
        item.isExtended === "होय" ? "yes" : "no",
      );

      formData.append("extension_order_no", item.orderNo);
      formData.append("extension_order_date", formatDate(item.orderDate));

      formData.append(
        "increment_withheld",
        item.isIncrementStopped === "होय" ? "true" : "false",
      );

      formData.append("withheld_from", formatDate(item.fromDate));
      formData.append("withheld_to", formatDate(item.toDate));
      formData.append("withheld_order_date", formatDate(item.stopOrderDate));

      formData.append("withheld_order_no", item.stopOrderNo);

      if (item.document) {
        formData.append("withheld_order_cert", item.document);
      }

      // 🔥 DEBUG
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await saveServiceExtension(formData);

      props.onNext();
    } catch (err) {
      console.error("Extension API Error:", err.response?.data || err);
    }
  };

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
        isExtended: "",
        orderNo: "",
        orderDate: "",
        isIncrementStopped: "",
        fromDate: "",
        toDate: "",
        stopOrderDate: "",
        stopOrderNo: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard
      title="सेवा मुदतवाढ माहिती"
      onNext={handleSubmit}
      onPrev={props.onPrev}
      onCancel={props.onCancel}
      isFirst={props.isFirst}
      isLast={props.isLast}
    >
      <div className="space-y-6">
        {records.map((r, i) => (
          <div key={i} className="space-y-4">
            {/* Header */}
            {records.length > 1 && (
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold">रेकॉर्ड {i + 1}</h3>
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
              {/* मुदतवाढ */}
              <div>
                <label className="text-sm font-medium">
                  सेवेत मुदतवाढ केली आहे का?
                </label>
                <DropdownSearch
                  value={r.isExtended}
                  onChange={(e) =>
                    handleChange(i, "isExtended", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="मुदतवाढ आदेश क्रमांक"
                value={r.orderNo}
                onChange={(e) => handleChange(i, "orderNo", e.target.value)}
              />

              <DatePicker
                label="मुदतवाढ आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) => handleChange(i, "orderDate", val)}
              />

              {/* वेतनवाढ रोखली */}
              <div>
                <label className="text-sm font-medium">
                  वेतनवाढ रोखली आहे का?
                </label>
                <DropdownSearch
                  value={r.isIncrementStopped}
                  onChange={(e) =>
                    handleChange(i, "isIncrementStopped", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="रोखलेली वेतनवाढ - पासून"
                value={r.fromDate}
                onChange={(val) => handleChange(i, "fromDate", val)}
              />

              <DatePicker
                label="रोखलेली वेतनवाढ - पर्यंत"
                value={r.toDate}
                onChange={(val) => handleChange(i, "toDate", val)}
              />

              <DatePicker
                label="रोखलेली आदेश दिनांक"
                value={r.stopOrderDate}
                onChange={(val) => handleChange(i, "stopOrderDate", val)}
              />

              <Input
                label="रोखलेली आदेश क्रमांक"
                value={r.stopOrderNo}
                onChange={(e) => handleChange(i, "stopOrderNo", e.target.value)}
              />

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  वेतनवाढ रोखलेली आदेश प्रत (2MB)
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

export default ExtensionForm;
