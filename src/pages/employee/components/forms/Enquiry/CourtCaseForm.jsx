import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveDiscussionStep4 } from "../../../../../services/employeeService";

const CourtCaseForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

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

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

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

  // ✅ SUBMIT (API Integration)
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        if (!item.isCourtCase) {
          alert("सर्व माहिती भरा");
          return;
        }

        const formData = new FormData();

        formData.append("user_id", userId);
        formData.append(
          "case_active",
          item.isCourtCase === "होय" ? "true" : "false"
        );
        formData.append("court_name", item.courtName);
        formData.append("order_number", item.orderNo);
        formData.append("order_date", formatDate(item.orderDate));

        if (item.document) {
          formData.append("order_cert", item.document);
        }

        console.log("FORMDATA:", [...formData]);

        await saveDiscussionStep4(formData);
      }

      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="न्यायालयीन प्रकरण माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
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

              <Input
                label="न्यायालयाचे नाव"
                placeholder="उदा. जिल्हा न्यायालय"
                value={r.courtName}
                onChange={(e) =>
                  handleChange(i, "courtName", e.target.value)
                }
              />

              <Input
                label="आदेश क्रमांक"
                placeholder="उदा. 12345"
                value={r.orderNo}
                onChange={(e) =>
                  handleChange(i, "orderNo", e.target.value)
                }
              />

              <DatePicker
                label="आदेश दिनांक"
                value={r.orderDate}
                onChange={(val) =>
                  handleChange(i, "orderDate", val)
                }
              />

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

        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default CourtCaseForm;