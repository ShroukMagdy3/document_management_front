import { Key, User } from "lucide-react";
import StepsProgress from "../../components/progress/progress";


export default function AuthLayout() {
  return (
<>
  <div className="p-5 bg-gradient-to-br from-gray-500 to-gray-800 rounded-2xl text-gray-100 flex flex-col justify-between">
    <div>
      <h1 className="text-4xl  mb-2">
        <span className="font-signature text-6xl text-amber-500">
          keeply.
        </span>
      </h1>
      <p className="text-gray-100 opacity-90 max-w-xs">
        Organize your life simply — sign up to start saving, planning and
        keeping what matters.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <div className="bg-amber-500 p-3 rounded-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-100 font-semibold">Fast setup</p>
          <p className="text-xs text-gray-200">
            Create your account in seconds
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="bg-amber-500 p-3 rounded-lg">
          <Key className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-100 font-semibold">Secure</p>
          <p className="text-xs text-gray-200">
            Your data stays private if you want
          </p>
        </div>
      </div>
    </div>

    <StepsProgress />
  </div>
</>

  );
}
