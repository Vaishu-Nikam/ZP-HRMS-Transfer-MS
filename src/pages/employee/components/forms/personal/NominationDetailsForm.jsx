import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { Textarea } from "../../../../../components/common/Textarea";
import { saveStep10 } from "../../../../../services/employeeService";

const NominationDetailsForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [records, setRecords] = useState([
    {
      nominationType: "",
      nomineeName: "",
      relation: "",
      age: "",
      share: "",
      condition: "",
      altNomineeName: "",
      altRelation: "",
      altAddress: "",
    },
  ]);

  const nominationOptions = [
    { id: 1, name: "गट विमा योजना नामनिर्देशन" },
    { id: 2, name: "भविष्य निर्वाह निधी नामनिर्देशन" },
    { id: 3, name: "निवृत्तीवेतन नामनिर्देशन" },
    { id: 4, name: "मृत्य नि सेवा उपदानाची नामनिर्देशन" },
    { id: 5, name: "DCPS/NPS नामनिर्देशन" },
    { id: 6, name: "अपघात विमा योजना नामनिर्देशन" },
    { id: 7, name: "कुटुंब निवृत्तीवेतन नामनिर्देशन" },
  ];

  const handleChange = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        nominationType: "",
        nomineeName: "",
        relation: "",
        age: "",
        share: "",
        condition: "",
        altNomineeName: "",
        altRelation: "",
        altAddress: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
  };

  // ✅ middle name auto
  const getMiddleName = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.length > 1 ? parts[1] : "NA";
  };


  const handleSubmit = async () => {
    try {

      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        // ✅ validation
        if (
          !item.nominationType ||
          !item.nomineeName ||
          !item.relation ||
          !item.age ||
          !item.share
        ) {
          alert("सर्व माहिती भरा");
          return;
        }

        const payload = {
          user_id: userId,

        
          nomination_type: item.nominationType?.id || item.nominationType,
          nominee_name: item.nomineeName,
          middle_name: getMiddleName(item.nomineeName),
          relation_to_employee: item.relation,
          nominee_age: Number(item.age) || 0,
          share_percentage: Number(item.share.split("/")[0]),
          contingency_event: item.condition ? 2 : 1,
          alternate_nominee_name: item.altNomineeName || "",
          alternate_nominee_relation: item.altRelation || "",
          alternate_nominee_address: item.altAddress || "",
        };

        console.log("FINAL PAYLOAD:", payload);

        await saveStep10(payload);
      }

      alert("नामनिर्देशन माहिती जतन झाली ✅");
      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="विविध नामनिर्देशन माहिती"
      onNext={handleSubmit}
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

            <div className="grid grid-cols-2 gap-4">

              <div className="col-span-2">
                <DropdownSearch
                  options={nominationOptions}
                  value={item.nominationType}
                  onChange={(e) =>
                    handleChange(index, "nominationType", e.target.value)
                  }
                  placeholder="नामनिर्देशन प्रकार निवडा"
                />
              </div>

              <Input
                label="नामनिर्देशित व्यक्तीचे नाव"
                value={item.nomineeName}
                onChange={(e) =>
                  handleChange(index, "nomineeName", e.target.value)
                }
              />

              <Input
                label="वर्गणीदाराशी नाते"
                value={item.relation}
                onChange={(e) =>
                  handleChange(index, "relation", e.target.value)
                }
              />

              <Input
                label="नामनिर्देशित व्यक्तीचे वय"
                type="number"
                value={item.age}
                onChange={(e) => handleChange(index, "age", e.target.value)}
              />

              <Input
                label="रकमेचा भाग (%)"
                value={item.share}
                onChange={(e) => handleChange(index, "share", e.target.value)}
              />

              <Input
                label="पर्यायी नामनिर्देशित व्यक्तीचे नाव"
                value={item.altNomineeName}
                onChange={(e) =>
                  handleChange(index, "altNomineeName", e.target.value)
                }
              />

              <Input
                label="पर्यायी नाते"
                value={item.altRelation}
                onChange={(e) =>
                  handleChange(index, "altRelation", e.target.value)
                }
              />

              <Textarea
                label="आकस्मिक घटना"
                rows={3}
                value={item.condition}
                onChange={(e) =>
                  handleChange(index, "condition", e.target.value)
                }
              />

              <Textarea
                label="पर्यायी पत्ता"
                rows={3}
                value={item.altAddress}
                onChange={(e) =>
                  handleChange(index, "altAddress", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button onClick={addRow} className="btn-primary">
          + नामनिर्देशन जोडा
        </button>
      </div>
    </EmployeeFormCard>
  );
};

export default NominationDetailsForm;