import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const FamilyDetailsForm = ({ onNext, onPrev, onCancel, isFirst, isLast }) => {
  const [members, setMembers] = useState([
    {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      relation: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addRow = () => {
    setMembers([
      ...members,
      {
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        relation: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <EmployeeFormCard
      title="१७. कौटुंबिक माहिती"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-5">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">
                सदस्य {index + 1}
              </h3>

              {members.length > 1 && (
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="संज्ञा"
                placeholder="उदा. श्री / सौ / कु"
                value={member.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />

              <Input
                label="पहिले नाव"
                placeholder="उदा. राहुल"
                value={member.firstName}
                onChange={(e) =>
                  handleChange(index, "firstName", e.target.value)
                }
              />

              <Input
                label="वडिलांचे/पतीचे नाव"
                placeholder="उदा. राम"
                value={member.middleName}
                onChange={(e) =>
                  handleChange(index, "middleName", e.target.value)
                }
              />

              <Input
                label="आडनाव"
                placeholder="उदा. पाटील"
                value={member.lastName}
                onChange={(e) =>
                  handleChange(index, "lastName", e.target.value)
                }
              />

              <DatePicker
                label="जन्मतारीख (dd/MM/yyyy)"
                placeholder="दिनांक निवडा"
                value={member.dob}
                onChange={(val) => handleChange(index, "dob", val)}
              />

              <Input
                label="नाते"
                placeholder="उदा. पत्नी / मुलगा / वडील"
                value={member.relation}
                onChange={(e) =>
                  handleChange(index, "relation", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {/* Add Button */}
        <div>
          <button onClick={addRow} className="btn-primary">
            + सदस्य जोडा
          </button>
        </div>
      </div>
    </EmployeeFormCard>
  );
};

export default FamilyDetailsForm;
