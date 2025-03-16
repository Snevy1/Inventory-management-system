"use client"

import FormHeader from '@/components/dashboard/FormHeader'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import TextInput from '@/components/FormInputs/TextInput'
import { makePostRequest } from '@/lib/apiRequest'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function NewBrand() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading,setLoading] = useState(false);

 async function onSubmit(data){
  console.log(data);
 
  
       makePostRequest(setLoading,"api/brands",data,"Brand",reset)
    
    
  }


  return (
    <div>
        {/* Header */}
        <FormHeader title="New Brand" href="/dashboard/inventory/brands" />
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3'>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput label=" Brand Title" name="title" register={register}  errors={errors} className='w-full' />
          
          
          </div>

          <SubmitButton isLoading={loading} title="Brand"/>



        </form>

    </div>
  )
}
