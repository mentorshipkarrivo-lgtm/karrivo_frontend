import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Calendar, Globe, Briefcase, GraduationCap, Award, DollarSign, Clock, Users, Edit2, Save, X, CheckCircle, XCircle, Loader, BookOpen, FileText, Video, Linkedin, Target, Star, Upload, CloudUpload, File, Trash2, Plus, AlertCircle } from 'lucide-react'; import { useGetMentorDetailsMutation, useUpdateMentorDetailsMutation } from "./mentorprofileapi";

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({

    availability: [
      { day: 'Monday', slots: [] },
      { day: 'Tuesday', slots: [] },
      { day: 'Wednesday', slots: [] },
      { day: 'Thursday', slots: [] },
      { day: 'Friday', slots: [] },
      { day: 'Saturday', slots: [] },
      { day: 'Sunday', slots: [] }
    ]
  });
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState({
    resume: null,
    portfolio: null,
    video: null
  });

  const resumeInputRef = useRef(null);
  const portfolioInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [getMentorDetails, { data, isLoading, error }] = useGetMentorDetailsMutation();
  const [updateMentorDetails, { isLoading: isUpdating }] = useUpdateMentorDetailsMutation();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setEmail(parsedData.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (email) {
      getMentorDetails(email);
    }
  }, [email, getMentorDetails]);

  useEffect(() => {
    if (data?.data) {
      setFormData({
        ...data.data,
        // Ensure availability has proper structure
        availability: data.data.availability || [
          { day: 'Monday', slots: [] },
          { day: 'Tuesday', slots: [] },
          { day: 'Wednesday', slots: [] },
          { day: 'Thursday', slots: [] },
          { day: 'Friday', slots: [] },
          { day: 'Saturday', slots: [] },
          { day: 'Sunday', slots: [] }
        ]
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleRemoveFile = (field) => {
    setFiles(prev => ({ ...prev, [field]: null }));
    if (field === 'resume' && resumeInputRef.current) resumeInputRef.current.value = '';
    if (field === 'portfolio' && portfolioInputRef.current) portfolioInputRef.current.value = '';
    if (field === 'video' && videoInputRef.current) videoInputRef.current.value = '';
  };




  const handleSave = async () => {
    try {
      // ✅ Step 1: Check availability data before sending
      console.log('=== FRONTEND DEBUG ===');
      console.log('📅 Availability in formData:', JSON.stringify(formData.availability, null, 2));
      console.log('📊 Full formData:', JSON.stringify(formData, null, 2));

      const dataToSend = {
        email,
        ...formData
      };

      console.log('📤 Data being sent to API:', JSON.stringify(dataToSend, null, 2));
      console.log('📤 Availability in dataToSend:', JSON.stringify(dataToSend.availability, null, 2));

      const result = await updateMentorDetails(dataToSend).unwrap();

      console.log('✅ API Response:', JSON.stringify(result, null, 2));
      console.log('✅ Availability in response:', JSON.stringify(result.data?.availability, null, 2));

      // Refetch updated data
      await getMentorDetails(email);

      setIsEditing(false);
      setFiles({ resume: null, portfolio: null, video: null });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('❌ Failed to update profile:', err);
      console.error('❌ Error details:', JSON.stringify(err, null, 2));
      alert('Failed to update profile. Please try again.');
    }
  };



  const handleCancel = () => {
    if (data?.data) setFormData(data.data);
    setFiles({ resume: null, portfolio: null, video: null });
    setIsEditing(false);
  };


  
  const handleAddTimeSlot = (dayIndex) => {
    const newSlot = {
      startTime: '09:00',
      endTime: '10:00',
      isBooked: false
    };

    setFormData(prev => {
      // Ensure availability array exists and has all 7 days
      let currentAvailability = prev.availability && prev.availability.length > 0
        ? [...prev.availability]
        : [...defaultAvailability];

      // Deep clone to avoid mutation issues
      const newAvailability = currentAvailability.map(day => ({
        ...day,
        slots: day.slots ? [...day.slots] : []
      }));

      // Add the new slot to the specific day
      newAvailability[dayIndex].slots.push(newSlot);

      return { ...prev, availability: newAvailability };
    });
  };




  // const handleAddTimeSlot = (dayIndex) => {
  //   const newSlot = {
  //     startTime: '09:00',
  //     endTime: '10:00',
  //     isBooked: false
  //   };

  //   setFormData(prev => {
  //     const newAvailability = [...prev.availability];
  //     if (!newAvailability[dayIndex].slots) {
  //       newAvailability[dayIndex].slots = [];
  //     }
  //     newAvailability[dayIndex].slots.push(newSlot);
  //     return { ...prev, availability: newAvailability };
  //   });
  // };

  const handleRemoveTimeSlot = (dayIndex, slotIndex) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[dayIndex].slots = newAvailability[dayIndex].slots.filter((_, i) => i !== slotIndex);
      return { ...prev, availability: newAvailability };
    });
  };

  const handleUpdateTimeSlot = (dayIndex, slotIndex, field, value) => {
    setFormData(prev => {
      const newAvailability = [...prev.availability];
      newAvailability[dayIndex].slots[slotIndex][field] = value;
      return { ...prev, availability: newAvailability };
    });
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center"><Loader className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#062117' }} /><p className="font-medium text-gray-700">Loading...</p></div>
      </div>
    );
  }

  if (error || !formData || Object.keys(formData).length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"><div className="text-center bg-white p-8 rounded-2xl shadow-lg"><XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" /><p className="text-red-600 font-semibold">Failed to load</p></div></div>;
  }

  const SkillPill = ({ text, color = "#062117" }) => (
    <span className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm hover:shadow-md transition-all transform hover:scale-105" style={{ backgroundColor: color }}>{text}</span>
  );

  const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all ${className}`}>
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
        {Icon && <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(6,33,23,0.1)' }}><Icon size={20} style={{ color: '#062117' }} /></div>}
        <h2 className="text-lg font-bold" style={{ color: '#062117' }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  const FileUploadBox = ({ title, icon: Icon, file, field, inputRef, accept, iconColor }) => (
    <div className="group p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all border-2 border-dashed border-gray-300 hover:border-gray-400">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${iconColor}20` }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <span className="text-sm font-bold text-gray-700">{title}</span>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(field, e)}
            className="hidden"
            id={`file-${field}`}
          />

          {!file ? (
            <label
              htmlFor={`file-${field}`}
              className="flex flex-col items-center justify-center p-4 cursor-pointer bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all group"
            >
              <CloudUpload size={32} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
              <span className="text-xs text-gray-500 text-center">Drop file here or click to upload</span>
              <span className="text-xs text-gray-400 mt-1">{accept}</span>
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <File size={18} style={{ color: iconColor }} />
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFile(field)}
                className="p-1 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          )}

          <input
            type="text"
            value={formData[`${field}Link`] || ''}
            onChange={(e) => handleChange(`${field}Link`, e.target.value)}
            placeholder="Or paste link here"
            className="custom-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm"
          />
        </div>
      ) : (
        <div className="space-y-2">
          {formData[`${field}Link`] && (
            <a
              href={formData[`${field}Link`]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline block truncate"
            >
              {formData[`${field}Link`]}
            </a>
          )}
          {!formData[`${field}Link`] && (
            <p className="text-xs text-gray-500">No file uploaded</p>
          )}
        </div>
      )}
    </div>
  );


  console.log(isEditing, "isEditing")

  // const AvailabilitySection = () => (
  //   <SectionCard title="Weekly Availability" icon={Calendar} className="lg:col-span-3">
  //     <p className="text-sm text-gray-600 mb-4">
  //       Set your available time slots for each day. Mentees can book sessions during these times.
  //     </p>

  //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  //       {formData.availability?.map((dayData, dayIndex) => (
  //         <div key={dayData.day} className="border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all">
  //           <div className="flex items-center justify-between mb-3">
  //             <h4 className="font-bold text-gray-900 flex items-center gap-2">
  //               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#062117' }}></div>
  //               {dayData.day}
  //             </h4>
  //             {isEditing && <p className="text-red-500">EDIT MODE ON</p>}

  //             {isEditing && (
  //               <button
  //                 type="button"
  //                 onClick={() => handleAddTimeSlot(dayIndex)}
  //                 className="text-xs px-3 py-1.5 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-sm flex items-center gap-1"
  //                 style={{ backgroundColor: '#FF8C42' }}
  //               >
  //                 <Plus size={14} />
  //                 Add
  //               </button>
  //             )}
  //           </div>

  //           {(!dayData.slots || dayData.slots.length === 0) ? (<p className="text-xs text-gray-500 italic text-center py-3">
  //             {isEditing ? 'Click "Add" to add time slots' : 'No slots available'}
  //           </p>
  //           ) : (
  //             <div className="space-y-2">
  //               {dayData.slots.map((slot, slotIndex) => (
  //                 <div key={slotIndex} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200">
  //                   {isEditing ? (
  //                     <>
  //                       <div className="flex-1 flex gap-2">
  //                         <input
  //                           type="time"
  //                           value={slot.startTime}
  //                           onChange={(e) => handleUpdateTimeSlot(dayIndex, slotIndex, 'startTime', e.target.value)}
  //                           className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
  //                         />
  //                         <span className="text-gray-400 self-center">-</span>
  //                         <input
  //                           type="time"
  //                           value={slot.endTime}
  //                           onChange={(e) => handleUpdateTimeSlot(dayIndex, slotIndex, 'endTime', e.target.value)}
  //                           className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
  //                         />
  //                       </div>
  //                       <button
  //                         type="button"
  //                         onClick={() => handleRemoveTimeSlot(dayIndex, slotIndex)}
  //                         className="p-1.5 hover:bg-red-50 rounded transition-colors"
  //                       >
  //                         <X size={14} className="text-red-500" />
  //                       </button>
  //                     </>
  //                   ) : (
  //                     <div className="flex items-center justify-between w-full">
  //                       <div className="flex items-center gap-2">
  //                         <Clock size={14} style={{ color: '#062117' }} />
  //                         <span className="text-xs font-semibold text-gray-700">
  //                           {slot.startTime} - {slot.endTime}
  //                         </span>
  //                       </div>
  //                       {slot.isBooked && (
  //                         <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
  //                           Booked
  //                         </span>
  //                       )}
  //                     </div>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </div>


  //   </SectionCard>
  // );


  const defaultAvailability = [
    { day: "Monday", slots: [] },
    { day: "Tuesday", slots: [] },
    { day: "Wednesday", slots: [] },
    { day: "Thursday", slots: [] },
    { day: "Friday", slots: [] },
    { day: "Saturday", slots: [] },
    { day: "Sunday", slots: [] },
  ];


  const AvailabilitySection = () => {
    const availabilityToRender =
      formData?.availability?.length > 0
        ? formData.availability
        : isEditing
          ? defaultAvailability
          : [];

    return (
      <SectionCard title="Weekly Availability" icon={Calendar} className="lg:col-span-3">
        <p className="text-sm text-gray-600 mb-4">
          Set your available time slots for each day. Mentees can book sessions during these times.
        </p>

        {availabilityToRender.length === 0 && !isEditing ? (
          <p className="text-sm text-gray-500 italic text-center py-6">
            No availability set
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {availabilityToRender.map((dayData, dayIndex) => (
              <div
                key={dayData.day}
                className="border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#062117" }}
                    ></div>
                    {dayData.day}
                  </h4>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleAddTimeSlot(dayIndex)}
                      className="text-xs px-3 py-1.5 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-sm flex items-center gap-1"
                      style={{ backgroundColor: "#FF8C42" }}
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  )}
                </div>

                {!dayData.slots || dayData.slots.length === 0 ? (
                  <p className="text-xs text-gray-500 italic text-center py-3">
                    {isEditing ? 'Click "Add" to add time slots' : 'No slots available'}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {dayData.slots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-200"
                      >
                        {isEditing ? (
                          <>
                            <div className="flex-1 flex gap-2">
                              <input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) =>
                                  handleUpdateTimeSlot(
                                    dayIndex,
                                    slotIndex,
                                    "startTime",
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
                              />
                              <span className="text-gray-400 self-center">-</span>
                              <input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) =>
                                  handleUpdateTimeSlot(
                                    dayIndex,
                                    slotIndex,
                                    "endTime",
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveTimeSlot(dayIndex, slotIndex)
                              }
                              className="p-1.5 hover:bg-red-50 rounded"
                            >
                              <X size={14} className="text-red-500" />
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Clock size={14} style={{ color: "#062117" }} />
                            <span className="text-xs font-semibold text-gray-700">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    );
  };



  return (


    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <style>{`
          .custom-input:focus{outline:none!important;border-color:#062117!important;box-shadow:0 0 0 4px rgba(6,33,23,0.12)!important;transform:translateY(-1px)}
          .custom-input{transition:all 0.2s ease}
        `}</style>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="h-2" style={{ background: 'linear-gradient(90deg,#062117,#0a3d2a,#062117)' }}></div>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Profile Image & Actions */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-6">
                  <div className="absolute -inset-3 rounded-3xl opacity-20 blur-xl" style={{ backgroundColor: '#062117' }}></div>
                  <div className="relative w-36 h-36 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl" style={{ background: 'linear-gradient(135deg,#062117,#0a3d2a)' }}>
                    {formData.fullName?.charAt(0) || 'M'}
                    {formData.status === 'approved' && (
                      <div className="absolute -bottom-3 -right-3 text-white p-3 rounded-full shadow-lg flex items-center gap-1 pr-4" style={{ backgroundColor: '#062117' }}>
                        <CheckCircle size={18} /><span className="text-xs font-bold">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full space-y-3">
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="w-full px-6 py-3 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center gap-2" style={{ backgroundColor: '#FF8C42' }}>
                      <Edit2 size={20} />Edit Profile
                    </button>
                  ) : (
                    <>
                      <button onClick={handleSave} disabled={isUpdating} className="w-full px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50" style={{ backgroundColor: '#062117' }}>
                        {isUpdating ? <Loader size={20} className="animate-spin" /> : <Save size={20} />}
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button onClick={handleCancel} disabled={isUpdating} className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-md">
                        <X size={20} />Cancel
                      </button>
                    </>
                  )}
                </div>

                <div className="w-full mt-6 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2"><Clock size={16} style={{ color: '#062117' }} /><span className="text-xs font-medium text-gray-700">Experience</span></div>
                    <span className="text-sm font-bold" style={{ color: '#062117' }}>{formData.yearsOfExperience || '0'} years</span>
                  </div>
                  {formData.hourlyRate && (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2"><DollarSign size={16} className="text-blue-600" /><span className="text-xs font-medium text-gray-700">Rate</span></div>
                      <span className="text-sm font-bold text-blue-700">${formData.hourlyRate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="mb-6">
                  {isEditing ? (
                    <input type="text" value={formData.fullName || ''} onChange={(e) => handleChange('fullName', e.target.value)} className="custom-input text-4xl font-bold mb-3 w-full px-4 py-3 border-2 border-gray-200 rounded-xl" style={{ color: '#062117' }} placeholder="Full Name" />
                  ) : (
                    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-900 to-green-700 bg-clip-text text-transparent">{formData.fullName}</h1>
                  )}

                  <div className="text-gray-600 mb-4 flex items-center gap-2">
                    <Briefcase size={18} style={{ color: '#062117' }} />
                    {isEditing ? (
                      <input type="text" value={formData.currentRole || ''} onChange={(e) => handleChange('currentRole', e.target.value)} className="custom-input flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-lg" placeholder="Current Role" />
                    ) : (
                      <span className="text-lg font-semibold">{formData.currentRole || 'N/A'}</span>
                    )}
                  </div>

                  {formData.companyName && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full mb-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#062117' }}></div>
                      <span className="text-sm font-medium text-gray-700">{formData.companyName}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><MapPin size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.location || 'N/A'}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><Phone size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.phone || 'N/A'}</span></div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full"><Mail size={16} style={{ color: '#062117' }} /><span className="font-medium">{formData.email || 'N/A'}</span></div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-3"><BookOpen size={20} style={{ color: '#062117' }} /><h3 className="font-bold text-lg" style={{ color: '#062117' }}>Professional Bio</h3></div>
                  {isEditing ? (
                    <textarea value={formData.whyMentor || ''} onChange={(e) => handleChange('whyMentor', e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none text-gray-700 leading-relaxed" rows={5} placeholder="Share your journey..." />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{formData.whyMentor || 'N/A'}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="lg:w-80">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 mb-5 border-2 border-green-100">
                  <div className="flex items-center gap-2 mb-4"><Star size={20} style={{ color: '#062117' }} className="fill-current" /><h3 className="font-bold" style={{ color: '#062117' }}>Core Skills</h3></div>
                  {isEditing ? (
                    <textarea value={formData.currentSkills || ''} onChange={(e) => handleChange('currentSkills', e.target.value)} className="custom-input w-full px-3 py-2 border-2 border-gray-200  resize-none text-sm" rows={4} placeholder="Comma separated" />
                  ) : (
                    <div className="flex flex-wrap gap-2">{formData.currentSkills?.split(',').map((s, i) => <SkillPill key={i} text={s.trim()} />)}</div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-100">
                  <div className="flex items-center gap-2 mb-4"><Target size={20} className="text-blue-600" /><h3 className="font-bold text-blue-900">Expertise</h3></div>
                  {isEditing ? (
                    <textarea value={formData.areasOfInterest || ''} onChange={(e) => handleChange('areasOfInterest', e.target.value)} className="custom-input w-full px-3 py-2 border-2 border-gray-200 rounded-lg resize-none text-sm" rows={4} placeholder="Comma separated" />
                  ) : (
                    <div className="flex flex-wrap gap-2">{formData.areasOfInterest?.split(',').map((a, i) => <SkillPill key={i} text={a.trim()} color="#4A90E2" />)}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SectionCard title="Web Presence" icon={Globe}>
            {!isEditing && formData.linkedinUrl && (
              <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group border border-blue-100">
                <div className="p-2 bg-blue-600 rounded-lg"><Linkedin size={18} className="text-white" /></div>
                <div><p className="text-xs text-gray-500 font-medium">LinkedIn</p><p className="text-sm font-semibold text-blue-700">View Profile →</p></div>
              </a>
            )}
            {isEditing && (
              <div><label className="text-sm font-semibold text-gray-700 block mb-2">LinkedIn URL</label><input type="text" value={formData.linkedinUrl || ''} onChange={(e) => handleChange('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm" /></div>
            )}
          </SectionCard>

          <SectionCard title="Languages" icon={Globe}>
            <div className="space-y-2">{formData.languages?.map((l, i) => <div key={i} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"><div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">{l.charAt(0)}</div><span className="font-semibold text-gray-800">{l}</span></div>)}</div>
          </SectionCard>

          <SectionCard title="Documents & Media" icon={Upload} className="lg:col-span-1">
            <div className="space-y-3">
              <FileUploadBox
                title="Resume"
                icon={FileText}
                file={files.resume}
                field="resume"
                inputRef={resumeInputRef}
                accept=".pdf,.doc,.docx"
                iconColor="#dc2626"
              />
              <FileUploadBox
                title="Portfolio"
                icon={FileText}
                file={files.portfolio}
                field="portfolio"
                inputRef={portfolioInputRef}
                accept=".pdf,.ppt,.pptx"
                iconColor="#16a34a"
              />
              <FileUploadBox
                title="Video"
                icon={Video}
                file={files.video}
                field="video"
                inputRef={videoInputRef}
                accept="video/*"
                iconColor="#9333ea"
              />
            </div>
          </SectionCard>

          <SectionCard title="Professional" icon={Briefcase} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {['companyName', 'yearsOfExperience', 'hourlyRate', 'mentoringStyle'].map(f => (
                <div key={f} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  {isEditing ? <input type="text" value={formData[f] || ''} onChange={(e) => handleChange(f, e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl" /> : <p className="font-semibold px-4 py-3 bg-gray-50 rounded-xl">{formData[f] || 'N/A'}</p>}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Education" icon={GraduationCap}>
            {['highestDegree', 'fieldOfStudy', 'schoolName'].map(f => (
              <div key={f} className="space-y-2 mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                {isEditing ? <input type="text" value={formData[f] || ''} onChange={(e) => handleChange(f, e.target.value)} className="custom-input w-full px-4 py-3 border-2 border-gray-200 rounded-xl" /> : <p className="font-semibold px-4 py-3 bg-gray-50 rounded-xl">{formData[f] || 'N/A'}</p>}
              </div>
            ))}
          </SectionCard>
        </div>

        <div className="mt-6">
          <AvailabilitySection />
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;