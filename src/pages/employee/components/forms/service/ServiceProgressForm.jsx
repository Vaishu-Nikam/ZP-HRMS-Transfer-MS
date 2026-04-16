import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const ServiceProgressForm = (props) => {
  const [formData, setFormData] = useState({
    firstBenefit: "",
    firstCompleteDate: "",
    firstGivenDate: "",
    firstDueDate: "",
    firstOrderDate: "",
    firstOrderNo: "",

    secondBenefit: "",
    secondCompleteDate: "",
    secondGivenDate: "",
    secondDueDate: "",
    secondOrderDate: "",
    secondOrderNo: "",

    thirdBenefit: "",
    thirdCompleteDate: "",
    thirdGivenDate: "",
    thirdDueDate: "",
    thirdOrderDate: "",
    thirdOrderNo: "",

    chattoPay: "",
    chattoOrder: "",

    selectionPay: "",
    selectionOrder: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  return (
    <EmployeeFormCard title="कर्मचारी सेवाबाबत माहिती" {...props}>
      <div className="space-y-6">

        {/* 🔷 FIRST BENEFIT */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">पहिला लाभ (10/12 वर्षे)</h3>

          <div>
            <label className="text-sm font-medium">लाभ मिळाला का?</label>
            <DropdownSearch
              value={formData.firstBenefit}
              onChange={(e)=>handleChange("firstBenefit", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.firstBenefit === "होय" && (
            <>
              <DatePicker label="पूर्ण दिनांक"
                onChange={(v)=>handleChange("firstCompleteDate", v)} />

              <DatePicker label="मिळाल्याचा दिनांक"
                onChange={(v)=>handleChange("firstGivenDate", v)} />

              <DatePicker label="देय दिनांक"
                onChange={(v)=>handleChange("firstDueDate", v)} />

              <DatePicker label="आदेश दिनांक"
                onChange={(v)=>handleChange("firstOrderDate", v)} />

              <Input label="आदेश क्रमांक"
                onChange={(e)=>handleChange("firstOrderNo", e.target.value)} />
            </>
          )}
        </div>

        {/* 🔷 SECOND BENEFIT */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">दुसरा लाभ (20/24 वर्षे)</h3>

          <div>
            <label className="text-sm font-medium">लाभ मिळाला का?</label>
            <DropdownSearch
              value={formData.secondBenefit}
              onChange={(e)=>handleChange("secondBenefit", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.secondBenefit === "होय" && (
            <>
              <DatePicker label="पूर्ण दिनांक"
                onChange={(v)=>handleChange("secondCompleteDate", v)} />

              <DatePicker label="मिळाल्याचा दिनांक"
                onChange={(v)=>handleChange("secondGivenDate", v)} />

              <DatePicker label="देय दिनांक"
                onChange={(v)=>handleChange("secondDueDate", v)} />

              <DatePicker label="आदेश दिनांक"
                onChange={(v)=>handleChange("secondOrderDate", v)} />

              <Input label="आदेश क्रमांक"
                onChange={(e)=>handleChange("secondOrderNo", e.target.value)} />
            </>
          )}
        </div>

        {/* 🔷 THIRD BENEFIT */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">तिसरा लाभ (30 वर्षे)</h3>

          <div>
            <label className="text-sm font-medium">लाभ मिळाला का?</label>
            <DropdownSearch
              value={formData.thirdBenefit}
              onChange={(e)=>handleChange("thirdBenefit", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.thirdBenefit === "होय" && (
            <>
              <DatePicker label="पूर्ण दिनांक"
                onChange={(v)=>handleChange("thirdCompleteDate", v)} />

              <DatePicker label="मिळाल्याचा दिनांक"
                onChange={(v)=>handleChange("thirdGivenDate", v)} />

              <DatePicker label="देय दिनांक"
                onChange={(v)=>handleChange("thirdDueDate", v)} />

              <DatePicker label="आदेश दिनांक"
                onChange={(v)=>handleChange("thirdOrderDate", v)} />

              <Input label="आदेश क्रमांक"
                onChange={(e)=>handleChange("thirdOrderNo", e.target.value)} />
            </>
          )}
        </div>

        {/* 🔷 CHATTOPADHYAY */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">चट्टोपाध्याय वेतनश्रेणी</h3>

          <div>
            <label className="text-sm font-medium">मंजूर आहे का?</label>
            <DropdownSearch
              value={formData.chattoPay}
              onChange={(e)=>handleChange("chattoPay", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.chattoPay === "होय" && (
            <Input label="आदेश क्रमांक व दिनांक"
              onChange={(e)=>handleChange("chattoOrder", e.target.value)} />
          )}
        </div>

        {/* 🔷 SELECTION PAY */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">निवडश्रेणी वेतनश्रेणी</h3>

          <div>
            <label className="text-sm font-medium">मंजूर आहे का?</label>
            <DropdownSearch
              value={formData.selectionPay}
              onChange={(e)=>handleChange("selectionPay", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          {formData.selectionPay === "होय" && (
            <Input label="आदेश क्रमांक व दिनांक"
              onChange={(e)=>handleChange("selectionOrder", e.target.value)} />
          )}
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default ServiceProgressForm;