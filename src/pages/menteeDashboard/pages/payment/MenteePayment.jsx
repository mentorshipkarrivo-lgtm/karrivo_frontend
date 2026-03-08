// // import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Tesseract from "tesseract.js";
// // import { useAddTransactionMutation } from "./paymentapislice";
// // import { toast } from "./toat"
// // import CopyToClipboardButton from "./CopyToClipboard";
// // import Loader from "../loader/loader"

// // const AddMoneyToWallet = () => {
// //   const defaultFormData = {
// //     upiId: "jaimaxcoin2024@upi",
// //     secondUpiId: "Vyapar.174327728615@hdfcbank",
// //     transactionId: "",
// //     screenshot: null,
// //     amount: "",
// //   };

// //   // Refs
// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();

// //   // API hooks
// //   const [addTransaction] = useAddTransactionMutation();

// //   // State variables
// //   const [formData, setFormData] = useState(defaultFormData);
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [copiedSecondUpi, setCopiedSecondUpi] = useState(false);

// //   // Copy handler
// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(defaultFormData.upiId);
// //     toast.success("UPI ID copied!");
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   // Download QR
// //   const handleDownload = () => {
// //     const link = document.createElement("a");
// //     link.href = "/images/QR_Code.png";
// //     link.download = "QR_Code_Jaimaxcoin.png";
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     toast.success("QR Code downloaded!");
// //   };

// //   // Validation
// //   const validateField = (name, value) => {
// //     let error = "";
// //     const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];

// //     switch (name) {
// //       case "transactionId":
// //         if (!value.trim()) error = "Transaction ID is required";
// //         break;
// //       case "amount":
// //         if (!value || isNaN(value) || parseFloat(value) <= 0)
// //           error = "Enter valid amount";
// //         break;
// //       case "screenshot":
// //         if (!value) error = "Screenshot is required";
// //         else if (!allowedTypes.includes(value.type))
// //           error = "Only JPG/PNG/JFIF allowed";
// //         break;
// //       default:
// //         break;
// //     }

// //     setErrors((prev) => ({ ...prev, [name]: error }));
// //     return error === "";
// //   };

// //   // Event handlers
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "amount" && !/^[0-9]*$/.test(value)) return;
// //     if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) return;

// //     const newValue = name === "transactionId" ? value.toUpperCase() : value;
// //     setFormData((prev) => ({ ...prev, [name]: newValue }));
// //     validateField(name, value);
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     extractDetailsFromImage(file);
// //     const isValid = validateField("screenshot", file);

// //     if (!isValid) {
// //       if (fileInputRef.current) fileInputRef.current.value = "";
// //       setFormData((prev) => ({ ...prev, transactionId: "" }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, screenshot: file }));
// //     }
// //   };

// //   // OCR Processing
// //   const extractDetailsFromImage = (file) => {
// //     if (!file) return;

// //     setIsLoading(true);
// //     const reader = new FileReader();

// //     reader.onload = () => {
// //       if (reader.result) {
// //         Tesseract.recognize(reader.result, "eng")
// //           .then(({ data: { text } }) => {
// //             let cleanedText = text.replace(/¥/g, "₹");

// //             // Check recipient validation
// //             const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
// //             const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
// //             const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
// //             const paidToJaisvikUpi = /vyapar.174327728615@hdfcbank/i.test(cleanedText);
// //             const paidToCorrectRecipient =
// //               paidToJaisvik || paidToJaimax || paidToJaimaxPartial || paidToJaisvikUpi;

// //             // Extract transaction ID
// //             let transactionID = null;
// //             let extractionMethod = "";

// //             const transactionPatterns = [
// //               /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i,
// //               /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
// //               /Transaction ID[:\s]*(\w+)/i,
// //             ];

// //             for (const pattern of transactionPatterns) {
// //               const match = cleanedText.match(pattern);
// //               if (match && !/date|time|am|pm/i.test(match[1])) {
// //                 transactionID = match[1];
// //                 extractionMethod = "Standard Transaction ID";
// //                 break;
// //               }
// //             }

// //             if (!transactionID) {
// //               const lines = cleanedText.split(/\r?\n/);
// //               for (let i = 0; i < lines.length; i++) {
// //                 const line = lines[i].trim();
// //                 if (line.toLowerCase().includes("transaction id") && i + 1 < lines.length) {
// //                   const nextLine = lines[i + 1].trim();
// //                   const numberMatch = nextLine.match(/^([0-9]{8,})/);
// //                   if (numberMatch) {
// //                     transactionID = numberMatch[1];
// //                     extractionMethod = "Transaction ID next line";
// //                     break;
// //                   }
// //                 }
// //               }
// //             }

// //             if (!transactionID) {
// //               const trIdMatch = cleanedText.match(/Tr\.?\s*ID\s*:?\s*([A-Za-z0-9]+)/i);
// //               if (trIdMatch) {
// //                 transactionID = trIdMatch[1];
// //                 extractionMethod = "Tr. ID (ICICI)";
// //               }
// //             }

// //             if (!transactionID) {
// //               const utrPatterns = [
// //                 /UTR\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
// //                 /UTR\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
// //                 /UTR\s*:?\s*([A-Za-z0-9|:\-_\.]{20,})/i,
// //                 /RRN\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i,
// //                 /Reference\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i,
// //               ];

// //               for (const pattern of utrPatterns) {
// //                 const match = cleanedText.match(pattern);
// //                 if (match) {
// //                   transactionID = match[1];
// //                   extractionMethod = "UTR/RRN/Reference pattern";
// //                   break;
// //                 }
// //               }
// //             }

// //             // Validation
// //             if (!paidToCorrectRecipient) {
// //               setIsLoading(false);
// //               setFormData((prev) => ({ ...prev, transactionId: "", screenshot: null }));
// //               setIsTransactionIdRead(false);
// //               if (fileInputRef.current) fileInputRef.current.value = "";
// //               setErrors((prevErrors) => ({
// //                 ...prevErrors,
// //                 screenshot: "Please upload a screenshot of payment made to jaimaxcoin2024@upi, vyapar.174327728615@hdfcbank, or JAISVIK SOFTWARE",
// //               }));
// //               toast.error("Invalid Recipient", "Please upload a screenshot of payment made to jaimaxcoin2024@upi, vyapar.174327728615@hdfcbank, or JAISVIK SOFTWARE");
// //               return;
// //             }

