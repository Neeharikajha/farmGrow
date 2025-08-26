import React from "react";

export default function ProductFormModal({
  formData,
  canPreview,
  handleChange,
  onClose,
  onSubmit,
  editingId,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="preview-small"
                className="mt-3 h-28 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tomatoes"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Total Quantity (farmer)
              </label>
              <input
                type="text"
                name="totalQuantity"
                value={formData.totalQuantity}
                onChange={handleChange}
                placeholder="5kg"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="20"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Quantity Offered
              </label>
              <input
                type="text"
                name="offeredQuantity"
                value={formData.offeredQuantity}
                onChange={handleChange}
                placeholder="500g"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <span className="text-sm">Available now</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canPreview}
              className={`flex-1 px-4 py-2 rounded text-white ${
                canPreview
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-300 cursor-not-allowed"
              }`}
            >
              Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
