import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { urlBuilder } from '../utils';

const useFetchSiteSettings = (slug: string) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchSetting = async () => {
        try {
            const { data } = await axios.post(urlBuilder.next + '/api/settings', { slug });
            setData(data.values);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data);
            setLoading(false);
            toast.error(error.response.data.message || error.response.data.error.message);
        }
    };

    useEffect(() => {
        fetchSetting();
    }, []);

    return { data, loading, refetch: fetchSetting };
};

export default useFetchSiteSettings;
