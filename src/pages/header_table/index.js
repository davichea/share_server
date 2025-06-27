import { useEffect, useState } from 'react'


const initColumns = [
  { id: "all", name: "Select All", checked: false, disabled: false },
  { id: "name", name: "Name", checked: false, disabled: false },
  { id: "email", name: "Email", checked: false, disabled: false },
  { id: "status", name: "Status", checked: false, disabled: false },
  { id: "action", name: "Action", checked: true, disabled: true },
]
const sampleData = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  { name: "Alice Lee", email: "alice@example.com", status: "Pending" },
];

export default function header_table() {
  const [columns, setColumns] = useState(initColumns)
  const [isOpen, setIsOpen] = useState(false)
  const toggleShowColumns = () => {
    setIsOpen(!isOpen)
  }
  const updateCheckBox = (id) => {
    setColumns(prev => {
      if (id === 'all') {
        const isChecked = !prev.find(item => item.id === 'all').checked;
        return prev.map(item => item.disabled ? item : { ...item, checked: isChecked });
      }
      const updated = prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)

      const allChecked = updated
        .filter(item => !item.disabled && item.id !== 'all')
        .every(item => item.checked)
      // it is just filter out the id ==all them check every the checkbox outside the id == all
      // that all true  will use this to update the  checked id === all depend the every is checked all  
      return updated.map(item => item.id === 'all' ? { ...item, checked: allChecked } : item)
      // for this just update the id == all every checked one by one 

    })
  }

  // const visibleColumns = columns.filter(
  //   col => col.checked && !['all', 'name'].includes(col.id)
  // );
  const visibleColumns = columns.filter(col => col.checked && col.id !== 'all')
  const showColumn = (key) => {
    return columns.find(col => col.id === key)?.checked
  }

  return (
    <>
      <div >
        <button
          className='bg-blue-500 text-black p-4 shadow  rounded-3xl mx-auto flex justify-center mt-7'
          onClick={toggleShowColumns}
        >
          Customize Columns
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50  z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-96 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-black">Choose Columns</h3>
              {columns.map((col) => (
                <label key={col.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={col.checked}
                    disabled={col.disabled}
                    onChange={() => updateCheckBox(col.id)}
                  />
                  <span className={`text-black ${col.disabled ? "text-gray-400 cursor-not-allowed" : ""}`}>
                    {col.name}
                  </span>
                </label>
              ))}
              <button
                onClick={toggleShowColumns}
                className="mt-4 bg-green-500 text-white px-4 py-1 rounded"
              >
                ✅ Okay
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {visibleColumns.map(col =>
                <th key={col.id} className='p-3 text-left border-b  text-black'>
                  {col.name}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sampleData.map((row, index) => {
              const visibleKeys = Object.keys(row)
                .filter(key => showColumn(key));
              return (
                <tr key={index} className="border-b">
                  {visibleKeys.map(key => (
                    <td key={key} className="p-3 text-black">{visibleKeys}</td>
                  ))}
                  {showColumn('action') && (
                    <td key="action" className="p-3">
                      <button className="bg-blue-500 px-2 py-1 text-white rounded">Edit</button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>



        </table>
      </div>
    </>
  )
}
