import { memo, useContext } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { DataContext } from '@/lib/utils/context';
import useRouterStore from '../../../globalStore/store';
import { cn } from '@/utils/cn';

const Breadcrumb = () => {

  const { route, setRoute } = useRouterStore()

  const breadcrumbs = [
    {
      title: '',
      icon: <IoHomeOutline className="w-4 h-4" />,
      disable: true,
      link: '/npl',
    },
    ...route.breadcrumbs.map((item) => ({
      ...item,
      db_id: route.db_id,
      db_sub_id: route.db_sub_id
    })),
  ];
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              )}
              {isLast ? (
                <span className="text-sm font-medium text-gray-700">
                  {breadcrumb.icon}
                </span>
              ) : (
                <div
                  onClick={!breadcrumb.disable ? () => setRoute(breadcrumb) : undefined}
                  className={cn(' text-sm font-medium text-gray-500  capitalize',
                    {
                      'cursor-text': breadcrumb.disable,
                      'cursor-pointer hover:text-blue-600': !breadcrumb.disable
                    }
                  )}
                >
                  {breadcrumb.icon}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default memo(Breadcrumb);
