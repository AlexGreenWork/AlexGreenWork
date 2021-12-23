import axios from 'axios'

class Server
{
	/**
		* @returns {import('axios').AxiosRequestConfig<any>}
	**/
	generate_default_auth_header()
	{
		return {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
	}

	/**
	 	* @param {import('axios').AxiosRequestConfig<any>} user_config - user request params
		* @returns {import('axios').AxiosRequestConfig<any>}
	**/
	concat_request_configs(user_config)
	{
		const header = this.generate_default_auth_header();

		return {
				...user_config,
				headers: {...header.headers,
							...user_config.headers
						}
			}
	}

	/**
		* @param {String} router - server path
		* @param {Object} data - user request data
	 	* @param {import('axios').AxiosRequestConfig<any>} config - user request params
		* @returns {Promise<import('axios').AxiosResponse<any>>}
	**/
	async send_post_request(router, data, config = { })
	{
		const url = router
		const request_config = this.concat_request_configs(config);
		console.log(request_config.headers)
		return axios.post(url, data, request_config);
	}

	/**
		* @param {String} router - server router path
	 	* @param {import('axios').AxiosRequestConfig<any>} config - user request params
		* @returns {Promise<import('axios').AxiosResponse<any>>}
	**/
	async send_get_request(router, config = { })
	{
		const url = router;
		const request_config = this.concat_request_configs(config);
		return axios.get(url, request_config);
	}

	/**
		* @param {String} router - server router path
		* @param {import('axios').AxiosRequestConfig<any>} config - user request params
		* @returns {Promise<import('axios').AxiosResponse<any>>}
	**/
	async send_delete_request(router, config = { })
	{
		const url = router;
		const request_config = this.concat_request_configs(config);
		return axios.delete(url, request_config);
	}
}

export default new Server();
