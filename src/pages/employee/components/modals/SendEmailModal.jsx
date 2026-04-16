import toast from "react-hot-toast";

const SendEmailModal = ({ employee, onClose }) => {

  const handleSend = () => {
    // 🔥 Demo action
    toast.success("📧 Credentials sent successfully");

    console.log("Employee Data:", employee);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* 🔥 MODAL BOX */}
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg animate-fadeIn">

        {/* 🔷 TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Send Credentials
        </h2>

        {/* 🔷 MESSAGE */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Are you sure you want to send login credentials to{" "}
          <span className="font-medium text-gray-800">
            {employee?.first_name || "Employee"}
          </span>
          ?
        </p>

        {/* 🔷 BUTTONS */}
        <div className="flex justify-end gap-3">

          {/* CANCEL */}
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* CONFIRM */}
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default SendEmailModal;