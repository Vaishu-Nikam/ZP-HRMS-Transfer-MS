import { useState, useEffect } from "react";
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
  userId,
  employeeData,
  isViewMode = false,
}) => {

  const [formData, setFormData] = useState({
    is_ex_serviceman:    "",   // stored as "true" | "false" string
    has_domicile_cert:   "",
    spouse_in_service:   "",
    spouse_service_type: "",
    spouse_office_type:  "",
    spouse_office_details: "",
    spouse_employee_no:  "",
    has_pran:            "",
    pran_number:         "",
    gpf_number:          "",
    ppo_number:          "",
    ppo_date:            "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // ─── Pre-fill from employeeData (view / edit) ────────────────────────────
  useEffect(() => {
    if (employeeData) {
      setFormData((prev) => ({
        ...prev,
        is_ex_serviceman:    String(employeeData.is_ex_serviceman    ?? prev.is_ex_serviceman),
        has_domicile_cert:   String(employeeData.has_domicile_cert   ?? prev.has_domicile_cert),
        spouse_in_service:   String(employeeData.spouse_in_service   ?? prev.spouse_in_service),
        spouse_service_type: employeeData.spouse_service_type        ?? prev.spouse_service_type,
        spouse_office_type:  employeeData.spouse_office_type         ?? prev.spouse_office_type,
        spouse_office_details: employeeData.spouse_office_details    ?? prev.spouse_office_details,
        spouse_employee_no:  employeeData.spouse_employee_no         ?? prev.spouse_employee_no,
        has_pran:            String(employeeData.has_pran            ?? prev.has_pran),
        pran_number:         employeeData.pran_number                ?? prev.pran_number,
        gpf_number:          employeeData.gpf_number                 ?? prev.gpf_number,
        ppo_number:          employeeData.ppo_number                 ?? prev.ppo_number,
        // ppo_date comes as ISO string from API → convert to YYYY-MM-DD
        ppo_date: employeeData.ppo_date
          ? new Date(employeeData.ppo_date).toISOString().split("T")[0]
          : prev.ppo_date,
      }));
    }
  }, [employeeData]);

  const handleChange = (field, value) => {
    if (isViewMode) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // ─── Options — id must be STRING "true"/"false" to match API ─────────────
  const yesNo = [
    { id: "true",  name: "होय" },
    { id: "false", name: "नाही" },
  ];

  const spouseServiceOptions = [
    { id: "शासकीय",    name: "शासकीय" },
    { id: "निमशासकीय", name: "निमशासकीय" },
  ];

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    if (!formData.is_ex_serviceman)  return "माजी सैनिक निवडा";
    if (!formData.has_domicile_cert) return "अधिवास प्रमाणपत्र निवडा";
    if (!formData.spouse_in_service) return "पती/पत्‍नी सेवेत आहे का? निवडा";
    if (!formData.has_pran)          return "PRAN आहे का? निवडा";

    if (formData.spouse_in_service === "true") {
      if (!formData.spouse_service_type)   return "सेवा प्रकार निवडा";
      if (!formData.spouse_office_type)    return "कार्यालयाचा प्रकार टाका";
      if (!formData.spouse_office_details) return "कार्यालय नाव टाका";
      if (!formData.spouse_employee_no)    return "पती/पत्‍नीचा कर्मचारी क्र. टाका";
    }

    if (formData.has_pran === "true" && !formData.pran_number) {
      return "PRAN Number टाका";
    }

    return null;
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (isViewMode) { onNext(); return; }
    if (!userId) { setError("User ID मिळाला नाही"); return; }

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    setError(null);

    try {
      // API expects boolean fields as strings: "true" / "false"
      const payload = {
        user_id:              String(userId),
        is_ex_serviceman:     formData.is_ex_serviceman    || "false",
        has_domicile_cert:    formData.has_domicile_cert   || "false",
        spouse_in_service:    formData.spouse_in_service   || "false",
        spouse_service_type:  formData.spouse_service_type || "",
        spouse_office_type:   formData.spouse_office_type  || "",
        spouse_office_details:formData.spouse_office_details || "",
        spouse_employee_no:   formData.spouse_employee_no  || "",
        has_pran:             formData.has_pran            || "false",
        pran_number:          formData.pran_number         || "",
        gpf_number:           formData.gpf_number          || "",
        ppo_number:           formData.ppo_number          || "",
        ppo_date:             formData.ppo_date            || "",
      };

      console.log("STEP 4 PAYLOAD:", payload);

      await saveStep4(payload);
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "काहीतरी चूक झाली.");
    } finally {
      setLoading(false);
    }
  };

  // Conditional visibility — compare against string "true"
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
      isViewMode={isViewMode}
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
            disabled={isViewMode}
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
            disabled={isViewMode}
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
            disabled={isViewMode}
          />
        </div>

        {/* Spouse fields — show only when spouse_in_service = "true" */}
        {spouseInService && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-700">सेवा प्रकार</label>
              <DropdownSearch
                options={spouseServiceOptions}
                value={formData.spouse_service_type}
                onChange={(e) => handleChange("spouse_service_type", e.target.value)}
                placeholder="निवडा"
                disabled={isViewMode}
              />
            </div>
            <Input
              label="कार्यालयाचा प्रकार"
              placeholder="उदा. पंचायत समिती"
              value={formData.spouse_office_type}
              disabled={isViewMode}
              onChange={(e) => handleChange("spouse_office_type", e.target.value)}
            />
            <Input
              label="कार्यालय नाव, तालुका व जिल्हा"
              placeholder="उदा. पंचायत समिती, नगर"
              value={formData.spouse_office_details}
              disabled={isViewMode}
              onChange={(e) => handleChange("spouse_office_details", e.target.value)}
            />
            <Input
              label="पती/पत्‍नीचा कर्मचारी क्र."
              placeholder="उदा. EMP123"
              value={formData.spouse_employee_no}
              disabled={isViewMode}
              onChange={(e) => handleChange("spouse_employee_no", e.target.value)}
            />
          </>
        )}

        {/* PRAN */}
        <div>
          <label className="text-sm font-medium text-slate-700">PRAN Number आहे का?</label>
          <DropdownSearch
            options={yesNo}
            value={formData.has_pran}
            onChange={(e) => handleChange("has_pran", e.target.value)}
            placeholder="निवडा"
            disabled={isViewMode}
          />
        </div>

        {pranAvailable && (
          <Input
            label="PRAN Number"
            placeholder="उदा. 123456789012"
            value={formData.pran_number}
            disabled={isViewMode}
            onChange={(e) => handleChange("pran_number", e.target.value)}
          />
        )}

        <Input
          label="GPF क्रमांक (असल्यास)"
          placeholder="उदा. GPF12345"
          value={formData.gpf_number}
          disabled={isViewMode}
          onChange={(e) => handleChange("gpf_number", e.target.value)}
        />
        <Input
          label="PPO क्र. (असल्यास)"
          placeholder="उदा. PPO98765"
          value={formData.ppo_number}
          disabled={isViewMode}
          onChange={(e) => handleChange("ppo_number", e.target.value)}
        />
        <DatePicker
          label="PPO दिनांक (dd/MM/yyyy)"
          value={formData.ppo_date}
          disabled={isViewMode}
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