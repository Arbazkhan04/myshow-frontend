import { Outlet, useLocation, useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function CharactersLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the 2nd path segment, e.g. "/characters/create" → "create"
  const activeTab = location.pathname.split("/")[2] || "create";

  const tabs = [
    { key: "create", label: "Create" },
    { key: "my-characters", label: "My Characters" }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Tabs Navigation */}
      <div className="w-full flex justify-center mt-10">
        <Tabs
          value={activeTab}
          onValueChange={(value) => navigate(`/characters/${value}`)}
          className="w-full max-w-lg"
        >
          <TabsList className="">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Nested Route Content */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
