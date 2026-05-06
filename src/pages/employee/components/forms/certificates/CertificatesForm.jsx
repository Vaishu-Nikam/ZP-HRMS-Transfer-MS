import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import FileUpload from "../../../../../components/common/FileUpload";
import { saveCertificateInfo } from "../../../../../services/employeeService";

const CertificatesForm = (props) => {

  const [files, setFiles] = useState({
    character: null,
    loyalty: null,
    villageDeclaration: null,
    medicalCertificate: null,
    smallFamily: null,
    undertaking: null,
    womenOption: null,
    npsOption: null,
  });

  const handleFile = (field, file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("फाईल २ MB पेक्षा कमी असावी");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // 🔥 SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      if (!props.userId) return;

      const formData = new FormData();

      formData.append("user_id", props.userId);

      if (files.character)
        formData.append("character_antecedents", files.character);

      if (files.loyalty)
        formData.append("constitution_oath", files.loyalty);

      if (files.villageDeclaration)
        formData.append("home_village_decl", files.villageDeclaration);

      if (files.medicalCertificate)
        formData.append("medical_cert", files.medicalCertificate);

      if (files.smallFamily)
        formData.append("small_family_pledge", files.smallFamily);

      if (files.undertaking)
        formData.append("undertaking", files.undertaking);

      if (files.womenOption)
        formData.append("medical_reimbursement_option", files.womenOption);

      if (files.npsOption)
        formData.append("nps_family_pension_option", files.npsOption);

      // 🔥 DEBUG
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await saveCertificateInfo(formData);

      props.onNext();

    } catch (err) {
      console.error("Certificate API Error:", err.response?.data || err);
    }
  };

  return (
    <EmployeeFormCard
      title="प्रमाणपत्रे माहिती"
      onNext={handleSubmit}
      onPrev={props.onPrev}
      onCancel={props.onCancel}
      isFirst={props.isFirst}
      isLast={props.isLast}
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <FileUpload
          label="चारित्र्य आणि अँटिसेडन्टस (२ MB पर्यंत)"
          value={files.character}
          onChange={(file)=>handleFile("character", file)}
        />

        <FileUpload
          label="घटनेशी निष्ठा (२ MB पर्यंत)"
          value={files.loyalty}
          onChange={(file)=>handleFile("loyalty", file)}
        />

        <FileUpload
          label="स्वग्राम घोषणा (२ MB पर्यंत)"
          value={files.villageDeclaration}
          onChange={(file)=>handleFile("villageDeclaration", file)}
        />

        <FileUpload
          label="मेडिकल तपासणी प्रमाणपत्र (२ MB पर्यंत)"
          value={files.medicalCertificate}
          onChange={(file)=>handleFile("medicalCertificate", file)}
        />

        <FileUpload
          label="छोटे कुटुंब प्रतिज्ञा पत्र (२ MB पर्यंत)"
          value={files.smallFamily}
          onChange={(file)=>handleFile("smallFamily", file)}
        />

        <FileUpload
          label="वचन पत्र (२ MB पर्यंत)"
          value={files.undertaking}
          onChange={(file)=>handleFile("undertaking", file)}
        />

        <FileUpload
          label="विवाहानंतर वैद्यकीय प्रतिपूर्ती विकल्प (२ MB पर्यंत)"
          value={files.womenOption}
          onChange={(file)=>handleFile("womenOption", file)}
        />

        <FileUpload
          label="NPS कुटुंब निवृत्ती वेतन विकल्प (२ MB पर्यंत)"
          value={files.npsOption}
          onChange={(file)=>handleFile("npsOption", file)}
        />

      </div>

    </EmployeeFormCard>
  );
};

export default CertificatesForm;