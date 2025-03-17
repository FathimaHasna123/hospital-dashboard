
import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";
import { getDepartment } from "../../utils/department/DepartmentApi";
import { useCreateDepartment, useDeleteDepartment, useUpdateDepartment } from "../../utils/department/DepartmentHook";
import { useQuery } from "react-query";

function Department() {
    
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getDepartment'],
        queryFn: getDepartment,
    })

    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateId, setUpdateId] = useState()
    const [form] = Form.useForm()
    const [updateForm] = Form.useForm()
    const { mutate: Create } = useCreateDepartment()
    const { mutate: UpdateDep } = useUpdateDepartment()
    const { mutate: Delete } = useDeleteDepartment()

    const columns = [
        {
            title: "Id",
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: "Name",
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: "Action",
            key: 'action',
            render: (record) => (
                <div className="flex items-center space-x-[20px]">
          <button className='text-white bg-blue-500 px-[10px] py-[5px] rounded-md' onClick={() => onOpenUpdateModal(record)} > Update </button>
         <button className='text-white bg-blue-900 px-[10px] py-[5px] rounded-md'onClick={() => handleDelete(record.id)}>Delete</button>
                </div>
            )
        }
    ]

    const onFinish = (values) => {
        Create(values, {
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

    const onOpenUpdateModal = (record) => {
        updateForm.setFieldsValue({ name: record.name })
        setUpdateId(record.id)
        setUpdateModal(true)
    }

   
    const updateFinish = (values) => {
        const val = { id: updateId, data: values }
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
        UpdateDep(val, {
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
    
            <div className="flex items-center justify-end mb-4">
         <Button className="px-[13px] py-[7px] rounded-md text-white bg-black" onClick={() => setAddModal(true)}> Add </Button>
            </div>
            <Table loading={isLoading} columns={columns} dataSource={data?.data} />
            <Modal
                open={addModal}
                onCancel={() => setAddModal(false)}
                footer={null}
                title="Create Department">

                <Form layout="vertical" onFinish={onFinish} form={form}>

                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Department Name' }]}>
                        <Input placeholder="Department Name" />
                    </Form.Item>

                    <Form.Item className="m-0">
                 <Button type="primary" className="w-full" htmlType="submit">  Submit </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
                footer={null}
                title="Update Department"
            >
                <Form layout="vertical" onFinish={updateFinish} form={updateForm}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter Department Name' }]}>
                        <Input placeholder="Department Name" />
                    </Form.Item>
                    <Form.Item className="m-0">
                <Button type="primary" className="w-full" htmlType="submit"> Submit </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Department
