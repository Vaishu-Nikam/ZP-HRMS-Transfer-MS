import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

const DisabilityForm = (props) => {

  const [records, setRecords] = useState([
    {
      isDisabled: "",
      personName: "",
      isUdid: "",
      udidNo: "",
      type: "",
      percentage: "",
      checkDate: "",
      isPermanent: "",
      fromDate: "",
      toDate: "",
      isTransportAllowance: "",
      isTaxExempt: "",
      isEquipmentGiven: "",
      equipmentName: "",
      certificateDate: "",
      document: null,
    },
  ]);

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  const disabilityTypes = [
    { id: "1", name: "पूर्णतः अंध (Blindness)" },
    { id: "2", name: "अंशतः अंध (Low Vision)" },
    { id: "3", name: "कर्णबधीर (Hearing Impairment)" },
    { id: "4", name: "वाचा दोष (Speech Disability)" },
    { id: "5", name: "अस्थिव्यंग (Locomotor Disability)" },
    { id: "6", name: "मानसिक आजार (Mental Illness)" },
    { id: "7", name: "अध्ययन अक्षम (Learning Disability)" },
    { id: "8", name: "मेंदूचा पक्षाघात (Cerebral Palsy)" },
    { id: "9", name: "स्वमग्न (Autism)" },
    { id: "10", name: "बहुविकलांग (Multiple Disability)" },
    { id: "11", name: "कुष्ठरोग (Leprosy)" },
    { id: "12", name: "बुटकेपणा (Dwarfism)" },
    { id: "13", name: "बौद्धिक अक्षमता" },
    { id: "14", name: "मांसपेशीय क्षरण" },
    { id: "15", name: "मज्जासंस्थेचे तीव्र आजार" },
    { id: "16", name: "मल्टिपल स्क्लेरोसिस" },
    { id: "17", name: "थॅलेसिमिया" },
    { id: "18", name: "हेमोफिलिया" },
    { id: "19", name: "सिकल सेल" },
    { id: "20", name: "अॅसिड अटॅक" },
    { id: "21", name: "कंपवात रोग" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    handleChange(i, "document", file);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        isDisabled: "",
        personName: "",
        isUdid: "",
        udidNo: "",
        type: "",
        percentage: "",
        checkDate: "",
        isPermanent: "",
        fromDate: "",
        toDate: "",
        isTransportAllowance: "",
        isTaxExempt: "",
        isEquipmentGiven: "",
        equipmentName: "",
        certificateDate: "",
        document: null,
      },
    ]);
  };

  const removeRow = (i) => {
    setRecords(records.filter((_, index) => index !== i));
  };

  return (
    <EmployeeFormCard title="दिव्यांग कर्मचारी माहिती" {...props}>
      <div className="space-y-6">

        {records.map((r, i) => (
          <div key={i} className="space-y-4">

            {records.length > 1 && (
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold">रेकॉर्ड {i + 1}</h3>
                <button onClick={() => removeRow(i)} className="text-red-500 text-xs">
                  हटवा
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label>दिव्यांग आहे का?</label>
                <DropdownSearch value={r.isDisabled} onChange={(e)=>handleChange(i,"isDisabled",e.target.value)} options={yesNo}/>
              </div>

              <Input label="तपासणी झालेल्या व्यक्तीचे नाव" value={r.personName}
                onChange={(e)=>handleChange(i,"personName",e.target.value)} />

              <div>
                <label>UDID क्रमांक आहे का?</label>
                <DropdownSearch value={r.isUdid} onChange={(e)=>handleChange(i,"isUdid",e.target.value)} options={yesNo}/>
              </div>

              <Input label="UDID क्रमांक" value={r.udidNo}
                onChange={(e)=>handleChange(i,"udidNo",e.target.value)} />

              <div>
                <label>दिव्यांग प्रकार</label>
                <DropdownSearch value={r.type} onChange={(e)=>handleChange(i,"type",e.target.value)} options={disabilityTypes}/>
              </div>

              <Input label="दिव्यांग टक्केवारी" value={r.percentage}
                onChange={(e)=>handleChange(i,"percentage",e.target.value)} />

              <DatePicker label="तपासणी दिनांक" value={r.checkDate}
                onChange={(val)=>handleChange(i,"checkDate",val)} />

              <div>
                <label>कायमस्वरूपी आहे का?</label>
                <DropdownSearch value={r.isPermanent} onChange={(e)=>handleChange(i,"isPermanent",e.target.value)} options={yesNo}/>
              </div>

              <DatePicker label="तात्पुरते - पासून" value={r.fromDate}
                onChange={(val)=>handleChange(i,"fromDate",val)} />

              <DatePicker label="तात्पुरते - पर्यंत" value={r.toDate}
                onChange={(val)=>handleChange(i,"toDate",val)} />

              <div>
                <label>वाहतूक भत्ता मिळाला आहे का?</label>
                <DropdownSearch value={r.isTransportAllowance} onChange={(e)=>handleChange(i,"isTransportAllowance",e.target.value)} options={yesNo}/>
              </div>

              <div>
                <label>व्यवसाय कर सूट घेतली आहे का?</label>
                <DropdownSearch value={r.isTaxExempt} onChange={(e)=>handleChange(i,"isTaxExempt",e.target.value)} options={yesNo}/>
              </div>

              <div>
                <label>उपकरण दिले आहे का?</label>
                <DropdownSearch value={r.isEquipmentGiven} onChange={(e)=>handleChange(i,"isEquipmentGiven",e.target.value)} options={yesNo}/>
              </div>

              <Input label="उपकरण नाव" value={r.equipmentName}
                onChange={(e)=>handleChange(i,"equipmentName",e.target.value)} />

              <DatePicker label="प्रमाणपत्र तारीख" value={r.certificateDate}
                onChange={(val)=>handleChange(i,"certificateDate",val)} />

              <div className="col-span-2">
                <label>प्रमाणपत्र (2MB)</label>
                <input type="file" className="input mt-1"
                  onChange={(e)=>handleFile(i,e.target.files[0])}/>
              </div>

            </div>
          </div>
        ))}

        <button onClick={addRow} className="btn-primary">
          + रेकॉर्ड जोडा
        </button>

      </div>
    </EmployeeFormCard>
  );
};

export default DisabilityForm;