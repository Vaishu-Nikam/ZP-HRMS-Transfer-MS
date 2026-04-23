import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const CompetitiveExamForm = (props) => {

  const [records, setRecords] = useState([
    {
      examName: "",
      status: "",
      passDate: "",
      attemptNo: "",
    },
  ]);

  const statusOptions = [
    { id: "परीक्षा दिली नाही", name: "परीक्षा दिली नाही" },
    { id: "उत्तीर्ण", name: "उत्तीर्ण" },
    { id: "अनुतीर्ण", name: "अनुतीर्ण" },
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
        examName: "",
        status: "",
        passDate: "",
        attemptNo: "",
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="स्पर्धा परीक्षा माहिती" {...props}>

      <div className="space-y-5">

        {records.map((r, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-4 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">
                रेकॉर्ड {i + 1}
              </h3>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* परीक्षा नाव */}
              <Input
                label="परीक्षेचे नाव"
                placeholder="उदा. MPSC / UPSC"
                value={r.examName}
                onChange={(e) =>
                  handleChange(i, "examName", e.target.value)
                }
              />

              {/* स्थिती */}
              <div>
                <label className="text-sm font-medium text-slate-700">
                  सद्यस्थिती
                </label>
                <DropdownSearch
                  options={statusOptions}
                  value={r.status}
                  onChange={(e) =>
                    handleChange(i, "status", e.target.value)
                  }
                  placeholder="निवडा"
                />
              </div>

              {/* Conditional Fields */}
              {r.status === "उत्तीर्ण" && (
                <>
                  <DatePicker
                    label="उत्तीर्ण झाल्याची तारीख (dd/MM/yyyy)"
                    value={r.passDate}
                    onChange={(val) =>
                      handleChange(i, "passDate", val)
                    }
                    placeholder="दिनांक निवडा"
                  />

                  <Input
                    label="उत्तीर्ण असल्यास संधी क्रमांक"
                    placeholder="उदा. 1"
                    value={r.attemptNo}
                    onChange={(e) =>
                      handleChange(i, "attemptNo", e.target.value)
                    }
                  />
                </>
              )}

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

export default CompetitiveExamForm;