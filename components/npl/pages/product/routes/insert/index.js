import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import Breadcrumb from '../../../../components/ui/Breadcrumb';
import Product from './components/Production';
import useRouterStore from '../../../../globalStore/store';

export default function PRODUCT_INSERT() {
    const [loading ,setLoading] = useState(false)
    const methods = useForm({
        mode: "onChange",

    });
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        control,
        trigger,
        getFieldState,
        clearErrors,
        setError,
        reset,
        formState: { errors },
    } = methods
    const { route, setRoute } = useRouterStore()
    useEffect(() => {
        console.log("route",route);
        
    }, [route]);
    const onSubmit = ()=>{

    }
    return (
        <div>
            <FormProvider {...methods}>
                <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
                    <Breadcrumb />
                    <Product loading={loading}/>                   {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BorrowerInformation loading={loading} />
            {
              borrowerId && <LegalAdviseLoanAccount loading={loading} />
            }
            <Resolution loading={loading} />
          </LocalizationProvider> */}
                </form>
                {/* <DialogResponse
          size="sm"
          isOpen={responseStatus}
          toggleModal={() => setResponseStatus(!responseStatus)}
          title="Message">
          <StatusMessage responseApi={responseApi} />
          {responseApi.statusCode != 200 && (
            <DialogButtonFooter
              actions={[{ label: "Okay", icon: "", action: "" }]}
              onAction={handleDialogResponse}
            />
          )}
          {responseApi.statusCode == 200 && (
            <DialogButtonFooter
              actions={[
                { label: "Add new", icon: IoPersonAddOutline, action: "add new" },
                { label: "Close", icon: IoMdClose, action: "close" },
              ]}
              onAction={handleDialogResponse}
            />
          )}
        </DialogResponse> */}
            </FormProvider>
        </div>
    )
}
