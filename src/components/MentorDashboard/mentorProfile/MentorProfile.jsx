// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Mail, Phone, MapPin, Calendar, Globe, Briefcase, GraduationCap, Award, DollarSign, Clock, Users, Edit2, Save, X, CheckCircle, XCircle, Loader, BookOpen, FileText, Video, Linkedin, Target, Star, Upload, CloudUpload, File, Trash2, Plus, AlertCircle } from 'lucide-react'; import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";

// // // const MentorProfile = () => {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [formData, setFormData] = useState({

// // //     availability: [
// // //       { day: 'Monday', slots: [] },
// // //       { day: 'Tuesday', slots: [] },
// // //       { day: 'Wednesday', slots: [] },
// // //       { day: 'Thursday', slots: [] },
// // //       { day: 'Friday', slots: [] },
// // //       { day: 'Saturday', slots: [] },
// // //       { day: 'Sunday', slots: [] }
// // //     ]
// // //   });
// // //   const [email, setEmail] = useState("");
// // //   const [files, setFiles] = useState({
// // //     resume: null,
// // //     portfolio: null,
// // //     video: null
// // //   });

// // //   const resumeInputRef = useRef(null);
// // //   const portfolioInputRef = useRef(null);
// // //   const videoInputRef = useRef(null);

// // //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// // //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("userData");
// // //     if (userData) {
// // //       try {
// // //         const parsedData = JSON.parse(userData);
// // //         setEmail(parsedData.email);
// // //       } catch (error) {
// // //         console.error("Error parsing user data:", error);
// // //       }
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (email) {
// // //       getMentorDetails(email);
// // //     }
// // //   }, [email, getMentorDetails]);

// // //   useEffect(() => {
// // //     if (data?.data) {
// // //       setFormData({
// // //         ...data.data,
// // //         // Ensure availability has proper structure
// // //         availability: data.data.availability || [
// // //           { day: 'Monday', slots: [] },
// // //           { day: 'Tuesday', slots: [] },
// // //           { day: 'Wednesday', slots: [] },
// // //           { day: 'Thursday', slots: [] },
// // //           { day: 'Friday', slots: [] },
// // //           { day: 'Saturday', slots: [] },
// // //           { day: 'Sunday', slots: [] }
// // //         ]
// // //       });
// // //     }
// // //   }, [data]);

// // //   const handleChange = (field, value) => {
// // //     setFormData(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleFileChange = (field, event) => {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       setFiles(prev => ({ ...prev, [field]: file }));
// // //     }
// // //   };

// // //   const handleRemoveFile = (field) => {
// // //     setFiles(prev => ({ ...prev, [field]: null }));
// // //     if (field === 'resume' && resumeInputRef.current) resumeInputRef.current.value = '';
// // //     if (field === 'portfolio' && portfolioInputRef.current) portfolioInputRef.current.value = '';
// // //     if (field === 'video' && videoInputRef.current) videoInputRef.current.value = '';
// // //   };




// // //   const handleSave = async () => {
// // //     try {
// // //       // ✅ Step 1: Check availability data before sending
// // //       console.log('=== FRONTEND DEBUG ===');
// // //       console.log('📅 Availability in formData:', JSON.stringify(formData.availability, null, 2));
// // //       console.log('📊 Full formData:', JSON.stringify(formData, null, 2));

// // //       const dataToSend = {
// // //         email,
// // //         ...formData
// // //       };

// // //       console.log('📤 Data being sent to API:', JSON.stringify(dataToSend, null, 2));
// // //       console.log('📤 Availability in dataToSend:', JSON.stringify(dataToSend.availability, null, 2));

// // //       const result = await updateMentorDetails(dataToSend).unwrap();

// // //       console.log('✅ API Response:', JSON.stringify(result, null, 2));
// // //       console.log('✅ Availability in response:', JSON.stringify(result.data?.availability, null, 2));

// // //       // Refetch updated data
// // //       await getMentorDetails(email);

// // //       setIsEditing(false);
// // //       setFiles({ resume: null, portfolio: null, video: null });
// // //       alert('Profile updated successfully!');
// // //     } catch (err) {
// // //       console.error('❌ Failed to update profile:', err);
// // //       console.error('❌ Error details:', JSON.stringify(err, null, 2));
// // //       alert('Failed to update profile. Please try again.');
// // //     }
// // //   };



// // //   const handleCancel = () => {
// // //     if (data?.data) setFormData(data.data);
// // //     setFiles({ resume: null, portfolio: null, video: null });
// // //     setIsEditing(false);
// // //   };



// // //   const handleAddTimeSlot = (dayIndex) => {
// // //     const newSlot = {
// // //       startTime: '09:00',
// // //       endTime: '10:00',
// // //       isBooked: false
// // //     };

// // //     setFormData(prev => {
// // //       // Ensure availability array exists and has all 7 days
// // //       let currentAvailability = prev.availability && prev.availability.length > 0
// // //         ? [...prev.availability]
// // //         : [...defaultAvailability];

// // //       // Deep clone to avoid mutation issues
// // //       const newAvailability = currentAvailability.map(day => ({
// // //         ...day,
// // //         slots: day.slots ? [...day.slots] : []
// // //       }));

// // //       // Add the new slot to the specific day
// // //       newAvailability[dayIndex].slots.push(newSlot);

// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };




// // //   // const handleAddTimeSlot = (dayIndex) => {
// // //   //   const newSlot = {
// // //   //     startTime: '09:00',
// // //   //     endTime: '10:00',
// // //   //     isBooked: false
// // //   //   };

// // //   //   setFormData(prev => {
// // //   //     const newAvailability = [...prev.availability];
// // //   //     if (!newAvailability[dayIndex].slots) {
// // //   //       newAvailability[dayIndex].slots = [];
// // //   //     }
// // //   //     newAvailability[dayIndex].slots.push(newSlot);
// // //   //     return { ...prev, availability: newAvailability };
// // //   //   });
// // //   // };

// // //   const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex].slots = newAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex);
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   const handleUpdateTimeSlot = (dayIndex, slotIndex, field, value) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex].slots[slotIndex][field] = value;
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };
// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// // //         <div className="text-center"><Loader className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#062117' }} /><p className="font-medium text-gray-700">Loading...</p></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !formData || Object.keys(formData).length === 0) {
// // //     return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"><div className="text-center bg-white p-8 rounded-2xl shadow-lg"><XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" /><p className="text-red-600 font-semibold">Failed to load</p></div></div>;
// // //   }

// // //   const SkillPill = ({ text, color = "#062117" }) => (
// // //     <span className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm hover:shadow-md transition-all transform hover:scale-105" style={{ backgroundColor: color }}>{text}</span>
// // //   );

// // //   const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
// // //     <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all ${className}`}>
// // //       <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
// // //         {Icon && <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(6,33,23,0.1)' }}><Icon size={20} style={{ color: '#062117' }} /></div>}
// // //         <h2 className="text-lg font-bold" style={{ color: '#062117' }}>{title}</h2>
// // //       </div>
// // //       {children}
// // //     </div>
// // //   );

// // //   const FileUploadBox = ({ title, icon: Icon, file, field, inputRef, accept, iconColor }) => (
// // //     <div className="group p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all border-2 border-dashed border-gray-300 hover:border-gray-400">
// // //       <div className="flex items-center gap-2 mb-3">
// // //         <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${iconColor}20` }}>
// // //           <Icon size={20} style={{ color: iconColor }} />
// // //         </div>
// // //         <span className="text-sm font-bold text-gray-700">{title}</span>
// // //       </div>

// // //       {isEditing ? (
// // //         <div className="space-y-3">
// // //           <input
// // //             ref={inputRef}
// // //             type="file"
// // //             accept={accept}
// // //             onChange={(e) => handleFileChange(field, e)}
// // //             className="hidden"
// // //             id={`file-${field}`}
// // //           />

// // //           {!file ? (
// // //             <label
// // //               htmlFor={`file-${field}`}
// // //               className="flex flex-col items-center justify-center p-4 cursor-pointer bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all group"
// // //             >
// // //               <CloudUpload size={32} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
// // //               <span className="text-xs text-gray-500 text-center">Drop file here or click to upload</span>
// // //               <span className="text-xs text-gray-400 mt-1">{accept}</span>
// // //             </label>
// // //           ) : (
// // //             <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
// // //               <div className="flex items-center gap-2 flex-1 min-w-0">
// // //                 <File size={18} style={{ color: iconColor }} />
// // //                 <span className="text-sm text-gray-700 truncate">{file.name}</span>
// // //               </div>
// // //               <button
// // //                 onClick={() => handleRemoveFile(field)}
// // //                 className="p-1 hover:bg-red-50 rounded transition-colors"
// // //               >
// // //                 <Trash2 size={16} className="text-red-500" />
// // //               </button>
// // //             </div>
// // //           )}

// // //           <input
// // //             type="text"
// // //             value={formData[`${field}Link`] || ''}
// // //             onChange={(e) => handleChange(`${field}Link`, e.target.value)}
// // //             placeholder="Or paste link here"
// // //             className="custom-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
// // //           />
// // //         </div>
// // //       ) : (
// // //         <div className="space-y-2">
// // //           {formData[`${field}Link`] && (
// // //             <a
// // //               href={formData[`${field}Link`]}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               className="text-xs text-blue-600 hover:underline block truncate"
// // //             >
// // //               {formData[`${field}Link`]}
// // //             </a>
// // //           )}
// // //           {!formData[`${field}Link`] && (
// // //             <p className="text-xs text-gray-500">No file uploaded</p>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );


// // //   console.log(isEditing, "isEditing")


// // //   const defaultAvailability = [
// // //     { day: "Monday", slots: [] },
// // //     { day: "Tuesday", slots: [] },
// // //     { day: "Wednesday", slots: [] },
// // //     { day: "Thursday", slots: [] },
// // //     { day: "Friday", slots: [] },
// // //     { day: "Saturday", slots: [] },
// // //     { day: "Sunday", slots: [] },
// // //   ];


// // //   const AvailabilitySection = () => {
// // //     const availabilityToRender =
// // //       formData?.availability?.length > 0
// // //         ? formData.availability
// // //         : isEditing
// // //           ? defaultAvailability
// // //           : [];

// // //     return (
// // //       <SectionCard title="Weekly Availability" icon={Calendar} className="lg:col-span-3">
// // //         <p className="text-sm text-gray-600 mb-4">
// // //           Set your available time slots for each day. Mentees can book sessions during these times.
// // //         </p>

// // //         {availabilityToRender.length === 0 && !isEditing ? (
// // //           <p className="text-sm text-gray-500 italic text-center py-6">
// // //             No availability set
// // //           </p>
// // //         ) : (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
// // //             {availabilityToRender.map((dayData, dayIndex) => (
// // //               <div
// // //                 key={dayData.day}
// // //                 className="border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all"
// // //               >
// // //                 <div className="flex items-center justify-between mb-3">
// // //                   <h4 className="font-bold text-gray-900 flex items-center gap-2">
// // //                     <div
// // //                       className="w-2 h-2 rounded-full"
// // //                       style={{ backgroundColor: "#062117" }}
// // //                     ></div>
// // //                     {dayData.day}
// // //                   </h4>

// // //                   {isEditing && (
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => handleAddTimeSlot(dayIndex)}
// // //                       className="text-xs px-3 py-1.5 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-sm flex items-center gap-1"
// // //                       style={{ backgroundColor: "#FF8C42" }}
// // //                     >
// // //                       <Plus size={14} />
// // //                       Add
// // //                     </button>
// // //                   )}
// // //                 </div>

// // //                 {!dayData.slots || dayData.slots.length === 0 ? (
// // //                   <p className="text-xs text-gray-500 italic text-center py-3">
// // //                     {isEditing ? 'Click "Add" to add time slots' : 'No slots available'}
// // //                   </p>
// // //                 ) : (
// // //                   <div className="space-y-2">
// // //                     {dayData.slots.map((slot, slotIndex) => (
// // //                       <div
// // //                         key={slotIndex}
// // //                         className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200"
// // //                       >
// // //                         {isEditing ? (
// // //                           <>
// // //                             <div className="flex-1 flex gap-2">
// // //                               <input
// // //                                 type="time"
// // //                                 value={slot.startTime}
// // //                                 onChange={(e) =>
// // //                                   handleUpdateTimeSlot(
// // //                                     dayIndex,
// // //                                     slotIndex,
// // //                                     "startTime",
// // //                                     e.target.value
// // //                                   )
// // //                                 }
// // //                                 className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
// // //                               />
// // //                               <span className="text-gray-400 self-center">-</span>
// // //                               <input
// // //                                 type="time"
// // //                                 value={slot.endTime}
// // //                                 onChange={(e) =>
// // //                                   handleUpdateTimeSlot(
// // //                                     dayIndex,
// // //                                     slotIndex,
// // //                                     "endTime",
// // //                                     e.target.value
// // //                                   )
// // //                                 }
// // //                                 className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
// // //                               />
// // //                             </div>
// // //                             <button
// // //                               type="button"
// // //                               onClick={() =>
// // //                                 handleRemoveTimeSlot(dayIndex, slotIndex)
// // //                               }
// // //                               className="p-1.5 hover:bg-red-50 rounded"
// // //                             >
// // //                               <X size={14} className="text-red-500" />
// // //                             </button>
// // //                           </>
// // //                         ) : (
// // //                           <div className="flex items-center gap-2">
// // //                             <Clock size={14} style={{ color: "#062117" }} />
// // //                             <span className="text-xs font-semibold text-gray-700">
// // //                               {slot.startTime} - {slot.endTime}
// // //                             </span>
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </SectionCard>
// // //     );
// // //   };



// // //   return (


// // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
// // //       <div className="max-w-7xl mx-auto">
// // //         <style>{`
// // //           .custom-input:focus{outline:none!important;border-color:#062117!important;box-shadow:0 0 0 4px rgba(6,33,23,0.12)!important;transform:translateY(-1px)}
// // //           .custom-input{transition:all 0.2s ease}
// // //         `}</style>

// // //         {/* Hero Header */}
// // //         <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
// // //           <div className="h-2" style={{ background: 'linear-gradient(90deg,#062117,#0a3d2a,#062117)' }}></div>
// // //           <div className="p-8">
// // //             <div className="flex flex-col lg:flex-row gap-8">

// // //               {/* Profile Image & Actions */}
// // //               <div className="flex flex-col items-center lg:items-start">
// // //                 <div className="relative mb-6">
// // //                   <div className="absolute -inset-3 rounded-3xl opacity-20 blur-xl" style={{ backgroundColor: '#062117' }}></div>
// // //                   <div className="relative w-36 h-36 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl" style={{ background: 'linear-gradient(135deg,#062117,#0a3d2a)' }}>
// // //                     {formData.fullName?.charAt(0) || 'M'}
// // //                     {formData.status === 'approved' && (
// // //                       <div className="absolute -bottom-3 -right-3 text-white p-3 rounded-full shadow-lg flex items-center gap-1 pr-4" style={{ backgroundColor: '#062117' }}>
// // //                         <CheckCircle size={18} /><span className="text-xs font-bold">Verified</span>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 <div className="w-full space-y-3">
// // //                   {!isEditing ? (
// // //                     <button onClick={() => setIsEditing(true)} className="w-full px-6 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: '#FF8C42' }}>
// // //                       <Edit2 size={20} />Edit Profile
// // //                     </button>
// // //                   ) : (
// // //                     <>
// // //                       <button onClick={handleSave} disabled={isUpdating} className="w-full px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50" style={{ backgroundColor: '#062117' }}>
// // //                         {isUpdating ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
// // //                         {isUpdating ? 'Saving...' : 'Save Changes'}
// // //                       </button>
// // //                       <button onClick={handleCancel} disabled={isUpdating} className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-md">
// // //                         <X size={20} />Cancel
// // //                       </button>
// // //                     </>
// // //                   )}
// // //                 </div>

// // //                 <div className="w-full mt-6 space-y-2">
// // //                   <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
// // //                     <div className="flex items-center gap-2"><Clock size={16} style={{ color: '#062117' }} /><span className="text-xs font-medium text-gray-700">Experience</span></div>
// // //                     <span className="text-sm font-bold" style={{ color: '#062117' }}>{formData.yearsOfExperience || '0'} years</span>
// // //                   </div>
// // //                   {formData.hourlyRate && (
// // //                     <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
// // //                       <div className="flex items-center gap-2"><DollarSign size={16} className="text-blue-600" /><span className="text-xs font-medium text-gray-700">Rate</span></div>
// // //                       <span className="text-sm font-bold text-blue-700">${formData.hourlyRate}</span>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Main Info */}
// // //               <div className="flex-1">
// // //                 <div className="mb-6">
// // //                   {isEditing ? (
// // //                     <input type="text" value={formData.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} className="custom-input text-4xl font-bold mb-3 w-full px-4 py-3 border-2 border-gray-200 rounded-xl" style={{ color: '#062117' }} placeholder="Full Name" />
// // //                   ) : (
// // //                     <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">{formData.fullName}</h1>
// // //                   )}

// // //                   <div className="text-gray-600 mb-4 flex items-center gap-2">
// // //                     <Briefcase size={18} style={{ color: '#062117' }} />
// // //                     {isEditing ? (
// // //                       <input type="text" value={formData.currentRole || ''} onChange={(e) => handleChange('currentRole', e.target.value)} className="custom-input flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-lg" placeholder="Current Role" />
// // //                     ) : (
// // //                       <span className="text-lg font-semibold">{formData.currentRole || 'N/A'}</span>
// // //                     )}
// // //                   </div>

// // //                   {formData.companyName && (
// // //                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full mb-4">
// // //                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#062117' }}></div>
// // //                       <span className="text-sm font-medium text-gray-700">{formData.companyName}</span>
// // //                     </div>
// // //                   )}

// // //                   <div className="flex flex-wrap gap-4 mt-4">
// // //                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><MapPin size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.location || 'N/A'}</span></div>
// // //                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><Phone size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.phone || 'N/A'}</span></div>
// // //                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><Mail size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.email || 'N/A'}</span></div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="border-t-2 border-gray-100 pt-6">
// // //                   <div className="flex items-center gap-2 mb-3"><BookOpen size={20} style={{ color: '#062117' }} /><h3 className="font-bold text-lg" style={{ color: '#062117' }}>Professional Bio</h3></div>
// // //                   {isEditing ? (
// // //                     <textarea value={formData.whyMentor || ''} onChange={(e) => handleChange('whyMentor', e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none text-gray-700 leading-relaxed" rows={5} placeholder="Share your journey..." />
// // //                   ) : (
// // //                     <p className="text-gray-700 leading-relaxed">{formData.whyMentor || 'N/A'}</p>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Skills */}
// // //               <div className="lg:w-80">
// // //                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 mb-5 border-2 border-green-100">
// // //                   <div className="flex items-center gap-2 mb-4"><Star size={20} style={{ color: '#062117' }} className="fill-current" /><h3 className="font-bold" style={{ color: '#062117' }}>Core Skills</h3></div>
// // //                   {isEditing ? (
// // //                     <textarea value={formData.currentSkills || ''} onChange={(e) => handleChange('currentSkills', e.target.value)} className="custom-input w-full px-3 py-2 border-2 border-gray-200  resize-none text-sm" rows={4} placeholder="Comma separated" />
// // //                   ) : (
// // //                     <div className="flex flex-wrap gap-2">{formData.currentSkills?.split(',').map((s, i) => <SkillPill key={i} text={s.trim()} />)}</div>
// // //                   )}
// // //                 </div>

// // //                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
// // //                   <div className="flex items-center gap-2 mb-4"><Target size={20} className="text-blue-600" /><h3 className="font-bold text-blue-900">Expertise</h3></div>
// // //                   {isEditing ? (
// // //                     <textarea value={formData.areasOfInterest || ''} onChange={(e) => handleChange('areasOfInterest', e.target.value)} className="custom-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg resize-none text-sm" rows={4} placeholder="Comma separated" />
// // //                   ) : (
// // //                     <div className="flex flex-wrap gap-2">{formData.areasOfInterest?.split(',').map((a, i) => <SkillPill key={i} text={a.trim()} color="#4A90E2" />)}</div>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Bottom Grid */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //           <SectionCard title="Web Presence" icon={Globe}>
// // //             {!isEditing && formData.linkedinUrl && (
// // //               <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group border border-blue-100">
// // //                 <div className="p-2 bg-blue-600 rounded-lg"><Linkedin size={18} className="text-white" /></div>
// // //                 <div><p className="text-xs text-gray-500 font-medium">LinkedIn</p><p className="text-sm font-semibold text-blue-700">View Profile →</p></div>
// // //               </a>
// // //             )}
// // //             {isEditing && (
// // //               <div><label className="text-sm font-semibold text-gray-700 block mb-2">LinkedIn URL</label><input type="text" value={formData.linkedinUrl || ''} onChange={(e) => handleChange('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm" /></div>
// // //             )}
// // //           </SectionCard>

// // //           <SectionCard title="Languages" icon={Globe}>
// // //             <div className="space-y-2">{formData.languages?.map((l, i) => <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"><div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">{l.charAt(0)}</div><span className="font-semibold text-gray-800">{l}</span></div>)}</div>
// // //           </SectionCard>

