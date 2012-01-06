// Usado para limitar o numeros de caracteres de qualquer campo de texto.


/*
 * jQuery >1.4 Plugin
 * 
 * Use to dinamicaly limit maximum characters in a text input or text-area
 * 
 * Statisc use; InputLimit().run()
 */
function InputLimit( config ){
	var j = $
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
			console.log(' position after')
			
			if( !jE.next().length || !jE.next().is(config.classesSelector)  ){ // if there is none, create
	    	console.log('  do create!')
	    	var counterTag = "<"+config.tag+" class='"+config.classes+"'>"+config.template+"</"+config.tag+">"
	    	console.log( " ", counterTag )
	    	jE.after( counterTag )
	    } else {
	    	// TODO
	    	console.log(' position not after')
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
	    
	    // enforce limit
	    // TODO
	    
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
	    
	    /*
	    // Reformat the display
	    if( input.siblings('.limit_input').length > 0 ){
	      var max_val = input.siblings('.limit_input').text().match( /.*\/(.*)/ )[1]
	      input.siblings('.limit_input').text( input.val().length + "/" + max_val )
	    }else{
	      var limit_span = input.parent().prevAll('.limit_input:first')
	      if( limit_span.size() ){
	        var max_val = limit_span.text().match( /.*\/(.*)/ )[1]
	        limit_span.text( input.val().length + "/" + max_val )
	      }
	    }
	    */
	      
	  } catch(e){
	  	console.log(e)
	    // if has no max, keep walking, JW
	  }
	}
	
	/*
	 * Will attach event listeners to all inputs that have attribute as in config.attr || 'data-input-limit'
	 */
	var run = function() {
		j('input[type=text]['+config.attr+']').each( function(i,e){
			var jE = j(e)
				, eEvents = $.data( e, 'events' ) // may come undefined at first
				, hasEvent = false // optimistic ;)
			
			
			// FIXME just add some data field on input!
							// need to find out if has already the handler attached
							if( eEvents && eEvents.keyup && eEvents.keyup.length ){
								// i miss forEach()!
								for (var i=0; i < eEvents.keyup.length; i++){
									debugger
									if(eEvents.keyup[i].handler == countAndRedefineMax)
										hasEvent = true
								}
							}
			
			if( !hasEvent ){
				console.log('found!', jE)
			  jE.keyup( countAndRedefineMax )
			  countAndRedefineMax(e)
			} else {
				console.log('already has Event!', jE)
			}
		})
		return publicMethods
	};
	
	publicMethods = {
		run: run
	}
	
	return publicMethods
	
}


////////////////////////////////////////////////////////

j = $
function count_and_redefine_max(e){
  try{
    // get the input and the maximum length
    var input = j( e.currentTarget || e )
    
    // Reformat the display
    if( input.siblings('.limit_input').length > 0 ){
      var max_val = input.siblings('.limit_input').text().match( /.*\/(.*)/ )[1]
      input.siblings('.limit_input').text( input.val().length + "/" + max_val )
    }else{
      var limit_span = input.parent().prevAll('.limit_input:first')
      if( limit_span.size() ){
        var max_val = limit_span.text().match( /.*\/(.*)/ )[1]
        limit_span.text( input.val().length + "/" + max_val )
      }
    }
      
  } catch(e){
    // if has no max, keep walking, JW
  }
}

// Takes the last form, that should be the scaffolded one; bind and update the counts.
j('form:last').find('input[type=text]').each( function(i,e){
  j(e).keyup( count_and_redefine_max )
  count_and_redefine_max(e)
})