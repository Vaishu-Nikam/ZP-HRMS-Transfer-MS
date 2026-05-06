import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";
import { savePaymentStep1 } from "../../../../../services/employeeService";

const PayCommissionForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [records, setRecords] = useState([
    {
      commission: "",
      band: "",
      gradePay: "",
      payInBand: "",
      commissionDate: "",
      applyDate: "",
      currentBasic: "",
    },
  ]);

  const commissionOptions = [
    { id: "1", name: "पहिला" },
    { id: "2", name: "दुसरा" },
    { id: "3", name: "तिसरा" },
    { id: "4", name: "चौथा" },
    { id: "5", name: "पाचवा" },
    { id: "6", name: "सहावा" },
    { id: "7", name: "सातवा" },
  ];

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const addRow = () => {
    setRecords([
      ...records,
      {
        commission: "",
        band: "",
        gradePay: "",
        payInBand: "",
        commissionDate: "",
        applyDate: "",
        currentBasic: "",
      },
    ]);
  };

  const removeRow = (i) => {
    const data = records.filter((_, index) => index !== i);
    setRecords(data);
  };

  // ✅ Date format (same as reference)
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // ✅ API SUBMIT (REFERENCE STYLE)
  const handleSubmit = async () => {
    try {
      if (!userId) {
        alert("User ID missing");
        return;
      }

      for (let item of records) {

        if (
          !item.commission ||
          !item.band ||
          !item.gradePay ||
          !item.payInBand ||
          !item.commissionDate ||
          !item.applyDate ||
          !item.currentBasic
        ) {
          alert("सर्व माहिती भरा");
          return;
        }

        const payload = {
          user_id: userId,
          pay_commission: item.commission,
          band_pay_level: item.band,
          grade_pay_matrix: item.gradePay,
          pay_in_band: item.payInBand,
          commission_date: formatDate(item.commissionDate),
          effective_date: formatDate(item.applyDate),
          current_basic_pay: item.currentBasic,
        };

        console.log("PAYLOAD:", payload);

        await savePaymentStep1(payload);
      }

      onNext();

    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "API Error");
    }
  };

  return (
    <EmployeeFormCard
      title="वेतन आयोग माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >

      <div className="space-y-6">

        {records.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-slate-700">
                रेकॉर्ड {i + 1}
              </p>

              {records.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतन आयोग
                </p>
                <DropdownSearch
                  value={r.commission}
                  onChange={(e) =>
                    handleChange(i, "commission", e.target.value)
                  }
                  options={commissionOptions}
                  placeholder="निवडा"
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  बँड वेतन / स्तर
                </p>
                <Input
                  value={r.band}
                  onChange={(e) =>
                    handleChange(i, "band", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  ग्रेड पे / मॅट्रिक्स
                </p>
                <Input
                  value={r.gradePay}
                  onChange={(e) =>
                    handleChange(i, "gradePay", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  बँड वेतन / स्तर मधील पे
                </p>
                <Input
                  value={r.payInBand}
                  onChange={(e) =>
                    handleChange(i, "payInBand", e.target.value)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतन आयोगचा दिनांक
                </p>
                <DatePicker
                  value={r.commissionDate}
                  onChange={(val) =>
                    handleChange(i, "commissionDate", val)
                  }
                />
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">
                  वेतन आयोग लागू करण्याचा दिनांक
                </p>
                <DatePicker
                  value={r.applyDate}
                  onChange={(val) =>
                    handleChange(i, "applyDate", val)
                  }
                />
              </div>

              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 mb-1">
                  सध्याचे मूळ वेतन
                </p>
                <Input
                  value={r.currentBasic}
                  onChange={(e) =>
                    handleChange(i, "currentBasic", e.target.value)
                  }
                />
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

export default PayCommissionForm; 