// //             if (!transactionID) {
// //               setIsLoading(false);
// //               setFormData((prev) => ({ ...prev, transactionId: "", screenshot: null }));
// //               setIsTransactionIdRead(false);
// //               if (fileInputRef.current) fileInputRef.current.value = "";
// //               setErrors((prevErrors) => ({
// //                 ...prevErrors,
// //                 screenshot: "Transaction ID not found in the screenshot. Please upload a clear payment screenshot.",
// //               }));
// //               toast.error("Transaction ID Not Found", "Transaction ID not found in the screenshot. Please upload a clear payment screenshot.");
// //               return;
// //             }

// //             // Success
// //             setFormData((prev) => ({ ...prev, transactionId: transactionID }));
// //             setIsLoading(false);
// //             setIsTransactionIdRead(false);
// //             setErrors((prevErrors) => ({ ...prevErrors, screenshot: "" }));
// //             toast.success("Extraction Successful", `Transaction ID extracted successfully using ${extractionMethod}!`);
// //           })
// //           .catch((error) => {
// //             setIsLoading(false);
// //             setFormData((prev) => ({ ...prev, transactionId: "", screenshot: null }));
// //             setIsTransactionIdRead(false);
// //             if (fileInputRef.current) fileInputRef.current.value = "";
// //             setErrors((prevErrors) => ({
// //               ...prevErrors,
// //               screenshot: "Failed to read screenshot. Please upload a clear image.",
// //             }));
// //             toast.error("OCR Failed", "Failed to read screenshot. Please upload a clear image.");
// //           });
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   };

// //   // Submit handler
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const isValid =
// //       validateField("transactionId", formData.transactionId) &&
// //       validateField("screenshot", formData.screenshot) &&
// //       validateField("amount", formData.amount);

// //     if (!isValid) {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     const formDataToSend = new FormData();
// //     formDataToSend.append("transactionId", formData.transactionId);
// //     formDataToSend.append("transactionAmount", formData.amount);
// //     formDataToSend.append("screenshot", formData.screenshot);

// //     setLoading(true);
// //     try {
// //       const res = await addTransaction(formDataToSend).unwrap();
// //       if (res?.status_code === 200) {
// //         toast.success(res?.message || "Payment submitted!");
// //         setFormData(defaultFormData);
// //         if (fileInputRef.current) fileInputRef.current.value = "";
// //         navigate("/wallet");
// //       }
// //     } catch (error) {
// //       toast.error(error?.data?.message || "Submission failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#062117] py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
// //       <div className="container max-w-8xl mx-auto">
// //         {/* UPI Payment */}
// //         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //           <div className="p-3 sm:p-4 bg-[#062117] text-white">
// //             <h2 className="text-sm sm:text-base font-semibold flex items-center">
// //               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
// //               </svg>
// //               UPI Payment
// //             </h2>
// //           </div>

// //           <div className="p-3 sm:p-4 md:p-6">
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
// //               {/* Left Column - UPI Details & QR */}
// //               <div className="space-y-3 sm:space-y-4">
// //                 {/* UPI IDs */}
// //                 <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
// //                   <h3 className="text-[#062117] font-medium mb-3 flex items-center text-xs sm:text-sm">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     UPI Payment Details
// //                   </h3>

// //                   <div className="space-y-2.5">
// //                     {/* Primary UPI */}
// //                     <div>
// //                       <p className="text-xs text-[#062117] mb-1 font-medium">Primary UPI ID</p>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
// //                           value={defaultFormData.upiId}
// //                           readOnly
// //                         />
// //                         <button
// //                           onClick={handleCopy}
// //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
// //                         >
// //                           {copied ? (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                             </svg>
// //                           ) : (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                             </svg>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>

// //                     {/* Secondary UPI */}
// //                     <div>
// //                       <p className="text-xs text-[#062117] mb-1 font-medium">Secondary UPI ID</p>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
// //                           value={defaultFormData.secondUpiId}
// //                           readOnly
// //                         />
// //                         <button
// //                           onClick={() => {
// //                             navigator.clipboard.writeText(defaultFormData.secondUpiId);
// //                             toast.success("UPI ID copied!");
// //                             setCopiedSecondUpi(true);
// //                             setTimeout(() => setCopiedSecondUpi(false), 2000);
// //                           }}
// //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
// //                         >
// //                           {copiedSecondUpi ? (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                             </svg>
// //                           ) : (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                             </svg>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* QR Code */}
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 flex flex-col items-center">
// //                   <div className="relative mb-3 bg-gray-50 p-2 rounded-lg">
// //                     <div className="border-2 border-gray-200 rounded-lg bg-white">
// //                       <img src={"https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"} className="h-32 w-32 sm:h-40 sm:w-40 object-contain" alt="QR Code" />
// //                     </div>
// //                   </div>
// //                   <p className="text-center text-gray-700 font-medium mb-2 text-xs sm:text-sm">
// //                     Jaisvik Software Solutions Pvt Ltd.
// //                   </p>
// //                   <button
// //                     onClick={handleDownload}
// //                     className="flex items-center text-[#062117] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs transition-colors"
// //                   >
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
// //                     </svg>
// //                     Download QR
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Right Column - Form */}
// //               <div className="space-y-3 sm:space-y-4">
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200">
// //                   <h3 className="text-gray-800 font-medium mb-3 flex items-center text-xs sm:text-sm">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#062117]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// //                     </svg>
// //                     Transaction Details
// //                   </h3>

// //                   <div className="space-y-3">
// //                     {/* Transaction ID */}
// //                     <div>
// //                       <label className="block text-xs text-gray-600 mb-1 font-medium">Transaction ID</label>
// //                       <input
// //                         type="text"
// //                         className={`w-full px-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm ${errors.transactionId ? "border-red-400" : "border-gray-200"
// //                           }`}
// //                         placeholder={!isTransactionIdRead ? "Autofill from screenshot" : "Enter transaction ID"}
// //                         value={formData.transactionId}
// //                         name="transactionId"
// //                         onChange={handleChange}
// //                         disabled={!isTransactionIdRead}
// //                       />
// //                       {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
// //                     </div>

// //                     {/* Amount */}
// //                     <div>
// //                       <label className="block text-xs text-gray-600 mb-1 font-medium">Amount (₹)</label>
// //                       <div className="relative">
// //                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
// //                           <span className="text-gray-500 text-sm">₹</span>
// //                         </div>
// //                         <input
// //                           type="text"
// //                           className={`w-full pl-7 pr-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm ${errors.amount ? "border-red-400" : "border-gray-200"
// //                             }`}
// //                           placeholder="Enter amount"
// //                           value={formData.amount}
// //                           name="amount"
// //                           onChange={handleChange}
// //                         />
// //                       </div>
// //                       {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
// //                     </div>

