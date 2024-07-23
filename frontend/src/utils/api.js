
import { useState } from 'react';
import {useQuery, useMutation} from 'react-query';

const URL = 'http://localhost:8000'

export const GetData = (endpoint, params={}) => {
    const backend_url = `${URL}/${endpoint}`;
    const key = endpoint;
    //const [fetchError, setFetchError] = useState(false);

    const { status, data, error } = useQuery(key, async () => {
        const res = await fetch(backend_url);
        return res.json();
    });

    return { status, error, data }; 
}

export const UpdateData = (endpoint, params) => {
    const backend_url = `${URL}/${endpoint}`;

    const mutation = useMutation(params => {
        return fetch(backend_url, params)
    });

    return mutation(params);
}