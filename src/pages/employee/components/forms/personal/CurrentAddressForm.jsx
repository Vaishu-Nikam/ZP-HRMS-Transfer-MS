import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import { saveStep7 } from "../../../../../services/employeeService";

const CurrentAddressForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
  permanentAddress,
}) => {

  const [current, setCurrent] = useState({
    address_line: "",
    post_office: "",
    city: "",
    district: "",
    taluka: "",
    pin_code: "",
    mobile: "",
    std_code: "",
    phone_number: "",
    is_govt_residence: "",
    residing_since: "",
  });

  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrent((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Checkbox — copy permanent → current
  const handleSameAsPermanent = (e) => {
    const checked = e.target.checked;
    setSameAsPermanent(checked);
    if (checked) setCurrent({ ...permanentAddress });
    else setCurrent({
      address_line: "", post_office: "", city: "", district: "",
      taluka: "", pin_code: "", mobile: "", std_code: "",
      phone_number: "", is_govt_residence: "", residing_since: "",
    });
  };

  const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};

  // ✅ API call — permanent + current एकत्र
  const handleNext = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        user_id: userId,
        permanent: {
          address_line:      permanentAddress.address_line      || "",
          post_office:       permanentAddress.post_office       || "",
          city:              permanentAddress.city              || "",
          district:          permanentAddress.district          || "",
          taluka:            permanentAddress.taluka            || "",
          pin_code:          Number(permanentAddress.pin_code)  || 0,
          mobile:            Number(permanentAddress.mobile)    || 0,
          std_code:          permanentAddress.std_code          || "",
          phone_number:      permanentAddress.phone_number      || "",
          is_govt_residence: permanentAddress.is_govt_residence === "true" ? "true" : "false",
          residing_since: formatDate(permanentAddress.residing_since)
        },
        current: {
          address_line:      current.address_line      || "",
          post_office:       current.post_office       || "",
          city:              current.city              || "",
          district:          current.district          || "",
          taluka:            current.taluka            || "",
          pin_code:          Number(current.pin_code)  || 0,
          mobile:            Number(current.mobile)    || 0,
          std_code:          current.std_code          || "",
          phone_number:      current.phone_number      || "",
          is_govt_residence: current.is_govt_residence === "true" ? "true" : "false",
          residing_since:    current.residing_since    || "",
        },
      };

      await saveStep7(payload);
      onNext();
    } catch (err) {
      const msg = err?.response?.data?.message || "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="सध्याचा पत्ता"
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

      {/* ✅ Same as permanent checkbox */}
      <div className="mb-5 flex items-center gap-2">
        <input
          type="checkbox"
          id="sameAsPermanent"
          checked={sameAsPermanent}
          onChange={handleSameAsPermanent}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="sameAsPermanent" className="text-sm text-slate-700 cursor-pointer">
          कायमच्या पत्त्यासारखाच आहे
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        <div className="md:col-span-2">
          <Input label="पत्ता" name="address_line"
            placeholder="पूर्ण पत्ता लिहा"
            value={current.address_line} onChange={handleChange} />
        </div>

        <Input label="पोस्ट ऑफिसचे नाव" name="post_office"
          placeholder="उदा. Nagar Post Office"
          value={current.post_office} onChange={handleChange} />

        <Input label="शहर" name="city"
          placeholder="उदा. Ahilyanagar"
          value={current.city} onChange={handleChange} />

        <Input label="जिल्हा" name="district"
          placeholder="उदा. Ahmednagar"
          value={current.district} onChange={handleChange} />

        <Input label="तालुका" name="taluka"
          placeholder="उदा. Nagar"
          value={current.taluka} onChange={handleChange} />

        <Input label="पिन कोड" name="pin_code"
          placeholder="उदा. 414001"
          value={current.pin_code} onChange={handleChange} />

        <Input label="मोबाईल नंबर" name="mobile"
          placeholder="उदा. 9876543210"
          value={current.mobile} onChange={handleChange} />

        <Input label="दूरध्वनी एसटीडी कोड" name="std_code"
          placeholder="उदा. +91"
          value={current.std_code} onChange={handleChange} />

        <Input label="दूरध्वनी क्रमांक" name="phone_number"
          placeholder="उदा. 254961447"
          value={current.phone_number} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            शासकीय निवासस्थान आहे का?
          </label>
          <select
            name="is_govt_residence"
            value={current.is_govt_residence}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">निवडा</option>
            <option value="true">होय</option>
            <option value="false">नाही</option>
          </select>
        </div>

     <DatePicker
  label="ज्या दिनांकापासून राहत आहे"
  value={current.residing_since}
  onChange={(val) => setCurrent((prev) => ({ ...prev, residing_since: val }))}
  placeholder="dd/MM/yyyy"
/>

      </div>
    </EmployeeFormCard>
  );
};

export default CurrentAddressForm;