// //                     {/* Screenshot */}
// //                     <div>
// //                       <label className="block text-xs text-gray-600 mb-1 font-medium">Payment Screenshot</label>
// //                       <input
// //                         type="file"
// //                         accept=".jpg,.jpeg,.png,.jfif"
// //                         className={`w-full px-3 py-1.5 bg-gray-50 border rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-teal-500 file:text-white file:cursor-pointer text-xs ${errors.screenshot ? "border-red-400" : "border-gray-200"
// //                           }`}
// //                         onChange={handleImageChange}
// //                         ref={fileInputRef}
// //                       />
// //                       {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
// //                     </div>

// //                     <button
// //                       onClick={handleSubmit}
// //                       disabled={loading}
// //                       className="w-full bg-[#0098cc] hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs sm:text-sm disabled:opacity-50"
// //                     >
// //                       {loading ? "Submitting..." : "Verify & Submit Payment"}
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Instructions */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-100">
// //                   <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     Instructions
// //                   </h3>
// //                   <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
// //                     <li>Scan QR code with your UPI app</li>
// //                     <li>Complete the payment</li>
// //                     <li>Take a screenshot of confirmation</li>
// //                     <li>Fill in the transaction details above</li>
// //                   </ol>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Loader */}
// //       {(isLoading || loading) && <Loader />}
// //     </div>
// //   );
// // };

// // export default AddMoneyToWallet;





// // import React, { useEffect, useRef, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Tesseract from "tesseract.js";
// // import { useAddTransactionMutation } from "./paymentapislice";
// // import { useCompleteBookingMutation } from "../../../home/mentorsection/mentorsectionapislice";
// // import { toast } from "./toat";
// // import Loader from "../loader/loader";
// // import { ArrowLeft, Calendar, Clock, Users, MessageSquare } from "lucide-react";

// // const MenteePayment = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const fileInputRef = useRef(null);

// //   // Get booking details from navigation state
// //   const bookingState = location.state || {};
// //   const {
// //     bookingId,
// //     mentorId,
// //     mentorName,
// //     paymentAmount,
// //     bookingDetails
// //   } = bookingState;

// //   const defaultFormData = {
// //     upiId: "jaimaxcoin2024@upi",
// //     secondUpiId: "Vyapar.174327728615@hdfcbank",
// //     transactionId: "",
// //     screenshot: null,
// //     amount: paymentAmount || "",
// //   };

// //   // API hooks
// //   const [addTransaction] = useAddTransactionMutation();
// //   const [completeBooking] = useCompleteBookingMutation();

// //   // State variables
// //   const [formData, setFormData] = useState(defaultFormData);
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [copied, setCopied] = useState(false);
// //   const [copiedSecondUpi, setCopiedSecondUpi] = useState(false);


// //   // Copy handler
// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(defaultFormData.upiId);
// //     toast.success("UPI ID copied!");
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const handleCopySecondUpi = () => {
// //     navigator.clipboard.writeText(defaultFormData.secondUpiId);
// //     toast.success("Secondary UPI ID copied!");
// //     setCopiedSecondUpi(true);
// //     setTimeout(() => setCopiedSecondUpi(false), 2000);
// //   };

// //   // Download QR
// //   const handleDownload = () => {
// //     const link = document.createElement("a");
// //     link.href = "/images/QR_Code.png";
// //     link.download = "QR_Code_Jaimaxcoin.png";
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     toast.success("QR Code downloaded!");
// //   };

// //   // Validation
// //   const validateField = (name, value) => {
// //     let error = "";
// //     const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];

// //     switch (name) {
// //       case "transactionId":
// //         if (!value.trim()) error = "Transaction ID is required";
// //         break;
// //       case "screenshot":
// //         if (!value) error = "Screenshot is required";
// //         else if (!allowedTypes.includes(value.type))
// //           error = "Only JPG/PNG/JFIF allowed";
// //         break;
// //       default:
// //         break;
// //     }

// //     setErrors((prev) => ({ ...prev, [name]: error }));
// //     return error === "";
// //   };

// //   // Event handlers
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) return;

// //     const newValue = name === "transactionId" ? value.toUpperCase() : value;
// //     setFormData((prev) => ({ ...prev, [name]: newValue }));
// //     validateField(name, value);
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     extractDetailsFromImage(file);
// //     const isValid = validateField("screenshot", file);

// //     if (!isValid) {
// //       if (fileInputRef.current) fileInputRef.current.value = "";
// //       setFormData((prev) => ({ ...prev, transactionId: "" }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, screenshot: file }));
// //     }
// //   };

// //   // OCR Processing
// //   const extractDetailsFromImage = (file) => {
// //     if (!file) return;

// //     setIsLoading(true);
// //     const reader = new FileReader();

// //     reader.onload = () => {
// //       if (reader.result) {
// //         Tesseract.recognize(reader.result, "eng")
// //           .then(({ data: { text } }) => {
// //             let cleanedText = text.replace(/¥/g, "₹");

// //             // Check recipient validation
// //             const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
// //             const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
// //             const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
// //             const paidToJaisvikUpi = /vyapar.174327728615@hdfcbank/i.test(cleanedText);
// //             const paidToCorrectRecipient =
// //               paidToJaisvik || paidToJaimax || paidToJaimaxPartial || paidToJaisvikUpi;

// //             // Extract transaction ID
// //             let transactionID = null;

// //             const transactionPatterns = [
// //               /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i,
// //               /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
// //               /Transaction ID[:\s]*(\w+)/i,
// //               /Tr\.?\s*ID\s*:?\s*([A-Za-z0-9]+)/i,
// //               /UTR\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
// //               /UTR\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
// //               /RRN\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i,
// //             ];

// //             for (const pattern of transactionPatterns) {
// //               const match = cleanedText.match(pattern);
// //               if (match && !/date|time|am|pm/i.test(match[1])) {
// //                 transactionID = match[1];
// //                 break;
// //               }
// //             }

// //             // Validation
// //             if (!paidToCorrectRecipient) {
// //               setIsLoading(false);
// //               setFormData((prev) => ({ ...prev, transactionId: "", screenshot: null }));
// //               if (fileInputRef.current) fileInputRef.current.value = "";
// //               setErrors((prevErrors) => ({
// //                 ...prevErrors,
// //                 screenshot: "Invalid recipient. Please pay to the correct UPI ID.",
// //               }));
// //               toast.error("Invalid Recipient", "Please upload a screenshot of payment made to jaimaxcoin2024@upi or vyapar.174327728615@hdfcbank");
// //               return;
// //             }

