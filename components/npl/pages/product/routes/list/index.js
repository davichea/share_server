
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FilterData from './components/FilterData';
import TableProduct from './components/TableProduct';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAllProducts, searchProduct } from '../../service';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/utils/crypto';
import { useProductStore } from '../../../../globalStore/productStore';


const initColumns = [
  { id: 'all', name: 'Select All', checked: false, disabled: false },
  { id: 'No', name: 'No', checked: true, disabled: true },
  { id: 'action', name: 'Action', checked: true, disabled: true },
]

export default function PRODUCT_LIST() {
  const [loading, setLoading] = useState(false);
  const [dataPagination, setDataPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { formStore, setFormValue, validateFields } = useProductStore()
  const { isDataListValid, isCurrentPageValid } = validateFields();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      columns: initColumns,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    control,
    formState: { errors },
    reset
  } = methods
  const columns = watch('columns')
  const isOpenFilterData = watch("isOpenFilterData");

  useEffect(() => {
    if (!isCurrentPageValid)
      fetchInitialData();
  }, []);
  const fetchInitialData = async () => {
    setLoading(true)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(300);
      const [resProduct] = await Promise.all([
        getAllProducts.getAll()
      ])
      const resProducts = resProduct
      const formatData = resProduct?.products?.map(product => {
        return {
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          discount: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          sku: product.sku,
          weight: product.weight,
          warranty: product.warrantyInformation,
          shipping: product.shippingInformation,
          status: product.availabilityStatus,
          returnPolicy: product.returnPolicy,
          minOrderQty: product.minimumOrderQuantity,
          thumbnail: product.thumbnail
        };
      });

      initColumnsValue(formatData)
      setDataPagination({
        ...resProducts,
        formatData
      })
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }
  const initColumnsValue = (col) => {
    if (col.length > 0) {
      // const keyFilter = [
      //   "Co Borrower",
      //   "Branchs",
      //   "Loan Accounts",

      // ]
      // const columns = Object.keys(col[0])
      //   .filter((key) => !keyFilter.includes(key))
      //   .map((key) => ({
      //     id: key,
      //     name: key,
      //   }));
      // if have multiple user as the array

      const columns = Object.keys(col[0])
        .filter((key) => key !== 'id')
        .map((key) => ({
          id: key,
          name: key,
        }));

      const finalColumns = [
        initColumns[0],
        initColumns[1],
        ...columns,
        initColumns[2],
      ];
      const excludeKeys = [
        'all',
        'description',
        "sku",
        "shippingInformation",
        "returnPolicy",
        "warranty",
        "shipping",
        "status",
        "minOrderQty",
        "weight",
        "category",
        "rating",
        "brand"

      ]
      const colMap = finalColumns.map((item, index) => ({
        id: item.id,
        name: item.name,
        checked: !excludeKeys.includes(item.id),
        disabled: !excludeKeys.includes(item.id)
      }))

      setValue('checkedColumns', colMap);
      setValue('columns', colMap);

    }
  }

  const fetchDataPagination = async (data) => {
    setLoading(true);
    const value = getValues('chooseHere');

    // const filter = {
    //   page: data?.page || 1,
    //   pageSize: 15,
    //   // searchType: value.chooseHere || '',
    //   querySearch: value.chooseHere.trim() || '',
    // };

    // setValue('filter', filter)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      await delay(300);
      const [resProduct, resSearch] = await Promise.all([
        getAllProducts.getAll(),
        searchProduct.getSearch('', { params: { q: value } })
      ])
      const res = resSearch ? resSearch : resProduct
      const formatData = (resSearch?.products?.length > 0 ? resSearch.products : resProduct.products).map(product => {
        return {
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          discount: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          sku: product.sku,
          weight: product.weight,
          warranty: product.warrantyInformation,
          shipping: product.shippingInformation,
          status: product.availabilityStatus,
          returnPolicy: product.returnPolicy,
          minOrderQty: product.minimumOrderQuantity,
          thumbnail: product.thumbnail
        };
      });

      // initColumnsValue(formatData)
      setDataPagination({
        ...res,
        formatData
      })
    } catch (error) {
      if (error.status === 403 || error.status === 401) router.push('/')
    } finally {
      setLoading(false);
    }

  };
  const handleFormChange = () => {
    fetchDataPagination()
    setCurrentPage(1);
  };
  useEffect(() => {
    return () => {
      const { columns, checkedColumns } = getValues()
      const data = { columns, checkedColumns }
      saveToLocalStorage('product', data)
    };
  }, [getValues]);
  useEffect(() => {
    const decryptedData = getFromLocalStorage('product');
    if (decryptedData)
      Object.keys(decryptedData).forEach((key) => {
        setValue(key, decryptedData[key]);
      });
    initValueFromStore();
  }, [setValue]);



  const initValueFromStore = () => {
    const { dataList, currentPage } = formStore;
    if (dataList) setDataPagination(dataList)
    if (currentPage) setCurrentPage(currentPage);
  };
  useEffect(() => {
    const formData = { dataList: dataPagination, currentPage };
    setFormValue(formData);
  }, [dataPagination, currentPage]);

  return (
    <div >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormProvider {...methods}>
          <form>
            <FilterData
              loading={loading}
              totalRows={dataPagination.total}
              fetchData={fetchDataPagination}
              setCurrentPage={setCurrentPage}
              handleFormChange={handleFormChange}
            />
            <TableProduct
              columns={columns}
              data={dataPagination.formatData}
              totalRows={dataPagination.total}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              fetchData={fetchDataPagination}
              loading={loading}
              isOpenFilterData={isOpenFilterData}
            />
          </form>
        </FormProvider>
      </LocalizationProvider>
    </div>
  );
}
