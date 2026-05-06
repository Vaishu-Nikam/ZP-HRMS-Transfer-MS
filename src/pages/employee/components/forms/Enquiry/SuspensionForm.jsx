import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveDiscussionStep3 } from "../../../../../services/employeeService";

const SuspensionForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

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

  // ✅ SUBMIT (API Integration)
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        if (!item.isSuspended) {
          alert("सर्व माहिती भरा");
          return;
        }

        const formData = new FormData();

        formData.append("user_id", userId);
        formData.append(
          "was_suspended",
          item.isSuspended === "होय" ? "true" : "false"
        );
        formData.append("suspension_date", formatDate(item.suspensionDate));
        formData.append("suspension_duration", item.period);
        formData.append("suspension_reason", item.reason);
        formData.append(
          "criminal_case_filed",
          item.isCriminalCase === "होय" ? "true" : "false"
        );
        formData.append("subsistence_allowance_pct", item.allowance);
        formData.append("disciplinary_action_date", formatDate(item.disciplineDate));
        formData.append("inquiry_officer_date", formatDate(item.enquiryOfficerDate));
        formData.append("reinstatement_order_date", formatDate(item.reinstatementOrderDate));
        formData.append("reinstatement_joining_date", formatDate(item.joinDate));
        formData.append("suspension_period_decision", item.suspensionDecision);
        formData.append("order_number", item.orderNo);
        formData.append("order_date", formatDate(item.orderDate));

        if (item.document) {
          formData.append("order_cert", item.document);
        }

        console.log("FORMDATA:", [...formData]);

        await saveDiscussionStep3(formData);
      }

      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="निलंबन माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

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
                placeholder="उदा. 3 महिने"
                value={r.period}
                onChange={(e) => handleChange(i, "period", e.target.value)}
              />

              <Input
                label="निलंबनाचे कारण"
                placeholder="कारण लिहा"
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
                placeholder="उदा. 70"
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
                placeholder="Suspend / Reinstate"
                value={r.suspensionDecision}
                onChange={(e) => handleChange(i, "suspensionDecision", e.target.value)}
              />

              <Input
                label="आदेश क्रमांक"
                placeholder="उदा. 12345"
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