// Browser bundle of nunjucks 1.1.0 

(function(){var modules={};(function(){function extend(cls,name,props){var F=function(){};F.prototype=cls.prototype;var prototype=new F;var fnTest=/xyz/.test(function(){xyz})?/\bparent\b/:/.*/;props=props||{};for(var k in props){var src=props[k];var parent=prototype[k];if(typeof parent=="function"&&typeof src=="function"&&fnTest.test(src)){prototype[k]=function(src,parent){return function(){var tmp=this.parent;this.parent=parent;var res=src.apply(this,arguments);this.parent=tmp;return res}}(src,parent)}else{prototype[k]=src}}prototype.typename=name;var new_cls=function(){if(prototype.init){prototype.init.apply(this,arguments)}};new_cls.prototype=prototype;new_cls.prototype.constructor=new_cls;new_cls.extend=function(name,props){if(typeof name=="object"){props=name;name="anonymous"}return extend(new_cls,name,props)};return new_cls}modules["object"]=extend(Object,"Object",{})})();(function(){var ArrayProto=Array.prototype;var ObjProto=Object.prototype;var escapeMap={"&":"&amp;",'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;"};var escapeRegex=/[&"'<>]/g;var lookupEscape=function(ch){return escapeMap[ch]};var exports=modules["lib"]={};exports.withPrettyErrors=function(path,withInternals,func){try{return func()}catch(e){if(!e.Update){e=new exports.TemplateError(e)}e.Update(path);if(!withInternals){var old=e;e=new Error(old.message);e.name=old.name}throw e}};exports.TemplateError=function(message,lineno,colno){var err=this;if(message instanceof Error){err=message;message=message.name+": "+message.message}else{if(Error.captureStackTrace){Error.captureStackTrace(err)}}err.name="Template render error";err.message=message;err.lineno=lineno;err.colno=colno;err.firstUpdate=true;err.Update=function(path){var message="("+(path||"unknown path")+")";if(this.firstUpdate){if(this.lineno&&this.colno){message+=" [Line "+this.lineno+", Column "+this.colno+"]"}else if(this.lineno){message+=" [Line "+this.lineno+"]"}}message+="\n ";if(this.firstUpdate){message+=" "}this.message=message+(this.message||"");this.firstUpdate=false;return this};return err};exports.TemplateError.prototype=Error.prototype;exports.escape=function(val){return val.replace(escapeRegex,lookupEscape)};exports.isFunction=function(obj){return ObjProto.toString.call(obj)=="[object Function]"};exports.isArray=Array.isArray||function(obj){return ObjProto.toString.call(obj)=="[object Array]"};exports.isString=function(obj){return ObjProto.toString.call(obj)=="[object String]"};exports.isObject=function(obj){return ObjProto.toString.call(obj)=="[object Object]"};exports.groupBy=function(obj,val){var result={};var iterator=exports.isFunction(val)?val:function(obj){return obj[val]};for(var i=0;i<obj.length;i++){var value=obj[i];var key=iterator(value,i);(result[key]||(result[key]=[])).push(value)}return result};exports.toArray=function(obj){return Array.prototype.slice.call(obj)};exports.without=function(array){var result=[];if(!array){return result}var index=-1,length=array.length,contains=exports.toArray(arguments).slice(1);while(++index<length){if(exports.indexOf(contains,array[index])===-1){result.push(array[index])}}return result};exports.extend=function(obj,obj2){for(var k in obj2){obj[k]=obj2[k]}return obj};exports.repeat=function(char_,n){var str="";for(var i=0;i<n;i++){str+=char_}return str};exports.each=function(obj,func,context){if(obj==null){return}if(ArrayProto.each&&obj.each==ArrayProto.each){obj.forEach(func,context)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++){func.call(context,obj[i],i,obj)}}};exports.map=function(obj,func){var results=[];if(obj==null){return results}if(ArrayProto.map&&obj.map===ArrayProto.map){return obj.map(func)}for(var i=0;i<obj.length;i++){results[results.length]=func(obj[i],i)}if(obj.length===+obj.length){results.length=obj.length}return results};exports.asyncIter=function(arr,iter,cb){var i=-1;function next(){i++;if(i<arr.length){iter(arr[i],i,next,cb)}else{cb()}}next()};exports.asyncFor=function(obj,iter,cb){var keys=exports.keys(obj);var len=keys.length;var i=-1;function next(){i++;var k=keys[i];if(i<len){iter(k,obj[k],i,len,next)}else{cb()}}next()};exports.indexOf=Array.prototype.indexOf?function(arr,searchElement,fromIndex){return Array.prototype.indexOf.call(arr,searchElement,fromIndex)}:function(arr,searchElement,fromIndex){var length=this.length>>>0;fromIndex=+fromIndex||0;if(Math.abs(fromIndex)===Infinity){fromIndex=0}if(fromIndex<0){fromIndex+=length;if(fromIndex<0){fromIndex=0}}for(;fromIndex<length;fromIndex++){if(arr[fromIndex]===searchElement){return fromIndex}}return-1};if(!Array.prototype.map){Array.prototype.map=function(){throw new Error("map is unimplemented for this js engine")}}exports.keys=function(obj){if(Object.prototype.keys){return obj.keys()}else{var keys=[];for(var k in obj){if(obj.hasOwnProperty(k)){keys.push(k)}}return keys}}})();(function(){var util=modules["util"];var lib=modules["lib"];var Object=modules["object"];function traverseAndCheck(obj,type,results){if(obj instanceof type){results.push(obj)}if(obj instanceof Node){obj.findAll(type,results)}}var Node=Object.extend("Node",{init:function(lineno,colno){this.lineno=lineno;this.colno=colno;var fields=this.fields;for(var i=0,l=fields.length;i<l;i++){var field=fields[i];var val=arguments[i+2];if(val===undefined){val=null}this[field]=val}},findAll:function(type,results){results=results||[];if(this instanceof NodeList){var children=this.children;for(var i=0,l=children.length;i<l;i++){traverseAndCheck(children[i],type,results)}}else{var fields=this.fields;for(var i=0,l=fields.length;i<l;i++){traverseAndCheck(this[fields[i]],type,results)}}return results},iterFields:function(func){lib.each(this.fields,function(field){func(this[field],field)},this)}});var Value=Node.extend("Value",{fields:["value"]});var NodeList=Node.extend("NodeList",{fields:["children"],init:function(lineno,colno,nodes){this.parent(lineno,colno,nodes||[])},addChild:function(node){this.children.push(node)}});var Root=NodeList.extend("Root");var Literal=Value.extend("Literal");var Symbol=Value.extend("Symbol");var Group=NodeList.extend("Group");var Array=NodeList.extend("Array");var Pair=Node.extend("Pair",{fields:["key","value"]});var Dict=NodeList.extend("Dict");var LookupVal=Node.extend("LookupVal",{fields:["target","val"]});var If=Node.extend("If",{fields:["cond","body","else_"]});var IfAsync=If.extend("IfAsync");var InlineIf=Node.extend("InlineIf",{fields:["cond","body","else_"]});var For=Node.extend("For",{fields:["arr","name","body","else_"]});var AsyncEach=For.extend("AsyncEach");var AsyncAll=For.extend("AsyncAll");var Macro=Node.extend("Macro",{fields:["name","args","body"]});var Caller=Macro.extend("Caller");var Import=Node.extend("Import",{fields:["template","target"]});var FromImport=Node.extend("FromImport",{fields:["template","names"],init:function(lineno,colno,template,names){this.parent(lineno,colno,template,names||new NodeList)}});var FunCall=Node.extend("FunCall",{fields:["name","args"]});var Filter=FunCall.extend("Filter");var FilterAsync=Filter.extend("FilterAsync",{fields:["name","args","symbol"]});var KeywordArgs=Dict.extend("KeywordArgs");var Block=Node.extend("Block",{fields:["name","body"]});var Super=Node.extend("Super",{fields:["blockName","symbol"]});var TemplateRef=Node.extend("TemplateRef",{fields:["template"]});var Extends=TemplateRef.extend("Extends");var Include=TemplateRef.extend("Include");var Set=Node.extend("Set",{fields:["targets","value"]});var Output=NodeList.extend("Output");var TemplateData=Literal.extend("TemplateData");var UnaryOp=Node.extend("UnaryOp",{fields:["target"]});var BinOp=Node.extend("BinOp",{fields:["left","right"]});var In=BinOp.extend("In");var Or=BinOp.extend("Or");var And=BinOp.extend("And");var Not=UnaryOp.extend("Not");var Add=BinOp.extend("Add");var Sub=BinOp.extend("Sub");var Mul=BinOp.extend("Mul");var Div=BinOp.extend("Div");var FloorDiv=BinOp.extend("FloorDiv");var Mod=BinOp.extend("Mod");var Pow=BinOp.extend("Pow");var Neg=UnaryOp.extend("Neg");var Pos=UnaryOp.extend("Pos");var Compare=Node.extend("Compare",{fields:["expr","ops"]});var CompareOperand=Node.extend("CompareOperand",{fields:["expr","type"]});var CustomTag=Node.extend("CustomTag",{init:function(lineno,colno,name){this.lineno=lineno;this.colno=colno;this.name=name}});var CallExtension=Node.extend("CallExtension",{fields:["extName","prop","args","contentArgs"],init:function(ext,prop,args,contentArgs){this.extName=ext._name||ext;this.prop=prop;this.args=args||new NodeList;this.contentArgs=contentArgs||[];this.autoescape=ext.autoescape}});var CallExtensionAsync=CallExtension.extend("CallExtensionAsync");function printNodes(node,indent){indent=indent||0;function print(str,indent,inline){var lines=str.split("\n");for(var i=0;i<lines.length;i++){if(lines[i]){if(inline&&i>0||!inline){for(var j=0;j<indent;j++){util.print(" ")}}}if(i===lines.length-1){util.print(lines[i])}else{util.puts(lines[i])}}}print(node.typename+": ",indent);if(node instanceof NodeList){print("\n");lib.each(node.children,function(n){printNodes(n,indent+2)})}else if(node instanceof CallExtension){print(node.extName+"."+node.prop);print("\n");if(node.args){printNodes(node.args,indent+2)}if(node.contentArgs){lib.each(node.contentArgs,function(n){printNodes(n,indent+2)})}}else{var nodes=null;var props=null;node.iterFields(function(val,field){if(val instanceof Node){nodes=nodes||{};nodes[field]=val}else{props=props||{};props[field]=val}});if(props){print(util.inspect(props,true,null)+"\n",null,true)}else{print("\n")}if(nodes){for(var k in nodes){printNodes(nodes[k],indent+2)}}}}modules["nodes"]={Node:Node,Root:Root,NodeList:NodeList,Value:Value,Literal:Literal,Symbol:Symbol,Group:Group,Array:Array,Pair:Pair,Dict:Dict,Output:Output,TemplateData:TemplateData,If:If,IfAsync:IfAsync,InlineIf:InlineIf,For:For,AsyncEach:AsyncEach,AsyncAll:AsyncAll,Macro:Macro,Caller:Caller,Import:Import,FromImport:FromImport,FunCall:FunCall,Filter:Filter,FilterAsync:FilterAsync,KeywordArgs:KeywordArgs,Block:Block,Super:Super,Extends:Extends,Include:Include,Set:Set,LookupVal:LookupVal,BinOp:BinOp,In:In,Or:Or,And:And,Not:Not,Add:Add,Sub:Sub,Mul:Mul,Div:Div,FloorDiv:FloorDiv,Mod:Mod,Pow:Pow,Neg:Neg,Pos:Pos,Compare:Compare,CompareOperand:CompareOperand,CallExtension:CallExtension,CallExtensionAsync:CallExtensionAsync,printNodes:printNodes}})();(function(){var lib=modules["lib"];var Obj=modules["object"];var Frame=Obj.extend({init:function(parent){this.variables={};this.parent=parent},set:function(name,val,resolveUp){var parts=name.split(".");var obj=this.variables;var frame=this;if(resolveUp){if(frame=this.resolve(parts[0])){frame.set(name,val);return}frame=this}for(var i=0;i<parts.length-1;i++){var id=parts[i];if(!obj[id]){obj[id]={}}obj=obj[id]}obj[parts[parts.length-1]]=val},get:function(name){var val=this.variables[name];if(val!==undefined&&val!==null){return val}return null},lookup:function(name){var p=this.parent;var val=this.variables[name];if(val!==undefined&&val!==null){return val}return p&&p.lookup(name)},resolve:function(name){var p=this.parent;var val=this.variables[name];if(val!=null){return this}return p&&p.resolve(name)},push:function(){return new Frame(this)},pop:function(){return this.parent}});function makeMacro(argNames,kwargNames,func){return function(){var argCount=numArgs(arguments);var args;var kwargs=getKeywordArgs(arguments);if(argCount>argNames.length){args=Array.prototype.slice.call(arguments,0,argNames.length);var vals=Array.prototype.slice.call(arguments,args.length,argCount);for(var i=0;i<vals.length;i++){if(i<kwargNames.length){kwargs[kwargNames[i]]=vals[i]}}args.push(kwargs)}else if(argCount<argNames.length){args=Array.prototype.slice.call(arguments,0,argCount);for(var i=argCount;i<argNames.length;i++){var arg=argNames[i];args.push(kwargs[arg]);delete kwargs[arg]}args.push(kwargs)}else{args=arguments}return func.apply(this,args)}}function makeKeywordArgs(obj){obj.__keywords=true;return obj}function getKeywordArgs(args){var len=args.length;if(len){var lastArg=args[len-1];if(lastArg&&lastArg.hasOwnProperty("__keywords")){return lastArg}}return{}}function numArgs(args){var len=args.length;if(len===0){return 0}var lastArg=args[len-1];if(lastArg&&lastArg.hasOwnProperty("__keywords")){return len-1}else{return len}}function SafeString(val){if(typeof val!="string"){return val}this.val=val}SafeString.prototype=Object.create(String.prototype);SafeString.prototype.valueOf=function(){return this.val};SafeString.prototype.toString=function(){return this.val};function copySafeness(dest,target){if(dest instanceof SafeString){return new SafeString(target)}return target.toString()}function markSafe(val){var type=typeof val;if(type==="string"){return new SafeString(val)}else if(type!=="function"){return val}else{return function(){var ret=val.apply(this,arguments);if(typeof ret==="string"){return new SafeString(ret)}return ret}}}function suppressValue(val,autoescape){val=val!==undefined&&val!==null?val:"";if(autoescape&&typeof val==="string"){val=lib.escape(val)}return val}function memberLookup(obj,val){obj=obj||{};if(typeof obj[val]==="function"){return function(){return obj[val].apply(obj,arguments)}}return obj[val]}function callWrap(obj,name,args){if(!obj){throw new Error("Unable to call `"+name+"`, which is undefined or falsey")}else if(typeof obj!=="function"){throw new Error("Unable to call `"+name+"`, which is not a function")}return obj.apply(this,args)}function contextOrFrameLookup(context,frame,name){var val=frame.lookup(name);return val!==undefined&&val!==null?val:context.lookup(name)}function handleError(error,lineno,colno){if(error.lineno){return error}else{return new lib.TemplateError(error,lineno,colno)}}function asyncEach(arr,dimen,iter,cb){if(lib.isArray(arr)){var len=arr.length;lib.asyncIter(arr,function(item,i,next){switch(dimen){case 1:iter(item,i,len,next);break;case 2:iter(item[0],item[1],i,len,next);break;case 3:iter(item[0],item[1],item[2],i,len,next);break;default:item.push(i,next);iter.apply(this,item)}},cb)}else{lib.asyncFor(arr,function(key,val,i,len,next){iter(key,val,i,len,next)},cb)}}function asyncAll(arr,dimen,func,cb){var finished=0;var len;var outputArr;function done(i,output){finished++;outputArr[i]=output;if(finished==len){cb(null,outputArr.join(""))}}if(lib.isArray(arr)){len=arr.length;outputArr=new Array(len);if(len==0){cb(null,"")}else{for(var i=0;i<arr.length;i++){var item=arr[i];switch(dimen){case 1:func(item,i,len,done);break;case 2:func(item[0],item[1],i,len,done);break;case 3:func(item[0],item[1],item[2],i,len,done);break;default:item.push(i,done);func.apply(this,item)}}}}else{var keys=lib.keys(arr);len=keys.length;outputArr=new Array(len);if(len==0){cb(null,"")}else{for(var i=0;i<keys.length;i++){var k=keys[i];func(k,arr[k],i,len,done)}}}}modules["runtime"]={Frame:Frame,makeMacro:makeMacro,makeKeywordArgs:makeKeywordArgs,numArgs:numArgs,suppressValue:suppressValue,memberLookup:memberLookup,contextOrFrameLookup:contextOrFrameLookup,callWrap:callWrap,handleError:handleError,isArray:lib.isArray,keys:lib.keys,SafeString:SafeString,copySafeness:copySafeness,markSafe:markSafe,asyncEach:asyncEach,asyncAll:asyncAll}})();(function(){var lib=modules["lib"];var whitespaceChars=" \n	\r";var delimChars="()[]{}%*-+/#,:|.<>=!";var intChars="0123456789";var BLOCK_START="{%";var BLOCK_END="%}";var VARIABLE_START="{{";var VARIABLE_END="}}";var COMMENT_START="{#";var COMMENT_END="#}";var TOKEN_STRING="string";var TOKEN_WHITESPACE="whitespace";var TOKEN_DATA="data";var TOKEN_BLOCK_START="block-start";var TOKEN_BLOCK_END="block-end";var TOKEN_VARIABLE_START="variable-start";var TOKEN_VARIABLE_END="variable-end";var TOKEN_COMMENT="comment";var TOKEN_LEFT_PAREN="left-paren";var TOKEN_RIGHT_PAREN="right-paren";var TOKEN_LEFT_BRACKET="left-bracket";var TOKEN_RIGHT_BRACKET="right-bracket";var TOKEN_LEFT_CURLY="left-curly";var TOKEN_RIGHT_CURLY="right-curly";var TOKEN_OPERATOR="operator";var TOKEN_COMMA="comma";var TOKEN_COLON="colon";var TOKEN_PIPE="pipe";var TOKEN_INT="int";var TOKEN_FLOAT="float";var TOKEN_BOOLEAN="boolean";var TOKEN_SYMBOL="symbol";var TOKEN_SPECIAL="special";var TOKEN_REGEX="regex";function token(type,value,lineno,colno){return{type:type,value:value,lineno:lineno,colno:colno}}function Tokenizer(str,tags){this.str=str;this.index=0;this.len=str.length;this.lineno=0;this.colno=0;this.in_code=false;tags=tags||{};this.tags={BLOCK_START:tags.blockStart||BLOCK_START,BLOCK_END:tags.blockEnd||BLOCK_END,VARIABLE_START:tags.variableStart||VARIABLE_START,VARIABLE_END:tags.variableEnd||VARIABLE_END,COMMENT_START:tags.commentStart||COMMENT_START,COMMENT_END:tags.commentEnd||COMMENT_END}}Tokenizer.prototype.nextToken=function(){var lineno=this.lineno;var colno=this.colno;if(this.in_code){var cur=this.current();var tok;if(this.is_finished()){return null}else if(cur=='"'||cur=="'"){return token(TOKEN_STRING,this.parseString(cur),lineno,colno)}else if(tok=this._extract(whitespaceChars)){return token(TOKEN_WHITESPACE,tok,lineno,colno)}else if((tok=this._extractString(this.tags.BLOCK_END))||(tok=this._extractString("-"+this.tags.BLOCK_END))){this.in_code=false;return token(TOKEN_BLOCK_END,tok,lineno,colno)}else if(tok=this._extractString(this.tags.VARIABLE_END)){this.in_code=false;return token(TOKEN_VARIABLE_END,tok,lineno,colno)}else if(cur==="r"&&this.str.charAt(this.index+1)==="/"){this.forwardN(2);var regexBody="";while(!this.is_finished()){if(this.current()==="/"&&this.previous()!=="\\"){this.forward();break}else{regexBody+=this.current();this.forward()}}var POSSIBLE_FLAGS=["g","i","m","y"];var regexFlags="";while(!this.is_finished()){var isCurrentAFlag=POSSIBLE_FLAGS.indexOf(this.current())!==-1;if(isCurrentAFlag){regexFlags+=this.current();this.forward()}else{break}}return token(TOKEN_REGEX,{body:regexBody,flags:regexFlags},lineno,colno)}else if(delimChars.indexOf(cur)!=-1){this.forward();var complexOps=["==","!=","<=",">=","//","**"];var curComplex=cur+this.current();var type;if(lib.indexOf(complexOps,curComplex)!==-1){this.forward();cur=curComplex}switch(cur){case"(":type=TOKEN_LEFT_PAREN;break;case")":type=TOKEN_RIGHT_PAREN;break;case"[":type=TOKEN_LEFT_BRACKET;break;case"]":type=TOKEN_RIGHT_BRACKET;break;case"{":type=TOKEN_LEFT_CURLY;break;case"}":type=TOKEN_RIGHT_CURLY;break;case",":type=TOKEN_COMMA;break;case":":type=TOKEN_COLON;break;case"|":type=TOKEN_PIPE;break;default:type=TOKEN_OPERATOR}return token(type,cur,lineno,colno)}else{tok=this._extractUntil(whitespaceChars+delimChars);if(tok.match(/^[-+]?[0-9]+$/)){if(this.current()=="."){this.forward();var dec=this._extract(intChars);return token(TOKEN_FLOAT,tok+"."+dec,lineno,colno)}else{return token(TOKEN_INT,tok,lineno,colno)}}else if(tok.match(/^(true|false)$/)){return token(TOKEN_BOOLEAN,tok,lineno,colno)}else if(tok){return token(TOKEN_SYMBOL,tok,lineno,colno)}else{throw new Error("Unexpected value while parsing: "+tok)}}}else{var beginChars=this.tags.BLOCK_START.charAt(0)+this.tags.VARIABLE_START.charAt(0)+this.tags.COMMENT_START.charAt(0)+this.tags.COMMENT_END.charAt(0);var tok;if(this.is_finished()){return null}else if((tok=this._extractString(this.tags.BLOCK_START+"-"))||(tok=this._extractString(this.tags.BLOCK_START))){this.in_code=true;return token(TOKEN_BLOCK_START,tok,lineno,colno)}else if(tok=this._extractString(this.tags.VARIABLE_START)){this.in_code=true;return token(TOKEN_VARIABLE_START,tok,lineno,colno)}else{tok="";var data;var in_comment=false;if(this._matches(this.tags.COMMENT_START)){in_comment=true;tok=this._extractString(this.tags.COMMENT_START)}while((data=this._extractUntil(beginChars))!==null){tok+=data;if((this._matches(this.tags.BLOCK_START)||this._matches(this.tags.VARIABLE_START)||this._matches(this.tags.COMMENT_START))&&!in_comment){break}else if(this._matches(this.tags.COMMENT_END)){if(!in_comment){throw new Error("unexpected end of comment")}tok+=this._extractString(this.tags.COMMENT_END);break}else{tok+=this.current();this.forward()}}if(data===null&&in_comment){throw new Error("expected end of comment, got end of file")}return token(in_comment?TOKEN_COMMENT:TOKEN_DATA,tok,lineno,colno)}}throw new Error("Could not parse text")};Tokenizer.prototype.parseString=function(delimiter){this.forward();var lineno=this.lineno;var colno=this.colno;var str="";while(!this.is_finished()&&this.current()!=delimiter){var cur=this.current();if(cur=="\\"){this.forward();switch(this.current()){case"n":str+="\n";break;case"t":str+="	";break;case"r":str+="\r";break;default:str+=this.current()}this.forward()}else{str+=cur;this.forward()}}this.forward();return str};Tokenizer.prototype._matches=function(str){if(this.index+str.length>this.length){return null}var m=this.str.slice(this.index,this.index+str.length);return m==str};Tokenizer.prototype._extractString=function(str){if(this._matches(str)){this.index+=str.length;return str}return null};Tokenizer.prototype._extractUntil=function(charString){return this._extractMatching(true,charString||"")};Tokenizer.prototype._extract=function(charString){return this._extractMatching(false,charString)};Tokenizer.prototype._extractMatching=function(breakOnMatch,charString){if(this.is_finished()){return null}var first=charString.indexOf(this.current());if(breakOnMatch&&first==-1||!breakOnMatch&&first!=-1){var t=this.current();this.forward();var idx=charString.indexOf(this.current());while((breakOnMatch&&idx==-1||!breakOnMatch&&idx!=-1)&&!this.is_finished()){t+=this.current();this.forward();idx=charString.indexOf(this.current())}return t}return""};Tokenizer.prototype.is_finished=function(){return this.index>=this.len};Tokenizer.prototype.forwardN=function(n){for(var i=0;i<n;i++){this.forward()}};Tokenizer.prototype.forward=function(){this.index++;if(this.previous()=="\n"){this.lineno++;this.colno=0}else{this.colno++}};Tokenizer.prototype.back=function(){this.index--;if(this.current()=="\n"){this.lineno--;var idx=this.src.lastIndexOf("\n",this.index-1);if(idx==-1){this.colno=this.index}else{this.colno=this.index-idx}}else{this.colno--}};Tokenizer.prototype.current=function(){if(!this.is_finished()){return this.str.charAt(this.index)}return""};Tokenizer.prototype.previous=function(){return this.str.charAt(this.index-1)};modules["lexer"]={lex:function(src,tags){return new Tokenizer(src,tags)},TOKEN_STRING:TOKEN_STRING,TOKEN_WHITESPACE:TOKEN_WHITESPACE,TOKEN_DATA:TOKEN_DATA,TOKEN_BLOCK_START:TOKEN_BLOCK_START,TOKEN_BLOCK_END:TOKEN_BLOCK_END,TOKEN_VARIABLE_START:TOKEN_VARIABLE_START,TOKEN_VARIABLE_END:TOKEN_VARIABLE_END,TOKEN_COMMENT:TOKEN_COMMENT,TOKEN_LEFT_PAREN:TOKEN_LEFT_PAREN,TOKEN_RIGHT_PAREN:TOKEN_RIGHT_PAREN,TOKEN_LEFT_BRACKET:TOKEN_LEFT_BRACKET,TOKEN_RIGHT_BRACKET:TOKEN_RIGHT_BRACKET,TOKEN_LEFT_CURLY:TOKEN_LEFT_CURLY,TOKEN_RIGHT_CURLY:TOKEN_RIGHT_CURLY,TOKEN_OPERATOR:TOKEN_OPERATOR,TOKEN_COMMA:TOKEN_COMMA,TOKEN_COLON:TOKEN_COLON,TOKEN_PIPE:TOKEN_PIPE,TOKEN_INT:TOKEN_INT,TOKEN_FLOAT:TOKEN_FLOAT,TOKEN_BOOLEAN:TOKEN_BOOLEAN,TOKEN_SYMBOL:TOKEN_SYMBOL,TOKEN_SPECIAL:TOKEN_SPECIAL,TOKEN_REGEX:TOKEN_REGEX}})();(function(){var lexer=modules["lexer"];var nodes=modules["nodes"];var Object=modules["object"];var lib=modules["lib"];var Parser=Object.extend({init:function(tokens){this.tokens=tokens;this.peeked=null;this.breakOnBlocks=null;this.dropLeadingWhitespace=false;this.extensions=[]},nextToken:function(withWhitespace){var tok;if(this.peeked){if(!withWhitespace&&this.peeked.type==lexer.TOKEN_WHITESPACE){this.peeked=null}else{tok=this.peeked;this.peeked=null;return tok}}tok=this.tokens.nextToken();if(!withWhitespace){while(tok&&tok.type==lexer.TOKEN_WHITESPACE){tok=this.tokens.nextToken()}}return tok},peekToken:function(){this.peeked=this.peeked||this.nextToken();return this.peeked},pushToken:function(tok){if(this.peeked){throw new Error("pushToken: can only push one token on between reads")}this.peeked=tok},fail:function(msg,lineno,colno){if((lineno===undefined||colno===undefined)&&this.peekToken()){var tok=this.peekToken();lineno=tok.lineno;colno=tok.colno}if(lineno!==undefined)lineno+=1;if(colno!==undefined)colno+=1;throw new lib.TemplateError(msg,lineno,colno)},skip:function(type){var tok=this.nextToken();if(!tok||tok.type!=type){this.pushToken(tok);return false}return true},expect:function(type){var tok=this.nextToken();if(tok.type!==type){this.fail("expected "+type+", got "+tok.type,tok.lineno,tok.colno)}return tok},skipValue:function(type,val){var tok=this.nextToken();if(!tok||tok.type!=type||tok.value!=val){this.pushToken(tok);return false}return true},skipWhitespace:function(){return this.skip(lexer.TOKEN_WHITESPACE)},skipSymbol:function(val){return this.skipValue(lexer.TOKEN_SYMBOL,val)},advanceAfterBlockEnd:function(name){if(!name){var tok=this.peekToken();if(!tok){this.fail("unexpected end of file")}if(tok.type!=lexer.TOKEN_SYMBOL){this.fail("advanceAfterBlockEnd: expected symbol token or "+"explicit name to be passed")}name=this.nextToken().value}var tok=this.nextToken();if(tok&&tok.type==lexer.TOKEN_BLOCK_END){if(tok.value.charAt(0)==="-"){this.dropLeadingWhitespace=true}}else{this.fail("expected block end in "+name+" statement")}},advanceAfterVariableEnd:function(){if(!this.skip(lexer.TOKEN_VARIABLE_END)){this.fail("expected variable end")}},parseFor:function(){var forTok=this.peekToken();var node;var endBlock;if(this.skipSymbol("for")){node=new nodes.For(forTok.lineno,forTok.colno);endBlock="endfor"}else if(this.skipSymbol("asyncEach")){node=new nodes.AsyncEach(forTok.lineno,forTok.colno);endBlock="endeach"}else if(this.skipSymbol("asyncAll")){node=new nodes.AsyncAll(forTok.lineno,forTok.colno);endBlock="endall"}else{this.fail("parseFor: expected for{Async}",forTok.lineno,forTok.colno)}node.name=this.parsePrimary();if(!(node.name instanceof nodes.Symbol)){this.fail("parseFor: variable name expected for loop")}var type=this.peekToken().type;if(type==lexer.TOKEN_COMMA){var key=node.name;node.name=new nodes.Array(key.lineno,key.colno);node.name.addChild(key);while(this.skip(lexer.TOKEN_COMMA)){var prim=this.parsePrimary();node.name.addChild(prim)}}if(!this.skipSymbol("in")){this.fail('parseFor: expected "in" keyword for loop',forTok.lineno,forTok.colno)}node.arr=this.parseExpression();this.advanceAfterBlockEnd(forTok.value);node.body=this.parseUntilBlocks(endBlock,"else");if(this.skipSymbol("else")){this.advanceAfterBlockEnd("else");node.else_=this.parseUntilBlocks(endBlock)}this.advanceAfterBlockEnd();return node},parseMacro:function(){var macroTok=this.peekToken();if(!this.skipSymbol("macro")){this.fail("expected macro")}var name=this.parsePrimary(true);var args=this.parseSignature();var node=new nodes.Macro(macroTok.lineno,macroTok.colno,name,args);this.advanceAfterBlockEnd(macroTok.value);node.body=this.parseUntilBlocks("endmacro");this.advanceAfterBlockEnd();return node},parseCall:function(){var callTok=this.peekToken();if(!this.skipSymbol("call")){this.fail("expected call")}var callerArgs=this.parseSignature(true)||new nodes.NodeList;var macroCall=this.parsePrimary();this.advanceAfterBlockEnd(callTok.value);var body=this.parseUntilBlocks("endcall");this.advanceAfterBlockEnd();var callerName=new nodes.Symbol(callTok.lineno,callTok.colno,"caller");var callerNode=new nodes.Caller(callTok.lineno,callTok.colno,callerName,callerArgs,body);var args=macroCall.args.children;if(!(args[args.length-1]instanceof nodes.KeywordArgs)){args.push(new nodes.KeywordArgs)}var kwargs=args[args.length-1];kwargs.addChild(new nodes.Pair(callTok.lineno,callTok.colno,callerName,callerNode));return new nodes.Output(callTok.lineno,callTok.colno,[macroCall])},parseImport:function(){var importTok=this.peekToken();if(!this.skipSymbol("import")){this.fail("parseImport: expected import",importTok.lineno,importTok.colno)}var template=this.parseExpression();if(!this.skipSymbol("as")){this.fail('parseImport: expected "as" keyword',importTok.lineno,importTok.colno)}var target=this.parsePrimary();var node=new nodes.Import(importTok.lineno,importTok.colno,template,target);this.advanceAfterBlockEnd(importTok.value);return node},parseFrom:function(){var fromTok=this.peekToken();if(!this.skipSymbol("from")){this.fail("parseFrom: expected from")}var template=this.parsePrimary();var node=new nodes.FromImport(fromTok.lineno,fromTok.colno,template,new nodes.NodeList);if(!this.skipSymbol("import")){this.fail("parseFrom: expected import",fromTok.lineno,fromTok.colno)}var names=node.names;while(1){var nextTok=this.peekToken();if(nextTok.type==lexer.TOKEN_BLOCK_END){if(!names.children.length){this.fail("parseFrom: Expected at least one import name",fromTok.lineno,fromTok.colno)}if(nextTok.value.charAt(0)=="-"){this.dropLeadingWhitespace=true}this.nextToken();break}if(names.children.length>0&&!this.skip(lexer.TOKEN_COMMA)){this.fail("parseFrom: expected comma",fromTok.lineno,fromTok.colno)}var name=this.parsePrimary();if(name.value.charAt(0)=="_"){this.fail("parseFrom: names starting with an underscore "+"cannot be imported",name.lineno,name.colno)}if(this.skipSymbol("as")){var alias=this.parsePrimary();names.addChild(new nodes.Pair(name.lineno,name.colno,name,alias))}else{names.addChild(name)}}return node},parseBlock:function(){var tag=this.peekToken();if(!this.skipSymbol("block")){this.fail("parseBlock: expected block",tag.lineno,tag.colno)}var node=new nodes.Block(tag.lineno,tag.colno);node.name=this.parsePrimary();if(!(node.name instanceof nodes.Symbol)){this.fail("parseBlock: variable name expected",tag.lineno,tag.colno)}this.advanceAfterBlockEnd(tag.value);node.body=this.parseUntilBlocks("endblock");if(!this.peekToken()){this.fail("parseBlock: expected endblock, got end of file")}this.advanceAfterBlockEnd();return node},parseTemplateRef:function(tagName,nodeType){var tag=this.peekToken();if(!this.skipSymbol(tagName)){this.fail("parseTemplateRef: expected "+tagName)}var node=new nodeType(tag.lineno,tag.colno);node.template=this.parseExpression();this.advanceAfterBlockEnd(tag.value);return node},parseExtends:function(){return this.parseTemplateRef("extends",nodes.Extends)},parseInclude:function(){return this.parseTemplateRef("include",nodes.Include)},parseIf:function(){var tag=this.peekToken();var node;if(this.skipSymbol("if")||this.skipSymbol("elif")){node=new nodes.If(tag.lineno,tag.colno)}else if(this.skipSymbol("ifAsync")){node=new nodes.IfAsync(tag.lineno,tag.colno)}else{this.fail("parseIf: expected if or elif",tag.lineno,tag.colno)}node.cond=this.parseExpression();this.advanceAfterBlockEnd(tag.value);node.body=this.parseUntilBlocks("elif","else","endif");var tok=this.peekToken();switch(tok&&tok.value){case"elif":node.else_=this.parseIf();break;case"else":this.advanceAfterBlockEnd();node.else_=this.parseUntilBlocks("endif");this.advanceAfterBlockEnd();break;case"endif":node.else_=null;this.advanceAfterBlockEnd();break;default:this.fail("parseIf: expected endif, else, or endif, "+"got end of file")}return node},parseSet:function(){var tag=this.peekToken();if(!this.skipSymbol("set")){this.fail("parseSet: expected set",tag.lineno,tag.colno)}var node=new nodes.Set(tag.lineno,tag.colno,[]);var target;while(target=this.parsePrimary()){node.targets.push(target);if(!this.skip(lexer.TOKEN_COMMA)){break}}if(!this.skipValue(lexer.TOKEN_OPERATOR,"=")){this.fail("parseSet: expected = in set tag",tag.lineno,tag.colno)}node.value=this.parseExpression();this.advanceAfterBlockEnd(tag.value);return node},parseStatement:function(){var tok=this.peekToken();var node;if(tok.type!=lexer.TOKEN_SYMBOL){this.fail("tag name expected",tok.lineno,tok.colno)}if(this.breakOnBlocks&&lib.indexOf(this.breakOnBlocks,tok.value)!==-1){return null}switch(tok.value){case"raw":return this.parseRaw();case"if":case"ifAsync":return this.parseIf();case"for":case"asyncEach":case"asyncAll":return this.parseFor();case"block":return this.parseBlock();case"extends":return this.parseExtends();case"include":return this.parseInclude();case"set":return this.parseSet();case"macro":return this.parseMacro();case"call":return this.parseCall();case"import":return this.parseImport();case"from":return this.parseFrom();default:if(this.extensions.length){for(var i=0;i<this.extensions.length;i++){var ext=this.extensions[i];
if(lib.indexOf(ext.tags||[],tok.value)!==-1){return ext.parse(this,nodes,lexer)}}}this.fail("unknown block tag: "+tok.value,tok.lineno,tok.colno)}return node},parseRaw:function(){this.advanceAfterBlockEnd();var str="";var begun=this.peekToken();while(1){var tok=this.nextToken(true);if(!tok){this.fail("expected endraw, got end of file")}if(tok.type==lexer.TOKEN_BLOCK_START){var ws=null;var name=this.nextToken(true);if(name.type==lexer.TOKEN_WHITESPACE){ws=name;name=this.nextToken()}if(name.type==lexer.TOKEN_SYMBOL&&name.value=="endraw"){this.advanceAfterBlockEnd(name.value);break}else{str+=tok.value;if(ws){str+=ws.value}str+=name.value}}else if(tok.type===lexer.TOKEN_STRING){str+='"'+tok.value+'"'}else{str+=tok.value}}var output=new nodes.Output(begun.lineno,begun.colno,[new nodes.TemplateData(begun.lineno,begun.colno,str)]);return output},parsePostfix:function(node){var tok=this.peekToken();while(tok){if(tok.type==lexer.TOKEN_LEFT_PAREN){node=new nodes.FunCall(tok.lineno,tok.colno,node,this.parseSignature())}else if(tok.type==lexer.TOKEN_LEFT_BRACKET){var lookup=this.parseAggregate();if(lookup.children.length>1){this.fail("invalid index")}node=new nodes.LookupVal(tok.lineno,tok.colno,node,lookup.children[0])}else if(tok.type==lexer.TOKEN_OPERATOR&&tok.value=="."){this.nextToken();var val=this.nextToken();if(val.type!=lexer.TOKEN_SYMBOL){this.fail("expected name as lookup value, got "+val.value,val.lineno,val.colno)}var lookup=new nodes.Literal(val.lineno,val.colno,val.value);node=new nodes.LookupVal(tok.lineno,tok.colno,node,lookup)}else{break}tok=this.peekToken()}return node},parseExpression:function(){var node=this.parseInlineIf();return node},parseInlineIf:function(){var node=this.parseIn();if(this.skipSymbol("if")){var cond_node=this.parseIn();var body_node=node;node=new nodes.InlineIf(node.lineno,node.colno);node.body=body_node;node.cond=cond_node;if(this.skipSymbol("else")){node.else_=this.parseIn()}else{node.else_=null}}return node},parseIn:function(){var node=this.parseOr();while(1){var tok=this.nextToken();if(!tok){break}var invert=tok.type==lexer.TOKEN_SYMBOL&&tok.value=="not";if(!invert){this.pushToken(tok)}if(this.skipSymbol("in")){var node2=this.parseOr();node=new nodes.In(node.lineno,node.colno,node,node2);if(invert){node=new nodes.Not(node.lineno,node.colno,node)}}else{if(invert){this.pushToken(tok)}break}}return node},parseOr:function(){var node=this.parseAnd();while(this.skipSymbol("or")){var node2=this.parseAnd();node=new nodes.Or(node.lineno,node.colno,node,node2)}return node},parseAnd:function(){var node=this.parseNot();while(this.skipSymbol("and")){var node2=this.parseNot();node=new nodes.And(node.lineno,node.colno,node,node2)}return node},parseNot:function(){var tok=this.peekToken();if(this.skipSymbol("not")){return new nodes.Not(tok.lineno,tok.colno,this.parseNot())}return this.parseCompare()},parseCompare:function(){var compareOps=["==","!=","<",">","<=",">="];var expr=this.parseAdd();var ops=[];while(1){var tok=this.nextToken();if(!tok){break}else if(lib.indexOf(compareOps,tok.value)!==-1){ops.push(new nodes.CompareOperand(tok.lineno,tok.colno,this.parseAdd(),tok.value))}else{this.pushToken(tok);break}}if(ops.length){return new nodes.Compare(ops[0].lineno,ops[0].colno,expr,ops)}else{return expr}},parseAdd:function(){var node=this.parseSub();while(this.skipValue(lexer.TOKEN_OPERATOR,"+")){var node2=this.parseSub();node=new nodes.Add(node.lineno,node.colno,node,node2)}return node},parseSub:function(){var node=this.parseMul();while(this.skipValue(lexer.TOKEN_OPERATOR,"-")){var node2=this.parseMul();node=new nodes.Sub(node.lineno,node.colno,node,node2)}return node},parseMul:function(){var node=this.parseDiv();while(this.skipValue(lexer.TOKEN_OPERATOR,"*")){var node2=this.parseDiv();node=new nodes.Mul(node.lineno,node.colno,node,node2)}return node},parseDiv:function(){var node=this.parseFloorDiv();while(this.skipValue(lexer.TOKEN_OPERATOR,"/")){var node2=this.parseFloorDiv();node=new nodes.Div(node.lineno,node.colno,node,node2)}return node},parseFloorDiv:function(){var node=this.parseMod();while(this.skipValue(lexer.TOKEN_OPERATOR,"//")){var node2=this.parseMod();node=new nodes.FloorDiv(node.lineno,node.colno,node,node2)}return node},parseMod:function(){var node=this.parsePow();while(this.skipValue(lexer.TOKEN_OPERATOR,"%")){var node2=this.parsePow();node=new nodes.Mod(node.lineno,node.colno,node,node2)}return node},parsePow:function(){var node=this.parseUnary();while(this.skipValue(lexer.TOKEN_OPERATOR,"**")){var node2=this.parseUnary();node=new nodes.Pow(node.lineno,node.colno,node,node2)}return node},parseUnary:function(noFilters){var tok=this.peekToken();var node;if(this.skipValue(lexer.TOKEN_OPERATOR,"-")){node=new nodes.Neg(tok.lineno,tok.colno,this.parseUnary(true))}else if(this.skipValue(lexer.TOKEN_OPERATOR,"+")){node=new nodes.Pos(tok.lineno,tok.colno,this.parseUnary(true))}else{node=this.parsePrimary()}if(!noFilters){node=this.parseFilter(node)}return node},parsePrimary:function(noPostfix){var tok=this.nextToken();var val=null;var node=null;if(!tok){this.fail("expected expression, got end of file")}else if(tok.type==lexer.TOKEN_STRING){val=tok.value}else if(tok.type==lexer.TOKEN_INT){val=parseInt(tok.value,10)}else if(tok.type==lexer.TOKEN_FLOAT){val=parseFloat(tok.value)}else if(tok.type==lexer.TOKEN_BOOLEAN){if(tok.value=="true"){val=true}else if(tok.value=="false"){val=false}else{this.fail("invalid boolean: "+tok.val,tok.lineno,tok.colno)}}else if(tok.type==lexer.TOKEN_REGEX){val=new RegExp(tok.value.body,tok.value.flags)}if(val!==null){node=new nodes.Literal(tok.lineno,tok.colno,val)}else if(tok.type==lexer.TOKEN_SYMBOL){node=new nodes.Symbol(tok.lineno,tok.colno,tok.value);if(!noPostfix){node=this.parsePostfix(node)}}else{this.pushToken(tok);node=this.parseAggregate()}if(node){return node}else{this.fail("unexpected token: "+tok.value,tok.lineno,tok.colno)}},parseFilter:function(node){while(this.skip(lexer.TOKEN_PIPE)){var tok=this.expect(lexer.TOKEN_SYMBOL);var name=tok.value;while(this.skipValue(lexer.TOKEN_OPERATOR,".")){name+="."+this.expect(lexer.TOKEN_SYMBOL).value}node=new nodes.Filter(tok.lineno,tok.colno,new nodes.Symbol(tok.lineno,tok.colno,name),new nodes.NodeList(tok.lineno,tok.colno,[node]));if(this.peekToken().type==lexer.TOKEN_LEFT_PAREN){var call=this.parsePostfix(node);node.args.children=node.args.children.concat(call.args.children)}}return node},parseAggregate:function(){var tok=this.nextToken();var node;switch(tok.type){case lexer.TOKEN_LEFT_PAREN:node=new nodes.Group(tok.lineno,tok.colno);break;case lexer.TOKEN_LEFT_BRACKET:node=new nodes.Array(tok.lineno,tok.colno);break;case lexer.TOKEN_LEFT_CURLY:node=new nodes.Dict(tok.lineno,tok.colno);break;default:return null}while(1){var type=this.peekToken().type;if(type==lexer.TOKEN_RIGHT_PAREN||type==lexer.TOKEN_RIGHT_BRACKET||type==lexer.TOKEN_RIGHT_CURLY){this.nextToken();break}if(node.children.length>0){if(!this.skip(lexer.TOKEN_COMMA)){this.fail("parseAggregate: expected comma after expression",tok.lineno,tok.colno)}}if(node instanceof nodes.Dict){var key=this.parsePrimary();if(!this.skip(lexer.TOKEN_COLON)){this.fail("parseAggregate: expected colon after dict key",tok.lineno,tok.colno)}var value=this.parseExpression();node.addChild(new nodes.Pair(key.lineno,key.colno,key,value))}else{var expr=this.parseExpression();node.addChild(expr)}}return node},parseSignature:function(tolerant,noParens){var tok=this.peekToken();if(!noParens&&tok.type!=lexer.TOKEN_LEFT_PAREN){if(tolerant){return null}else{this.fail("expected arguments",tok.lineno,tok.colno)}}if(tok.type==lexer.TOKEN_LEFT_PAREN){tok=this.nextToken()}var args=new nodes.NodeList(tok.lineno,tok.colno);var kwargs=new nodes.KeywordArgs(tok.lineno,tok.colno);var kwnames=[];var checkComma=false;while(1){tok=this.peekToken();if(!noParens&&tok.type==lexer.TOKEN_RIGHT_PAREN){this.nextToken();break}else if(noParens&&tok.type==lexer.TOKEN_BLOCK_END){break}if(checkComma&&!this.skip(lexer.TOKEN_COMMA)){this.fail("parseSignature: expected comma after expression",tok.lineno,tok.colno)}else{var arg=this.parseExpression();if(this.skipValue(lexer.TOKEN_OPERATOR,"=")){kwargs.addChild(new nodes.Pair(arg.lineno,arg.colno,arg,this.parseExpression()))}else{args.addChild(arg)}}checkComma=true}if(kwargs.children.length){args.addChild(kwargs)}return args},parseUntilBlocks:function(){var prev=this.breakOnBlocks;this.breakOnBlocks=lib.toArray(arguments);var ret=this.parse();this.breakOnBlocks=prev;return ret},parseNodes:function(){var tok;var buf=[];while(tok=this.nextToken()){if(tok.type==lexer.TOKEN_DATA){var data=tok.value;var nextToken=this.peekToken();var nextVal=nextToken&&nextToken.value;if(this.dropLeadingWhitespace){data=data.replace(/^\s*/,"");this.dropLeadingWhitespace=false}if(nextToken&&nextToken.type==lexer.TOKEN_BLOCK_START&&nextVal.charAt(nextVal.length-1)=="-"){data=data.replace(/\s*$/,"")}buf.push(new nodes.Output(tok.lineno,tok.colno,[new nodes.TemplateData(tok.lineno,tok.colno,data)]))}else if(tok.type==lexer.TOKEN_BLOCK_START){var n=this.parseStatement();if(!n){break}buf.push(n)}else if(tok.type==lexer.TOKEN_VARIABLE_START){var e=this.parseExpression();this.advanceAfterVariableEnd();buf.push(new nodes.Output(tok.lineno,tok.colno,[e]))}else if(tok.type!=lexer.TOKEN_COMMENT){this.fail("Unexpected token at top-level: "+tok.type,tok.lineno,tok.colno)}}return buf},parse:function(){return new nodes.NodeList(0,0,this.parseNodes())},parseAsRoot:function(){return new nodes.Root(0,0,this.parseNodes())}});modules["parser"]={parse:function(src,extensions,lexerTags){var p=new Parser(lexer.lex(src,lexerTags));if(extensions!==undefined){p.extensions=extensions}return p.parseAsRoot()}}})();(function(){var nodes=modules["nodes"];var lib=modules["lib"];var sym=0;function gensym(){return"hole_"+sym++}function mapCOW(arr,func){var res=null;for(var i=0;i<arr.length;i++){var item=func(arr[i]);if(item!==arr[i]){if(!res){res=arr.slice()}res[i]=item}}return res||arr}function walk(ast,func,depthFirst){if(!(ast instanceof nodes.Node)){return ast}if(!depthFirst){var astT=func(ast);if(astT&&astT!==ast){return astT}}if(ast instanceof nodes.NodeList){var children=mapCOW(ast.children,function(node){return walk(node,func,depthFirst)});if(children!==ast.children){ast=new nodes[ast.typename](ast.lineno,ast.colno,children)}}else if(ast instanceof nodes.CallExtension){var args=walk(ast.args,func,depthFirst);var contentArgs=mapCOW(ast.contentArgs,function(node){return walk(node,func,depthFirst)});if(args!==ast.args||contentArgs!==ast.contentArgs){ast=new nodes[ast.typename](ast.extName,ast.prop,args,contentArgs)}}else{var props=ast.fields.map(function(field){return ast[field]});var propsT=mapCOW(props,function(prop){return walk(prop,func,depthFirst)});if(propsT!==props){ast=new nodes[ast.typename](ast.lineno,ast.colno);propsT.forEach(function(prop,i){ast[ast.fields[i]]=prop})}}return depthFirst?func(ast)||ast:ast}function depthWalk(ast,func){return walk(ast,func,true)}function _liftFilters(node,asyncFilters,prop){var children=[];var walked=depthWalk(prop?node[prop]:node,function(node){if(node instanceof nodes.Block){return node}else if(node instanceof nodes.Filter&&lib.indexOf(asyncFilters,node.name.value)!==-1||node instanceof nodes.CallExtensionAsync){var symbol=new nodes.Symbol(node.lineno,node.colno,gensym());children.push(new nodes.FilterAsync(node.lineno,node.colno,node.name,node.args,symbol));return symbol}});if(prop){node[prop]=walked}else{node=walked}if(children.length){children.push(node);return new nodes.NodeList(node.lineno,node.colno,children)}else{return node}}function liftFilters(ast,asyncFilters){return depthWalk(ast,function(node){if(node instanceof nodes.Output){return _liftFilters(node,asyncFilters)}else if(node instanceof nodes.For){return _liftFilters(node,asyncFilters,"arr")}else if(node instanceof nodes.If){return _liftFilters(node,asyncFilters,"cond")}else if(node instanceof nodes.CallExtension){return _liftFilters(node,asyncFilters,"args")}})}function liftSuper(ast){return walk(ast,function(blockNode){if(!(blockNode instanceof nodes.Block)){return}var hasSuper=false;var symbol=gensym();blockNode.body=walk(blockNode.body,function(node){if(node instanceof nodes.FunCall&&node.name.value=="super"){hasSuper=true;return new nodes.Symbol(node.lineno,node.colno,symbol)}});if(hasSuper){blockNode.body.children.unshift(new nodes.Super(0,0,blockNode.name,new nodes.Symbol(0,0,symbol)))}})}function convertStatements(ast){return depthWalk(ast,function(node){if(!(node instanceof nodes.If)&&!(node instanceof nodes.For)){return}var async=false;walk(node,function(node){if(node instanceof nodes.FilterAsync||node instanceof nodes.IfAsync||node instanceof nodes.AsyncEach||node instanceof nodes.AsyncAll||node instanceof nodes.CallExtensionAsync){async=true;return node}});if(async){if(node instanceof nodes.If){return new nodes.IfAsync(node.lineno,node.colno,node.cond,node.body,node.else_)}else if(node instanceof nodes.For){return new nodes.AsyncEach(node.lineno,node.colno,node.arr,node.name,node.body,node.else_)}}})}function cps(ast,asyncFilters){return convertStatements(liftSuper(liftFilters(ast,asyncFilters)))}function transform(ast,asyncFilters,name){return cps(ast,asyncFilters||[])}modules["transformer"]={transform:transform}})();(function(){var lib=modules["lib"];var parser=modules["parser"];var transformer=modules["transformer"];var nodes=modules["nodes"];var Object=modules["object"];var Frame=modules["runtime"].Frame;var compareOps={"==":"==","!=":"!=","<":"<",">":">","<=":"<=",">=":">="};function binOpEmitter(str){return function(node,frame){this.compile(node.left,frame);this.emit(str);this.compile(node.right,frame)}}function quotedArray(arr){return"["+lib.map(arr,function(x){return'"'+x+'"'})+"]"}var Compiler=Object.extend({init:function(){this.codebuf=[];this.lastId=0;this.buffer=null;this.bufferStack=[];this.isChild=false;this.scopeClosers=""},fail:function(msg,lineno,colno){if(lineno!==undefined)lineno+=1;if(colno!==undefined)colno+=1;throw new lib.TemplateError(msg,lineno,colno)},pushBufferId:function(id){this.bufferStack.push(this.buffer);this.buffer=id;this.emit("var "+this.buffer+' = "";')},popBufferId:function(){this.buffer=this.bufferStack.pop()},emit:function(code){this.codebuf.push(code)},emitLine:function(code){this.emit(code+"\n")},emitLines:function(){lib.each(lib.toArray(arguments),function(line){this.emitLine(line)},this)},emitFuncBegin:function(name){this.buffer="output";this.scopeClosers="";this.emitLine("function "+name+"(env, context, frame, runtime, cb) {");this.emitLine("var lineno = null;");this.emitLine("var colno = null;");this.emitLine("var "+this.buffer+' = "";');this.emitLine("try {")},emitFuncEnd:function(noReturn){if(!noReturn){this.emitLine("cb(null, "+this.buffer+");")}this.closeScopeLevels();this.emitLine("} catch (e) {");this.emitLine("  cb(runtime.handleError(e, lineno, colno));");this.emitLine("}");this.emitLine("}");this.buffer=null},addScopeLevel:function(){this.scopeClosers+="})"},closeScopeLevels:function(){this.emitLine(this.scopeClosers+";");this.scopeClosers=""},withScopedSyntax:function(func){var scopeClosers=this.scopeClosers;this.scopeClosers="";func.call(this);this.closeScopeLevels();this.scopeClosers=scopeClosers},makeCallback:function(res){var err=this.tmpid();return"function("+err+(res?","+res:"")+") {\n"+"if("+err+") { cb("+err+"); return; }"},tmpid:function(){this.lastId++;return"t_"+this.lastId},_bufferAppend:function(func){this.emit(this.buffer+" += runtime.suppressValue(");func.call(this);this.emit(", env.autoesc);\n")},_compileChildren:function(node,frame){var children=node.children;for(var i=0,l=children.length;i<l;i++){this.compile(children[i],frame)}},_compileAggregate:function(node,frame,startChar,endChar){if(startChar){this.emit(startChar)}for(var i=0;i<node.children.length;i++){if(i>0){this.emit(",")}this.compile(node.children[i],frame)}if(endChar){this.emit(endChar)}},_compileExpression:function(node,frame){this.assertType(node,nodes.Literal,nodes.Symbol,nodes.Group,nodes.Array,nodes.Dict,nodes.FunCall,nodes.Caller,nodes.Filter,nodes.LookupVal,nodes.Compare,nodes.InlineIf,nodes.In,nodes.And,nodes.Or,nodes.Not,nodes.Add,nodes.Sub,nodes.Mul,nodes.Div,nodes.FloorDiv,nodes.Mod,nodes.Pow,nodes.Neg,nodes.Pos,nodes.Compare,nodes.NodeList);this.compile(node,frame)},assertType:function(node){var types=lib.toArray(arguments).slice(1);var success=false;for(var i=0;i<types.length;i++){if(node instanceof types[i]){success=true}}if(!success){this.fail("assertType: invalid type: "+node.typename,node.lineno,node.colno)}},compileCallExtension:function(node,frame,async){var name=node.extName;var args=node.args;var contentArgs=node.contentArgs;var autoescape=typeof node.autoescape==="boolean"?node.autoescape:true;var transformedArgs=[];if(!async){this.emit(this.buffer+" += runtime.suppressValue(")}this.emit('env.getExtension("'+node.extName+'")["'+node.prop+'"](');this.emit("context");if(args||contentArgs){this.emit(",")}if(args){if(!(args instanceof nodes.NodeList)){this.fail("compileCallExtension: arguments must be a NodeList, "+"use `parser.parseSignature`")}lib.each(args.children,function(arg,i){this._compileExpression(arg,frame);if(i!=args.children.length-1||contentArgs.length){this.emit(",")}},this)}if(contentArgs.length){lib.each(contentArgs,function(arg,i){if(i>0){this.emit(",")}if(arg){var id=this.tmpid();this.emitLine("function(cb) {");this.emitLine("if(!cb) { cb = function(err) { if(err) { throw err; }}}");this.pushBufferId(id);this.withScopedSyntax(function(){this.compile(arg,frame);this.emitLine("cb(null, "+id+");")});this.popBufferId();this.emitLine("return "+id+";");this.emitLine("}")}else{this.emit("null")}},this)}if(async){var res=this.tmpid();this.emitLine(", "+this.makeCallback(res));this.emitLine(this.buffer+" += runtime.suppressValue("+res+", "+autoescape+" && env.autoesc);");this.addScopeLevel()}else{this.emit(")");this.emit(", "+autoescape+" && env.autoesc);\n")}},compileCallExtensionAsync:function(node,frame){this.compileCallExtension(node,frame,true)},compileNodeList:function(node,frame){this._compileChildren(node,frame)},compileLiteral:function(node,frame){if(typeof node.value=="string"){var val=node.value.replace(/\\/g,"\\\\");val=val.replace(/"/g,'\\"');val=val.replace(/\n/g,"\\n");val=val.replace(/\r/g,"\\r");val=val.replace(/\t/g,"\\t");this.emit('"'+val+'"')}else{this.emit(node.value.toString())}},compileSymbol:function(node,frame){var name=node.value;var v;if(v=frame.lookup(name)){this.emit(v)}else{this.emit("runtime.contextOrFrameLookup("+'context, frame, "'+name+'")')}},compileGroup:function(node,frame){this._compileAggregate(node,frame,"(",")")},compileArray:function(node,frame){this._compileAggregate(node,frame,"[","]")},compileDict:function(node,frame){this._compileAggregate(node,frame,"{","}")},compilePair:function(node,frame){var key=node.key;var val=node.value;if(key instanceof nodes.Symbol){key=new nodes.Literal(key.lineno,key.colno,key.value)}else if(!(key instanceof nodes.Literal&&typeof key.value=="string")){this.fail("compilePair: Dict keys must be strings or names",key.lineno,key.colno)}this.compile(key,frame);this.emit(": ");this._compileExpression(val,frame)},compileInlineIf:function(node,frame){this.emit("(");this.compile(node.cond,frame);this.emit("?");this.compile(node.body,frame);this.emit(":");if(node.else_!==null)this.compile(node.else_,frame);else this.emit('""');this.emit(")")},compileIn:function(node,frame){this.emit("(");this.compile(node.right,frame);this.emit(".indexOf(");this.compile(node.left,frame);this.emit(") !== -1)")},compileOr:binOpEmitter(" || "),compileAnd:binOpEmitter(" && "),compileAdd:binOpEmitter(" + "),compileSub:binOpEmitter(" - "),compileMul:binOpEmitter(" * "),compileDiv:binOpEmitter(" / "),compileMod:binOpEmitter(" % "),compileNot:function(node,frame){this.emit("!");this.compile(node.target,frame)},compileFloorDiv:function(node,frame){this.emit("Math.floor(");this.compile(node.left,frame);this.emit(" / ");this.compile(node.right,frame);this.emit(")")},compilePow:function(node,frame){this.emit("Math.pow(");this.compile(node.left,frame);this.emit(", ");this.compile(node.right,frame);this.emit(")")},compileNeg:function(node,frame){this.emit("-");this.compile(node.target,frame)},compilePos:function(node,frame){this.emit("+");this.compile(node.target,frame)},compileCompare:function(node,frame){this.compile(node.expr,frame);for(var i=0;i<node.ops.length;i++){var n=node.ops[i];this.emit(" "+compareOps[n.type]+" ");this.compile(n.expr,frame)}},compileLookupVal:function(node,frame){this.emit("runtime.memberLookup((");this._compileExpression(node.target,frame);this.emit("),");this._compileExpression(node.val,frame);this.emit(", env.autoesc)")},_getNodeName:function(node){switch(node.typename){case"Symbol":return node.value;case"FunCall":return"the return value of ("+this._getNodeName(node.name)+")";case"LookupVal":return this._getNodeName(node.target)+'["'+this._getNodeName(node.val)+'"]';case"Literal":return node.value.toString().substr(0,10);default:return"--expression--"}},compileFunCall:function(node,frame){this.emit("(lineno = "+node.lineno+", colno = "+node.colno+", ");this.emit("runtime.callWrap(");this._compileExpression(node.name,frame);this.emit(', "'+this._getNodeName(node.name).replace(/"/g,'\\"')+'", ');this._compileAggregate(node.args,frame,"[","])");this.emit(")")},compileFilter:function(node,frame){var name=node.name;this.assertType(name,nodes.Symbol);this.emit('env.getFilter("'+name.value+'").call(context, ');this._compileAggregate(node.args,frame);this.emit(")")},compileFilterAsync:function(node,frame){var name=node.name;this.assertType(name,nodes.Symbol);var symbol=node.symbol.value;frame.set(symbol,symbol);this.emit('env.getFilter("'+name.value+'").call(context, ');this._compileAggregate(node.args,frame);this.emitLine(", "+this.makeCallback(symbol));this.addScopeLevel()},compileKeywordArgs:function(node,frame){var names=[];lib.each(node.children,function(pair){names.push(pair.key.value)});this.emit("runtime.makeKeywordArgs(");this.compileDict(node,frame);this.emit(")")},compileSet:function(node,frame){var ids=[];lib.each(node.targets,function(target){var name=target.value;var id=frame.lookup(name);if(id==null){id=this.tmpid();this.emitLine("var "+id+";")}ids.push(id)},this);this.emit(ids.join(" = ")+" = ");this._compileExpression(node.value,frame);this.emitLine(";");lib.each(node.targets,function(target,i){var id=ids[i];var name=target.value;this.emitLine('frame.set("'+name+'", '+id+", true);");this.emitLine("if(!frame.parent) {");this.emitLine('context.setVariable("'+name+'", '+id+");");if(name.charAt(0)!="_"){this.emitLine('context.addExport("'+name+'");')}this.emitLine("}")},this)},compileIf:function(node,frame,async){this.emit("if(");this._compileExpression(node.cond,frame);this.emitLine(") {");this.withScopedSyntax(function(){this.compile(node.body,frame);if(async){this.emit("cb()")}});if(node.else_){this.emitLine("}\nelse {");this.withScopedSyntax(function(){this.compile(node.else_,frame);if(async){this.emit("cb()")}})}else if(async){this.emitLine("}\nelse {");this.emit("cb()")}this.emitLine("}")},compileIfAsync:function(node,frame){this.emit("(function(cb) {");this.compileIf(node,frame,true);this.emit("})(function() {");this.addScopeLevel()},emitLoopBindings:function(node,arr,i,len){var bindings={index:i+" + 1",index0:i,revindex:len+" - "+i,revindex0:len+" - "+i+" - 1",first:i+" === 0",last:i+" === "+len+" - 1",length:len};for(var name in bindings){this.emitLine('frame.set("loop.'+name+'", '+bindings[name]+");")}},compileFor:function(node,frame){var i=this.tmpid();var len=this.tmpid();var arr=this.tmpid();frame=frame.push();this.emitLine("frame = frame.push();");this.emit("var "+arr+" = ");this._compileExpression(node.arr,frame);this.emitLine(";");this.emit("if("+arr+") {");if(node.name instanceof nodes.Array){this.emitLine("var "+i+";");this.emitLine("if(runtime.isArray("+arr+")) {");{this.emitLine("var "+len+" = "+arr+".length;");this.emitLine("for("+i+"=0; "+i+" < "+arr+".length; "+i+"++) {");for(var u=0;u<node.name.children.length;u++){var tid=this.tmpid();this.emitLine("var "+tid+" = "+arr+"["+i+"]["+u+"]");this.emitLine('frame.set("'+node.name.children[u].value+'", '+arr+"["+i+"]["+u+"]"+");");frame.set(node.name.children[u].value,tid)}this.emitLoopBindings(node,arr,i,len);this.withScopedSyntax(function(){this.compile(node.body,frame)});this.emitLine("}")}this.emitLine("} else {");{var key=node.name.children[0];var val=node.name.children[1];var k=this.tmpid();var v=this.tmpid();frame.set(key.value,k);frame.set(val.value,v);this.emitLine(i+" = -1;");this.emitLine("var "+len+" = runtime.keys("+arr+").length;");this.emitLine("for(var "+k+" in "+arr+") {");this.emitLine(i+"++;");this.emitLine("var "+v+" = "+arr+"["+k+"];");this.emitLine('frame.set("'+key.value+'", '+k+");");this.emitLine('frame.set("'+val.value+'", '+v+");");this.emitLoopBindings(node,arr,i,len);this.withScopedSyntax(function(){this.compile(node.body,frame)});this.emitLine("}")}this.emitLine("}")}else{var v=this.tmpid();frame.set(node.name.value,v);this.emitLine("var "+len+" = "+arr+".length;");this.emitLine("for(var "+i+"=0; "+i+" < "+arr+".length; "+i+"++) {");this.emitLine("var "+v+" = "+arr+"["+i+"];");this.emitLine('frame.set("'+node.name.value+'", '+v+");");this.emitLoopBindings(node,arr,i,len);this.withScopedSyntax(function(){this.compile(node.body,frame)});this.emitLine("}")}this.emitLine("}");if(node.else_){this.emitLine("if (!"+len+") {");this.compile(node.else_,frame);this.emitLine("}")}this.emitLine("frame = frame.pop();")},_compileAsyncLoop:function(node,frame,parallel){var i=this.tmpid();var len=this.tmpid();var arr=this.tmpid();var asyncMethod=parallel?"asyncAll":"asyncEach";frame=frame.push();this.emitLine("frame = frame.push();");this.emit("var "+arr+" = ");this._compileExpression(node.arr,frame);this.emitLine(";");if(node.name instanceof nodes.Array){this.emit("runtime."+asyncMethod+"("+arr+", "+node.name.children.length+", function(");lib.each(node.name.children,function(name){this.emit(name.value+",")},this);this.emit(i+","+len+",next) {");lib.each(node.name.children,function(name){var id=name.value;frame.set(id,id);this.emitLine('frame.set("'+id+'", '+id+");")},this)}else{var id=node.name.value;this.emitLine("runtime."+asyncMethod+"("+arr+", 1, function("+id+", "+i+", "+len+",next) {");this.emitLine('frame.set("'+id+'", '+id+");");frame.set(id,id)}this.emitLoopBindings(node,arr,i,len);this.withScopedSyntax(function(){var buf;if(parallel){buf=this.tmpid();this.pushBufferId(buf)}this.compile(node.body,frame);this.emitLine("next("+i+(buf?","+buf:"")+");");if(parallel){this.popBufferId()}});var output=this.tmpid();this.emitLine("}, "+this.makeCallback(output));this.addScopeLevel();if(parallel){this.emitLine(this.buffer+" += "+output+";")}if(node.else_){this.emitLine("if (!"+arr+".length) {");this.compile(node.else_,frame);this.emitLine("}")}this.emitLine("frame = frame.pop();")},compileAsyncEach:function(node,frame){this._compileAsyncLoop(node,frame)},compileAsyncAll:function(node,frame){this._compileAsyncLoop(node,frame,true)},_compileMacro:function(node,frame){var args=[];var kwargs=null;var funcId="macro_"+this.tmpid();lib.each(node.args.children,function(arg,i){if(i===node.args.children.length-1&&arg instanceof nodes.Dict){kwargs=arg}else{this.assertType(arg,nodes.Symbol);args.push(arg)}},this);var realNames=lib.map(args,function(n){return"l_"+n.value});realNames.push("kwargs");var argNames=lib.map(args,function(n){return'"'+n.value+'"'});var kwargNames=lib.map(kwargs&&kwargs.children||[],function(n){return'"'+n.key.value+'"'});frame=frame.push();this.emitLines("var "+funcId+" = runtime.makeMacro(","["+argNames.join(", ")+"], ","["+kwargNames.join(", ")+"], ","function ("+realNames.join(", ")+") {","frame = frame.push();","kwargs = kwargs || {};",'if (kwargs.hasOwnProperty("caller")) {','frame.set("caller", kwargs.caller); }');lib.each(args,function(arg){this.emitLine('frame.set("'+arg.value+'", '+"l_"+arg.value+");");frame.set(arg.value,"l_"+arg.value)},this);if(kwargs){lib.each(kwargs.children,function(pair){var name=pair.key.value;this.emit('frame.set("'+name+'", '+'kwargs.hasOwnProperty("'+name+'") ? '+'kwargs["'+name+'"] : ');this._compileExpression(pair.value,frame);this.emitLine(");")},this)}var bufferId=this.tmpid();this.pushBufferId(bufferId);this.withScopedSyntax(function(){this.compile(node.body,frame)});frame=frame.pop();this.emitLine("frame = frame.pop();");this.emitLine("return new runtime.SafeString("+bufferId+");");this.emitLine("});");this.popBufferId();return funcId},compileMacro:function(node,frame){var funcId=this._compileMacro(node,frame);var name=node.name.value;frame.set(name,funcId);if(frame.parent){this.emitLine('frame.set("'+name+'", '+funcId+");")}else{if(node.name.value.charAt(0)!="_"){this.emitLine('context.addExport("'+name+'");')}this.emitLine('context.setVariable("'+name+'", '+funcId+");")}},compileCaller:function(node,frame){this.emit("(function (){");var funcId=this._compileMacro(node,frame);this.emit("return "+funcId+";})()")},compileImport:function(node,frame){var id=this.tmpid();var target=node.target.value;this.emit("env.getTemplate(");this._compileExpression(node.template,frame);this.emitLine(", "+this.makeCallback(id));this.addScopeLevel();this.emitLine(id+".getExported("+this.makeCallback(id));this.addScopeLevel();frame.set(target,id);if(frame.parent){this.emitLine('frame.set("'+target+'", '+id+");")}else{this.emitLine('context.setVariable("'+target+'", '+id+");")}},compileFromImport:function(node,frame){var importedId=this.tmpid();this.emit("env.getTemplate(");this._compileExpression(node.template,frame);this.emitLine(", "+this.makeCallback(importedId));this.addScopeLevel();this.emitLine(importedId+".getExported("+this.makeCallback(importedId));this.addScopeLevel();lib.each(node.names.children,function(nameNode){var name;var alias;var id=this.tmpid();if(nameNode instanceof nodes.Pair){name=nameNode.key.value;alias=nameNode.value.value}else{name=nameNode.value;alias=name}this.emitLine("if("+importedId+'.hasOwnProperty("'+name+'")) {');this.emitLine("var "+id+" = "+importedId+"."+name+";");this.emitLine("} else {");this.emitLine("cb(new Error(\"cannot import '"+name+"'\")); return;");this.emitLine("}");frame.set(alias,id);if(frame.parent){this.emitLine('frame.set("'+alias+'", '+id+");")}else{this.emitLine('context.setVariable("'+alias+'", '+id+");")}},this)},compileBlock:function(node,frame){if(!this.isChild){var id=this.tmpid();this.emitLine('context.getBlock("'+node.name.value+'")'+"(env, context, frame, runtime, "+this.makeCallback(id));this.emitLine(this.buffer+" += "+id+";");this.addScopeLevel()}},compileSuper:function(node,frame){var name=node.blockName.value;var id=node.symbol.value;this.emitLine("context.getSuper(env, "+'"'+name+'", '+"b_"+name+", "+"frame, runtime, "+this.makeCallback(id));this.emitLine(id+" = runtime.markSafe("+id+");");this.addScopeLevel();frame.set(id,id)},compileExtends:function(node,frame){if(this.isChild){this.fail("compileExtends: cannot extend multiple times",node.template.lineno,node.template.colno)}var k=this.tmpid();this.emit("env.getTemplate(");this._compileExpression(node.template,frame);this.emitLine(", true, "+this.makeCallback("parentTemplate"));this.emitLine("for(var "+k+" in parentTemplate.blocks) {");this.emitLine("context.addBlock("+k+", parentTemplate.blocks["+k+"]);");this.emitLine("}");this.addScopeLevel();this.isChild=true},compileInclude:function(node,frame){var id=this.tmpid();var id2=this.tmpid();this.emit("env.getTemplate(");this._compileExpression(node.template,frame);this.emitLine(", "+this.makeCallback(id));this.addScopeLevel();this.emitLine(id+".render("+"context.getVariables(), frame.push(), "+this.makeCallback(id2));this.emitLine(this.buffer+" += "+id2);this.addScopeLevel()},compileTemplateData:function(node,frame){this.compileLiteral(node,frame)
},compileOutput:function(node,frame){var children=node.children;for(var i=0,l=children.length;i<l;i++){if(children[i]instanceof nodes.TemplateData){if(children[i].value){this.emit(this.buffer+" += ");this.compileLiteral(children[i],frame);this.emitLine(";")}}else{this.emit(this.buffer+" += runtime.suppressValue(");this.compile(children[i],frame);this.emit(", env.autoesc);\n")}}},compileRoot:function(node,frame){if(frame){this.fail("compileRoot: root node can't have frame")}frame=new Frame;this.emitFuncBegin("root");this._compileChildren(node,frame);if(this.isChild){this.emitLine("parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);")}this.emitFuncEnd(this.isChild);this.isChild=false;var blocks=node.findAll(nodes.Block);for(var i=0;i<blocks.length;i++){var block=blocks[i];var name=block.name.value;this.emitFuncBegin("b_"+name);var tmpFrame=new Frame;this.compile(block.body,tmpFrame);this.emitFuncEnd()}this.emitLine("return {");for(var i=0;i<blocks.length;i++){var block=blocks[i];var name="b_"+block.name.value;this.emitLine(name+": "+name+",")}this.emitLine("root: root\n};")},compile:function(node,frame){var _compile=this["compile"+node.typename];if(_compile){_compile.call(this,node,frame)}else{this.fail("compile: Cannot compile node: "+node.typename,node.lineno,node.colno)}},getCode:function(){return this.codebuf.join("")}});modules["compiler"]={compile:function(src,asyncFilters,extensions,name,lexerTags){var c=new Compiler;if(extensions&&extensions.length){for(var i=0;i<extensions.length;i++){if("preprocess"in extensions[i]){src=extensions[i].preprocess(src,name)}}}c.compile(transformer.transform(parser.parse(src,extensions,lexerTags),asyncFilters,name));return c.getCode()},Compiler:Compiler}})();(function(){var lib=modules["lib"];var r=modules["runtime"];var filters={abs:function(n){return Math.abs(n)},batch:function(arr,linecount,fill_with){var res=[];var tmp=[];for(var i=0;i<arr.length;i++){if(i%linecount===0&&tmp.length){res.push(tmp);tmp=[]}tmp.push(arr[i])}if(tmp.length){if(fill_with){for(var i=tmp.length;i<linecount;i++){tmp.push(fill_with)}}res.push(tmp)}return res},capitalize:function(str){var ret=str.toLowerCase();return r.copySafeness(str,ret.charAt(0).toUpperCase()+ret.slice(1))},center:function(str,width){width=width||80;if(str.length>=width){return str}var spaces=width-str.length;var pre=lib.repeat(" ",spaces/2-spaces%2);var post=lib.repeat(" ",spaces/2);return r.copySafeness(str,pre+str+post)},"default":function(val,def){return val?val:def},dictsort:function(val,case_sensitive,by){if(!lib.isObject(val)){throw new lib.TemplateError("dictsort filter: val must be an object")}var array=[];for(var k in val){array.push([k,val[k]])}var si;if(by===undefined||by==="key"){si=0}else if(by==="value"){si=1}else{throw new lib.TemplateError("dictsort filter: You can only sort by either key or value")}array.sort(function(t1,t2){var a=t1[si];var b=t2[si];if(!case_sensitive){if(lib.isString(a)){a=a.toUpperCase()}if(lib.isString(b)){b=b.toUpperCase()}}return a>b?1:a==b?0:-1});return array},escape:function(str){if(typeof str=="string"||str instanceof r.SafeString){return lib.escape(str)}return str},safe:function(str){return r.markSafe(str)},first:function(arr){return arr[0]},groupby:function(arr,attr){return lib.groupBy(arr,attr)},indent:function(str,width,indentfirst){width=width||4;var res="";var lines=str.split("\n");var sp=lib.repeat(" ",width);for(var i=0;i<lines.length;i++){if(i==0&&!indentfirst){res+=lines[i]+"\n"}else{res+=sp+lines[i]+"\n"}}return r.copySafeness(str,res)},join:function(arr,del,attr){del=del||"";if(attr){arr=lib.map(arr,function(v){return v[attr]})}return arr.join(del)},last:function(arr){return arr[arr.length-1]},length:function(arr){return arr!==undefined?arr.length:0},list:function(val){if(lib.isString(val)){return val.split("")}else if(lib.isObject(val)){var keys=[];if(Object.keys){keys=Object.keys(val)}else{for(var k in val){keys.push(k)}}return lib.map(keys,function(k){return{key:k,value:val[k]}})}else{throw new lib.TemplateError("list filter: type not iterable")}},lower:function(str){return str.toLowerCase()},random:function(arr){return arr[Math.floor(Math.random()*arr.length)]},replace:function(str,old,new_,maxCount){if(old instanceof RegExp){return str.replace(old,new_)}var res=str;var last=res;var count=1;res=res.replace(old,new_);while(last!=res){if(count>=maxCount){break}last=res;res=res.replace(old,new_);count++}return r.copySafeness(str,res)},reverse:function(val){var arr;if(lib.isString(val)){arr=filters.list(val)}else{arr=lib.map(val,function(v){return v})}arr.reverse();if(lib.isString(val)){return r.copySafeness(val,arr.join(""))}return arr},round:function(val,precision,method){precision=precision||0;var factor=Math.pow(10,precision);var rounder;if(method=="ceil"){rounder=Math.ceil}else if(method=="floor"){rounder=Math.floor}else{rounder=Math.round}return rounder(val*factor)/factor},slice:function(arr,slices,fillWith){var sliceLength=Math.floor(arr.length/slices);var extra=arr.length%slices;var offset=0;var res=[];for(var i=0;i<slices;i++){var start=offset+i*sliceLength;if(i<extra){offset++}var end=offset+(i+1)*sliceLength;var slice=arr.slice(start,end);if(fillWith&&i>=extra){slice.push(fillWith)}res.push(slice)}return res},sort:function(arr,reverse,caseSens,attr){arr=lib.map(arr,function(v){return v});arr.sort(function(a,b){var x,y;if(attr){x=a[attr];y=b[attr]}else{x=a;y=b}if(!caseSens&&lib.isString(x)&&lib.isString(y)){x=x.toLowerCase();y=y.toLowerCase()}if(x<y){return reverse?1:-1}else if(x>y){return reverse?-1:1}else{return 0}});return arr},string:function(obj){return r.copySafeness(obj,obj)},title:function(str){var words=str.split(" ");for(var i=0;i<words.length;i++){words[i]=filters.capitalize(words[i])}return r.copySafeness(str,words.join(" "))},trim:function(str){return r.copySafeness(str,str.replace(/^\s*|\s*$/g,""))},truncate:function(input,length,killwords,end){var orig=input;length=length||255;if(input.length<=length)return input;if(killwords){input=input.substring(0,length)}else{var idx=input.lastIndexOf(" ",length);if(idx===-1){idx=length}input=input.substring(0,idx)}input+=end!==undefined&&end!==null?end:"...";return r.copySafeness(orig,input)},upper:function(str){return str.toUpperCase()},urlencode:function(obj){var enc=encodeURIComponent;if(lib.isString(obj)){return enc(obj)}else{var parts;if(lib.isArray(obj)){parts=obj.map(function(item){return enc(item[0])+"="+enc(item[1])})}else{parts=[];for(var k in obj){if(obj.hasOwnProperty(k)){parts.push(enc(k)+"="+enc(obj[k]))}}}return parts.join("&")}},urlize:function(str,length,nofollow){if(isNaN(length))length=Infinity;var noFollowAttr=nofollow===true?' rel="nofollow"':"";var puncRE=/^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;var emailRE=/^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;var httpHttpsRE=/^https?:\/\/.*$/;var wwwRE=/^www\./;var tldRE=/\.(?:org|net|com)(?:\:|\/|$)/;var words=str.split(/\s+/).filter(function(word){return word&&word.length}).map(function(word){var matches=word.match(puncRE);var possibleUrl=matches&&matches[1]||word;if(httpHttpsRE.test(possibleUrl))return'<a href="'+possibleUrl+'"'+noFollowAttr+">"+possibleUrl.substr(0,length)+"</a>";if(wwwRE.test(possibleUrl))return'<a href="http://'+possibleUrl+'"'+noFollowAttr+">"+possibleUrl.substr(0,length)+"</a>";if(emailRE.test(possibleUrl))return'<a href="mailto:'+possibleUrl+'">'+possibleUrl+"</a>";if(tldRE.test(possibleUrl))return'<a href="http://'+possibleUrl+'"'+noFollowAttr+">"+possibleUrl.substr(0,length)+"</a>";return word});return words.join(" ")},wordcount:function(str){var words=str?str.match(/\w+/g):null;return words?words.length:null},"float":function(val,def){var res=parseFloat(val);return isNaN(res)?def:res},"int":function(val,def){var res=parseInt(val,10);return isNaN(res)?def:res}};filters.d=filters["default"];filters.e=filters.escape;modules["filters"]=filters})();(function(){function cycler(items){var index=-1;this.current=null;return{reset:function(){index=-1;this.current=null},next:function(){index++;if(index>=items.length){index=0}this.current=items[index];return this.current}}}function joiner(sep){sep=sep||",";var first=true;return function(){var val=first?"":sep;first=false;return val}}var globals={range:function(start,stop,step){if(!stop){stop=start;start=0;step=1}else if(!step){step=1}var arr=[];for(var i=start;i<stop;i+=step){arr.push(i)}return arr},cycler:function(){return cycler(Array.prototype.slice.call(arguments))},joiner:function(sep){return joiner(sep)}};modules["globals"]=globals})();(function(){var Obj=modules["object"];var lib=modules["lib"];var Loader=Obj.extend({on:function(name,func){this.listeners=this.listeners||{};this.listeners[name]=this.listeners[name]||[];this.listeners[name].push(func)},emit:function(name){var args=Array.prototype.slice.call(arguments,1);if(this.listeners&&this.listeners[name]){lib.each(this.listeners[name],function(listener){listener.apply(null,args)})}}});modules["loader"]=Loader})();(function(){var Loader=modules["loader"];var WebLoader=Loader.extend({init:function(baseURL,neverUpdate){this.precompiled=window.nunjucksPrecompiled||{};this.baseURL=baseURL||"";this.neverUpdate=neverUpdate},getSource:function(name){if(this.precompiled[name]){return{src:{type:"code",obj:this.precompiled[name]},path:name}}else{var src=this.fetch(this.baseURL+"/"+name);if(!src){return null}return{src:src,path:name,noCache:!this.neverUpdate}}},fetch:function(url,callback){var ajax;var loading=true;var src;if(window.XMLHttpRequest){ajax=new XMLHttpRequest}else if(window.ActiveXObject){ajax=new ActiveXObject("Microsoft.XMLHTTP")}ajax.onreadystatechange=function(){if(ajax.readyState===4&&(ajax.status===0||ajax.status===200)&&loading){loading=false;src=ajax.responseText}};url+=(url.indexOf("?")===-1?"?":"&")+"s="+(new Date).getTime();ajax.open("GET",url,false);ajax.send();return src}});modules["web-loaders"]={WebLoader:WebLoader}})();(function(){if(typeof window==="undefined"||window!==this){modules["loaders"]=modules["node-loaders"]}else{modules["loaders"]=modules["web-loaders"]}})();(function(){var path=modules["path"];var lib=modules["lib"];var Obj=modules["object"];var lexer=modules["lexer"];var compiler=modules["compiler"];var builtin_filters=modules["filters"];var builtin_loaders=modules["loaders"];var runtime=modules["runtime"];var globals=modules["globals"];var Frame=runtime.Frame;var Environment=Obj.extend({init:function(loaders,opts){opts=opts||{};this.dev=!!opts.dev;this.lexerTags=opts.tags;this.autoesc=!!opts.autoescape;if(!loaders){if(builtin_loaders.FileSystemLoader){this.loaders=[new builtin_loaders.FileSystemLoader("views")]}else{this.loaders=[new builtin_loaders.WebLoader("/views")]}}else{this.loaders=lib.isArray(loaders)?loaders:[loaders]}this.initCache();this.filters={};this.asyncFilters=[];this.extensions={};this.extensionsList=[];for(var name in builtin_filters){this.addFilter(name,builtin_filters[name])}},initCache:function(){var cache={};lib.each(this.loaders,function(loader){if(typeof loader.on==="function"){loader.on("update",function(template){cache[template]=null})}});this.cache=cache},addExtension:function(name,extension){extension._name=name;this.extensions[name]=extension;this.extensionsList.push(extension)},getExtension:function(name){return this.extensions[name]},addGlobal:function(name,value){globals[name]=value},addFilter:function(name,func,async){var wrapped=func;if(async){this.asyncFilters.push(name)}this.filters[name]=wrapped},getFilter:function(name){if(!this.filters[name]){throw new Error("filter not found: "+name)}return this.filters[name]},getTemplate:function(name,eagerCompile,cb){if(name&&name.raw){name=name.raw}if(lib.isFunction(eagerCompile)){cb=eagerCompile;eagerCompile=false}if(typeof name!=="string"){throw new Error("template names must be a string: "+name)}var tmpl=this.cache[name];if(tmpl){if(eagerCompile){tmpl.compile()}if(cb){cb(null,tmpl)}else{return tmpl}}else{var syncResult;lib.asyncIter(this.loaders,function(loader,i,next,done){function handle(src){if(src){done(src)}else{next()}}if(loader.async){loader.getSource(name,function(err,src){if(err){throw err}handle(src)})}else{handle(loader.getSource(name))}},function(info){if(!info){var err=new Error("template not found: "+name);if(cb){cb(err)}else{throw err}}else{var tmpl=new Template(info.src,this,info.path,eagerCompile);if(!info.noCache){this.cache[name]=tmpl}if(cb){cb(null,tmpl)}else{syncResult=tmpl}}}.bind(this));return syncResult}},express:function(app){var env=this;function NunjucksView(name,opts){this.name=name;this.path=name;this.defaultEngine=opts.defaultEngine;this.ext=path.extname(name);if(!this.ext&&!this.defaultEngine)throw new Error("No default engine was specified and no extension was provided.");if(!this.ext)this.name+=this.ext=("."!==this.defaultEngine[0]?".":"")+this.defaultEngine}NunjucksView.prototype.render=function(opts,cb){env.render(this.name,opts,cb)};app.set("view",NunjucksView)},render:function(name,ctx,cb){if(lib.isFunction(ctx)){cb=ctx;ctx=null}var syncResult=null;this.getTemplate(name,function(err,tmpl){if(err&&cb){cb(err)}else if(err){throw err}else{tmpl.render(ctx,cb||function(err,res){if(err){throw err}syncResult=res})}});return syncResult},renderString:function(src,ctx,cb){var tmpl=new Template(src,this);return tmpl.render(ctx,cb)}});var Context=Obj.extend({init:function(ctx,blocks){this.ctx=ctx;this.blocks={};this.exported=[];for(var name in blocks){this.addBlock(name,blocks[name])}},lookup:function(name){if(name in globals&&!(name in this.ctx)){return globals[name]}else{return this.ctx[name]}},setVariable:function(name,val){this.ctx[name]=val},getVariables:function(){return this.ctx},addBlock:function(name,block){this.blocks[name]=this.blocks[name]||[];this.blocks[name].push(block)},getBlock:function(name){if(!this.blocks[name]){throw new Error('unknown block "'+name+'"')}return this.blocks[name][0]},getSuper:function(env,name,block,frame,runtime,cb){var idx=lib.indexOf(this.blocks[name]||[],block);var blk=this.blocks[name][idx+1];var context=this;if(idx==-1||!blk){throw new Error('no super block available for "'+name+'"')}blk(env,context,frame,runtime,cb)},addExport:function(name){this.exported.push(name)},getExported:function(){var exported={};for(var i=0;i<this.exported.length;i++){var name=this.exported[i];exported[name]=this.ctx[name]}return exported}});var Template=Obj.extend({init:function(src,env,path,eagerCompile){this.env=env||new Environment;if(lib.isObject(src)){switch(src.type){case"code":this.tmplProps=src.obj;break;case"string":this.tmplStr=src.obj;break}}else if(lib.isString(src)){this.tmplStr=src}else{throw new Error("src must be a string or an object describing "+"the source")}this.path=path;if(eagerCompile){lib.withPrettyErrors(this.path,this.env.dev,this._compile.bind(this))}else{this.compiled=false}},render:function(ctx,frame,cb){if(typeof ctx==="function"){cb=ctx;ctx={}}else if(typeof frame==="function"){cb=frame;frame=null}return lib.withPrettyErrors(this.path,this.env.dev,function(){this.compile();var context=new Context(ctx||{},this.blocks);var syncResult=null;this.rootRenderFunc(this.env,context,frame||new Frame,runtime,cb||function(err,res){if(err){throw err}syncResult=res});return syncResult}.bind(this))},getExported:function(cb){this.compile();var context=new Context({},this.blocks);this.rootRenderFunc(this.env,context,new Frame,runtime,function(){cb(null,context.getExported())})},compile:function(){if(!this.compiled){this._compile()}},_compile:function(){var props;if(this.tmplProps){props=this.tmplProps}else{var source=compiler.compile(this.tmplStr,this.env.asyncFilters,this.env.extensionsList,this.path,this.env.lexerTags);var func=new Function(source);props=func()}this.blocks=this._getBlocks(props);this.rootRenderFunc=props.root;this.compiled=true},_getBlocks:function(props){var blocks={};for(var k in props){if(k.slice(0,2)=="b_"){blocks[k.slice(2)]=props[k]}}return blocks}});modules["environment"]={Environment:Environment,Template:Template}})();var nunjucks;var lib=modules["lib"];var env=modules["environment"];var compiler=modules["compiler"];var parser=modules["parser"];var lexer=modules["lexer"];var runtime=modules["runtime"];var Loader=modules["loader"];var loaders=modules["loaders"];var precompile=modules["precompile"];nunjucks={};nunjucks.Environment=env.Environment;nunjucks.Template=env.Template;nunjucks.Loader=Loader;nunjucks.FileSystemLoader=loaders.FileSystemLoader;nunjucks.WebLoader=loaders.WebLoader;nunjucks.compiler=compiler;nunjucks.parser=parser;nunjucks.lexer=lexer;nunjucks.runtime=runtime;var e;nunjucks.configure=function(templatesPath,opts){opts=opts||{};if(lib.isObject(templatesPath)){opts=templatesPath;templatesPath=null}var noWatch="watch"in opts?!opts.watch:false;var loader=loaders.FileSystemLoader||loaders.WebLoader;e=new env.Environment(new loader(templatesPath,noWatch),opts);if(opts&&opts.express){e.express(opts.express)}return e};nunjucks.compile=function(src,env,path,eagerCompile){if(!e){nunjucks.configure()}return new nunjucks.Template(src,env,path,eagerCompile)};nunjucks.render=function(name,ctx,cb){if(!e){nunjucks.configure()}return e.render(name,ctx,cb)};nunjucks.renderString=function(src,ctx,cb){if(!e){nunjucks.configure()}return e.renderString(src,ctx,cb)};if(precompile){nunjucks.precompile=precompile.precompile;nunjucks.precompileString=precompile.precompileString}nunjucks.require=function(name){return modules[name]};if(typeof define==="function"&&define.amd){define(function(){return nunjucks})}else{window.nunjucks=nunjucks;if(typeof module!=="undefined")module.exports=nunjucks}})();
/* JavaScript Route Matcher - v0.1.0 - 10/19/2011
 * http://github.com/cowboy/javascript-route-matcher
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function(exports) {
  // Characters to be escaped with \. RegExp borrowed from the Backbone router
  // but escaped (note: unnecessarily) to keep JSHint from complaining.
  var reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
  // Match named :param or *splat placeholders.
  var reParam = /([:*])(\w+)/g;

  // Test to see if a value matches the corresponding rule.
  function validateRule(rule, value) {
    // For a given rule, get the first letter of the string name of its
    // constructor function. "R" -> RegExp, "F" -> Function (these shouldn't
    // conflict with any other types one might specify). Note: instead of
    // getting .toString from a new object {} or Object.prototype, I'm assuming
    // that exports will always be an object, and using its .toString method.
    // Bad idea? Let me know by filing an issue
    var type = exports.toString.call(rule).charAt(8);
    // If regexp, match. If function, invoke. Otherwise, compare. Note that ==
    // is used because type coercion is needed, as `value` will always be a
    // string, but `rule` might not.
    return type === "R" ? rule.test(value) : type === "F" ? rule(value) : rule == value;
  }

  // Pass in a route string (or RegExp) plus an optional map of rules, and get
  // back an object with .parse and .stringify methods.
  exports.routeMatcher = function(route, rules) {
    // Object to be returned. The public API.
    var self = {};
    // Matched param or splat names, in order
    var names = [];
    // Route matching RegExp.
    var re = route;

    // Build route RegExp from passed string.
    if (typeof route === "string") {
      // Escape special chars.
      re = re.replace(reEscape, "\\$&");
      // Replace any :param or *splat with the appropriate capture group.
      re = re.replace(reParam, function(_, mode, name) {
        names.push(name);
        // :param should capture until the next / or EOL, while *splat should
        // capture until the next :param, *splat, or EOL.
        return mode === ":" ? "([^/]*)" : "(.*)";
      });
      // Add ^/$ anchors and create the actual RegExp.
      re = new RegExp("^" + re + "$");

      // Match the passed url against the route, returning an object of params
      // and values.
      self.parse = function(url) {
        var i = 0;
        var param, value;
        var params = {};
        var matches = url.match(re);
        // If no matches, return null.
        if (!matches) { return null; }
        // Add all matched :param / *splat values into the params object.
        while (i < names.length) {
          param = names[i++];
          value = matches[i];
          // If a rule exists for thie param and it doesn't validate, return null.
          if (rules && param in rules && !validateRule(rules[param], value)) { return null; }
          params[param] = value;
        }
        return params;
      };

      // Build path by inserting the given params into the route.
      self.stringify = function(params) {
        var param, re;
        var result = route;
        // Insert each passed param into the route string. Note that this loop
        // doesn't check .hasOwnProperty because this script doesn't support
        // modifications to Object.prototype.
        for (param in params) {
          re = new RegExp("[:*]" + param + "\\b");
          result = result.replace(re, params[param]);
        }
        // Missing params should be replaced with empty string.
        return result.replace(reParam, "");
      };
    } else {
      // RegExp route was passed. This is super-simple.
      self.parse = function(url) {
        var matches = url.match(re);
        return matches && {captures: matches.slice(1)};
      };
      // There's no meaningful way to stringify based on a RegExp route, so
      // return empty string.
      self.stringify = function() { return ""; };
    }
    return self;
  };

}(typeof exports === "object" && exports || this));

typeof JSON!="object"&&(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e,t){"use strict";var n=e.History=e.History||{};if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={handlers:{},_uid:1,uid:function(e){return e._uid||(e._uid=n.Adapter._uid++)},bind:function(e,t,r){var i=n.Adapter.uid(e);n.Adapter.handlers[i]=n.Adapter.handlers[i]||{},n.Adapter.handlers[i][t]=n.Adapter.handlers[i][t]||[],n.Adapter.handlers[i][t].push(r),e["on"+t]=function(e,t){return function(r){n.Adapter.trigger(e,t,r)}}(e,t)},trigger:function(e,t,r){r=r||{};var i=n.Adapter.uid(e),s,o;n.Adapter.handlers[i]=n.Adapter.handlers[i]||{},n.Adapter.handlers[i][t]=n.Adapter.handlers[i][t]||[];for(s=0,o=n.Adapter.handlers[i][t].length;s<o;++s)n.Adapter.handlers[i][t][s].apply(this,[r])},extractEventData:function(e,n){var r=n&&n[e]||t;return r},onDomLoad:function(t){var n=e.setTimeout(function(){t()},2e3);e.onload=function(){clearTimeout(n),t()}}},typeof n.init!="undefined"&&n.init()}(window),function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0,o.enabled=!0,o.savedHashes=[],o.isLastHash=function(e){var t=o.getHashByIndex(),n;return n=e===t,n},o.isHashEqual=function(e,t){return e=encodeURIComponent(e).replace(/%25/g,"%"),t=encodeURIComponent(t).replace(/%25/g,"%"),e===t},o.saveHash=function(e){return o.isLastHash(e)?!1:(o.savedHashes.push(e),!0)},o.getHashByIndex=function(e){var t=null;return typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e],t},o.discardedHashes={},o.discardedStates={},o.discardState=function(e,t,n){var r=o.getHashByState(e),i;return i={discardedState:e,backState:n,forwardState:t},o.discardedStates[r]=i,!0},o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};return o.discardedHashes[e]=r,!0},o.discardedState=function(e){var t=o.getHashByState(e),n;return n=o.discardedStates[t]||!1,n},o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t},o.recycleState=function(e){var t=o.getHashByState(e);return o.discardedState(e)&&delete o.discardedStates[t],!0},o.emulated.hashChange&&(o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a,f=Boolean(o.getHash());return o.isInternetExplorer()?(r="historyjs-iframe",i=n.createElement("iframe"),i.setAttribute("id",r),i.setAttribute("src","#"),i.style.display="none",n.body.appendChild(i),i.contentWindow.document.open(),i.contentWindow.document.close(),u="",a=!1,o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash(),r=o.getHash(i.contentWindow.document);return n!==t?(t=n,r!==n&&(u=r=n,i.contentWindow.document.open(),i.contentWindow.document.close(),i.contentWindow.document.location.hash=o.escapeHash(n)),o.Adapter.trigger(e,"hashchange")):r!==u&&(u=r,f&&r===""?o.back():o.setHash(r,!1)),a=!1,!0}):o.checkerFunction=function(){var n=o.getHash()||"";return n!==t&&(t=n,o.Adapter.trigger(e,"hashchange")),!0},o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval)),!0},o.Adapter.onDomLoad(o.hashChangeInit)),o.emulated.pushState&&(o.onHashChange=function(t){var n=t&&t.newURL||o.getLocationHref(),r=o.getHashByUrl(n),i=null,s=null,u=null,a;return o.isLastHash(r)?(o.busy(!1),!1):(o.doubleCheckComplete(),o.saveHash(r),r&&o.isTraditionalAnchor(r)?(o.Adapter.trigger(e,"anchorchange"),o.busy(!1),!1):(i=o.extractState(o.getFullUrl(r||o.getLocationHref()),!0),o.isLastSavedState(i)?(o.busy(!1),!1):(s=o.getHashByState(i),a=o.discardedState(i),a?(o.getHashByIndex(-2)===o.getHashByState(a.forwardState)?o.back(!1):o.forward(!1),!1):(o.pushState(i.data,i.title,encodeURI(i.url),!1),!0))))},o.Adapter.bind(e,"hashchange",o.onHashChange),o.pushState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getHash(),c=o.expectedStateId==s.id;return o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),u===f?(o.busy(!1),!1):(o.saveState(s),c||o.Adapter.trigger(e,"statechange"),!o.isHashEqual(u,l)&&!o.isHashEqual(u,o.getShortUrl(o.getLocationHref()))&&o.setHash(u,!1),o.busy(!1),!0)},o.replaceState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getStateByIndex(-2);return o.discardState(a,s,l),u===f?(o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),o.saveState(s),o.Adapter.trigger(e,"statechange"),o.busy(!1)):o.pushState(s.data,s.title,s.url,!1),!0}),o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})},typeof o.init!="undefined"&&o.init()}(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=e.sessionStorage||!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window)
/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: '50%',           // center vertically
    left: '50%',          // center horizontally
    position: 'absolute'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})

      css(el, {
        left: o.left,
        top: o.top
      })
        
      if (target) {
        target.insertBefore(el, target.firstChild||null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));

/*
Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org

https://github.com/mroderick/PubSubJS
*/
/*jslint white:true, plusplus:true, stupid:true*/
/*global
	setTimeout,
	module,
	exports,
	define,
	require,
	window
*/
(function (root, factory){
	'use strict';

    if (typeof define === 'function' && define.amd){
        // AMD. Register as an anonymous module.
        define(['exports'], factory);

    } else if (typeof exports === 'object'){
        // CommonJS
        factory(exports);

    } else {
        // Browser globals
        factory((root.PubSub = {}));

    }
}(( typeof window === 'object' && window ) || this, function (PubSub){
	'use strict';

	var messages = {},
		lastUid = -1;

	function hasKeys(obj){
		var key;

		for (key in obj){
			if ( obj.hasOwnProperty(key) ){
				return true;
			}
		}
		return false;
	}

	/**
	 *	Returns a function that throws the passed exception, for use as argument for setTimeout
	 *	@param { Object } ex An Error object
	 */
	function throwException( ex ){
		return function reThrowException(){
			throw ex;
		};
	}

	function callSubscriberWithDelayedExceptions( subscriber, message, data ){
		try {
			subscriber( message, data );
		} catch( ex ){
			setTimeout( throwException( ex ), 0);
		}
	}

	function callSubscriberWithImmediateExceptions( subscriber, message, data ){
		subscriber( message, data );
	}

	function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
		var subscribers = messages[matchedMessage],
			callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
			s;

		if ( !messages.hasOwnProperty( matchedMessage ) ) {
			return;
		}

		for (s in subscribers){
			if ( subscribers.hasOwnProperty(s)){
				callSubscriber( subscribers[s], originalMessage, data );
			}
		}
	}

	function createDeliveryFunction( message, data, immediateExceptions ){
		return function deliverNamespaced(){
			var topic = String( message ),
				position = topic.lastIndexOf( '.' );

			// deliver the message as it is now
			deliverMessage(message, message, data, immediateExceptions);

			// trim the hierarchy and deliver message to each level
			while( position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf('.');
				deliverMessage( message, topic, data );
			}
		};
	}

	function messageHasSubscribers( message ){
		var topic = String( message ),
			found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
			position = topic.lastIndexOf( '.' );

		while ( !found && position !== -1 ){
			topic = topic.substr( 0, position );
			position = topic.lastIndexOf( '.' );
			found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
		}

		return found;
	}

	function publish( message, data, sync, immediateExceptions ){
		var deliver = createDeliveryFunction( message, data, immediateExceptions ),
			hasSubscribers = messageHasSubscribers( message );

		if ( !hasSubscribers ){
			return false;
		}

		if ( sync === true ){
			deliver();
		} else {
			setTimeout( deliver, 0 );
		}
		return true;
	}

	/**
	 *	PubSub.publish( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message, passing the data to it's subscribers
	**/
	PubSub.publish = function( message, data ){
		return publish( message, data, false, PubSub.immediateExceptions );
	};

	/**
	 *	PubSub.publishSync( message[, data] ) -> Boolean
	 *	- message (String): The message to publish
	 *	- data: The data to pass to subscribers
	 *	Publishes the the message synchronously, passing the data to it's subscribers
	**/
	PubSub.publishSync = function( message, data ){
		return publish( message, data, true, PubSub.immediateExceptions );
	};

	/**
	 *	PubSub.subscribe( message, func ) -> String
	 *	- message (String): The message to subscribe to
	 *	- func (Function): The function to call when a new message is published
	 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
	 *	you need to unsubscribe
	**/
	PubSub.subscribe = function( message, func ){
		if ( typeof func !== 'function'){
			return false;
		}

		// message is not registered yet
		if ( !messages.hasOwnProperty( message ) ){
			messages[message] = {};
		}

		// forcing token as String, to allow for future expansions without breaking usage
		// and allow for easy use as key names for the 'messages' object
		var token = 'uid_' + String(++lastUid);
		messages[message][token] = func;

		// return token for unsubscribing
		return token;
	};

	/* Public: Clears all subscriptions
	 */
	PubSub.clearAllSubscriptions = function clearSubscriptions(){
		messages = {};
	};

	/* Public: removes subscriptions.
	 * When passed a token, removes a specific subscription.
	 * When passed a function, removes all subscriptions for that function
	 * When passed a topic, removes all subscriptions for that topic (hierarchy)
	 *
	 * value - A token, function or topic to unsubscribe.
	 *
	 * Examples
	 *
	 *		// Example 1 - unsubscribing with a token
	 *		var token = PubSub.subscribe('mytopic', myFunc);
	 *		PubSub.unsubscribe(token);
	 *
	 *		// Example 2 - unsubscribing with a function
	 *		PubSub.unsubscribe(myFunc);
	 *
	 *		// Example 3 - unsubscribing a topic
	 *		PubSub.unsubscribe('mytopic');
	 */
	PubSub.unsubscribe = function(value){
		var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
			isToken    = !isTopic && typeof value === 'string',
			isFunction = typeof value === 'function',
			result = false,
			m, message, t, token;

		if (isTopic){
			delete messages[value];
			return;
		}

		for ( m in messages ){
			if ( messages.hasOwnProperty( m ) ){
				message = messages[m];

				if ( isToken && message[value] ){
					delete message[value];
					result = value;
					// tokens are unique, so we can just stop here
					break;
				} else if (isFunction) {
					for ( t in message ){
						if (message.hasOwnProperty(t) && message[t] === value){
							delete message[t];
							result = true;
						}
					}
				}
			}
		}

		return result;
	};
}));

