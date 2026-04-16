import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const FirstAppointmentForm = (props) => {
  const [formData, setFormData] = useState({
    appointmentMode: "",
    socialCategory: "",
    parallelCategory: "",
    orderNo: "",
    orderDate: "",
    transferType: "",
    postingPlace: "",
    panchayat: "",
    departmentLevel: "",
    officeName: "",
    designation: "",
    group: "",
    joiningDate: "",
    payCommission: "",
    payScale: "",
    gradePay: "",
    basicPay: "",
    category: "",
    medicalDone: "",
    medicalDate: "",
    assetSubmitted: "",
    assetDate: "",
    orderFile: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 OPTIONS

  const appointmentModeOptions = [
    { id: "1", name: "सरळसेवा नियुक्ती" },
    { id: "2", name: "पदोन्नती" },
    { id: "3", name: "अनुकंपा तत्वावर" },
    { id: "4", name: "१०% ग्रा.प्र." },
    { id: "5", name: "लाडपागे शिफारस" },
    { id: "6", name: "समावेशन" },
    { id: "7", name: "जि.प.सेस" },
    { id: "8", name: "कालेलकर आयोग" },
    { id: "9", name: "स्पर्धा परीक्षा" },
  ];

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const postingPlaceOptions = [
    { id: "मुख्यालय", name: "मुख्यालय" },
    { id: "पंचायत समिती", name: "पंचायत समिती" },
  ];

  const payCommissionOptions = [
    { id: "1", name: "पहिला" },
    { id: "2", name: "दुसरा" },
    { id: "3", name: "तिसरा" },
    { id: "4", name: "चौथा" },
    { id: "5", name: "पाचवा" },
    { id: "6", name: "सहावा" },
    { id: "7", name: "सातवा" },
  ];

  const handleFile = (file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File must be under 2MB");
      return;
    }
    handleChange("orderFile", file);
  };

  return (
    <EmployeeFormCard title="प्रथम नियुक्तीची माहिती" {...props}>
      <div className="space-y-6">

        {/* 🔷 BASIC */}
        <div className="grid grid-cols-2 gap-4">

          <Input
            label="नियुक्ती आदेश क्रमांक"
            placeholder="Enter Order No"
            onChange={(e)=>handleChange("orderNo", e.target.value)}
          />

          <DatePicker
            label="नियुक्ती आदेश दिनांक"
            onChange={(v)=>handleChange("orderDate", v)}
          />

          <div>
            <label className="text-sm font-medium">नियुक्तीचा मार्ग</label>
            <DropdownSearch
              value={formData.appointmentMode}
              onChange={(e)=>handleChange("appointmentMode", e.target.value)}
              options={appointmentModeOptions}
              placeholder="निवडा"
            />
          </div>

          <div>
            <label className="text-sm font-medium">जिल्हा बदली/विभाजन</label>
            <DropdownSearch
              value={formData.transferType}
              onChange={(e)=>handleChange("transferType", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

        </div>

        {/* 🔷 POSTING */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">पदस्थापना</h3>

          <div>
            <label className="text-sm font-medium">पदस्थापना ठिकाण</label>
            <DropdownSearch
              value={formData.postingPlace}
              onChange={(e)=>handleChange("postingPlace", e.target.value)}
              options={postingPlaceOptions}
              placeholder="निवडा"
            />
          </div>

          <Input label="पंचायत समिती"
            onChange={(e)=>handleChange("panchayat", e.target.value)} />

          <Input label="कार्यालयाचे नाव"
            onChange={(e)=>handleChange("officeName", e.target.value)} />

          <Input label="पद"
            onChange={(e)=>handleChange("designation", e.target.value)} />

          <Input label="पद गट"
            onChange={(e)=>handleChange("group", e.target.value)} />

          <DatePicker label="रुजू दिनांक"
            onChange={(v)=>handleChange("joiningDate", v)} />

        </div>

        {/* 🔷 SALARY */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">वेतन माहिती</h3>

          <div>
            <label className="text-sm font-medium">वेतन आयोग</label>
            <DropdownSearch
              value={formData.payCommission}
              onChange={(e)=>handleChange("payCommission", e.target.value)}
              options={payCommissionOptions}
              placeholder="निवडा"
            />
          </div>

          <Input label="वेतन श्रेणी"
            onChange={(e)=>handleChange("payScale", e.target.value)} />

          <Input label="ग्रेड पे"
            onChange={(e)=>handleChange("gradePay", e.target.value)} />

          <Input label="मूळ वेतन"
            onChange={(e)=>handleChange("basicPay", e.target.value)} />

        </div>

        {/* 🔷 MEDICAL */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">मेडिकल तपासणी</h3>

          <div>
            <label className="text-sm font-medium">मेडिकल झाले का?</label>
            <DropdownSearch
              value={formData.medicalDone}
              onChange={(e)=>handleChange("medicalDone", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          <DatePicker label="मेडिकल दिनांक"
            onChange={(v)=>handleChange("medicalDate", v)} />

        </div>

        {/* 🔷 ASSET */}
        <div className="grid grid-cols-2 gap-4">
          <h3 className="col-span-2 font-semibold">मत्ता दायित्व</h3>

          <div>
            <label className="text-sm font-medium">मत्ता दिले का?</label>
            <DropdownSearch
              value={formData.assetSubmitted}
              onChange={(e)=>handleChange("assetSubmitted", e.target.value)}
              options={yesNoOptions}
              placeholder="निवडा"
            />
          </div>

          <DatePicker label="सादर दिनांक"
            onChange={(v)=>handleChange("assetDate", v)} />

        </div>

        {/* 🔷 FILE */}
        <div>
          <label className="text-sm font-medium">नियुक्ती आदेश (2MB)</label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e)=>handleFile(e.target.files[0])}
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default FirstAppointmentForm;