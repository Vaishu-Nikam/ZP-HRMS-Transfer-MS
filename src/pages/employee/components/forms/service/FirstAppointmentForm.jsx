import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import DatePicker from "../../../../../components/common/DatePicker";
import { saveServiceStep1 } from "../../../../../services/employeeService";

const yesNo = [
  { id: "होय", name: "होय" },
  { id: "नाही", name: "नाही" },
];

const FirstAppointmentForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [formData, setFormData] = useState({});
const [file, setFile] = useState(null);
const yesNo = [
  { id: "होय", name: "होय" },
  { id: "नाही", name: "नाही" },
];
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const mapYesNo = (val) => {
  if (val === "होय") return "Y";
  if (val === "नाही") return "N";
  return "";
};

const handleSubmit = async () => {
  try {
    const payload = new FormData();

    payload.append("user_id", String(userId));
    payload.append("appointment_route", formData.mode || "");
    payload.append("social_reservation", formData.social || "");
    payload.append("parallel_reservation", formData.parallel || "");
    payload.append("order_number", formData.orderNo || "");
    payload.append("order_date", formData.orderDate || "");

    payload.append("is_district_transfer", mapYesNo(formData.transfer));

    payload.append("posting_location_type", formData.location || "");
    payload.append("panchayat_samiti", formData.panchayat || "");
    payload.append("dept_level", formData.dept || "");
    payload.append("office_name", formData.office || "");
    payload.append("post_name", formData.post || "");
    payload.append("post_group", formData.group || "");
    payload.append("joining_date", formData.joinDate || "");

    payload.append("pay_commission", formData.payCommission || "");
    payload.append("pay_scale", formData.payScale || "");
    payload.append("grade_pay", formData.gradePay || "");
    payload.append("basic_pay", formData.basicPay || "");
    payload.append("appointment_category", formData.category || "");

    payload.append("medical_done", mapYesNo(formData.medical));
    payload.append("medical_date", formData.medicalDate || "");

    payload.append("assets_submitted", mapYesNo(formData.assets));
    payload.append("assets_submitted_date", formData.assetsDate || "");

    if (file) {
      payload.append("appointment_order_cert", file);
    }

    console.log([...payload.entries()]);

    const res = await saveServiceStep1(payload);

    console.log("SUCCESS:", res);

    onNext();

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Error");
  }
};

  return (
   <EmployeeFormCard
  title="८. प्रथम नियुक्तीची माहिती"
  onNext={handleSubmit}
  onPrev={onPrev}
  onCancel={onCancel}
  isFirst={isFirst}
  isLast={isLast}
>

      <div className="p-6 space-y-8">

        {/* 🔥 मूलभूत माहिती */}
     <div>
  <h3 className="text-sm font-semibold text-slate-700 mb-3">
    मूलभूत माहिती
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* order_number */}
    <Input
      label="नियुक्ती आदेशाचा क्रमांक"
      onChange={(e)=>handleChange("orderNo", e.target.value)}
    />

    {/* order_date */}
    <DatePicker
  label="नियुक्ती आदेशाचा दिनांक (dd/MM/yyyy)"
  value={formData.orderDate || ""}
  onChange={(val)=>handleChange("orderDate", val)}
/>

    {/* appointment_route */}
    <div>
      <label className="text-sm font-medium">सरळसेवा नियुक्तीचा मार्ग</label>
      <DropdownSearch
        options={[
          { id: "1", name: "सरळसेवा नियुक्ती" },
          { id: "2", name: "पदोन्नती" },
        ]}
        value={formData.mode || ""}
        onChange={(e)=>handleChange("mode", e.target.value)}
      />
    </div>

    {/* social_reservation */}
    <div>
      <label className="text-sm font-medium">
        नियुक्ती प्रवर्ग [सामाजिक आरक्षण]
      </label>
      <DropdownSearch
        options={[
          { id: "1", name: "खुला" },
          { id: "2", name: "SC" },
          { id: "3", name: "ST" },
          { id: "4", name: "OBC" },
        ]}
        value={formData.social || ""}
        onChange={(e)=>handleChange("social",  e.target.value)}
      />
    </div>

    {/* parallel_reservation */}
    <div>
      <label className="text-sm font-medium">
        नियुक्ती प्रवर्ग [समांतर आरक्षण]
      </label>
      <DropdownSearch
        options={[
          { id: "1", name: "महिला" },
          { id: "2", name: "अपंग" },
        ]}
        value={formData.parallel || ""}
        onChange={(e)=>handleChange("parallel", e.target.value)}
      />
    </div>

    {/* is_district_transfer */}
    <div>
      <label className="text-sm font-medium">
        सध्याची पदस्थापना जिल्हा बदलीने/जिल्हा विभाजनाने झाली आहे का?
      </label>
      <DropdownSearch
        options={yesNo}
        value={formData.transfer || ""}
        onChange={(e)=>handleChange("transfer", e.target.value)}
      />
    </div>

  </div>
</div>

       {/* 🔥 पदस्थापना */}
