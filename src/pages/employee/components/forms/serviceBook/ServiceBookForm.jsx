import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const ServiceBookForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  setServiceBookData,
}) => {

  const [records, setRecords] = useState([
    {
      isSecondaryBook: "",
      isUpdated: "",
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
    if (file && file.size > 60 * 1024 * 1024) {
      alert("File size must be less than 60MB");
      return;
    }
    handleChange(i, "document", file);
  };

  const handleSubmit = () => {
    const item = records[0];

    if (!item.isSecondaryBook || !item.isUpdated) {
      alert("सर्व माहिती भरा");
      return;
    }

    // 🔥 DEBUG (IMPORTANT)
    console.log("STEP1 DATA:", item);

    // 🔥 SAFETY CHECK
    if (typeof setServiceBookData !== "function") {
      console.error("setServiceBookData is missing ❌");
      alert("Internal Error: Step data function missing");
      return;
    }

    // 🔥 SET DATA PROPERLY
    setServiceBookData({ ...item });

    onNext();
  };

  return (
    <EmployeeFormCard
      title="सेवा पुस्तक"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        <DropdownSearch
          value={records[0].isSecondaryBook}
          onChange={(e) =>
            handleChange(0, "isSecondaryBook", e.target.value)
          }
          options={yesNo}
          placeholder="दुय्यम सेवापुस्तक मिळाले का?"
        />

        <DropdownSearch
          value={records[0].isUpdated}
          onChange={(e) =>
            handleChange(0, "isUpdated", e.target.value)
          }
          options={yesNo}
          placeholder="अद्यावत आहे का?"
        />

        <div className="col-span-2">
          <label className="text-sm font-medium">
            सेवा पुस्तक (Max 60MB)
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile(0, e.target.files[0])}
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default ServiceBookForm;