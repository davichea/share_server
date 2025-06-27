import React from 'react'
import FromButton from '../../../../../../components/form/FormButton'
import { IoDownloadOutline, IoReload } from 'react-icons/io5';
import { Tooltip } from '@mui/material';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useFormContext } from 'react-hook-form';
import Dialog from '../../../../../../components/overlay/Dialog';
import CustomizeColumns from '../../../../../../components/ui/CustomizeColumns';
import InputSelect from '../../../../../../components/form/InputSelect';
import FormInputSearch from '../../../../../../components/form/FormInputSearch';
import useRouterStore from '../../../../../../globalStore/store';
import { ROUTES } from '../../../../../../lib/route';

export default function FilterData(
    {
        loading,
        totalRows,
        fetchData,
        setCurrentPage,
        handleFormChange
    }) {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        getValues
    } = useFormContext();

    const formVale = watch()
    const isOpenCol = formVale.isOpenCol
    const checkedColumns = formVale.checkedColumns
    const isOpenFilterData = watch("isOpenFilterData");
    const { setRoute } = useRouterStore()
    const addNew = () => {
        setRoute((prevRoute) => ({
            ...prevRoute,
            breadcrumbs: [
                { icon: "Product", title: "Product", link: ROUTES.PRODUCT_LIST },
                { icon: "Insert", link: "" },
            ],
            link: ROUTES.PRODUCT_INSERT,
        }));
    }
    const toggleColumns = () => {
        setValue('isOpenCol', !watch('isOpenCol'));
    }
    const onSearch = async () => {
        handleFormChange()
    };
    const filterData = () => {
        setValue('isOpenFilterData', !watch('isOpenFilterData'));
    }
    const handleUpdateColumns = () => {
        const columns = getValues('columns')
        const updatedColumns = columns.filter(item => item.id !== 'all').map((column, index) => ({
            ...column,
            checked: checkedColumns?.find(c => c.id === column.id)?.checked || false,
        }));
        setValue('columns', updatedColumns);
        toggleColumns();
    };
    const handleCheckboxChange = (id) => {
        const currentCheckedColumns = getValues('checkedColumns');
        let updatedCheckedColumns;

        if (id == 'all') {
            const allChecked = currentCheckedColumns.every(item => item.checked || item.disabled);
            updatedCheckedColumns = currentCheckedColumns.map(item =>
                item.disabled ? item : { ...item, checked: !allChecked }
            );
        }
        else {
            updatedCheckedColumns = currentCheckedColumns.map((item) =>
                item.id === id && !item.disabled
                    ? { ...item, checked: !item.checked }
                    : item
            );

            const checkedNamesWithoutId = updatedCheckedColumns.filter(item => item.id != 'all').every(item => item.checked);
            updatedCheckedColumns = updatedCheckedColumns.map(item =>
                item.id === 'all' ? { ...item, checked: checkedNamesWithoutId } : item
            );
        }
        setValue('checkedColumns', updatedCheckedColumns);
    };
    const onSelectBranch = async (option) => {
        setValue('regionId', option.regionID)
        setValue('region', option.regionName)
        await fetchData();
    };
    const onSelectRegion = async (option) => {
        const regionId = option?.regionID;
        await fetchBranch(regionId);
        await fetchData();
    };
    const handleClearInputRegion = () => {
        setValue('region', '');
        setValue('regionId', '');
        setValue('branch', '');
        setValue('branchId', '');
    };



    return (
        <>
            <div className="flex justify-between mb-4">
                <FromButton
                    disabled={loading}
                    onClick={addNew}
                >
                    Add New
                </FromButton>

                <div className='flex text-black gap-2'>
                    <Tooltip title="Reload" placement="bottom">
                        <button type='button' onClick={() => { fetchData(); setCurrentPage(1) }} className='w-10 h-10  rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-gray-200 '>
                            <IoReload className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    {/* <Tooltip title="Filter" placement="bottom">
                        <button
                            disabled={loading}
                            onClick={filterData}
                            type='button'
                            className='relative w-11 h-11  rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-gray-200'>
                            <CiFilter className='w-6 h-6' />
                            {
                                isOpenFilterData &&
                                <IoMdCloseCircle onClick={() => { onClear() }} className="absolute top-[6px] right-[4px] w-4 h-4 text-red-600" />

                            }

                        </button>
                    </Tooltip> */}
                    <Tooltip title="Customize Columns" placement="bottom">
                        <button disabled={loading} type='button'
                            onClick={toggleColumns}
                            aria-hidden="true" className='w-11 h-11  rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-gray-200'>
                            <GiSettingsKnobs className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <ul className="flex justify-end">
                        <FormInputSearch
                            {...register("chooseHere")}
                            disabled={loading}
                            onSearch={onSearch}
                            placeholder="Search Product Name"
                            type='text'
                            className="w-[250px]"
                        />

                    </ul>
                </div>
            </div>
            {/* <div
                className={`mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 px-6 py-5 border rounded-xl border-gray-300 
                        ${isOpenFilterData ? 'relative z-[2] animate-slide-in' : 'animate-slide-out hidden'}`}
            >
                <InputSelect
                    {...register('region')}
                    // options={api?.region}
                    valueKey={"regionID"}
                    labelKey={"regionName"}
                    placeholder={"Filter by region"}
                    onClearInput={handleClearInputRegion}
                    fetchData={async () => {
                        await fetchData();
                    }}
                    disabled={loading}
                    onSelect={onSelectRegion}


                />

                <InputSelect
                    {...register('branch')}
                    // options={api?.branch}
                    valueKey={"branchID"}
                    labelKey={"branchName"}
                    placeholder={"Filter by  branch"}
                    disabled={loading}
                    fetchData={async () => {
                        await fetchData();
                    }}
                    onSelect={onSelectBranch}

                />
            </div> */}
            <Dialog size={'medium'} isOpen={isOpenCol} toggleModal={toggleColumns} title="Customize Columns">
                <div className="overflow-y-auto py-4 min-h-[100px]">
                    <CustomizeColumns
                        checkedColumns={checkedColumns}
                        onCheckboxChange={handleCheckboxChange}
                    />
                </div>
                {

                    <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
                        <button
                            type="button"
                            className="min-w-[76px] py-2.5 px-5 text-xs text-blue-600 bg-blue-100 text-primary rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-blue-200"
                            onClick={toggleColumns}
                        >
                            CANCEL
                        </button>
                        <button
                            type="button"
                            className="min-w-[76px] py-2.5 px-5 text-xs bg-primary bg-blue-400 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-[#2570eb]"
                            onClick={handleUpdateColumns}
                        >
                            OK
                        </button>
                    </div>
                }
            </Dialog>

        </>
    )
}
