import React, { useEffect, useRef, useState } from 'react'
import TableContainer from '../../../../../../components/data/Table/TableContainer'
import { cn } from '@/utils/cn'
import TableHeader from '../../../../../../components/data/Table/TableHeader';
import TablePagination from '../../../../../../components/data/Table/TablePagination';
import TableBody from '../../../../../../components/data/Table/TableBody';
import TableLoading from '../../../../../../components/data/Table/TableLoading';
import { dateTimePickerTabsClasses } from '@mui/x-date-pickers';
import TableDataCell from '../../../../../../components/data/Table/TableDataCell';
import { BsThreeDots } from "react-icons/bs";
import TableEmpty from '../../../../../../components/data/Table/TableEmpty';
import { isEmptyRow } from '@/lib/patterns/validationPatterns';
import ImageCell from '../../../../../../components/data/Table/ImageCell';
import StatusBadge from '../../../../../../components/data/Status/StatusBadge';
import ActionMenu from '../../../../../../components/data/ActionMenu';
import ActionItem from '../../../../../../components/data/ActionItem';
import { IoEyeOutline } from 'react-icons/io5';
import { useFormContext } from 'react-hook-form';
import { getProductById } from '../../../../service';
import Dialog from '../../../../../../components/overlay/Dialog';
import TableProductView from './TableProductView';
import { BiEdit } from 'react-icons/bi';
import { ROUTES } from '../../../../../../lib/route';
import useRouterStore from '../../../../../../globalStore/store';

export default function TableProduct({ data, columns, loading, totalRows, currentPage, setCurrentPage, fetchData, isOpenFilterData }) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useFormContext();
  const isOpenView = watch('isOpenView')
  const { route, setRoute } = useRouterStore()
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [itemsPerPage] = useState(15);
  const [isOpenAction, setIsOpenAction] = useState();
  const actionRef = useRef(null);
  const [loadingView, setLoadingView] = useState(false)
  const [viewData, setViewData] = useState('')

  const totalPages = Math.ceil(totalRows / itemsPerPage);
  const itemRange = `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, totalRows)} of ${totalRows}`;
  const goToPreviousPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    fetchData({ page: newPage });
  };

  const goToNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    fetchData({ page: newPage });
  };

  const goToNumberPage = (page) => {
    setCurrentPage(page);
    fetchData({ page });
  };
  const showColumn = (key) => {
    return columns.find(col => col.id === key)?.checked
  }
  const toggleModalView = () => {
    setValue('isOpenView', !isOpenView)
  }
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleDropdown = (index, event, id) => {
    setValue('id', id)
    event.stopPropagation();
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const top = buttonRect.top - 10
    const left = buttonRect.left - 100
    setIsOpenAction({
      index,
      top: top,
      left: left,
    });
  };
  const closeDropdown = () => {
    setIsOpenAction(null);
  };
  const onView = async () => {
    toggleModalView();
    setLoadingView(true)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(300)
      const res = await getProductById.getById('', getValues('id'))
      setViewData(res)
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingView(false)
    }

  }
  const onDelete = () => {

  }

  const onEdit = (id) => {
    setRoute((prevRoute) => ({
      ...prevRoute,
      breadcrumbs: [
        { icon: "Product", title: "Product", link: ROUTES.PRODUCT_LIST },
        { icon: "Update", link: "" },
      ],
      link: ROUTES.PRODUCT_UPDATE,
      id: getValues('id')
    }));
  };
  return (
    <div className=''>
      <TableContainer>
        <div className={cn("overflow-y-auto h-[73vh] ", {
          "max-h-[calc(72vh)]": windowHeight <= 850,
          'max-h-[calc(54vh)] ': isOpenFilterData && windowHeight <= 850,
          'max-h-[calc(60vh)] ': isOpenFilterData && windowHeight > 850,
        })}>
          <table className='w-full  rounded-xl'>
            <TableHeader>
              <tr className="bg-gray-100">
                {columns
                  .filter((column) => column.checked)
                  .map((column) => (
                    <th
                      key={column.id}
                      className="px-5 py-3 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      {column.name}
                    </th>
                  ))}
              </tr>
            </TableHeader>
            <TableBody>
              {
                loading ? (
                  <TableLoading
                    rowCount={15}
                    cellCount={columns.filter((column) => column.checked).length}
                  />
                ) : totalRows === 0 ? (
                  <TableEmpty
                    colSpan={columns.length}
                    message="No record found"
                    className={"h-[35vh]"}
                  />
                ) : (
                  data?.map((row, index) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + (index + 1);
                    return (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-100 cursor-pointer transition-all duration-500`}
                      >
                        <TableDataCell className="py-0.5">{rowNumber}</TableDataCell>
                        {Object.keys(row).map((key) => {
                          if (key === "id" || !showColumn(key)) return null;


                          const value = row[key];

                          // if (key == toggleKey) {
                          //   return (

                          //     <TableDataCell key={key}>
                          //       <ToggleSwitch
                          //         // disabled={value}
                          //         defaultChecked={value}
                          //         // {...register(`toggle_${row.ComplaintID}`, {
                          //         //   onChange: (e) => handleToggleChange(e, row)
                          //         // })}
                          //       />
                          //     </TableDataCell>
                          //   );
                          // }
                          // else if (key !== toggleKey) {
                          //   return (
                          //     <TableDataCell key={key} className="py-0.5">
                          //       {isEmptyRow(value)}
                          //     </TableDataCell>
                          //   );
                          // }
                          const toggleKey = "status";
                          const imageKey = "thumbnail";

                          return (
                            <TableDataCell key={key} className="py-0.5">
                              {key === toggleKey ? (
                                <StatusBadge status={value} />
                              ) : key === imageKey ? (
                                <ImageCell src={value} alt="Product thumbnail" />
                              ) : (
                                isEmptyRow(value)
                              )}
                            </TableDataCell>
                          );

                        })}
                        <TableDataCell className="py-0.5">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(event) => toggleDropdown(index, event, row.id)}
                              className="p-2 rounded-full group transition-all duration-500 hover:-translate-y-1 flex item-center">
                              <BsThreeDots className="w-5 h-5" />
                            </button>
                          </div>
                        </TableDataCell>
                      </tr>
                    )
                  })
                )
              }
            </TableBody>
          </table>
        </div>
      </TableContainer>
      {totalRows > 0 && (
        <TablePagination
          loading={loading}
          itemRange={itemRange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          onNumberPage={goToNumberPage}
          totalItems={totalRows}
          itemsPerPage={itemsPerPage}
        />
      )}
      {isOpenAction && (
        <ActionMenu
          onClose={closeDropdown}
          position={{ top: isOpenAction.top, left: isOpenAction.left }}
          ref={actionRef}
        >
          <ActionItem
            onClick={() => onView()}
            icon={IoEyeOutline}
            text="Show"
          />
          <ActionItem
            onClick={() => onEdit()}
            icon={BiEdit}
            text="Edit"
          />
          <ActionItem
            onClick={() => onDelete()}
            icon={BiEdit}
            text="Delete"
          />
        </ActionMenu>
      )}
      <Dialog
        size="xl"
        isOpen={isOpenView}
        toggleModal={toggleModalView}
        title='Product - View Detail'
      >
        <div className="max-h-[80vh] -mt-[20px]">
          <TableProductView
            data={viewData}
            loading={loadingView}
          />
        </div>
      </Dialog>


    </div>
  )
}
