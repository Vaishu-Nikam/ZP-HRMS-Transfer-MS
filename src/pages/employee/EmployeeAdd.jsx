import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MAIN_TABS, SUB_TABS } from "../../constants/employee/employeeTabs";
import useEmployeeTabs from "../../hooks/employee/useEmployeeTabs";

import EmployeeMainTabs from "./components/tabs/EmployeeMainTabs";
import EmployeeSubTabs from "./components/tabs/EmployeeSubTabs";

import PersonalPart1Form from "./components/forms/personal/PersonalPart1Form";
import PersonalPart2Form from "./components/forms/personal/PersonalPart2Form";
import PersonalPart3Form from "./components/forms/personal/PersonalPart3Form";
import PersonalPart4Form from "./components/forms/personal/PersonalPart4Form";
import PersonalPart5Form from "./components/forms/personal/PersonalPart5Form";
import PersonalPart6Form from "./components/forms/personal/PersonalPart6Form";
import ResidentialAddressForm from "./components/forms/personal/ResidentialAddressForm";
import CurrentAddressForm from "./components/forms/personal/CurrentAddressForm";
import EmergencyContactForm from "./components/forms/personal/EmergencyContactForm";
import FamilyDetailsForm from "./components/forms/personal/FamilyDetailsForm";
import NominationDetailsForm from "./components/forms/personal/NominationDetailsForm";

import EducationDetailsForm from "./components/forms/qualification/EducationDetailsForm";
import TrainingDetailsForm from "./components/forms/qualification/TrainingDetailsForm";
import DepartmentExamForm from "./components/forms/qualification/DepartmentExamForm";
import CompetitiveExamForm from "./components/forms/qualification/CompetitiveExamForm";
import OtherExamForm from "./components/forms/qualification/OtherExamForm";

import FirstAppointmentForm from "./components/forms/service/FirstAppointmentForm";
import CurrentPostingForm from "./components/forms/service/CurrentPostingForm";
import ServiceProgressForm from "./components/forms/service/ServiceProgressForm";
import AssetLiabilityForm from "./components/forms/service/AssetLiabilityForm";

import PayCommissionForm from "./components/forms/salary/PayCommissionForm";
import SalaryIncrementForm from "./components/forms/salary/SalaryIncrementForm";
import AllowanceForm from "./components/forms/salary/AllowanceForm";
import OtherSchemeForm from "./components/forms/salary/OtherSchemeForm";
import RecoveryForm from "./components/forms/salary/RecoveryForm";

import TransferForm from "./components/forms/Transfer/TransferForm";

import UnauthorizedAbsenceForm from "./components/forms/enquiry/UnauthorizedAbsenceForm";
import DepartmentEnquiryForm from "./components/forms/enquiry/DepartmentEnquiryForm";
import SuspensionForm from "./components/forms/enquiry/SuspensionForm";
import CourtCaseForm from "./components/forms/enquiry/CourtCaseForm";

import ServiceBookForm from "./components/forms/serviceBook/ServiceBookForm";
import ServiceBookVerificationForm from "./components/forms/serviceBook/BookVerificationForm";

import DiseaseForm from "./components/forms/medical/DiseaseForm";
import PromotionForm from "./components/forms/medical/PromotionForm";
import ExtensionForm from "./components/forms/medical/ExtensionForm";
import DisabilityForm from "./components/forms/medical/DisabilityForm";
import InsuranceForm from "./components/forms/medical/InsuranceForm";
import AdvanceForm from "./components/forms/medical/AdvanceForm";

import CertificatesForm from "./components/forms/certificates/CertificatesForm";

