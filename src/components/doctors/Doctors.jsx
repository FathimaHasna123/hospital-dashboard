import { Button, Form, Input, message, Modal, Select, Table, Upload } from "antd";
import React, { useState } from "react";
import { getDoctors } from "../../utils/doctors/DoctorsApi";
import { useQuery } from "react-query";
import { getDepartment } from "../../utils/department/DepartmentApi";
import { UploadOutlined } from '@ant-design/icons'
import { useCreateDoctors, useDeleteDoctors, useUpdateDoctors } from "../../utils/doctors/DoctorsHook";


function Doctors () {
    const {data,isLoading,refetch} = useQuery('getDoctors',getDoctors)
    const {data:departmentData} = useQuery('getDepartmentForDoctors',getDepartment)
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateId, setUpdateId] = useState()
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()
    const { mutate: Create } = useCreateDoctors()
    const { mutate: Update } = useUpdateDoctors ()
    const { mutate: Delete } = useDeleteDoctors()
    
    const columns = [
        {
            title:"Id",
            key:'id',
            dataIndex:'id'
        },
        {
            title:"DoctorsName",
            key:'doctorsName',
            dataIndex:'doctorsName'
        },
        {
            title:"Address",
            key:'address',
            dataIndex:'address'
        },
        {
            title:"Department",
            key:'department',
            dataIndex:['department','name']
        },
        {
            title:"Image",
            key:'image',
            dataIndex:'image',
            render:(text)=>(
                <img src={`http://127.0.0.1:8000${text}`} alt="" className="w-[50px] "/>
            )

        },
        {
            title:'Action',
            key:'id',
            render:(record)=>(
                <div className='flex items-center space-x-[20px]'>
                    <button className='text-white bg-blue-500 px-[10px] py-[5px] rounded-md' onClick={() => onOpenUpdateModal(record)} > Update </button>
                    <button className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'onClick={() => handleDelete(record.id)}>Delete</button> 
                </div>
            )
        }
    ]

 
     const onFinish = (values) => {
        const formData = new FormData()
        formData.append('doctorsName',values.doctorsName)
        formData.append('address',values.address)
        formData.append('department',values.department)
        formData.append('image',values.image.file.originFileObj)
         Create(formData, {
             onSuccess:()=>{
                 message.success('Created successfully')
                 setAddModal(false)
                 form.resetFields()
                 refetch()
             },
             onError:()=>{
                 message.error('Failed to create')
             }
         })
     }
  
     const updateFinish = (values) => {
        console.log("Updating Doctor ID:", updateId)
        console.log("Submitted Data:", values)
      
        const formData = new FormData();
        formData.append("doctorsName", values.doctorsName);
        formData.append("address", values.address);

        if (values.department.value){

            formData.append("department", values.department.value);
        }else {
            formData.append("department", values.department);
        }


        if (values.image&& values.image.file){

            formData.append('image',values.image.file.originFileObj)
        }else{
            console.log('ssss')
        }
       
         const val = { id: updateId, data: formData }
        
         Update(val, {
             onSuccess() {
                 message.success('Updated successfully')
                 setUpdateModal(false)
                 refetch()
             },
             onError() {
                 message.error('Failed to update')
             }
         })
 
         console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");  
     }
   

    const onOpenUpdateModal = (record) => {
        updateForm.setFieldsValue({
            doctorsName: record.doctorsName,  
            address: record.address,
            department:{ value: record.department.id, label: record.department.name },
        })
        updateForm.setFieldsValue({
            image: record.image[{
                uid: record.id, 
                name: 'image.jpg',
                status: 'done',
                url: `http://127.0.0.1:8000${record.image}`,
            }]
        });

        setUpdateId(record.id);
        console.log("Opening update modal for ID:", record.id)
        setUpdateModal(true);
    }
    
    

    const handleDelete = (id) => {
          Delete(id, {
              onSuccess() {
                  message.success('Deleted successfully')
                  refetch()
              },
              onError() {
                  message.error('Failed to delete')
              }
          })
      }
  

    return (
        <div>
            <div className="flex items-center justify-end">
                <button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={()=>setAddModal(true)}>Add</button>
            </div>
            <div className="">
            <Table loading={isLoading} columns={columns} dataSource={data?.data.map(item => ({ ...item, key: item.id }))} />

            </div>
            <Modal
            open={addModal}
            onCancel={()=>setAddModal(false)}
            footer={null}
            title="Add Doctors">

                <Form layout='vertical' onFinish={onFinish} form={form}>

                    <Form.Item name={'doctorsName'} label='DoctorsName'>
                        <Input placeholder='doctorsName'/>
                    </Form.Item>

                    <Form.Item name={'address'} label='Address'>
                        <Input placeholder="address"/>
                    </Form.Item>

                    
                    
                    <Form.Item name="department" label="Department">
      <Select
        placeholder="Select department"
        options={departmentData?.data.map((item) => ({
          value: item.id,
          label: item.name,
        }))}/>
                    </Form.Item>

                    <Form.Item name={'image'} label='Image'>
                        <Upload
                            name="image" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item className="m-0">
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                </Form>
            </Modal>

<Modal
            open={updateModal}
            onCancel={()=>setUpdateModal(false)}
            footer={null}
            title="Update Doctors">

                <Form layout='vertical' onFinish={updateFinish} form={updateForm}>

 <Form.Item name="doctorsName" label="Doctor's Name"  rules={[{ required: true, message: 'Please enter doctors name' }]}>
      <Input placeholder="Enter doctor's name" />
    </Form.Item>

 <Form.Item name={'address'} label='Address' rules={[{ required: true, message: 'Please enter an address' }]}>
     <Input placeholder="address"/>
    </Form.Item>

 <Form.Item name="department" label="Department"  rules={[{ required: true, message: 'Please select a department' }]}>
      <Select
        placeholder="Select department"
        options={departmentData?.data.map((item) => ({
          value: item.id,
          label: item.name,
        }))}/>
    </Form.Item>

<Form.Item name={'image'} label='Image'>
    <Upload
        name="image"
        listType="picture">
        <Button icon={<UploadOutlined />}></Button>
    </Upload>
</Form.Item>

                    <Form.Item>
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                
                </Form>
            </Modal>
        </div>
    )
}


export default Doctors