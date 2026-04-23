import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { Textarea } from "../../../../../components/common/Textarea";

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

            <div className="grid grid-cols-2 gap-4">
              {/* Dropdown */}
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
                label="नामनिर्देशित व्यक्तीला देय असलेला रकमेचा भाग (In Percentage उदा. 78/100)"
                value={item.share}
                onChange={(e) => handleChange(index, "share", e.target.value)}
              />

           

              <Input
                label="वर्गणीदाराच्या आधी नामनिर्देशित व्यक्ती मरण पावल्यास तिचा हक्क ज्या व्यक्तीकडे जाईल त्या व्यक्तीचे नाव"
                value={item.altNomineeName}
                onChange={(e) =>
                  handleChange(index, "altNomineeName", e.target.value)
                }
              />

              <Input
                label="वर्गणीदाराच्या आधी नामनिर्देशित व्यक्ती मरण पावल्यास तिचा हक्क ज्या व्यक्तीकडे जाईल त्या व्यक्तीचे वर्गणीदाराशी नाते"
                value={item.altRelation}
                onChange={(e) =>
                  handleChange(index, "altRelation", e.target.value)
                }
              />

                 <Textarea
                label="ज्या घटना घडल्यामुळे नामनिर्देशन विधिअग्राह्य ठरेल अशा आकस्मिक घटना"
                rows={3}
                value={item.condition}
                onChange={(e) =>
                  handleChange(index, "condition", e.target.value)
                }
              />

              <Textarea
                label="वर्गणीदाराच्या आधी नामनिर्देशित व्यक्ती मरण पावल्यास तिचा हक्क ज्या व्यक्तीकडे जाईल त्या व्यक्तीचा पत्ता"
                rows={3}
                value={item.altAddress}
                onChange={(e) =>
                  handleChange(index, "altAddress", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button onClick={addRow} className="btn-primary">
          + नामनिर्देशन जोडा
        </button>
      </div>
    </EmployeeFormCard>
  );
};

export default NominationDetailsForm;
