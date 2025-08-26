import React, { useEffect, useState } from "react";
import Sidebar1 from "../farmerUi/own-sidebar";
import ProductsGrid from "../farmerUi/ProductsGrid";
import ProductFormModal from "../farmerUi/ProductFormModal";
import ProductPreviewModal from "../farmerUi/ProductPreviewModal";

export default function Post() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    imageFile: null,
    imageUrl: "",
    name: "",
    totalQuantity: "",
    price: "",
    offeredQuantity: "",
    available: true,
  });

  useEffect(() => {
    return () => {
      if (formData.imageUrl?.startsWith("blob:"))
        URL.revokeObjectURL(formData.imageUrl);
    };
  }, [formData.imageUrl]);

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

  const openForm = () => {
    setEditingId(null);
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

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
    if (editingId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editingId ? { ...it, ...formData } : it
        )
      );
    } else {
      const newItem = { id: Date.now(), ...formData };
      setItems((prev) => [newItem, ...prev]);
    }

    setFormData({
      imageFile: null,
      imageUrl: "",
      name: "",
      totalQuantity: "",
      price: "",
      offeredQuantity: "",
      available: true,
    });
    setEditingId(null);
    setShowPreview(false);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleEdit = (item) => {
    setFormData({ ...item, imageFile: null });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="flex">
      <Sidebar1 />
      <main className="ml-72 flex-1 p-6 relative">
        <h1 className="text-2xl font-bold mb-6">My Products</h1>

        <ProductsGrid
          items={items}
          onAdd={openForm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (
          <ProductFormModal
            formData={formData}
            canPreview={canPreview}
            handleChange={handleChange}
            onClose={closeForm}
            onSubmit={handlePreview}
            editingId={editingId}
          />
        )}

        {showPreview && (
          <ProductPreviewModal
            formData={formData}
            onBack={backToEdit}
            onConfirm={handleConfirm}
            editingId={editingId}
          />
        )}
      </main>
    </div>
  );
}
