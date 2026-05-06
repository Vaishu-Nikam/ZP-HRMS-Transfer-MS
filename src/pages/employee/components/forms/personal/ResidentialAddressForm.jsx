import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";

const SimpleSelect = ({ label, name, value, onChange, options }) => (
  <div>
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">निवडा</option>
      <option value="true">होय</option>
      <option value="false">नाही</option>
    </select>
  </div>
);

const ResidentialAddressForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  // ✅ parent कडून data आणि setter येतो
  permanentAddress,
  setPermanentAddress,
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPermanentAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <EmployeeFormCard
      title="रहिवासी पत्ता (कायमचा पत्ता)"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        <div className="md:col-span-2">
          <Input label="पत्ता" name="address_line"
            placeholder="पूर्ण पत्ता लिहा"
            value={permanentAddress.address_line} onChange={handleChange} />
        </div>

        <Input label="पोस्ट ऑफिसचे नाव" name="post_office"
          placeholder="उदा. Nagar Post Office"
          value={permanentAddress.post_office} onChange={handleChange} />

        <Input label="शहर" name="city"
          placeholder="उदा. Ahilyanagar"
          value={permanentAddress.city} onChange={handleChange} />

        <Input label="जिल्हा" name="district"
          placeholder="उदा. Ahmednagar"
          value={permanentAddress.district} onChange={handleChange} />

        <Input label="तालुका" name="taluka"
          placeholder="उदा. Nagar"
          value={permanentAddress.taluka} onChange={handleChange} />

        <Input label="पिन कोड" name="pin_code"
          placeholder="उदा. 414001"
          value={permanentAddress.pin_code} onChange={handleChange} />

        <Input label="मोबाईल नंबर" name="mobile"
          placeholder="उदा. 9876543210"
          value={permanentAddress.mobile} onChange={handleChange} />

        <Input label="दूरध्वनी एसटीडी कोड" name="std_code"
          placeholder="उदा. +91"
          value={permanentAddress.std_code} onChange={handleChange} />

        <Input label="दूरध्वनी क्रमांक" name="phone_number"
          placeholder="उदा. 254961447"
          value={permanentAddress.phone_number} onChange={handleChange} />

        <SimpleSelect
          label="शासकीय निवासस्थान आहे का?"
          name="is_govt_residence"
          value={permanentAddress.is_govt_residence}
          onChange={handleChange}
        />

        {permanentAddress.is_govt_residence === "true" && (
          <DatePicker
            label="ज्या दिनांकापासून राहत आहे"
            value={permanentAddress.residing_since}
            onChange={(val) =>
              setPermanentAddress((prev) => ({ ...prev, residing_since: val }))
            }
            placeholder="dd/MM/yyyy"
          />
        )}

      </div>
    </EmployeeFormCard>
  );
};

export default ResidentialAddressForm;