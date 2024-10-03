import { api } from "boot/axios";
import { reactive, ref } from "vue";
import { Notify, Loading } from 'quasar'


export function useService(url) {
  let listaData = ref([]);

  const OnErrorUnHandled = (error)=> {
    Loading.hide()
    if(error.code === 'ERR_NETWORK'){
      Notify.create({message:'Ocurrio un error de red al comunicarse con el servidor'})
    }
    Notify.create({message:error.response?.data?.errors[0].message, type:'negative'})
  }

  const PreResolve = (response, Resolve,message,hideMessage) => {      
      Loading.hide()
      if (message !== '' && !hideMessage) {
        Notify.create({message:message, type:'positive'})        
      }
      Resolve(response)
  }
 
  /**
  * Genera una peticion get al controlador especificado en su servicio se pueden agregar funciones secundarias pasando un action y actualiza los datos de la variable listaDta
  *  
  * @param {Object} options - Objeto que contiene los parametros 
  * @param {Function} options.Resolve - Funcion Calback que se ejecuta al obtener una respuesta correcta de la peticion. Retorna como parametro la respuesta de axios.
  * @param {Function} options.Reject -  Funcion Calback que se ejecyta al obtener un error en la respuesta de la peticion. Retorna como parametro un objeto Error.
  * @param {string} options.accion - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  */
  function Get({Resolve,Reject=null,action=''}) {        
    Loading.show();
    const errorFunc = Reject ?? OnErrorUnHandled     
    const mensaje = ''
    api.get(url + action).then(response => PreResolve(response,Resolve, mensaje),errorFunc)
  }

   /**
  * Genera una peticion p al controlador especificado en su servicio se pueden agregar funciones secundarias pasando un action y actualiza los datos de la variable listaDta
  * 
  * @param {Object} options - Objeto que contiene los parametros 
  * @param {Number}  options.id - Identificador unico necesario para realizar la peticion.  
  * @param {Function} options.Resolve - Funcion Calback que se ejecuta al obtener una respuesta correcta de la peticion. Retorna como parametro la respuesta de axios.
  * @param {Function} options.Reject -  Funcion Calback que se ejecyta al obtener un error en la respuesta de la peticion. Retorna como parametro un objeto Error.
  * @param {string} options.accion - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  */
  function GetById({id,Resolve,Reject=null,action =''}) {    
    Loading.show()
      const errorFunc = Reject ?? OnErrorUnHandled     
      const mensaje = ''
      api.get(`${url}${action}/${id}`).then(response => PreResolve(response,Resolve,mensaje),errorFunc) ;      
  }

 /**
  * Genera una peticion p al controlador especificado en su servicio se pueden agregar funciones secundarias pasando un action y actualiza los datos de la variable listaDta
  *
  * @param {Object} options - Objeto que contiene los parametros 
  * @param {Object} options.obj - Objeto Necesario para enviar con formato JSON en el body de la peticion del metodo post.  
  * @param {Function} options.Resolve - Funcion Calback que se ejecuta al obtener una respuesta correcta de la peticion. Retorna como parametro la respuesta de axios.
  * @param {Function} options.Reject -  Funcion Calback que se ejecyta al obtener un error en la respuesta de la peticion. Retorna como parametro un objeto Error.
  * @param {string} options.action - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  * @param {boolean} options.hideMessage - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  */
  async function Post({obj,Resolve,Reject=null, action='',hideMessage=false,}) {
    Loading.show()
    const errorFunc = Reject ?? OnErrorUnHandled     
    const mensaje = 'Registro guardado Correctamente'
    api.post(url+action, obj).then(response => PreResolve(response,Resolve,mensaje,hideMessage),errorFunc);
  }
   /**
  * Genera una peticion p al controlador especificado en su servicio se pueden agregar funciones secundarias pasando un action y actualiza los datos de la variable listaDta
  *
  * @param {Object} options - Objeto que contiene los parametros 
  * @param {Object} options.obj - Objeto Necesario para enviar con formato JSON en el body de la peticion del metodo post.  
  * @param {Function} options.Resolve - Funcion Calback que se ejecuta al obtener una respuesta correcta de la peticion. Retorna como parametro la respuesta de axios.
  * @param {Function} options.Reject -  Funcion Calback que se ejecyta al obtener un error en la respuesta de la peticion. Retorna como parametro un objeto Error.
  * @param {string} options.action - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  */
  async function Put({obj,Resolve,Reject=null,action=''}) {
    Loading.show()
    const errorFunc = Reject ?? OnErrorUnHandled  
    const mensaje = 'Registro actualizado Correctamente'
    api.put(`${url}${action}`, obj).then(response => PreResolve(response,Resolve,mensaje),errorFunc);
  }

  /**
  * Genera una peticion p al controlador especificado en su servicio se pueden agregar funciones secundarias pasando un action y actualiza los datos de la variable listaDta
  *
  * @param {Object} options - Objeto que contiene los parametros 
  * @param {Number}  options.id - Identificador unico necesario para realizar la peticion.  
  * @param {Function} options.Resolve - Funcion Calback que se ejecuta al obtener una respuesta correcta de la peticion. Retorna como parametro la respuesta de axios.
  * @param {Function} options.Reject -  Funcion Calback que se ejecyta al obtener un error en la respuesta de la peticion. Retorna como parametro un objeto Error.
  * @param {string} options.accion - (Opcional)Nnombre de la funcion que se va a mandar llamar en el controlador. Se debe llamar con una diagonal ej: /ObtenUsuariosEspecificos.  
  */
  function DeleteById({id,Resolve,Reject=null,action=''}) {
    Loading.show()
    const errorFunc = Reject ?? OnErrorUnHandled  
    const mensaje = 'Registro eliminado Correctamente'
    api.delete(`${url}${action}/${id}`).then(response => PreResolve(response,Resolve,mensaje),errorFunc);      
  }

  return {
    Get,
    GetById,
    Post,
    Put,
    DeleteById,
    listaData,
  };
}