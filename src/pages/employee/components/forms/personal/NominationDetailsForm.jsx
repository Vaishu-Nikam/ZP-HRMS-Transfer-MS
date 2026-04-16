import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";

const NominationDetailsForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [records, setRecords] = useState([
    {
      nominationType: "",
    },
  ]);

  const nominationOptions = [
    "गट विमा योजना नामनिर्देशन",
    "भविष्य निर्वाह निधी नामनिर्देशन",
    "निवृत्तीवेतन नामनिर्देशन",
    "मृत्य नि सेवा उपदानाची नामनिर्देशन",
    "DCPS/NPS नामनिर्देशन",
    "अपघात विमा योजना नामनिर्देशन",
    "कुटुंब निवृत्तीवेतन नामनिर्देशन",
  ];

  const handleChange = (index, value) => {
    const updated = [...records];
    updated[index].nominationType = value;
    setRecords(updated);
  };

  const addRow = () => {
    setRecords([...records, { nominationType: "" }]);
  };

  const removeRow = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
  };

  return (
    <EmployeeFormCard
      title="विविध नामनिर्देशन माहिती"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-4">

        {records.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-4 bg-slate-50"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-slate-700">
                नामनिर्देशन {index + 1}
              </h3>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              <div className="col-span-2">
                <label className="text-sm font-medium">
                  नामनिर्देशन प्रकार
                </label>
                <select
                  className="input mt-1"
                  value={item.nominationType}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                >
                  <option value="">निवडा</option>
                  {nominationOptions.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

            </div>

          </div>
        ))}

        {/* Add Button */}
        <div>
          <button
            onClick={addRow}
            className="btn-primary"
          >
            + नामनिर्देशन जोडा
          </button>
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default NominationDetailsForm;