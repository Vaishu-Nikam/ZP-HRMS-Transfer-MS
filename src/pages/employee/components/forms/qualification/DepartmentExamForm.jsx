import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const DepartmentExamForm = (props) => {
  const [records, setRecords] = useState([
    {
      examName: "",
      status: "",
      passDate: "",
      attemptNo: "",
    },
  ]);

  const examOptions = [
    "सेवा प्रवेशात्तर परीक्षा",
    "महाराष्ट्र लेख लिपीक परीक्षा",
    "MFS परीक्षा",
    "व्यावसायिक चाचणी परीक्षा",
    "उपलेखापाल परीक्षा",
    "बहुउद्देशीय आरोग्य सेवक प्रशिक्षण",
    "आरोग्य परिचर प्रशिक्षण",
    "स्था.अ. साठी विभागीय परीक्षा",
  ];

  const statusOptions = [
    "परीक्षा दिली नाही",
    "उत्तीर्ण",
    "अनुतीर्ण",
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
    <EmployeeFormCard title="विभागीय परीक्षा माहिती" {...props}>
      <div className="space-y-4">

        {records.map((r, i) => (
          <div key={i} className="border rounded-xl p-4 bg-slate-50">

            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold">
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
            <div className="grid grid-cols-2 gap-4">

              {/* परीक्षा नाव */}
              <div>
                <label className="text-sm font-medium">
                  परीक्षेचे नाव
                </label>
                <select
                  className="input mt-1"
                  value={r.examName}
                  onChange={(e) =>
                    handleChange(i, "examName", e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {examOptions.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* सद्यस्थिती */}
              <div>
                <label className="text-sm font-medium">
                  सद्यस्थिती
                </label>
                <select
                  className="input mt-1"
                  value={r.status}
                  onChange={(e) =>
                    handleChange(i, "status", e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {statusOptions.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Condition fields */}
              {r.status === "उत्तीर्ण" && (
                <>
                  <DatePicker
                    label="उत्तीर्ण झाल्याची तारीख"
                    value={r.passDate}
                    onChange={(val) =>
                      handleChange(i, "passDate", val)
                    }
                  />

                  <Input
                    label="संधी क्रमांक"
                    placeholder="Enter Attempt No"
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

        {/* Add */}
        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default DepartmentExamForm;