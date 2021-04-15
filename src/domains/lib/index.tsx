import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table/interface';
import { ContextApp } from '../../core/reduser';
import { DataItem } from '../../api';
import { useGetData } from '../hooks';

type ThisLibItem = { key: string; val: string | number };

const columns: ColumnsType<ThisLibItem> = [
    {
        title: 'Ключ',
        dataIndex: 'key',
        width: 300,
    },
    {
        title: 'Значение',
        dataIndex: 'val',
        width: 300,
    },
];

export default function Lib() {
    const { address } = useParams<{ address: string | undefined }>();
    const { state, dispatch } = useContext(ContextApp);
    const { data, status } = state.librariesData;

    const [thisLib, setThisLib] = useState<ThisLibItem[]>([]);
    useGetData(dispatch, status);
    useEffect(() => {
        if (!data.length) return;
        const item = data.find((i) => i.address === address);
        if (!item) return;
        const arr: ThisLibItem[] = Object.keys(item).map((i) => ({
            key: i,
            val: item[i as keyof DataItem],
        }));

        setThisLib(arr);
    }, [data, address]);

    return (
        <Row justify="space-around" align="middle">
            {status === 'error' && <p>Что-то пошло не так</p>}
            {status === 'success' && (
                <Table columns={columns} dataSource={thisLib} rowKey="key" />
            )}
        </Row>
    );
}
