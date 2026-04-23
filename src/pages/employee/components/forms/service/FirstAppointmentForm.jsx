import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import DatePicker from "../../../../../components/common/DatePicker";

const FirstAppointmentForm = (props) => {

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const yesNo = [
    { id: "होय", name: "होय" },
    { id: "नाही", name: "नाही" },
  ];

  return (
    <EmployeeFormCard title="८. प्रथम नियुक्तीची माहिती" {...props}>

      <div className="p-6 space-y-8">

        {/* 🔥 मूलभूत माहिती */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            मूलभूत माहिती
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <Input
              label="नियुक्ती आदेशाचा क्रमांक"
              onChange={(e)=>handleChange("orderNo", e.target.value)}
            />

            <DatePicker
              label="नियुक्ती आदेशाचा दिनांक (dd/MM/yyyy)"
              onChange={(val)=>handleChange("orderDate", val)}
            />

            <div>
              <label className="text-sm font-medium">सरळसेवा नियुक्तीचा मार्ग</label>
              <DropdownSearch
                options={[
                  { id: "सरळसेवा नियुक्ती", name: "सरळसेवा नियुक्ती" },
                  { id: "पदोन्नती", name: "पदोन्नती" },
                ]}
                onChange={(e)=>handleChange("mode", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">नियुक्ती प्रवर्ग [सामाजिक आरक्षण]</label>
              <DropdownSearch
                options={[{ id: "खुला", name: "खुला" }]}
                onChange={(e)=>handleChange("social", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">नियुक्ती प्रवर्ग [समांतर आरक्षण]</label>
              <DropdownSearch
                options={[{ id: "महिला", name: "महिला" }]}
                onChange={(e)=>handleChange("parallel", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                सध्याची पदस्थापना जिल्हा बदलीने/जिल्हा विभाजनाने झाली आहे का?
              </label>
              <DropdownSearch options={yesNo} />
            </div>

          </div>
        </div>

        {/* 🔥 पदस्थापना */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700  mb-3">
            पदस्थापना माहिती
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <label className="text-sm font-medium">पदस्थापना ठिकाण</label>
              <DropdownSearch options={[{ id: "मुख्यालय", name: "मुख्यालय" }]} />
            </div>

            <Input label="पंचायत समिती" />

            <div className="md:col-span-2">
              <label className="text-sm font-medium">विभागस्तर</label>
              <DropdownSearch options={[{ id: "शाळा", name: "शाळा" }]} />
            </div>

            <Input label="रुजू होतानाचे कार्यालयाचे नाव" />
            <Input label="रुजू होण्याच्या पदाचे नाव" />

            <Input label="रुजू होण्याचा पदाचे गट" />

            <DatePicker
              label="रुजू होण्याचा दिनांक (dd/MM/yyyy)"
            />

          </div>
        </div>

        {/* 🔥 वेतन */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700  mb-3">
            वेतन माहिती
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <label className="text-sm font-medium">वेतन आयोग</label>
              <DropdownSearch options={[{ id: "सातवा", name: "सातवा" }]} />
            </div>

            <Input label="वेतन श्रेणी" />
            <Input label="ग्रेड पे" />
            <Input label="मूळ वेतन" />

            <div className="md:col-span-2">
              <label className="text-sm font-medium">नियुक्ती प्रवर्ग</label>
              <DropdownSearch options={[{ id: "OBC", name: "OBC" }]} />
            </div>

          </div>
        </div>

        {/* 🔥 मेडिकल */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700  mb-3">
            मेडिकल माहिती
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <label className="text-sm font-medium">
                नियुक्तीच्या वेळी मेडिकल तपासणी झाली आहे का?
              </label>
              <DropdownSearch options={yesNo} />
            </div>

            <DatePicker label="मेडिकल तपासणीचा दिनांक (dd/MM/yyyy)" />

          </div>
        </div>

        {/* 🔥 मत्ता */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            मत्ता व दायित्व
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <label className="text-sm font-medium">
                मत्ता दायित्व सादर केले आहे का?
              </label>
              <DropdownSearch options={yesNo} />
            </div>

            <DatePicker label="मत्ता दायित्व सादर दिनांक (dd/MM/yyyy)" />

          </div>
        </div>

        {/* 🔥 FILE */}
        <div>
          <label className="text-sm font-medium">
            नियुक्ती आदेश (२ MB पेक्षा कमी साईज)
          </label>

          <div className="mt-1 border border-dashed border-slate-300 rounded-lg p-3 text-sm text-slate-500">
            फाइल निवडा
            <input type="file" className="mt-2 w-full" />
          </div>
        </div>

      </div>

    </EmployeeFormCard>
  );
};

export default FirstAppointmentForm;