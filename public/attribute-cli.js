const attribute = function(obj, action, method){
    obj.setAttribute('action', action);
    obj.setAttribute('method', method);
}

export default attribute;