// // //           <SectionCard title="Documents & Media" icon={Upload} className="lg:col-span-1">
// // //             <div className="space-y-3">
// // //               <FileUploadBox
// // //                 title="Resume"
// // //                 icon={FileText}
// // //                 file={files.resume}
// // //                 field="resume"
// // //                 inputRef={resumeInputRef}
// // //                 accept=".pdf,.doc,.docx"
// // //                 iconColor="#dc2626"
// // //               />
// // //               <FileUploadBox
// // //                 title="Portfolio"
// // //                 icon={FileText}
// // //                 file={files.portfolio}
// // //                 field="portfolio"
// // //                 inputRef={portfolioInputRef}
// // //                 accept=".pdf,.ppt,.pptx"
// // //                 iconColor="#16a34a"
// // //               />
// // //               <FileUploadBox
// // //                 title="Video"
// // //                 icon={Video}
// // //                 file={files.video}
// // //                 field="video"
// // //                 inputRef={videoInputRef}
// // //                 accept="video/*"
// // //                 iconColor="#9333ea"
// // //               />
// // //             </div>
// // //           </SectionCard>

// // //           <SectionCard title="Professional" icon={Briefcase} className="lg:col-span-2">
// // //             <div className="grid grid-cols-2 gap-4">
// // //               {['companyName', 'yearsOfExperience', 'hourlyRate', 'mentoringStyle'].map(f => (
// // //                 <div key={f} className="space-y-2">
// // //                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
// // //                   {isEditing ? <input type="text" value={formData[f] || ''} onChange={(e) => handleChange(f, e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl" /> : <p className="font-semibold px-4 py-3 bg-gray-50 rounded-xl">{formData[f] || 'N/A'}</p>}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </SectionCard>

// // //           <SectionCard title="Education" icon={GraduationCap}>
// // //             {['highestDegree', 'fieldOfStudy', 'schoolName'].map(f => (
// // //               <div key={f} className="space-y-2 mb-4">
// // //                 <label className="text-xs font-bold text-gray-500 uppercase">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
// // //                 {isEditing ? <input type="text" value={formData[f] || ''} onChange={(e) => handleChange(f, e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl" /> : <p className="font-semibold px-4 py-3 bg-gray-50 rounded-xl">{formData[f] || 'N/A'}</p>}
// // //               </div>
// // //             ))}
// // //           </SectionCard>
// // //         </div>

// // //         <div className="mt-6">
// // //           <AvailabilitySection />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MentorProfile;



// // //   import React, { useState, useEffect, useRef } from 'react';
// // // import { 
// // //   Mail, Phone, MapPin, Calendar, Globe, Briefcase, GraduationCap, 
// // //   Edit2, Save, X, CheckCircle, XCircle, Loader, BookOpen, FileText, 
// // //   Video, Linkedin, Target, Star, CloudUpload, File, Trash2, Plus, 
// // //   Clock, DollarSign, Award, Sparkles, TrendingUp, Users, MessageSquare,
// // //   Building2, Code, Zap, Heart
// // // } from 'lucide-react';
// // // import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";


// // // const GlobalStyles = () => (
// // //   <style>{`
// // //     @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

// // //     * {
// // //       margin: 0;
// // //       padding: 0;
// // //       box-sizing: border-box;
// // //       font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
// // //     }

// // //     body {
// // //       background: #F8FAFC;
// // //       overflow-x: hidden;
// // //     }

// // //     .heading-font {
// // //       font-family: 'Manrope', sans-serif;
// // //       font-weight: 700;
// // //       letter-spacing: -0.03em;
// // //     }

// // //     .custom-input {
// // //       transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
// // //       border: 2px solid #E2E8F0;
// // //       background: #FFFFFF;
// // //       font-size: 15px;
// // //       color: #1E293B;
// // //     }

// // //     .custom-input:focus {
// // //       outline: none !important;
// // //       border-color: #3B82F6 !important;
// // //       box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
// // //       background: #FFFFFF;
// // //     }

// // //     .custom-input::placeholder {
// // //       color: #94A3B8;
// // //     }

// // //     @media (max-width: 640px) {
// // //       .custom-input {
// // //         font-size: 16px;
// // //       }
// // //     }

// // //     .card-shadow {
// // //       box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
// // //     }

// // //     .card-shadow-hover {
// // //       transition: all 0.3s ease;
// // //     }

// // //     .card-shadow-hover:hover {
// // //       box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
// // //       transform: translateY(-2px);
// // //     }

// // //     .gradient-blue {
// // //       background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
// // //     }

// // //     .fade-in {
// // //       animation: fadeIn 0.5s ease-out;
// // //     }

// // //     @keyframes fadeIn {
// // //       from { opacity: 0; transform: translateY(10px); }
// // //       to { opacity: 1; transform: translateY(0); }
// // //     }

// // //     .skill-tag {
// // //       transition: all 0.2s ease;
// // //       cursor: default;
// // //     }

// // //     .skill-tag:hover {
// // //       transform: translateY(-2px);
// // //       box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
// // //     }

// // //     /* Scrollbar Styling */
// // //     ::-webkit-scrollbar {
// // //       width: 8px;
// // //       height: 8px;
// // //     }

// // //     ::-webkit-scrollbar-track {
// // //       background: #F1F5F9;
// // //     }

// // //     ::-webkit-scrollbar-thumb {
// // //       background: #CBD5E1;
// // //       border-radius: 4px;
// // //     }

// // //     ::-webkit-scrollbar-thumb:hover {
// // //       background: #94A3B8;
// // //     }
// // //   `}</style>
// // // );

// // // const MentorProfile = () => {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     availability: [
// // //       { day: 'Monday', slots: [] },
// // //       { day: 'Tuesday', slots: [] },
// // //       { day: 'Wednesday', slots: [] },
// // //       { day: 'Thursday', slots: [] },
// // //       { day: 'Friday', slots: [] },
// // //       { day: 'Saturday', slots: [] },
// // //       { day: 'Sunday', slots: [] }
// // //     ]
// // //   });
// // //   const [email, setEmail] = useState("");
// // //   const [files, setFiles] = useState({
// // //     resume: null,
// // //     portfolio: null,
// // //     video: null
// // //   });

// // //   const resumeInputRef = useRef(null);
// // //   const portfolioInputRef = useRef(null);
// // //   const videoInputRef = useRef(null);

// // //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// // //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("userData");
// // //     if (userData) {
// // //       try {
// // //         const parsedData = JSON.parse(userData);
// // //         setEmail(parsedData.email);
// // //       } catch (error) {
// // //         console.error("Error parsing user data:", error);
// // //       }
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (email) {
// // //       getMentorDetails(email);
// // //     }
// // //   }, [email, getMentorDetails]);

// // //   useEffect(() => {
// // //     if (data?.data) {
// // //       setFormData({
// // //         ...data.data,
// // //         availability: data.data.availability || [
// // //           { day: 'Monday', slots: [] },
// // //           { day: 'Tuesday', slots: [] },
// // //           { day: 'Wednesday', slots: [] },
// // //           { day: 'Thursday', slots: [] },
// // //           { day: 'Friday', slots: [] },
// // //           { day: 'Saturday', slots: [] },
// // //           { day: 'Sunday', slots: [] }
// // //         ]
// // //       });
// // //     }
// // //   }, [data]);

// // //   const handleChange = (field, value) => {
// // //     setFormData(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleFileChange = (field, event) => {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       setFiles(prev => ({ ...prev, [field]: file }));
// // //     }
// // //   };

// // //   const handleRemoveFile = (field) => {
// // //     setFiles(prev => ({ ...prev, [field]: null }));
// // //     if (field === 'resume' && resumeInputRef.current) resumeInputRef.current.value = '';
// // //     if (field === 'portfolio' && portfolioInputRef.current) portfolioInputRef.current.value = '';
// // //     if (field === 'video' && videoInputRef.current) videoInputRef.current.value = '';
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const dataToSend = { email, ...formData };
// // //       await updateMentorDetails(dataToSend).unwrap();
// // //       await getMentorDetails(email);

// // //       setIsEditing(false);
// // //       setFiles({ resume: null, portfolio: null, video: null });
// // //       alert('Profile updated successfully!');
// // //     } catch (err) {
// // //       console.error('Failed to update profile:', err);
// // //       alert('Failed to update profile. Please try again.');
// // //     }
// // //   };

// // //   const handleCancel = () => {
// // //     if (data?.data) setFormData(data.data);
// // //     setFiles({ resume: null, portfolio: null, video: null });
// // //     setIsEditing(false);
// // //   };

// // //   const handleAddTimeSlot = (dayIndex) => {
// // //     const newSlot = { startTime: '09:00', endTime: '10:00', isBooked: false };
// // //     setFormData(prev => {
// // //       const currentAvailability = prev.availability?.length > 0 ? [...prev.availability] : [
// // //         { day: 'Monday', slots: [] },
// // //         { day: 'Tuesday', slots: [] },
// // //         { day: 'Wednesday', slots: [] },
// // //         { day: 'Thursday', slots: [] },
// // //         { day: 'Friday', slots: [] },
// // //         { day: 'Saturday', slots: [] },
// // //         { day: 'Sunday', slots: [] }
// // //       ];
// // //       const newAvailability = currentAvailability.map(day => ({ ...day, slots: day.slots ? [...day.slots] : [] }));
// // //       newAvailability[dayIndex].slots.push(newSlot);
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex].slots = newAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex);
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   const handleUpdateTimeSlot = (dayIndex, slotIndex, field, value) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex].slots[slotIndex][field] = value;
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// // //         <GlobalStyles />
// // //         <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
// // //           <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
// // //           <p className="text-xl font-semibold text-slate-800">Loading your profile...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !formData || Object.keys(formData).length === 0) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// // //         <GlobalStyles />
// // //         <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
// // //           <XCircle className="w-20 h-20 text-blue-600 mx-auto mb-4" />
// // //           <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load profile</h2>
// // //           <p className="text-slate-600">Please try refreshing the page</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <GlobalStyles />

// // //       {/* Top Navigation Bar */}
// // //       <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-3">

// // //               <div>
// // //                 <h1 className="heading-font text-xl text-slate-900">Mentor Profile</h1>
// // //                 <p className="text-xs text-slate-500">Manage your mentorship details</p>
// // //               </div>
// // //             </div>

// // //             {!isEditing ? (
// // //               <button
// // //                 onClick={() => setIsEditing(true)}
// // //                 className="gradient-blue text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
// // //               >
// // //                 <Edit2 size={18} />
// // //                 <span className="hidden sm:inline">Edit Profile</span>
// // //               </button>
// // //             ) : (
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={handleSave}
// // //                   disabled={isUpdating}
// // //                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
// // //                 >
// // //                   {isUpdating ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
// // //                   <span className="hidden sm:inline">{isUpdating ? 'Saving...' : 'Save'}</span>
// // //                 </button>
// // //                 <button
// // //                   onClick={handleCancel}
// // //                   disabled={isUpdating}
// // //                   className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-300 transition-all disabled:opacity-50"
// // //                 >
// // //                   <X size={18} />
// // //                   <span className="hidden sm:inline">Cancel</span>
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // //         {/* Profile Header Section */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
// // //           {/* Left: Profile Card */}
// // //           <div className="lg:col-span-4">
// // //             <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //               {/* Profile Avatar */}
// // //               <div className="relative mb-6">
// // //                 <div className="w-32 h-32 mx-auto gradient-blue rounded-2xl flex items-center justify-center text-white text-5xl font-bold heading-font shadow-xl relative">
// // //                   {formData.fullName?.charAt(0) || 'M'}
// // //                   {formData.status === 'approved' && (
// // //                     <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg flex items-center gap-1">
// // //                       <CheckCircle size={16} />
// // //                       <Sparkles size={14} />
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Name & Role */}
// // //               <div className="text-center mb-6">
// // //                 {isEditing ? (
// // //                   <>
// // //                     <input
// // //                       type="text"
// // //                       value={formData.fullName || ''}
// // //                       onChange={(e) => handleChange('fullName', e.target.value)}
// // //                       className="custom-input w-full px-4 py-2 rounded-lg mb-3 text-center heading-font text-xl font-bold"
// // //                       placeholder="Full Name"
// // //                     />
// // //                     <input
// // //                       type="text"
// // //                       value={formData.currentRole || ''}
// // //                       onChange={(e) => handleChange('currentRole', e.target.value)}
// // //                       className="custom-input w-full px-4 py-2 rounded-lg text-center"
// // //                       placeholder="Current Role"
// // //                     />
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <h2 className="heading-font text-2xl text-slate-900 mb-2">{formData.fullName}</h2>
// // //                     <p className="text-slate-600 font-medium">{formData.currentRole || 'N/A'}</p>
// // //                     {formData.companyName && (
// // //                       <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
// // //                         <Building2 size={14} />
// // //                         {formData.companyName}
// // //                       </div>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </div>

// // //               {/* Quick Stats */}
// // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // //                 <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
// // //                   <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
// // //                   <p className="text-2xl font-bold text-blue-600 heading-font">{formData.yearsOfExperience || '0'}</p>
// // //                   <p className="text-xs text-blue-700 font-medium">Years Exp.</p>
// // //                 </div>
// // //                 {formData.hourlyRate && (
// // //                   <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
// // //                     <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
// // //                     <p className="text-2xl font-bold text-blue-600 heading-font">${formData.hourlyRate}</p>
// // //                     <p className="text-xs text-blue-700 font-medium">Per Hour</p>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Contact Info */}
// // //               <div className="space-y-3 mb-6">
// // //                 <div className="flex items-center gap-3 text-sm">
// // //                   <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
// // //                     <Mail className="w-4 h-4 text-slate-600" />
// // //                   </div>
// // //                   <span className="text-slate-700 truncate">{formData.email || 'N/A'}</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-3 text-sm">
// // //                   <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
// // //                     <Phone className="w-4 h-4 text-slate-600" />
// // //                   </div>
// // //                   <span className="text-slate-700">{formData.phone || 'N/A'}</span>
// // //                 </div>
// // //                 <div className="flex items-center gap-3 text-sm">
// // //                   <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
// // //                     <MapPin className="w-4 h-4 text-slate-600" />
// // //                   </div>
// // //                   <span className="text-slate-700">{formData.location || 'N/A'}</span>
// // //                 </div>
// // //               </div>

// // //               {/* LinkedIn */}
// // //               {isEditing ? (
// // //                 <div>
// // //                   <label className="text-xs font-semibold text-slate-700 block mb-2">LinkedIn URL</label>
// // //                   <input
// // //                     type="text"
// // //                     value={formData.linkedinUrl || ''}
// // //                     onChange={(e) => handleChange('linkedinUrl', e.target.value)}
// // //                     className="custom-input w-full px-4 py-2 rounded-lg"
// // //                     placeholder="https://linkedin.com/in/username"
// // //                   />
// // //                 </div>
// // //               ) : formData.linkedinUrl ? (
// // //                 <a
// // //                   href={formData.linkedinUrl}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
// // //                 >
// // //                   <Linkedin size={18} />
// // //                   View LinkedIn
// // //                 </a>
// // //               ) : null}
// // //             </div>
// // //           </div>

// // //           {/* Right: Main Content */}
// // //           <div className="lg:col-span-8 space-y-6">
// // //             {/* Professional Bio */}
// // //             <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //               <div className="flex items-center gap-3 mb-4">
// // //                 <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //                   <BookOpen className="w-5 h-5 text-white" />
// // //                 </div>
// // //                 <h3 className="heading-font text-xl text-slate-900">Professional Bio</h3>
// // //               </div>
// // //               {isEditing ? (
// // //                 <textarea
// // //                   value={formData.whyMentor || ''}
// // //                   onChange={(e) => handleChange('whyMentor', e.target.value)}
// // //                   className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                   rows={6}
// // //                   placeholder="Share your journey, expertise, and what drives you as a mentor..."
// // //                 />
// // //               ) : (
// // //                 <p className="text-slate-600 leading-relaxed">{formData.whyMentor || 'No bio added yet.'}</p>
// // //               )}
// // //             </div>

