"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import TextInput from '@/components/FormInputs/TextInput'
import { makePostRequest } from '@/lib/apiRequest'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddInventoryForm({items, warehouses, suppliers}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const [loading,setLoading] = useState(false);

 async function onSubmit(data){
    makePostRequest(setLoading,"api/adjustments/add", data,"Stock Adjustment",reset)
    
    
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-4'>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput  label="Reference Number"  name="referenceNumber" register={register}  errors={errors}  />
          <SelectInput name="itemId" label="Select the Item" register={register}  className='w-full'
                      options={items}
                      
                      />

<SelectInput name="supplierId" label="Select the Supplier" register={register}  className='w-full'
                      options={suppliers}
                      
                      />
          <TextInput type='number' label="Enter Quantity of Stock to Add " name="addStockQty" register={register}  errors={errors} className='w-full' />

          <SelectInput name="receivingWarehouseId" label="Select the Warehouse that will receive the stock" register={register}  className='w-full'
                      options={warehouses}
                      
                      />
          
          <TextareaInput
          
          label="Adjustment Notes" 
          name="notes" 
          register={register} 
          errors={errors}
          
          
          />
          </div>

          <SubmitButton isLoading={loading} title="Adjustment"/>



        </form>
    
  )
}
