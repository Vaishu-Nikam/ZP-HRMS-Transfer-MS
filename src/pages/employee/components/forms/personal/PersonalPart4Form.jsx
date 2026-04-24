import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DatePicker from "../../../../../components/common/DatePicker";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { saveStep4 } from "../../../../../services/employeeService";

const PersonalPart4Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId = 5,
}) => {

  const [formData, setFormData] = useState({
    is_ex_serviceman: "",          
    has_domicile_cert: "",         
    spouse_in_service: "",         
    spouse_service_type: "",      
    spouse_office_type: "",
    spouse_office_details: "",
    spouse_employee_no: "",
    has_pran: "",                 
    pran_number: "",
    gpf_number: "",
    ppo_number: "",
    ppo_date: "",        
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const yesNo = [
    { id: "true",  name: "होय" },
    { id: "false", name: "नाही" },
  ];

  const spouseServiceOptions = [
    { id: "शासकीय",    name: "शासकीय" },
    { id: "निमशासकीय", name: "निमशासकीय" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        user_id: String(userId),
        is_ex_serviceman:     formData.is_ex_serviceman,
        has_domicile_cert:    formData.has_domicile_cert,
        spouse_in_service:    formData.spouse_in_service,
        spouse_service_type:  formData.spouse_service_type,
        spouse_office_type:   formData.spouse_office_type,
        spouse_office_details:formData.spouse_office_details,
        spouse_employee_no:   formData.spouse_employee_no,
        has_pran:             formData.has_pran,
        pran_number:          formData.pran_number,
        gpf_number:           formData.gpf_number,
        ppo_number:           formData.ppo_number,
        ppo_date:             formData.ppo_date,
      };

      console.log("STEP 4 PAYLOAD:", payload);

      const res = await saveStep4(payload);

      console.log("STEP 4 SUCCESS:", res);
      onNext();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "काहीतरी चूक झाली. पुन्हा प्रयत्न करा.";
      console.error("STEP 4 ERROR:", err.response?.data || err.message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const spouseInService = formData.spouse_in_service === "true";
  const pranAvailable   = formData.has_pran === "true";

  return (
    <EmployeeFormCard
      title="४. वैयक्तिक माहिती (भाग-४)"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* माजी सैनिक */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            कर्मचारी माजी सैनिक आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.is_ex_serviceman}
            onChange={(e) => handleChange("is_ex_serviceman", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* अधिवास */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            अधिवास प्रमाणपत्र आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.has_domicile_cert}
            onChange={(e) => handleChange("has_domicile_cert", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* पती/पत्‍नी सेवेत */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            पती/पत्‍नी सेवेत आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.spouse_in_service}
            onChange={(e) => handleChange("spouse_in_service", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {/* Conditional — spouse fields only when spouse_in_service = true */}
        {spouseInService && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">
                सेवा प्रकार
              </label>
              <DropdownSearch
                options={spouseServiceOptions}
                value={formData.spouse_service_type}
                onChange={(e) => handleChange("spouse_service_type", e.target.value)}
                placeholder="निवडा"
              />
            </div>

            <Input
              label="कार्यालयाचा प्रकार"
              placeholder="उदा. पंचायत समिती"
              value={formData.spouse_office_type}
              onChange={(e) => handleChange("spouse_office_type", e.target.value)}
            />

            <Input
              label="कार्यालय नाव, तालुका व जिल्हा"
              placeholder="उदा. पंचायत समिती, नगर"
              value={formData.spouse_office_details}
              onChange={(e) => handleChange("spouse_office_details", e.target.value)}
            />

            <Input
              label="पती/पत्‍नीचा कर्मचारी क्र."
              placeholder="उदा. EMP123"
              value={formData.spouse_employee_no}
              onChange={(e) => handleChange("spouse_employee_no", e.target.value)}
            />
          </>
        )}

        {/* PRAN */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            PRAN Number आहे का?
          </label>
          <DropdownSearch
            options={yesNo}
            value={formData.has_pran}
            onChange={(e) => handleChange("has_pran", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        {pranAvailable && (
          <Input
            label="PRAN Number"
            placeholder="उदा. 123456789012"
            value={formData.pran_number}
            onChange={(e) => handleChange("pran_number", e.target.value)}
          />
        )}

        <Input
          label="GPF क्रमांक (असल्यास)"
          placeholder="उदा. GPF12345"
          value={formData.gpf_number}
          onChange={(e) => handleChange("gpf_number", e.target.value)}
        />

        <Input
          label="PPO क्र. (असल्यास)"
          placeholder="उदा. PPO98765"
          value={formData.ppo_number}
          onChange={(e) => handleChange("ppo_number", e.target.value)}
        />

        <DatePicker
          label="PPO दिनांक (dd/MM/yyyy)"
          value={formData.ppo_date}
          onChange={(val) => handleChange("ppo_date", formatDate(val))}
          placeholder="दिनांक निवडा"
        />

        {error && (
          <div className="col-span-full text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart4Form;