// // //             {/* Skills Grid */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {/* Core Skills */}
// // //               <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //                 <div className="flex items-center gap-3 mb-4">
// // //                   <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //                     <Code className="w-5 h-5 text-white" />
// // //                   </div>
// // //                   <h3 className="heading-font text-lg text-slate-900">Core Skills</h3>
// // //                 </div>
// // //                 {isEditing ? (
// // //                   <textarea
// // //                     value={formData.currentSkills || ''}
// // //                     onChange={(e) => handleChange('currentSkills', e.target.value)}
// // //                     className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                     rows={5}
// // //                     placeholder="React, Node.js, Python..."
// // //                   />
// // //                 ) : (
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {formData.currentSkills?.split(',').map((skill, idx) => (
// // //                       <span key={idx} className="skill-tag px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
// // //                         {skill.trim()}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Expertise Areas */}
// // //               <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //                 <div className="flex items-center gap-3 mb-4">
// // //                   <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //                     <Target className="w-5 h-5 text-white" />
// // //                   </div>
// // //                   <h3 className="heading-font text-lg text-slate-900">Expertise</h3>
// // //                 </div>
// // //                 {isEditing ? (
// // //                   <textarea
// // //                     value={formData.areasOfInterest || ''}
// // //                     onChange={(e) => handleChange('areasOfInterest', e.target.value)}
// // //                     className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                     rows={5}
// // //                     placeholder="AI/ML, Cloud, DevOps..."
// // //                   />
// // //                 ) : (
// // //                   <div className="flex flex-wrap gap-2">
// // //                     {formData.areasOfInterest?.split(',').map((area, idx) => (
// // //                       <span key={idx} className="skill-tag px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200">
// // //                         {area.trim()}
// // //                       </span>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Professional Details Section */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
// // //           {[
// // //             { key: 'companyName', label: 'Company', icon: Building2 },
// // //             { key: 'yearsOfExperience', label: 'Experience (Years)', icon: TrendingUp },
// // //             { key: 'hourlyRate', label: 'Hourly Rate ($)', icon: DollarSign },
// // //             { key: 'mentoringStyle', label: 'Mentoring Style', icon: Heart }
// // //           ].map((field) => (
// // //             <div key={field.key} className="bg-white rounded-xl shadow-lg p-5 card-shadow-hover fade-in border border-slate-100">
// // //               <div className="flex items-center gap-3 mb-3">
// // //                 <div className="w-9 h-9 gradient-blue rounded-lg flex items-center justify-center">
// // //                   <field.icon className="w-5 h-5 text-white" />
// // //                 </div>
// // //                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{field.label}</p>
// // //               </div>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData[field.key] || ''}
// // //                   onChange={(e) => handleChange(field.key, e.target.value)}
// // //                   className="custom-input w-full px-3 py-2 rounded-lg"
// // //                   placeholder={`Enter ${field.label.toLowerCase()}`}
// // //                 />
// // //               ) : (
// // //                 <p className="text-lg font-bold text-slate-900 heading-font">{formData[field.key] || 'N/A'}</p>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Education & Languages Section */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //           {/* Education */}
// // //           <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //             <div className="flex items-center gap-3 mb-5">
// // //               <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //                 <GraduationCap className="w-5 h-5 text-white" />
// // //               </div>
// // //               <h3 className="heading-font text-xl text-slate-900">Education</h3>
// // //             </div>
// // //             <div className="space-y-4">
// // //               {[
// // //                 { key: 'highestDegree', label: 'Degree', icon: Award },
// // //                 { key: 'fieldOfStudy', label: 'Field of Study', icon: BookOpen },
// // //                 { key: 'schoolName', label: 'Institution', icon: Building2 }
// // //               ].map((field) => (
// // //                 <div key={field.key}>
// // //                   <div className="flex items-center gap-2 mb-2">
// // //                     <field.icon className="w-4 h-4 text-blue-600" />
// // //                     <label className="text-xs font-bold text-slate-500 uppercase">{field.label}</label>
// // //                   </div>
// // //                   {isEditing ? (
// // //                     <input
// // //                       type="text"
// // //                       value={formData[field.key] || ''}
// // //                       onChange={(e) => handleChange(field.key, e.target.value)}
// // //                       className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                       placeholder={`Enter ${field.label.toLowerCase()}`}
// // //                     />
// // //                   ) : (
// // //                     <p className="text-slate-800 font-semibold bg-slate-50 px-4 py-2.5 rounded-lg">
// // //                       {formData[field.key] || 'Not specified'}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Languages */}
// // //           <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //             <div className="flex items-center gap-3 mb-5">
// // //               <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //                 <Globe className="w-5 h-5 text-white" />
// // //               </div>
// // //               <h3 className="heading-font text-xl text-slate-900">Languages</h3>
// // //             </div>
// // //             {formData.languages && formData.languages.length > 0 ? (
// // //               <div className="space-y-3">
// // //                 {formData.languages.map((lang, idx) => (
// // //                   <div key={idx} className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
// // //                     <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center text-white font-bold text-lg heading-font">
// // //                       {lang.charAt(0)}
// // //                     </div>
// // //                     <span className="font-semibold text-slate-800">{lang}</span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <p className="text-center text-slate-400 py-8">No languages added</p>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Documents Section */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in mb-6">
// // //           <div className="flex items-center gap-3 mb-5">
// // //             <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //               <FileText className="w-5 h-5 text-white" />
// // //             </div>
// // //             <h3 className="heading-font text-xl text-slate-900">Documents & Media</h3>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //             {[
// // //               { field: 'resume', title: 'Resume / CV', icon: FileText, accept: '.pdf,.doc,.docx', ref: resumeInputRef },
// // //               { field: 'portfolio', title: 'Portfolio', icon: Award, accept: '.pdf,.ppt,.pptx', ref: portfolioInputRef },
// // //               { field: 'video', title: 'Video Intro', icon: Video, accept: 'video/*', ref: videoInputRef }
// // //             ].map((doc) => (
// // //               <div key={doc.field} className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
// // //                 <div className="flex items-center gap-2 mb-3">
// // //                   <doc.icon className="w-5 h-5 text-blue-600" />
// // //                   <span className="font-bold text-sm text-slate-800">{doc.title}</span>
// // //                 </div>

// // //                 {isEditing ? (
// // //                   <div className="space-y-2">
// // //                     <input
// // //                       ref={doc.ref}
// // //                       type="file"
// // //                       accept={doc.accept}
// // //                       onChange={(e) => handleFileChange(doc.field, e)}
// // //                       className="hidden"
// // //                       id={`file-${doc.field}`}
// // //                     />

// // //                     {!files[doc.field] ? (
// // //                       <label
// // //                         htmlFor={`file-${doc.field}`}
// // //                         className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
// // //                       >
// // //                         <CloudUpload className="w-8 h-8 text-slate-400 mb-2" />
// // //                         <span className="text-xs text-slate-500 text-center">Click to upload</span>
// // //                       </label>
// // //                     ) : (
// // //                       <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
// // //                         <span className="text-sm text-slate-700 truncate flex-1">{files[doc.field].name}</span>
// // //                         <button onClick={() => handleRemoveFile(doc.field)} className="text-blue-600 hover:text-blue-700">
// // //                           <Trash2 size={16} />
// // //                         </button>
// // //                       </div>
// // //                     )}

// // //                     <input
// // //                       type="text"
// // //                       value={formData[`${doc.field}Link`] || ''}
// // //                       onChange={(e) => handleChange(`${doc.field}Link`, e.target.value)}
// // //                       placeholder="Or paste link"
// // //                       className="custom-input w-full px-3 py-2 rounded-lg text-sm"
// // //                     />
// // //                   </div>
// // //                 ) : (
// // //                   <div>
// // //                     {formData[`${doc.field}Link`] ? (
// // //                       <a href={formData[`${doc.field}Link`]} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block truncate">
// // //                         View {doc.title}
// // //                       </a>
// // //                     ) : (
// // //                       <p className="text-sm text-slate-400">Not uploaded</p>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Availability Section */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 card-shadow-hover fade-in">
// // //           <div className="flex items-center gap-3 mb-5">
// // //             <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
// // //               <Calendar className="w-5 h-5 text-white" />
// // //             </div>
// // //             <h3 className="heading-font text-xl text-slate-900">Weekly Availability</h3>
// // //           </div>

// // //           <p className="text-sm text-slate-600 mb-5">Set your available time slots for mentee sessions</p>

// // //           {formData.availability && formData.availability.length > 0 ? (
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// // //               {formData.availability.map((day, dayIdx) => (
// // //                 <div key={day.day} className="border-2 border-blue-100 bg-blue-50 rounded-xl p-4">
// // //                   <div className="flex items-center justify-between mb-3">
// // //                     <div className="flex items-center gap-2">
// // //                       <div className="w-2 h-2 rounded-full bg-blue-600" />
// // //                       <h4 className="font-bold text-sm text-slate-900">{day.day}</h4>
// // //                     </div>
// // //                     {isEditing && (
// // //                       <button
// // //                         onClick={() => handleAddTimeSlot(dayIdx)}
// // //                         className="gradient-blue text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
// // //                       >
// // //                         <Plus size={12} />
// // //                         Add
// // //                       </button>
// // //                     )}
// // //                   </div>

// // //                   {!day.slots || day.slots.length === 0 ? (
// // //                     <p className="text-xs text-slate-400 text-center py-3">No slots</p>
// // //                   ) : (
// // //                     <div className="space-y-2">
// // //                       {day.slots.map((slot, slotIdx) => (
// // //                         <div key={slotIdx} className="bg-white rounded-lg p-2 flex items-center gap-2 border border-blue-100">
// // //                           {isEditing ? (
// // //                             <>
// // //                               <input
// // //                                 type="time"
// // //                                 value={slot.startTime}
// // //                                 onChange={(e) => handleUpdateTimeSlot(dayIdx, slotIdx, 'startTime', e.target.value)}
// // //                                 className="flex-1 px-2 py-1 border border-slate-200 rounded text-xs"
// // //                               />
// // //                               <span className="text-slate-400">-</span>
// // //                               <input
// // //                                 type="time"
// // //                                 value={slot.endTime}
// // //                                 onChange={(e) => handleUpdateTimeSlot(dayIdx, slotIdx, 'endTime', e.target.value)}
// // //                                 className="flex-1 px-2 py-1 border border-slate-200 rounded text-xs"
// // //                               />
// // //                               <button onClick={() => handleRemoveTimeSlot(dayIdx, slotIdx)} className="text-blue-600">
// // //                                 <X size={14} />
// // //                               </button>
// // //                             </>
// // //                           ) : (
// // //                             <div className="flex items-center gap-2 w-full">
// // //                               <Clock size={12} className="text-blue-600" />
// // //                               <span className="text-xs font-semibold text-slate-700">{slot.startTime} - {slot.endTime}</span>
// // //                             </div>
// // //                           )}
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <p className="text-center text-slate-400 py-8">No availability set</p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MentorProfile;



// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// // // import { showToast } from '../../../utils/Toastprovider';

// // // const GlobalStyles = () => (
// // //   <style>{`
// // //     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// // //     * {
// // //       margin: 0;
// // //       padding: 0;
// // //       box-sizing: border-box;
// // //       font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// // //     }

// // //     body {
// // //       background: #FAFBFC;
// // //       overflow-x: hidden;
// // //     }

// // //     .custom-input {
// // //       transition: all 0.2s ease;
// // //       border: 1px solid #D1D5DB;
// // //       background: #FFFFFF;
// // //       font-size: 14px;
// // //       color: #111827;
// // //     }

// // //     .custom-input:focus {
// // //       outline: none;
// // //       border-color: #2563EB;
// // //       box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
// // //     }

// // //     .custom-input::placeholder {
// // //       color: #9CA3AF;
// // //     }

// // //     @media (max-width: 640px) {
// // //       .custom-input {
// // //         font-size: 16px;
// // //       }
// // //     }
// // //   `}</style>
// // // );

// // // const MentorProfile = () => {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     availability: [
// // //       { day: 'Monday', slots: [] },
// // //       { day: 'Tuesday', slots: [] },
// // //       { day: 'Wednesday', slots: [] },
// // //       { day: 'Thursday', slots: [] },
// // //       { day: 'Friday', slots: [] },
// // //       { day: 'Saturday', slots: [] },
// // //       { day: 'Sunday', slots: [] }
// // //     ]
// // //   });
// // //   const [email, setEmail] = useState("");
// // //   const [files, setFiles] = useState({
// // //     resume: null,
// // //     portfolio: null,
// // //     video: null
// // //   });

// // //   const resumeInputRef = useRef(null);
// // //   const portfolioInputRef = useRef(null);
// // //   const videoInputRef = useRef(null);

// // //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// // //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("userData");
// // //     if (userData) {
// // //       try {
// // //         const parsedData = JSON.parse(userData);
// // //         setEmail(parsedData.email);
// // //       } catch (error) {
// // //         console.error("Error parsing user data:", error);
// // //       }
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (email) {
// // //       getMentorDetails(email);
// // //     }
// // //   }, [email, getMentorDetails]);

// // //   useEffect(() => {
// // //     if (data?.data) {
// // //       const initialAvailability = [
// // //         { day: 'Monday', slots: [] },
// // //         { day: 'Tuesday', slots: [] },
// // //         { day: 'Wednesday', slots: [] },
// // //         { day: 'Thursday', slots: [] },
// // //         { day: 'Friday', slots: [] },
// // //         { day: 'Saturday', slots: [] },
// // //         { day: 'Sunday', slots: [] }
// // //       ];

// // //       const mergedAvailability = initialAvailability.map(defaultDay => {
// // //         const existingDay = data.data.availability?.find(d => d.day === defaultDay.day);
// // //         return existingDay ? { ...defaultDay, slots: existingDay.slots || [] } : defaultDay;
// // //       });

// // //       setFormData({
// // //         ...data.data,
// // //         availability: mergedAvailability
// // //       });
// // //     }
// // //   }, [data]);

// // //   const handleChange = (field, value) => {
// // //     setFormData(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const handleFileChange = (field, event) => {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       setFiles(prev => ({ ...prev, [field]: file }));
// // //     }
// // //   };

// // //   const handleRemoveFile = (field) => {
// // //     setFiles(prev => ({ ...prev, [field]: null }));
// // //     if (field === 'resume' && resumeInputRef.current) resumeInputRef.current.value = '';
// // //     if (field === 'portfolio' && portfolioInputRef.current) portfolioInputRef.current.value = '';
// // //     if (field === 'video' && videoInputRef.current) videoInputRef.current.value = '';
// // //   };

// // //   const handleSave = async () => {
// // //     try {
// // //       const dataToSend = { email, ...formData };
// // //       await updateMentorDetails(dataToSend).unwrap();
// // //       await getMentorDetails(email);

// // //       setIsEditing(false);
// // //       setFiles({ resume: null, portfolio: null, video: null });
// // //       showToast('Profile updated successfully!', 'success');
// // //     } catch (err) {
// // //       console.error('Failed to update profile:', err);
// // //       showToast('Failed to update profile. Please try again.');
// // //     }
// // //   };

// // //   const handleCancel = () => {
// // //     if (data?.data) {
// // //       const initialAvailability = [
// // //         { day: 'Monday', slots: [] },
// // //         { day: 'Tuesday', slots: [] },
// // //         { day: 'Wednesday', slots: [] },
// // //         { day: 'Thursday', slots: [] },
// // //         { day: 'Friday', slots: [] },
// // //         { day: 'Saturday', slots: [] },
// // //         { day: 'Sunday', slots: [] }
// // //       ];

// // //       const mergedAvailability = initialAvailability.map(defaultDay => {
// // //         const existingDay = data.data.availability?.find(d => d.day === defaultDay.day);
// // //         return existingDay ? { ...defaultDay, slots: existingDay.slots || [] } : defaultDay;
// // //       });

// // //       setFormData({
// // //         ...data.data,
// // //         availability: mergedAvailability
// // //       });
// // //     }
// // //     setFiles({ resume: null, portfolio: null, video: null });
// // //     setIsEditing(false);
// // //   };

// // //   const handleAddTimeSlot = (dayIndex) => {
// // //     const newSlot = { startTime: '09:00', endTime: '10:00', isBooked: false };
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex] = {
// // //         ...newAvailability[dayIndex],
// // //         slots: [...(newAvailability[dayIndex].slots || []), newSlot]
// // //       };
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex] = {
// // //         ...newAvailability[dayIndex],
// // //         slots: newAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex)
// // //       };
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   const handleUpdateTimeSlot = (dayIndex, slotIndex, field, value) => {
// // //     setFormData(prev => {
// // //       const newAvailability = [...prev.availability];
// // //       newAvailability[dayIndex].slots[slotIndex][field] = value;
// // //       return { ...prev, availability: newAvailability };
// // //     });
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// // //         <GlobalStyles />
// // //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// // //           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// // //           <p className="text-lg font-medium text-gray-900">Loading profile...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error || !formData || Object.keys(formData).length === 0) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// // //         <GlobalStyles />
// // //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
// // //           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //             <span className="text-red-600 text-2xl">✕</span>
// // //           </div>
// // //           <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load profile</h2>
// // //           <p className="text-gray-600">Please try refreshing the page</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <GlobalStyles />

// // //       {/* Header */}
// // //       <div className="bg-white border-b border-gray-200">
// // //         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // //           <div className="flex items-center justify-between">
// // //             <div>
// // //               <h1 className="text-2xl font-semibold text-gray-900">Mentor Profile</h1>
// // //               <p className="text-sm text-gray-600 mt-1">Manage your professional information</p>
// // //             </div>

// // //             {!isEditing ? (
// // //               <button
// // //                 onClick={() => setIsEditing(true)}
// // //                 className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
// // //               >
// // //                 Edit Profile
// // //               </button>
// // //             ) : (
// // //               <div className="flex gap-3">
// // //                 <button
// // //                   onClick={handleSave}
// // //                   disabled={isUpdating}
// // //                   className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// // //                 >
// // //                   {isUpdating ? 'Saving...' : 'Save Changes'}
// // //                 </button>
// // //                 <button
// // //                   onClick={handleCancel}
// // //                   disabled={isUpdating}
// // //                   className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {/* Basic Information */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //           <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.fullName || ''}
// // //                   onChange={(e) => handleChange('fullName', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="Enter your full name"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.fullName || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
// // //               <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.email || 'Not provided'}</p>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.phone || ''}
// // //                   onChange={(e) => handleChange('phone', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="Enter phone number"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.phone || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.location || ''}
// // //                   onChange={(e) => handleChange('location', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="City, Country"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.location || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.currentRole || ''}
// // //                   onChange={(e) => handleChange('currentRole', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="e.g., Senior Software Engineer"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.currentRole || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.companyName || ''}
// // //                   onChange={(e) => handleChange('companyName', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="Company name"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.companyName || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="number"
// // //                   value={formData.yearsOfExperience || ''}
// // //                   onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="0"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.yearsOfExperience || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="number"
// // //                   value={formData.hourlyRate || ''}
// // //                   onChange={(e) => handleChange('hourlyRate', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="0"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">${formData.hourlyRate || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div className="md:col-span-2">
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.linkedinUrl || ''}
// // //                   onChange={(e) => handleChange('linkedinUrl', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="https://linkedin.com/in/username"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.linkedinUrl || 'Not provided'}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Professional Background */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //           <h2 className="text-lg font-semibold text-gray-900 mb-6">Professional Background</h2>

// // //           <div className="space-y-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
// // //               {isEditing ? (
// // //                 <textarea
// // //                   value={formData.whyMentor || ''}
// // //                   onChange={(e) => handleChange('whyMentor', e.target.value)}
// // //                   className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                   rows={4}
// // //                   placeholder="Share your professional journey and what motivates you to mentor..."
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-700 px-4 py-3 bg-gray-50 rounded-lg leading-relaxed">{formData.whyMentor || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Core Skills</label>
// // //               {isEditing ? (
// // //                 <textarea
// // //                   value={formData.currentSkills || ''}
// // //                   onChange={(e) => handleChange('currentSkills', e.target.value)}
// // //                   className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                   rows={3}
// // //                   placeholder="e.g., React, Node.js, Python, Machine Learning (comma-separated)"
// // //                 />
// // //               ) : (
// // //                 <div className="px-4 py-3 bg-gray-50 rounded-lg">
// // //                   {formData.currentSkills ? (
// // //                     <div className="flex flex-wrap gap-2">
// // //                       {formData.currentSkills.split(',').map((skill, idx) => (
// // //                         <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
// // //                           {skill.trim()}
// // //                         </span>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <p className="text-gray-500">Not provided</p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
// // //               {isEditing ? (
// // //                 <textarea
// // //                   value={formData.areasOfInterest || ''}
// // //                   onChange={(e) => handleChange('areasOfInterest', e.target.value)}
// // //                   className="custom-input w-full px-4 py-3 rounded-lg resize-none"
// // //                   rows={3}
// // //                   placeholder="e.g., Web Development, Cloud Architecture, DevOps (comma-separated)"
// // //                 />
// // //               ) : (
// // //                 <div className="px-4 py-3 bg-gray-50 rounded-lg">
// // //                   {formData.areasOfInterest ? (
// // //                     <div className="flex flex-wrap gap-2">
// // //                       {formData.areasOfInterest.split(',').map((area, idx) => (
// // //                         <span key={idx} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
// // //                           {area.trim()}
// // //                         </span>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <p className="text-gray-500">Not provided</p>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Mentoring Style</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.mentoringStyle || ''}
// // //                   onChange={(e) => handleChange('mentoringStyle', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="e.g., Collaborative, Goal-oriented, Hands-on"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.mentoringStyle || 'Not provided'}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Education */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //           <h2 className="text-lg font-semibold text-gray-900 mb-6">Education</h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Highest Degree</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.highestDegree || ''}
// // //                   onChange={(e) => handleChange('highestDegree', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="e.g., Bachelor's, Master's, PhD"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.highestDegree || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.fieldOfStudy || ''}
// // //                   onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="e.g., Computer Science"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.fieldOfStudy || 'Not provided'}</p>
// // //               )}
// // //             </div>

// // //             <div className="md:col-span-2">
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
// // //               {isEditing ? (
// // //                 <input
// // //                   type="text"
// // //                   value={formData.schoolName || ''}
// // //                   onChange={(e) => handleChange('schoolName', e.target.value)}
// // //                   className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                   placeholder="University or College name"
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900 px-4 py-2.5 bg-gray-50 rounded-lg">{formData.schoolName || 'Not provided'}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Documents */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //           <h2 className="text-lg font-semibold text-gray-900 mb-6">Documents & Media</h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //             {[
// // //               { field: 'resume', title: 'Resume / CV', accept: '.pdf,.doc,.docx', ref: resumeInputRef },
// // //               { field: 'portfolio', title: 'Portfolio', accept: '.pdf,.ppt,.pptx', ref: portfolioInputRef },
// // //               { field: 'video', title: 'Video Introduction', accept: 'video/*', ref: videoInputRef }
// // //             ].map((doc) => (
// // //               <div key={doc.field}>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-2">{doc.title}</label>

// // //                 {isEditing ? (
// // //                   <div className="space-y-3">
// // //                     <input
// // //                       ref={doc.ref}
// // //                       type="file"
// // //                       accept={doc.accept}
// // //                       onChange={(e) => handleFileChange(doc.field, e)}
// // //                       className="hidden"
// // //                       id={`file-${doc.field}`}
// // //                     />

// // //                     {!files[doc.field] ? (
// // //                       <label
// // //                         htmlFor={`file-${doc.field}`}
// // //                         className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
// // //                       >
// // //                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
// // //                         </svg>
// // //                         <span className="text-sm text-gray-600">Upload file</span>
// // //                       </label>
// // //                     ) : (
// // //                       <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
// // //                         <span className="text-sm text-gray-700 truncate flex-1">{files[doc.field].name}</span>
// // //                         <button
// // //                           onClick={() => handleRemoveFile(doc.field)}
// // //                           className="ml-2 text-red-600 hover:text-red-700"
// // //                         >
// // //                           Remove
// // //                         </button>
// // //                       </div>
// // //                     )}

// // //                     <input
// // //                       type="text"
// // //                       value={formData[`${doc.field}Link`] || ''}
// // //                       onChange={(e) => handleChange(`${doc.field}Link`, e.target.value)}
// // //                       placeholder="Or paste a link"
// // //                       className="custom-input w-full px-4 py-2.5 rounded-lg"
// // //                     />
// // //                   </div>
// // //                 ) : (
// // //                   <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
// // //                     {formData[`${doc.field}Link`] ? (
// // //                       <a 
// // //                         href={formData[`${doc.field}Link`]} 
// // //                         target="_blank" 
// // //                         rel="noopener noreferrer" 
// // //                         className="text-blue-600 hover:underline text-sm"
// // //                       >
// // //                         View {doc.title}
// // //                       </a>
// // //                     ) : (
// // //                       <p className="text-gray-500 text-sm">Not uploaded</p>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Weekly Availability */}
// // //         <div className="bg-white rounded-lg shadow-sm p-6">
// // //           <h2 className="text-lg font-semibold text-gray-900 mb-2">Weekly Availability</h2>
// // //           <p className="text-sm text-gray-600 mb-6">Set your available time slots for mentoring sessions</p>

// // //           <div className="space-y-4">
// // //             {formData.availability && formData.availability.map((day, dayIdx) => (
// // //               <div key={day.day} className="border border-gray-200 rounded-lg p-4">
// // //                 <div className="flex items-center justify-between mb-3">
// // //                   <h3 className="font-medium text-gray-900">{day.day}</h3>
// // //                   {isEditing && (
// // //                     <button
// // //                       onClick={() => handleAddTimeSlot(dayIdx)}
// // //                       className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
// // //                     >
// // //                       + Add Slot
// // //                     </button>
// // //                   )}
// // //                 </div>

// // //                 {!day.slots || day.slots.length === 0 ? (
// // //                   <p className="text-sm text-gray-500">No time slots available</p>
// // //                 ) : (
// // //                   <div className="space-y-2">
// // //                     {day.slots.map((slot, slotIdx) => (
// // //                       <div key={slotIdx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
// // //                         {isEditing ? (
// // //                           <>
// // //                             <input
// // //                               type="time"
// // //                               value={slot.startTime}
// // //                               onChange={(e) => handleUpdateTimeSlot(dayIdx, slotIdx, 'startTime', e.target.value)}
// // //                               className="custom-input px-3 py-2 rounded-md text-sm"
// // //                             />
// // //                             <span className="text-gray-500">to</span>
// // //                             <input
// // //                               type="time"
// // //                               value={slot.endTime}
// // //                               onChange={(e) => handleUpdateTimeSlot(dayIdx, slotIdx, 'endTime', e.target.value)}
// // //                               className="custom-input px-3 py-2 rounded-md text-sm"
// // //                             />
// // //                             <button
// // //                               onClick={() => handleRemoveTimeSlot(dayIdx, slotIdx)}
// // //                               className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
// // //                             >
// // //                               Remove
// // //                             </button>
// // //                           </>
// // //                         ) : (
// // //                           <span className="text-sm font-medium text-gray-700">
// // //                             {slot.startTime} - {slot.endTime}
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MentorProfile;


// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   MapPin, Star, Heart, Share2,
// //   ChevronDown, ChevronUp, Pencil, Save, X, Plus,
// //   Trash2, Loader2, Upload, Eye, CheckCircle
// // } from 'lucide-react';
// // import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// // import { showToast } from '../../../utils/Toastprovider';

// // const DARK = '#062117';
// // const CYAN = '#0098cc';

// // const formatDate = (ds) => {
// //   if (!ds) return 'N/A';
// //   return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// // };

// // const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// // const TABS = ['Overview', 'Case Studies', 'Mentorship Topics', 'Experience'];

// // // ── Editable field ────────────────────────────────────────────
// // const EditField = ({ value, onChange, placeholder, multiline, type = 'text', className = '' }) => {
// //   const base = `w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-white
// //     focus:outline-none focus:border-[#0098cc] focus:ring-1 focus:ring-[#0098cc]/20
// //     transition-colors placeholder-gray-400 ${className}`;
// //   return multiline
// //     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
// //     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={base} />;
// // };

// // // ── Pill ──────────────────────────────────────────────────────
// // const Pill = ({ label }) => (
// //   <span className="px-2.5 py-1 border border-gray-300 rounded-full text-sm sm:text-base text-gray-700 bg-white">
// //     {label}
// //   </span>
// // );

// // // ── Button variants ───────────────────────────────────────────
// // const BtnPrimary = ({ onClick, disabled, children, className = '' }) => (
// //   <button onClick={onClick} disabled={disabled}
// //     className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm sm:text-base font-semibold
// //       transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
// //     style={{ background: CYAN }}>
// //     {children}
// //   </button>
// // );

// // const BtnOutline = ({ onClick, disabled, children, className = '' }) => (
// //   <button onClick={onClick} disabled={disabled}
// //     className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm sm:text-base font-semibold
// //       border-2 border-white/50 text-white hover:bg-white/10 transition-colors disabled:opacity-50 ${className}`}>
// //     {children}
// //   </button>
// // );

// // // ── Main Component ────────────────────────────────────────────
// // const MentorProfile = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [activeTab, setActiveTab] = useState('Overview');
// //   const [showMore, setShowMore] = useState(false);
// //   const [liked, setLiked] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const [formData, setFormData] = useState({
// //     availability: DAYS.map(d => ({ day: d, slots: [] }))
// //   });
// //   const [email, setEmail] = useState('');
// //   const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

// //   const resumeRef = useRef(null);
// //   const portfolioRef = useRef(null);
// //   const videoRef = useRef(null);

// //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// //   useEffect(() => {
// //     const ud = localStorage.getItem('userData');
// //     if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
// //   }, []);

// //   useEffect(() => { if (email) getMentorDetails(email); }, [email, getMentorDetails]);

// //   useEffect(() => {
// //     if (data?.data) {
// //       const merged = DAYS.map(d => {
// //         const ex = data.data.availability?.find(a => a.day === d);
// //         return { day: d, slots: ex?.slots || [] };
// //       });
// //       setFormData({ ...data.data, availability: merged });
// //     }
// //   }, [data]);

// //   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

// //   const handleSave = async () => {
// //     try {
// //       await updateMentorDetails({ email, ...formData }).unwrap();
// //       await getMentorDetails(email);
// //       setIsEditing(false);
// //       setFiles({ resume: null, portfolio: null, video: null });
// //       showToast('Profile updated successfully!', 'success');
// //     } catch { showToast('Failed to update profile.'); }
// //   };

// //   const handleCancel = () => {
// //     if (data?.data) {
// //       const merged = DAYS.map(d => {
// //         const ex = data.data.availability?.find(a => a.day === d);
// //         return { day: d, slots: ex?.slots || [] };
// //       });
// //       setFormData({ ...data.data, availability: merged });
// //     }
// //     setFiles({ resume: null, portfolio: null, video: null });
// //     setIsEditing(false);
// //   };

// //   const addSlot = (di) => setFormData(p => { const a = [...p.availability]; a[di] = { ...a[di], slots: [...a[di].slots, { startTime: '09:00', endTime: '10:00', isBooked: false }] }; return { ...p, availability: a }; });
// //   const removeSlot = (di, si) => setFormData(p => { const a = [...p.availability]; a[di].slots = a[di].slots.filter((_, i) => i !== si); return { ...p, availability: a }; });
// //   const updateSlot = (di, si, f, v) => setFormData(p => { const a = [...p.availability]; a[di].slots[si][f] = v; return { ...p, availability: a }; });

// //   const skills = formData.currentSkills ? formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
// //   const areas = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean) : [];
// //   const bio = formData.whyMentor || '';
// //   const bioShort = bio.length > 150 ? bio.slice(0, 150) + '…' : bio;

// //   // ── Loading ─────────────────────────────────────────────
// //   if (isLoading) return (
// //     <div className="flex-1 flex items-center justify-center bg-gray-100 p-6 min-h-[60vh]">
// //       <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
// //         <Loader2 size={36} className="animate-spin mx-auto mb-4" style={{ color: CYAN }} />
// //         <p className="text-gray-500 text-base">Loading profile…</p>
// //       </div>
// //     </div>
// //   );

// //   if (error || !formData || Object.keys(formData).length < 2) return (
// //     <div className="flex-1 flex items-center justify-center bg-gray-100 p-6 min-h-[60vh]">
// //       <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
// //         <X size={36} className="text-red-400 mx-auto mb-4" />
// //         <p className="text-gray-500 text-base">Failed to load profile. Please refresh.</p>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="flex flex-col h-full bg-gray-100 overflow-auto min-h-screen">

// //       {/* ══ BANNER ═══════════════════════════════════════════════ */}
// //       <div className="relative h-36 sm:h-44 md:h-52 shrink-0 overflow-hidden" style={{ background: DARK }}>
// //         {/* Decorative rings */}
// //         {/* <div className="absolute inset-0 opacity-10">
// //           {[[-20,5,220],[-5,55,130],[55,5,90],[75,38,170]].map(([t,l,s],i)=>(
// //             <div key={i} className="absolute rounded-full border-2 border-white"
// //               style={{ top:`${t}%`, left:`${l}%`, width:s, height:s }} />
// //           ))}
// //         </div> */}
// //         {/* Accent circle */}
// //         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-80"
// //         />

// //         {/* Action buttons */}
// //         <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 z-10">
// //           {!isEditing ? (
// //             <BtnOutline onClick={() => setIsEditing(true)}>
// //               <Pencil size={13} /> <span className="hidden sm:inline">Edit Profile</span><span className="sm:hidden">Edit</span>
// //             </BtnOutline>
// //           ) : (
// //             <>
// //               <BtnPrimary onClick={handleSave} disabled={isUpdating}>
// //                 {isUpdating ? <><Loader2 size={13} className="animate-spin" />Saving…</> : <><Save size={13} />Save</>}
// //               </BtnPrimary>
// //               <BtnOutline onClick={handleCancel} disabled={isUpdating}>
// //                 <X size={13} /> <span className="hidden sm:inline">Cancel</span>
// //               </BtnOutline>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* ══ AVATAR ════════════════════════════════════════════════ */}
// //       <div className="relative z-10 px-5 sm:px-6 -mt-12 sm:-mt-14 md:-mt-16 pointer-events-none">
// //         <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-xl flex items-center justify-center">
// //           <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
// //             {formData.fullName?.charAt(0)?.toUpperCase() || '?'}
// //           </span>
// //         </div>
// //       </div>

// //       {/* ══ CONTENT: sidebar + main ═══════════════════════════════ */}
// //       <div className="flex flex-col lg:flex-row flex-1 bg-white min-h-0 overflow-hidden">

// //         {/* ── LEFT SIDEBAR ──────────────────────────────────────── */}
// //         <aside className="w-full lg:w-72 xl:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 px-5 sm:px-6 pt-4 pb-7 flex flex-col gap-4 overflow-visible lg:overflow-auto">

// //           {/* Name + Role */}
// //           <div className="mt-1">
// //             {isEditing ? (
// //               <EditField value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)}
// //                 placeholder="Current Role" className="text-sm mb-2 text-gray-500" />
// //             ) : (
// //               <p className="text-sm text-gray-500 mb-1">{formData.currentRole || 'Mentor'}</p>
// //             )}
// //             {isEditing ? (
// //               <EditField value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)}
// //                 placeholder="Full Name" className="text-base font-bold" />
// //             ) : (
// //               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
// //                 {formData.fullName || 'Your Name'}
// //               </h1>
// //             )}
// //             <p className="text-sm text-gray-400 mt-1">Member since {formatDate(formData.createdAt)}</p>
// //           </div>

// //           {/* Location */}
// //           <div className="flex items-center gap-2 text-sm text-gray-600">
// //             <MapPin size={13} className="text-gray-400 shrink-0" />
// //             {isEditing
// //               ? <EditField value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
// //               : <span>{formData.location || 'Not set'}</span>
// //             }
// //           </div>

// //           {/* Rating */}
// //           <div className="flex items-center gap-2">
// //             <Star size={14} fill={CYAN} style={{ color: CYAN }} />
// //             <span className="text-base font-semibold text-gray-700">
// //               {formData.rating || '0.0'}
// //               <span className="text-gray-400 font-normal ml-1 text-sm">({formData.reviewCount || 0} Review)</span>
// //             </span>
// //           </div>

// //           {/* Stats */}
// //           <div className="space-y-2 text-sm">
// //             <div className="flex items-center justify-between">
// //               <span className="text-gray-500">Jobs Completed</span>
// //               <span className="font-bold text-sm px-2.5 py-1 rounded-full text-white" style={{ background: CYAN }}>
// //                 {formData.completedBookings || 0}%
// //               </span>
// //             </div>
// //             <div className="flex items-center justify-between gap-3">
// //               <span className="text-gray-500 shrink-0">Language:</span>
// //               {isEditing
// //                 ? <EditField value={formData.language || ''} onChange={e => set('language', e.target.value)} placeholder="e.g. English" className="text-sm" />
// //                 : <span className="text-gray-700 text-right text-sm">{formData.language || 'Not set'}</span>
// //               }
// //             </div>
// //           </div>

// //           {/* Bio snippet */}
// //           <div className="text-sm text-gray-600 leading-relaxed">
// //             {showMore ? bio : bioShort}
// //             {bio.length > 150 && (
// //               <button onClick={() => setShowMore(!showMore)}
// //                 className="flex items-center gap-1 mt-1 font-semibold text-xs"
// //                 style={{ color: CYAN }}>
// //                 {showMore ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Show more</>}
// //               </button>
// //             )}
// //           </div>

// //           {/* Price card */}
// //           <div className="rounded-2xl px-4 py-3 text-white" style={{ background: DARK }}>
// //             <div className="flex items-baseline gap-2 flex-wrap">
// //               <span className="text-3xl font-bold">₹{formData.hourlyRate || '0.00'}</span>
// //               {isEditing
// //                 ? <EditField value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)}
// //                   placeholder="e.g. 45-min Session"
// //                   className="text-sm bg-white/10 border-white/20 text-white placeholder-white/40 w-32" />
// //                 : <span className="text-sm text-white/70">{formData.sessionDuration || '40-min Session'}</span>
// //               }
// //             </div>
// //           </div>

// //           {/* Contact Me button */}
// //           <button className="w-full py-2.5 rounded-2xl text-white font-bold text-base transition-colors hover:opacity-90"
// //             style={{ background: CYAN }}>
// //             Contact Me
// //           </button>

// //           {/* Like + Share */}
// //           <div className="flex items-center gap-4">
// //             <button onClick={() => setLiked(!liked)}
// //               className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-400 transition-colors">
// //               <Heart size={15} fill={liked ? '#f87171' : 'none'} className={liked ? 'text-red-400' : ''} />
// //               <span>{liked ? 'Saved' : 'Save'}</span>
// //             </button>
// //             <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
// //               <Share2 size={15} />
// //               <span>Share</span>
// //             </button>
// //           </div>

// //           {/* Earnings stats */}
// //           <div className="border-t border-gray-100 pt-3 space-y-2.5">
// //             <div className="flex items-center justify-between">
// //               <span className="text-sm text-gray-500">Total Earning Amount:</span>
// //               <span className="text-sm font-bold text-gray-800">${formData.totalEarnings || '0.00'}</span>
// //             </div>
// //             <div className="flex items-center justify-between">
// //               <span className="text-sm text-gray-500">Total Mentees:</span>
// //               <span className="text-sm font-bold text-gray-800">{formData.totalMentees || 0}</span>
// //             </div>
// //           </div>

// //           {/* LinkedIn */}
// //           {isEditing && (
// //             <div>
// //               <p className="text-sm text-gray-400 mb-1 font-medium">LinkedIn URL</p>
// //               <EditField value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
// //             </div>
// //           )}
// //           {!isEditing && formData.linkedinUrl && (
// //             <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer"
// //               className="text-sm font-medium underline truncate block" style={{ color: CYAN }}>
// //               {formData.linkedinUrl}
// //             </a>
// //           )}
// //         </aside>

// //         {/* ── RIGHT CONTENT ─────────────────────────────────────── */}
// //         <div className="flex-1 flex flex-col min-w-0 overflow-auto w-full">

// //           {/* Tab strip — scrollable on mobile */}
// //           <div className="border-b border-gray-200 px-4 sm:px-6 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide">
// //             <div className="flex min-w-max">
// //               {TABS.map(tab => (
// //                 <button key={tab} onClick={() => setActiveTab(tab)}
// //                   className={`px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold border-b-2 transition-colors whitespace-nowrap -mb-px ${activeTab === tab
// //                       ? 'border-gray-900 text-gray-900'
// //                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                     }`}>
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Tab content */}
// //           <div className="p-4 sm:p-5 lg:p-8 space-y-8 sm:space-y-10">

// //             {/* ── OVERVIEW ──────────────────────────────────────── */}
// //             {activeTab === 'Overview' && (
// //               <>
// //                 <section>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
// //                     About <span style={{ color: CYAN }}>{formData.fullName || 'Mentor'}</span>
// //                   </h2>
// //                   {isEditing
// //                     ? <EditField value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)}
// //                       placeholder="Share your professional journey and mentoring goals…" multiline />
// //                     : <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
// //                       {formData.whyMentor || 'No bio provided.'}
// //                     </p>
// //                   }
// //                 </section>

// //                 <section>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Mentorship Expertise</h2>
// //                   {isEditing
// //                     ? <EditField value={formData.currentSkills || ''} onChange={e => set('currentSkills', e.target.value)}
// //                       placeholder="React, Node.js, Python… (comma-separated)" multiline />
// //                     : skills.length > 0
// //                       ? <div className="flex flex-wrap gap-2">
// //                         {skills.map((s, i) => <Pill key={i} label={s} />)}
// //                       </div>
// //                       : <p className="text-sm text-gray-400 italic">No skills listed.</p>
// //                   }
// //                 </section>

// //                 <section>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Work History and Feedback</h2>
// //                   <p className="text-sm sm:text-base text-gray-500 italic">
// //                     {formData.completedBookings > 0
// //                       ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}`
// //                       : 'Be the first to book a session with this mentor.'}
// //                   </p>
// //                 </section>
// //               </>
// //             )}

// //             {/* ── MENTORSHIP TOPICS ─────────────────────────────── */}
// //             {activeTab === 'Mentorship Topics' && (
// //               <section className="space-y-5">
// //                 <div>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Areas of Interest</h2>
// //                   {isEditing
// //                     ? <EditField value={formData.areasOfInterest || ''} onChange={e => set('areasOfInterest', e.target.value)}
// //                       placeholder="Web Development, Cloud, DevOps… (comma-separated)" multiline />
// //                     : areas.length > 0
// //                       ? <div className="flex flex-wrap gap-2">
// //                         {areas.map((a, i) => <Pill key={i} label={a} />)}
// //                       </div>
// //                       : <p className="text-sm text-gray-400 italic">No topics listed.</p>
// //                   }
// //                 </div>

// //                 <div>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Mentoring Style</h2>
// //                   {isEditing
// //                     ? <EditField value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)}
// //                       placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
// //                     : <p className="text-sm sm:text-base text-gray-700">
// //                       {formData.mentoringStyle || <span className="italic text-gray-400">Not set</span>}
// //                     </p>
// //                   }
// //                 </div>
// //               </section>
// //             )}

// //             {/* ── EXPERIENCE ────────────────────────────────────── */}
// //             {activeTab === 'Experience' && (
// //               <section className="space-y-7">
// //                 <div>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Professional Experience</h2>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
// //                     {[
// //                       { label: 'Company', field: 'companyName' },
// //                       { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
// //                       { label: 'Highest Degree', field: 'highestDegree' },
// //                       { label: 'Field of Study', field: 'fieldOfStudy' },
// //                       { label: 'Institution', field: 'schoolName' },
// //                     ].map(({ label, field, type }) => (
// //                       <div key={field}>
// //                         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</p>
// //                         {isEditing
// //                           ? <EditField type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} />
// //                           : <p className="text-sm sm:text-base font-medium text-gray-800 px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50">
// //                             {formData[field] || '—'}
// //                           </p>
// //                         }
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Weekly Availability */}
// //                 <div>
// //                   <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Weekly Availability</h3>
// //                   <div className="space-y-2.5">
// //                     {formData.availability?.map((day, di) => (
// //                       <div key={day.day} className="border border-gray-200 rounded-2xl overflow-hidden">
// //                         <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-gray-50 border-b border-gray-100">
// //                           <span className="text-base sm:text-lg font-semibold text-gray-700">{day.day}</span>
// //                           {isEditing && (
// //                             <button onClick={() => addSlot(di)}
// //                               className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-white transition-colors hover:opacity-80"
// //                               style={{ background: DARK }}>
// //                               <Plus size={11} /> Add Slot
// //                             </button>
// //                           )}
// //                         </div>
// //                         <div className="px-4 sm:px-5 py-2.5 flex flex-wrap gap-2">
// //                           {!day.slots?.length
// //                             ? <span className="text-sm text-gray-400 italic">No slots set</span>
// //                             : day.slots.map((slot, si) => (
// //                               <div key={si} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
// //                                 {isEditing ? (
// //                                   <>
// //                                     <input type="time" value={slot.startTime}
// //                                       onChange={e => updateSlot(di, si, 'startTime', e.target.value)}
// //                                       className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-[#0098cc]" />
// //                                     <span className="text-gray-300 text-sm">→</span>
// //                                     <input type="time" value={slot.endTime}
// //                                       onChange={e => updateSlot(di, si, 'endTime', e.target.value)}
// //                                       className="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-[#0098cc]" />
// //                                     <button onClick={() => removeSlot(di, si)} className="text-red-400 hover:text-red-500 ml-1 transition-colors">
// //                                       <Trash2 size={12} />
// //                                     </button>
// //                                   </>
// //                                 ) : (
// //                                   <span className="text-sm font-medium text-gray-700">{slot.startTime} — {slot.endTime}</span>
// //                                 )}
// //                               </div>
// //                             ))
// //                           }
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </section>
// //             )}

// //             {/* ── CASE STUDIES ──────────────────────────────────── */}
// //             {activeTab === 'Case Studies' && (
// //               <section>
// //                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Case Studies</h2>
// //                 <div className="space-y-3.5">
// //                   {[
// //                     { label: 'Resume / CV', field: 'resumeLink', accept: '.pdf,.doc,.docx', ref: resumeRef },
// //                     { label: 'Portfolio', field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
// //                     { label: 'Video Intro', field: 'videoLink', accept: 'video/*', ref: videoRef },
// //                   ].map(({ label, field, accept, ref }) => (
// //                     <div key={field} className="border border-gray-200 rounded-2xl p-3.5 sm:p-4">
// //                       <div className="flex items-center justify-between mb-2.5">
// //                         <p className="text-base sm:text-lg font-semibold text-gray-700">{label}</p>
// //                         {!isEditing && formData[field] && (
// //                           <a href={formData[field]} target="_blank" rel="noopener noreferrer"
// //                             className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border transition-colors"
// //                             style={{ borderColor: CYAN, color: CYAN }}>
// //                             <Eye size={12} /> View
// //                           </a>
// //                         )}
// //                         {!isEditing && !formData[field] && (
// //                           <span className="text-sm text-gray-400 italic">Not uploaded</span>
// //                         )}
// //                       </div>
// //                       {isEditing && (
// //                         <div className="space-y-2">
// //                           <input ref={ref} type="file" accept={accept} className="hidden" id={`f-${field}`}
// //                             onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link', '')]: f })); }} />
// //                           <label htmlFor={`f-${field}`}
// //                             className="flex items-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-xl cursor-pointer text-sm text-gray-500 hover:border-[#0098cc] hover:text-[#0098cc] transition-colors">
// //                             <Upload size={14} /> Upload file
// //                           </label>
// //                           <EditField value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MentorProfile;


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   MapPin, Star, Heart, Share2,
// // //   ChevronDown, ChevronUp, Pencil, Save, X, Plus,
// // //   Trash2, Loader2, Upload, Eye
// // // } from 'lucide-react';
// // // import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// // // import { showToast } from '../../../utils/Toastprovider';

// // // const DARK  = '#062117';
// // // const CYAN  = '#0098cc';

// // // const formatDate = (ds) => {
// // //   if (!ds) return 'N/A';
// // //   return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
// // // };

// // // const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
// // // const TABS = ['Overview','Case Studies','Mentorship Topics','Experience'];

// // // // ── Editable field ────────────────────────────────────────────
// // // const EditField = ({ value, onChange, placeholder, multiline, type = 'text', className = '' }) => {
// // //   const base = `w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800 bg-white
// // //     focus:outline-none focus:border-[#0098cc] focus:ring-1 focus:ring-[#0098cc]/20
// // //     transition-colors placeholder-gray-400 ${className}`;
// // //   return multiline
// // //     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
// // //     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={base} />;
// // // };

// // // // ── Pill ──────────────────────────────────────────────────────
// // // const Pill = ({ label }) => (
// // //   <span className="px-2.5 py-0.5 border border-gray-300 rounded-full text-xs text-gray-600 bg-white">
// // //     {label}
// // //   </span>
// // // );

// // // // ── Button variants ───────────────────────────────────────────
// // // const BtnPrimary = ({ onClick, disabled, children, className = '' }) => (
// // //   <button onClick={onClick} disabled={disabled}
// // //     className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold
// // //       transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
// // //     style={{ background: CYAN }}>
// // //     {children}
// // //   </button>
// // // );

// // // const BtnOutline = ({ onClick, disabled, children, className = '' }) => (
// // //   <button onClick={onClick} disabled={disabled}
// // //     className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold
// // //       border border-white/50 text-white hover:bg-white/10 transition-colors disabled:opacity-50 ${className}`}>
// // //     {children}
// // //   </button>
// // // );

// // // // ── Main Component ────────────────────────────────────────────
// // // const MentorProfile = () => {
// // //   const [isEditing, setIsEditing]   = useState(false);
// // //   const [activeTab, setActiveTab]   = useState('Overview');
// // //   const [showMore, setShowMore]     = useState(false);
// // //   const [liked, setLiked]           = useState(false);

// // //   const [formData, setFormData] = useState({
// // //     availability: DAYS.map(d => ({ day: d, slots: [] }))
// // //   });
// // //   const [email, setEmail] = useState('');
// // //   const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

// // //   const resumeRef    = useRef(null);
// // //   const portfolioRef = useRef(null);
// // //   const videoRef     = useRef(null);

// // //   const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
// // //   const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

// // //   useEffect(() => {
// // //     const ud = localStorage.getItem('userData');
// // //     if (ud) { try { setEmail(JSON.parse(ud).email); } catch {} }
// // //   }, []);

// // //   useEffect(() => { if (email) getMentorDetails(email); }, [email, getMentorDetails]);

// // //   useEffect(() => {
// // //     if (data?.data) {
// // //       const merged = DAYS.map(d => {
// // //         const ex = data.data.availability?.find(a => a.day === d);
// // //         return { day: d, slots: ex?.slots || [] };
// // //       });
// // //       setFormData({ ...data.data, availability: merged });
// // //     }
// // //   }, [data]);

// // //   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

// // //   const handleSave = async () => {
// // //     try {
// // //       await updateMentorDetails({ email, ...formData }).unwrap();
// // //       await getMentorDetails(email);
// // //       setIsEditing(false);
// // //       setFiles({ resume: null, portfolio: null, video: null });
// // //       showToast('Profile updated successfully!', 'success');
// // //     } catch { showToast('Failed to update profile.'); }
// // //   };

// // //   const handleCancel = () => {
// // //     if (data?.data) {
// // //       const merged = DAYS.map(d => {
// // //         const ex = data.data.availability?.find(a => a.day === d);
// // //         return { day: d, slots: ex?.slots || [] };
// // //       });
// // //       setFormData({ ...data.data, availability: merged });
// // //     }
// // //     setFiles({ resume: null, portfolio: null, video: null });
// // //     setIsEditing(false);
// // //   };

// // //   const addSlot    = (di)         => setFormData(p => { const a=[...p.availability]; a[di]={...a[di],slots:[...a[di].slots,{startTime:'09:00',endTime:'10:00',isBooked:false}]}; return{...p,availability:a}; });
// // //   const removeSlot = (di, si)     => setFormData(p => { const a=[...p.availability]; a[di].slots=a[di].slots.filter((_,i)=>i!==si); return{...p,availability:a}; });
// // //   const updateSlot = (di, si,f,v) => setFormData(p => { const a=[...p.availability]; a[di].slots[si][f]=v; return{...p,availability:a}; });

// // //   const skills   = formData.currentSkills   ? formData.currentSkills.split(',').map(s=>s.trim()).filter(Boolean) : [];
// // //   const areas    = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s=>s.trim()).filter(Boolean) : [];
// // //   const bio      = formData.whyMentor || '';
// // //   const bioShort = bio.length > 150 ? bio.slice(0, 150) + '…' : bio;

// // //   // ── Loading / Error ────────────────────────────────────────
// // //   if (isLoading) return (
// // //     <div className="flex-1 flex items-center justify-center bg-gray-50 p-6 min-h-[60vh]">
// // //       <div className="bg-white rounded-xl shadow-sm p-10 text-center">
// // //         <Loader2 size={30} className="animate-spin mx-auto mb-3" style={{ color: CYAN }} />
// // //         <p className="text-gray-400 text-sm">Loading profile…</p>
// // //       </div>
// // //     </div>
// // //   );

// // //   if (error || !formData || Object.keys(formData).length < 2) return (
// // //     <div className="flex-1 flex items-center justify-center bg-gray-50 p-6 min-h-[60vh]">
// // //       <div className="bg-white rounded-xl shadow-sm p-10 text-center">
// // //         <X size={30} className="text-red-400 mx-auto mb-3" />
// // //         <p className="text-gray-400 text-sm">Failed to load profile. Please refresh.</p>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="flex flex-col h-full bg-gray-100 overflow-auto min-h-screen">

// // //       {/* ══ BANNER ════════════════════════════════════════════ */}
// // //       <div className="relative h-32 sm:h-40 shrink-0 overflow-hidden" style={{ background: DARK }}>
// // //         {/* <div className="absolute inset-0 opacity-10">
// // //           {[[-20,5,220],[-5,55,130],[55,5,90],[75,38,170]].map(([t,l,s],i)=>(
// // //             <div key={i} className="absolute rounded-full border-2 border-white"
// // //               style={{ top:`${t}%`, left:`${l}%`, width:s, height:s }} />
// // //           ))}
// // //         </div> */}
// // //         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-80"
// // //           />

// // //         {/* Action buttons */}
// // //         <div className="absolute top-3 right-3 flex gap-2 z-10">
// // //           {!isEditing ? (
// // //             <BtnOutline onClick={() => setIsEditing(true)}>
// // //               <Pencil size={12} /> Edit Profile
// // //             </BtnOutline>
// // //           ) : (
// // //             <>
// // //               <BtnPrimary onClick={handleSave} disabled={isUpdating}>
// // //                 {isUpdating ? <><Loader2 size={12} className="animate-spin"/>Saving…</> : <><Save size={12}/>Save</>}
// // //               </BtnPrimary>
// // //               <BtnOutline onClick={handleCancel} disabled={isUpdating}>
// // //                 <X size={12}/> Cancel
// // //               </BtnOutline>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ══ AVATAR ════════════════════════════════════════════ */}
// // //       <div className="relative z-10 px-5 -mt-9 pointer-events-none">
// // //         <div className="w-18 h-18 w-[72px] h-[72px] rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg flex items-center justify-center">
// // //           <span className="text-xl font-bold text-gray-400">
// // //             {formData.fullName?.charAt(0)?.toUpperCase() || '?'}
// // //           </span>
// // //         </div>
// // //       </div>

// // //       {/* ══ CONTENT ═══════════════════════════════════════════ */}
// // //       <div className="flex flex-col lg:flex-row flex-1 bg-white min-h-0 overflow-hidden">

// // //         {/* ── LEFT SIDEBAR ────────────────────────────────── */}
// // //         <aside className="w-full lg:w-60 xl:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100
// // //           px-4 pt-3 pb-6 flex flex-col gap-3 overflow-visible lg:overflow-auto">

// // //           {/* Name + Role */}
// // //           <div>
// // //             {isEditing ? (
// // //               <EditField value={formData.currentRole||''} onChange={e=>set('currentRole',e.target.value)}
// // //                 placeholder="Current Role" className="text-xs mb-1" />
// // //             ) : (
// // //               <p className="text-xs text-gray-400 mb-0.5">{formData.currentRole || 'Mentor'}</p>
// // //             )}
// // //             {isEditing ? (
// // //               <EditField value={formData.fullName||''} onChange={e=>set('fullName',e.target.value)}
// // //                 placeholder="Full Name" className="font-bold" />
// // //             ) : (
// // //               <h1 className="text-lg font-bold text-gray-900 leading-snug">
// // //                 {formData.fullName || 'Your Name'}
// // //               </h1>
// // //             )}
// // //             <p className="text-xs text-gray-400 mt-0.5">Member since {formatDate(formData.createdAt)}</p>
// // //           </div>

// // //           {/* Location */}
// // //           <div className="flex items-center gap-1.5 text-xs text-gray-500">
// // //             <MapPin size={11} className="text-gray-400 shrink-0" />
// // //             {isEditing
// // //               ? <EditField value={formData.location||''} onChange={e=>set('location',e.target.value)} placeholder="City, Country" />
// // //               : <span>{formData.location || 'Not set'}</span>
// // //             }
// // //           </div>

// // //           {/* Rating */}
// // //           <div className="flex items-center gap-1.5">
// // //             <Star size={12} fill={CYAN} style={{ color: CYAN }} />
// // //             <span className="text-sm font-semibold text-gray-700">
// // //               {formData.rating || '0.0'}
// // //               <span className="text-gray-400 font-normal text-xs ml-1">({formData.reviewCount || 0} reviews)</span>
// // //             </span>
// // //           </div>

// // //           {/* Stats */}
// // //           <div className="space-y-1.5 text-xs">
// // //             <div className="flex items-center justify-between">
// // //               <span className="text-gray-500">Jobs Completed</span>
// // //               <span className="font-semibold text-xs px-2 py-0.5 rounded-full text-white" style={{ background: CYAN }}>
// // //                 {formData.completedBookings || 0}%
// // //               </span>
// // //             </div>
// // //             <div className="flex items-center justify-between gap-2">
// // //               <span className="text-gray-500 shrink-0">Language:</span>
// // //               {isEditing
// // //                 ? <EditField value={formData.language||''} onChange={e=>set('language',e.target.value)} placeholder="e.g. English" />
// // //                 : <span className="text-gray-700 text-right">{formData.language || 'Not set'}</span>
// // //               }
// // //             </div>
// // //           </div>

// // //           {/* Bio snippet */}
// // //           <div className="text-xs text-gray-600 leading-relaxed">
// // //             {showMore ? bio : bioShort}
// // //             {bio.length > 150 && (
// // //               <button onClick={() => setShowMore(!showMore)}
// // //                 className="flex items-center gap-0.5 mt-1 font-semibold text-xs"
// // //                 style={{ color: CYAN }}>
// // //                 {showMore ? <><ChevronUp size={10}/>Show less</> : <><ChevronDown size={10}/>Show more</>}
// // //               </button>
// // //             )}
// // //           </div>

// // //           {/* Price card */}
// // //           <div className="rounded-xl px-3.5 py-3 text-white" style={{ background: DARK }}>
// // //             <div className="flex items-baseline gap-2 flex-wrap">
// // //               <span className="text-2xl font-bold">${formData.hourlyRate || '0.00'}</span>
// // //               {isEditing
// // //                 ? <EditField value={formData.sessionDuration||''} onChange={e=>set('sessionDuration',e.target.value)}
// // //                     placeholder="e.g. 45-min Session"
// // //                     className="text-xs bg-white/10 border-white/20 text-white placeholder-white/40 w-28" />
// // //                 : <span className="text-xs text-white/60">{formData.sessionDuration || '45-min Session'}</span>
// // //               }
// // //             </div>
// // //           </div>

// // //           {/* Contact Me */}
// // //           <button className="w-full py-2 rounded-lg text-white font-semibold text-sm transition-colors hover:opacity-90"
// // //             style={{ background: CYAN }}>
// // //             Contact Me
// // //           </button>

// // //           {/* Like + Share */}
// // //           <div className="flex items-center gap-4">
// // //             <button onClick={() => setLiked(!liked)}
// // //               className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
// // //               <Heart size={12} fill={liked ? '#f87171' : 'none'} className={liked ? 'text-red-400' : ''} />
// // //               {liked ? 'Saved' : 'Save'}
// // //             </button>
// // //             <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
// // //               <Share2 size={12} />
// // //               Share
// // //             </button>
// // //           </div>

// // //           {/* Earnings */}
// // //           <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
// // //             <div className="flex items-center justify-between">
// // //               <span className="text-xs text-gray-500">Total Earnings:</span>
// // //               <span className="text-xs font-semibold text-gray-800">${formData.totalEarnings || '0.00'}</span>
// // //             </div>
// // //             <div className="flex items-center justify-between">
// // //               <span className="text-xs text-gray-500">Total Mentees:</span>
// // //               <span className="text-xs font-semibold text-gray-800">{formData.totalMentees || 0}</span>
// // //             </div>
// // //           </div>

// // //           {/* LinkedIn */}
// // //           {isEditing && (
// // //             <div>
// // //               <p className="text-xs text-gray-400 mb-1 font-medium">LinkedIn URL</p>
// // //               <EditField value={formData.linkedinUrl||''} onChange={e=>set('linkedinUrl',e.target.value)} placeholder="https://linkedin.com/in/..." />
// // //             </div>
// // //           )}
// // //           {!isEditing && formData.linkedinUrl && (
// // //             <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer"
// // //               className="text-xs font-medium underline truncate block" style={{ color: CYAN }}>
// // //               {formData.linkedinUrl}
// // //             </a>
// // //           )}
// // //         </aside>

// // //         {/* ── RIGHT CONTENT ──────────────────────────────────── */}
// // //         <div className="flex-1 flex flex-col min-w-0 overflow-auto w-full">

// // //           {/* Tab strip */}
// // //           <div className="border-b border-gray-200 px-4 sm:px-6 sticky top-0 bg-white z-10 overflow-x-auto scrollbar-hide">
// // //             <div className="flex min-w-max">
// // //               {TABS.map(tab => (
// // //                 <button key={tab} onClick={() => setActiveTab(tab)}
// // //                   className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap -mb-px ${
// // //                     activeTab === tab
// // //                       ? 'border-gray-900 text-gray-900'
// // //                       : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
// // //                   }`}>
// // //                   {tab}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Tab content */}
// // //           <div className="p-4 sm:p-5 lg:p-7 space-y-6">

// // //             {/* ── OVERVIEW ────────────────────────────────── */}
// // //             {activeTab === 'Overview' && (
// // //               <>
// // //                 <section>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-2">
// // //                     About <span style={{ color: CYAN }}>{formData.fullName || 'Mentor'}</span>
// // //                   </h2>
// // //                   {isEditing
// // //                     ? <EditField value={formData.whyMentor||''} onChange={e=>set('whyMentor',e.target.value)}
// // //                         placeholder="Share your professional journey and mentoring goals…" multiline />
// // //                     : <p className="text-sm text-gray-600 leading-relaxed">
// // //                         {formData.whyMentor || 'No bio provided.'}
// // //                       </p>
// // //                   }
// // //                 </section>

// // //                 <section>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-2">Mentorship Expertise</h2>
// // //                   {isEditing
// // //                     ? <EditField value={formData.currentSkills||''} onChange={e=>set('currentSkills',e.target.value)}
// // //                         placeholder="React, Node.js, Python… (comma-separated)" multiline />
// // //                     : skills.length > 0
// // //                       ? <div className="flex flex-wrap gap-1.5">
// // //                           {skills.map((s,i) => <Pill key={i} label={s} />)}
// // //                         </div>
// // //                       : <p className="text-xs text-gray-400 italic">No skills listed.</p>
// // //                   }
// // //                 </section>

// // //                 <section>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-2">Work History and Feedback</h2>
// // //                   <p className="text-xs text-gray-500 italic">
// // //                     {formData.completedBookings > 0
// // //                       ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}`
// // //                       : 'Be the first to book a session with this mentor.'}
// // //                   </p>
// // //                 </section>
// // //               </>
// // //             )}

// // //             {/* ── MENTORSHIP TOPICS ───────────────────────── */}
// // //             {activeTab === 'Mentorship Topics' && (
// // //               <section className="space-y-4">
// // //                 <div>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-2">Areas of Interest</h2>
// // //                   {isEditing
// // //                     ? <EditField value={formData.areasOfInterest||''} onChange={e=>set('areasOfInterest',e.target.value)}
// // //                         placeholder="Web Development, Cloud, DevOps… (comma-separated)" multiline />
// // //                     : areas.length > 0
// // //                       ? <div className="flex flex-wrap gap-1.5">
// // //                           {areas.map((a,i) => <Pill key={i} label={a} />)}
// // //                         </div>
// // //                       : <p className="text-xs text-gray-400 italic">No topics listed.</p>
// // //                   }
// // //                 </div>

// // //                 <div>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-1.5">Mentoring Style</h2>
// // //                   {isEditing
// // //                     ? <EditField value={formData.mentoringStyle||''} onChange={e=>set('mentoringStyle',e.target.value)}
// // //                         placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
// // //                     : <p className="text-sm text-gray-700">
// // //                         {formData.mentoringStyle || <span className="italic text-gray-400">Not set</span>}
// // //                       </p>
// // //                   }
// // //                 </div>
// // //               </section>
// // //             )}

// // //             {/* ── EXPERIENCE ──────────────────────────────── */}
// // //             {activeTab === 'Experience' && (
// // //               <section className="space-y-5">
// // //                 <div>
// // //                   <h2 className="text-sm font-bold text-gray-900 mb-3">Professional Experience</h2>
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // //                     {[
// // //                       { label: 'Company',             field: 'companyName' },
// // //                       { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
// // //                       { label: 'Highest Degree',      field: 'highestDegree' },
// // //                       { label: 'Field of Study',      field: 'fieldOfStudy' },
// // //                       { label: 'Institution',         field: 'schoolName' },
// // //                     ].map(({ label, field, type }) => (
// // //                       <div key={field}>
// // //                         <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
// // //                         {isEditing
// // //                           ? <EditField type={type||'text'} value={formData[field]||''} onChange={e=>set(field,e.target.value)} placeholder={label} />
// // //                           : <p className="text-sm text-gray-800 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
// // //                               {formData[field] || '—'}
// // //                             </p>
// // //                         }
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>

// // //                 {/* Weekly Availability */}
// // //                 <div>
// // //                   <h3 className="text-sm font-bold text-gray-800 mb-2.5">Weekly Availability</h3>
// // //                   <div className="space-y-2">
// // //                     {formData.availability?.map((day, di) => (
// // //                       <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
// // //                         <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
// // //                           <span className="text-xs font-semibold text-gray-700">{day.day}</span>
// // //                           {isEditing && (
// // //                             <button onClick={() => addSlot(di)}
// // //                               className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded text-white transition-colors hover:opacity-80"
// // //                               style={{ background: DARK }}>
// // //                               <Plus size={10} /> Add Slot
// // //                             </button>
// // //                           )}
// // //                         </div>
// // //                         <div className="px-3 py-2 flex flex-wrap gap-1.5">
// // //                           {!day.slots?.length
// // //                             ? <span className="text-xs text-gray-400 italic">No slots set</span>
// // //                             : day.slots.map((slot, si) => (
// // //                               <div key={si} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1">
// // //                                 {isEditing ? (
// // //                                   <>
// // //                                     <input type="time" value={slot.startTime}
// // //                                       onChange={e=>updateSlot(di,si,'startTime',e.target.value)}
// // //                                       className="text-xs border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#0098cc]" />
// // //                                     <span className="text-gray-300 text-xs">→</span>
// // //                                     <input type="time" value={slot.endTime}
// // //                                       onChange={e=>updateSlot(di,si,'endTime',e.target.value)}
// // //                                       className="text-xs border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#0098cc]" />
// // //                                     <button onClick={() => removeSlot(di,si)} className="text-red-400 hover:text-red-500 ml-0.5">
// // //                                       <Trash2 size={10} />
// // //                                     </button>
// // //                                   </>
// // //                                 ) : (
// // //                                   <span className="text-xs font-medium text-gray-700">{slot.startTime} — {slot.endTime}</span>
// // //                                 )}
// // //                               </div>
// // //                             ))
// // //                           }
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </section>
// // //             )}

// // //             {/* ── CASE STUDIES ────────────────────────────── */}
// // //             {activeTab === 'Case Studies' && (
// // //               <section>
// // //                 <h2 className="text-sm font-bold text-gray-900 mb-3">Case Studies</h2>
// // //                 <div className="space-y-2.5">
// // //                   {[
// // //                     { label: 'Resume / CV', field: 'resumeLink', accept: '.pdf,.doc,.docx', ref: resumeRef },
// // //                     { label: 'Portfolio',   field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
// // //                     { label: 'Video Intro', field: 'videoLink', accept: 'video/*', ref: videoRef },
// // //                   ].map(({ label, field, accept, ref }) => (
// // //                     <div key={field} className="border border-gray-200 rounded-xl p-3">
// // //                       <div className="flex items-center justify-between mb-2">
// // //                         <p className="text-sm font-semibold text-gray-700">{label}</p>
// // //                         {!isEditing && formData[field] && (
// // //                           <a href={formData[field]} target="_blank" rel="noopener noreferrer"
// // //                             className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-colors"
// // //                             style={{ borderColor: CYAN, color: CYAN }}>
// // //                             <Eye size={10} /> View
// // //                           </a>
// // //                         )}
// // //                         {!isEditing && !formData[field] && (
// // //                           <span className="text-xs text-gray-400 italic">Not uploaded</span>
// // //                         )}
// // //                       </div>
// // //                       {isEditing && (
// // //                         <div className="space-y-1.5">
// // //                           <input ref={ref} type="file" accept={accept} className="hidden" id={`f-${field}`}
// // //                             onChange={e => { const f=e.target.files[0]; if(f) setFiles(p=>({...p,[field.replace('Link','')]:f})); }} />
// // //                           <label htmlFor={`f-${field}`}
// // //                             className="flex items-center gap-1.5 px-3 py-2 border-2 border-dashed rounded-lg cursor-pointer text-xs text-gray-500 hover:border-[#0098cc] hover:text-[#0098cc] transition-colors">
// // //                             <Upload size={12} /> Upload file
// // //                           </label>
// // //                           <EditField value={formData[field]||''} onChange={e=>set(field,e.target.value)} placeholder="Or paste a URL…" />
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </section>
// // //             )}

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MentorProfile;



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   MapPin, Star, Heart, Share2,
//   ChevronDown, ChevronUp, Pencil, Save, X, Plus,
//   Trash2, Loader2, Upload, Eye, CheckCircle,
//   Clock, Calendar, Briefcase, BookOpen, Award, FileText,
//   TrendingUp, Users, DollarSign, Zap,
// } from 'lucide-react';
// import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
// import { showToast } from '../../../utils/Toastprovider';

// // ─── Constants ─────────────────────────────────────────────────────────────
// const CYAN = '#0098cc';
// const DARK = '#062117';
// const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
// const DAY_SHORT = { Monday:'Mon', Tuesday:'Tue', Wednesday:'Wed', Thursday:'Thu', Friday:'Fri', Saturday:'Sat', Sunday:'Sun' };
// const TABS = ['Overview','Case Studies','Mentorship Topics','Experience'];

// const formatDate = (ds) => {
//   if (!ds) return 'N/A';
//   return new Date(ds).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
// };

// // ─── Tick SVG ───────────────────────────────────────────────────────────────
// const Tick = ({ size = 12 }) => (
//   <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
//     <path d="M2 6.5L4.5 9.5L10 3" stroke="#fff" strokeWidth="2.3"
//       strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // ─── Visible Checkbox ────────────────────────────────────────────────────────
// const CheckBox = ({ checked, indeterminate, size = 20, onClick }) => {
//   const active = checked || indeterminate;
//   return (
//     <span
//       onClick={e => { e.stopPropagation(); onClick?.(); }}
//       style={{
//         display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
//         flexShrink: 0, cursor: 'pointer',
//         width: size, height: size,
//         borderRadius: Math.round(size * 0.22),
//         border: `2px solid ${active ? CYAN : '#c5d5dd'}`,
//         background: active ? CYAN : '#f8fafc',
//         boxShadow: active ? `0 0 0 3px ${CYAN}22` : 'inset 0 1px 2px rgba(0,0,0,0.06)',
//         transition: 'all 0.16s cubic-bezier(.4,0,.2,1)',
//       }}
//     >
//       {indeterminate && !checked
//         ? <span style={{ width: size * 0.45, height: 2, background: '#fff', borderRadius: 2, display: 'block' }} />
//         : checked ? <Tick size={size * 0.58} /> : null}
//     </span>
//   );
// };

// // ─── EditField ───────────────────────────────────────────────────────────────
// const EditField = ({ value, onChange, placeholder, multiline, type = 'text', className = '' }) => {
//   const base = `w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white
//     focus:outline-none focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10
//     transition-all placeholder-gray-300 ${className}`;
//   return multiline
//     ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
//     : <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={base} />;
// };

// // ─── Pill tag ────────────────────────────────────────────────────────────────
// const Pill = ({ label }) => (
//   <span style={{
//     display: 'inline-flex', alignItems: 'center',
//     padding: '5px 14px', borderRadius: 20,
//     fontSize: 13, fontWeight: 500,
//     background: `${CYAN}12`,
//     border: `1px solid ${CYAN}35`,
//     color: '#006a8e',
//   }}>
//     {label}
//   </span>
// );

// // ─── Stat card ───────────────────────────────────────────────────────────────
// const StatCard = ({ icon, label, value }) => (
//   <div style={{
//     background: '#f8fbfd',
//     border: '1px solid #e2eef3',
//     borderRadius: 14, padding: '14px 16px',
//     display: 'flex', flexDirection: 'column', gap: 6,
//   }}>
//     <div style={{ color: CYAN, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
//       {icon} {label}
//     </div>
//     <div style={{ fontSize: 22, fontWeight: 800, color: '#0f2030', lineHeight: 1 }}>{value}</div>
//   </div>
// );

// // ─── Section heading ─────────────────────────────────────────────────────────
// const SectionHead = ({ children }) => (
//   <h2 style={{
//     fontSize: 18, fontWeight: 800, color: '#0f2030',
//     marginBottom: 14,
//     paddingBottom: 10,
//     borderBottom: `2px solid ${CYAN}22`,
//     display: 'flex', alignItems: 'center', gap: 8,
//   }}>
//     {children}
//   </h2>
// );

// // ─── InfoRow ─────────────────────────────────────────────────────────────────
// const InfoRow = ({ label, value, isEditing, field, formData, set, type }) => (
//   <div>
//     <p style={{ fontSize: 11, fontWeight: 700, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>
//       {label}
//     </p>
//     {isEditing
//       ? <EditField type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} />
//       : <p style={{
//           fontSize: 14, fontWeight: 600, color: '#1e3a4a',
//           padding: '10px 14px', background: '#f8fbfd',
//           border: '1px solid #e2eef3', borderRadius: 12,
//         }}>
//           {formData[field] || '—'}
//         </p>
//     }
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// //  Weekly Availability with Select All + per-day checkboxes
// // ─────────────────────────────────────────────────────────────────────────────
// const WeeklyAvailability = ({ availability, isEditing, addSlot, removeSlot, updateSlot, setFormData }) => {
//   // Which days are "enabled" (have slots OR manually toggled on)
//   const [enabled, setEnabled] = useState(() =>
//     DAYS.reduce((acc, d) => {
//       const found = availability?.find(a => a.day === d);
//       acc[d] = !!(found?.slots?.length);
//       return acc;
//     }, {})
//   );

//   const enabledDays  = DAYS.filter(d => enabled[d]);
//   const allEnabled   = enabledDays.length === DAYS.length;
//   const someEnabled  = enabledDays.length > 0 && !allEnabled;
//   const noneEnabled  = enabledDays.length === 0;

//   // Toggle individual day
//   const toggleDay = (day) => {
//     if (!isEditing) return;
//     const di = DAYS.indexOf(day);
//     const next = !enabled[day];
//     setEnabled(p => ({ ...p, [day]: next }));
//     // If disabling, clear slots
//     if (!next) {
//       setFormData(p => {
//         const a = [...p.availability];
//         a[di] = { ...a[di], slots: [] };
//         return { ...p, availability: a };
//       });
//     } else if (!availability?.[di]?.slots?.length) {
//       // Auto-add one slot when enabling
//       addSlot(di);
//     }
//   };

//   // Toggle all
//   const toggleAll = () => {
//     if (!isEditing) return;
//     const next = !allEnabled;
//     const newEnabled = DAYS.reduce((acc, d) => { acc[d] = next; return acc; }, {});
//     setEnabled(newEnabled);
//     if (!next) {
//       // Clear all slots
//       setFormData(p => ({
//         ...p,
//         availability: p.availability.map(d => ({ ...d, slots: [] })),
//       }));
//     } else {
//       // Add a slot to days that have none
//       DAYS.forEach((day, di) => {
//         if (!availability?.[di]?.slots?.length) addSlot(di);
//       });
//     }
//   };

//   return (
//     <div>
//       {/* ── Select All Row ── */}
//       {isEditing && (
//         <div
//           onClick={toggleAll}
//           style={{
//             display: 'flex', alignItems: 'center', gap: 12,
//             padding: '14px 18px', marginBottom: 12,
//             borderRadius: 14, cursor: 'pointer', userSelect: 'none',
//             border: `2px solid ${allEnabled ? CYAN : someEnabled ? `${CYAN}66` : '#d1e6ef'}`,
//             background: allEnabled ? `${CYAN}0e` : someEnabled ? `${CYAN}07` : '#f8fbfd',
//             transition: 'all 0.18s',
//             boxShadow: allEnabled ? `0 0 0 4px ${CYAN}18` : 'none',
//           }}
//         >
//           {/* SELECT ALL CHECKBOX — size 26 */}
//           <CheckBox
//             checked={allEnabled}
//             indeterminate={someEnabled}
//             size={26}
//             onClick={toggleAll}
//           />
//           <Calendar size={16} color={CYAN} style={{ flexShrink: 0 }} />
//           <span style={{ flex: 1, fontWeight: 800, fontSize: 14, color: '#0f2030' }}>
//             Select All Days
//             <span style={{ fontWeight: 400, fontSize: 12, color: '#8aa0ad', marginLeft: 8 }}>
//               (Monday – Sunday)
//             </span>
//           </span>
//           <span style={{
//             padding: '4px 12px', borderRadius: 20,
//             fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
//             border: `1.5px solid ${allEnabled || someEnabled ? CYAN : '#c5d5dd'}`,
//             background: allEnabled ? CYAN : 'transparent',
//             color: allEnabled ? '#fff' : CYAN,
//             transition: 'all 0.18s',
//           }}>
//             {allEnabled ? '✓ All 7 days' : someEnabled ? `${enabledDays.length} / 7 days` : 'None selected'}
//           </span>
//         </div>
//       )}

//       {/* thin divider */}
//       {isEditing && (
//         <div style={{ height: 1, background: '#e8f0f4', marginBottom: 10 }} />
//       )}

//       {/* ── Day Rows ── */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//         {availability?.map((day, di) => {
//           const isEnabled = enabled[day.day];
//           const hasSlots  = day.slots?.length > 0;

//           return (
//             <div
//               key={day.day}
//               style={{
//                 border: `1.5px solid ${isEnabled || hasSlots ? `${CYAN}55` : '#e8f0f4'}`,
//                 borderRadius: 14, overflow: 'hidden',
//                 transition: 'all 0.2s',
//                 boxShadow: isEnabled || hasSlots ? `0 2px 8px ${CYAN}12` : 'none',
//                 opacity: isEditing && !isEnabled ? 0.55 : 1,
//               }}
//             >
//               {/* Day header */}
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: 12,
//                 padding: '11px 16px',
//                 background: isEnabled || hasSlots ? `${CYAN}08` : '#f8fbfd',
//                 borderBottom: hasSlots ? `1px solid ${CYAN}22` : 'none',
//                 transition: 'background 0.15s',
//               }}>
//                 {/* Per-day checkbox — only in edit mode, size 22 */}
//                 {isEditing && (
//                   <CheckBox
//                     checked={isEnabled}
//                     size={22}
//                     onClick={() => toggleDay(day.day)}
//                   />
//                 )}

//                 {/* Dot */}
//                 <span style={{
//                   width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
//                   background: isEnabled || hasSlots ? CYAN : '#c5d5dd',
//                   boxShadow: isEnabled ? `0 0 6px ${CYAN}88` : 'none',
//                   transition: 'all 0.2s',
//                 }} />

//                 {/* Day name */}
//                 <span style={{
//                   fontWeight: 700, fontSize: 14, flex: 1,
//                   color: isEnabled || hasSlots ? '#0f2030' : '#8aa0ad',
//                   transition: 'color 0.18s',
//                 }}>
//                   {day.day}
//                   <span style={{ fontWeight: 400, fontSize: 12, color: '#8aa0ad', marginLeft: 6 }}>
//                     {DAY_SHORT[day.day]}
//                   </span>
//                 </span>

//                 {/* Slot count badge */}
//                 {hasSlots && (
//                   <span style={{
//                     padding: '2px 10px', borderRadius: 20,
//                     fontSize: 11, fontWeight: 700,
//                     background: CYAN, color: '#fff',
//                   }}>
//                     {day.slots.length} slot{day.slots.length > 1 ? 's' : ''}
//                   </span>
//                 )}

//                 {/* Add Slot button */}
//                 {isEditing && isEnabled && (
//                   <button
//                     onClick={() => addSlot(di)}
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: 5,
//                       fontSize: 12, fontWeight: 700,
//                       padding: '5px 12px', borderRadius: 8,
//                       border: `1.5px solid ${CYAN}`,
//                       background: 'transparent', color: CYAN,
//                       cursor: 'pointer', transition: 'all 0.15s',
//                     }}
//                   >
//                     <Plus size={11} /> Add Slot
//                   </button>
//                 )}
//               </div>

//               {/* Slot pills */}
//               <div style={{
//                 padding: hasSlots || (isEditing && isEnabled) ? '10px 16px' : '0',
//                 display: 'flex', flexWrap: 'wrap', gap: 8,
//                 background: '#fff',
//               }}>
//                 {!hasSlots && !(isEditing && isEnabled) && null}
//                 {!hasSlots && isEditing && isEnabled && (
//                   <span style={{ fontSize: 12, color: '#8aa0ad', fontStyle: 'italic', padding: '2px 0' }}>
//                     No slots yet — click "Add Slot" to begin
//                   </span>
//                 )}
//                 {!hasSlots && !isEditing && (isEnabled || hasSlots) && (
//                   <span style={{ fontSize: 12, color: '#8aa0ad', fontStyle: 'italic', padding: '6px 0' }}>
//                     No slots set
//                   </span>
//                 )}
//                 {day.slots?.map((slot, si) => (
//                   <div
//                     key={si}
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: 8,
//                       background: isEditing ? '#f8fbfd' : `${CYAN}0a`,
//                       border: `1px solid ${isEditing ? '#e2eef3' : `${CYAN}30`}`,
//                       borderRadius: 10, padding: isEditing ? '7px 12px' : '5px 12px',
//                     }}
//                   >
//                     <Clock size={12} color={CYAN} />
//                     {isEditing ? (
//                       <>
//                         <input type="time" value={slot.startTime}
//                           onChange={e => updateSlot(di, si, 'startTime', e.target.value)}
//                           style={{
//                             fontSize: 13, border: '1px solid #d1e6ef',
//                             borderRadius: 8, padding: '4px 8px',
//                             outline: 'none', background: '#fff',
//                             color: '#0f2030',
//                           }} />
//                         <span style={{ color: CYAN, fontWeight: 700 }}>→</span>
//                         <input type="time" value={slot.endTime}
//                           onChange={e => updateSlot(di, si, 'endTime', e.target.value)}
//                           style={{
//                             fontSize: 13, border: '1px solid #d1e6ef',
//                             borderRadius: 8, padding: '4px 8px',
//                             outline: 'none', background: '#fff',
//                             color: '#0f2030',
//                           }} />
//                         <button onClick={() => removeSlot(di, si)} style={{
//                           background: '#fff0f0', border: '1px solid #fca5a5',
//                           color: '#ef4444', borderRadius: 6, padding: '3px 6px',
//                           cursor: 'pointer', display: 'flex', alignItems: 'center',
//                         }}>
//                           <Trash2 size={11} />
//                         </button>
//                       </>
//                     ) : (
//                       <span style={{ fontSize: 13, fontWeight: 600, color: '#1e3a4a' }}>
//                         {slot.startTime} — {slot.endTime}
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Summary bar in edit mode */}
//       {isEditing && enabledDays.length > 0 && (
//         <div style={{
//           marginTop: 12, padding: '10px 16px',
//           background: `${CYAN}0a`, border: `1px solid ${CYAN}33`,
//           borderRadius: 10, fontSize: 13,
//           display: 'flex', alignItems: 'center', gap: 8,
//           color: '#006a8e',
//         }}>
//           <CheckCircle size={14} color={CYAN} />
//           <span>
//             <strong>{enabledDays.length}</strong> day{enabledDays.length > 1 ? 's' : ''} active ·{' '}
//             <strong>{availability?.reduce((n, d) => n + (d.slots?.length || 0), 0)}</strong> total slots
//           </span>
//           <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8aa0ad' }}>
//             {enabledDays.map(d => DAY_SHORT[d]).join(', ')}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  Main MentorProfile
// // ─────────────────────────────────────────────────────────────────────────────
// const MentorProfile = () => {
//   const [isEditing, setIsEditing]   = useState(false);
//   const [activeTab, setActiveTab]   = useState('Overview');
//   const [showMore, setShowMore]     = useState(false);
//   const [liked, setLiked]           = useState(false);

//   const [formData, setFormData] = useState({
//     availability: DAYS.map(d => ({ day: d, slots: [] })),
//   });
//   const [email, setEmail] = useState('');
//   const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

//   const resumeRef    = useRef(null);
//   const portfolioRef = useRef(null);
//   const videoRef     = useRef(null);

//   const [getMentorDetails,    { data, isLoading, error }] = useGetMentorDetailsMutation();
//   const [updateMentorDetails, { isLoading: isUpdating }]  = useUpdateMentorDetailsMutation();

//   useEffect(() => {
//     const ud = localStorage.getItem('userData');
//     if (ud) { try { setEmail(JSON.parse(ud).email); } catch {} }
//   }, []);

//   useEffect(() => { if (email) getMentorDetails(email); }, [email, getMentorDetails]);

//   useEffect(() => {
//     if (data?.data) {
//       const merged = DAYS.map(d => {
//         const ex = data.data.availability?.find(a => a.day === d);
//         return { day: d, slots: ex?.slots || [] };
//       });
//       setFormData({ ...data.data, availability: merged });
//     }
//   }, [data]);

//   const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

//   const handleSave = async () => {
//     try {
//       await updateMentorDetails({ email, ...formData }).unwrap();
//       await getMentorDetails(email);
//       setIsEditing(false);
//       setFiles({ resume: null, portfolio: null, video: null });
//       showToast('Profile updated successfully!', 'success');
//     } catch { showToast('Failed to update profile.'); }
//   };

//   const handleCancel = () => {
//     if (data?.data) {
//       const merged = DAYS.map(d => {
//         const ex = data.data.availability?.find(a => a.day === d);
//         return { day: d, slots: ex?.slots || [] };
//       });
//       setFormData({ ...data.data, availability: merged });
//     }
//     setFiles({ resume: null, portfolio: null, video: null });
//     setIsEditing(false);
//   };

//   const addSlot = (di) => setFormData(p => {
//     const a = [...p.availability];
//     a[di] = { ...a[di], slots: [...(a[di].slots || []), { startTime: '09:00', endTime: '10:00', isBooked: false }] };
//     return { ...p, availability: a };
//   });
//   const removeSlot = (di, si) => setFormData(p => {
//     const a = [...p.availability];
//     a[di].slots = a[di].slots.filter((_, i) => i !== si);
//     return { ...p, availability: a };
//   });
//   const updateSlot = (di, si, f, v) => setFormData(p => {
//     const a = [...p.availability];
//     a[di].slots[si][f] = v;
//     return { ...p, availability: a };
//   });

//   const skills = formData.currentSkills ? formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
//   const areas  = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean) : [];
//   const bio    = formData.whyMentor || '';
//   const bioShort = bio.length > 160 ? bio.slice(0, 160) + '…' : bio;

//   // ── Loading ───────────────────────────────────────────────────────────────
//   if (isLoading) return (
//     <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
//       <div style={{ background: '#fff', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
//         <Loader2 size={36} style={{ color: CYAN, animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
//         <p style={{ color: '#8aa0ad', fontSize: 15 }}>Loading profile…</p>
//       </div>
//     </div>
//   );

//   if (error || !formData || Object.keys(formData).length < 2) return (
//     <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
//       <div style={{ background: '#fff', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
//         <X size={36} style={{ color: '#f87171', margin: '0 auto 16px' }} />
//         <p style={{ color: '#8aa0ad', fontSize: 15 }}>Failed to load profile. Please refresh.</p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//         .tab-btn:hover { color: #0f2030 !important; }
//         .action-hover:hover { opacity: 0.88; transform: translateY(-1px); }
//         input[type="time"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
//         ::-webkit-scrollbar { width: 4px; height: 4px; }
//         ::-webkit-scrollbar-track { background: #f3f7fa; }
//         ::-webkit-scrollbar-thumb { background: #c5d5dd; border-radius: 4px; }
//       `}</style>

//       <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#f3f7fa', display: 'flex', flexDirection: 'column' }}>

//         {/* ═══ BANNER ═══════════════════════════════════════════════════════ */}
//         <div style={{
//           height: 180, position: 'relative', overflow: 'hidden', flexShrink: 0,
//           background: `linear-gradient(135deg, ${DARK} 0%, #0d3a52 60%, #063550 100%)`,
//         }}>
//           {/* geometric accents */}
//           <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//             {[['-10%','60%',200],['20%','80%',120],['60%','-5%',160],['75%','40%',90]].map(([t,l,s],i) => (
//               <div key={i} style={{
//                 position: 'absolute', top: t, left: l,
//                 width: s, height: s, borderRadius: '50%',
//                 border: '1.5px solid rgba(0,152,204,0.18)',
//               }} />
//             ))}
//             <div style={{
//               position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
//               background: 'linear-gradient(to top, rgba(243,247,250,0.12), transparent)',
//             }} />
//           </div>

//           {/* Edit / Save / Cancel buttons */}
//           <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 10 }}>
//             {!isEditing ? (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="action-hover"
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 6,
//                   padding: '8px 18px', borderRadius: 12,
//                   border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.12)',
//                   color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
//                   transition: 'all 0.18s', backdropFilter: 'blur(8px)',
//                 }}
//               >
//                 <Pencil size={13} /> Edit Profile
//               </button>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave} disabled={isUpdating}
//                   className="action-hover"
//                   style={{
//                     display: 'flex', alignItems: 'center', gap: 6,
//                     padding: '8px 18px', borderRadius: 12,
//                     border: 'none', background: CYAN,
//                     color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
//                     transition: 'all 0.18s', opacity: isUpdating ? 0.6 : 1,
//                   }}
//                 >
//                   {isUpdating ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={13} />}
//                   {isUpdating ? 'Saving…' : 'Save Changes'}
//                 </button>
//                 <button
//                   onClick={handleCancel} disabled={isUpdating}
//                   style={{
//                     display: 'flex', alignItems: 'center', gap: 6,
//                     padding: '8px 16px', borderRadius: 12,
//                     border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.08)',
//                     color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
//                     transition: 'all 0.18s', backdropFilter: 'blur(8px)',
//                   }}
//                 >
//                   <X size={13} /> Cancel
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ═══ AVATAR ════════════════════════════════════════════════════════ */}
//         <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', marginTop: -52, pointerEvents: 'none' }}>
//           <div style={{
//             width: 96, height: 96, borderRadius: '50%',
//             border: '4px solid #fff', background: `linear-gradient(135deg,${CYAN}33,${DARK}33)`,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 34, fontWeight: 800, color: CYAN,
//           }}>
//             {formData.fullName?.charAt(0)?.toUpperCase() || '?'}
//           </div>
//         </div>

