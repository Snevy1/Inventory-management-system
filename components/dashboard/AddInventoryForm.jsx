"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import TextInput from '@/components/FormInputs/TextInput'
import { makePostRequest } from '@/lib/apiRequest'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddInventoryForm() {
  const branches = [
    {
      label: "Branch A",
      value: "tetrttry93949"
    },
    {
      label: "Branch B",
      value: "tetrttry93949"
    },
    {
      label: "Main A",
      value: "tetrttry93949"
    },
    {
      label: "Main B",
      value: "tetrttry93949"
    }
  ]
  const items = [
    {
      label: "Item A",
      value: "tetrttry93949"
    },
    {
      label: "Item B",
      value: "tetrttry93949"
    },
    {
      label: "Item C",
      value: "tetrttry93949"
    },
    {
      label: "Main B",
      value: "tetrttry93949"
    }
  ]

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
          <TextInput type='number' label="Reference Number"  name="referenceNumber" register={register}  errors={errors} className='w-full' />
          <SelectInput name="itemId" label="Select the Item" register={register}  className='w-full'
                      options={items}
                      
                      />
          <TextInput type='number' label="Enter Quantity of Stock to Add " name="addStockQty" register={register}  errors={errors} className='w-full' />

          <SelectInput name="receivingWarehouseId" label="Select the Warehouse that will receive the stock" register={register}  className='w-full'
                      options={branches}
                      
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
