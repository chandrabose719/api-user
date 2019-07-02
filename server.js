const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, function(){
	console.log('Server Running on ' + port);
});

// DB Connection
mongoose.connect(
	'mongodb+srv://API-CLUSTER:API-CLUSTER@api-cluster-xsc2j.mongodb.net/test?retryWrites=true&w=majority', 
	{useNewUrlParser: true }, 
	function(err){
        if(err) {
            console.log('Some problem with the connection ' +err);
        }else{
            console.log('The Database is connected!');
        }
    }
);