//         {/* ═══ BODY ═══════════════════════════════════════════════════════════ */}
//         <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

//           {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
//           <aside style={{
//             width: 280, flexShrink: 0, background: '#fff',
//             borderRight: '1px solid #e8f0f4',
//             padding: '16px 20px 32px', overflowY: 'auto',
//             display: 'flex', flexDirection: 'column', gap: 18,
//           }}>
//             {/* Name + Role */}
//             <div style={{ marginTop: 8 }}>
//               {isEditing
//                 ? <EditField value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} placeholder="Current Role" className="text-sm mb-2" />
//                 : <p style={{ fontSize: 12, color: '#8aa0ad', fontWeight: 600, marginBottom: 4, letterSpacing: '0.3px' }}>{formData.currentRole || 'Mentor'}</p>
//               }
//               {isEditing
//                 ? <EditField value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" className="font-bold text-base mt-1" />
//                 : <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: '#0f2030', lineHeight: 1.15 }}>
//                     {formData.fullName || 'Your Name'}
//                   </h1>
//               }
//               <p style={{ fontSize: 11, color: '#b0c4cc', marginTop: 4 }}>
//                 Member since {formatDate(formData.createdAt)}
//               </p>
//             </div>

//             {/* Location */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <MapPin size={13} color={CYAN} style={{ flexShrink: 0 }} />
//               {isEditing
//                 ? <EditField value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
//                 : <span style={{ fontSize: 13, color: '#4a6b7a', fontWeight: 500 }}>{formData.location || 'Not set'}</span>
//               }
//             </div>

