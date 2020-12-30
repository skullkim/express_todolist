const attribute = function(obj, action, method){
    //console.log(location.href);
    obj.setAttribute('action', action);
    obj.setAttribute('method', method);
}

export default attribute;