import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full mb-2">
              <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all duration-500 transform ${
                  index < currentStep
                    ? 'bg-gradient-to-br from-ucao-blue-500 to-ucao-red-500 text-white shadow-lg scale-110'
                    : index === currentStep
                    ? 'bg-gradient-to-br from-ucao-blue-600 to-ucao-red-600 text-white ring-4 ring-ucao-blue-300 shadow-xl scale-110 animate-pulse-slow'
                    : 'bg-gray-200 text-gray-600 scale-100'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6 animate-scaleIn" />
                ) : (
                  <span className="font-display">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1.5 mx-2 transition-all duration-500 rounded-full ${
                    index < currentStep
                      ? 'bg-gradient-to-r from-ucao-blue-500 to-ucao-red-500'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-xs font-semibold text-center transition-all duration-300 font-display ${
                index <= currentStep
                  ? 'text-ucao-blue-900 font-bold'
                  : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