// //             if (!transactionID) {
// //               setIsLoading(false);
// //               toast.warning("Manual Entry Required", "Couldn't extract Transaction ID. Please enter it manually.");
// //               return;
// //             }

// //             // Success
// //             setFormData((prev) => ({ ...prev, transactionId: transactionID }));
// //             setIsLoading(false);
// //             setErrors((prevErrors) => ({ ...prevErrors, screenshot: "" }));
// //             toast.success("Transaction ID extracted successfully!");
// //           })
// //           .catch((error) => {
// //             setIsLoading(false);
// //             toast.warning("Please enter Transaction ID manually");
// //           });
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   };

// //   // Submit handler
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const isValid =
// //       validateField("transactionId", formData.transactionId) &&
// //       validateField("screenshot", formData.screenshot);

// //     if (!isValid) {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // Step 1: Submit payment to mentee payment system
// //       const formDataToSend = new FormData();
// //       formDataToSend.append("transactionId", formData.transactionId);
// //       formDataToSend.append("paymentAmount", paymentAmount);
// //       formDataToSend.append("screenshot", formData.screenshot);
// //       formDataToSend.append("mentorId", mentorId);
// //       formDataToSend.append("mentorName", mentorName);

// //       const paymentRes = await addTransaction(formDataToSend).unwrap();

// //       if (paymentRes?.status_code === 200) {
// //         // Step 2: Complete booking with payment details
// //         const bookingPayload = {
// //           bookingId: bookingId,
// //           paymentDetails: {
// //             paymentMethod: "upi",
// //             transactionId: formData.transactionId,
// //             phoneNumber: bookingDetails?.phone,
// //             amount: paymentAmount
// //           }
// //         };

// //         const bookingRes = await completeBooking(bookingPayload).unwrap();

// //         toast.success(bookingRes.message || "Payment submitted and booking confirmed!");

// //         // Reset form
// //         setFormData(defaultFormData);
// //         if (fileInputRef.current) fileInputRef.current.value = "";

// //         // Navigate to dashboard
// //         setTimeout(() => {
// //           navigate("/mentee/dashboard");
// //         }, 1500);
// //       }
// //     } catch (error) {
// //       console.error("Payment error:", error);
// //       toast.error(error?.data?.message || "Payment submission failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#062117] py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
// //       <div className="container max-w-7xl mx-auto">
// //         {/* Back Button */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="mb-4 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
// //         >
// //           <ArrowLeft className="w-5 h-5" />
// //           <span className="text-sm font-medium">Back</span>
// //         </button>

// //         {/* Booking Summary Card */}
// //         {bookingDetails && (
// //           <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
// //             <div className="p-3 sm:p-4 bg-gradient-to-r from-[#0098cc] to-[#062117] text-white">
// //               <h2 className="text-base sm:text-lg font-semibold">Booking Summary</h2>
// //             </div>
// //             <div className="p-4 sm:p-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div className="flex items-start gap-3">
// //                   <Calendar className="w-5 h-5 text-[#0098cc] mt-0.5" />
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Session Date</p>
// //                     <p className="font-semibold text-gray-800">{bookingDetails.date}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <Clock className="w-5 h-5 text-[#0098cc] mt-0.5" />
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Time & Duration</p>
// //                     <p className="font-semibold text-gray-800">{bookingDetails.time} ({bookingDetails.duration} min)</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <Users className="w-5 h-5 text-[#0098cc] mt-0.5" />
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Mentor</p>
// //                     <p className="font-semibold text-gray-800">{mentorName}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <MessageSquare className="w-5 h-5 text-[#0098cc] mt-0.5" />
// //                   <div>
// //                     <p className="text-xs text-gray-500 mb-1">Session Type</p>
// //                     <p className="font-semibold text-gray-800">{bookingDetails.sessionType}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="mt-4 pt-4 border-t border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-lg font-bold text-gray-800">Total Amount</span>
// //                   <span className="text-3xl font-bold text-[#0098cc]">₹{paymentAmount}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* UPI Payment */}
// //         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //           <div className="p-3 sm:p-4 bg-[#062117] text-white">
// //             <h2 className="text-sm sm:text-base font-semibold flex items-center">
// //               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
// //               </svg>
// //               Complete Payment
// //             </h2>
// //           </div>

// //           <div className="p-3 sm:p-4 md:p-6">
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
// //               {/* Left Column - UPI Details & QR */}
// //               <div className="space-y-3 sm:space-y-4">
// //                 {/* UPI IDs */}
// //                 <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
// //                   <h3 className="text-[#062117] font-medium mb-3 flex items-center text-xs sm:text-sm">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     UPI Payment Details
// //                   </h3>

// //                   <div className="space-y-2.5">
// //                     {/* Primary UPI */}
// //                     <div>
// //                       <p className="text-xs text-[#062117] mb-1 font-medium">Primary UPI ID</p>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
// //                           value={defaultFormData.upiId}
// //                           readOnly
// //                         />
// //                         <button
// //                           onClick={handleCopy}
// //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
// //                         >
// //                           {copied ? (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                             </svg>
// //                           ) : (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                             </svg>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>

// //                     {/* Secondary UPI */}
// //                     <div>
// //                       <p className="text-xs text-[#062117] mb-1 font-medium">Secondary UPI ID</p>
// //                       <div className="relative">
// //                         <input
// //                           type="text"
// //                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
// //                           value={defaultFormData.secondUpiId}
// //                           readOnly
// //                         />
// //                         <button
// //                           onClick={handleCopySecondUpi}
// //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
// //                         >
// //                           {copiedSecondUpi ? (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                             </svg>
// //                           ) : (
// //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
// //                             </svg>
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* QR Code */}
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 flex flex-col items-center">
// //                   <div className="relative mb-3 bg-gray-50 p-2 rounded-lg">
// //                     <div className="border-2 border-gray-200 rounded-lg bg-white">
// //                       <img src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80" className="h-32 w-32 sm:h-40 sm:w-40 object-contain" alt="QR Code" />
// //                     </div>
// //                   </div>
// //                   <p className="text-center text-gray-700 font-medium mb-2 text-xs sm:text-sm">
// //                     Jaisvik Software Solutions Pvt Ltd.
// //                   </p>
// //                   <button
// //                     onClick={handleDownload}
// //                     className="flex items-center text-[#062117] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs transition-colors"
// //                   >
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
// //                     </svg>
// //                     Download QR
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Right Column - Form */}
// //               <div className="space-y-3 sm:space-y-4">
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200">
// //                   <h3 className="text-gray-800 font-medium mb-3 flex items-center text-xs sm:text-sm">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#062117]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
// //                     </svg>
// //                     Payment Verification
// //                   </h3>

