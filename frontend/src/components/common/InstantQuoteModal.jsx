import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Input from "./Input";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ── Shared label — identical to GetQuoteModal ──────────────────
const FieldLabel = ({ text, required, hint }) => (
  <label className="block pb-1.5 text-[#192133] text-xs font-bold uppercase tracking-wide">
    {text}
    {required && <span className="text-[#AC292A]"> *</span>}
    {hint && <span className="ml-1.5 normal-case tracking-normal font-normal text-gray-400 text-[10px]">{hint}</span>}
  </label>
);

// ── Shared input class — identical to GetQuoteModal ────────────
const fieldCls = (hasError) =>
  `w-full border ${hasError ? "border-red-400" : "border-gray-200"} bg-white text-sm px-3 py-2.5 rounded-xl text-[#192133] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AC292A]/30 focus:border-[#AC292A] transition-all duration-200`;

// ── Field error ────────────────────────────────────────────────
const FieldError = ({ msg }) =>
  msg ? <p className="text-red-400 text-[11px] mt-1 font-medium">{msg}</p> : null;

// ── Main Component ─────────────────────────────────────────────
const InstantQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal, categoryData }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      categoryName: "",
      message: "",
      image: null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("categoryName", values.categoryName || "");
        formData.append("message", values.message);
        formData.append("image", values.image);
        formData.append("pageUrl", window.location.href);

        const response = await axios.post(`${BaseUrl}/instantQuote/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.status === "success") {
          navigate("/thank-you-page");
        } else {
          toast.error(response?.data?.message);
        }
        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isModalOpen && categoryData?.title) {
      formik.setFieldValue("categoryName", categoryData.title);
    } else if (!isModalOpen) {
      formik.setFieldValue("categoryName", "");
    }
  }, [isModalOpen, categoryData?.title]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-3xl max-w-xl w-[95%] sm:w-[90%]">
      <div className="bg-white overflow-hidden rounded-3xl">

        {/* ── Header — same style as GetQuoteModal right-panel header ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#AC292A]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#AC292A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[#192133] text-sm font-bold leading-tight">Get an Instant Quote</p>
              <p className="text-gray-400 text-xs mt-0.5">We respond within 24 business hours</p>
            </div>
          </div>
          <button
            onClick={() => { formik.resetForm(); setIsModalOpen(false); }}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-[#AC292A]/10 hover:text-[#AC292A] flex items-center justify-center text-gray-400 transition-all duration-200"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* ── Form body ── */}
        <div className="px-7 py-6 overflow-y-auto max-h-[75vh]">
          <form onSubmit={formik.handleSubmit}>

            {/* Section label — same style as GetQuoteModal section dividers */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 rounded-full bg-[#AC292A]" />
              <h6 className="text-sm font-bold text-[#192133] uppercase tracking-wide">Your Information</h6>
            </div>

            <div className="flex flex-col gap-4">

              {/* Category (auto-filled, read-only display) */}
              {formik.values.categoryName && (
                <div>
                  <FieldLabel text="Category" />
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#f7f8fc] border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#AC292A] flex-shrink-0" />
                    <span className="text-[#192133] text-sm font-semibold">{formik.values.categoryName}</span>
                  </div>
                </div>
              )}

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel text="Full Name" required />
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={fieldCls(formik.touched.name && formik.errors.name)}
                  />
                  <FieldError msg={formik.touched.name && formik.errors.name} />
                </div>
                <div>
                  <FieldLabel text="Email Address" required />
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@umbrellapackaging.ca"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={fieldCls(formik.touched.email && formik.errors.email)}
                  />
                  <FieldError msg={formik.touched.email && formik.errors.email} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <FieldLabel text="Phone Number" />
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+1 (000) 000-0000"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={fieldCls(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                />
                <FieldError msg={formik.touched.phoneNumber && formik.errors.phoneNumber} />
              </div>

              {/* Message */}
              <div>
                <FieldLabel text="Message" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We'll promptly provide you with a quote."
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${fieldCls(formik.touched.message && formik.errors.message)} resize-none leading-relaxed`}
                />
                <FieldError msg={formik.touched.message && formik.errors.message} />
              </div>

              {/* File upload — same drag-zone style as GetQuoteModal */}
              <div>
                <FieldLabel
                  text="Upload Image"
                  hint="(Max 5MB · PNG, PDF, JPG, JPEG, WEBP)"
                />
                <label
                  htmlFor="image"
                  className="group flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-6 px-4 cursor-pointer hover:border-[#AC292A]/40 hover:bg-[#AC292A]/3 transition-all duration-300"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (!file) return;
                    if (file.size > 5 * 1024 * 1024) { toast.error("File size exceeds 5MB limit."); return; }
                    formik.setFieldValue("image", file);
                  }}
                >
                  {formik.values.image ? (
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#AC292A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#AC292A] text-xs font-bold truncate max-w-[200px]">{formik.values.image.name}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#192133] text-xs font-semibold group-hover:text-[#AC292A] transition-colors duration-300">
                        Click to upload or drag &amp; drop
                      </p>
                      <p className="text-gray-400 text-[10px]">PNG, PDF, JPG, WEBP · Max 5MB</p>
                    </>
                  )}
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept=".png,.pdf,.jpg,.jpeg,.webp"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      if (file?.size > 5 * 1024 * 1024) { toast.error("File size exceeds 5MB limit."); return; }
                      formik.setFieldValue("image", file);
                    }}
                    onBlur={formik.handleBlur}
                    className="hidden"
                  />
                </label>
                <FieldError msg={formik.touched.image && formik.errors.image} />
              </div>

              {/* Confirm checkbox — same as GetQuoteModal step 2 */}
              <label className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f8fc] border border-gray-100 cursor-pointer group hover:border-[#AC292A]/20 transition-all duration-200">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 accent-[#AC292A] cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-gray-500 group-hover:text-[#192133] transition-colors duration-200 leading-relaxed">
                  I confirm that all the information provided is accurate and complete.
                </span>
              </label>

            </div>

            {/* Submit row — same layout as GetQuoteModal step 2 buttons */}
            <div className="flex justify-end mt-6 pt-5 border-t border-gray-100">
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white uppercase tracking-wide transition-all duration-200
                  ${formik.isValid && !formik.isSubmitting
                    ? "bg-[#AC292A] hover:bg-[#AC292A]/90 hover:shadow-[0_4px_16px_rgba(172,41,42,0.40)] active:scale-[0.98]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {formik.isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    Get Instant Quote
                    <RiCheckboxCircleLine size={16} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Modal>
  );
};

export default InstantQuoteModal;