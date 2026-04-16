import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";

const BasicDetailsForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  const [dob, setDob] = useState("");
  const [validityDate, setValidityDate] = useState("");

  return (
    <EmployeeFormCard
      title="वैयक्तिक माहिती - भाग 1"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-2 gap-4">

        {/* संज्ञा */}
        <div>
          <label className="text-sm font-medium">संज्ञा</label>
          <select className="input mt-1">
            <option>निवडा</option>
            <option>श्री</option>
            <option>श्रीमती</option>
            <option>कु</option>
            <option>डॉ</option>
          </select>
        </div>

        {/* पहिले नाव */}
        <Input
          label="पहिले नाव (English)"
          placeholder="Enter First Name"
          required
        />

        {/* वडिलांचे नाव */}
        <Input
          label="वडिलांचे/पतीचे नाव"
          placeholder="Enter Middle Name"
          required
        />

        {/* आडनाव */}
        <Input
          label="आडनाव"
          placeholder="Enter Last Name"
          required
        />

        {/* पूर्ण नाव */}
        <div className="col-span-2">
          <Input
            label="पूर्ण नाव (मराठीमध्ये आईचे नावासह)"
            placeholder="उदा. राम शंकर पाटील"
          />
        </div>

        {/* वडिलांचे नाव */}
        <Input
          label="वडिलांचे संपूर्ण नाव"
          placeholder="Enter Father's Full Name"
        />

        {/* आईचे नाव */}
        <Input
          label="आईचे संपूर्ण नाव"
          placeholder="Enter Mother's Name"
        />

        {/* नाव बदल */}
        <div>
          <label className="text-sm font-medium">नावात बदल केला आहे का?</label>
          <select className="input mt-1">
            <option>नाही</option>
            <option>होय</option>
          </select>
        </div>

        {/* पूर्वीचे नाव */}
        <Input
          label="पूर्वीचे नाव"
          placeholder="Enter Previous Name"
        />

        {/* रक्तगट */}
        <div>
          <label className="text-sm font-medium">रक्तगट</label>
          <select className="input mt-1">
            <option>निवडा</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
            <option>AB+</option>
          </select>
        </div>

        {/* लिंग */}
        <div>
          <label className="text-sm font-medium">लिंग</label>
          <select className="input mt-1">
            <option>निवडा</option>
            <option>पुरुष</option>
            <option>स्त्री</option>
          </select>
        </div>

        {/* जन्मतारीख */}
        <div className="relative">
          <DatePicker
            label="जन्मतारीख"
            value={dob}
            onChange={setDob}
            placeholder="dd/MM/yyyy"
          />
        </div>

        {/* मोबाईल */}
        <Input
          label="मोबाईल क्रमांक"
          placeholder="9876543210"
          required
        />

        {/* PAN */}
        <Input
          label="पॅन क्रमांक"
          placeholder="ABCDE1234F"
        />

        {/* Aadhaar */}
        <Input
          label="आधार क्रमांक"
          placeholder="XXXX XXXX XXXX"
        />

        {/* Email */}
        <Input
          label="ईमेल"
          placeholder="example@gmail.com"
        />

        {/* Gov Email */}
        <Input
          label="शासकीय ईमेल"
          placeholder="example@nic.in"
        />

        {/* धर्म */}
        <div>
          <label className="text-sm font-medium">धर्म</label>
          <select className="input mt-1">
            <option>निवडा</option>
            <option>हिंदू</option>
            <option>मुस्लिम</option>
          </select>
        </div>

        {/* प्रवर्ग */}
        <div>
          <label className="text-sm font-medium">प्रवर्ग</label>
          <select className="input mt-1">
            <option>निवडा</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>

        {/* जात */}
        <Input
          label="जात"
          placeholder="Enter Caste"
        />

        {/* जात वैधता */}
        <Input
          label="जात वैधता क्रमांक"
          placeholder="Enter Certificate Number"
        />

        {/* वैधता दिनांक */}
        <div className="relative">
          <DatePicker
            label="जात वैधता दिनांक"
            value={validityDate}
            onChange={setValidityDate}
            placeholder="dd/MM/yyyy"
          />
        </div>

        {/* मातृभाषा */}
        <Input
          label="मातृभाषा"
          placeholder="उदा. मराठी"
        />

      </div>
    </EmployeeFormCard>
  );
};

export default BasicDetailsForm;