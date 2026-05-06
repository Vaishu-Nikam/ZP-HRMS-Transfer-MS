import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import { saveDiscussionStep1 } from "../../../../../services/employeeService";

const UnauthorizedAbsenceForm = (props) => {
  

  const [records, setRecords] = useState([
    { fromDate: "", toDate: "", action: "", file: null }
  ]);

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    const data = [...records];
    data[i].file = file;
    setRecords(data);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    console.log("🔥 DISCUSSION STEP1 CLICK");

    try {
      if (!props.userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // ✅ validation
        if (!item.fromDate || !item.toDate || !item.action) {
          alert("सर्व माहिती भरा");
          return;
        }

        // 🔥 file required (important)
        if (!item.file) {
          alert("फाइल अपलोड करा");
          return;
        }

        const formData = new FormData();

        formData.append("user_id", props.userId);
        formData.append("from_date", formatDate(item.fromDate));
        formData.append("to_date", formatDate(item.toDate));
        formData.append("action_taken", item.action || "None");
        formData.append("absence_cert", item.file); // ✅ always append

        // 🔥 DEBUG
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        await saveDiscussionStep1(formData);
      }

      props.onNext && props.onNext();

    } catch (err) {
      console.log("❌ ERROR FULL:", err);
      console.log("❌ RESPONSE:", err.response);
      console.log("❌ DATA:", err.response?.data);

      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="अनधिकृत गैरहजर"
      {...props}
      onNext={handleSubmit}
    >
      {records.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4">

          <DatePicker
            label="पासून"
            value={r.fromDate}
            onChange={(val) => handleChange(i, "fromDate", val)}
          />

          <DatePicker
            label="पर्यंत"
            value={r.toDate}
            onChange={(val) => handleChange(i, "toDate", val)}
          />

          <Input
            label="कार्यवाही"
            value={r.action}
            onChange={(e) => handleChange(i, "action", e.target.value)}
          />

          <input
            type="file"
            className="input"
            onChange={(e) => handleFile(i, e.target.files[0])}
          />

        </div>
      ))}
    </EmployeeFormCard>
  );
};

export default UnauthorizedAbsenceForm;