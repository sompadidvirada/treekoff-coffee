import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Logoutss } from "api/authentication";

const LogoutDialog = () => {
  const logout = async () => {
    localStorage.removeItem("user_detail");

    cookieStore.delete("session");

    await Logoutss();

    window.location.href = "/login";
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Style matches your premium menu items */}
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <LogOutIcon size={18} />
          <span className="cursor-pointer font-medium font-lao">ອອກຈາກລະບົບ</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-[400px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] p-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
            <LogOutIcon className="text-[#D4AF37]" size={24} />
          </div>

          <AlertDialogTitle className="font-lao text-[#1A0F0A] text-2xl mb-2">
            ຕ້ອງການອອກຈາກລະບົບ?
          </AlertDialogTitle>
          <p className="text-gray-500 font-lao text-sm px-6">
            ທ່ານຕ້ອງການອອກຈາກລະບົບຈັດການຮ້ານ Treekoff ແມ່ນບໍ່?
          </p>
        </div>

        <div className="grid grid-cols-2 cursor-pointer gap-3 mt-10">
          <AlertDialogCancel className="rounded-xl cursor-pointer border-none bg-gray-100/50 hover:bg-gray-100 text-gray-600 font-lao">
            ຍົກເລີກ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={logout}
            className="rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 text-white font-lao shadow-lg shadow-red-200"
          >
            ອອກຈາກລະບົບ
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
