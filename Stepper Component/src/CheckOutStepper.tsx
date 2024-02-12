import { useEffect, useRef, useState } from "react";

interface Icheckoutconfig {
  name: string;
  component: () => JSX.Element;
}

export default function CheckOutStepper({
  stepsConfig,
}: {
  stepsConfig: Array<Icheckoutconfig>;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const stepref = useRef<HTMLDivElement[]>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  useEffect(() => {
    console.log(stepref.current[0].offsetWidth);
    console.log(stepref.current[stepsConfig.length - 1].offsetWidth);
    setMargins({
      marginLeft: stepref.current[0].offsetWidth / 2,
      marginRight: stepref.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepref.current]);

  const handleNextClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsCompleted(true);
        return prevStep;
      }
      return prevStep + 1;
    });
  };
  const calcWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };
  const ActiveComponent = stepsConfig[currentStep - 1].component;

  return (
    <>
      <div className="absolute top-[40%] left-[15%] flex flex-col gap-y-10">
        <div className="flex items-center justify-center gap-x-52 font-serif">
          {stepsConfig.map((val, i) => {
            return (
              <div
                ref={(el) => el && (stepref.current[i] = el)}
                key={val.name}
                className="flex flex-col items-center justify-center z-50"
              >
                <div
                  className={
                    "rounded-full bg-[#cbd5e1] w-10 h-10 flex items-center justify-center " +
                    (currentStep > i + 1 || isCompleted
                      ? "bg-green-500 "
                      : "") +
                    (currentStep === i + 1 && !isCompleted
                      ? "bg-blue-500 "
                      : "")
                  }
                >
                  {currentStep > i + 1 || isCompleted ? (
                    <span>&#10003;</span>
                  ) : (
                    i + 1
                  )}
                </div>
                <div>{val.name}</div>
              </div>
            );
          })}
          <div
            className="absolute left-0 top-[9%] h-[4px] bg-[#ccc]"
            style={{
              width: `calc( 100% - ${margins.marginLeft + margins.marginRight}px)`,
              marginLeft: margins.marginLeft,
              marginRight: margins.marginRight,
            }}
          >
            <div
              className="h-full bg-green-600 transition ease-in duration-75"
              style={{ width: `${calcWidth()}%` }}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ActiveComponent />
        </div>
        <div className="flex items-center justify-center">
          {!isCompleted && (
            <button
              onClick={handleNextClick}
              className="w-20 h-10 border-2 border-black rounded-lg bg-slate-300"
            >
              {currentStep === stepsConfig.length ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
