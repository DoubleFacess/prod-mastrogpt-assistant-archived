
main = main.createModule(function(){  

	dump.log() // init debugger

	dump.next('start app')
	
	/* @@ init function @@ */

	let _initApp = function(){

		dump.next('hello from initApp function, enjoy it!')

		//dom.appTest()
		dom.activateChat()
		dom.closeButton()
		dom.disableUserInput(false)
		dom.sendRequest(false)
		dom.listenUserInput()
		dom.getUserInput()
	}

	let _functionTest = function() {
		console.log('hello from hell!')
		return true
	}
	
	
	return {
		initApp: _initApp, 
		functionTest: _functionTest
	}
	
})
	
main.initApp()
	



