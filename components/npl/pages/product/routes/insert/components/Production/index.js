import React from 'react'
import FormButton from '../../../../../../components/form/FormButton'
import Label from '@/components/Label'
import Skeleton from '../../../../../../components/form/Skeleton'
import { ProductEnums } from '../../../../enums'
import { getValidationMessage } from '@/lib/npl/validationMessages'
import FormInput from '../../../../../../components/form/FormInput'
import FormInputSearch from '../../../../../../components/form/FormInputSearch'
import { useToggle } from '@/lib/hook/useToggle'
import { useFormContext } from 'react-hook-form'
import Accordion from '../../../../../../components/panel/Accordion'

export default function Product({ loading }) {


    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <div className='flex justify-end mb-6'>
                <FormButton disabled={loading} >
                    Save
                </FormButton>
            </div>
            <Accordion

                // isOpen={isOpen}
                title={'Product Information'}
                // toggle={toggle}
                className="mb-6">
                <div className="my-6 grid gap-x-6 gap-y-5 mb-6 lg:grid-cols-3 bg-white border border-gray-200 rounded-2xl  p-8">
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_NAME}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.branch", { required: getValidationMessage(ProductEnums.PRODUCT_NAME) })}
                                // disabled={true}
                                error={errors?.generalInformation?.branch}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_PRICE}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInputSearch
                                {...register("generalInformation.division", { required: getValidationMessage(ProductEnums.PRODUCT_PRICE) })}
                                // disabled={true}
                                error={errors?.generalInformation?.division}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.CATEGORY}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.department", { required: getValidationMessage(ProductEnums.CATEGORY) })}
                                // disabled={true}
                                error={errors?.generalInformation?.department}
                            />
                        )}
                    </div>
                </div>
            </Accordion>
            <Accordion

                // isOpen={isOpen}
                title={'Product Information'}
                // toggle={toggle}
                className="mb-6">
                <div className="my-6 grid gap-x-6 gap-y-5 mb-6 lg:grid-cols-3 bg-white border border-gray-200 rounded-2xl  p-8">
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_NAME}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.branch", { required: getValidationMessage(ProductEnums.PRODUCT_NAME) })}
                                // disabled={true}
                                error={errors?.generalInformation?.branch}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_PRICE}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInputSearch
                                {...register("generalInformation.division", { required: getValidationMessage(ProductEnums.PRODUCT_PRICE) })}
                                // disabled={true}
                                error={errors?.generalInformation?.division}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.CATEGORY}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.department", { required: getValidationMessage(ProductEnums.CATEGORY) })}
                                // disabled={true}
                                error={errors?.generalInformation?.department}
                            />
                        )}
                    </div>
                </div>
            </Accordion>
            <Accordion

                // isOpen={isOpen}
                title={'Product Information'}
                // toggle={toggle}
                className="mb-6">
                <div className="my-6 grid gap-x-6 gap-y-5 mb-6 lg:grid-cols-3 bg-white border border-gray-200 rounded-2xl  p-8">
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_NAME}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.branch", { required: getValidationMessage(ProductEnums.PRODUCT_NAME) })}
                                // disabled={true}
                                error={errors?.generalInformation?.branch}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_PRICE}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInputSearch
                                {...register("generalInformation.division", { required: getValidationMessage(ProductEnums.PRODUCT_PRICE) })}
                                // disabled={true}
                                error={errors?.generalInformation?.division}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.CATEGORY}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.department", { required: getValidationMessage(ProductEnums.CATEGORY) })}
                                // disabled={true}
                                error={errors?.generalInformation?.department}
                            />
                        )}
                    </div>
                </div>
            </Accordion>
            <Accordion
                defaultOpen={true}
                // isOpen={isOpen}
                title={'Product Information'}
                // toggle={toggle}
                className="mb-6">
                <div className="my-6 grid gap-x-6 gap-y-5 mb-6 lg:grid-cols-3 bg-white border border-gray-200 rounded-2xl  p-8">
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_NAME}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.branch", { required: getValidationMessage(ProductEnums.PRODUCT_NAME) })}
                                // disabled={true}
                                error={errors?.generalInformation?.branch}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.PRODUCT_PRICE}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInputSearch
                                {...register("generalInformation.division", { required: getValidationMessage(ProductEnums.PRODUCT_PRICE) })}
                                // disabled={true}
                                error={errors?.generalInformation?.division}
                            />
                        )}
                    </div>
                    <div>
                        <Label>
                            {ProductEnums.CATEGORY}
                            <span className="text-red-500 ml-1">*</span>
                        </Label>

                        {loading ? (
                            <Skeleton className="p-2.5 pr-12 border border-gray-300 rounded-lg w-full h-[40px]" />
                        ) : (
                            <FormInput
                                {...register("generalInformation.department", { required: getValidationMessage(ProductEnums.CATEGORY) })}
                                // disabled={true}
                                error={errors?.generalInformation?.department}
                            />
                        )}
                    </div>
                </div>
            </Accordion>



        </div>
    )
}
