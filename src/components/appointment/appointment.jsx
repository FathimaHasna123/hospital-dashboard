import {  Table } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { getAppointment } from "../../utils/appointment/appointmentApi";



function Appointment () {
const {data,isLoading} = useQuery('getAppointment',getAppointment)



const columns = [
    {
        title:"Id",
        key:'id',
        dataIndex:'id'
    },
    {
        title:"Name",
        key:'name',
        dataIndex:'name'
    },
    {
        title:"Phone",
        key:'phone',
        dataIndex:'phone'
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
        title:"Doctors",
        key:'doctors',
        dataIndex:['doctors','name']
    },
    {
        title:"Time",
        key:'time',
        dataIndex:'time'
    },
    {
        title:"Action",
        key:'id',
        dataIndex:'action'
    },
    {
        title:" Status",
        key:'id',
        dataIndex:' status'
    },
]



    return(
        <div>
          
            <div className="">
                <Table loading={isLoading} columns={columns} dataSource={data?.data}/>
            </div>
          
        </div>
    )
}


export default Appointment