var FramesCore;

FramesCore = (function() {
  FramesCore.prototype.core_objects = {};

  FramesCore.prototype.base_path = null;

  function FramesCore(name) {
    this.name = name;
  }

  FramesCore.prototype.parseURL = function() {
    var hash, _ths;
    _ths = this;
    if (!this.base_path) {
      (function(name) {
        var i, l, length, scripts, src, _results;
        scripts = document.getElementsByTagName("script");
        i = scripts.length - 1;
        _results = [];
        while (i >= 0) {
          src = scripts[i].src;
          l = src.length;
          length = src.substr(src.lastIndexOf('/') + 1).length;
          if (src.indexOf("frames-") > -1) {
            _ths.base_path = src.substr(0, l - length);
            if (_ths.base_path.indexOf('core') > -1) {
              _ths.base_path = _ths.base_path + '../'
            }
            nunjucks.configure(_ths.base_path + '/views', {
              noCache: true,
              autoescape: false
            });
          }
          _results.push(--i);
        }
        return _results;
      })();
    }
    window.scrollTo(0, 0);
    hash = window.location.hash;
    if (hash === "#!/" || hash === "#/" || hash === "") {
      _ths.current_route = "/";
    } else {
      _ths.current_route = hash.replace("#", "").replace("!", "");
    }
    return frames_router.matchRoute(_ths.current_route);
  };

  FramesCore.prototype.constructObject = function(str) {
    var obj;
    obj = str.split(".");
    this.controller = obj[0];
    this.action = obj[1];
    if (!this.isConstructed()) {
      this.core_objects[this.controller] = eval("new " + this.controller);
    }
    return eval("this.core_objects['" + this.controller + "']." + this.action + "()");
  };

  FramesCore.prototype.isConstructed = function() {
    var key, _found, _i;
    _found = void 0;
    _i = void 0;
    _found = false;
    _i = 0;
    for (key in this.core_objects) {
      if (key === this.controller) {
        _found = true;
      }
    }
    return _found;
  };

  FramesCore.prototype.renderView = function(options) {
    var page = frames_core.controller.toLocaleLowerCase() + "/" + frames_core.action.toLocaleLowerCase() + ".html"

    nunjucks.render(page, options.data, function(err, res) {
      $("#yield").html(res);

      setTimeout(function() {
        frames_helper.hideLoader();
        PubSub.publish("view_rendered");
      });
    });

  FramesCore.prototype.viewRendered = function(callback) {
    PubSub.clearAllSubscriptions();
    PubSub.subscribe("view_rendered", callback);
  }

  };

  return FramesCore;

})();

