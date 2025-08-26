import React from "react";

export default function ProductPreviewModal({
  formData,
  onBack,
  onConfirm,
  editingId,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold mb-4">Preview Item</h3>
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="preview"
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        <div className="space-y-1">
          <p className="font-semibold">{formData.name || "-"}</p>
          <p className="text-sm">
            Quantity Offered: {formData.offeredQuantity || "-"}
          </p>
          <p className="text-sm">Price: ₹{formData.price || "-"}</p>
          <div className="mt-1">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                formData.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {formData.available ? "Available" : "Not available"}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 border px-4 py-2 rounded hover:bg-gray-50"
          >
            Back to edit
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            {editingId ? "Save Changes" : "Confirm & Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
