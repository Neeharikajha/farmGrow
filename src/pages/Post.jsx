import React, { useEffect, useState } from "react";
import Sidebar1 from "../farmerUi/own-sidebar";
import ProductsGrid from "../farmerUi/ProductsGrid";
import ProductFormModal from "../farmerUi/ProductFormModal";
import ProductPreviewModal from "../farmerUi/ProductPreviewModal";
import axios from "axios";
import imageCompression from "browser-image-compression";

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

    const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/post", {
          headers: { Authorization: `Bearer ${token}` },
        });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
 if (token) fetchProducts();
  }, [token]);

  const handleChange = async  (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      const file = files?.[0];
      if (file) {
          const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024 });
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((p) => ({
            ...p,
            imageFile: compressedFile,
            imageUrl: reader.result, // always base64
      }));
    };
    reader.readAsDataURL(compressedFile);
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
    String(formData.offeredQuantity).trim();

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

//   const handleConfirm = async () => {
//      try {
//         let imageBase64 = formData.imageUrl;

//       if (formData.imageFile) {
//         // Convert to base64
//         const reader = new FileReader();
//         reader.onloadend = async () => {
//           imageBase64 = reader.result;

//         const data = {
//         imageUrl: imageBase64,  // 👈 not imageFile
//         name: formData.name,
//         totalQuantity: Number(formData.totalQuantity) ,
//         price: Number(formData.price),
//         offeredQuantity: Number(formData.offeredQuantity),
//         available: formData.available,
// };
//         let res;
//         if (editingId) {
//           // PUT or PATCH for editing
//           res = await axios.put(`http://localhost:5000/post/${editingId}`, data, {
//             headers: { "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//              }
             
//           });
//         } else {
//           // POST for new product
//           res = await axios.post("http://localhost:5000/post", data, 
//             {
//             headers: 
//             { "Content-Type": "application/json" ,
//               Authorization: `Bearer ${token}`,
//             }
             
//           });
//         }

//         // ✅ Update UI with backend response
//         setItems((prev) =>
//           editingId
//             ? prev.map((it) => (it._id === editingId ? res.data : it))
//             : [res.data, ...prev]
//         );

//         // Reset state
//         setFormData({
//           imageFile: null,
//           imageUrl: "",
//           name: "",
//           totalQuantity: "",
//           price: "",
//           offeredQuantity: "",
//           available: true,
//         });
//         setEditingId(null);
//         setShowPreview(false);
//       };
//         reader.readAsDataURL(formData.imageFile);
//     }
//   }catch (err) {
//         console.error("Error saving product:", err);
//       }
//       };

const handleConfirm = async () => {
  try {
    let imageBase64 = formData.imageUrl;

    if (formData.imageFile) {
      // Wrap FileReader in a Promise so we can await it
      imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(formData.imageFile);
      });
    }

    const data = {
      imageUrl: imageBase64,
      name: formData.name,
      totalQuantity: Number(formData.totalQuantity),
      price: Number(formData.price),
      offeredQuantity: Number(formData.offeredQuantity),
      available: formData.available,
    };

    let res;
    if (editingId) {
      res = await axios.put(`http://localhost:5000/post/${editingId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await axios.post("http://localhost:5000/post", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setItems((prev) =>
      editingId ? prev.map((it) => (it._id === editingId ? res.data : it)) : [res.data, ...prev]
    );

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

  } catch (err) {
    console.error("Error saving product:", err);
  }
};


      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setItems((prev) => prev.filter((it) => it._id !== id));
        } catch (err) {
          console.error("Error deleting product:", err);
        }
      };

  //     const handleEdit = (item) => {
  //       setFormData({ ...item, imageFile: null });
  //       setEditingId(item._id);
  //       setShowForm(true);
  // };
     const handleEdit = (item) => {
        setFormData({
          imageFile: null, // keep file null so it doesn't break
          imageUrl: item.imageUrl || "",
          name: item.name,
          totalQuantity: item.totalQuantity,
          price: item.price,
          offeredQuantity: item.offeredQuantity,
          available: item.available,
        });
        setEditingId(item._id);
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
