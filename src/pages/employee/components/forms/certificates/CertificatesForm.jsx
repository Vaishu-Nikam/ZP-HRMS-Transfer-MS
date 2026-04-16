import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";

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
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    setFiles({ ...files, [field]: file });
  };

  return (
    <EmployeeFormCard title="प्रमाणपत्रे माहिती" {...props}>
      <div className="grid grid-cols-2 gap-4">

        {/* 1 */}
        <div>
          <label className="text-sm font-medium">
            चारित्र्य आणि अँटिसेडन्टस
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("character", e.target.files[0])}
          />
        </div>

        {/* 2 */}
        <div>
          <label className="text-sm font-medium">
            घटनेशी निष्ठा
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("loyalty", e.target.files[0])}
          />
        </div>

        {/* 3 */}
        <div>
          <label className="text-sm font-medium">
            स्वग्राम घोषणा
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("villageDeclaration", e.target.files[0])}
          />
        </div>

        {/* 4 */}
        <div>
          <label className="text-sm font-medium">
            मेडिकल तपासणी प्रमाणपत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("medicalCertificate", e.target.files[0])}
          />
        </div>

        {/* 5 */}
        <div>
          <label className="text-sm font-medium">
            छोटे कुटुंब प्रतिज्ञा पत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("smallFamily", e.target.files[0])}
          />
        </div>

        {/* 6 */}
        <div>
          <label className="text-sm font-medium">
            वचन पत्र
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("undertaking", e.target.files[0])}
          />
        </div>

        {/* 7 */}
        <div>
          <label className="text-sm font-medium">
            विवाहानंतर वैद्यकीय प्रतिपूर्ती विकल्प
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("womenOption", e.target.files[0])}
          />
        </div>

        {/* 8 */}
        <div>
          <label className="text-sm font-medium">
            NPS कुटुंब निवृत्ती वेतन विकल्प
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => handleFile("npsOption", e.target.files[0])}
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default CertificatesForm;