import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const PersonalPart1Form = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {

  const [dob, setDob] = useState("");
  const [validityDate, setValidityDate] = useState("");

  const handleChange = (field, value) => {
    console.log(field, value);
  };

  // 🔥 OPTIONS
  const titleOptions = [
    { id: "श्री", name: "श्री" },
    { id: "श्रीमती", name: "श्रीमती" },
    { id: "कु", name: "कु" },
    { id: "डॉ", name: "डॉ" },
  ];

  const yesNoOptions = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const bloodGroupOptions = [
    { id: "A+", name: "A+" },
    { id: "B+", name: "B+" },
    { id: "O+", name: "O+" },
    { id: "AB+", name: "AB+" },
  ];

  const genderOptions = [
    { id: "पुरुष", name: "पुरुष" },
    { id: "स्त्री", name: "स्त्री" },
  ];

  const religionOptions = [
    { id: "हिंदू", name: "हिंदू" },
    { id: "मुस्लिम", name: "मुस्लिम" },
  ];

  const categoryOptions = [
    { id: "SC", name: "SC" },
    { id: "ST", name: "ST" },
  ];

  return (
    <EmployeeFormCard
      title="१. वैयक्तिक माहिती (भाग-१)"
      onNext={onNext}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

        {/* संज्ञा */}
        <div>
          <label className="text-sm font-medium">संज्ञा</label>
          <DropdownSearch
            options={titleOptions}
            onChange={(e)=>handleChange("title", e.target.value)}
            placeholder="निवडा"
          />
        </div>

        <Input label="पहिले नाव (English)" placeholder="उदा. Rahul" required />
        <Input label="वडिलांचे/पतीचे नाव" placeholder="उदा. Ram" required />
        <Input label="आडनाव" placeholder="उदा. Patil" required />

        <div className="md:col-span-2">
          <Input
            label="पूर्ण नाव (मराठीमध्ये आईचे नावासह)"
            placeholder="उदा. राम शंकर पाटील"
          />
        </div>

        <Input label="वडिलांचे संपूर्ण नाव" placeholder="उदा. शंकर राम पाटील" />
        <Input label="आईचे संपूर्ण नाव" placeholder="उदा. सीता शंकर पाटील" />

        {/* नाव बदल */}
        <div>
          <label className="text-sm font-medium">नावात बदल केला आहे का?</label>
          <DropdownSearch
            options={yesNoOptions}
            onChange={(e)=>handleChange("nameChange", e.target.value)}
          />
        </div>

        <Input label="पूर्वीचे नाव" placeholder="उदा. जुने नाव असल्यास" />

        {/* रक्तगट */}
        <div>
          <label className="text-sm font-medium">रक्तगट</label>
          <DropdownSearch options={bloodGroupOptions} />
        </div>

        {/* लिंग */}
        <div>
          <label className="text-sm font-medium">लिंग</label>
          <DropdownSearch options={genderOptions} />
        </div>

        {/* DOB */}
        <DatePicker
          label="जन्मतारीख (dd/MM/yyyy)"
          value={dob}
          onChange={setDob}
          placeholder="दिनांक निवडा"
        />

        <Input label="मोबाईल क्रमांक" placeholder="उदा. 9876543210" required />
        <Input label="पॅन क्रमांक" placeholder="उदा. ABCDE1234F" />
        <Input label="आधार क्रमांक" placeholder="उदा. 1234 5678 9012" />
        <Input label="ईमेल" placeholder="उदा. name@gmail.com" />
        <Input label="शासकीय ईमेल" placeholder="उदा. name@nic.in" />

        {/* धर्म */}
        <div>
          <label className="text-sm font-medium">धर्म</label>
          <DropdownSearch options={religionOptions} />
        </div>

        {/* प्रवर्ग */}
        <div>
          <label className="text-sm font-medium">प्रवर्ग</label>
          <DropdownSearch options={categoryOptions} />
        </div>

        <Input label="जात" placeholder="उदा. मराठा / कुनबी" />
        <Input label="जात वैधता क्रमांक" placeholder="उदा. MH/CASTE/12345" />

        <DatePicker
          label="जात वैधता दिनांक (dd/MM/yyyy)"
          value={validityDate}
          onChange={setValidityDate}
          placeholder="दिनांक निवडा"
        />

        <Input label="मातृभाषा" placeholder="उदा. मराठी" />

      </div>
    </EmployeeFormCard>
  );
};

export default PersonalPart1Form;