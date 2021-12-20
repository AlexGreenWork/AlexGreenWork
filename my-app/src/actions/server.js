import axios from 'axios'

class Server
{
	constructor()
	{
		this.default_config	= {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
	}

	concat_request_configs(user_config)
	{
		return {...this.default_config,
				...user_config}
	}

	/**
		* @param {String} router - server path
		* @param {Object} data - user request data
	 	* @param {Object} config - user request params
		* @returns {Promise}
	**/
	async send_post_request(router, data, config = { })
	{
		const url = router
		const request_config = this.concat_request_configs(config);
		return axios.post(url, data, request_config);
	}

	/**
		* @param {String} router - server router path
		* @param {Object} config - user request params
		* @return {Promise}
	**/
	async send_get_request(router, config = { })
	{
		const url = router;
		const request_config = this.concat_request_configs(config);
		return axios.get(url, request_config);
	}

	/**
	 * @param {String} router - server router path
	 * @param {Object} config - user request params
	 * @return {Promise}
	 **/
	async send_delete_request(router, config = { })
	{
		const url = router;
		const request_config = this.concat_request_configs(config);
		return axios.delete(url, request_config);
	}
}

export default new Server();
