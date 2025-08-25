
import React, { useEffect, useState } from "react";
import Sidebar1 from "../farmerUi/own-sidebar"; // adjust path

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    imageFile: null,
    imageUrl: "",
    name: "",
    totalQuantity: "",     // kept for backend, not shown on card
    price: "",
    offeredQuantity: "",
    available: true,
  });

  // clean up object URLs
  useEffect(() => {
    return () => {
      if (formData.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(formData.imageUrl);
    };
  }, [formData.imageUrl]);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      const file = files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFormData((p) => ({ ...p, imageFile: file, imageUrl: url }));
      }
      return;
    }
    if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: checked }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const canPreview =
    formData.imageUrl &&
    formData.name.trim() &&
    formData.price !== "" &&
    formData.offeredQuantity.trim();

  const handlePreview = (e) => {
    e.preventDefault();
    if (!canPreview) return;
    setShowForm(false);
    setShowPreview(true);
  };

  const backToEdit = () => {
    setShowPreview(false);
    setShowForm(true);
  };

  const handleConfirm = () => {
    const newItem = {
      id: Date.now(),
      imageUrl: formData.imageUrl,
      name: formData.name.trim(),
      price: formData.price,
      offeredQuantity: formData.offeredQuantity.trim(),
      available: formData.available,
      // totalQuantity is tracked but not shown on the card
      totalQuantity: formData.totalQuantity.trim(),
    };
    setItems((prev) => [newItem, ...prev]);
    // reset for next add
    setFormData({
      imageFile: null,
      imageUrl: "",
      name: "",
      totalQuantity: "",
      price: "",
      offeredQuantity: "",
      available: true,
    });
    setShowPreview(false);
  };

  return (
    <div className="flex">
      <Sidebar1 />
      <main className="ml-72 flex-1 p-6 relative">
        <h1 className="text-2xl font-bold mb-6">My Products</h1>

        {/* Grid: Add card + items (Add card always present & big) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Add New Item - consistent big card */}
          <button
            onClick={openForm}
            className="h-64 w-full cursor-pointer border-2 border-dashed border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center text-emerald-700 hover:bg-emerald-50 transition"
          >
            <div className="text-4xl leading-none mb-2">＋</div>
            <div className="font-semibold text-lg">Add New Item</div>
            <p className="text-sm text-emerald-700/70 mt-1">Picture, name, price & quantity</p>
          </button>

          {/* Existing items */}
          {items.map((item) => (
            <div key={item.id} className="h-64 w-full border rounded-xl bg-white shadow overflow-hidden flex flex-col">
              <div className="relative h-36 w-full">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                {/* Availability tag */}
                <span
                  className={`absolute top-2 right-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "Available" : "Not available"}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col">
                <p className="font-semibold text-base truncate">{item.name}</p>
                {/* Show only offered quantity on card */}
                <p className="text-sm text-gray-600 mt-1">Quantity: {item.offeredQuantity}</p>
                <p className="text-sm text-gray-900 font-medium mt-1">Price: ₹{item.price}</p>
                {/* spacer */}
                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>

        {/* FORM MODAL (blurred background) */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Add New Item</h2>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePreview} className="space-y-4">
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
                    <label className="block text-sm font-medium mb-1">Total Quantity (farmer)</label>
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
                    <label className="block text-sm font-medium mb-1">Quantity Offered</label>
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
                    onClick={closeForm}
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
        )}

        {/* PREVIEW MODAL (blurred background) */}
        {showPreview && (
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
                {/* total quantity intentionally NOT shown on final card */}
                <p className="text-sm">Quantity Offered: {formData.offeredQuantity || "-"}</p>
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
                  onClick={backToEdit}
                  className="flex-1 border px-4 py-2 rounded hover:bg-gray-50"
                >
                  Back to edit
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Confirm & Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

