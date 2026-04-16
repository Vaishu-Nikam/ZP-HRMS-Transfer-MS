import { useNavigate } from "react-router-dom";

import { MAIN_TABS, SUB_TABS } from "../../constants/employee/employeeTabs";
import useEmployeeTabs from "../../hooks/employee/useEmployeeTabs";

import EmployeeMainTabs from "./components/tabs/EmployeeMainTabs";
import EmployeeSubTabs from "./components/tabs/EmployeeSubTabs";

import BasicDetailsForm from "./components/forms/personal/BasicDetailsForm";
import AppointmentDetailsForm from "./components/forms/personal/AppointmentDetailsForm";
import PersonalDetailsForm from "./components/forms/personal/PersonalDetailsForm";
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

const EmployeeAdd = () => {
  const navigate = useNavigate();

  const { activeMainTab, activeSubTab, handleMainTabChange, setActiveSubTab } =
    useEmployeeTabs();

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
        <BasicDetailsForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 2" && (
        <AppointmentDetailsForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 3" && (
        <PersonalDetailsForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 4" && (
        <PersonalPart4Form
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 5" && (
        <PersonalPart5Form
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "भाग 6" && (
        <PersonalPart6Form
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "रहिवासी पत्ता" && (
        <ResidentialAddressForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "सध्याचा पत्ता" && (
        <CurrentAddressForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "आपत्कालीन संपर्क" && (
        <EmergencyContactForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" && activeSubTab === "कौटुंबिक माहिती" && (
        <FamilyDetailsForm
          onNext={handleNext}
          onPrev={handlePrev}
          onCancel={() => navigate("/employee")}
          isFirst={currentIndex === 0}
          isLast={currentIndex === subTabs.length - 1}
        />
      )}
      {activeMainTab === "personal" &&
        activeSubTab === "नामनिर्देशन माहिती" && (
          <NominationDetailsForm
            onNext={handleNext}
            onPrev={handlePrev}
            onCancel={() => navigate("/employee")}
            isFirst={currentIndex === 0}
            isLast={currentIndex === subTabs.length - 1}
          />
        )}
      {activeMainTab === "qualification" &&
        activeSubTab === "शैक्षणिक अर्हता" && (
          <EducationDetailsForm {...commonProps} />
        )}
      {activeMainTab === "qualification" &&
        activeSubTab === "प्रशिक्षण माहिती" && (
          <TrainingDetailsForm {...commonProps} />
        )}
      {activeMainTab === "qualification" &&
        activeSubTab === "विभागीय परीक्षा" && (
          <DepartmentExamForm {...commonProps} />
        )}
      {activeMainTab === "qualification" &&
        activeSubTab === "स्पर्धा परीक्षा" && (
          <CompetitiveExamForm {...commonProps} />
        )}
      {activeMainTab === "qualification" && activeSubTab === "इतर परीक्षा" && (
        <OtherExamForm {...commonProps} />
      )}
      {activeMainTab === "service" && activeSubTab === "प्रथम नियुक्ती" && (
        <FirstAppointmentForm {...commonProps} />
      )}
      {activeMainTab === "service" &&
        activeSubTab === "पदस्थापना सद्यस्थिती" && (
          <CurrentPostingForm {...commonProps} />
        )}
      {activeMainTab === "service" &&
        activeSubTab === "सेवा प्रगती (ACP/MACP)" && (
          <ServiceProgressForm {...commonProps} />
        )}
      {activeMainTab === "service" && activeSubTab === "मत्ता व दायित्व" && (
        <AssetLiabilityForm {...commonProps} />
      )}
      {/* ================= SALARY SECTION ================= */}
      {activeMainTab === "salary" && activeSubTab === "वेतन आयोग" && (
        <PayCommissionForm {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "वेतनवाढ तपशील" && (
        <SalaryIncrementForm {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "वेतन भत्ता" && (
        <AllowanceForm {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "इतर वेतन योजना" && (
        <OtherSchemeForm {...commonProps} />
      )}
      {activeMainTab === "salary" && activeSubTab === "अतिरिक्त वेतन वसुली" && (
        <RecoveryForm {...commonProps} />
      )}

      {/* ================= TRANSFER ================= */}
      {activeMainTab === "transfer" && activeSubTab === "बदली माहिती" && (
        <TransferForm {...commonProps} />
      )}

      {/* ================= ENQUIRY ================= */}
      {activeMainTab === "enquiry" && activeSubTab === "अनधिकृत गैरहजर" && (
        <UnauthorizedAbsenceForm {...commonProps} />
      )}

      {activeMainTab === "enquiry" && activeSubTab === "विभागीय चौकशी" && (
        <DepartmentEnquiryForm {...commonProps} />
      )}

      {activeMainTab === "enquiry" && activeSubTab === "निलंबन माहिती" && (
        <SuspensionForm {...commonProps} />
      )}

      {activeMainTab === "enquiry" && activeSubTab === "न्यायालयीन प्रकरण" && (
        <CourtCaseForm {...commonProps} />
      )}

      {activeMainTab === "serviceBook" && activeSubTab === "सेवा पुस्तक" && (
        <ServiceBookForm {...commonProps} />
      )}

      {activeMainTab === "serviceBook" &&
        activeSubTab === "सेवापुस्तक पडताळणी" && (
          <ServiceBookVerificationForm {...commonProps} />
        )}

      {activeMainTab === "medical" && activeSubTab === "आजार माहिती" && (
        <DiseaseForm {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "पदोन्नती तपशील" && (
        <PromotionForm {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "मुदतवाढ तपशील" && (
        <ExtensionForm {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "दिव्यांग तपशील" && (
        <DisabilityForm {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "गटविमा तपशील" && (
        <InsuranceForm {...commonProps} />
      )}
      {activeMainTab === "medical" && activeSubTab === "अग्रिम तपशील" && (
        <AdvanceForm {...commonProps} />
      )}

      {activeMainTab === "certificates" && activeSubTab === "प्रमाणपत्रे" && (
        <CertificatesForm {...commonProps} />
      )}
    </div>
  );
};

export default EmployeeAdd;
