import React from 'react';

const data = [
  {
    "Legal Advice ID": "LA-000002",
    "Customer ID": 141742,
    "Customer Name": "PDRD ADB BB",
    "Co Borrower": ["John Doe", "Jane Smith"],
    "Branchs": [
      {
        "Branch ID": 1,
        "Branch Name": "Head Office"
      }
    ],
    "Penalty Rate": 5,
    "PE": 2,
    "Site Visit NPL Resolution": "Debtor was cooperative, site visit conducted successfully.",
    "Legal Resolution Advise": "Initiate legal action for loan recovery.",
    "Result": "Pending legal process.",
    "Close Date": "2025-05-15",
    "Loan Accounts": [
      {
        "Loan Account Number": "LN-987654321",
        "Loan Officer ID": 1001,
        "Loan Disburse Amount": 50000,
        "Loan Disburse Currency": "KHR",
        "Loan Disburse Amount In Usd": 12500,
        "Loan Principal Amount": 60000,
        "Loan Principal Currency": "KHR",
        "Loan Interest Rate": 8,
        "Over Due Day": 45
      },
      {
        "Loan Account Number": "LN-123456789",
        "Loan Officer ID": 1002,
        "Loan Disburse Amount": 75000,
        "Loan Disburse Currency": "USD",
        "Loan Disburse Amount In Usd": 75000,
        "Loan Principal Amount": 80000,
        "Loan Principal Currency": "USD",
        "Loan Interest Rate": 10,
        "Over Due Day": 30
      }
    ],
    "Created By": "Piseth NEM",
    "Updated By": null
  }
];

// TableCell component for main table rows
const TableCell = ({ label, children }) => (
  <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-default">
    <td className="border border-gray-300 px-5 py-3 font-semibold w-52 align-top text-gray-800" scope="row">
      {label}
    </td>
    <td className="border border-gray-300 px-5 py-3 text-gray-700 whitespace-pre-wrap break-words">
      {children}
    </td>
  </tr>
);

// Loan Accounts nested table with proper thead and tbody
const LoanAccountsTable = ({ accounts }) => (
  <div className="overflow-x-auto rounded-md shadow-sm border border-gray-300 mb-4">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-semibold text-sm">
          <th className="border border-gray-300 px-3 py-2">Loan Account Number</th>
          <th className="border border-gray-300 px-3 py-2">Loan Officer ID</th>
          <th className="border border-gray-300 px-3 py-2">Disburse Amount</th>
          <th className="border border-gray-300 px-3 py-2">Currency</th>
          <th className="border border-gray-300 px-3 py-2">Amount In USD</th>
          <th className="border border-gray-300 px-3 py-2">Principal Amount</th>
          <th className="border border-gray-300 px-3 py-2">Principal Currency</th>
          <th className="border border-gray-300 px-3 py-2">Interest Rate (%)</th>
          <th className="border border-gray-300 px-3 py-2">Over Due Day</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((acc, idx) => (
          <tr
            key={acc["Loan Account Number"]}
            className={`border-b border-gray-300 ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
          >
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Account Number"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Officer ID"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Disburse Amount"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Disburse Currency"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Disburse Amount In Usd"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Principal Amount"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Principal Currency"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Loan Interest Rate"]}</td>
            <td className="border border-gray-300 px-3 py-2">{acc["Over Due Day"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Branches nested table with thead outside tbody
const BranchesTable = ({ branches }) => (
  <div className="overflow-x-auto rounded-md shadow-sm border border-gray-300 mb-4">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-semibold text-sm">
          <th className="border border-gray-300 px-3 py-2">Branch ID</th>
          <th className="border border-gray-300 px-3 py-2">Branch Name</th>
        </tr>
      </thead>
      <tbody>
        {branches.map((branch, idx) => (
          <tr
            key={branch["Branch ID"]}
            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
          >
            <td className="border border-gray-300 px-3 py-2">{branch["Branch ID"]}</td>
            <td className="border border-gray-300 px-3 py-2">{branch["Branch Name"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Co Borrower nested table without thead (just list)
const CoBorrowerTable = ({ borrowers }) => (
  <div className="overflow-x-auto rounded-md shadow-sm border border-gray-300 mb-4">
    <table className="min-w-full table-auto border-collapse">
      <tbody>
        {borrowers.map((name, idx) => (
          <tr
            key={idx}
            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
          >
            <td className="border border-gray-300 px-3 py-2">{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ClassicStyledNestedTable() {
  const item = data[0];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Legal Advice Details</h1>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <table className="table-auto border border-gray-300 w-full text-left border-collapse rounded-md shadow-sm">
          <tbody>
            <TableCell label="Legal Advice ID">{item["Legal Advice ID"]}</TableCell>
            <TableCell label="Customer ID">{item["Customer ID"]}</TableCell>
            <TableCell label="Customer Name">{item["Customer Name"]}</TableCell>
            <TableCell label="Co Borrower">
              <CoBorrowerTable borrowers={item["Co Borrower"]} />
            </TableCell>
            <TableCell label="Branchs">
              <BranchesTable branches={item["Branchs"]} />
            </TableCell>
            <TableCell label="Penalty Rate">{item["Penalty Rate"]}</TableCell>
            <TableCell label="PE">{item["PE"]}</TableCell>
            <TableCell label="Site Visit NPL Resolution">{item["Site Visit NPL Resolution"]}</TableCell>
            <TableCell label="Legal Resolution Advise">{item["Legal Resolution Advise"]}</TableCell>
            <TableCell label="Result">{item["Result"]}</TableCell>
            <TableCell label="Close Date">{item["Close Date"]}</TableCell>
            <TableCell label="Loan Accounts">
              <LoanAccountsTable accounts={item["Loan Accounts"]} />
            </TableCell>
            <TableCell label="Created By">{item["Created By"]}</TableCell>
            <TableCell label="Updated By">{item["Updated By"] || '(none)'}</TableCell>
          </tbody>
        </table>
      </div>
    </div>
  );
}
