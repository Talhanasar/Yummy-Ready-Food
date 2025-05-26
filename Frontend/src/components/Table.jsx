import React from 'react';
import Button from './ui/Button';

const Table = ({ columns, data, onRowClick, actions }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column,index) => (
                <th
                  key={`${column.key}-${index}`}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className}`}
                >
                  {column.header}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-y-auto h-[calc(65vh-48px)]" data-lenis-prevent>
        <table className="w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-6 py-4 whitespace-nowrap ${column.className}`}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className={`px-6 py-4 whitespace-nowrap ${actions.className}`}>
                    {actions.map((action, index) => (
                      action.condition ? (
                        action.condition(item) ? (
                          <Button
                            key={index}
                            className={`mr-2 ${action.className}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                          >
                            {action.icon}
                          </Button>
                        ) : action.false ? action.false : null
                      ) : (
                        <Button
                          key={index}
                          className={`mr-2 ${action.className}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(item);
                          }}
                        >
                          {action.icon}
                        </Button>
                      )
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;