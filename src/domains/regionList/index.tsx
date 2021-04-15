import React, { useContext, useEffect } from 'react';
import { Table, Row, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/lib/table/interface';
import { NavLink } from 'react-router-dom';
import { DataItem, getData } from '../../api';
import { ContextApp } from '../../core/reduser';
import { useGetData } from '../hooks';

const columns: ColumnsType<DataItem> = [
    {
        title: 'Регион',
        dataIndex: 'territory',
        width: 300,
        key: 'territory',
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value: string | number | boolean, record: DataItem) =>
            typeof value === 'string'
                ? record.territory.toLowerCase().includes(value.toLowerCase())
                : false,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div>
                <Input
                    placeholder={`Поиск `}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => {
                        confirm();
                    }}
                />
            </div>
        ),
        render: (value, record) => (
            <NavLink to={`/lib/${encodeURI(record.address)}`}>{value}</NavLink>
        ),
    },
    {
        title: 'Количество библеотек',
        dataIndex: 'libraries',
        sorter: (a: DataItem, b: DataItem) => a.libraries - b.libraries,
    },
];

export default function RegionList() {
    const { state, dispatch } = useContext(ContextApp);
    const { data, status } = state.librariesData;
    useGetData(dispatch, status);
    return (
        <Row justify="space-around" align="middle">
            {status === 'error' && <p>Что-то пошло не так</p>}
            {status === 'success' && (
                <Table columns={columns} dataSource={data} rowKey="address" />
            )}
        </Row>
    );
}
