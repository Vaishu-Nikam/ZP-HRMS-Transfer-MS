import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveServiceStep2 } from "../../../../../services/employeeService";

const CurrentPostingForm = ({ userId, onNext, onPrev, onCancel, isFirst, isLast }) => {

  const [formData, setFormData] = useState({
    status: "",
    statusDate: "",
    probation: "",
    probationStart: "",
    probationEnd: "",
    probationComplete: "",
    probationOrderDate: "",
    probationOrderNo: "",
    permanentCert: "",
    permanentCertDate: "",
    permanentDate: "",
    permanentPost: "",
    probationFile: null,
    permanentFile: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const mapYesNo = (val) => {
    if (val === "होय") return "Y";
    if (val === "नाही") return "N";
    return "N";
  };

  const handleSubmit = async () => {

    console.log("🔥 SUBMIT CLICKED");
    console.log("USER ID:", userId);

    if (!userId) {
      alert("User ID missing ❌");
      return;
    }

    try {
      const payload = new FormData();

      payload.append("user_id", String(userId));

      payload.append("employment_type", formData.status || "");
      payload.append("status_date", formData.statusDate || "");

      payload.append("probation_applicable", mapYesNo(formData.probation));
      payload.append("probation_start_date", formData.probationStart || "");
      payload.append("probation_end_date", formData.probationEnd || "");

      payload.append("probation_completed", mapYesNo(formData.probationComplete));
      payload.append("probation_order_date", formData.probationOrderDate || "");
      payload.append("probation_order_number", formData.probationOrderNo || "");

      payload.append("has_permanency_cert", mapYesNo(formData.permanentCert));
      payload.append("permanency_cert_date", formData.permanentCertDate || "");
      payload.append("permanent_from_date", formData.permanentDate || "");
      payload.append("permanent_post_name", formData.permanentPost || "");

      if (formData.probationFile) {
        payload.append("probation_cert", formData.probationFile);
      }

      if (formData.permanentFile) {
        payload.append("permanent_benefit_cert", formData.permanentFile);
      }

      console.log("📦 PAYLOAD:", [...payload.entries()]);

      const res = await saveServiceStep2(payload);

      console.log("✅ API SUCCESS:", res);

      onNext(); // ✅ FIXED

    } catch (err) {
      console.error("❌ API ERROR:", err.response?.data || err.message);
      alert("API Error");
    }
  };

  const statusOptions = [
    { id: "1", name: "कायमस्वरूपी" },
    { id: "2", name: "कंत्राटी" },
  ];

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const handleFile = (field, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }
    handleChange(field, file);
  };

  return (
    <EmployeeFormCard
      title="पदस्थापना सद्यस्थिती माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-6">

        {/* BASIC */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">सद्यस्थिती</label>
            <DropdownSearch
              value={formData.status || ""}
              onChange={(e)=>handleChange("status", e.target.value)}
              options={statusOptions}
              placeholder="निवडा"
            />
          </div>

          <DatePicker
            label="सद्य स्थिती दिनांक"
            value={formData.statusDate || ""}
            onChange={(v)=>handleChange("statusDate", v)}
          />

        </div>

        {/* PROBATION */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">परीविक्षा माहिती</h3>

          <div>
            <label className="text-sm font-medium">परीविक्षा लागू आहे का?</label>
            <DropdownSearch
              value={formData.probation || ""}
              onChange={(e)=>handleChange("probation", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.probation === "होय" && (
            <>
              <DatePicker
                label="सुरुवात दिनांक"
                value={formData.probationStart || ""}
                onChange={(v)=>handleChange("probationStart", v)}
              />

              <DatePicker
                label="समाप्ती दिनांक"
                value={formData.probationEnd || ""}
                onChange={(v)=>handleChange("probationEnd", v)}
              />

              <div>
                <label className="text-sm font-medium">परीविक्षा संपली का?</label>
                <DropdownSearch
                  value={formData.probationComplete || ""}
                  onChange={(e)=>handleChange("probationComplete", e.target.value)}
                  options={yesNoOptions}
                  placeholder="निवडा"
                />
              </div>
            </>
          )}

          {formData.probationComplete === "होय" && (
            <>
              <DatePicker
                label="आदेश दिनांक"
                value={formData.probationOrderDate || ""}
                onChange={(v)=>handleChange("probationOrderDate", v)}
              />

              <Input
                label="आदेश क्रमांक"
                value={formData.probationOrderNo || ""}
                onChange={(e)=>handleChange("probationOrderNo", e.target.value)}
              />
            </>
          )}

        </div>

        {/* PERMANENT */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">स्थायीत्व माहिती</h3>

          <div>
            <label className="text-sm font-medium">स्थायीत्व लाभ प्रमाणपत्र आहे का?</label>
            <DropdownSearch
              value={formData.permanentCert || ""}
              onChange={(e)=>handleChange("permanentCert", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.permanentCert === "होय" && (
            <>
              <DatePicker
                label="प्रमाणपत्र दिनांक"
                value={formData.permanentCertDate || ""}
                onChange={(v)=>handleChange("permanentCertDate", v)}
              />

              <DatePicker
                label="कायम दिनांक"
                value={formData.permanentDate || ""}
                onChange={(v)=>handleChange("permanentDate", v)}
              />

              <Input
                label="पदनाम"
                value={formData.permanentPost || ""}
                onChange={(e)=>handleChange("permanentPost", e.target.value)}
              />
            </>
          )}

        </div>

        {/* FILES */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">परीविक्षा प्रमाणपत्र</label>
            <input
              type="file"
              className="input mt-1"
              onChange={(e)=>handleFile("probationFile", e.target.files[0])}
            />
          </div>

          <div>
            <label className="text-sm font-medium">स्थायीत्व प्रमाणपत्र</label>
            <input
              type="file"
              className="input mt-1"
              onChange={(e)=>handleFile("permanentFile", e.target.files[0])}
            />
          </div>

        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default CurrentPostingForm;