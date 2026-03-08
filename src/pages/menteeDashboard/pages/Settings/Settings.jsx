import React, { useEffect, useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useGetCommissionTiersQuery,
  useUpdateAllCommissionTiersMutation,
} from "../features/commissionTier/commissionTierApiSlice";

const PLAN_DURATIONS = [
  { key: "six_months",   label: "6 Months" },
  { key: "three_months", label: "3 Months" },
  { key: "one_month",    label: "1 Month"  },
];

const LTM_ORDER = ["21_plus", "6_to_20", "1_to_5"];

const CommissionTierSetting = () => {
  const { data: tiersData, isLoading, isSuccess } = useGetCommissionTiersQuery();
  const [tiers, setTiers] = useState({});
  const [updateAll, { isLoading: isSaving }] = useUpdateAllCommissionTiersMutation();

  useEffect(() => {
    if (isSuccess && tiersData?.data) {
      const map = {};
      tiersData.data.forEach((t) => {
        map[t.ltm_range] = {
          label: t.label,
          six_months: t.six_months,
          three_months: t.three_months,
          one_month: t.one_month,
          platform_fee_deduction: t.platform_fee_deduction || {
            six_months: 0,
            three_months: 0,
            one_month: 0,
          },
        };
      });
      setTiers(map);
    }
  }, [isSuccess, tiersData]);

  const handleChange = (ltm_range, field, value) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    setTiers((prev) => ({
      ...prev,
      [ltm_range]: { ...prev[ltm_range], [field]: cleaned },
    }));
  };

  const handleFeeChange = (ltm_range, duration, value) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    setTiers((prev) => ({
      ...prev,
      [ltm_range]: {
        ...prev[ltm_range],
        platform_fee_deduction: {
          ...prev[ltm_range].platform_fee_deduction,
          [duration]: cleaned,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.entries(tiers).map(([ltm_range, values]) => ({
        ltm_range,
        ...values,
      }));
      const response = await updateAll(payload);
      if (response?.data?.success) {
        toast.success(response.data.message || "Commission tiers updated!", { position: "top-center" });
      } else {
        toast.error(response?.error?.data?.message || "Update failed", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };

  const orderedTiers = LTM_ORDER.map((key) => ({
    ltm_range: key,
    ...(tiers[key] || {}),
  })).filter((t) => t.label);

  return (
    <DashboardLayout>
      <section className="setting_sec py-4">
        <div className="container-fluid">

          {/* ── Header ─────────────────────────────────────────── */}
          <div className="mb-4">
            <h4 className="text-white fw-bold mb-1">Commission Tier Settings</h4>
            <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
              Set platform fee commission percentages for mentors based on their
              Lifetime LTM count and plan duration.
            </p>
          </div>

          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center flex-column"
              style={{ height: "70vh" }}
            >
              <ClipLoader size={80} color="white" loading={isLoading} />
              <span className="text-light mt-3">Loading commission tiers…</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-4">

                {/* ── Commission % Card ──────────────────────────── */}
                <div className="col-12">
                  <div className="card bg-dark border-secondary">
                    <div className="card-body p-4">
                      <h6 className="text-white fw-semibold mb-1">
                        Commission Percentages
                      </h6>
                      <p className="text-secondary mb-3" style={{ fontSize: 13 }}>
                        Percentage the mentor earns per plan duration
                      </p>
                      <div className="table-responsive">
                        <table className="table table-dark table-bordered text-center align-middle mb-0">
                          <thead className="table-secondary">
                            <tr>
                              <th className="text-start" style={{ minWidth: 200 }}>
                                Lifetime LTM Count
                              </th>
                              {PLAN_DURATIONS.map((d) => (
                                <th key={d.key}>{d.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {orderedTiers.map((tier) => (
                              <tr key={tier.ltm_range}>
                                <td className="text-start">
                                  <span className="fw-semibold text-white">
                                    {tier.label?.split(" Long")[0]}
                                  </span>
                                  <br />
                                  <small className="text-secondary">Long Term Mentees</small>
                                </td>
                                {PLAN_DURATIONS.map((d) => (
                                  <td key={d.key}>
                                    <div className="input-group input-group-sm justify-content-center">
                                      <input
                                        type="text"
                                        className="form-control form-control-sm shadow-none text-center bg-black text-white border-secondary"
                                        style={{ maxWidth: 80 }}
                                        value={tier[d.key] ?? ""}
                                        onChange={(e) =>
                                          handleChange(tier.ltm_range, d.key, e.target.value)
                                        }
                                      />
                                      <span className="input-group-text bg-secondary border-secondary text-white">
                                        %
                                      </span>
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Platform Fee Deduction Card ─────────────────── */}
                <div className="col-12">
                  <div className="card bg-dark border-secondary">
                    <div className="card-body p-4">
                      <h6 className="text-white fw-semibold mb-1">
                        Platform Fee Deduction per Plan
                      </h6>
                      <p className="text-secondary mb-3" style={{ fontSize: 13 }}>
                        Flat amount deducted from the plan price per duration
                      </p>
                      <div className="table-responsive">
                        <table className="table table-dark table-bordered text-center align-middle mb-0">
                          <thead className="table-secondary">
                            <tr>
                              <th className="text-start" style={{ minWidth: 200 }}>
                                Lifetime LTM Count
                              </th>
                              {PLAN_DURATIONS.map((d) => (
                                <th key={d.key}>{d.label} Fee Cut</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {orderedTiers.map((tier) => (
                              <tr key={tier.ltm_range}>
                                <td className="text-start">
                                  <span className="fw-semibold text-white">
                                    {tier.label?.split(" Long")[0]}
                                  </span>
                                  <br />
                                  <small className="text-secondary">Long Term Mentees</small>
                                </td>
                                {PLAN_DURATIONS.map((d) => (
                                  <td key={d.key}>
                                    <input
                                      type="text"
                                      className="form-control form-control-sm shadow-none text-center bg-black text-white border-secondary mx-auto"
                                      style={{ maxWidth: 100 }}
                                      value={tier.platform_fee_deduction?.[d.key] ?? ""}
                                      onChange={(e) =>
                                        handleFeeChange(tier.ltm_range, d.key, e.target.value)
                                      }
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ── Save Button ───────────────────────────────────── */}
              <div className="d-flex justify-content-end mt-4 mb-2">
                {isSaving ? (
                  <button className="btn btn-success px-4 py-2 fw-bold" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Saving…
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success px-4 py-2 fw-bold">
                    Save Commission Tiers
                  </button>
                )}
              </div>

            </form>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default CommissionTierSetting;