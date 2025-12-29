import { Outlet, useLocation, useNavigate } from 'react-router';
import { Plus, Users, Library, Users2, User } from 'lucide-react';
import { FaTheaterMasks } from "react-icons/fa";
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ProfileShortcut } from '../app/ProfileShortcut';

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { key: 'create', label: 'Create', icon: Plus, path: '/create' },
    { key: 'characters', label: 'Characters', icon: FaTheaterMasks, path: '/characters' },
    { key: 'library', label: 'Library', icon: Library, path: '/library' },
    { key: 'community', label: 'Community', icon: Users2, path: '/community' },
    { key: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);
  const handleNavigation = (path: string) => navigate(path);

  return (
    <div className="relative w-full flex flex-col h-screen bg-background">
      {/* Main content (full height minus nav on small screens) */}
      <main className="relative w-full flex-1 overflow-y-auto pb-20 sm:pb-28">
        <Outlet />
        <Button variant="ghost" className='absolute top-12 left-6 rounded-full' onClick={() => navigate("/")}>
          <img src="/logo.png" alt="myshow.ai logo" className='w-8 h-8 object-contain' />
        </Button>
        <div className='absolute top-10 right-6 rounded-full'>
          <ProfileShortcut />
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 h-20 border-t border-border bg-background transition-all duration-300',
          'sm:mx-auto sm:bottom-4 sm:px-1 sm:max-w-xl sm:rounded-t-2xl sm:rounded-b-2xl sm:backdrop-blur-sm sm:bg-background/70 sm:shadow-lg sm:border'
        )}
      >
        <div className="flex h-full items-center justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.path)}
                className="cursor-pointer hover:bg-primary/10 w-full flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors duration-200"
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex justify-center items-center',
                    active && 'bg-linear-60 from-primary to-tertiary'
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      active ? 'text-white' : 'text-muted-foreground'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-xs font-medium',
                    active ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
