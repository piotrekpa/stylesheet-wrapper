function Stack(){
	this.stack = [];
};
Stack.prototype.push = function(fn) {
	if(typeof fn === "function"){
		this.stack.push(fn);
	}
};
Stack.prototype.run = function(executorCtx, args){
	var stack = this.stack, i, max = stack.length,
			args = Array.prototype.slice.call(arguments),
			executorCtx = args.shift(),

			next = function(){
				var fn = stack.shift(),
						newArgs = [];

				if(typeof fn === 'function'){
					if(stack.length > 0){
						newArgs.push(next); 
					}else{
						newArgs.push(undefined);
					}
					Array.prototype.push.apply(newArgs, args);
					fn.apply(executorCtx, newArgs);
				}
			};

	next();
};
exports.Stack = Stack;


var append = function(c, p){
	for(var i in c){
		if(c.hasOwnProperty(i)){
			if(typeof p[i] === "object"){
				p[i] = append(c[i], p[i]);
			}else{
				p[i] = c[i];
			}
		}
	}
	return p;
};
exports.append = append;