//             {/* Rating */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//               <Star size={14} fill={CYAN} style={{ color: CYAN }} />
//               <span style={{ fontSize: 15, fontWeight: 700, color: '#0f2030' }}>
//                 {formData.rating || '0.0'}
//               </span>
//               <span style={{ fontSize: 12, color: '#8aa0ad' }}>
//                 ({formData.reviewCount || 0} reviews)
//               </span>
//             </div>

//             {/* Stats grid */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//               <StatCard icon={<TrendingUp size={11} />} label="Sessions" value={formData.completedBookings || 0} />
//               <StatCard icon={<DollarSign size={11} />} label="Earnings" value={`$${formData.totalEarnings || '0'}`} />
//               <StatCard icon={<Users size={11} />} label="Mentees" value={formData.totalMentees || 0} />
//               <StatCard icon={<Zap size={11} />} label="Rate" value={`₹${formData.hourlyRate || '0'}`} />
//             </div>

//             {/* Bio snippet */}
//             <div style={{ fontSize: 13, color: '#4a6b7a', lineHeight: 1.65 }}>
//               {showMore ? bio : bioShort}
//               {bio.length > 160 && (
//                 <button onClick={() => setShowMore(!showMore)}
//                   style={{
//                     display: 'flex', alignItems: 'center', gap: 4,
//                     marginTop: 4, fontSize: 12, fontWeight: 700,
//                     color: CYAN, background: 'none', border: 'none', cursor: 'pointer',
//                   }}>
//                   {showMore ? <><ChevronUp size={11} />Show less</> : <><ChevronDown size={11} />Show more</>}
//                 </button>
//               )}
//             </div>

