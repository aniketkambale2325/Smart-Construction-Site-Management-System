// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { navItems } from "@/data/dashboard";
// import { cn } from "@/lib/utils";

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ open, onClose }: SidebarProps) {
//   const location = useLocation();
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({
//     Dashboard: true,
//   });

//   const toggleSection = (label: string) => {
//     setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   const isActive = (href?: string) => href && location.pathname === href;

//   return (
//     <>
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/40 lg:hidden"
//           onClick={onClose}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={cn(
//           "fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0",
//           open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         )}
//       >
//         <div className="flex h-[72px] items-center gap-3 border-b border-gray-200 px-6">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-lg font-bold text-white">
//             T
//           </div>
//           <span className="text-xl font-bold text-gray-900">TailPanel</span>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-4 py-4">
//           <ul className="space-y-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const hasChildren = item.children && item.children.length > 0;
//               const isExpanded = expanded[item.label];

//               if (hasChildren) {
//                 return (
//                   <li key={item.label}>
//                     <button
//                       type="button"
//                       onClick={() => toggleSection(item.label)}
//                       className={cn(
//                         "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900"
//                       )}
//                     >
//                       <Icon className="h-4 w-4 shrink-0" />
//                       <span className="flex-1 text-left">{item.label}</span>
//                       {isExpanded ? (
//                         <ChevronDown className="h-4 w-4" />
//                       ) : (
//                         <ChevronRight className="h-4 w-4" />
//                       )}
//                     </button>
//                     {isExpanded && (
//                       <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
//                         {item.children!.map((child) => (
//                           <li key={child.label}>
//                             <Link
//                               to={child.href}
//                               onClick={onClose}
//                               className={cn(
//                                 "block rounded-xl px-3 py-2 text-sm transition-all duration-300",
//                                 isActive(child.href)
//                                   ? "bg-blue-50 font-medium text-[#2563EB]"
//                                   : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
//                               )}
//                             >
//                               {child.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 );
//               }

//               return (
//                 <li key={item.label}>
//                   <Link
//                     to={item.href ?? "/dashboard"}
//                     onClick={onClose}
//                     className={cn(
//                       "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
//                       isActive(item.href)
//                         ? "bg-blue-50 text-[#2563EB]"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     )}
//                   >
//                     <Icon className="h-4 w-4 shrink-0" />
//                     {item.label}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         <div className="border-t border-gray-200 p-4">
//           <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 transition-all duration-300 hover:bg-gray-100">
//             <Avatar className="h-10 w-10">
//               <AvatarFallback>AU</AvatarFallback>
//             </Avatar>
//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-gray-900">Admin User</p>
//               <p className="truncate text-xs text-gray-500">admin@tailpanel.com</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
// =============
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navItems } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}


export default function Sidebar({ open, onClose }: SidebarProps) {

  const location = useLocation();
  const { user } = useAuth();

  const displayName = user?.username || "User";
  const roleLabel = user?.role || "USER";

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Dashboard: true,
  });

  const toggleSection = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href?: string) =>
    href && location.pathname === href;
  // -----------------------------
  // Safe Avatar Initials
  // -----------------------------

  const getInitials = (name?: string) => {


    if (!name) {

      return "US";

    }
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();

  };

  return (
    <>
      {
        open && (

          <div

            className="fixed inset-0 z-40 bg-black/40 lg:hidden"

            onClick={onClose}

            aria-hidden="true"

          />

        )

      }
      <aside

        className={cn(

          "fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0",

          open
            ?
            "translate-x-0"
            :
            "-translate-x-full lg:translate-x-0"

        )}

      >
        {/* Header */}

        <div className="flex h-[72px] items-center gap-3 border-b border-gray-200 px-6">


          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
            BO
          </div>
          <span className="text-xl font-bold text-gray-900">

            BuildOps

          </span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {
              navItems.map((item) => {
                const Icon = item.icon;

                const hasChildren =
                  item.children &&
                  item.children.length > 0;


                const isExpanded =
                  expanded[item.label];
                if (hasChildren) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() =>
                          toggleSection(item.label)
                        }
                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left">
                          {item.label}
                        </span>
                        {
                          isExpanded
                            ?
                            <ChevronDown className="h-4 w-4" />
                            :
                            <ChevronRight className="h-4 w-4" />
                        }
                     </button>
                      {
                        isExpanded && (

                          <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
                            {
                              item.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                   to={child.href}

                                    onClick={onClose}

                                    className={cn(

                                      "block rounded-xl px-3 py-2 text-sm",

                                      isActive(child.href)

                                        ?

                                        "bg-blue-50 font-medium text-blue-600"

                                        :

                                        "text-gray-500 hover:bg-gray-50"
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))
                            }
                          </ul>
                        )
                      }
                    </li>
                  );
                }
                return (

                  <li key={item.label}>
                    <Link

                      to={item.href ?? "/dashboard"}

                      onClick={onClose}

                      className={cn(

                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",

                        isActive(item.href)

                          ?

                          "bg-blue-50 text-blue-600"

                          :

                          "text-gray-600 hover:bg-gray-50"

                      )}

                    >


                      <Icon className="h-4 w-4 shrink-0" />


                      {item.label}



                    </Link>


                  </li>

                );


              })
            }


          </ul>


        </nav>





        {/* User Profile */}

        <div className="border-t border-gray-200 p-4">


          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">


            <Avatar className="h-10 w-10">


              <AvatarFallback>

                {getInitials(displayName)}

              </AvatarFallback>


            </Avatar>




            <div className="min-w-0">


              <p className="truncate text-sm font-semibold text-gray-900">


                {displayName}


              </p>



              <p className="truncate text-xs text-gray-500">


                Role: {roleLabel}


              </p>



            </div>



          </div>


        </div>




      </aside>


    </>

  );

}