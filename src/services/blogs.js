import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async (newPost) => {
	const config = {
		headers: { Authorization: token }
	};
	const response = await axios.post(baseUrl, newPost, config);
	return response.data;
};

const update = async (updatedPost) => {
	const config = {
		headers: { Authorization: token }
	};
	const {author, date, likes, title, url, user} = updatedPost;
	const path = `${baseUrl}/${updatedPost.id}`;
	const response = await axios.put(path, {author, date, likes, title, url, user: user.id}, config);
	return response.data;
};

export default { getAll, create, update, setToken };