var FramesHelper;

FramesHelper = (function($) {
  FramesHelper = function(name) {
    return this.name = name;
  };
  FramesHelper.prototype = {
    presentLoader: function() {
      var htmlStr, opts, target, wH, wW;
      htmlStr = void 0;
      opts = void 0;
      target = void 0;
      wH = void 0;
      wW = void 0;
      wH = $(window).outerHeight(true);
      wW = $(window).outerWidth(true);
      if ($("#frames-loader").length === 0) {
        htmlStr = "<div id =\"frames-loader\"></div>";
        $("body").append(htmlStr);
      }
      $("#frames-loader").css({
        padding: "10px",
        background: "#000",
        color: "#FFF",
        width: 100,
        height: 100,
        "text-align": "center",
        position: "absolute",
        top: wH / 2 - 60,
        left: wW / 2 - 60,
        "z-index": 2000,
        display: "none",
        "border-radius": "10px"
      }, opts = {
        lines: 7,
        length: 7,
        width: 2,
        radius: 6,
        corners: 1,
        rotate: 50,
        color: "#FFF",
        speed: 1,
        trail: 56,
        shadow: false,
        hwaccel: false,
        className: "spinner",
        zIndex: 2e9,
        top: "60px",
        left: "60px"
      });
      $("#frames-loader").show();
      target = document.getElementById("frames-loader");
      if (this.spinner == null) {
        return this.spinner = new Spinner(opts).spin(target);
      }
    },
    hideLoader: function() {
      return $("#frames-loader").hide();
    },
    present404: function() {
      $.ajax({
        url: frames_core.base_path + "views/404.html",
        dataType: "html",
        success: function(res) {
          $("#yield").html(res);
        }
      });
    }
  };
  return FramesHelper;
})(window.jQuery);