import { getEmployeeCurrentStep } from "../../services/employeeService";

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activeMainTab, activeSubTab, handleMainTabChange, setActiveSubTab } =
    useEmployeeTabs();

  // ✅ Permanent address state — shared between ResidentialAddressForm & CurrentAddressForm
  const [permanentAddress, setPermanentAddress] = useState({
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
const [serviceBookData, setServiceBookData] = useState(null);
  const subTabs = SUB_TABS[activeMainTab];
  const currentIndex = subTabs.indexOf(activeSubTab);

  const handleNext = () => {
    if (currentIndex < subTabs.length - 1) {
      setActiveSubTab(subTabs[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSubTab(subTabs[currentIndex - 1]);
    }
  };

  const stepMap = {
    1:  { main: "personal",     sub: "भाग 1" },
    2:  { main: "personal",     sub: "भाग 2" },
    3:  { main: "personal",     sub: "भाग 3" },
    4:  { main: "personal",     sub: "भाग 4" },
    5:  { main: "personal",     sub: "भाग 5" },
    6:  { main: "personal",     sub: "भाग 6" },
    7:  { main: "personal",     sub: "रहिवासी पत्ता" },
    8:  { main: "personal",     sub: "सध्याचा पत्ता" },
    9:  { main: "personal",     sub: "आपत्कालीन संपर्क" },
    10: { main: "personal",     sub: "कौटुंबिक माहिती" },
    11: { main: "personal",     sub: "नामनिर्देशन माहिती" },
    12: { main: "qualification", sub: "शैक्षणिक अर्हता" },
    13: { main: "qualification", sub: "प्रशिक्षण माहिती" },
    14: { main: "qualification", sub: "विभागीय परीक्षा" },
    15: { main: "qualification", sub: "स्पर्धा परीक्षा" },
    16: { main: "qualification", sub: "इतर परीक्षा" },
    17: { main: "service",      sub: "प्रथम नियुक्ती" },
    18: { main: "service",      sub: "पदस्थापना सद्यस्थिती" },
    19: { main: "service",      sub: "सेवा प्रगती (ACP/MACP)" },
    20: { main: "service",      sub: "मत्ता व दायित्व" },
    21: { main: "salary",       sub: "वेतन आयोग" },
    22: { main: "salary",       sub: "वेतनवाढ तपशील" },
    23: { main: "salary",       sub: "वेतन भत्ता" },
    24: { main: "salary",       sub: "इतर वेतन योजना" },
    25: { main: "salary",       sub: "अतिरिक्त वेतन वसुली" },
    26: { main: "transfer",     sub: "बदली माहिती" },
    27: { main: "enquiry",      sub: "अनधिकृत गैरहजर" },
    28: { main: "enquiry",      sub: "विभागीय चौकशी" },
    29: { main: "enquiry",      sub: "निलंबन माहिती" },
    30: { main: "enquiry",      sub: "न्यायालयीन प्रकरण" },
    31: { main: "serviceBook",  sub: "सेवा पुस्तक" },
    32: { main: "serviceBook",  sub: "सेवापुस्तक पडताळणी" },
    33: { main: "medical",      sub: "आजार माहिती" },
    34: { main: "medical",      sub: "पदोन्नती तपशील" },
    35: { main: "medical",      sub: "मुदतवाढ तपशील" },
    36: { main: "medical",      sub: "दिव्यांग तपशील" },
    37: { main: "medical",      sub: "गटविमा तपशील" },
    38: { main: "medical",      sub: "अग्रिम तपशील" },
    39: { main: "certificates", sub: "प्रमाणपत्रे" },
  };

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const res = await getEmployeeCurrentStep("123456789012"); 
        const step = res.current_step;
        console.log("CURRENT STEP:", step);
        const mapping = stepMap[step];
        if (mapping) {
          handleMainTabChange(mapping.main);
          setActiveSubTab(mapping.sub);
        }
      } catch (err) {
        console.error("STEP ERROR:", err);
      }
    };
    fetchStep();
  }, []);

  const commonProps = {
    onNext: handleNext,
    onPrev: handlePrev,
    onCancel: () => navigate("/employee"),
    isFirst: currentIndex === 0,
    isLast: currentIndex === subTabs.length - 1,
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
      <EmployeeMainTabs
        tabs={MAIN_TABS}
        active={activeMainTab}
        onChange={handleMainTabChange}
      />
      <EmployeeSubTabs
        tabs={subTabs}
        active={activeSubTab}
        onChange={setActiveSubTab}
      />

      {activeMainTab === "personal" && activeSubTab === "भाग 1" && (
        <PersonalPart1Form userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 2" && (
        <PersonalPart2Form userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 3" && (
        <PersonalPart3Form userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 4" && (
        <PersonalPart4Form userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 5" && (
        <PersonalPart5Form userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 6" && (
        <PersonalPart6Form userId={id} {...commonProps} />
      )}

      {/* ✅ permanentAddress state pass केला — दोन्ही forms ला */}
      {activeMainTab === "personal" && activeSubTab === "रहिवासी पत्ता" && (
        <ResidentialAddressForm
          userId={id}
          permanentAddress={permanentAddress}
          setPermanentAddress={setPermanentAddress}
          {...commonProps}
        />
      )}
      
      {activeMainTab === "personal" && activeSubTab === "सध्याचा पत्ता" && (
        <CurrentAddressForm
          userId={id}
          permanentAddress={permanentAddress}
          {...commonProps}
        />
      )}

      {activeMainTab === "personal" && activeSubTab === "आपत्कालीन संपर्क" && (
        <EmergencyContactForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "कौटुंबिक माहिती" && (
        <FamilyDetailsForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "personal" && activeSubTab === "नामनिर्देशन माहिती" && (
        <NominationDetailsForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "qualification" && activeSubTab === "शैक्षणिक अर्हता" && (
        <EducationDetailsForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "qualification" && activeSubTab === "प्रशिक्षण माहिती" && (
        <TrainingDetailsForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "qualification" && activeSubTab === "विभागीय परीक्षा" && (
        <DepartmentExamForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "qualification" && activeSubTab === "स्पर्धा परीक्षा" && (
        <CompetitiveExamForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "qualification" && activeSubTab === "इतर परीक्षा" && (
        <OtherExamForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "service" && activeSubTab === "प्रथम नियुक्ती" && (
        <FirstAppointmentForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "service" && activeSubTab === "पदस्थापना सद्यस्थिती" && (
        <CurrentPostingForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "service" && activeSubTab === "सेवा प्रगती (ACP/MACP)" && (
        <ServiceProgressForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "service" && activeSubTab === "मत्ता व दायित्व" && (
        <AssetLiabilityForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "salary" && activeSubTab === "वेतन आयोग" && (
        <PayCommissionForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "वेतनवाढ तपशील" && (
        <SalaryIncrementForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "वेतन भत्ता" && (
        <AllowanceForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "इतर वेतन योजना" && (
        <OtherSchemeForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "अतिरिक्त वेतन वसुली" && (
        <RecoveryForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "transfer" && activeSubTab === "बदली माहिती" && (
        <TransferForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "enquiry" && activeSubTab === "अनधिकृत गैरहजर" && (
        <UnauthorizedAbsenceForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "enquiry" && activeSubTab === "विभागीय चौकशी" && (
        <DepartmentEnquiryForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "enquiry" && activeSubTab === "निलंबन माहिती" && (
        <SuspensionForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "enquiry" && activeSubTab === "न्यायालयीन प्रकरण" && (
        <CourtCaseForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "serviceBook" && activeSubTab === "सेवा पुस्तक" && (
  <ServiceBookForm 
    userId={id} 
    setServiceBookData={setServiceBookData} 
    {...commonProps} 
  />
)}

{activeMainTab === "serviceBook" && activeSubTab === "सेवापुस्तक पडताळणी" && (
  <ServiceBookVerificationForm 
    serviceBookData={serviceBookData}  
    userId={id} 
    {...commonProps} 
  />
)}

      {activeMainTab === "medical" && activeSubTab === "आजार माहिती" && (
        <DiseaseForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "पदोन्नती तपशील" && (
        <PromotionForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "मुदतवाढ तपशील" && (
        <ExtensionForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "दिव्यांग तपशील" && (
        <DisabilityForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "गटविमा तपशील" && (
        <InsuranceForm userId={id} {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "अग्रिम तपशील" && (
        <AdvanceForm userId={id} {...commonProps} />
      )}

      {activeMainTab === "certificates" && activeSubTab === "प्रमाणपत्रे" && (
        <CertificatesForm userId={id} {...commonProps} />
      )}
    </div>
  );
};

export default EmployeeAdd;