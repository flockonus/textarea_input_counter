// Usado para limitar o numeros de caracteres de qualquer campo de texto.


/* InputLimitCounter v 0.1
 * 
 * jQuery >1.4 Plugin
 * 
 * Use to dinamicaly limit maximum characters in a text input or text-area
 * 
 * Static use:
 *   $.InputLimitCounter().run()
 */
if( jQuery ){
	
	
	jQuery.InputLimitCounter = function( config ){
		var j = jQuery
		
		if (!window.console)
			window.console = {log:function(){}}
		
		
		if( typeof config !== 'object' || config === null )
			config = {}
		
		config.attr = config.attr || 'data-input-limit'
		config.position = config.position || 'after'
		config.classes = config.classes || 'limit_input'
		config.tag = config.tag || 'span'
		config.template = config.template || "(CUR/MAX)"
		
		// "pale small" => ".pale.small"
		config.classesSelector = config.classes.split(' ')
		for (var i=0; i < config.classesSelector.length; i++) {
			config.classesSelector[i] = "."+config.classesSelector[i]
		};
		config.classesSelector = config.classesSelector.join('')
		
		var publicMethods = {}
		
		
		
		// private
		var ensureCounterPresence = function(jE ) {
			if( config.position == 'after' ){
				//console.log(' position after')
				if( !jE.next().length || !jE.next().is(config.classesSelector)  ){ // if there is none, create
		    	var counterTag = "<"+config.tag+" class='"+config.classes+"'>"+config.template+"</"+config.tag+">"
		    	//console.log('  do create!', counterTag)
		    	jE.after( counterTag )
		    }
			} else {
				//console.log(' position before')
				if( !jE.prev().length || !jE.prev().is(config.classesSelector)  ){ // if there is none, create
		    	//console.log('  do create!')
		    	var counterTag = "<"+config.tag+" class='"+config.classes+"'>"+config.template+"</"+config.tag+">"
		    	//console.log( " ", counterTag )
		    	jE.before( counterTag )
		    }
			}
		};
		
		// private
		var countAndRedefineMax = function (e){
		  try{
		  	
		    // get the input and the maximum length
		    var input = j( e.currentTarget || e )
		    	, input_limit = parseInt( input.attr( config.attr ) )
		    
		    
		    if( !input_limit ){
		    	alert( 'missing limit for '+( input.attr('name') || input.attr('id') ) )
		    	return null
		    }
		    
		    // look for a TAG that should be in POSITION
		    ensureCounterPresence( input )
		    
		    // set templated counter
		    var counterText = ''+config.template
		    counterText = counterText.replace(/CUR/, input.val().length )
		    counterText = counterText.replace(/MAX/, input_limit )
		    
		      
		    if( config.position == 'after' )
		    	input.next().text(counterText)
		    else
		    	input.prev().text(counterText)
		  } catch(e){
		  	console.log('ERR InputLimitCounter:', e)
		  }
		}
		
		/*
		 * Will attach event listeners to all inputs that have attribute as in config.attr || 'data-input-limit'
		 */
		var run = function() {
			j('input['+config.attr+'],textarea['+config.attr+']').each( function(i,e){
				var jE = j(e)
					, eEvents = $.data( e, 'events' ) // may come undefined at first
					, hasEvent = false // optimistic ;)
				
				if( !jE.attr(config.attr+'-done') ){
					jE.attr(config.attr+'-done', '1')
					jE.attr('maxlength', jE.attr(config.attr)  )
					//console.log('found!', jE)
					jE.keyup( countAndRedefineMax )
					countAndRedefineMax(e)
				} else {
					//console.log('already has Event!', jE)
				}
			})
			return publicMethods
		};
		
		publicMethods = {
			run: run
		}
		
		return publicMethods
		
	}
} else {
	alert('Load jQuery before the pluggin!!!')
}