//             {/* Price card */}
//             <div style={{
//               borderRadius: 16, padding: '14px 16px',
//               background: `linear-gradient(135deg,${DARK},#0d3a52)`,
//               color: '#fff',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
//                 <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800 }}>
//                   ₹{formData.hourlyRate || '0'}
//                 </span>
//                 {isEditing
//                   ? <EditField value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)}
//                       placeholder="e.g. 45-min Session"
//                       className="text-sm bg-transparent border-white/30 text-white placeholder-white/40 w-28" />
//                   : <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{formData.sessionDuration || '45-min Session'}</span>
//                 }
//               </div>
//               <button style={{
//                 marginTop: 12, width: '100%', padding: '10px',
//                 borderRadius: 10, border: 'none', background: CYAN,
//                 color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
//                 transition: 'opacity 0.15s',
//               }}>
//                 Contact Me
//               </button>
//             </div>

//             {/* Save / Like / Share */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//               <button onClick={() => setLiked(!liked)}
//                 style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: liked ? '#f87171' : '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}>
//                 <Heart size={14} fill={liked ? '#f87171' : 'none'} />
//                 {liked ? 'Saved' : 'Save'}
//               </button>
//               <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer' }}>
//                 <Share2 size={14} /> Share
//               </button>
//             </div>