<div>
  <h3 className="text-sm font-semibold text-slate-700 mb-3">
    पदस्थापना माहिती
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* posting_location_type */}
    <div>
      <label className="text-sm font-medium">पदस्थापना ठिकाण</label>
      <DropdownSearch
        options={[
          { id: "local", name: "मुख्यालय" },
          { id: "other", name: "इतर" },
        ]}
        value={formData.location || ""}
        onChange={(e)=>handleChange("location", e.target.value)}
      />
    </div>

    {/* panchayat_samiti */}
    <Input
      label="पंचायत समिती"
      onChange={(e)=>handleChange("panchayat", e.target.value)}
    />

    {/* dept_level */}
    <div className="md:col-span-2">
      <label className="text-sm font-medium">विभागस्तर</label>
      <DropdownSearch
        options={[
          { id: "1", name: "शाळा" },
          { id: "2", name: "कार्यालय" },
        ]}
        value={formData.dept || ""}
        onChange={(e)=>handleChange("dept", e.target.value)}
      />
    </div>

    {/* office_name */}
    <Input
      label="रुजू होतानाचे कार्यालयाचे नाव"
      onChange={(e)=>handleChange("office", e.target.value)}
    />

    {/* post_name */}
    <Input
      label="रुजू होण्याच्या पदाचे नाव"
      onChange={(e)=>handleChange("post", e.target.value)}
    />

    {/* post_group */}
   <DropdownSearch
  options={[
    { id: "1", name: "Group A" },
    { id: "2", name: "Group B" },
    { id: "3", name: "Group C" },
    { id: "4", name: "Group D" },
  ]}
  value={formData.group || ""}
  onChange={(e)=>handleChange("group", e.target.value)}
/>

   <DatePicker
  label="रुजू होण्याचा दिनांक (dd/MM/yyyy)"
  value={formData.joinDate || ""}
  onChange={(val)=>handleChange("joinDate", val)}
/>

  </div>
</div>

  {/* 🔥 वेतन */}
<div>
  <h3 className="text-sm font-semibold text-slate-700 mb-3">
    वेतन माहिती
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* pay_commission */}
    <div>
      <label className="text-sm font-medium">वेतन आयोग</label>
      <DropdownSearch
        options={[
          { id: "1", name: "पाचवा" },
          { id: "2", name: "सहावा" },
          { id: "3", name: "सातवा" },
        ]}
        value={formData.payCommission || ""}
        onChange={(e)=>handleChange("payCommission", e.target.value)}
      />
    </div>

    {/* pay_scale */}
    <Input
      label="वेतन श्रेणी"
      onChange={(e)=>handleChange("payScale", e.target.value)}
    />

    {/* grade_pay */}
    <Input
      label="ग्रेड पे"
      onChange={(e)=>handleChange("gradePay", e.target.value)}
    />

    {/* basic_pay */}
    <Input
      label="मूळ वेतन"
      onChange={(e)=>handleChange("basicPay", e.target.value)}
    />

    {/* appointment_category */}
    <div className="md:col-span-2">
      <label className="text-sm font-medium">नियुक्ती प्रवर्ग</label>
      <DropdownSearch
        options={[
          { id: "1", name: "OPEN" },
          { id: "2", name: "SC" },
          { id: "3", name: "ST" },
          { id: "4", name: "OBC" },
        ]}
        value={formData.category || ""}
        onChange={(e)=>handleChange("category", e.target.value)}
      />
    </div>

  </div>
</div>

      {/* 🔥 मेडिकल */}
<div>
  <h3 className="text-sm font-semibold text-slate-700 mb-3">
    मेडिकल माहिती
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* medical_done */}
    <div>
      <label className="text-sm font-medium">
        नियुक्तीच्या वेळी मेडिकल तपासणी झाली आहे का?
      </label>
      <DropdownSearch
        options={yesNo}
        value={formData.medical || ""}
        onChange={(e)=>handleChange("medical", e.target.value)}
      />
    </div>

  <DatePicker
  label="मेडिकल तपासणीचा दिनांक (dd/MM/yyyy)"
  value={formData.medicalDate || ""}
  onChange={(val)=>handleChange("medicalDate", val)}
/>

  </div>
</div>

      {/* 🔥 मत्ता */}
<div>
  <h3 className="text-sm font-semibold text-slate-700 mb-3">
    मत्ता व दायित्व
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* assets_submitted */}
    <div>
      <label className="text-sm font-medium">
        मत्ता दायित्व सादर केले आहे का?
      </label>
      <DropdownSearch
        options={yesNo}
        value={formData.assets || ""}
        onChange={(e)=>handleChange("assets", e.target.value)}
      />
    </div>

    {/* assets_submitted_date */}
    <DatePicker
      label="मत्ता दायित्व सादर दिनांक (dd/MM/yyyy)"
      value={formData.assetsDate || ""}
      onChange={(val)=>handleChange("assetsDate", val)}
    />

  </div>
</div>

{/* 🔥 FILE */}
<div>
  <label className="text-sm font-medium">
    नियुक्ती आदेश (२ MB पेक्षा कमी साईज)
  </label>

  <div className="mt-1 border border-dashed border-slate-300 rounded-lg p-3 text-sm text-slate-500">
    फाइल निवडा
    <input
      type="file"
      className="mt-2 w-full"
      onChange={(e)=>setFile(e.target.files[0])}
    />
  </div>
</div>

      </div>

    </EmployeeFormCard>
  );
};

export default FirstAppointmentForm;