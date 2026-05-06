import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import { saveStep8 } from "../../../../../services/employeeService";

const EmergencyContactForm = ({ onNext, onPrev, onCancel, isFirst, isLast, userId }) => {

  const [formData, setFormData] = useState({
    contact_name: "",
    relation: "",
    mobile: "",
    alt_contact_name: "",
    alt_mobile: "",
    std_code: "",
    phone_number: "",
    home_std_code: "",
    home_phone_number: "",
    residing_since: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    setError("");
    setLoading(true);
    try {
      await saveStep8({
        user_id:           userId,
        contact_name:      formData.contact_name,
        relation:          formData.relation,
        mobile:            formData.mobile,
        alt_contact_name:  formData.alt_contact_name,
        alt_mobile:        formData.alt_mobile,
        std_code:          formData.std_code,
        phone_number:      formData.phone_number,
        home_std_code:     formData.home_std_code,
        home_phone_number: formData.home_phone_number,
        residing_since:    formData.residing_since,
      });
      onNext();
    } catch (err) {
      setError(err?.response?.data?.message || "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="आपत्कालीन संपर्काचा पत्ता"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        <Input label="संपर्क व्यक्तीचे नाव" name="contact_name"
          placeholder="उदा. Abhi Kute"
          value={formData.contact_name} onChange={handleChange} />

        <Input label="नाते" name="relation"
          placeholder="उदा. brother"
          value={formData.relation} onChange={handleChange} />

        <Input label="मोबाईल नंबर" name="mobile"
          placeholder="उदा. 9876543210"
          value={formData.mobile} onChange={handleChange} />

        <Input label="पर्यायी संपर्क व्यक्तीचे नाव" name="alt_contact_name"
          placeholder="उदा. Sam"
          value={formData.alt_contact_name} onChange={handleChange} />

        <Input label="पर्यायी व्यक्तीचा मोबाईल नंबर" name="alt_mobile"
          placeholder="उदा. 8237637370"
          value={formData.alt_mobile} onChange={handleChange} />

        <Input label="दूरध्वनी एसटीडी कोड" name="std_code"
          placeholder="उदा. 240"
          value={formData.std_code} onChange={handleChange} />

        <Input label="दूरध्वनी क्रमांक" name="phone_number"
          placeholder="उदा. 78466226"
          value={formData.phone_number} onChange={handleChange} />

        <Input label="घरचा दूरध्वनी एसटीडी कोड" name="home_std_code"
          placeholder="उदा. 124"
          value={formData.home_std_code} onChange={handleChange} />

        <Input label="घरचा दूरध्वनी क्रमांक" name="home_phone_number"
          placeholder="उदा. 875593888"
          value={formData.home_phone_number} onChange={handleChange} />

        <DatePicker
          label="ज्या दिनांकापासून कर्मचारी तेथे राहत आहे"
          value={formData.residing_since}
          onChange={(val) => setFormData((prev) => ({ ...prev, residing_since: val }))}
          placeholder="dd/MM/yyyy"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default EmergencyContactForm;