//             {/* LinkedIn */}
//             <div style={{ borderTop: '1px solid #e8f0f4', paddingTop: 14 }}>
//               {isEditing ? (
//                 <div>
//                   <p style={{ fontSize: 11, fontWeight: 700, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>LinkedIn URL</p>
//                   <EditField value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" />
//                 </div>
//               ) : formData.linkedinUrl ? (
//                 <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer"
//                   style={{ fontSize: 13, fontWeight: 600, color: CYAN, display: 'block', textDecoration: 'underline', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {formData.linkedinUrl}
//                 </a>
//               ) : null}
//             </div>
//           </aside>

//           {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: 0 }}>

//             {/* Tab strip */}
//             <div style={{
//               borderBottom: '1px solid #e8f0f4', background: '#fff',
//               padding: '0 28px', position: 'sticky', top: 0, zIndex: 10,
//               display: 'flex', gap: 0, overflowX: 'auto',
//             }}>
//               {TABS.map(tab => (
//                 <button
//                   key={tab}
//                   className="tab-btn"
//                   onClick={() => setActiveTab(tab)}
//                   style={{
//                     padding: '14px 20px',
//                     fontSize: 13, fontWeight: activeTab === tab ? 800 : 600,
//                     color: activeTab === tab ? '#0f2030' : '#8aa0ad',
//                     borderBottom: activeTab === tab ? `2.5px solid ${CYAN}` : '2.5px solid transparent',
//                     background: 'none', border: 'none',
//                     borderBottomWidth: 2.5,
//                     borderBottomStyle: 'solid',
//                     borderBottomColor: activeTab === tab ? CYAN : 'transparent',
//                     cursor: 'pointer', whiteSpace: 'nowrap',
//                     transition: 'all 0.15s', marginBottom: -1,
//                   }}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Tab content */}
//             <div style={{ padding: '28px 28px 48px', animation: 'fadeUp 0.3s ease both' }}>

//               {/* ── OVERVIEW ────────────────────────────────────────────── */}
//               {activeTab === 'Overview' && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
//                   <section>
//                     <SectionHead>
//                       <Award size={18} color={CYAN} />
//                       About <span style={{ color: CYAN }}>{formData.fullName || 'Mentor'}</span>
//                     </SectionHead>
//                     {isEditing
//                       ? <EditField value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)}
//                           placeholder="Share your professional journey and mentoring goals…" multiline />
//                       : <p style={{ fontSize: 14, color: '#4a6b7a', lineHeight: 1.75 }}>
//                           {formData.whyMentor || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>No bio provided.</span>}
//                         </p>
//                     }
//                   </section>

//                   <section>
//                     <SectionHead>
//                       <BookOpen size={18} color={CYAN} />
//                       Mentorship Expertise
//                     </SectionHead>
//                     {isEditing
//                       ? <EditField value={formData.currentSkills || ''} onChange={e => set('currentSkills', e.target.value)}
//                           placeholder="React, Node.js, Python… (comma-separated)" multiline />
//                       : skills.length > 0
//                         ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//                             {skills.map((s, i) => <Pill key={i} label={s} />)}
//                           </div>
//                         : <p style={{ fontSize: 13, color: '#b0c4cc', fontStyle: 'italic' }}>No skills listed.</p>
//                     }
//                   </section>

//                   <section>
//                     <SectionHead>
//                       <CheckCircle size={18} color={CYAN} />
//                       Work History & Feedback
//                     </SectionHead>
//                     <div style={{
//                       background: `${CYAN}08`, border: `1px solid ${CYAN}25`,
//                       borderRadius: 14, padding: '16px 20px',
//                       fontSize: 14, color: '#4a6b7a',
//                     }}>
//                       {formData.completedBookings > 0
//                         ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}`
//                         : 'Be the first to book a session with this mentor.'}
//                     </div>
//                   </section>
//                 </div>
//               )}

//               {/* ── MENTORSHIP TOPICS ───────────────────────────────────── */}
//               {activeTab === 'Mentorship Topics' && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
//                   <section>
//                     <SectionHead>
//                       <Zap size={18} color={CYAN} />
//                       Areas of Interest
//                     </SectionHead>
//                     {isEditing
//                       ? <EditField value={formData.areasOfInterest || ''} onChange={e => set('areasOfInterest', e.target.value)}
//                           placeholder="Web Development, Cloud, DevOps… (comma-separated)" multiline />
//                       : areas.length > 0
//                         ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
//                             {areas.map((a, i) => <Pill key={i} label={a} />)}
//                           </div>
//                         : <p style={{ fontSize: 13, color: '#b0c4cc', fontStyle: 'italic' }}>No topics listed.</p>
//                     }
//                   </section>

//                   <section>
//                     <SectionHead>
//                       <BookOpen size={18} color={CYAN} />
//                       Mentoring Style
//                     </SectionHead>
//                     {isEditing
//                       ? <EditField value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)}
//                           placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
//                       : <p style={{
//                           fontSize: 14, color: '#1e3a4a',
//                           padding: '12px 16px', background: '#f8fbfd',
//                           border: '1px solid #e2eef3', borderRadius: 12,
//                         }}>
//                           {formData.mentoringStyle || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>Not set</span>}
//                         </p>
//                     }
//                   </section>
//                 </div>
//               )}

//               {/* ── EXPERIENCE ──────────────────────────────────────────── */}
//               {activeTab === 'Experience' && (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
//                   <section>
//                     <SectionHead>
//                       <Briefcase size={18} color={CYAN} />
//                       Professional Experience
//                     </SectionHead>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
//                       {[
//                         { label: 'Company',             field: 'companyName' },
//                         { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
//                         { label: 'Highest Degree',      field: 'highestDegree' },
//                         { label: 'Field of Study',      field: 'fieldOfStudy' },
//                         { label: 'Institution',         field: 'schoolName' },
//                       ].map(({ label, field, type }) => (
//                         <InfoRow key={field} label={label} field={field} type={type}
//                           formData={formData} set={set} isEditing={isEditing} />
//                       ))}
//                     </div>
//                   </section>

//                   {/* ── WEEKLY AVAILABILITY with checkboxes ─────────────── */}
//                   <section>
//                     <SectionHead>
//                       <Calendar size={18} color={CYAN} />
//                       Weekly Availability
//                     </SectionHead>

//                     {/* Helper text when editing */}
//                     {isEditing && (
//                       <div style={{
//                         display: 'flex', alignItems: 'flex-start', gap: 10,
//                         background: `${CYAN}0a`, border: `1px solid ${CYAN}30`,
//                         borderRadius: 12, padding: '10px 14px',
//                         marginBottom: 16, fontSize: 13, color: '#006a8e',
//                         lineHeight: 1.55,
//                       }}>
//                         <CheckCircle size={14} color={CYAN} style={{ marginTop: 1, flexShrink: 0 }} />
//                         <span>
//                           Use <strong>Select All Days</strong> to enable every day, or tick individual days. Then add time slots per day.
//                         </span>
//                       </div>
//                     )}

//                     <WeeklyAvailability
//                       availability={formData.availability}
//                       isEditing={isEditing}
//                       addSlot={addSlot}
//                       removeSlot={removeSlot}
//                       updateSlot={updateSlot}
//                       setFormData={setFormData}
//                     />
//                   </section>
//                 </div>
//               )}

//               {/* ── CASE STUDIES ────────────────────────────────────────── */}
//               {activeTab === 'Case Studies' && (
//                 <div>
//                   <SectionHead>
//                     <FileText size={18} color={CYAN} />
//                     Case Studies & Documents
//                   </SectionHead>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                     {[
//                       { label: 'Resume / CV',   field: 'resumeLink',    accept: '.pdf,.doc,.docx', ref: resumeRef },
//                       { label: 'Portfolio',      field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
//                       { label: 'Video Intro',    field: 'videoLink',     accept: 'video/*',          ref: videoRef },
//                     ].map(({ label, field, accept, ref }) => (
//                       <div
//                         key={field}
//                         style={{
//                           border: '1px solid #e8f0f4', borderRadius: 16,
//                           padding: '16px 20px', background: '#fff',
//                           boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
//                         }}
//                       >
//                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isEditing ? 12 : 0 }}>
//                           <p style={{ fontSize: 15, fontWeight: 700, color: '#0f2030' }}>{label}</p>
//                           {!isEditing && formData[field] && (
//                             <a href={formData[field]} target="_blank" rel="noopener noreferrer"
//                               style={{
//                                 display: 'flex', alignItems: 'center', gap: 6,
//                                 fontSize: 12, fontWeight: 700,
//                                 padding: '5px 14px', borderRadius: 20,
//                                 border: `1.5px solid ${CYAN}`,
//                                 color: CYAN, textDecoration: 'none',
//                               }}>
//                               <Eye size={12} /> View
//                             </a>
//                           )}
//                           {!isEditing && !formData[field] && (
//                             <span style={{ fontSize: 13, color: '#b0c4cc', fontStyle: 'italic' }}>Not uploaded</span>
//                           )}
//                         </div>
//                         {isEditing && (
//                           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                             <input ref={ref} type="file" accept={accept}
//                               style={{ display: 'none' }} id={`f-${field}`}
//                               onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link','')]: f })); }} />
//                             <label htmlFor={`f-${field}`}
//                               style={{
//                                 display: 'flex', alignItems: 'center', gap: 8,
//                                 padding: '10px 14px',
//                                 border: `2px dashed ${CYAN}44`,
//                                 borderRadius: 12, cursor: 'pointer',
//                                 fontSize: 13, color: '#8aa0ad',
//                                 transition: 'all 0.15s',
//                               }}>
//                               <Upload size={14} color={CYAN} /> Upload file
//                             </label>
//                             <EditField value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MentorProfile;



import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Star, Heart, Share2,
  ChevronDown, ChevronUp, Pencil, Save, X, Plus,
  Trash2, Loader2, Upload, Eye, CheckCircle,
  Clock, Calendar, Briefcase, BookOpen, Award, FileText,
  TrendingUp, Users, DollarSign, Zap, Globe, Phone, Mail,
} from 'lucide-react';
import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";
import { showToast } from '../../../utils/Toastprovider';

const CYAN = '#0098cc';
const DARK = '#062117';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };
const TABS = ['Overview', 'Case Studies', 'Mentorship Topics', 'Experience'];
const FONT = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;

const formatDate = (ds) => {
  if (!ds) return 'N/A';
  return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Tick = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6.5L4.5 9.5L10 3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckBox = ({ checked, indeterminate, size = 20, onClick }) => {
  const active = checked || indeterminate;
  return (
    <span onClick={e => { e.stopPropagation(); onClick?.(); }} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, cursor: 'pointer', width: size, height: size,
      borderRadius: Math.round(size * 0.25),
      border: `2px solid ${active ? CYAN : '#c5d5dd'}`,
      background: active ? CYAN : '#f8fafc',
      transition: 'all 0.15s',
    }}>
      {indeterminate && !checked
        ? <span style={{ width: size * 0.45, height: 2, background: '#fff', borderRadius: 2, display: 'block' }} />
        : checked ? <Tick size={size * 0.6} /> : null}
    </span>
  );
};

const EditField = ({ value, onChange, placeholder, multiline, type = 'text' }) => {
  const base = {
    fontFamily: FONT, width: '100%', padding: '10px 14px',
    border: '1.5px solid #d1dde3', borderRadius: 8,
    fontSize: 14, color: '#1a2e3b', background: '#fff',
    outline: 'none', boxSizing: 'border-box', lineHeight: 1.5,
  };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4} style={{ ...base, resize: 'none' }} />
    : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />;
};

const Pill = ({ label }) => (
  <span style={{
    fontFamily: FONT, display: 'inline-flex', alignItems: 'center',
    padding: '5px 14px', borderRadius: 20,
    fontSize: 13, fontWeight: 500,
    background: `${CYAN}12`, border: `1px solid ${CYAN}30`, color: '#006a8e',
  }}>{label}</span>
);