var FramesRouter;

FramesRouter = (function() {
  FramesRouter.prototype.routes = {};

  FramesRouter.prototype.params = {};

  function FramesRouter(name) {
    this.routeMatcher = routeMatcher;
    this.name = name;
  }

  FramesRouter.prototype.addRoute = function(route, action) {
    return this.routes[route] = action;
  };

  FramesRouter.prototype.matchRoute = function(route) {
    var key, match, rm;
    match = false;
    for (key in frames_router.routes) {
      if (key !== "/") {
        rm = this.routeMatcher(key);
        rm = rm.parse(window.location.hash.replace("#", "").replace("!", ""));
        if (is_.object(rm)) {
          this.params = rm;
          frames_core.constructObject(this.routes[key]);
          match = true;
        }
      }
    }
    if (route === "/") {
      match = true;
      frames_core.constructObject(this.routes["/"]);
    }
    if (!match) {
      frames_helper.present404();
    }
    if (match) {
      return frames_helper.presentLoader();
    }
  };

  FramesRouter.prototype.setVariables = function(route_key, obj) {
    var i, obj_val, _results;
    route_key = route_key.split("/");
    i = 0;
    obj_val = 1;
    _results = [];
    while (i < route_key.length) {
      if (route_key[i].indexOf(":") > -1) {
        route_key[i] = route_key[i].substr(1);
        this.variables[route_key[i]] = obj[obj_val];
        obj_val++;
      }
      _results.push(i++);
    }
    return _results;
  };

  return FramesRouter;

})();

var frames_core, frames_helper, frames_router;
frames_core = new FramesCore;
frames_router = new FramesRouter;
frames_helper = new FramesHelper;

var Pages = (function() {

  function Pages(name) {
    this.name = name;
  }

  Pages.prototype = {
    index: function() {

      // Construct model instance.
      var page = new Page();

      // Render view passing data to said view.
      frames_core.renderView(page.getData());

      // View rendered subscriber for post processing.
      frames_core.viewRendered(function() {
        
      });
    }
  };

  return Pages;

})();

var Page = (function() {

  Page = function(name) {
    this.name = name;
  }

  Page.prototype = {
    getData: function() {
      return {
        data: {
          title: "Hi! Welcome to Frames!",
          text: "Hope you enjoy this fun little framework."
        }
      }
    }
  }

  return Page;

})()

/*
 * Routes
 */

frames_router.addRoute("/", "Pages.index");

/*
 * Initial URL Parse
 */
 
frames_core.parseURL();
