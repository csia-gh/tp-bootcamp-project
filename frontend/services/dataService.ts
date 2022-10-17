import { toast } from 'react-toastify';
import api_instance from '../api/api_instance';
import { IRepository } from '../models/Repository';
import { IUser } from '../models/User';

export const getRepositories = async (searchTerm: null | string): Promise<IRepository[]> => {
  let url = 'repository';
  let params = {};

  if (searchTerm) {
    params["name"] = searchTerm;
  }

  try {
    const res = await api_instance.get(url, { params });
    return res.data;
  } catch (error) {
    if (error.response.status !== 404) {
      toast.error('Fetching repository data failed!');
      return;
    }
    return [];
  }
};


export const getContributors = async (id: number): Promise<IUser[]> => {
  const url = `repository/${id}/contributors`;
  try {
    const res = await api_instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('Fetching contributors data failed!');
  }
};

export const getUsers = async (searchTerm: null | string): Promise<IUser[]> => {
  const url = `user`;

  let params = {};

  if (searchTerm) {
    params["name"] = searchTerm;
  }

  try {
    const res = await api_instance.get(url, { params });

    return res.data;
  } catch (error) {
    if (error.response.status !== 404) {
      console.error(error);
      toast.error('Fetching users data failed!');
      return;
    }
    return [];
  }
};

export const getReposOfAUser = async (name: string): Promise<IRepository[]> => {
  const url = `user/${name}/contributions`;
  try {
    const res = await api_instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error('Fetching users data failed!');
  }
};


