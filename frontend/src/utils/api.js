
import { useState } from 'react';
import {useQuery, useMutation} from 'react-query';

const URL = 'http://localhost:8000'

export const GetData = (endpoint) => {
    const backend_url = `${URL}/${endpoint}`;
    const key = endpoint;
    const [fetchError, setFetchError] = useState(false);

    const { isLoading, error, data } = useQuery(key, () => {
        fetch(backend_url).then(res => res.json())
            .catch(e => setFetchError(true))
    });

    return { isLoading, error, data, fetchError }; 
}

export const UpdateData = (endpoint, params) => {
    const backend_url = `${URL}/${endpoint}`;

    const mutation = useMutation(params => {
        return fetch(backend_url, params)
    });

    return mutation(params);
}