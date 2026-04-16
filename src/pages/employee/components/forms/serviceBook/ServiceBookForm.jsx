import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const ServiceBookForm = (props) => {

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

  const addRow = () => {
    setRecords([
      ...records,
      {
        isSecondaryBook: "",
        isUpdated: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="सेवा पुस्तक" {...props}>
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

              {/* दुय्यम सेवा पुस्तक */}
              <div>
                <label className="text-sm font-medium">
                  दुय्यम सेवापुस्तक मिळाले का?
                </label>
                <DropdownSearch
                  value={r.isSecondaryBook}
                  onChange={(e) =>
                    handleChange(i, "isSecondaryBook", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {/* अद्यावत आहे का */}
              <div>
                <label className="text-sm font-medium">
                  अद्यावत आहे का?
                </label>
                <DropdownSearch
                  value={r.isUpdated}
                  onChange={(e) =>
                    handleChange(i, "isUpdated", e.target.value)
                  }
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              {/* File Upload */}
              <div className="col-span-2">
                <label className="text-sm font-medium">
                  सेवा पुस्तक (Max 60MB)
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

export default ServiceBookForm;