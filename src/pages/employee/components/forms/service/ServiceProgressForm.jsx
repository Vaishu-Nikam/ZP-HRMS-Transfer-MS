import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveServiceStep3 } from "../../../../../services/employeeService";

const yesNo = [
  { id: "yes", name: "होय" },
  { id: "no", name: "नाही" },
];

const emptyBenefit = {
  years_required: "",
  benefit_no: "",
  service_completion_date: "",
  benefit_received: "no",
  benefit_date: "",
  due_date: "",
  order_number: "",
  order_date: "",
};

const BenefitSection = ({ title, data, onChange, onDate }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
    <h3 className="text-sm font-semibold text-slate-700">{title}</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* DropdownSearch */}
      <div>
        <label className="text-sm font-medium">लाभ मिळाला का?</label>
        <DropdownSearch
          value={data.benefit_received}
          onChange={onChange}
          options={yesNo}
          placeholder="निवडा"
        />
      </div>

      <Input
        label="लाभ क्रमांक"
        name="benefit_no"
        value={data.benefit_no}
        onChange={onChange}
      />

      {data.benefit_received === "yes" && (
        <>
          <DatePicker
            label="सेवा पूर्ण दिनांक"
            value={data.service_completion_date}
            onChange={(v) => onDate("service_completion_date", v)}
          />

          <DatePicker
            label="लाभ मिळाल्याचा दिनांक"
            value={data.benefit_date}
            onChange={(v) => onDate("benefit_date", v)}
          />

          <DatePicker
            label="देय दिनांक"
            value={data.due_date}
            onChange={(v) => onDate("due_date", v)}
          />

          <DatePicker
            label="आदेश दिनांक"
            value={data.order_date}
            onChange={(v) => onDate("order_date", v)}
          />

          <Input
            label="आदेश क्रमांक"
            name="order_number"
            value={data.order_number}
            onChange={onChange}
          />
        </>
      )}
    </div>
  </div>
);

const ServiceProgressForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [benefits, setBenefits] = useState([
    { ...emptyBenefit, years_required: "10" },
    { ...emptyBenefit, years_required: "24" },
    { ...emptyBenefit, years_required: "30" },
  ]);

  const [formData, setFormData] = useState({
    chattopadhyay_granted: "no",
    chattopadhyay_order_no: "",
    chattopadhyay_order_date: "",
    nivadshreeni_order_no: "",
    nivadshreeni_order_date: "",
    year: "",
    submitted: "no",
    submitted_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBenefitChange = (index, e) => {
    const updated = [...benefits];
    updated[index][e.target.name || "benefit_received"] = e.target.value;
    setBenefits(updated);
  };

  const handleBenefitDate = (index, field, val) => {
    const updated = [...benefits];
    updated[index][field] = val;
    setBenefits(updated);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
  setError("");
  setLoading(true);

  try {
    const validServices = benefits.filter(
      (b) => b.benefit_received === "yes"
    );

    if (validServices.length === 0) {
      throw new Error("किमान एक लाभ भरावा लागेल");
    }

    const payload = new FormData();

    payload.append("user_id", String(userId));
    payload.append("services", JSON.stringify(benefits));

    // 🔥 FIX START

    payload.append("chattopadhyay_granted", formData.chattopadhyay_granted || "no");

    payload.append(
      "chattopadhyay_order_no",
      formData.chattopadhyay_order_no || "0"
    );

    payload.append(
      "chattopadhyay_order_date",
      formData.chattopadhyay_order_date || "2024-01-01"
    );

    payload.append(
      "nivadshreeni_order_no",
      formData.nivadshreeni_order_no || "0"
    );

    payload.append(
      "nivadshreeni_order_date",
      formData.nivadshreeni_order_date || "2024-01-01"
    );

    payload.append("year", formData.year || "0");

    payload.append("submitted", formData.submitted || "no");

    payload.append(
      "submitted_date",
      formData.submitted_date || "2024-01-01"
    );

    await saveServiceStep3(payload);

    onNext();

  } catch (err) {
    setError(err?.response?.data?.message || err.message);
  } finally {
    setLoading(false);
  }
};

  const benefitTitles = [
    "पहिला लाभ (10 वर्षे)",
    "दुसरा लाभ (24 वर्षे)",
    "तिसरा लाभ (30 वर्षे)",
  ];

  return (
    <EmployeeFormCard
      title="कर्मचारी सेवाबाबत माहिती"
      onNext={handleNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* Benefits */}
        {benefits.map((b, i) => (
          <BenefitSection
            key={i}
            title={benefitTitles[i]}
            data={b}
            onChange={(e) => handleBenefitChange(i, e)}
            onDate={(field, val) => handleBenefitDate(i, field, val)}
          />
        ))}

        {/* Chattopadhyay */}
        <div>
          <label className="text-sm font-medium">चट्टोपाध्याय मंजूर आहे का?</label>
          <DropdownSearch
            value={formData.chattopadhyay_granted}
            onChange={(e) => handleChange("chattopadhyay_granted", e.target.value)}
            options={yesNo}
            placeholder="निवडा"
          />
        </div>

        {/* Submitted */}
        <div>
          <label className="text-sm font-medium">मत्ता दायित्व सादर केले आहे का?</label>
          <DropdownSearch
            value={formData.submitted}
            onChange={(e) => handleChange("submitted", e.target.value)}
            options={yesNo}
            placeholder="निवडा"
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default ServiceProgressForm;