// //                   <form onSubmit={handleSubmit} className="space-y-3">
// //                     {/* Transaction ID */}
// //                     <div>
// //                       <label className="block text-xs text-gray-600 mb-1 font-medium">Transaction ID / UTR Number</label>
// //                       <input
// //                         type="text"
// //                         className={`w-full px-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-[#0098cc] focus:border-[#0098cc] text-xs sm:text-sm ${errors.transactionId ? "border-red-400" : "border-gray-200"
// //                           }`}
// //                         placeholder="Enter transaction ID"
// //                         value={formData.transactionId}
// //                         name="transactionId"
// //                         onChange={handleChange}
// //                       />
// //                       {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
// //                     </div>

// //                     {/* Screenshot */}
// //                     <div>
// //                       <label className="block text-xs text-gray-600 mb-1 font-medium">Payment Screenshot</label>
// //                       <input
// //                         type="file"
// //                         accept=".jpg,.jpeg,.png,.jfif"
// //                         className={`w-full px-3 py-1.5 bg-gray-50 border rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#0098cc] file:text-white file:cursor-pointer text-xs ${errors.screenshot ? "border-red-400" : "border-gray-200"
// //                           }`}
// //                         onChange={handleImageChange}
// //                         ref={fileInputRef}
// //                       />
// //                       {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
// //                       <p className="text-xs text-gray-500 mt-1">
// //                         Upload a clear screenshot showing transaction details
// //                       </p>
// //                     </div>

// //                     <button
// //                       type="submit"
// //                       disabled={loading || isLoading}
// //                       className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {loading ? "Processing Payment..." : `Submit Payment - ₹${paymentAmount}`}
// //                     </button>
// //                   </form>
// //                 </div>

// //                 {/* Instructions */}
// //                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-100">
// //                   <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     Payment Instructions
// //                   </h3>
// //                   <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
// //                     <li>Scan QR code or use UPI ID above</li>
// //                     <li>Complete payment of ₹{paymentAmount}</li>
// //                     <li>Take a screenshot of confirmation</li>
// //                     <li>Upload screenshot and enter transaction ID</li>
// //                     <li>Click "Submit Payment" to complete booking</li>



// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Tesseract from "tesseract.js";
// import { useAddTransactionMutation } from "./Paymentsecapislice"
// import { useCompleteBookingMutation } from "../../../topMentors/Mentorsectionapislice";
// import { toast } from "./toat";
// import Loader from "../loader/loader";
// import { ArrowLeft, Calendar, Clock, Users, MessageSquare, Video, CheckCircle } from "lucide-react";


// const MenteePayment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const fileInputRef = useRef(null);

//   // Get booking details from navigation state
//   const bookingState = location.state || {};
//   const {
//     bookingId,
//     mentorId,
//     mentorName,
//     paymentAmount,
//     bookingDetails,
//     mentorDetails,
//     zoomMeeting
//   } = bookingState;

//   // Redirect if no booking data
//   useEffect(() => {
//     if (!bookingId || !paymentAmount) {
//       toast.error("No booking data found. Please create a booking first.");
//       navigate("/");
//     }
//   }, [bookingId, paymentAmount, navigate]);

//   const defaultFormData = {
//     upiId: "karrivo2024@upi",
//     secondUpiId: "exmaple.174327728615@sbi",
//     transactionId: "",
//     screenshot: null,
//     amount: paymentAmount || "",
//   };

//   // API hooks
//   const [addTransaction] = useAddTransactionMutation();
//   const [completeBooking] = useCompleteBookingMutation();

//   // State variables
//   const [formData, setFormData] = useState(defaultFormData);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [copiedSecondUpi, setCopiedSecondUpi] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   // Copy handler
//   const handleCopy = () => {
//     navigator.clipboard.writeText(defaultFormData.upiId);
//     toast.success("UPI ID copied!");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleCopySecondUpi = () => {
//     navigator.clipboard.writeText(defaultFormData.secondUpiId);
//     toast.success("Secondary UPI ID copied!");
//     setCopiedSecondUpi(true);
//     setTimeout(() => setCopiedSecondUpi(false), 2000);
//   };

//   // Download QR
//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/images/QR_Code.png";
//     link.download = "QR_Code_Jaimaxcoin.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success("QR Code downloaded!");
//   };

//   // Validation
//   const validateField = (name, value) => {
//     let error = "";
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];

//     switch (name) {
//       case "transactionId":
//         if (!value.trim()) error = "Transaction ID is required";
//         break;
//       case "screenshot":
//         if (!value) error = "Screenshot is required";
//         else if (!allowedTypes.includes(value.type))
//           error = "Only JPG/PNG/JFIF allowed";
//         break;
//       default:
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//     return error === "";
//   };

//   // Event handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) return;

//     const newValue = name === "transactionId" ? value.toUpperCase() : value;
//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//     validateField(name, value);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     extractDetailsFromImage(file);
//     const isValid = validateField("screenshot", file);

//     if (!isValid) {
//       if (fileInputRef.current) fileInputRef.current.value = "";
//       setFormData((prev) => ({ ...prev, transactionId: "" }));
//     } else {
//       setFormData((prev) => ({ ...prev, screenshot: file }));
//     }
//   };

//   // OCR Processing
//   const extractDetailsFromImage = (file) => {
//     if (!file) return;

