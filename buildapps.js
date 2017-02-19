const exec = require('child_process').exec
const fs = require('fs')
const ncp = require('ncp').ncp
const shell = require('shelljs')
const path = require('path')
ncp.limit = 16

const apps = [
	'MathSite',
	'Home',
	'Checkers',
]

console.log('Building and collecting apps')

apps.forEach(app => {
	exec(`cd ${app} && npm run build`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`)
			return
		}
		
		console.log(`${app} build complete`)
		
		copyDistToServer(app)
	})
})


function copyDistToServer(appName) {
	const dir = `./Server/src/public/${appName}/dist`
	shell.rm('-rf', dir)
	
	if (!fs.existsSync(dir)) {
		shell.mkdir('-p', path.join(__dirname, dir))
	}
	
	ncp(`./${appName}/dist`, dir, function (err) {
	 if (err) {
		 return console.error(err)
	 }
	 console.log(`${appName} copy to server complete`)
	})
}