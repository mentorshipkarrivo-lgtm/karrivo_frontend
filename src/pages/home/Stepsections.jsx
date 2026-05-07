const steps = [
  {
    id: 1,
    title: "Find Your Ideal Mentor",
    description:
      "Browse from 600+ vested mentors and get to choose your ideal mentor according to your preferences and aspiration.",
    btnLabel: "Find Your Mentor",
    action: "find",
  },
  {
    id: 2,
    title: "Book a FREE Trial",
    description:
      "Connect with mentor and see how mentor will help you achieve your goal faster & avoid asking for referrals, etc.",
    btnLabel: "Book a FREE Trial",
    action: "book",
  },
  {
    id: 3,
    title: "Start 1:1 Long Term Mentorship",
    description:
      "Bravo!! Get started with your personalised mentorship in the right direction with a mentor of your choice.",
    btnLabel: "Start Preparing",
    action: "start",
  },
];

export default function StepsSection() {
  const handleButtonClick = (action) => {
    if (action === "find" || action === "start") {
      window.location.href = "/explore-mentors";
    } else if (action === "book") {
      const token = localStorage.getItem("token");
      window.location.href = token ? "/mentee/bookings" : "/login";
    }
  };

  return (
    <section className="bg-[#0f0f10] py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Get Started in 3 Easy Steps
        </h2>

        <p className="text-white/60 text-sm sm:text-base mb-10 sm:mb-12">
          Follow these three simple steps to get started with Long Term Mentorship
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#0098cc33] bg-[#121214] rounded-xl overflow-hidden">

          {steps.map((step, index) => (
            <div
              key={step.id}
              className={[
                "flex flex-col p-7 sm:p-8 text-left",
                "border-b border-[#0098cc22]",
                index < 2
                  ? "lg:border-r lg:border-[#0098cc22] lg:border-b-0"
                  : "lg:border-r-0 lg:border-b-0",
                index % 2 === 0
                  ? "sm:border-r sm:border-[#0098cc22]"
                  : "sm:border-r-0",
                index === steps.length - 1 ? "border-b-0" : "",
              ].join(" ")}
            >
              {/* Badge */}
              <div className="w-11 h-11 rounded-xl bg-[#0098cc] flex items-center justify-center text-white font-bold text-lg mb-7 shadow-md shadow-[#0098cc55]">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-7 mb-7 flex-grow">
                {step.description}
              </p>

              {/* Button */}
              <div>
                <button
                  onClick={() => handleButtonClick(step.action)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0098cc] rounded-lg bg-transparent text-[#0098cc] text-sm font-semibold transition-all duration-200 hover:bg-[#0098cc] hover:text-white w-full sm:w-auto justify-center sm:justify-start"
                >
                  {step.btnLabel} →
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}