//     setIsLoading(true);
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.result) {
//         Tesseract.recognize(reader.result, "eng")
//           .then(({ data: { text } }) => {
//             let cleanedText = text.replace(/¥/g, "₹");

//             // Check recipient validation
//             const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
//             const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
//             const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
//             const paidToJaisvikUpi = /vyapar.174327728615@hdfcbank/i.test(cleanedText);
//             const paidToCorrectRecipient =
//               paidToJaisvik || paidToJaimax || paidToJaimaxPartial || paidToJaisvikUpi;

//             // Extract transaction ID
//             let transactionID = null;

//             const transactionPatterns = [
//               /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i,
//               /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
//               /Transaction ID[:\s]*(\w+)/i,
//               /Tr\.?\s*ID\s*:?\s*([A-Za-z0-9]+)/i,
//               /UTR\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
//               /UTR\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i,
//               /RRN\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i,
//             ];

//             for (const pattern of transactionPatterns) {
//               const match = cleanedText.match(pattern);
//               if (match && !/date|time|am|pm/i.test(match[1])) {
//                 transactionID = match[1];
//                 break;
//               }
//             }

//             // Validation
//             if (!paidToCorrectRecipient) {
//               setIsLoading(false);
//               setFormData((prev) => ({ ...prev, transactionId: "", screenshot: null }));
//               if (fileInputRef.current) fileInputRef.current.value = "";
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 screenshot: "Invalid recipient. Please pay to the correct UPI ID.",
//               }));
//               toast.error("Invalid Recipient", "Please upload a screenshot of payment made to jaimaxcoin2024@upi or vyapar.174327728615@hdfcbank");
//               return;
//             }

//             if (!transactionID) {
//               setIsLoading(false);
//               toast.warning("Manual Entry Required", "Couldn't extract Transaction ID. Please enter it manually.");
//               return;
//             }

//             // Success
//             setFormData((prev) => ({ ...prev, transactionId: transactionID }));
//             setIsLoading(false);
//             setErrors((prevErrors) => ({ ...prevErrors, screenshot: "" }));
//             toast.success("Transaction ID extracted successfully!");
//           })
//           .catch((error) => {
//             setIsLoading(false);
//             toast.warning("Please enter Transaction ID manually");
//           });
//       }
//     };

//     reader.readAsDataURL(file);
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid =
//       validateField("transactionId", formData.transactionId) &&
//       validateField("screenshot", formData.screenshot);

//     if (!isValid) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Step 1: Submit payment to mentee payment system
//       const formDataToSend = new FormData();
//       formDataToSend.append("transactionId", formData.transactionId);
//       formDataToSend.append("paymentAmount", paymentAmount);
//       formDataToSend.append("screenshot", formData.screenshot);
//       formDataToSend.append("mentorId", mentorId);
//       formDataToSend.append("mentorName", mentorName || mentorDetails?.fullName);

//       const paymentRes = await addTransaction(formDataToSend).unwrap();

//       if (paymentRes?.status_code === 200) {
//         // Step 2: Complete booking with payment details
//         const bookingPayload = {
//           bookingId: bookingId,
//           paymentMethod: "upi",
//           transactionId: formData.transactionId,
//           phoneNumber: bookingDetails?.phone,
//           amount: paymentAmount
//         };

//         const bookingRes = await completeBooking(bookingPayload).unwrap();

//         toast.success(bookingRes.message || "Payment submitted and booking confirmed!");
//         setPaymentSuccess(true);

//         // Reset form
//         setFormData(defaultFormData);
//         if (fileInputRef.current) fileInputRef.current.value = "";

//         // Navigate to dashboard after showing success
//         setTimeout(() => {
//           navigate("/mentee/dashboard");
//         }, 3000);
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(error?.data?.message || "Payment submission failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Success Screen
//   if (paymentSuccess) {
//     return (
//       <div className="min-h-screen bg-[#062117] flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center">
//           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-12 h-12 text-white" />
//           </div>

//           <h2 className="text-3xl font-bold text-[#062117] mb-3">
//             Payment Successful!
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Your booking has been confirmed. Check your email for Zoom meeting details.
//           </p>

//           {zoomMeeting && (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <div className="flex items-start gap-3 text-left">
//                 <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-semibold text-blue-800 mb-1">Zoom Meeting Ready</p>
//                   <p className="text-xs text-blue-600 mb-2">
//                     Your meeting link has been sent to your email
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     Meeting ID: {zoomMeeting.meetingId}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <button
//             onClick={() => navigate("/mentee/dashboard")}
//             className="bg-[#0098cc] hover:bg-[#007fa3] text-white font-bold py-3 px-8 rounded-lg transition"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#062117] py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
//       <div className="container max-w-7xl mx-auto">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="text-sm font-medium">Back</span>
//         </button>

//         {/* Booking Summary Card */}
//         {bookingDetails && (
//           <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
//             <div className="p-3 sm:p-4 bg-gradient-to-r from-[#0098cc] to-[#062117] text-white">
//               <h2 className="text-base sm:text-lg font-semibold">Booking Summary</h2>
//             </div>
//             <div className="p-4 sm:p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3">
//                   <Calendar className="w-5 h-5 text-[#0098cc] mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Session Date</p>
//                     <p className="font-semibold text-gray-800">
//                       {new Date(bookingDetails.date).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Clock className="w-5 h-5 text-[#0098cc] mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Time & Duration</p>
//                     <p className="font-semibold text-gray-800">{bookingDetails.time} ({bookingDetails.duration} min)</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Users className="w-5 h-5 text-[#0098cc] mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Mentor</p>
//                     <p className="font-semibold text-gray-800">{mentorName || mentorDetails?.fullName}</p>
//                     {mentorDetails?.currentRole && (
//                       <p className="text-xs text-gray-500">{mentorDetails.currentRole}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MessageSquare className="w-5 h-5 text-[#0098cc] mt-0.5" />
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Session Type</p>
//                     <p className="font-semibold text-gray-800">{bookingDetails.sessionType}</p>
//                   </div>
//                 </div>
//               </div>

//               {bookingDetails.topic && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <p className="text-xs text-gray-500 mb-1">Topic to Discuss</p>
//                   <p className="text-sm text-gray-700">{bookingDetails.topic}</p>
//                 </div>
//               )}

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-bold text-gray-800">Total Amount</span>
//                   <span className="text-3xl font-bold text-[#0098cc]">₹{paymentAmount}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* UPI Payment */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-3 sm:p-4 bg-[#062117] text-white">
//             <h2 className="text-sm sm:text-base font-semibold flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//               </svg>
//               Complete Payment
//             </h2>
//           </div>

//           <div className="p-3 sm:p-4 md:p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//               {/* Left Column - UPI Details & QR */}
//               <div className="space-y-3 sm:space-y-4">
//                 {/* UPI IDs */}
//                 <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
//                   <h3 className="text-[#062117] font-medium mb-3 flex items-center text-xs sm:text-sm">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     UPI Payment Details
//                   </h3>

//                   <div className="space-y-2.5">
//                     {/* Primary UPI */}
//                     <div>
//                       <p className="text-xs text-[#062117] mb-1 font-medium">Primary UPI ID</p>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
//                           value={defaultFormData.upiId}
//                           readOnly
//                         />
//                         <button
//                           onClick={handleCopy}
//                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
//                         >
//                           {copied ? (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                             </svg>
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Secondary UPI */}
//                     <div>
//                       <p className="text-xs text-[#062117] mb-1 font-medium">Secondary UPI ID</p>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 rounded-lg text-[#062117] font-medium text-xs sm:text-sm"
//                           value={defaultFormData.secondUpiId}
//                           readOnly
//                         />
//                         <button
//                           onClick={handleCopySecondUpi}
//                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#062117] hover:bg-[#0a2f22] text-white p-1.5 rounded-md transition-all"
//                         >
//                           {copiedSecondUpi ? (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                             </svg>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* QR Code */}
//                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200 flex flex-col items-center">
//                   <div className="relative mb-3 bg-gray-50 p-2 rounded-lg">
//                     <div className="border-2 border-gray-200 rounded-lg bg-white">
//                       <img src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80" className="h-32 w-32 sm:h-40 sm:w-40 object-contain" alt="QR Code" />
//                     </div>
//                   </div>
//                   <p className="text-center text-gray-700 font-medium mb-2 text-xs sm:text-sm">
//                     Jaisvik Software Solutions Pvt Ltd.
//                   </p>
//                   <button
//                     onClick={handleDownload}
//                     className="flex items-center text-[#062117] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                     </svg>
//                     Download QR
//                   </button>
//                 </div>
//               </div>

//               {/* Right Column - Form */}
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-200">
//                   <h3 className="text-gray-800 font-medium mb-3 flex items-center text-xs sm:text-sm">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#062117]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Payment Verification
//                   </h3>

//                   <form onSubmit={handleSubmit} className="space-y-3">
//                     {/* Transaction ID */}
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1 font-medium">Transaction ID / UTR Number</label>
//                       <input
//                         type="text"
//                         className={`w-full px-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-[#0098cc] focus:border-[#0098cc] text-xs sm:text-sm ${errors.transactionId ? "border-red-400" : "border-gray-200"
//                           }`}
//                         placeholder="Enter transaction ID"
//                         value={formData.transactionId}
//                         name="transactionId"
//                         onChange={handleChange}
//                       />
//                       {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
//                     </div>

//                     {/* Screenshot */}
//                     <div>
//                       <label className="block text-xs text-gray-600 mb-1 font-medium">Payment Screenshot</label>
//                       <input
//                         type="file"
//                         accept=".jpg,.jpeg,.png,.jfif"
//                         className={`w-full px-3 py-1.5 bg-gray-50 border rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#0098cc] file:text-white file:cursor-pointer text-xs ${errors.screenshot ? "border-red-400" : "border-gray-200"
//                           }`}
//                         onChange={handleImageChange}
//                         ref={fileInputRef}
//                       />
//                       {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
//                       <p className="text-xs text-gray-500 mt-1">
//                         Upload a clear screenshot showing transaction details
//                       </p>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={loading || isLoading}
//                       className="w-full bg-[#0098cc] hover:bg-[#007fa3] text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? "Processing Payment..." : `Submit Payment - ₹${paymentAmount}`}
//                     </button>
//                   </form>
//                 </div>

//                 {/* Instructions */}
//                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-100">
//                   <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     Payment Instructions
//                   </h3>
//                   <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
//                     <li>Scan QR code or use UPI ID above</li>
//                     <li>Complete payment of ₹{paymentAmount}</li>
//                     <li>Take a screenshot of confirmation</li>
//                     <li>Upload screenshot and enter transaction ID</li>
//                     <li>Click "Submit Payment" to complete booking</li>
//                   </ol>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Loader */}
//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default MenteePayment;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Upload, Shield, CheckCircle, Percent } from "lucide-react";

const MenteePayment = () => {
  const navigate = useNavigate();
  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecond, setCopiedSecond] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const mentorName = "Rahul Sharma";
  const mentorRole = "Product Manager @ Google";
  const planMonths = 3;
  const totalSessions = 12;
  const basePrice = 14999;
  const tax = 500;
  const insurance = 1200;
  const total = basePrice + tax + insurance;
  const upiId = "karrivo2024@upi";
  const secondUpiId = "example.174327728615@sbi";

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  if (showSuccess) {
    return (
      <div style={{
        height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f0f4f8", fontFamily: "'DM Sans', sans-serif"
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "48px 40px",
          maxWidth: 420, width: "90%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "linear-gradient(135deg,#22c55e,#16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 18px", boxShadow: "0 8px 24px rgba(34,197,94,0.3)"
          }}>
            <CheckCircle size={34} color="#fff" />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Payment Confirmed!</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28, lineHeight: 1.6 }}>
            Your <strong>{planMonths}-month mentorship</strong> with {mentorName} is now active.
          </p>
          <button onClick={() => navigate("/")} style={{
            background: "#0f172a", color: "#fff", border: "none",
            borderRadius: 50, padding: "12px 32px", fontSize: 14, fontWeight: 700,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
          }}>Go to Dashboard →</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: "100vh", overflow: "hidden",
      background: "#eef1f6",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .inp {
          width: 100%; padding: 8px 11px; border: 1.5px solid #e2e8f0;
          border-radius: 8px; font-size: 12px; font-family: 'DM Sans', sans-serif;
          background: #fff; color: #1e293b; outline: none; transition: border-color 0.18s;
        }
        .inp:focus { border-color: #0098cc; box-shadow: 0 0 0 3px rgba(0,152,204,0.1); }
        .card {
          background: #fff; border-radius: 14px;
          border: 1px solid #e2e8f0; box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .lbl {
          font-size: 9px; font-weight: 700; letter-spacing: 1.1px;
          text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 10px;
        }
        .copy-btn {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
          width: 24px; height: 24px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.15s;
        }
        .copy-btn:hover { background: #e0f2fe; border-color: #0098cc; }
      `}</style>

      {/* ── Top Bar ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e8edf3",
        padding: "0 24px", height: 50, display: "flex", alignItems: "center",
        justifyContent: "space-between", flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate(-1)} style={{
            background: "#f1f5f9", border: "none", borderRadius: 8,
            width: 30, height: 30, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", color: "#475569"
          }}>
            <ArrowLeft size={14} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Complete Payment</span>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>· Long-Term Mentorship · {mentorName}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Shield size={12} color="#22c55e" />
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Secured Payment</span>
        </div>
      </div>

      {/* ── Body: 3 columns ── */}
      <div style={{
        flex: 1, display: "flex", gap: 14, padding: "14px 24px",
        overflow: "hidden", minHeight: 0
      }}>

        {/* ══ COL 1 — QR + Form (flex: 2.2) ══ */}
        <div className="card" style={{ flex: 2.2, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
          <span className="lbl">Scan to Pay</span>

          {/* QR + UPI IDs side by side */}
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            {/* Big QR */}
            <div style={{
              border: "1.5px solid #e8edf3", borderRadius: 12, padding: 8,
              background: "#fafafa", flexShrink: 0
            }}>
              <img
                src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                alt="QR"
                style={{ width: 148, height: 148, display: "block", borderRadius: 8 }}
              />
              <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 7, fontWeight: 500 }}>
                PhonePe · GPay · Paytm
              </p>
            </div>

            {/* UPI IDs + OR */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
                <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 700 }}>OR USE UPI ID</span>
                <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
              </div>

              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Primary UPI ID</span>
                <div style={{ position: "relative" }}>
                  <input className="inp" value={upiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
                  <button className="copy-btn" onClick={() => copy(upiId, setCopiedPrimary)}>
                    {copiedPrimary ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Secondary UPI ID</span>
                <div style={{ position: "relative" }}>
                  <input className="inp" value={secondUpiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
                  <button className="copy-btn" onClick={() => copy(secondUpiId, setCopiedSecond)}>
                    {copiedSecond ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
                  </button>
                </div>
              </div>

              <div style={{
                background: "#fffbeb", border: "1px solid #fde68a",
                borderRadius: 8, padding: "8px 11px"
              }}>
                <p style={{ fontSize: 10, color: "#92400e", lineHeight: 1.55 }}>
                  <strong>Pay exactly ₹{total.toLocaleString("en-IN")}</strong> — wrong amounts delay activation up to 48h.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

          {/* Upload + Transaction side by side */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Payment Screenshot</span>
              <label style={{
                display: "flex", alignItems: "center", gap: 8,
                border: `1.5px dashed ${screenshotName ? "#86efac" : "#cbd5e1"}`,
                borderRadius: 9, padding: "9px 12px", cursor: "pointer",
                background: screenshotName ? "#f0fdf4" : "#fafbfc", transition: "all 0.2s",
                height: 40
              }}>
                <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: "none" }}
                  onChange={e => { if (e.target.files[0]) setScreenshotName(e.target.files[0].name); }} />
                <Upload size={13} color={screenshotName ? "#16a34a" : "#94a3b8"} />
                <span style={{ fontSize: 11, color: screenshotName ? "#15803d" : "#64748b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {screenshotName || "Upload screenshot"}
                </span>
              </label>
            </div>

            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Transaction / UTR ID</span>
              <input
                className="inp"
                placeholder="e.g. T2312XXXXXXX"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value.toUpperCase())}
                style={{ letterSpacing: "0.4px", height: 40 }}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowSuccess(true)}
            style={{
              width: "100%", background: "linear-gradient(135deg,#0098cc,#005f8a)",
              color: "#fff", border: "none", borderRadius: 9,
              padding: "11px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 14px rgba(0,152,204,0.3)", marginTop: "auto"
            }}
          >
            Confirm Payment — ₹{total.toLocaleString("en-IN")}
          </button>
        </div>

        {/* ══ COL 2 — Summary (flex: 2) ══ */}
        <div className="card" style={{ flex: 2, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 11, minWidth: 0 }}>
          <span className="lbl">Summary</span>
          <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, marginTop: -4 }}>
            Total includes plan fee, platform tax and session insurance.
          </p>

          {/* Mentor */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "#f8fafc", borderRadius: 10, padding: "9px 11px",
            border: "1px solid #e8edf3"
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg,#0098cc,#005f8a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0
            }}>{mentorName[0]}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{mentorName}</p>
              <p style={{ fontSize: 10, color: "#64748b" }}>{mentorRole}</p>
            </div>
            <span style={{
              marginLeft: "auto", fontSize: 9, fontWeight: 800,
              background: "#1d4ed8", color: "#fff",
              padding: "2px 8px", borderRadius: 20, letterSpacing: "0.4px", flexShrink: 0
            }}>LTM</span>
          </div>

          {/* Plan */}
          <div style={{
            background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
            borderRadius: 8, padding: "9px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            border: "1px solid #bfdbfe"
          }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8" }}>{planMonths} Month Plan</p>
              <p style={{ fontSize: 10, color: "#3b82f6" }}>{totalSessions} sessions</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#1d4ed8" }}>₹{basePrice.toLocaleString("en-IN")}</p>
          </div>

          {/* Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { label: "Shipping", val: `₹${basePrice.toLocaleString("en-IN")}` },
              { label: "Tax", val: `₹${tax.toLocaleString("en-IN")}` },
              { label: "Insurance", val: `₹${insurance.toLocaleString("en-IN")}` },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{r.val}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

          {/* Discount */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Percent size={11} color="#94a3b8" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
              <input className="inp" placeholder="Discount code" value={discountCode}
                onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                style={{ paddingLeft: 25, fontSize: 11 }} />
            </div>
            <button style={{
              background: "#0f172a", color: "#fff", border: "none",
              borderRadius: 8, padding: "0 14px", fontSize: 11,
              fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
            }}>Apply</button>
          </div>

          {/* Total */}
          <div style={{
            background: "#0f172a", borderRadius: 10,
            padding: "12px 16px", display: "flex",
            justifyContent: "space-between", alignItems: "center", marginTop: "auto"
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Total Due</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", letterSpacing: "-0.5px" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* ══ COL 3 — How to Pay (flex: 1.3 — narrower) ══ */}
        <div className="card" style={{ flex: 1.3, padding: "18px 16px", display: "flex", flexDirection: "column", minWidth: 0 }}>
          <span className="lbl">How to Pay</span>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
            {[
              { n: "01", color: "#0098cc", bg: "#e0f2fe", border: "#bae6fd", title: "Scan QR or Copy UPI", desc: "Use any UPI app. Tap scan QR or pay via UPI ID from the left panel." },
              { n: "02", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", title: "Enter Exact Amount", desc: `Pay exactly ₹${total.toLocaleString("en-IN")}. Wrong amounts delay activation.` },
              { n: "03", color: "#d97706", bg: "#fef3c7", border: "#fde68a", title: "Screenshot Confirmation", desc: "Capture confirmation showing Transaction ID and amount clearly." },
              { n: "04", color: "#16a34a", bg: "#dcfce7", border: "#bbf7d0", title: "Upload & Confirm", desc: "Paste UTR ID, upload screenshot, hit Confirm. Activates in ~2 hours." },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, background: "#fafbfc", borderRadius: 10,
                border: `1px solid ${s.border}`,
                padding: "10px 13px", display: "flex", gap: 11, alignItems: "flex-start",
                minHeight: 0
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: s.bg, color: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1
                }}>{s.n}</div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{s.title}</p>
                  <p style={{ fontSize: 10.5, color: "#64748b", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenteePayment;
