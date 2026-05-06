import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveAdvanceInfo } from "../../../../../services/employeeService";

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

  // 🔥 TYPE MAP
  const typeMap = {
    "1": "salary",
    "2": "housing",
    "3": "vehicle",
    "4": "computer",
    "5": "travel",
    "6": "marriage",
    "7": "medical",
    "8": "education",
    "9": "disaster",
    "10": "other",
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      if (!props.userId) return;

      const item = records[0];

      // ✅ VALIDATION
      if (!item.type || !item.details || !item.amount || !item.isPaid || !item.certificate) {
        console.error("All fields required");
        return;
      }

      // 🔥 CERTIFICATE SPLIT + FIX
      const parts = item.certificate.split("/");

      const certNo = parts[0]?.trim() || "";
      const certDateRaw = parts[1]?.trim();

      const certDate = certDateRaw
        ? formatDate(certDateRaw)
        : formatDate(new Date()); // fallback

      const payload = {
        user_id: Number(props.userId),

        advance_type: typeMap[item.type] || "",

        advance_details: item.details,
        amount: item.amount,

        fully_repaid:
          item.isPaid === "होय" ? "true" : "false",

        repaid_cert_no: certNo,

        // 🔥 NEVER EMPTY
        repaid_cert_date: certDate,
      };

      console.log("FINAL PAYLOAD:", payload);

      await saveAdvanceInfo(payload);

      props.onNext();

    } catch (err) {
      console.error("Advance API Error:", err.response?.data || err);
    }
  };

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
    <EmployeeFormCard
      title="अग्रिम माहिती"
      onNext={handleSubmit}
      onPrev={props.onPrev}
      onCancel={props.onCancel}
      isFirst={props.isFirst}
      isLast={props.isLast}
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
                  अग्रिम प्रकार
                </label>
                <DropdownSearch
                  value={r.type}
                  onChange={(e) => handleChange(i, "type", e.target.value)}
                  options={advanceTypes}
                  placeholder="अग्रिम प्रकार निवडा"
                />
              </div>

              <Input
                label="अग्रिम तपशील"
                placeholder="उदा. वेतन अग्रिम तपशील"
                value={r.details}
                onChange={(e) => handleChange(i, "details", e.target.value)}
              />

              <Input
                label="अग्रिम रक्कम"
                placeholder="उदा. 50000"
                value={r.amount}
                onChange={(e) => handleChange(i, "amount", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">
                  संपूर्ण परतफेड झाली आहे का?
                </label>
                <DropdownSearch
                  value={r.isPaid}
                  onChange={(e) => handleChange(i, "isPaid", e.target.value)}
                  options={yesNo}
                  placeholder="होय / नाही निवडा"
                />
              </div>

              <Input
                label="प्रमाणपत्र क्रमांक / दिनांक"
                placeholder="उदा. 123 / 2025-07-09"
                value={r.certificate}
                onChange={(e) => handleChange(i, "certificate", e.target.value)}
              />

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