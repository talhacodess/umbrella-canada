import { MdClose } from "react-icons/md";
import { RiFileUploadLine, RiCheckboxCircleLine } from "react-icons/ri";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Modal from "./Modal";
import video from '../../assets/videos/getqoute.mp4';
const GetQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pageUrl, setPageUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageUrl(window.location.href);
        }
    }, []);
    const initialFormState = {
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        boxStyle: "",
        length: "",
        width: "",
        depth: "",
        unit: "Inches",
        stock: "Stock",
        colors: "Colors",
        printingSides: "Inside",
        quantity: "",
        addOns: "",
        image: null,
        description: "",
        pageUrl: pageUrl,

    };

    const [formData, setFormData] = useState(initialFormState);

    const validateStep1 = () => {
        return (
            formData.boxStyle &&
            formData.length &&
            formData.width &&
            formData.depth &&
            formData.unit &&
            formData.stock &&
            formData.colors &&
            formData.printingSides &&
            formData.quantity

        );
    };

    const validateStep2 = () => {
        return (
            formData.name &&
            formData.email
        );
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (files && files[0]) {
            const file = files[0];
            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB limit. Please choose a smaller file.");
                return;
            }
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB limit. Please choose a smaller file.");
                return;
            }
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) {
            alert("Please fill all required fields");
            return;
        }
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

            if (response.data.status === 'success') {
                toast.success(response.data.message)
                setIsLoading(false);
                setStep(1)
                setFormData(initialFormState);
                setIsModalOpen(false);
            } else {
                toast.error(response.data.message)
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (step === 1 && !validateStep1()) {
            alert("Please fill all required fields in Product Specification");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            className={"rounded-2xl max-w-6xl w-[90%]"}
        >
            <div className="p-4 sm:p-6 bg-gradient-to-br from-[#F9F9F9] to-white overflow-y-auto max-h-[90vh]">
                <div className="flex flex-col md:flex-row gap-6 h-full">

                    <div className="hidden lg:block md:w-5/12 lg:w-4/12  h-[70vh] rounded-xl overflow-hidden shadow-lg">
                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="w-full h-full object-cover"
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-12/12 lg:w-8/12 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[#213554] flex items-center gap-2">
                                <RiCheckboxCircleLine className="w-6 h-6 text-[#EE334B]" />
                                Request A Quote
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <MdClose
                                    size={24}
                                    className="text-gray-600 hover:text-[#EE334B] transition-colors"
                                />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto  pr-2">
                            {/* Step Indicator */}
                            {/* <div className="flex items-center gap-2 mb-6">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#EE334B]' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#EE334B] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        1
                                    </div>
                                    <span className="text-sm font-medium">Product Details</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-gray-200">
                                    <div className={`h-full transition-all duration-300 ${step >= 2 ? 'bg-[#EE334B] w-full' : 'bg-gray-200 w-0'}`}></div>
                                </div>
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#EE334B]' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#EE334B] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        2
                                    </div>
                                    <span className="text-sm font-medium">Contact Info</span>
                                </div>
                            </div> */}

                            {step === 2 && (
                                <div className="w-full">
                                    <h6 className="text-xl font-bold mb-6 text-[#213554] flex items-center gap-2">
                                        <RiCheckboxCircleLine className="w-5 h-5 text-[#EE334B]" />
                                        Personal Information
                                    </h6>

                                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div className="w-full">
                                            <Input
                                                label="Name"
                                                star={"*"}
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Name"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Email"
                                                star={"*"}
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Company Name"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Company Name"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Phone Number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <input 
                                                    type="checkbox" 
                                                    id="confirmInfo"
                                                    className="mt-1 mr-3 w-5 h-5 text-[#EE334B] border-gray-300 rounded focus:ring-2 focus:ring-[#EE334B] cursor-pointer"
                                                />
                                                <label htmlFor="confirmInfo" className="text-sm text-gray-700 cursor-pointer">
                                                    Have you filled all the information correctly?
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col sm:flex-row justify-end gap-4 mt-8">
                                        <Button
                                            type="button"
                                            onClick={prevStep}
                                            label="Previous"
                                            className="bg-gray-500 w-full sm:w-auto px-6 text-white py-3 rounded-xl hover:bg-gray-600 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                                        />
                                        <Button
                                            type="submit"
                                            label={isLoading ? "Sending..." : "Submit Quote"}
                                            disabled={!validateStep2() || isLoading}
                                            className={`bg-gradient-to-r from-[#7249A4] to-[#EE334B] hover:from-[#7249A4]/90 hover:to-[#EE334B]/90 w-full sm:w-auto px-6 text-white py-3 rounded-xl transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${!validateStep2() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="">
                                    <h6 className="text-xl font-bold mb-6 text-[#213554] flex items-center gap-2">
                                        <RiCheckboxCircleLine className="w-5 h-5 text-[#EE334B]" />
                                        Product Specification
                                    </h6>

                                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        <div className="w-full">
                                            <Input
                                                label="Box Style"
                                                star={"*"}
                                                name="boxStyle"
                                                value={formData.boxStyle}
                                                onChange={handleChange}
                                                placeholder="Box Style"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Length)"
                                                star={"*"}
                                                name="length"
                                                value={formData.length}
                                                onChange={handleChange}
                                                placeholder="Length"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Width)"
                                                star={"*"}
                                                name="width"
                                                value={formData.width}
                                                onChange={handleChange}
                                                placeholder="Width"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Depth)"
                                                star={"*"}
                                                name="depth"
                                                value={formData.depth}
                                                onChange={handleChange}
                                                placeholder="Depth"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Unit"
                                                className="block pb-2 text-[#213554] text-sm font-semibold"
                                            >
                                                Unit <span className="text-[#EE334B]">*</span>
                                            </label>
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleChange}
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all cursor-pointer"
                                                required
                                            >
                                                <option>Inches</option>
                                                <option>mm</option>
                                                <option>cm</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Stock"
                                                className="block pb-2 text-[#213554] text-sm font-semibold"
                                            >
                                                Stock <span className="text-[#EE334B]">*</span>
                                            </label>
                                            <select
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all cursor-pointer"
                                                required
                                            >
                                                <option>Stock</option>
                                                <option>12pt Cardboard</option>
                                                <option>14pt Cardboard</option>
                                                <option>16pt Cardboard</option>
                                                <option>18pt Cardboard</option>
                                                <option>20pt Cardboard</option>
                                                <option>22pt Cardboard</option>
                                                <option>24pt Cardboard</option>
                                                <option>White SBS C1S C25</option>
                                                <option>Corrugated</option>
                                                <option>Rigid</option>
                                                <option>Kraft</option>
                                                <option>Linen</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Colors"
                                                className="block pb-2 text-[#213554] text-sm font-semibold"
                                            >
                                                Colors <span className="text-[#EE334B]">*</span>
                                            </label>
                                            <select
                                                name="colors"
                                                value={formData.colors}
                                                onChange={handleChange}
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all cursor-pointer"
                                                required
                                            >
                                                <option value={'Colors'}>Colors</option>
                                                <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                                                <option value={'1 Color'}>1 Color</option>
                                                <option value={'2 Color'}>2 Color</option>
                                                <option value={'3 Color'}>3 Color</option>
                                                <option value={'4 Color'}>4 Color</option>
                                                <option value={'4/1 Color'}>4/1 Color</option>
                                                <option value={'4/2 Color'}>4/1 Color</option>
                                                <option value={'4/3 Color'}>4/1 Color</option>
                                                <option value={'4/4 Color'}>4/1 Color</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Printing Sides"
                                                className="block pb-2 text-[#213554] text-sm font-semibold"
                                            >
                                                Printing Sides <span className="text-[#EE334B]">*</span>
                                            </label>
                                            <select
                                                name="printingSides"
                                                value={formData.printingSides}
                                                onChange={handleChange}
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all cursor-pointer"
                                                required
                                            >
                                                <option value={'Inside'}>Inside</option>
                                                <option value={'Outside'}>Outside</option>
                                                <option value={'2 Color'}>Both (Inside & Outside)</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Quantity"
                                                star={"*"}
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                placeholder="Quantity"
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Add-Ons"
                                                className="block pb-2 text-[#213554] text-sm font-semibold"
                                            >
                                                Add-Ons
                                            </label>
                                            <select
                                                name="addOns"
                                                value={formData.addOns}
                                                onChange={handleChange}
                                                className="w-full border-2 border-gray-200 bg-white text-sm p-3 rounded-xl focus:ring-2 focus:ring-[#EE334B] focus:border-[#EE334B] transition-all cursor-pointer"
                                            >
                                                <option value="">Select an option</option>
                                                <option value={'Foiling'}>Foiling</option>
                                                <option value={'Spot UV'}>Spot UV</option>
                                                <option value={'Embossing'}>Embossing</option>
                                                <option value={'Debossing'}>Debossing</option>
                                                <option value={'handles'}>handles</option>
                                                <option value={'Inserts'}>Inserts</option>
                                                <option value={'Windows'}>Windows</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className=" grid grid-cols-1 mt-5 md:grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="design_upload"
                                                    className="block pb-1.5 text-[#213554] text-sm font-semibold mb-1"
                                                >
                                                    Upload Your Design
                                                    <span className="text-[#EE334B] ml-1">*</span>
                                                </label>
                                                <div 
                                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#213554] transition-all duration-300 bg-gradient-to-br from-gray-50 to-white group cursor-pointer flex flex-col justify-center" 
                                                    style={{ minHeight: '120px', height: '100%' }}
                                                    onDrop={handleFileDrop}
                                                    onDragOver={handleDragOver}
                                                >
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        id="design_upload"
                                                        onChange={handleChange}
                                                        className="hidden"
                                                        accept=".png,.pdf,.jpg,.jpeg,.webp"
                                                    />
                                                    <label htmlFor="design_upload" className="cursor-pointer flex flex-col items-center">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-[#213554]/10 to-[#EE334B]/10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                            <svg className="w-6 h-6 text-[#213554]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm text-[#213554] font-semibold mb-0.5 group-hover:text-[#EE334B] transition-colors duration-300">
                                                            {formData.image ? formData.image.name : 'Click to upload or drag and drop'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Max Size: 5MB | Allowed: PNG, PDF, JPG, JPEG, WEBP
                                                        </p>
                                                        {formData.image && (
                                                            <div className="mt-2 px-3 py-1.5 bg-[#213554]/10 text-[#213554] rounded-lg text-xs font-medium">
                                                                ✓ {formData.image.name}
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <Textarea
                                                    label="Description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows={7}
                                                    placeholder="Tell us the size / dimensions, material, finishing, add-ons, and design preferences."
                                                />
                                            </div>
                                        </div>
                                    <div className="w-full flex justify-end mt-8">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            label="Next Step →"
                                            disabled={!validateStep1()}
                                            className={`bg-gradient-to-r from-[#7249A4] to-[#EE334B] hover:from-[#7249A4]/90 hover:to-[#EE334B]/90 w-full sm:w-auto px-8 text-white py-3 rounded-xl transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${!validateStep1() ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GetQuoteModal;