const StatCard = ({ icon, label, value, accent }) => (
  <div style={{
    background: '#f8fbfd', border: '1px solid #e2eef3',
    borderRadius: 10, padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    <div style={{
      width: 42, height: 42, borderRadius: 9, flexShrink: 0,
      background: accent ? `${accent}15` : `${CYAN}12`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {React.cloneElement(icon, { size: 19, color: accent || CYAN })}
    </div>
    <div>
      <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 3px' }}>{label}</p>
      <p style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: '#0f2030', margin: 0, lineHeight: 1 }}>{value}</p>
    </div>
  </div>
);

const SectionHead = ({ children }) => (
  <h2 style={{
    fontFamily: FONT, fontSize: 16, fontWeight: 700, color: '#0f2030',
    margin: '0 0 18px', paddingBottom: 12,
    borderBottom: '2px solid #f0f5f8',
    display: 'flex', alignItems: 'center', gap: 9,
  }}>{children}</h2>
);

const InfoCard = ({ label, value, isEditing, field, formData, set, type }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{label}</p>
    {isEditing
      ? <EditField type={type || 'text'} value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder={label} />
      : <p style={{
        fontFamily: FONT, fontSize: 14, fontWeight: 600, color: '#1e3a4a',
        padding: '10px 14px', background: '#f8fbfd',
        border: '1px solid #e8f0f4', borderRadius: 8,
        minHeight: 42, display: 'flex', alignItems: 'center', margin: 0,
      }}>
        {formData[field] || '—'}
      </p>
    }
  </div>
);

const ContactRow = ({ icon, value }) => (
  value ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 7, background: '#f0f5f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {React.cloneElement(icon, { size: 15, color: '#8aa0ad' })}
      </div>
      <span style={{ fontFamily: FONT, fontSize: 13, color: '#4a6b7a', fontWeight: 500 }}>{value}</span>
    </div>
  ) : null
);

// ─── Weekly Availability ──────────────────────────────────────
const WeeklyAvailability = ({ availability, isEditing, addSlot, removeSlot, updateSlot, setFormData }) => {
  const [enabled, setEnabled] = useState(() =>
    DAYS.reduce((acc, d) => {
      acc[d] = !!(availability?.find(a => a.day === d)?.slots?.length);
      return acc;
    }, {})
  );

  const enabledDays = DAYS.filter(d => enabled[d]);
  const allEnabled = enabledDays.length === DAYS.length;
  const someEnabled = enabledDays.length > 0 && !allEnabled;

  const toggleDay = (day) => {
    if (!isEditing) return;
    const di = DAYS.indexOf(day);
    const next = !enabled[day];
    setEnabled(p => ({ ...p, [day]: next }));
    if (!next) {
      setFormData(p => { const a = [...p.availability]; a[di] = { ...a[di], slots: [] }; return { ...p, availability: a }; });
    } else if (!availability?.[di]?.slots?.length) { addSlot(di); }
  };

  const toggleAll = () => {
    if (!isEditing) return;
    const next = !allEnabled;
    setEnabled(DAYS.reduce((acc, d) => { acc[d] = next; return acc; }, {}));
    if (!next) {
      setFormData(p => ({ ...p, availability: p.availability.map(d => ({ ...d, slots: [] })) }));
    } else {
      DAYS.forEach((day, di) => { if (!availability?.[di]?.slots?.length) addSlot(di); });
    }
  };

  return (
    <div>
      {isEditing && (
        <div onClick={toggleAll} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 18px', marginBottom: 14, cursor: 'pointer', userSelect: 'none',
          border: `1.5px solid ${allEnabled ? CYAN : someEnabled ? `${CYAN}55` : '#e2eef3'}`,
          borderRadius: 10, background: allEnabled ? `${CYAN}08` : '#f8fbfd',
          transition: 'all 0.15s',
        }}>
          <CheckBox checked={allEnabled} indeterminate={someEnabled} size={22} onClick={toggleAll} />
          <Calendar size={15} color={CYAN} />
          <span style={{ fontFamily: FONT, flex: 1, fontWeight: 700, fontSize: 14, color: '#0f2030' }}>
            Select All Days
            <span style={{ fontWeight: 400, fontSize: 12, color: '#8aa0ad', marginLeft: 8 }}>(Monday – Sunday)</span>
          </span>
          <span style={{
            fontFamily: FONT, padding: '4px 12px', borderRadius: 20,
            fontSize: 11, fontWeight: 700,
            border: `1px solid ${allEnabled || someEnabled ? CYAN : '#c5d5dd'}`,
            background: allEnabled ? CYAN : 'transparent',
            color: allEnabled ? '#fff' : CYAN,
          }}>
            {allEnabled ? '✓ All 7 days' : someEnabled ? `${enabledDays.length} / 7` : 'None'}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 10 }}>
        {availability?.map((day, di) => {
          const isEnabled = enabled[day.day];
          const hasSlots = day.slots?.length > 0;
          return (
            <div key={day.day} style={{
              border: `1px solid ${isEnabled || hasSlots ? `${CYAN}40` : '#e8f0f4'}`,
              borderRadius: 10, overflow: 'hidden',
              opacity: isEditing && !isEnabled ? 0.5 : 1,
              transition: 'all 0.15s',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: isEnabled || hasSlots ? `${CYAN}06` : '#fafcfd',
                borderBottom: hasSlots || (isEditing && isEnabled) ? `1px solid ${CYAN}18` : 'none',
              }}>
                {isEditing && <CheckBox checked={isEnabled} size={18} onClick={() => toggleDay(day.day)} />}
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: isEnabled || hasSlots ? CYAN : '#d1dde3' }} />
                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, flex: 1, color: isEnabled || hasSlots ? '#0f2030' : '#8aa0ad' }}>
                  {day.day}
                </span>
                {hasSlots && (
                  <span style={{ fontFamily: FONT, padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: CYAN, color: '#fff' }}>
                    {day.slots.length} slot{day.slots.length > 1 ? 's' : ''}
                  </span>
                )}
                {isEditing && isEnabled && (
                  <button onClick={() => addSlot(di)} style={{
                    fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4,
                    fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 6,
                    border: `1px solid ${CYAN}`, background: 'transparent', color: CYAN, cursor: 'pointer',
                  }}>
                    <Plus size={11} /> Add
                  </button>
                )}
              </div>

              {(hasSlots || (isEditing && isEnabled)) && (
                <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: 7, background: '#fff' }}>
                  {!hasSlots && isEditing && isEnabled && (
                    <span style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', fontStyle: 'italic' }}>Click "Add" to add slots</span>
                  )}
                  {day.slots?.map((slot, si) => (
                    <div key={si} style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      background: isEditing ? '#f8fbfd' : `${CYAN}08`,
                      border: `1px solid ${isEditing ? '#e2eef3' : `${CYAN}25`}`,
                      borderRadius: 8, padding: '7px 11px',
                    }}>
                      <Clock size={12} color={CYAN} />
                      {isEditing ? (
                        <>
                          <input type="time" value={slot.startTime}
                            onChange={e => updateSlot(di, si, 'startTime', e.target.value)}
                            style={{ fontFamily: FONT, fontSize: 13, border: '1px solid #d1dde3', borderRadius: 6, padding: '4px 8px', outline: 'none', color: '#0f2030', background: '#fff' }} />
                          <span style={{ color: CYAN, fontWeight: 700 }}>→</span>
                          <input type="time" value={slot.endTime}
                            onChange={e => updateSlot(di, si, 'endTime', e.target.value)}
                            style={{ fontFamily: FONT, fontSize: 13, border: '1px solid #d1dde3', borderRadius: 6, padding: '4px 8px', outline: 'none', color: '#0f2030', background: '#fff' }} />
                          <button onClick={() => removeSlot(di, si)} style={{
                            background: '#fff0f0', border: '1px solid #fca5a5', color: '#ef4444',
                            borderRadius: 5, padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                          }}><Trash2 size={11} /></button>
                        </>
                      ) : (
                        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#1e3a4a' }}>{slot.startTime} — {slot.endTime}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditing && enabledDays.length > 0 && (
        <div style={{
          marginTop: 12, padding: '10px 16px',
          background: `${CYAN}07`, border: `1px solid ${CYAN}25`,
          borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
          color: '#006a8e', fontFamily: FONT,
        }}>
          <CheckCircle size={14} color={CYAN} />
          <strong>{enabledDays.length}</strong>&nbsp;day{enabledDays.length > 1 ? 's' : ''} active ·&nbsp;
          <strong>{availability?.reduce((n, d) => n + (d.slots?.length || 0), 0)}</strong>&nbsp;total slots
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8aa0ad' }}>{enabledDays.map(d => DAY_SHORT[d]).join(', ')}</span>
        </div>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────
//  MentorProfile — Main Component
// ─────────────────────────────────────────────────────────────
const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);

  const [formData, setFormData] = useState({
    availability: DAYS.map(d => ({ day: d, slots: [] })),
  });
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState({ resume: null, portfolio: null, video: null });

  const resumeRef = useRef(null);
  const portfolioRef = useRef(null);
  const videoRef = useRef(null);

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

  useEffect(() => {
    const ud = localStorage.getItem('userData');
    if (ud) { try { setEmail(JSON.parse(ud).email); } catch { } }
  }, []);

  useEffect(() => { if (email) getMentorDetails(email); }, [email, getMentorDetails]);

  useEffect(() => {
    if (data?.data) {
      const merged = DAYS.map(d => {
        const ex = data.data.availability?.find(a => a.day === d);
        return { day: d, slots: ex?.slots || [] };
      });
      setFormData({ ...data.data, availability: merged });
    }
  }, [data]);

  const set = (f, v) => setFormData(p => ({ ...p, [f]: v }));

  const handleSave = async () => {
    try {
      await updateMentorDetails({ email, ...formData }).unwrap();
      await getMentorDetails(email);
      setIsEditing(false);
      setFiles({ resume: null, portfolio: null, video: null });
      showToast('Profile updated successfully!', 'success');
    } catch { showToast('Failed to update profile.'); }
  };

  const handleCancel = () => {
    if (data?.data) {
      const merged = DAYS.map(d => {
        const ex = data.data.availability?.find(a => a.day === d);
        return { day: d, slots: ex?.slots || [] };
      });
      setFormData({ ...data.data, availability: merged });
    }
    setFiles({ resume: null, portfolio: null, video: null });
    setIsEditing(false);
  };

  const addSlot = (di) => setFormData(p => { const a = [...p.availability]; a[di] = { ...a[di], slots: [...(a[di].slots || []), { startTime: '09:00', endTime: '10:00', isBooked: false }] }; return { ...p, availability: a }; });
  const removeSlot = (di, si) => setFormData(p => { const a = [...p.availability]; a[di].slots = a[di].slots.filter((_, i) => i !== si); return { ...p, availability: a }; });
  const updateSlot = (di, si, f, v) => setFormData(p => { const a = [...p.availability]; a[di].slots[si][f] = v; return { ...p, availability: a }; });

  const skills = formData.currentSkills ? formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const areas = formData.areasOfInterest ? formData.areasOfInterest.split(',').map(s => s.trim()).filter(Boolean) : [];
  const bio = formData.whyMentor || '';
  const bioShort = bio.length > 180 ? bio.slice(0, 180) + '…' : bio;

  if (isLoading) return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '56px 64px', textAlign: 'center', border: '1px solid #e2eef3' }}>
        <Loader2 size={36} style={{ color: CYAN, animation: 'spin 1s linear infinite', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: '#8aa0ad', fontSize: 15, margin: 0 }}>Loading profile…</p>
      </div>
    </div>
  );

  if (error || !formData || Object.keys(formData).length < 2) return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f7fa' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '56px 64px', textAlign: 'center', border: '1px solid #e2eef3' }}>
        <X size={36} style={{ color: '#f87171', margin: '0 auto 16px', display: 'block' }} />
        <p style={{ color: '#8aa0ad', fontSize: 15, margin: 0 }}>Failed to load profile. Please refresh.</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        * { font-family:${FONT}; -webkit-font-smoothing:antialiased; box-sizing:border-box; }
        input[type="time"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#f3f7fa; }
        ::-webkit-scrollbar-thumb { background:#c5d5dd; border-radius:4px; }
        .tab-btn:hover { color:#0f2030 !important; }
        .edit-btn:hover { opacity:0.85; }
        textarea::placeholder, input::placeholder { color:#a0b4bd; }
      `}</style>

      <div style={{ fontFamily: FONT, minHeight: '100vh', background: '#f3f7fa', display: 'flex', flexDirection: 'column' }}>

        {/* ══ BANNER ══════════════════════════════════════════════ */}
        <div style={{
          height: 140, position: 'relative', overflow: 'hidden', flexShrink: 0,
          background: `linear-gradient(135deg, ${DARK} 0%, #0d3a52 55%, #063550 100%)`,
        }}>
          {/* {[['-8%','62%',210],['18%','82%',115],['58%','-4%',155],['72%','42%',88]].map(([t,l,s],i) => (
            <div key={i} style={{
              position:'absolute', top:t, left:l, width:s, height:s,
              borderRadius:'50%', border:'1.5px solid rgba(0,152,204,0.14)', pointerEvents:'none',
            }} />
          ))} */}
          <div style={{ position: 'absolute', top: 20, right: 22, display: 'flex', gap: 10, zIndex: 10 }}>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn" style={{
                fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                padding: '10px 22px', borderRadius: 8,
                border: '1.5px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                <Pencil size={15} /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleSave} disabled={isUpdating} className="edit-btn" style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 22px', borderRadius: 8, border: 'none', background: CYAN,
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: isUpdating ? 0.6 : 1,
                }}>
                  {isUpdating ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={15} />}
                  {isUpdating ? 'Saving…' : 'Save Changes'}
                </button>
                <button onClick={handleCancel} disabled={isUpdating} style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', borderRadius: 8,
                  border: '1.5px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>
                  <X size={15} /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* ══ AVATAR ══════════════════════════════════════════════ */}
        <div style={{ padding: '0 28px', marginTop: -56, position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{
            width: 108, height: 108, borderRadius: '50%',
            border: '4px solid #f3f7fa', background: `linear-gradient(135deg,${CYAN}25,${DARK}25)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 38, fontWeight: 700, color: CYAN,
          }}>
            {formData.fullName?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>

        {/* ══ BODY ════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <aside style={{
            width: 308, flexShrink: 0, background: '#fff',
            borderRight: '1px solid #e8f0f4',
            padding: '18px 22px 40px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>

            {/* Name / Role */}
            <div style={{ marginTop: 8 }}>
              {isEditing
                ? <div style={{ marginBottom: 8 }}><EditField value={formData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} placeholder="Current Role" /></div>
                : <p style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad', fontWeight: 500, margin: '0 0 4px' }}>{formData.currentRole || 'Mentor'}</p>
              }
              {isEditing
                ? <EditField value={formData.fullName || ''} onChange={e => set('fullName', e.target.value)} placeholder="Full Name" />
                : <h1 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: '#0f2030', lineHeight: 1.2, margin: 0 }}>{formData.fullName || 'Your Name'}</h1>
              }
              {formData.companyName && !isEditing && (
                <p style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad', margin: '4px 0 0' }}>{formData.companyName}</p>
              )}
              <p style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', margin: '5px 0 0' }}>Member since {formatDate(formData.createdAt)}</p>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} fill={CYAN} style={{ color: CYAN }} />
              <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: '#0f2030' }}>{formData.rating || '0.0'}</span>
              <span style={{ fontFamily: FONT, fontSize: 13, color: '#8aa0ad' }}>({formData.reviewCount || 0} reviews)</span>
            </div>

            {/* Contact info */}
            {!isEditing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ContactRow icon={<MapPin />} value={formData.location} />
                <ContactRow icon={<Mail />} value={formData.email} />
                <ContactRow icon={<Phone />} value={formData.phone} />
              </div>
            )}
            {isEditing && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <EditField value={formData.location || ''} onChange={e => set('location', e.target.value)} placeholder="Location" />
                <EditField value={formData.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="Phone number" />
              </div>
            )}

            <div style={{ height: 1, background: '#e8f0f4' }} />

            {/* Stats 2×2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <StatCard icon={<TrendingUp />} label="Sessions" value={formData.completedBookings || 0} />
              <StatCard icon={<Users />} label="Mentees" value={formData.totalMentees || 0} />
              {/* <StatCard icon={} label="Earned" value={`${formData.totalEarnings || '0'}`} accent="#16a34a" /> */}
              <StatCard icon={<Clock />} label="Exp. Yrs" value={formData.yearsOfExperience || '—'} accent="#7c3aed" />
            </div>

            {/* Bio snippet */}
            <div>
              <p style={{ fontFamily: FONT, fontSize: 13, color: '#4a6b7a', lineHeight: 1.75, margin: 0 }}>
                {showMore ? bio : bioShort}
              </p>
              {bio.length > 180 && (
                <button onClick={() => setShowMore(!showMore)} style={{
                  fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 4,
                  marginTop: 6, fontSize: 12, fontWeight: 600,
                  color: CYAN, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                  {showMore ? <><ChevronUp size={12} />Show less</> : <><ChevronDown size={12} />Show more</>}
                </button>
              )}
            </div>

            <div style={{ height: 1, background: '#e8f0f4' }} />

            {/* Rate card */}
            <div style={{ borderRadius: 12, padding: '18px 20px', background: DARK, color: '#fff' }}>
              <p style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px' }}>Hourly Rate</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700 }}>₹{formData.hourlyRate || '0'}</span>
                {isEditing
                  ? <input value={formData.sessionDuration || ''} onChange={e => set('sessionDuration', e.target.value)} placeholder="e.g. 45-min" style={{ fontFamily: FONT, fontSize: 13, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '5px 10px', color: '#fff', outline: 'none', width: 100 }} />
                  : <span style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{formData.sessionDuration || 'per session'}</span>
                }
              </div>
              <button style={{ fontFamily: FONT, width: '100%', padding: '11px', borderRadius: 8, border: 'none', background: CYAN, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Contact Me
              </button>
            </div>

            {/* Actions */}
            {/* <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setLiked(!liked)} style={{ fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: liked ? '#f87171' : '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Heart size={14} fill={liked ? '#f87171' : 'none'} />{liked ? 'Saved' : 'Save'}
              </button>
              <button style={{ fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8aa0ad', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Share2 size={14} />Share
              </button>
            </div> */}

            {/* LinkedIn */}
            <div style={{ borderTop: '1px solid #e8f0f4', paddingTop: 14 }}>
              {isEditing ? (
                <div>
                  <p style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#8aa0ad', textTransform: 'uppercase', letterSpacing: '0.4px', margin: '0 0 6px' }}>LinkedIn URL</p>
                  <EditField value={formData.linkedinUrl || ''} onChange={e => set('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/…" />
                </div>
              ) : formData.linkedinUrl ? (
                <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: CYAN, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                  <Globe size={14} /> View LinkedIn Profile
                </a>
              ) : null}
            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────────── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: 0 }}>

            {/* Tab strip */}
            <div style={{
              borderBottom: '1px solid #e8f0f4', background: '#fff',
              padding: '0 28px', position: 'sticky', top: 0, zIndex: 10,
              display: 'flex', overflowX: 'auto',
            }}>
              {TABS.map(tab => (
                <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)} style={{
                  fontFamily: FONT, padding: '15px 22px',
                  fontSize: 14, fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? '#0f2030' : '#8aa0ad',
                  borderBottomWidth: 2.5, borderBottomStyle: 'solid',
                  borderBottomColor: activeTab === tab ? CYAN : 'transparent',
                  background: 'none', border: 'none',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', marginBottom: -1,
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: '30px 32px 60px', animation: 'fadeUp 0.25s ease both' }}>

              {/* ── OVERVIEW ──────────────────────────────────────── */}
              {activeTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 820 }}>
                  <section>
                    <SectionHead><Award size={17} color={CYAN} />About <span style={{ color: CYAN }}>{formData.fullName || 'Mentor'}</span></SectionHead>
                    {isEditing
                      ? <EditField value={formData.whyMentor || ''} onChange={e => set('whyMentor', e.target.value)} placeholder="Share your professional journey and mentoring goals…" multiline />
                      : <p style={{ fontFamily: FONT, fontSize: 14, color: '#4a6b7a', lineHeight: 1.85, margin: 0 }}>
                        {formData.whyMentor || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>No bio provided.</span>}
                      </p>
                    }
                  </section>

                  <section>
                    <SectionHead><BookOpen size={17} color={CYAN} />Mentorship Expertise</SectionHead>
                    {isEditing
                      ? <EditField value={formData.currentSkills || ''} onChange={e => set('currentSkills', e.target.value)} placeholder="React, Node.js, Python… (comma-separated)" multiline />
                      : skills.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} />)}</div>
                        : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No skills listed.</p>
                    }
                  </section>

                  <section>
                    <SectionHead><CheckCircle size={17} color={CYAN} />Work History &amp; Feedback</SectionHead>
                    <div style={{
                      fontFamily: FONT, background: `${CYAN}07`, border: `1px solid ${CYAN}20`,
                      borderRadius: 10, padding: '18px 22px', fontSize: 14, color: '#4a6b7a',
                    }}>
                      {formData.completedBookings > 0
                        ? `${formData.completedBookings} completed session${formData.completedBookings > 1 ? 's' : ''}.`
                        : 'Be the first to book a session with this mentor.'}
                    </div>
                  </section>
                </div>
              )}

              {/* ── MENTORSHIP TOPICS ─────────────────────────────── */}
              {activeTab === 'Mentorship Topics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 820 }}>
                  <section>
                    <SectionHead><Zap size={17} color={CYAN} />Areas of Interest</SectionHead>
                    {isEditing
                      ? <EditField value={formData.areasOfInterest || ''} onChange={e => set('areasOfInterest', e.target.value)} placeholder="Web Development, Cloud, DevOps… (comma-separated)" multiline />
                      : areas.length > 0
                        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{areas.map((a, i) => <Pill key={i} label={a} />)}</div>
                        : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No topics listed.</p>
                    }
                  </section>

                  <section>
                    <SectionHead><BookOpen size={17} color={CYAN} />Mentoring Style</SectionHead>
                    {isEditing
                      ? <EditField value={formData.mentoringStyle || ''} onChange={e => set('mentoringStyle', e.target.value)} placeholder="e.g., Collaborative, Goal-oriented, Hands-on" />
                      : <p style={{ fontFamily: FONT, fontSize: 14, color: '#1e3a4a', padding: '12px 16px', background: '#f8fbfd', border: '1px solid #e8f0f4', borderRadius: 8, margin: 0 }}>
                        {formData.mentoringStyle || <span style={{ fontStyle: 'italic', color: '#b0c4cc' }}>Not set</span>}
                      </p>
                    }
                  </section>

                  <section>
                    <SectionHead><Globe size={17} color={CYAN} />Languages</SectionHead>
                    {formData.languages?.length > 0
                      ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{formData.languages.map((l, i) => <Pill key={i} label={l} />)}</div>
                      : <p style={{ fontFamily: FONT, fontSize: 13, color: '#b0c4cc', fontStyle: 'italic', margin: 0 }}>No languages added.</p>
                    }
                  </section>
                </div>
              )}

              {/* ── EXPERIENCE ────────────────────────────────────── */}
              {activeTab === 'Experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                  <section>
                    <SectionHead><Briefcase size={17} color={CYAN} />Professional Details</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
                      {[
                        { label: 'Company', field: 'companyName' },
                        { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
                        { label: 'Mentoring Style', field: 'mentoringStyle' },
                        { label: 'Hourly Rate (₹)', field: 'hourlyRate', type: 'number' },
                      ].map(({ label, field, type }) => (
                        <InfoCard key={field} label={label} field={field} type={type} formData={formData} set={set} isEditing={isEditing} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionHead><Award size={17} color={CYAN} />Education</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
                      {[
                        { label: 'Highest Degree', field: 'highestDegree' },
                        { label: 'Field of Study', field: 'fieldOfStudy' },
                        { label: 'Institution', field: 'schoolName' },
                      ].map(({ label, field }) => (
                        <InfoCard key={field} label={label} field={field} formData={formData} set={set} isEditing={isEditing} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionHead><Calendar size={17} color={CYAN} />Weekly Availability</SectionHead>
                    {isEditing && (
                      <div style={{
                        fontFamily: FONT, display: 'flex', alignItems: 'flex-start', gap: 9,
                        background: `${CYAN}07`, border: `1px solid ${CYAN}22`,
                        borderRadius: 8, padding: '11px 15px', marginBottom: 16,
                        fontSize: 13, color: '#006a8e', lineHeight: 1.55,
                      }}>
                        <CheckCircle size={14} color={CYAN} style={{ marginTop: 1, flexShrink: 0 }} />
                        <span>Use <strong>Select All Days</strong> or tick individual days, then add time slots per day.</span>
                      </div>
                    )}
                    <WeeklyAvailability
                      availability={formData.availability}
                      isEditing={isEditing}
                      addSlot={addSlot}
                      removeSlot={removeSlot}
                      updateSlot={updateSlot}
                      setFormData={setFormData}
                    />
                  </section>
                </div>
              )}

              {/* ── CASE STUDIES ──────────────────────────────────── */}
              {activeTab === 'Case Studies' && (
                <div style={{ maxWidth: 820 }}>
                  <SectionHead><FileText size={17} color={CYAN} />Documents &amp; Media</SectionHead>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                    {[
                      { label: 'Resume / CV', field: 'resumeLink', accept: '.pdf,.doc,.docx', ref: resumeRef },
                      { label: 'Portfolio', field: 'portfolioLink', accept: '.pdf,.ppt,.pptx', ref: portfolioRef },
                      { label: 'Video Intro', field: 'videoLink', accept: 'video/*', ref: videoRef },
                    ].map(({ label, field, accept, ref }) => (
                      <div key={field} style={{
                        border: '1px solid #e8f0f4', borderRadius: 12,
                        padding: '20px 20px', background: '#fff',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: isEditing ? 14 : 0, gap: 8 }}>
                          <div>
                            <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: '#0f2030', margin: 0 }}>{label}</p>
                            {!isEditing && !formData[field] && (
                              <p style={{ fontFamily: FONT, fontSize: 12, color: '#b0c4cc', fontStyle: 'italic', margin: '4px 0 0' }}>Not uploaded</p>
                            )}
                          </div>
                          {!isEditing && formData[field] && (
                            <a href={formData[field]} target="_blank" rel="noopener noreferrer"
                              style={{
                                fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20,
                                border: `1px solid ${CYAN}`, color: CYAN, textDecoration: 'none', flexShrink: 0,
                              }}>
                              <Eye size={13} /> View
                            </a>
                          )}
                        </div>
                        {isEditing && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                            <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} id={`f-${field}`}
                              onChange={e => { const f = e.target.files[0]; if (f) setFiles(p => ({ ...p, [field.replace('Link', '')]: f })); }} />
                            <label htmlFor={`f-${field}`} style={{
                              fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 8,
                              padding: '12px 14px', border: `1.5px dashed ${CYAN}40`,
                              borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#8aa0ad',
                            }}>
                              <Upload size={14} color={CYAN} /> Upload file
                            </label>
                            <EditField value={formData[field] || ''} onChange={e => set(field, e.target.value)} placeholder="Or paste a URL…" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfile;