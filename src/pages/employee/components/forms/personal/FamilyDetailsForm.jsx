import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";

const FamilyDetailsForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
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
      title="कौटुंबिक माहिती"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="space-y-4">

        {members.map((member, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-3 border p-4 rounded-lg"
          >

            {/* संज्ञा */}
            <input
              className="input"
              placeholder="संज्ञा"
              value={member.title}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
            />

            {/* पहिले नाव */}
            <input
              className="input"
              placeholder="पहिले नाव"
              value={member.firstName}
              onChange={(e) =>
                handleChange(index, "firstName", e.target.value)
              }
            />

            {/* वडिलांचे/पतीचे नाव */}
            <input
              className="input"
              placeholder="वडिलांचे/पतीचे नाव"
              value={member.middleName}
              onChange={(e) =>
                handleChange(index, "middleName", e.target.value)
              }
            />

            {/* आडनाव */}
            <input
              className="input"
              placeholder="आडनाव"
              value={member.lastName}
              onChange={(e) =>
                handleChange(index, "lastName", e.target.value)
              }
            />

            {/* जन्मतारीख */}
            <DatePicker
              value={member.dob}
              onChange={(val) =>
                handleChange(index, "dob", val)
              }
              placeholder="जन्मतारीख"
            />

            {/* नाते */}
            <input
              className="input"
              placeholder="नाते"
              value={member.relation}
              onChange={(e) =>
                handleChange(index, "relation", e.target.value)
              }
            />

            {/* Remove Button */}
            <div className="col-span-6 flex justify-end">
              {members.length > 1 && (
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

          </div>
        ))}

        {/* Add Button */}
        <div>
          <button
            onClick={addRow}
            className="btn-primary"
          >
            + सदस्य जोडा
          </button>
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default FamilyDetailsForm;