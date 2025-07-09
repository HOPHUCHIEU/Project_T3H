import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllMenus,
  createMenu,
  deleteMenu,
  uploadMenuImage,
  updateMenu,
} from "../../../services/menu.service";

// Dùng cho filter
const CATEGORY_LIST = [
  { label: "Tất cả danh mục", value: "" },
  { label: "Món chính", value: "main" },
  { label: "Món phụ", value: "side" },
  { label: "Tráng miệng", value: "dessert" },
  { label: "Đặc biệt", value: "special" },
];
const STATUS_LIST = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Còn hàng", value: "available" },
  { label: "Hết hàng", value: "unavailable" },
];

const MenuManagementPage = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    status: "available",
    image: "",
    isSpecial: false,
  });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState({
    category: "",
    status: "",
    keyword: "",
  });
  // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const BASE_URL = "http://localhost:3000";

  // Lấy menu khi load trang
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchAllMenus(token)
      .then((data) => setMenuItems(data))
      .catch(() => toast.error("Không thể lấy danh sách món ăn!"))
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Xử lý toast thông báo ở góc phải trên
  const notify = (msg, type = "success") =>
    toast[type](msg, { position: "top-right", autoClose: 2200 });

  // Xóa món ăn
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Bạn có chắc muốn xóa món này?")) return;
    try {
      await deleteMenu(itemId, token);
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
      notify("Xóa món ăn thành công!");
    } catch {
      notify("Lỗi khi xóa món ăn!", "error");
    }
  };

  // Cập nhật giá trị trong form thêm/sửa
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Khi chọn ảnh
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Thêm món ăn mới
  const handleAddMenu = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const res = await uploadMenuImage(imageFile, token);
        imageUrl = res.url;
      }
      const dataToSend = {
        ...form,
        image: imageUrl,
        price: Number(form.price),
      };
      const newMenu = await createMenu(dataToSend, token);
      setMenuItems([newMenu, ...menuItems]);
      setShowAddForm(false);
      setForm({
        name: "",
        category: "",
        price: "",
        status: "available",
        image: "",
        isSpecial: false,
      });
      setImageFile(null);
      notify("Thêm món ăn thành công!");
    } catch {
      notify("Lỗi khi thêm món ăn!", "error");
    } finally {
      setAdding(false);
    }
  };

  // Bắt đầu sửa món
  const handleStartEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name || "",
      category: item.category || "",
      price: item.price || "",
      status: item.status || "available",
      image: item.image || "",
      isSpecial: !!item.isSpecial,
    });
    setImageFile(null);
    setShowEditForm(true);
  };

  // Sửa món ăn
  const handleEditMenu = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      let imageUrl = form.image;
      if (imageFile) {
        const res = await uploadMenuImage(imageFile, token);
        imageUrl = res.url;
      }
      const dataToSend = {
        ...form,
        image: imageUrl,
        price: Number(form.price),
      };
      const updated = await updateMenu(editId, dataToSend, token);
      setMenuItems(menuItems.map((m) => (m._id === editId ? updated : m)));
      setShowEditForm(false);
      setEditId(null);
      setForm({
        name: "",
        category: "",
        price: "",
        status: "available",
        image: "",
        isSpecial: false,
      });
      setImageFile(null);
      notify("Sửa món ăn thành công!");
    } catch {
      notify("Lỗi khi sửa món ăn!", "error");
    } finally {
      setAdding(false);
    }
  };

  // Lọc món ăn
  const filteredMenus = menuItems.filter(
    (item) =>
      (!filter.category ||
        (filter.category === "special"
          ? item.isSpecial
          : item.category === filter.category)) &&
      (!filter.status || item.status === filter.status) &&
      (!filter.keyword ||
        item.name?.toLowerCase().includes(filter.keyword.toLowerCase()))
  );

  // Xử lý lỗi ảnh không tồn tại
  const handleImgError = (e) => {
    if (e.target.src !== window.location.origin + "/no-image.png") {
      e.target.src = "/no-image.png";
    }
  };

  // Giao diện modal (thêm/sửa) dùng chung
  const renderFormModal = (onSubmit, isEdit = false) => (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Chỉnh sửa món ăn" : "Thêm món ăn mới"}
        </h2>
        <button
          type="button"
          className="absolute top-2 right-4 text-gray-500 text-2xl"
          onClick={() => {
            setShowAddForm(false);
            setShowEditForm(false);
            setImageFile(null);
            setForm({
              name: "",
              category: "",
              price: "",
              status: "available",
              image: "",
              isSpecial: false,
            });
          }}
        >
          &times;
        </button>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Tên món ăn</label>
          <input
            type="text"
            name="name"
            className="border px-3 py-2 rounded w-full"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Danh mục</label>
          <select
            name="category"
            className="border px-3 py-2 rounded w-full"
            value={form.category}
            onChange={handleInputChange}
          >
            <option value="">Chọn danh mục</option>
            <option value="main">Món chính</option>
            <option value="side">Món phụ</option>
            <option value="dessert">Tráng miệng</option>
          </select>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="isSpecial"
            checked={form.isSpecial}
            onChange={handleInputChange}
            id="isSpecial"
          />
          <label htmlFor="isSpecial" className="font-medium">
            Là món đặc biệt
          </label>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Giá</label>
          <input
            type="number"
            name="price"
            className="border px-3 py-2 rounded w-full"
            value={form.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Trạng thái</label>
          <select
            name="status"
            className="border px-3 py-2 rounded w-full"
            value={form.status}
            onChange={handleInputChange}
          >
            <option value="available">Còn hàng</option>
            <option value="unavailable">Hết hàng</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Hình ảnh</label>
          <button
            type="button"
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() =>
              document.getElementById("input-image-upload").click()
            }
          >
            Chọn hình ảnh
          </button>
          <input
            id="input-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              adding ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={adding}
          >
            {adding
              ? isEdit
                ? "Đang lưu..."
                : "Đang thêm..."
              : isEdit
              ? "Lưu thay đổi"
              : "Thêm món"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Quản lý thực đơn</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => setShowAddForm(true)}
        >
          Thêm món ăn mới
        </button>
      </div>

          {/* Bộ lọc */}
          <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filter.category}
              onChange={(e) =>
                setFilter((f) => ({ ...f, category: e.target.value }))
              }
            >
              {CATEGORY_LIST.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={filter.status}
              onChange={(e) =>
                setFilter((f) => ({ ...f, status: e.target.value }))
              }
            >
              {STATUS_LIST.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 flex-1"
              value={filter.keyword}
              onChange={(e) =>
                setFilter((f) => ({ ...f, keyword: e.target.value }))
              }
            />
          </div>

          {/* Danh sách món ăn */}
          {loading ? (
            <div className="p-8 text-center">Đang tải dữ liệu...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 py-6">
              {filteredMenus.length === 0 ? (
                <div className="col-span-4 text-center text-gray-500">
                  Không có món ăn nào!
                </div>
              ) : (
                filteredMenus.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col justify-between transition-transform hover:scale-[1.03] hover:shadow-lg duration-150"
                  >
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${BASE_URL}${item.image}`
                      }
                      alt={item.name}
                      className="w-full h-40 object-cover"
                      onError={handleImgError}
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base md:text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500">
                            {item.category}
                          </p>
                          {item.isSpecial && (
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-1 font-semibold">
                              Đặc biệt
                            </span>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.status === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status === "available"
                            ? "Còn hàng"
                            : "Hết hàng"}
                        </span>
                      </div>
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {item.price?.toLocaleString("vi-VN")} đ
                      </p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 font-semibold"
                          onClick={() => handleStartEdit(item)}
                        >
                          Sửa
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 font-semibold"
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modal thêm/sửa */}
      {showAddForm && renderFormModal(handleAddMenu, false)}
      {showEditForm && renderFormModal(handleEditMenu, true)}
    </div>
  );
};

export default MenuManagementPage;
