import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateMessApi } from "../../services/mess.services";

const UpdateModal = ({
  showUpdateModal,
  onClose,
  setShowUpdateModal,
  messData,
  handleGetMessData
}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 preload data when modal opens
  useEffect(() => {
    if (messData?.messData) {
      setFormData({
        name: messData.messData.name || "",
        address: messData.messData.address || "",
        contact: messData.messData.contact || "",
        description: messData.messData.description || "",
      });
    }
  }, [messData]);

  // 🔥 common change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateMess = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await updateMessApi(formData);

      toast.success(res.message || "Mess updated successfully");
      await handleGetMessData()
      setShowUpdateModal(false);
      onClose?.();
    } catch (error) {
      toast.error("Failed to update mess");
    } finally {
      setLoading(false);
    }
  };

  if (!showUpdateModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black opacity-25"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-1/3 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold text-indigo-500">Edit Mess</p>
          <button
            className="text-gray-500 font-bold"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleUpdateMess}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Mess name"
            className="border border-gray-300 p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Address"
            className="border border-gray-300 p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            placeholder="Contact"
            className="border border-gray-300 p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Description"
            className="border border-gray-300 p-2 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 text-white font-bold py-2 rounded hover:bg-indigo-400 transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
