import { Button, Form, Input, message, Modal, Select, Table, Upload } from "antd";
import React, { useState } from "react";
import { getDoctors } from "../../utils/doctors/DoctorsApi";
import { useQuery } from "react-query";
import { getDepartment } from "../../utils/department/DepartmentApi";
import { useCreateDepartment, useDeleteDepartment, useUpdateDepartment } from "../../utils/department/DepartmentHook";
import { UploadOutlined } from '@ant-design/icons'


function Doctors () {
    const {data,isLoading,refetch} = useQuery('getDoctors',getDoctors)
    const {data:departmentData} = useQuery('getDepartmentForDoctors',getDepartment)
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateId, setUpdateId] = useState()
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()
    const { mutate: Create } = useCreateDepartment()
    const { mutate: UpdateDoc } = useUpdateDepartment()
    const { mutate: Delete123 } = useDeleteDepartment()
    
    const columns = [
        {
            title:"Id",
            key:'id',
            dataIndex:'id'
        },
        {
            title:"DoctrosName",
            key:'doctrosName',
            dataIndex:'doctrosName'
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
                    <button className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'onClick={() => handleDelete(record)}>Delete</button> 
                </div>
            )
        }
    ]

 
    const onFinish = (values) => {
        Create(values, {
            onSuccess: () => {
                message.success('Created successfully')
                setAddModal(false);
                form.resetFields();
                refetch();
            },
            onError: () => {
                message.error('Failed to create')
            }
        })
    }
   

    const onOpenUpdateModal = (record) => {
        updateForm.setFieldsValue({
            doctorsName: record.doctorsName,
            address: record.address,
            department: record.department.id, 
        })
        updateForm.setFieldsValue({
            image: [{
                uid: record.id, 
                name: 'image.jpg',
                status: 'done',
                url: `http://127.0.0.1:8000${record.image}`,
            }]
        });

        setUpdateId(record.id);
        setUpdateModal(true);
    }
      
       const updateFinish = (values) => {
           const val = { id: updateId, data: values }
          
           UpdateDoc(val, {
               onSuccess() {
                   message.success('Updated successfully')
                   setUpdateModal(false)
                   refetch()
               },
               onError() {
                   message.error('Failed to update')
               }
           })
   
           
       }
   

       const handleDelete = (values) => {
        Delete123(values.id, {
            onSuccess() {
                message.success('Deleted successfully');
                refetch();
            },
            onError() {
                message.error('Delete failed');
            }
        });
    };
  

    return (
        <div>
            <div className="flex items-center justify-end">
                <button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={()=>setAddModal(true)}>Add</button>
            </div>
            <div className="">
                <Table loading={isLoading} columns={columns} dataSource={data?.data}/>
            </div>
            <Modal
            open={addModal}
            onCancel={()=>setAddModal(false)}
            footer={null}
            title="Add Doctors">

                <Form layout='vertical' onFinish={onFinish} form={form}>

                    <Form.Item name={'doctrosName'} label='DoctrosName'>
                        <Input placeholder='doctrosName'/>
                    </Form.Item>

                    <Form.Item name={'address'} label='Address'>
                        <Input placeholder="address"/>
                    </Form.Item>

                    <Form.Item name={'department'} label='Department'>
                    
                    <Select placeholder='department'
                        options={departmentData?.data.map((item)=>({
                            value:item.id,
                            label:item.departmentName,
                        }))  } />
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

                    <Form.Item name={'doctrosName'} label='DoctrosName'>
                        <Input placeholder='doctrosName'/>
                    </Form.Item>

                    <Form.Item name={'address'} label='Address'>
                        <Input placeholder="address"/>
                    </Form.Item>

                    <Form.Item name={'department'} label='Department'>
                    
                    <Select placeholder='department'
                        options={departmentData?.data.map((item)=>({
                            value:item.id,
                            label:item.departmentName,
                        }))  } />
                    </Form.Item>

                    <Form.Item name={'image'} label='Image' >
                        <Upload
                            name="image" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name={'image'} label='Image'>
                        <Input placeholder='image'/>

                    </Form.Item>

                    <Form.Item className="m-0">
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                
                </Form>
            </Modal>
        </div>
    )
}


export default Doctors