epa.constant("miServicioIP",{"ip": "http://172.26.104.37:9090/"});


epa.factory('listaPedido',function(){
    return{
        productos:[],
        total:0,
        getProductos: function() {
            console.log(this.productos)
            return this.productos;
        },
        getTotal: function() {
            return this.total;
        },
        addProductos:function(id,canti,total){
            console.log(this.productos)
            this.productos.push({"_id":id,"_cantidad":canti});
            this.total = this.total +total;
            console.log(this.total)
        }     
    };
})

epa.factory('productoSelect', function() {
  return {
    nombre:'',
    id:0,
    descripcion:'',
    cant:'',
    precio:0,
    
    getPrecio: function() {
      return this.precio;
    },
    getId: function() {
      return this.id;
    },
    getDes: function() {
      return this.descripcion;
    },
    getCant: function() {
      return this.cant;
    },
    getNombre: function() {
      return this.nombre;
    },
    setValor: function(nombre,id,des,can,precio) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = des;
      this.cant = can;
    this.precio = precio;
    }
  };
})



epa.controller('verProvedorContr',function($scope){
    $scope.provedores= [
         {id:"11111",name:"Albin",address:"4444"},
         {id:"22222",name:"Julissa",address:"4444"},
         {id:"33333",name:"Maria",address:"4444"},
         {id:"44444",name:"Juana",address:"4444"},
         {id:"55555",name:"Karla",address:"4444"},
         {id:"66666",name:"Sofia",address:"4444"},
         {id:"77777",name:"Marta",address:"4444"},
         {id:"88888",name:"Joaquina",address:"4444"},
         {id:"99999",name:"Damina",address:"4444"},
         {id:"12345",name:"Amgelica",address:"4444"},
         {id:"98765",name:"Eunice",address:"4444"},
         {id:"43684",name:"Kamila",address:"4444"},
    ];
});
epa.controller('verCategoriaContr',function($scope){
    $scope.categorias= [
         {id:"11111",descripcion:"Albin"},
          {id:"11111",descripcion:"Albin"},
        {id:"11111",descripcion:"Albin"},
          {id:"11111",descripcion:"Albin"},
        {id:"11111",descripcion:"Albin"},
          {id:"11111",descripcion:"Albin"},
        {id:"11111",descripcion:"Albin"},
          {id:"11111",descripcion:"Albin"}
    ];
});
epa.controller('pedidoContr',function($scope,productoSelect,$http,miServicioIP,listaPedido){
    $scope.pedido = [];
    $scope.dir= miServicioIP.ip + "products/getAll"
    
    $http.get($scope.dir).
          success(function(data){
                $scope.productos = data;
                console.log(data);
          });
    
    $scope.selecProduct = function(name,id,desc,cant,precio){
        productoSelect.setValor(name,id,desc,cant,precio);
        console.log("hola");
    }
    $scope.getPedido = function(){
        $scope.pedido = listaPedido.getProductos();
    }
    $scope.registrarPedido = function(){
        $scope.dir = miServicioIP.ip +"orders/register"
        $scope.total = listaPedido.getTotal();
        $scope.product = listaPedido.getProductos();
        $scope.date = new Date();
        $scope.d = $scope.date.getDate();
        $scope.m = $scope.date.getMonth();
        $scope.ano = $scope.date.getFullYear();
        
        $scope.horas = $scope.date.getHours();
        $scope.min = $scope.date.getMinutes();
        $scope.seg = $scope.date.getSeconds();
        
        $scope.fecha = $scope.ano+"-"+$scope.m+"-"+$scope.d+" "+$scope.horas+":"+$scope.min+":"+$scope.seg;
        
         $scope.data = {"_fechaHora":$scope.fecha,"_total":$scope.total,"_cliente":"juanp1995","_vendedor":"vendedor","_sucursal":1,"_productos":$scope.product}
         
         console.log($scope.data);
         
         $http.post($scope.dir,$scope.data).
            success(function(msj){
                console.log($scope.data);
                $scope.receiveMessage = msj;
                console.log(msj);
        });
         
         
    }
});

epa.controller('cantidadContr',function($scope,productoSelect,listaPedido){
    $scope.cantidad = 0;
    $scope.name ="";

    $scope.actualizar = function(){
        $scope.name = productoSelect.getNombre();
        $scope.id = productoSelect.getId();
        $scope.desc = productoSelect.getDes();
        $scope.cantidadD = productoSelect.getCant();
        $scope.precio = productoSelect.getPrecio();
    }
    $scope.confirmar = function(id,cant){
        listaPedido.addProductos(id,cant,$scope.precio*cant);
    }
});


epa.controller('addUserContr',function($scope,$http,miServicioIP){
     $scope.name="";
    $scope.lastN1="";
    $scope.lastN2="";
    $scope.uId="";
    $scope.tel="";
    $scope.provincia="";
    $scope.canton="";
    $scope.distrito="";
    $scope.usuario="";
    $scope.password="";
    $scope.date = "";
    $scope.ind={}
           
    
    $scope.dir = miServicioIP.ip +"rol/getRoles";
   
    $http.get($scope.dir).
          success(function(data){
                $scope.lroles = data;
                console.log(data);
          });
    
    $scope.dir = miServicioIP.ip +"users/register";
    
    $scope.registrarU = function(){
        
        $scope.data={"_usuario":$scope.usuario,
                 "_contrasena":$scope.password,
                 "_cedula":$scope.uId,
                 "_nombre":$scope.name,
                 "_pApellido":$scope.lastN1,
                 "_sApellido":$scope.lastN2,
                 "_fNacimiento":"1995-12-11",
                 "_telefono":$scope.tel,
                 "_provincia":$scope.provincia,
                 "_canton":$scope.canton,
                 "_distrito":$scope.distrito,
                 "_rol":$scope.ind._tipo};
        
        $http.post($scope.dir,$scope.data).
            success(function(msj){
                console.log($scope.data);
                $scope.receiveMessage = msj;
                console.log(msj);
        });
        
    }
});