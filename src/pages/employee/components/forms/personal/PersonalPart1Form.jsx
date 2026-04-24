import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import { saveStep1 } from "../../../../../services/employeeService";

const Field = ({ label, children, fullWidth = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5, gridColumn: fullWidth ? "1 / -1" : undefined }}>
    <label style={styles.label}>{label}</label>
    {children}
  </div>
);

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={styles.input}>
    {children}
  </select>
);

const SectionDivider = ({ title }) => (
  <div style={styles.sectionDivider}>
    <span style={styles.sectionLabel}>{title}</span>
  </div>
);

const styles = {
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#6b7280",
    marginBottom: 2,
  },
  input: {
    height: 38,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "0 12px",
    fontSize: 14,
    color: "#111827",
    background: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  },
  sectionDivider: {
    gridColumn: "1 / -1",
    borderTop: "1px solid #f3f4f6",
    paddingTop: 8,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
};

const PersonalPart1Form = ({ onNext, onPrev, onCancel, isFirst, isLast }) => {

  const [formData, setFormData] = useState({
    user_id: 5,
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    full_name_marathi: "",
    father_full_name: "",
    mother_full_name: "",
    name_changed: false,
    previous_name: "",
    blood_group: "",
    gender: "",
    dob: "",
    phone: "",
    pan_number: "",
    email: "",
    govt_email: "",
    religion: "",
    caste_id: "",
    caste_validity_cert: "",
    caste_validity_date: "",
    mother_tongue: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const titleOptions   = ["श्री", "श्रीमती", "कु", "डॉ"];
  const bloodGroupOpts = ["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"];
  const genderOptions  = [{ id: 1, name: "पुरुष" }, { id: 2, name: "स्त्री" }];
  const religionOpts   = ["Hindu", "Muslim", "Christian", "Buddhist", "Jain", "Sikh", "Other"];
  const categoryOpts   = [
    { id: 1, name: "SC" },
    { id: 2, name: "ST" },
    { id: 3, name: "OBC" },
    { id: 4, name: "NT-A" },
    { id: 5, name: "NT-B" },
    { id: 6, name: "NT-C" },
    { id: 7, name: "NT-D" },
    { id: 8, name: "SBC" },
    { id: 9, name: "General" },
  ];

  const handleSubmit = async () => {
    try {
      const res = await saveStep1(formData);
      console.log("SUCCESS:", res);
      onNext();
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  const inputStyle = (extraStyle = {}) => ({ ...styles.input, ...extraStyle });

  return (
    <EmployeeFormCard
      title="१. वैयक्तिक माहिती (भाग-१)"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px 20px",
        }}
      >

        {/* ── नाव ──────────────────────────────────────────────────────── */}
        <SectionDivider title="नाव" />

        <Field label="संज्ञा">
          <Select
            value={formData.salutation}
            onChange={(e) => handleChange("salutation", e.target.value)}
          >
            <option value="">निवडा</option>
            {titleOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>

        <Field label="पहिले नाव">
          <Input
            value={formData.first_name}
            placeholder="पहिले नाव टाका"
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
        </Field>

        <Field label="वडिलांचे / पतीचे नाव">
          <Input
            value={formData.middle_name}
            placeholder="मधले नाव टाका"
            onChange={(e) => handleChange("middle_name", e.target.value)}
          />
        </Field>

        <Field label="आडनाव">
          <Input
            value={formData.last_name}
            placeholder="आडनाव टाका"
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
        </Field>

        <Field label="पूर्ण नाव (मराठी)" fullWidth>
          <Input
            value={formData.full_name_marathi}
            placeholder="संपूर्ण मराठी नाव टाका"
            onChange={(e) => handleChange("full_name_marathi", e.target.value)}
          />
        </Field>

        {/* ── कुटुंब माहिती ─────────────────────────────────────────────── */}
        <SectionDivider title="कुटुंब माहिती" />

        <Field label="वडिलांचे पूर्ण नाव">
          <Input
            value={formData.father_full_name}
            placeholder="वडिलांचे नाव टाका"
            onChange={(e) => handleChange("father_full_name", e.target.value)}
          />
        </Field>

        <Field label="आईचे पूर्ण नाव">
          <Input
            value={formData.mother_full_name}
            placeholder="आईचे नाव टाका"
            onChange={(e) => handleChange("mother_full_name", e.target.value)}
          />
        </Field>

        <Field label="नाव बदल?">
          <Select
            value={formData.name_changed === true ? "होय" : formData.name_changed === false && formData.name_changed !== "" ? "नाही" : ""}
            onChange={(e) => handleChange("name_changed", e.target.value === "होय")}
          >
            <option value="">निवडा</option>
            <option value="होय">होय</option>
            <option value="नाही">नाही</option>
          </Select>
        </Field>

        <Field label="पूर्वीचे नाव">
          <Input
            value={formData.previous_name}
            placeholder="आधीचे नाव (लागू असल्यास)"
            onChange={(e) => handleChange("previous_name", e.target.value)}
          />
        </Field>

        {/* ── वैयक्तिक तपशील ────────────────────────────────────────────── */}
        <SectionDivider title="वैयक्तिक तपशील" />

        <Field label="रक्तगट">
          <Select
            value={formData.blood_group}
            onChange={(e) => handleChange("blood_group", e.target.value)}
          >
            <option value="">निवडा</option>
            {bloodGroupOpts.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </Select>
        </Field>

        <Field label="लिंग">
          <Select
            value={formData.gender}
            onChange={(e) => handleChange("gender", Number(e.target.value))}
          >
            <option value="">निवडा</option>
            {genderOptions.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </Select>
        </Field>

        <Field label="जन्मतारीख">
          <DatePicker
            value={formData.dob}
            onChange={(date) => handleChange("dob", formatDate(date))}
          />
        </Field>

        {/* ── संपर्क व ओळख ──────────────────────────────────────────────── */}
        <SectionDivider title="संपर्क व ओळख" />

        <Field label="मोबाईल नंबर">
          <Input
            value={formData.phone}
            placeholder="10 अंकी नंबर"
            maxLength={10}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>

        <Field label="PAN क्रमांक">
          <Input
            value={formData.pan_number}
            placeholder="ABCDE1234F"
            maxLength={10}
            style={{ textTransform: "uppercase" }}
            onChange={(e) => handleChange("pan_number", e.target.value.toUpperCase())}
          />
        </Field>

        <Field label="ईमेल">
          <Input
            type="email"
            value={formData.email}
            placeholder="email@example.com"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>

        <Field label="शासकीय ईमेल">
          <Input
            type="email"
            value={formData.govt_email}
            placeholder="name@gov.in"
            onChange={(e) => handleChange("govt_email", e.target.value)}
          />
        </Field>

        {/* ── धर्म व प्रवर्ग ────────────────────────────────────────────── */}
        <SectionDivider title="धर्म व प्रवर्ग" />

        <Field label="धर्म">
          <Select
            value={formData.religion}
            onChange={(e) => handleChange("religion", e.target.value)}
          >
            <option value="">निवडा</option>
            {religionOpts.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        </Field>

        <Field label="प्रवर्ग">
          <Select
            value={formData.caste_id}
            onChange={(e) => handleChange("caste_id", Number(e.target.value))}
          >
            <option value="">निवडा</option>
            {categoryOpts.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </Field>

        <Field label="जात वैधता क्रमांक">
          <Input
            value={formData.caste_validity_cert}
            placeholder="प्रमाणपत्र क्रमांक"
            onChange={(e) => handleChange("caste_validity_cert", e.target.value)}
          />
        </Field>

        <Field label="जात वैधता दिनांक">
          <DatePicker
            value={formData.caste_validity_date}
            onChange={(date) => handleChange("caste_validity_date", formatDate(date))}
          />
        </Field>

        <Field label="मातृभाषा">
          <Input
            value={formData.mother_tongue}
            placeholder="उदा. मराठी, हिंदी"
            onChange={(e) => handleChange("mother_tongue", e.target.value)}
          />
        </Field>

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart1Form;