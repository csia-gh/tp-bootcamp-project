import { toast } from 'react-toastify';
import api_instance from '../api/api_instance';

export const getRepositories = async (searchTerm: null | string) => {
  let url = 'repository';

  if (searchTerm) {
    url += `?language=${searchTerm}`;
  }

  try {
    const res = await api_instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('Fetching repository data failed!');
  }
};


export const getContributors = async (id: number) => {
  const url = `repository/${id}/contributors`;
  try {
    const res = await api_instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('Fetching contributors data failed!');
  }
};

export const getUsers = async () => {
  const url = `user`;
  try {
    const res = await api_instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('Fetching users data failed!');
  }
};


