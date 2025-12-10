import config from "../../config"



class RESTService {
  static instance = null

  constructor(baseURL) {
    if (RESTService.instance) {
      return RESTService.instance 
    }

    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    RESTService.instance = this
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      headers: { ...this.defaultHeaders, ...(options.headers || {}) },
      method: options.method || "GET",
    }

    if (options.body) {
      config.body = JSON.stringify(options.body)
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const msg = await response.text()
      throw new Error(`HTTP ${response.status}: ${msg}`)
    }


    if (response.status == 204){
      return "no content"
    }

    try { return await response.json() } 
    catch (e) { throw e }
  }

  getAll(entity, headers = {}) {
    if (!entity) {
      throw new Error("Nome da entidade é nescessário para fazer a requisição")
    }
    let endpoint = `/api/${entity}`
    return this.request(endpoint, { method: "GET", headers })
  }

  get(entity, id, headers = {}) {
    if (!entity || !id ) {
      throw new Error("Nome da entidade e ID são nescessários para fazer a requisição")
    }
    let endpoint = `/api/${entity}/${id}`
    return this.request(endpoint, { method: "GET", headers })
  }

  create(entity, user, body, headers = {}) {
    if (!entity || !user || !body) {
      throw new Error("Nome da entidade, user, e body são nescessários para fazer a requisição")
    }
    let endpoint = `/api/${entity}?username=${user.username}`
    console.log("Fazendo request: " + endpoint)
    return this.request(endpoint, { method: "POST", body, headers })
  }

  update(entity, id, user, body, headers = {}) {
    if (!entity || !id || !user || !body) {
      throw new Error("Nome da entidade, ID, user, e body são nescessários para fazer a requisição")
    }
    let endpoint = `/api/${entity}/${id}?username=${user.username}`
    return this.request(endpoint, { method: "PUT", body, headers })
  }

  delete(entity, id, user, headers = {}) {
    if (!entity || !id || !user) {
      throw new Error("Nome da entidade, ID e username são nescessários para fazer a requisição")
    }
    let endpoint = `/api/${entity}/${id}?username=${user.username}`
    return this.request(endpoint, { method: "DELETE", headers })
  }
}

const apiClient = new RESTService(config.apiBaseUrl)

export default apiClient
