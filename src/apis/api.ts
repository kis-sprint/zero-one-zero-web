import axios from 'axios';
export interface User {
  title: string;
  votes: Array<string>;
}

interface Vote {
  option: string;
  selecteduser: string;
}

export interface Info {
  title: string;
  user: string;
  votes: Array<Vote>;
}

export const getVoteListApi = async (): Promise<User> => {
  try {
    const { data } = await axios.get('/dummy/VoteListInfo.json');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getVoteResultListApi = async (): Promise<Info> => {
  try {
    const { data } = await axios.get('/dummy/VoteResultInfo.json');
    return data;
  } catch (error) {
    throw error;
  }
};
