import React from 'react'
import DisplayRow from '../../../../../../../components/data/DisplayRow';
import Skeleton from '../../../../../../../components/form/Skeleton';
import ReviewCard from '../../../../../../../components/data/ReviewCard';
const columns = [
    { id: 'accountNumber', name: 'Account Number' },
    { id: 'officerID', name: 'Officer ID' },
    { id: 'disburseAmount', name: 'Disburse Amount' },
    { id: 'disburseCurrency', name: 'Disburse Currency' },
    { id: 'disburseAmountInUSD', name: 'Disburse Amount (USD)' },
    { id: 'principalAmount', name: 'Principal Amount' },
    { id: 'principalCurrency', name: 'Principal Currency' },
    { id: 'interestRate', name: 'Interest Rate' },
    { id: 'overDueDay', name: 'Overdue Days' }
];


const TableProductView = ({ data, loading }) => {


    const loanAccount = data?.loanAccounts?.map((item, index) => {

        return {
            accountNumber: item.accountNumber,
            officerID: item.officerID,
            disburseAmount: item.disburseAmount,
            disburseCurrency: item.disburseCurrency,
            disburseAmountInUSD: item.disburseAmountInUSD,
            principalAmount: item.principalAmount,
            principalCurrency: item.principalCurrency,
            interestRate: item.interestRate,
            overDueDay: item.overDueDay,
        };

    });
    console.log("loanAccount", loanAccount);

    function safeParse(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            return null;
        }
    }
    const coBorrowerNames = data.coBorrower?.map(coBorrowerString => {
        const coBorrowerObject = safeParse(coBorrowerString);
        return coBorrowerObject?.customerName ?? null;
    });



    return (
        <div className="p-4 print" >

            <div className="my-4">
                <div className="flex justify-between items-center">
                    {
                        loading ?
                            <Skeleton className='w-[180px] h-[40px]' /> :
                            <span className="bg-blue-100  text-black font-semibold px-4 py-3 rounded-lg">
                                {data.category}
                            </span>
                    }

                </div>
            </div>

            <div className="px-2 overflow-y-auto max-h-[50vh] print:overflow-visible">

                <div className='grid xl:grid-cols-2 print:grid-cols-2 gap-4'>

                    <div className="bg-white border rounded-lg shadow p-4">
                        <div className="mb-4 p-3 rounded-lg  flex items-center justify-between w-full bg-slate-100">
                            <h2 className=" font-semibold text-gray-600">
                                Product Information
                            </h2>
                        </div>
                        <div className="text-gray-600 space-y-2 px-4">
                            <DisplayRow label={'ID'} loading={loading} value={data.id} />
                            <DisplayRow label={'Title'} loading={loading} value={data?.title} />

                            <DisplayRow label={'Category'} loading={loading} value={data.category} />
                            <DisplayRow label={'Branch'} loading={loading} value={data.brand} />
                            <DisplayRow label={'Sku'} loading={loading} value={data.sku} />
                            <DisplayRow label={'Description'} loading={loading} value={data.description} />
                        </div>

                    </div>
                    <div className="bg-white border rounded-lg shadow p-4">
                        <div className="mb-4 p-3 rounded-lg flex items-center justify-between w-full bg-slate-100">
                            <h2 className=" font-semibold text-gray-600">
                                Pricing & Stock
                            </h2>
                        </div>
                        <div className="text-gray-600 space-y-2 px-4">
                            <DisplayRow label="Price" loading={loading} value={data?.price} />
                            <DisplayRow label="Discount Percentage" loading={loading} value={data?.discountPercentage} />
                            <DisplayRow label="Rating" loading={loading} value={data?.rating} />
                            <DisplayRow label="Stock" loading={loading} value={data?.stock} />
                            <DisplayRow label="Minimum Order Quantity" loading={loading} value={data?.minimumOrderQuantity} />
                            <DisplayRow label="Availability Status" loading={loading} value={data?.availabilityStatus} />
                        </div>


                    </div>
                    <div className="bg-white border rounded-lg shadow p-4 col-span-full">
                        <div className="mb-4 p-3 rounded-lg flex items-center justify-between w-full bg-slate-100">
                            <h2 className=" font-semibold text-gray-600">
                                Customer Reviews
                            </h2>
                        </div>
                        <div className="text-gray-600 space-y-2 px-4">
                            {data?.reviews?.map((review, index) => (
                                <ReviewCard key={index} review={review} loading={loading} />
                            ))}
                        </div>


                    </div>
                </div>

                {/* <div className="p-4 page-break my-4 bg-white rounded-lg border shadow ">
                    <h2 className="text-lg font-semibold mb-4 text-gray-600">Loan Information</h2>
                   <TableloanInformation
                        columns={columns}
                        data={loanAccount || []}
                        // currentPage={currentPage}
                        // setCurrentPage={setCurrentPage}
                        // itemsPerPage={10}
                        // totalRows={data?.totalCount}
                        loading={loading}

                    />
                </div> */}




            </div>
        </div>
    )
}

export default TableProductView