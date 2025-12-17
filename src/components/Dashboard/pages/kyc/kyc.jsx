import React, { useState } from 'react';

const Kyc = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    dob: '',
    mobile: '',
    address: '',
    aadharFront: null,
    aadharBack: null,
    panFile: null,
    panNumber: '',
    upi: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.applicantName) newErrors.applicantName = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid Indian mobile number';
    }

    if (!formData.address) newErrors.address = 'Address is required';

    if (!formData.aadharFront) newErrors.aadharFront = 'Aadhar front is required';
    if (!formData.aadharBack) newErrors.aadharBack = 'Aadhar back is required';

    if (!formData.panFile) newErrors.panFile = 'PAN file is required';

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Invalid PAN number';
    }

    if (!formData.upi) {
      newErrors.upi = 'UPI ID is required';
    } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upi)) {
      newErrors.upi = 'Invalid UPI ID format';
    }

    if (!formData.accountNumber) newErrors.accountNumber = 'Bank account number is required';

    if (!formData.bankName) newErrors.bankName = 'Bank name is required';

    if (!formData.ifsc) {
      newErrors.ifsc = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
      newErrors.ifsc = 'Invalid IFSC code format';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Submitted Data:', formData);
    alert("Form submitted successfully!");
  };

  const inputStyle =
    'w-full px-4 py-2.5 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] text-sm transition';
  const sectionStyle = 'space-y-5 p-5 rounded-xl';
  const labelStyle = 'block text-sm font-medium text-white mb-1.5';
  const errorStyle = 'text-red-400 text-xs mt-1';
  const fileInputWrapper = 'flex items-center h-10 rounded-md border border-white/20 overflow-hidden';

  return (
    <div className="bg-[#1d8e85] text-white px-4 sm:px-6 lg:px-8 py-4 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl grid grid-cols-1 md:grid-cols-3 gap-7"
      >
        <div className="col-span-1 md:col-span-3 mb-7">
          <h2 className="text-2xl font-semibold mb-1">
            KYC Information{' '}
            <span className="text-base font-normal text-white/80">
              (Fill up information and verify your KYC)
            </span>
          </h2>
          <p className="text-sm mt-1">
            KYC status: <span className="text-red-400 font-semibold">n/a</span>
          </p>
        </div>

        {/* Applicant Info */}
        <div className={sectionStyle}>
          <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Applicant Info</h3>

          <div>
            <label className={labelStyle} htmlFor="applicantName">Name of the Applicant *</label>
            <input
              id="applicantName"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleInputChange}
              placeholder="Enter name"
              className={inputStyle}
            />
            {errors.applicantName && <p className={errorStyle}>{errors.applicantName}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="dob">Date of Birth *</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              className={inputStyle}
            />
            {errors.dob && <p className={errorStyle}>{errors.dob}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="mobile">Mobile Number (As per Bank) *</label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter 10-digit mobile number"
              className={inputStyle}
            />
            {errors.mobile && <p className={errorStyle}>{errors.mobile}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="address">Address *</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className={inputStyle}
            />
            {errors.address && <p className={errorStyle}>{errors.address}</p>}
          </div>
        </div>

        {/* Applicant Proofs */}
        <div className={sectionStyle}>
          <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Applicant Proofs</h3>
          {[
            ['aadharFront', 'Aadhar Front'],
            ['aadharBack', 'Aadhar Back'],
            ['panFile', 'PAN File'],
          ].map(([field, label]) => (
            <div key={field} className="mb-5">
              <label className={labelStyle} htmlFor={field}>{label} *</label>
              <div className={fileInputWrapper}>
                <label
                  htmlFor={field}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 h-full flex items-center text-sm font-semibold cursor-pointer min-w-[120px] justify-center"
                >
                  Choose file
                </label>
                <input
                  type="file"
                  id={field}
                  name={field}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="bg-[#063c41] text-sm text-white px-3 h-full flex items-center w-full truncate">
                  {formData[field]?.name || 'No file chosen'}
                </div>
              </div>
              {errors[field] && <p className={errorStyle}>{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className={labelStyle} htmlFor="panNumber">PAN Number *</label>
            <input
              id="panNumber"
              name="panNumber"
              value={formData.panNumber.toUpperCase()}
              onChange={handleInputChange}
              placeholder="ABCDE1234F"
              className={inputStyle}
            />
            {errors.panNumber && <p className={errorStyle}>{errors.panNumber}</p>}
          </div>
        </div>

        {/* Bank Details */}
        <div className={sectionStyle}>
          <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Bank Details</h3>

          <div>
            <label className={labelStyle} htmlFor="upi">UPI ID *</label>
            <input
              id="upi"
              name="upi"
              value={formData.upi}
              onChange={handleInputChange}
              placeholder="yourname@bank"
              className={inputStyle}
            />
            {errors.upi && <p className={errorStyle}>{errors.upi}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="accountNumber">Bank Account Number *</label>
            <input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter bank account number"
              className={inputStyle}
            />
            {errors.accountNumber && <p className={errorStyle}>{errors.accountNumber}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="bankName">Bank Name *</label>
            <input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="Enter bank name"
              className={inputStyle}
            />
            {errors.bankName && <p className={errorStyle}>{errors.bankName}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="ifsc">Bank IFSC Code *</label>
            <input
              id="ifsc"
              name="ifsc"
              value={formData.ifsc.toUpperCase()}
              onChange={handleInputChange}
              placeholder="SBIN0001234"
              className={inputStyle}
            />
            {errors.ifsc && <p className={errorStyle}>{errors.ifsc}</p>}
          </div>

          <div className="flex justify-end pt-5">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold text-sm px-14 py-3 rounded-full transition duration-300 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Kyc;
