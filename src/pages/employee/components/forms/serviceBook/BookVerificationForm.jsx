import { useState } from "react";
import EmployeeFormCard from "../../../../../components/employee/layout/EmployeeFormCard";
import DatePicker from "../../../../../components/common/DatePicker";
import { Input } from "../../../../../components/common/Input";
import { saveServiceBookStep1 } from "../../../../../services/employeeService";

const BookVerificationForm = ({
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
  userId,
  serviceBookData,
}) => {

  const [records, setRecords] = useState([
    {
      verificationType: "",
      verifyDate: "",
      document: null,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleChange = (i, field, value) => {
    const data = [...records];
    data[i][field] = value;
    setRecords(data);
  };

  const handleFile = (i, file) => {
    if (file && file.size > 2 * 1024 * 1024) return;
    handleChange(i, "document", file);
  };

  const handleSubmit = async () => {
    if (!serviceBookData || !userId) return;

    const item = records[0];
    if (!item.verificationType || !item.verifyDate) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // SERVICE BOOK DATA
      formData.append("user_id", userId);
      formData.append(
        "duplicate_received",
        serviceBookData.isSecondaryBook === "होय"
      );
      formData.append(
        "is_updated",
        serviceBookData.isUpdated === "होय"
      );

      if (serviceBookData.document) {
        formData.append("service_book_cert", serviceBookData.document);
      }


      formData.append("verification_type", item.verificationType);
      formData.append("verification_date", formatDate(item.verifyDate));

      if (item.document) {
        formData.append("verification_cert", item.document);
      }

      await saveServiceBookStep1(formData);

      onNext();

    } catch (err) {
      console.error("ServiceBook API Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeFormCard
      title="सेवापुस्तक पडताळणी माहिती"
      onNext={handleSubmit}
      onPrev={onPrev}
      onCancel={onCancel}
      isFirst={isFirst}
      isLast={isLast}
      loading={loading}
    >
      <div className="grid grid-cols-2 gap-4">

        <Input
          label="पडताळणी प्रकार"
          placeholder="yes / no"
          value={records[0].verificationType}
          onChange={(e) =>
            handleChange(0, "verificationType", e.target.value)
          }
        />

        <DatePicker
          label="दिनांक"
          value={records[0].verifyDate}
          onChange={(val) =>
            handleChange(0, "verifyDate", val)
          }
        />

        <div className="col-span-2">
          <label className="text-sm font-medium">
            पडताळणी प्रत (2MB)
          </label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) =>
              handleFile(0, e.target.files[0])
            }
          />
        </div>

      </div>
    </EmployeeFormCard>
  );
};

export default BookVerificationForm;