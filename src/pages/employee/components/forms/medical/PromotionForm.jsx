import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePromotionStep1 } from "../../../../../services/employeeService";

const PromotionForm = (props) => {

  const [records, setRecords] = useState([
    {
      type: "",
      category: "",
      orderDate: "",
      isCurrentPost: "",
      isDistrictTransfer: "",
      postingPlace: "",
      panchayat: "",
      level: "",
      office: "",
      designation: "",
      isGazetted: "",
      joinDate: "",
      endDate: "",
    },
  ]);

  const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const handleSubmit = async () => {
  try {
    if (!props.userId) return;

    const item = records[0];

    const payload = {
      user_id: Number(props.userId),

      promotion_type: item.type,
      promotion_category: item.category,
      order_date: formatDate(item.orderDate),

      is_current_posting:
        item.isCurrentPost === "होय" ? "yes" : "no",

      is_district_transfer:
        item.isDistrictTransfer === "होय" ? "yes" : "no",

      posting_location_type: item.postingPlace,
      panchayat_samiti: item.panchayat,
      dept_level: item.level,
      office_name: item.office,
      post_name: item.designation,

      is_gazetted:
        item.isGazetted === "होय" ? "yes" : "no",

      joining_date: formatDate(item.joinDate),
      end_date: formatDate(item.endDate),
    };

    console.log("PROMOTION PAYLOAD:", payload);

    await savePromotionStep1(payload);

    props.onNext();

  } catch (err) {
    console.error("Promotion API Error:", err.response?.data || err);
  }
};

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const levels = [
    { id: "1", name: "मुख्यालय विभाग" },
    { id: "2", name: "पंचायत समितीचे कार्यालय" },
    { id: "3", name: "ग्रामपंचायत कार्यालय" },
    { id: "4", name: "प्राथमिक आरोग्य केंद्र कार्यालय" },
    { id: "5", name: "शाळा" },
    { id: "6", name: "अंगणवाडी" },
    { id: "7", name: "पशुवैद्यकीय दवाखाना" },
    { id: "8", name: "प्राथमिक आरोग्य उपकेंद्र" },
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
        type: "",
        category: "",
        orderDate: "",
        isCurrentPost: "",
        isDistrictTransfer: "",
        postingPlace: "",
        panchayat: "",
        level: "",
        office: "",
        designation: "",
        isGazetted: "",
        joinDate: "",
        endDate: "",
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
   <EmployeeFormCard
  title="पदोन्नती माहिती"
  onNext={handleSubmit}
  onPrev={props.onPrev}
  onCancel={props.onCancel}
  isFirst={props.isFirst}
  isLast={props.isLast}
>
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

              <Input
                label="पदोन्नतीचा प्रकार"
                value={r.type}
                onChange={(e) => handleChange(i, "type", e.target.value)}
              />

              <Input
                label="पदोन्नतीचा प्रवर्ग"
                value={r.category}
                onChange={(e) => handleChange(i, "category", e.target.value)}
              />

              <DatePicker
                label="आदेशाचा दिनांक"
                value={r.orderDate}
                onChange={(val) => handleChange(i, "orderDate", val)}
              />

              <div>
                <label className="text-sm font-medium">
                  सध्याचे पदनाम/कार्यालय आहे का?
                </label>
                <DropdownSearch
                  value={r.isCurrentPost}
                  onChange={(e) => handleChange(i, "isCurrentPost", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  जिल्हा बदली झाली आहे का?
                </label>
                <DropdownSearch
                  value={r.isDistrictTransfer}
                  onChange={(e) => handleChange(i, "isDistrictTransfer", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="पदस्थापना ठिकाण"
                value={r.postingPlace}
                onChange={(e) => handleChange(i, "postingPlace", e.target.value)}
              />

              <Input
                label="पंचायत समिती"
                value={r.panchayat}
                onChange={(e) => handleChange(i, "panchayat", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">विभागस्तर</label>
                <DropdownSearch
                  value={r.level}
                  onChange={(e) => handleChange(i, "level", e.target.value)}
                  options={levels}
                  placeholder="निवडा"
                />
              </div>

              <Input
                label="कार्यालय"
                value={r.office}
                onChange={(e) => handleChange(i, "office", e.target.value)}
              />

              <Input
                label="पदनाम"
                value={r.designation}
                onChange={(e) => handleChange(i, "designation", e.target.value)}
              />

              <div>
                <label className="text-sm font-medium">
                  राजपत्रित आहे का?
                </label>
                <DropdownSearch
                  value={r.isGazetted}
                  onChange={(e) => handleChange(i, "isGazetted", e.target.value)}
                  options={yesNo}
                  placeholder="निवडा"
                />
              </div>

              <DatePicker
                label="रुजू होण्याचा दिनांक"
                value={r.joinDate}
                onChange={(val) => handleChange(i, "joinDate", val)}
              />

              <DatePicker
                label="कालावधी समाप्तीचा दिनांक"
                value={r.endDate}
                onChange={(val) => handleChange(i, "endDate", val)}
              />

            </div>
          </div>
        ))}

        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default PromotionForm;