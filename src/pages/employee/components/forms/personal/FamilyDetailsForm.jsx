import { useState, useEffect } from "react";

import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import DropdownSearch from "../../../../../components/common/DropdownSearch";

import {
  saveStep9,
  getSalutations,
} from "../../../../../services/employeeService";

const FamilyInfoForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
}) => {

  const [records, setRecords] = useState([
    {
      salutation: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      relation: "",
    },
  ]);

  const [salutationOptions, setSalutationOptions] = useState([]);

  // =========================
  // Load Salutations
  // =========================
  useEffect(() => {
    loadSalutations();
  }, []);

  const loadSalutations = async () => {

    try {

      const res = await getSalutations();

      console.log(
        "SALUTATION RESPONSE:",
        res
      );

      const formatted = res.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setSalutationOptions(formatted);

    } catch (err) {

      console.log(
        "SALUTATION ERROR:",
        err
      );
    }
  };

  // =========================
  // Relation Options
  // =========================
  const relationOptions = [
    { id: "father", name: "वडील" },
    { id: "mother", name: "आई" },
    { id: "brother", name: "भाऊ" },
    { id: "sister", name: "बहीण" },
    { id: "wife", name: "पत्नी" },
    { id: "husband", name: "पती" },
    { id: "son", name: "मुलगा" },
    { id: "daughter", name: "मुलगी" },
  ];

  // =========================
  // Handle Change
  // =========================
  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...records];

    updated[index][field] = value;

    setRecords(updated);

    console.log(
      "UPDATED RECORDS:",
      updated
    );
  };

  // =========================
  // Add Row
  // =========================
  const addRow = () => {

    setRecords([
      ...records,
      {
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        relation: "",
      },
    ]);
  };

  // =========================
  // Remove Row
  // =========================
  const removeRow = (index) => {

    const updated = records.filter(
      (_, i) => i !== index
    );

    setRecords(updated);
  };

  // =========================
  // Format Date
  // =========================
  const formatDate = (date) => {

    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();

    const month = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      d.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async () => {

    try {

      console.log(
        "STEP 9 SUBMIT STARTED"
      );

      console.log(
        "USER ID:",
        userId
      );

      console.log(
        "ALL RECORDS:",
        records
      );

      if (!userId) {

        console.log(
          "USER ID MISSING"
        );

        return;
      }

      for (let item of records) {

        console.log(
          "CURRENT ITEM:",
          item
        );

        // Validation
        if (
          !item.salutation ||
          !item.firstName ||
          !item.middleName ||
          !item.lastName ||
          !item.dob ||
          !item.relation
        ) {

          console.log(
            "VALIDATION FAILED:",
            item
          );

          return;
        }

        const payload = {

          user_id: userId,

          salutation:
            item.salutation?.id ||
            item.salutation,

          first_name:
            item.firstName,

          middle_name:
            item.middleName,

          last_name:
            item.lastName,

          dob:
            formatDate(item.dob),

          relation:
            item.relation?.id ||
            item.relation,
        };

        console.log(
          "FINAL PAYLOAD:",
          JSON.stringify(
            payload,
            null,
            2
          )
        );

        // =========================
        // API CALL
        // =========================
        const response =
          await saveStep9(payload);

        console.log(
          "API RESPONSE:",
          response
        );
      }

      console.log(
        "STEP 9 COMPLETED SUCCESSFULLY"
      );

      onNext();

    } catch (err) {

      console.log(
        "STEP 9 ERROR:",
        err
      );

      console.log(
        "ERROR RESPONSE:",
        err.response
      );

      console.log(
        "ERROR DATA:",
        err.response?.data
      );

      console.log(
        "ERROR MESSAGE:",
        err.message
      );
    }
  };

  return (

    <EmployeeFormCard
      title="कौटुंबिक माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
    >

      <div className="space-y-4">

        {records.map((item, index) => (

          <div
            key={index}
            className="border border-slate-200 rounded-xl p-4 bg-slate-50"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-3">

              <h3 className="text-sm font-semibold text-slate-700">
                कौटुंबिक माहिती {index + 1}
              </h3>

              {records.length > 1 && (

                <button
                  type="button"
                  onClick={() =>
                    removeRow(index)
                  }
                  className="text-red-500 text-xs"
                >
                  हटवा
                </button>
              )}

            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">

              {/* Salutation */}
              <div className="col-span-2">

                <DropdownSearch
                  options={salutationOptions}
                  value={item.salutation}
                  onChange={(value) =>
                    handleChange(
                      index,
                      "salutation",
                      value
                    )
                  }
                  placeholder="संज्ञा निवडा"
                />

              </div>

              {/* First Name */}
              <Input
                label="पहिले नाव"
                value={item.firstName}
                onChange={(e) =>
                  handleChange(
                    index,
                    "firstName",
                    e.target.value
                  )
                }
              />

              {/* Middle Name */}
              <Input
                label="वडिलांचे/पतीचे नाव"
                value={item.middleName}
                onChange={(e) =>
                  handleChange(
                    index,
                    "middleName",
                    e.target.value
                  )
                }
              />

              {/* Last Name */}
              <Input
                label="आडनाव"
                value={item.lastName}
                onChange={(e) =>
                  handleChange(
                    index,
                    "lastName",
                    e.target.value
                  )
                }
              />

              {/* DOB */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  जन्मतारीख
                </label>

                <DatePicker
                  value={item.dob}
                  onChange={(value) =>
                    handleChange(
                      index,
                      "dob",
                      value
                    )
                  }
                  placeholder="dd/MM/yyyy"
                />

              </div>

              {/* Relation */}
              <div>

                <DropdownSearch
                  options={relationOptions}
                  value={item.relation}
                  onChange={(value) =>
                    handleChange(
                      index,
                      "relation",
                      value
                    )
                  }
                  placeholder="नाते निवडा"
                />

              </div>

            </div>

          </div>

        ))}

        {/* Add Button */}
        <button
          type="button"
          onClick={addRow}
          className="btn-primary"
        >
          + रेकॉर्ड जोडा
        </button>

      </div>

    </EmployeeFormCard>
  );
};

export default FamilyInfoForm;