"use client"
import FormHeader from '@/components/dashboard/FormHeader'
import ImageInput from '@/components/FormInputs/ImageInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import TextInput from '@/components/FormInputs/TextInput'
import { makePostRequest } from '@/lib/apiRequest'
import { UploadButton } from '@/lib/uploadthing'
import { UploadDropzone } from '@uploadthing/react'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function NewItem() {

  const [imageUrl, setImageUrl] = useState("")

  const categories = [
    {
      label: "Electronics",
      value: "aeriry88990r8ryr"
    },
    {
      label: "Clothes",
      value: "yryrtertttsxvc009"
    }
  ]
  const units = [
    {
      label: "Kg",
      value: "aeriry88990r8ryr"
    },
    {
      label: "Pcs",
      value: "yryrtertttsxvc009"
    }
  ]
  const brands = [
    {
      label: "HP",
      value: "aeriry88990r8ryr"
    },
    {
      label: "Dell",
      value: "yryrtertttsxvc009"
    }
  ]
  const warehouses = [
    {
      label: "Warehouse A",
      value: "aeriry88990r8ryr"
    },
    {
      label: "Warehouse B",
      value: "yryrtertttsxvc009"
    },
    {
      label: "Warehouse C",
      value: "yryrtertttsxvc009"
    }
    
  ]
  const suppliers = [
    {
      label: "Supplier A",
      value: "aeriry88990r8ryr"
    },
    {
      label: "Supplier B",
      value: "yryrtertttsxvc009"
    },
    {
      label: "Supplier C",
      value: "yryrtertttsxvc009"
    }
    
  ]
  const selectOptions = [
    {
      label: "Main",
      value: "main"
    },
    {
      label: "Branch",
      value: "branch"
    }
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading,setLoading] = useState(false);

 async function onSubmit(data){
  data.imageUrl=imageUrl
  console.log(data);

        makePostRequest(setLoading,"api/items",data,"Item",reset)
    
    
  }


  return (
    <div>
        {/* Header */}
        <FormHeader title="New Item" href="/dashboard/inventory/" />
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput label="Warehouse Title" name="title" register={register}  errors={errors} className='w-full' />
            <SelectInput name="categoryId" label="Select the Item Category" register={register}  className='w-full'
            options={categories}
            
            />
          
          <TextInput label="Item SKU" name="sku" register={register}  errors={errors} className='w-full' />
          <TextInput label="Item Barcode" name="barcode" register={register}  errors={errors}
          /* isRequired={false} */
          
          className='w-full' />
          <TextInput label="Item Quantity" name="qty" register={register}  errors={errors} className='w-full' />
          <SelectInput name="unitId" label="Select the Unit" register={register}  className='w-full'
            options={units}
            
            />
          <SelectInput name="brandId" label="Select the Item Brand" register={register}  className='w-full'
            options={brands}
            
            />
            
            <TextInput label="Buying Price" name="buyingPrice" register={register}  errors={errors} type='number' className='w-full' />
            <TextInput label="Selling Price" name="sellingPrice" register={register}  errors={errors} type='number' className='w-full' />
            <SelectInput name="supplierId" label="Select the Item Supplier" register={register}  className='w-full'
            options={suppliers}
            
            />
            <TextInput label="Re-Order Point" name="reOrderPoint" register={register}  errors={errors} type='number' className='w-full' />
            <SelectInput name="warehouseId" label="Select the Item Warehouse" register={register}  className='w-full'
            options={warehouses}
            
            />

<TextInput label="Item Weight in Kgs" name="weight" register={register}  errors={errors} type='number' className='w-full' />
<TextInput label="Item Dimensions in cm(20 x 30 x 100)" name="dimensions" register={register}  errors={errors}  className='w-full' />
<TextInput label=" Item Tax Rate in % " name="taxRate" register={register}  errors={errors} type='number' className='w-full' />

<TextareaInput
          
          label="Item Description" 
          name="description" 
          register={register} 
           errors={errors}
          
          
          />

          
          <TextareaInput
          
          label="Item Notes" 
          name="notes" 
          register={register} 
           errors={errors}
          
          
          />

          <ImageInput  label="Item Image"
  imageUrl={imageUrl}
  setImageUrl={setImageUrl} endpoint = "imageUploader" />
          </div>

          <SubmitButton isLoading={loading} title="Item"/>



        </form>

    </div>
  )
}
